# 🎬 Remotion 4K 视频创作框架

一个专门用来制作**超宽屏技术解说视频**的框架，就像用 React 写网页一样简单，但最后输出的是 MP4 视频文件。

## 📺 这个项目是干什么的？

这是一个基于 **Remotion** 的视频创作脚手架，可以让你：
- 用 **React + TypeScript** 写代码来生成视频（不是传统的视频剪辑软件）
- 输出 **4K 超宽屏**（3840x1600 像素）的专业视频
- 自动处理字体加载、图片预加载等烦人的问题
- 像写网页一样，想改哪里改哪里，实时预览效果

## 🌟 核心特点：Trident 资源管理引擎

### 什么是 Trident？
简单来说，就是一套**自动管理字体和图片**的系统。

**传统问题**：你在本地预览视频时一切正常，但渲染成 MP4 时字体变了、图片丢了。

**Trident 的解决方案**：
1. 你在一个地方（`constants.ts`）定义好所有字体、图片
2. Trident 自动帮你下载、缓存这些资源
3. 在视频正式开始渲染前，强制等待所有资源加载完成
4. 渲染出来的视频**100%跟预览一样**

就像提前把所有道具准备好，演员才能开始表演。

## 🚀 快速开始（5分钟上手）

### 第一步：安装依赖
```bash
npm install
```

### 第二步：启动预览
```bash
npm start
```
浏览器会自动打开 `http://localhost:3000`，你会看到一个示例场景。

### 第三步：修改示例场景
打开 `src/scenes/ExampleScene.tsx`，随便改点文字，保存后浏览器会自动刷新。

### 第四步：渲染成视频
```bash
npm run build
```
视频会保存到 `out/video.mp4`。

---

## 📂 项目结构（每个文件夹是干什么的）

```
remotion-v1-Def/
├── src/                          # 所有源代码都在这里
│   ├── scenes/                   # 📁 存放视频场景（你的主要工作区）
│   │   └── ExampleScene.tsx      # 示例场景，可以复制这个文件改名创建新场景
│   │
│   ├── components/Shared/        # 📦 共享组件（图标、文字等可复用的小部件）
│   │
│   ├── trident/                  # 🔱 资源管理引擎（不用改，直接用）
│   │
│   ├── utils/                    # 🛠️ 工具函数
│   │   └── resource-resolver.ts  # resolveAsset() 函数在这里
│   │
│   ├── constants.ts              # ⚙️ 配置中心（在这里定义字体、颜色、资源）
│   ├── MainVideo.tsx             # 🎬 主时间轴（编排所有场景的顺序和时长）
│   ├── Root.tsx                  # 🌐 根组件（启动 Trident 引擎）
│   ├── index.ts                  # 📌 入口文件
│   │
│   ├── DESIGN_HANDBOOK.md        # 🎨 设计规范手册
│   └── DEVELOPER_QUICKSTART.md   # 💻 开发者快速入门
│
├── package.json                  # 📦 项目依赖和脚本
├── tsconfig.json                 # ⚙️ TypeScript 配置
├── tailwind.config.js            # 🎨 Tailwind CSS 配置
└── README.md                     # 📖 你现在看的这个文件
```

---

## 🎯 创建你的第一个场景（实战教程）

### 场景是什么？
一个**场景就是视频中的一个片段**。比如：
- 场景1：片头动画（0-3秒）
- 场景2：讲解功能（3-10秒）
- 场景3：结尾 CTA（10-13秒）

### 步骤1：创建场景文件
在 `src/scenes/` 下新建一个文件，比如 `MyFirstScene.tsx`：

```tsx
import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { THEME } from '../constants';

export const MyFirstScene: React.FC = () => {
  const frame = useCurrentFrame();  // 当前帧数（0, 1, 2, 3...）
  const { fps } = useVideoConfig();  // 帧率（默认30fps）

  // 弹簧动画：从0到1平滑过渡
  const scale = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <h1 
        className="text-8xl font-bold text-white"
        style={{ 
          fontFamily: THEME.fonts.display,  // 使用预定义的字体
          transform: `scale(${scale})`      // 缩放动画
        }}
      >
        我的第一个场景！
      </h1>
    </AbsoluteFill>
  );
};
```

### 步骤2：添加到时间轴
打开 `src/MainVideo.tsx`，添加你的场景：

```tsx
import { MyFirstScene } from './scenes/MyFirstScene';

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg }}>
      {/* 从第0帧开始，持续90帧（3秒） */}
      <Sequence from={0} durationInFrames={90}>
        <ExampleScene />
      </Sequence>

      {/* 从第90帧开始，持续120帧（4秒） */}
      <Sequence from={90} durationInFrames={120}>
        <MyFirstScene />
      </Sequence>
    </AbsoluteFill>
  );
};
```

保存后，浏览器会自动刷新，你就能看到你的场景了！

---

## 🔱 Trident 使用指南（通俗版）

### 为什么需要 Trident？
假设你想在视频里用一个特殊字体"霸气体"，你会遇到这些问题：
1. 本地预览时字体正常（因为你电脑装了），但渲染服务器上没装，视频就变回默认字体
2. 你把字体文件放在项目里，但网络抖动导致加载失败
3. 字体还没加载完，视频就开始渲染了，前几帧字体是错的

**Trident 的做法**：
1. 你在 `constants.ts` 里告诉它："我要用霸气体，本地文件是 `fonts/baqiti.ttf`，如果加载失败就用 Google Fonts 的备份"
2. Trident 会在视频渲染前，先把字体完全下载好
3. 如果所有方式都失败了，它会用你指定的备用字体（比如系统自带的 Impact）

### 实战：添加一个自定义字体

#### 第1步：下载字体文件
把你的 `.ttf` 或 `.woff2` 文件放到 `public/fonts/` 文件夹（没有就创建一个）。

比如：`public/fonts/MyAwesomeFont.ttf`

#### 第2步：在 constants.ts 中注册
打开 `src/constants.ts`，在 `ASSETS_MANIFEST` 数组里添加：

```typescript
export const ASSETS_MANIFEST: TridentAsset[] = [
  // ... 已有的字体 ...
  
  {
    id: "AwesomeFont",  // 这是你的ID，后面会用到
    type: "font",
    src: {
      local: "fonts/MyAwesomeFont.ttf",  // 本地文件路径
      remote: "https://fonts.gstatic.com/...",  // 可选：云端备份地址
      systemNames: ["My Awesome Font"]  // 可选：系统字体名
    },
    fallback: { 
      fontStack: ["Arial", "sans-serif"]  // 如果所有都失败，用这个
    }
  }
];
```

#### 第3步：在组件中使用
有两种方式：

**方式1：CSS 变量（推荐）**
```tsx
<h1 style={{ fontFamily: 'var(--font-AwesomeFont)' }}>
  帅气的标题
</h1>
```

**方式2：从主题引用**
先在 `constants.ts` 的 `THEME.fonts` 里添加：
```typescript
export const THEME = {
  fonts: {
    display: `var(--font-DisplayFont)`,
    body: `var(--font-BodyFont)`,
    awesome: `var(--font-AwesomeFont)`,  // 新加的
  }
}
```

然后在组件里用：
```tsx
<h1 style={{ fontFamily: THEME.fonts.awesome }}>
  帅气的标题
</h1>
```

### 实战：添加图片或视频资源

#### 第1步：放文件
把图片放到 `public/images/` 或 `public/videos/`。

#### 第2步：注册资源
在 `constants.ts` 的 `ASSETS_MANIFEST` 里添加：

```typescript
{
  id: "HeroImage",
  type: "image",
  src: {
    local: "images/hero.png",
    remote: "https://example.com/hero.png"  // 可选
  }
}
```

#### 第3步：使用资源
在组件里：
```tsx
import { resolveAsset } from '../utils/resource-resolver';

export const MyScene = () => {
  const heroUrl = resolveAsset('HeroImage');  // 获取图片的安全URL
  
  return (
    <img src={heroUrl} alt="Hero" />
  );
};
```

---

## 🎨 配置说明（constants.ts 文件详解）

打开 `src/constants.ts`，你会看到三个主要部分：

### 1. VIDEO_CONFIG（视频配置）
```typescript
export const VIDEO_CONFIG = {
  width: 3840,              // 视频宽度（4K 超宽屏）
  height: 1600,             // 视频高度
  fps: 30,                  // 帧率（每秒30帧）
  durationInFrames: 300,    // 默认时长（300帧 = 10秒）
  id: "Trident_Scaffold"    // 视频ID（可以改成你的项目名）
};
```

**常见修改**：
- 改成普通 1080p：`width: 1920, height: 1080`
- 改帧率：`fps: 60`（更流畅，但文件更大）
- 改默认时长：`durationInFrames: 600`（20秒）

### 2. ASSETS_MANIFEST（资源清单）
这是 Trident 的核心配置，列出所有需要预加载的资源。

```typescript
export const ASSETS_MANIFEST: TridentAsset[] = [
  // 这里列出所有字体、图片、视频
];
```

### 3. THEME（主题配置）
```typescript
export const THEME = {
  colors: {
    primary: '#00F0FF',    // 主色调（青色）
    success: '#00FF95',    // 成功/正确（绿色）
    danger: '#FF0055',     // 危险/错误（红色）
    bg: '#020205',         // 背景（深黑色）
    text: '#FFFFFF'        // 文字（白色）
  },
  fonts: {
    display: `var(--font-DisplayFont)`,  // 标题字体
    body: `var(--font-BodyFont)`,        // 正文字体
    mono: `var(--font-MonoFont)`,        // 代码字体
  }
};
```

**在组件里使用**：
```tsx
<div style={{ 
  backgroundColor: THEME.colors.bg,
  color: THEME.colors.primary,
  fontFamily: THEME.fonts.display
}}>
  内容
</div>
```

---

## 🎬 时间轴编排（MainVideo.tsx 详解）

### Sequence 是什么？
`Sequence` 就是时间轴上的一段，告诉 Remotion："从第几帧开始，播放这个场景，持续多少帧"。

### 基本用法
```tsx
<Sequence from={0} durationInFrames={90}>
  <ExampleScene />
</Sequence>
```
- `from={0}`：从第0帧开始（视频开头）
- `durationInFrames={90}`：持续90帧（30fps下是3秒）

### 多个场景按顺序播放
```tsx
<AbsoluteFill>
  {/* 场景1：0-3秒 */}
  <Sequence from={0} durationInFrames={90}>
    <IntroScene />
  </Sequence>

  {/* 场景2：3-8秒 */}
  <Sequence from={90} durationInFrames={150}>
    <MainScene />
  </Sequence>

  {/* 场景3：8-11秒 */}
  <Sequence from={240} durationInFrames={90}>
    <OutroScene />
  </Sequence>
</AbsoluteFill>
```

### 场景重叠（过渡效果）
```tsx
{/* 场景1：0-4秒 */}
<Sequence from={0} durationInFrames={120}>
  <SceneA />
</Sequence>

{/* 场景2：3-7秒（从第3秒开始出现，和场景1重叠1秒） */}
<Sequence from={90} durationInFrames={120}>
  <SceneB />
</Sequence>
```
然后在 `SceneB` 里用 `opacity` 从0到1渐变，就能实现淡入效果。

---

## 💡 常见问题

### Q1: 视频渲染出来字体不对？
**A**: 确保字体已经在 `constants.ts` 的 `ASSETS_MANIFEST` 里注册，并且使用 `var(--font-YourFontID)` 引用。

### Q2: 如何加快预览速度？
**A**: 降低预览质量，在浏览器预览界面右上角选择 "Low Quality"。

### Q3: 帧数怎么换算成秒？
**A**: 秒数 = 帧数 ÷ 帧率。比如 30fps 下，90帧 = 3秒，120帧 = 4秒。

### Q4: 可以用视频素材吗？
**A**: 可以！在 `ASSETS_MANIFEST` 里注册，type 设置为 `"video"`，然后用 `<Video>` 组件。

### Q5: Tailwind CSS 能用吗？
**A**: 能！项目已经配置好了，直接用 className：
```tsx
<div className="flex items-center justify-center text-4xl font-bold">
  内容
</div>
```

---

## 📦 命令列表

```bash
# 启动预览服务器（开发用）
npm start

# 渲染视频为 MP4（生产用）
npm run build

# 升级 Remotion 版本
npm run upgrade
```

---

## 📚 进一步学习

- 查看 `src/DESIGN_HANDBOOK.md` - 了解设计规范和配色方案
- 查看 `src/DEVELOPER_QUICKSTART.md` - 了解开发者技术细节
- 查看 `src/README.md` - 了解 Trident 引擎的工作原理
- 官方文档：https://www.remotion.dev/docs

---

## 🎉 开始创作吧！

现在你已经了解了所有基础知识，可以开始创作你的第一个视频项目了：

1. 运行 `npm start` 启动预览
2. 编辑 `src/scenes/ExampleScene.tsx` 看看效果
3. 创建你自己的场景文件
4. 在 `MainVideo.tsx` 里编排场景
5. 运行 `npm run build` 渲染成视频

祝创作愉快！🚀
