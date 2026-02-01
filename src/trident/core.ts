
import { staticFile } from 'remotion';
import { TridentAsset } from './types';
import { IS_CLOUD } from './env';
import { TridentStore } from './store';
import { getConfig } from './config';

/**
 * 带有重试和超时机制的 Fetch
 */
const fetchToBlob = async (url: string, attempt = 0): Promise<string> => {
  const config = getConfig();
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), config.timeout);

  try {
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(id);
    
    if (!res.ok) {
      // 只有 5xx 错误才值得重试，404重试没意义
      if (res.status >= 500 && attempt < config.maxRetries) {
        console.warn(`[Trident] Retrying ${url} (${attempt + 1}/${config.maxRetries})...`);
        return fetchToBlob(url, attempt + 1);
      }
      throw new Error(`HTTP ${res.status}`);
    }
    
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e: any) {
    clearTimeout(id);
    if (attempt < config.maxRetries && e.name !== 'AbortError') {
       return fetchToBlob(url, attempt + 1);
    }
    throw e;
  }
};

/**
 * ⛏️ 深度挖掘核心逻辑 (The Excavator)
 */
export const excavateAsset = async (asset: TridentAsset): Promise<string> => {
  // 1. 缓存命中检查
  if (TridentStore.has(asset.id)) return TridentStore.get(asset.id)!;

  const config = getConfig();
  const errors: string[] = [];
  let finalUrl = '';

  // 2. 队列构建：根据环境决定尝试顺序
  const attempts: string[] = [];

  if (IS_CLOUD) {
    // 云端：优先 Remote -> Backup -> Local (作为最后的尝试，可能打包在容器里)
    if (asset.src.remote) attempts.push(asset.src.remote);
    if (asset.src.backupRemote) attempts.push(asset.src.backupRemote);
    if (asset.src.local) attempts.push(staticFile(asset.src.local));
  } else {
    // 本地：优先 Local -> Remote -> Backup
    if (asset.src.local) attempts.push(staticFile(asset.src.local));
    if (asset.src.remote) attempts.push(asset.src.remote);
    if (asset.src.backupRemote) attempts.push(asset.src.backupRemote);
  }

  // 3. 执行挖掘
  for (const url of attempts) {
    try {
      // 策略判断：如果是字体或 Greedy 模式，必须下载为 Blob
      if (asset.type === 'font' || asset.strategy === 'greedy') {
        finalUrl = await fetchToBlob(url);
      } else {
        // Lazy 模式：如果不需要预加载到 Blob，可以只做 HEAD 检查，或者直接信任 URL
        // 为了稳定性，我们这里暂时统一执行 fetchToBlob，除非未来添加 pure-url 模式
        finalUrl = await fetchToBlob(url); 
      }
      
      if (config.debug) console.log(`[Trident] Locked: ${asset.id} via ${url}`);
      break; // 成功即跳出
    } catch (e: any) {
      errors.push(`${url}: ${e.message}`);
    }
  }

  // 4. 末日兜底 (Last Resort)
  if (!finalUrl) {
    console.error(`[Trident] ☠️ Asset Collapse: ${asset.id}`, errors);
    if (asset.fallback?.defaultUrl) {
      finalUrl = asset.fallback.defaultUrl;
      console.warn(`[Trident] Using fallback for ${asset.id}`);
    } else {
      // 严重错误：如果是字体，返回空字符串让 CSS 字体栈接管
      // 如果是媒体，可能会导致渲染裂图，这在 Remotion 中是致命的，应该抛出或使用透明图
      finalUrl = ''; 
    }
  }

  // 5. 存入仓库
  TridentStore.set(asset.id, finalUrl);
  return finalUrl;
};
