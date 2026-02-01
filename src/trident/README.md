
# 🔱 Trident Asset Protocol (TAP)

> **版本**: 1.0.0 (Industrial Standard)  
> **核心理念**: 资产锚定 (Asset Grounding)

Trident 是专为 Remotion 视频渲染设计的**确定性资源加载引擎**。它解决了 Web 渲染中最大的痛点——**“本地预览完美，云端渲染缺字/裂图”**。

---

## 🌟 核心架构

Trident 由四个核心层级组成：

1.  **Manifest (清单层)**: 在 `constants.ts` 中定义的静态资源列表。
2.  **Excavator (挖掘层)**: `core.ts`。负责根据环境（本地/云端）智能尝试多种路径加载资源，并将其锁定为内存中的 `Blob URL`。
3.  **Store (仓库层)**: `store.ts`。一个全局单例 Map，存储 `AssetID -> BlobURL` 的映射。
4.  **Gate (栅栏层)**: `TridentGate.tsx`。React 组件，强制阻塞渲染进程，直到所有资源挖掘完毕。

---

## 🚀 快速使用

### 1. 定义资源 (Manifest)
在 `src/constants.ts` 中：

```typescript
import { TridentAsset } from './trident/types';

export const ASSETS: TridentAsset[] = [
  {
    id: "HeroFont",
    type: "font",
    src: {
      local: "fonts/MyFont.ttf", // 项目内文件
      remote: "https://cdn.com/MyFont.ttf", // 云端备份
      systemNames: ["My Font", "MyFont-Bold"] // 系统探测
    }
  },
  {
    id: "BgImage",
    type: "image",
    strategy: "greedy", // 强制下载
    src: {
      local: "images/bg.png",
      remote: "https://cdn.com/bg.png"
    }
  }
];
```

### 2. 挂载栅栏 (Root)
在 `src/Root.tsx` 中：

```tsx
import { TridentGate } from './trident/TridentGate';
import { ASSETS } from './constants';

export const RemotionRoot = () => (
  <TridentGate assets={ASSETS} config={{ timeout: 15000 }}>
    <Composition ... />
  </TridentGate>
);
```

### 3. 消费资源 (Component)
在任何组件中：

```tsx
import { resolveAsset } from './utils/resource-resolver';

// 返回的是 blob:http://localhost/... 或者是 base64，绝对稳定
const imgUrl = resolveAsset("BgImage"); 

// CSS 变量自动注入，直接使用
const style = { fontFamily: 'var(--font-HeroFont)' };
```

---

## 🛡️ 深度挖掘机制 (Deep Mining)

### 字体全排列嗅探 (Font Permutation Sniffing)
Windows、macOS 和 Linux 对字体名称的读取方式不同。
Trident 会自动生成字体的全排列名称并尝试 `local()` 加载：
- `TikTokSans ExtraBold` (完整名)
- `TikTokSans-ExtraBold` (CSS 名)
- `TikTokSansExtraBold` (PostScript 名)

### 孪生回退 (Digital Twin Fallback)
如果本地文件丢失、CDN 挂断，系统会自动回退到 CSS 变量中定义的 `fallback.fontStack`。建议配置 Google Fonts 作为云端替身。

---

## 🔧 扩展与升级指南

### 添加新的资源类型 (e.g., Lottie / GLB)
1.  修改 `src/trident/types.ts` 中的 `AssetType` 定义。
2.  在 `src/trident/core.ts` 的 `excavateAsset` 函数中添加新的 `case` 处理逻辑（例如针对 GLB 可能需要特定的 fetch header）。

### 全局配置
可以通过 `TridentGate` 的 `config` 属性覆盖默认值：
- `timeout`: 资源加载最大等待时间。
- `maxRetries`: 失败重试次数。
- `debug`: 是否输出详细日志。

---

## ⚠️ 最佳实践

1.  **始终使用 `resolveAsset`**: 永远不要在组件中直接 import 图片路径或写死 URL，否则将失去 Trident 的保护。
2.  **字体 ID 命名**: 字体 ID (如 `DisplayFont`) 会自动转换为 CSS 变量 `--font-DisplayFont`。
3.  **大文件慎用 Greedy**: 对于超过 50MB 的视频文件，建议设置 `strategy: 'lazy'`，否则可能导致内存溢出。
