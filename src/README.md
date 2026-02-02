# 🔱 Trident 引擎使用手册

Trident 是一个专为 Remotion 设计的资源预加载系统，确保视频渲染的**确定性**。

## 核心机制
1.  **清单定义**: 在 `src/constants.ts` 中注册所有外部资源（字体、图片、视频）。
2.  **强制等待**: 在 `Root.tsx` 中，Trident 会拦截渲染，直到清单中所有资源通过网络或本地缓存加载完毕。
3.  **Blob 转换**: 将所有已加载资源转换为内存 URL，消除渲染过程中的网络抖动影响。

## 快速使用

### 1. 注册资产 (`src/constants.ts`)
```typescript
export const ASSETS_MANIFEST = [
  {
    id: "MyLogo",
    type: "image",
    src: { local: "images/logo.png" }
  }
];
```

### 2. 在组件中使用
```tsx
import { resolveAsset } from './utils/resource-resolver';

const logoUrl = resolveAsset('MyLogo');
<img src={logoUrl} />
```

### 3. 字体处理
字体注册后，Trident 会自动注入 CSS 变量：
```tsx
<div style={{ fontFamily: 'var(--font-MyFontID)' }}>文字内容</div>
```

## 最佳实践
-   **永远使用 ID**: 不要直接 import 图片，而是通过 `resolveAsset(id)` 获取。
-   **多级回退**: 为字体配置 `remote`、`local` 和 `systemNames` 以增强兼容性。
-   **内存优化**: 对于大型视频文件，使用 `strategy: "lazy"`。

---
更多技术细节请查阅源代码：`src/trident/`
