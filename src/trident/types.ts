
/**
 * 🔱 Trident Asset Type Definitions
 */

export type AssetType = 'font' | 'image' | 'video' | 'audio';

export interface TridentConfig {
  /** 下载超时时间 (ms), 默认 8000 */
  timeout: number;
  /** 最大重试次数, 默认 1 (仅在 HTTP 5xx 或 网络错误时重试) */
  maxRetries: number;
  /** 是否在控制台打印详细挖掘日志 */
  debug: boolean;
}

export interface TridentAsset {
  /** 唯一标识符 (e.g. 'bg-music', 'main-font') */
  id: string;
  type: AssetType;
  /** 
   * 策略配置 
   * 'greedy': 必须下载到内存 (Blob) 才算就绪 (最稳，消耗内存)
   * 'lazy': 只要 URL 有效即可 (节省内存)
   */
  strategy?: 'greedy' | 'lazy';
  
  /** 来源配置 (优先级从高到低) */
  src: {
    /** Level 1: 本地静态文件路径 (public/...) */
    local?: string;
    /** Level 2: 高速 CDN */
    remote?: string;
    /** Level 3: 备用 CDN 或 原始仓库 */
    backupRemote?: string;
    /** Level 4 (仅字体): 系统字体名列表 */
    systemNames?: string[];
  };

  /** 兜底配置 */
  fallback?: {
    /** 如果是图片/视频，失败时显示的默认占位图 */
    defaultUrl?: string;
    /** 如果是字体，回退的系统字体栈 */
    fontStack?: string[];
  };
}

export type AssetMap = Record<string, TridentAsset>;
