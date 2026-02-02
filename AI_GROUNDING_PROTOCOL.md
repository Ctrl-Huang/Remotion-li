# 🤖 AI-Grounding Protocol (面向下游 AI 的开发准则)

> [!IMPORTANT]
> 此文档专供 AI 协作伙伴使用。它定义了本项目在 4K 超宽屏环境下的绝对稳定性规范。

## 1. 核心技术参数 (Static Analysis)
- **分辨率**: 3840 × 1600 (超宽屏)
- **基准帧率**: 30fps
- **渲染引擎**: Remotion 4.0+
- **资源保护**: Trident Ultra v2.0 (强制 100% 预加载)

## 2. 资源引用规范 (Asset Grounding)
下游 AI 在生成代码时**严禁**直接使用 `import` 引入媒体资源。
- **图片/视频**: 必须在 `src/constants.ts` 的 `ASSETS_MANIFEST` 中注册，并使用 `resolveAsset(id)`。
- **字体**: 必须引用 `THEME.fonts` 中定义的变量（如 `var(--font-TikTokSans)`）。

## 3. 已集成的系统级字体 (System-Native Fonts)
项目已深度适配 Linux 系统字体映射，请优先使用以下 ID：
- `TikTokSans`: 用于 Slogan、标题。
- `MiSans`: 用于正文叙述（最佳中文兼容性）。
- `Cascadia`: 用于代码块、技术数据。
- `Emoji`: 用于表情符号（防止渲染丢失）。

## 4. 目录契约 (Folder Contract)
- `src/trident/`: 稳定性核心，**严禁修改**。
- `src/constants.ts`: 唯一的全局配置中心。
- `src/MainVideo.tsx`: 唯一的时间轴入口。
- `src/scenes/`: 推荐的场景存放目录（由下游 AI 创建）。

## 5. 渲染安全建议 (Safety Rules)
1. **FOUT 防护**: 始终通过 `THEME.fonts.xxx` 引用字体，Trident 会处理原子化分发。
2. **内存锁定**: Trident 会将资源转为 Blob，确保渲染时的 IO 绝对稳定。
3. **分辨率意识**: 请注意 3840x1600 的巨大画布，设计时需考虑视觉重心。

---
Protocol Version: 2.0.0
Mode: Absolute Stability
