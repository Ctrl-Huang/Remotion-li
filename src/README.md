# 🔱 Trident 引擎使用手册

**给新手的话**：如果你是第一次用这个项目，建议先看根目录的 `README.md`，里面有更简单的入门教程。这个文档是给想深入了解 Trident 工作原理的开发者看的。

---

## 什么是 Trident？

**一句话解释**：Trident 是一个自动管理字体、图片、视频资源的系统，确保它们在视频渲染前100%加载完成。

### 它解决什么问题？

传统的 Web 视频渲染（比如 Remotion）有个大问题：

1. 你在本地开发时，字体是电脑自带的，图片在硬盘上，一切正常
2. 渲染服务器上可能没有这些字体，网络加载图片可能慢或失败
3. 渲染开始后，字体还没加载完，视频前几帧就用错了字体
4. 最后渲染出来的视频跟预览完全不一样

**Trident 的做法**：

```
开始渲染
    ↓
    ❌ 等等！资源还没准备好！
    ↓
Trident 强制暂停
    ↓
下载字体、图片、视频
    ↓
全部加载完成 ✅
    ↓
✅ 好了，现在可以开始渲染了
```

---

## Trident 的三个核心概念

### 1. 资产清单（Asset Manifest）

**就是一个列表**，告诉 Trident："我需要这些资源"。

在 `src/constants.ts` 文件里：

```typescript
export const ASSETS_MANIFEST: TridentAsset[] = [
  {
    id: "DisplayFont",           // 给这个资源起个名字
    type: "font",                // 资源类型（font / image / video）
    src: {
      local: "fonts/xxx.ttf",    // 本地文件路径
      remote: "https://...",     // 云端备份地址（可选）
      systemNames: ["字体名"]     // 系统字体名（可选）
    },
    fallback: {                  // 如果所有加载方式都失败
      fontStack: ["Arial"]       // 用这个备用字体
    }
  }
];
```

### 2. 资源解析器（Resource Resolver）

**一个函数**：`resolveAsset(id)` - 把资源ID转换成可以用的URL。

```typescript
import { resolveAsset } from '../utils/resource-resolver';

// 使用示例
const imageUrl = resolveAsset('HeroImage');  
// 返回：blob:http://localhost/abc123... 或 data:image/png;base64,...

<img src={imageUrl} />
```

### 3. 栅栏门（TridentGate）

**一个 React 组件**，包裹在整个应用最外层，负责：
1. 读取资产清单
2. 下载所有资源
3. 在所有资源加载完成前，显示"加载中..."
4. 加载完成后，才让视频组件渲染

在 `src/Root.tsx` 里：

```tsx
<TridentGate assets={ASSETS_MANIFEST}>
  <Composition ... />  {/* 视频渲染在这里面 */}
</TridentGate>
```

---

## 实战教程 1：添加一个中文字体

假设你要用"思源黑体 Bold"。

### 步骤1：准备字体文件

下载 `NotoSansSC-Bold.ttf`，放到 `public/fonts/` 文件夹。

### 步骤2：注册到 Trident

打开 `src/constants.ts`，在 `ASSETS_MANIFEST` 里添加：

```typescript
export const ASSETS_MANIFEST: TridentAsset[] = [
  // ... 已有的资源 ...
  
  {
    id: "ChineseFont",  // 你的ID，后面要用
    type: "font",
    src: {
      // 本地文件路径（相对于 public/ 文件夹）
      local: "fonts/NotoSansSC-Bold.ttf",
      
      // 云端备份（Google Fonts CDN）
      remote: "https://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeALhLOCT-xWNm8Hqd37x1-A.woff2",
      
      // 系统字体名（如果用户电脑装了，直接用系统的）
      systemNames: ["Noto Sans SC", "Noto Sans SC Bold"]
    },
    
    // 如果所有方式都失败了，用这个备用
    fallback: { 
      fontStack: ["Microsoft YaHei", "sans-serif"] 
    }
  }
];
```

### 步骤3：在主题里添加快捷方式（可选）

在 `constants.ts` 的 `THEME` 里添加：

```typescript
export const THEME = {
  fonts: {
    display: `var(--font-DisplayFont)`,
    body: `var(--font-BodyFont)`,
    chinese: `var(--font-ChineseFont)`,  // 新加的
  }
};
```

### 步骤4：在组件里使用

```tsx
import { THEME } from '../constants';

export const MyScene = () => {
  return (
    <h1 style={{ fontFamily: THEME.fonts.chinese }}>
      你好世界！
    </h1>
  );
};
```

**或者直接用 CSS 变量**：

```tsx
<h1 style={{ fontFamily: 'var(--font-ChineseFont)' }}>
  你好世界！
</h1>
```

---

## 实战教程 2：添加图片资源

假设你要用一张背景图。

### 步骤1：准备图片

把 `background.jpg` 放到 `public/images/` 文件夹。

### 步骤2：注册到 Trident

```typescript
export const ASSETS_MANIFEST: TridentAsset[] = [
  // ... 字体资源 ...
  
  {
    id: "BackgroundImage",
    type: "image",
    src: {
      local: "images/background.jpg",
      remote: "https://cdn.example.com/background.jpg"  // 可选
    }
  }
];
```

### 步骤3：在组件里使用

```tsx
import { resolveAsset } from '../utils/resource-resolver';

export const MyScene = () => {
  const bgUrl = resolveAsset('BackgroundImage');
  
  return (
    <div 
      style={{ 
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '100%'
      }}
    >
      内容
    </div>
  );
};
```

---

## 实战教程 3：添加视频素材

假设你要在视频里播放一个产品演示的录屏。

### 步骤1：准备视频文件

把 `demo.mp4` 放到 `public/videos/` 文件夹。

### 步骤2：注册到 Trident

```typescript
export const ASSETS_MANIFEST: TridentAsset[] = [
  // ... 其他资源 ...
  
  {
    id: "DemoVideo",
    type: "video",
    strategy: "lazy",  // 大文件用 lazy，小文件可以用 greedy
    src: {
      local: "videos/demo.mp4",
      remote: "https://storage.example.com/demo.mp4"  // 可选
    }
  }
];
```

**strategy 选项说明**：
- `"greedy"`：立即下载到内存，适合小文件（<10MB）
- `"lazy"`：需要时才加载，适合大文件

### 步骤3：在组件里使用

```tsx
import { Video } from 'remotion';
import { resolveAsset } from '../utils/resource-resolver';

export const MyScene = () => {
  const videoUrl = resolveAsset('DemoVideo');
  
  return (
    <Video 
      src={videoUrl} 
      startFrom={0}      // 从第几帧开始播放
      endAt={120}        // 播到第几帧结束
      volume={0.5}       // 音量（0-1）
    />
  );
};
```

---

## 高级功能

### 1. 加载策略（Strategy）

| 策略 | 什么时候用 | 优点 | 缺点 |
|-----|----------|-----|-----|
| `greedy` | 小文件（图片、小视频） | 立即可用，不会卡顿 | 占用内存 |
| `lazy` | 大视频文件 | 节省内存 | 第一次使用时可能略卡 |

默认是 `greedy`。

### 2. 系统字体探测（System Font Detection）

如果用户电脑装了字体，Trident 会优先用系统字体，不用下载。

```typescript
{
  id: "MyFont",
  type: "font",
  src: {
    systemNames: [
      "My Font",           // 完整名称
      "MyFont-Bold",       // CSS 名称
      "MyFontBold"         // PostScript 名称
    ],
    remote: "https://..."  // 如果系统没有，下载这个
  }
}
```

Trident 会按顺序尝试所有名称变体，找到第一个就停止。

### 3. 多级回退机制

```
1. 尝试系统字体（systemNames）
   ↓ 失败
2. 尝试本地文件（local）
   ↓ 失败
3. 尝试云端地址（remote）
   ↓ 失败
4. 使用备用字体（fallback.fontStack）
```

这样可以保证在任何环境下都有字体可用。

### 4. Base64 内联资源

对于非常小的资源（比如图标、噪声纹理），可以直接用 Base64：

```typescript
{
  id: "SmallIcon",
  type: "image",
  src: {
    remote: "data:image/png;base64,iVBORw0KGgo..."
  }
}
```

这样资源直接嵌入代码，不需要网络请求。

---

## Trident 工作流程（技术细节）

### 当你运行 `npm start` 时发生了什么？

```
1. Remotion 启动
   ↓
2. 加载 src/index.ts
   ↓
3. 注册 Root.tsx
   ↓
4. TridentGate 组件渲染
   ↓
5. 读取 ASSETS_MANIFEST
   ↓
6. 对每个资源，依次尝试：
   - 检查系统字体
   - 读取本地文件
   - 下载远程文件
   ↓
7. 所有资源下载完成，转换为 Blob URL
   ↓
8. 注入 CSS（字体）
   ↓
9. 显示 "Ready" 界面
   ↓
10. 开始渲染视频组件
```

### Blob URL 是什么？

普通 URL：`https://example.com/image.png`（依赖网络）

Blob URL：`blob:http://localhost/abc-123-def`（已经在内存里，100%可用）

Trident 把所有资源转成 Blob URL，这样渲染时不会受网络影响。

---

## 常见问题排查

### Q1: 字体在预览时正常，渲染视频时变了？

**原因**：字体没有注册到 Trident，渲染时找不到。

**解决**：
1. 确认字体在 `ASSETS_MANIFEST` 里
2. 确认使用 `var(--font-YourFontID)` 而不是直接写字体名

### Q2: 图片加载失败？

**检查清单**：
- [ ] 图片文件在 `public/` 文件夹里吗？
- [ ] `local` 路径写对了吗？（不要写 `public/`，直接从 `images/` 开始）
- [ ] 文件名大小写对吗？（Linux 系统区分大小写）

### Q3: 视频卡顿？

**可能原因**：
- 视频文件太大，用 `strategy: "lazy"`
- 视频编码不兼容，转换成 H.264 编码的 MP4

### Q4: 加载时间太长？

**优化方法**：
- 压缩图片（用 TinyPNG）
- 压缩视频（降低码率）
- 大文件用 CDN（remote 地址）
- 用 `strategy: "lazy"` 延迟加载

---

## 最佳实践

### ✅ 推荐做法

```typescript
// 1. 所有资源都注册到 Trident
export const ASSETS_MANIFEST = [
  { id: "MyFont", type: "font", ... },
  { id: "Logo", type: "image", ... }
];

// 2. 使用 resolveAsset 获取资源
const logoUrl = resolveAsset('Logo');

// 3. 字体用 CSS 变量
<h1 style={{ fontFamily: 'var(--font-MyFont)' }}>
```

### ❌ 不推荐做法

```typescript
// ❌ 直接 import 图片（会失去 Trident 保护）
import logo from './logo.png';

// ❌ 硬编码 URL（网络不稳定会失败）
<img src="https://example.com/logo.png" />

// ❌ 直接写字体名（渲染器可能找不到）
<h1 style={{ fontFamily: 'My Custom Font' }}>
```

---

## 配置选项

可以在 `Root.tsx` 里配置 TridentGate：

```tsx
<TridentGate 
  assets={ASSETS_MANIFEST}
  config={{
    timeout: 15000,      // 最大等待时间（毫秒）
    maxRetries: 3,       // 失败重试次数
    debug: true          // 打印调试信息到控制台
  }}
>
  ...
</TridentGate>
```

---

## 总结

**Trident 的核心价值**：

1. **确定性**：视频渲染结果100%可预测
2. **容错性**：多级回退，总有字体可用
3. **简单性**：只需要一个清单 + 一行代码

**使用流程**：

```
注册资源（constants.ts）
    ↓
用 resolveAsset 获取（组件里）
    ↓
Trident 自动处理加载
    ↓
渲染完美的视频
```

现在你已经完全掌握 Trident 了！🎉

如果还有疑问，查看根目录的 `README.md` 或 Remotion 官方文档。
