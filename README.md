# 🎬 Remotion 纯净初始化模板

这是一个经过深度清理、回归初始状态的 Remotion 视频创作框架。它为你提供了一个完全纯净的起点，采用 **React + TypeScript + Tailwind CSS** 构建，并内置了强大的 **Trident 资源管理引擎**。

## 📺 项目现状
- **分辨率**: 3840 × 1600 (超宽屏)
- **帧率**: 30fps
- **默认时长**: 150帧 (5秒)
- **Composition ID**: `Main`

## 🚀 快速开始

### 1. 安装环境
```bash
npm install
```

### 2. 预览模式
```bash
npm start
```
浏览器将打开 `http://localhost:3000`。你会看到一个“Pure Initialization Complete”的渐变背景。

### 3. 渲染视频
```bash
npm run build
```
输出文件将保存在 `out/video.mp4`。

## 📂 核心目录结构
```
src/
├── trident/         # 🔱 Trident 资源管理引擎 (核心逻辑)
├── utils/           # 🛠️ 辅助工具 (资源解析、环境检测)
├── constants.ts     # ⚙️ 配置中心 (定义分辨率、时长、颜色、资源清单)
├── MainVideo.tsx    # 🎬 主时间轴 (编排你的场景)
├── Root.tsx         # 🌐 入口渲染逻辑
├── index.ts         # 📌 注册根组件
└── style.css        # 🎨 全局样式 (含 Tailwind)
```

## 🎯 如何开始创作？

1.  **定义资源**: 在 `src/constants.ts` 的 `ASSETS_MANIFEST` 中添加你的字体、图片或视频。
2.  **创建场景**: 在 `src/` 下新建文件夹或文件编写你的 React 视频组件。
3.  **编排时间轴**: 在 `src/MainVideo.tsx` 中使用 `<Sequence>` 组件安排各场景的出现时间。
4.  **实时调整**: 利用 Remotion Preview 的实时刷新功能进行微调。

## 🔱 关于 Trident 引擎
Trident 确保所有资源（字体、图片等）在渲染开始前 100% 加载完成，彻底解决“预览与渲染不一致”的问题。
详情请参考：[Trident 使用手册](file:///home/ctrl/remotion-v1-Def/src/README.md)

---
祝创作愉快！🚀
