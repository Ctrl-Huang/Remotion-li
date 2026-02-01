# 💻 开发者快速入门指南

这份文档是给开发者和 AI 助手看的，包含编码规范和技术细节。如果你是第一次使用这个项目，建议先看根目录的 `README.md`。

---

## 核心开发规则

### 规则 1：所有资源必须通过 Trident 管理

**❌ 错误做法**：
```tsx
// 直接 import 图片
import logo from './logo.png';

// 直接写死 URL
<img src="https://example.com/image.png" />

// 硬编码字体名
<h1 style={{ fontFamily: 'My Custom Font' }}>
```

**✅ 正确做法**：
```tsx
// 1. 在 constants.ts 中注册资源
export const ASSETS_MANIFEST = [
  { id: "Logo", type: "image", src: { local: "images/logo.png" } }
];

// 2. 在组件中使用 resolveAsset
import { resolveAsset } from '../utils/resource-resolver';

const logoUrl = resolveAsset('Logo');
<img src={logoUrl} />
```

**为什么**：直接 import 或硬编码 URL 会导致：
- 离线渲染时资源找不到
- 网络不稳定时加载失败
- 失去 Trident 的多级回退保护

---

### 规则 2：禁止在组件内使用异步请求

**❌ 错误做法**：
```tsx
// 禁止用 useEffect 发起异步请求
useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(setData);
}, []);
```

**✅ 正确做法**：
```tsx
// 所有数据在渲染前准备好，通过 props 传入
export const MyScene: React.FC<{ data: DataType }> = ({ data }) => {
  // 直接使用 data，不要异步获取
};
```

**为什么**：Remotion 渲染是确定性的，每一帧的状态必须可预测。异步请求会导致：
- 每次渲染结果不一致
- 无法在离线环境渲染
- 渲染时间不可控

---

### 规则 3：使用 spring 动画，不要用 CSS transition

**❌ 错误做法**：
```css
.animated {
  transition: transform 0.3s ease;
}
```

**✅ 正确做法**：
```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const MyScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({
    frame,
    fps,
    config: { damping: 12 }  // 控制弹性
  });
  
  return (
    <div style={{ transform: `scale(${scale})` }}>
      内容
    </div>
  );
};
```

**为什么**：CSS transition 在视频渲染时不可靠，`spring` 是基于帧计算的，确保每次渲染结果一致。

---

### 规则 4：颜色和字体必须从 THEME 引用

**❌ 错误做法**：
```tsx
<div style={{ color: '#00F0FF', fontFamily: 'Arial' }}>
```

**✅ 正确做法**：
```tsx
import { THEME } from '../constants';

<div style={{ 
  color: THEME.colors.primary,
  fontFamily: THEME.fonts.display 
}}>
```

**为什么**：集中管理主题，方便统一修改配色方案。

---

### 规则 5：视频组件必须加容错处理

**❌ 错误做法**：
```tsx
<Video src={videoUrl} />
```

**✅ 正确做法**：
```tsx
import { Video } from 'remotion';
import { resolveAsset } from '../utils/resource-resolver';

<Video 
  src={resolveAsset('MyVideo')}
  crossOrigin="anonymous"  // 跨域处理
  playsInline              // 移动端兼容
  onError={(e) => {
    console.error('Video failed:', e);
  }}
/>
```

---

## 场景组件模板（复制粘贴即用）

### 基础场景模板

```tsx
import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../constants';

export const MyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 入场动画：0到1的平滑过渡
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 }
  });

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div style={{ 
        transform: `scale(${entrance})`,
        opacity: entrance 
      }}>
        <h1 
          className="text-8xl font-bold italic"
          style={{ 
            fontFamily: THEME.fonts.display,
            color: THEME.colors.primary
          }}
        >
          场景内容
        </h1>
      </div>
    </AbsoluteFill>
  );
};
```

### 带出场动画的场景

```tsx
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../constants';

export const MyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 入场：0-30帧，从0到1
  const entrance = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // 出场：最后30帧，从1到0
  const exit = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp' }
  );

  const opacity = Math.min(entrance, exit);

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* 内容 */}
    </AbsoluteFill>
  );
};
```

### 循环动画场景

```tsx
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const MyScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 每60帧循环一次
  const rotation = (frame % 60) * 6;  // 每帧转6度，60帧转一圈

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div style={{ 
        transform: `rotate(${rotation}deg)`,
        width: 200,
        height: 200,
        background: 'cyan'
      }}>
        旋转方块
      </div>
    </AbsoluteFill>
  );
};
```

---

## 动画技巧

### 1. spring（弹簧动画）

最常用的动画，有弹性效果。

```tsx
const value = spring({
  frame,
  fps,
  config: {
    damping: 10,    // 阻尼（越大越不弹）
    stiffness: 100, // 刚度（越大越快）
    mass: 1         // 质量（越大越慢）
  }
});
```

**常用配置**：
- 快速入场：`{ damping: 12, stiffness: 100 }`
- 柔和入场：`{ damping: 20, stiffness: 50 }`
- 强烈弹跳：`{ damping: 5, stiffness: 200 }`

### 2. interpolate（线性插值）

精确控制数值变化。

```tsx
// 基本用法：将帧数映射到其他值
const opacity = interpolate(
  frame,        // 输入值
  [0, 30],      // 输入范围
  [0, 1]        // 输出范围
);
// 第0帧时 opacity=0，第30帧时 opacity=1

// 多段动画
const scale = interpolate(
  frame,
  [0, 30, 60],    // 三个关键帧
  [0, 1.2, 1]     // 先放大到1.2，再回到1
);
```

### 3. 缓动函数（Easing）

```tsx
import { Easing, interpolate } from 'remotion';

const value = interpolate(
  frame,
  [0, 60],
  [0, 1],
  {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),  // 自定义贝塞尔曲线
    // 或使用预设：
    // easing: Easing.ease
    // easing: Easing.linear
    // easing: Easing.in(Easing.quad)
  }
);
```

### 4. 延迟动画

```tsx
const delayedEntrance = spring({
  frame: frame - 30,  // 延迟30帧后才开始
  fps,
  config: { damping: 12 }
});
```

---

## 4K 超宽屏设计规范

### 画布尺寸

```
总宽度：3840px
总高度：1600px
比例：2.4:1（电影级超宽屏）
```

### 三段式布局

```
|--- 环境层 ---|--- 逻辑层 ---|--- 环境层 ---|
|   0-800px   | 800-3040px  | 3040-3840px |
|   装饰区域   |  核心内容区  |   装饰区域   |
```

**规则**：
- 重要内容**必须**在逻辑层（800-3040px）
- 环境层放装饰元素（HUD、数据流、扫描线等）
- 上下各留 100px 安全区

### 示例布局

```tsx
<AbsoluteFill>
  {/* 左侧环境层 */}
  <div className="absolute left-0 top-0 w-[800px] h-full">
    装饰元素
  </div>

  {/* 中心逻辑层 */}
  <div className="absolute left-[800px] top-0 w-[2240px] h-full flex items-center justify-center">
    核心内容
  </div>

  {/* 右侧环境层 */}
  <div className="absolute right-0 top-0 w-[800px] h-full">
    装饰元素
  </div>
</AbsoluteFill>
```

---

## 配色方案

### 主题色定义

在 `constants.ts` 里已定义：

```typescript
export const THEME = {
  colors: {
    primary: '#00F0FF',    // 青色：主要强调、扫描线
    secondary: '#FF00FF',  // 品红：次要强调
    accent: '#BD00FF',     // 紫色：特殊状态
    success: '#00FF95',    // 绿色：成功、验证通过
    warning: '#FFCC00',    // 黄色：警告
    danger: '#FF0055',     // 红色：错误、警报
    bg: '#020205',         // 深黑色：背景
    text: '#FFFFFF'        // 白色：文字
  }
};
```

### 使用场景

| 颜色 | 使用场景 |
|-----|---------|
| `primary` | 关键路径、扫描线、高亮边框 |
| `success` | 验证通过、隔离成功 |
| `warning` | 渲染状态、AI 处理中 |
| `danger` | 隐私泄露、脏 IP、非法访问 |

---

## 字体使用规范

### 三种字体角色

```typescript
THEME.fonts = {
  display: 'var(--font-DisplayFont)',  // 标题专用，必须斜体
  body: 'var(--font-BodyFont)',        // 正文，400或900字重
  mono: 'var(--font-MonoFont)'         // 代码和数据
}
```

### 使用规则

1. **Display Font（展示字体）**
   - 仅用于标题和花字
   - **必须**加 `italic` 斜体
   - 字号建议：80px - 200px

2. **Body Font（正文字体）**
   - 用于解说文字、说明
   - 字重：400（常规）或 900（加粗）
   - 字号建议：24px - 60px

3. **Mono Font（等宽字体）**
   - 用于代码、IP地址、哈希值
   - 字号建议：20px - 40px

### 示例

```tsx
{/* 标题：Display + 斜体 */}
<h1 className="text-[120px] font-bold italic" style={{ fontFamily: THEME.fonts.display }}>
  TRIDENT ENGINE
</h1>

{/* 正文：Body */}
<p className="text-4xl font-normal" style={{ fontFamily: THEME.fonts.body }}>
  资产锚定协议
</p>

{/* 代码：Mono */}
<code className="text-2xl font-mono" style={{ fontFamily: THEME.fonts.mono }}>
  192.168.1.1
</code>
```

---

## 特殊字符转义

**重要**：在 JSX 中，以下字符必须转义：

```tsx
// ❌ 错误
<p>规则 >> 执行</p>

// ✅ 正确
<p>规则 &gt;&gt; 执行</p>
```

**常用转义**：
- `<` → `&lt;`
- `>` → `&gt;`
- `&` → `&amp;`
- `"` → `&quot;`

---

## 性能优化建议

### 1. 避免重复计算

**❌ 错误**：
```tsx
return (
  <div>
    {[...Array(100)].map((_, i) => {
      const value = complexCalculation(frame, i);  // 每次渲染计算100次
      return <Item key={i} value={value} />;
    })}
  </div>
);
```

**✅ 正确**：
```tsx
const values = useMemo(() => {
  return [...Array(100)].map((_, i) => complexCalculation(frame, i));
}, [frame]);

return (
  <div>
    {values.map((value, i) => <Item key={i} value={value} />)}
  </div>
);
```

### 2. 大量元素用 CSS transform

GPU 加速的属性：`transform`, `opacity`

CPU 计算的属性：`left`, `top`, `width`, `height`

```tsx
// ✅ 推荐（GPU 加速）
<div style={{ transform: `translateX(${x}px)` }} />

// ❌ 不推荐（CPU 计算）
<div style={{ left: `${x}px` }} />
```

### 3. 按需加载大型资源

```tsx
// 视频文件用 lazy 策略
{
  id: "BigVideo",
  type: "video",
  strategy: "lazy",  // 需要时才加载
  src: { local: "videos/big.mp4" }
}
```

---

## 给 AI 助手的特别指令

如果你是被要求编写新场景的 AI 助手，请严格遵守：

### 必须遵守的约束

1. **禁止硬编码颜色**：必须引用 `THEME.colors.*`
2. **禁止硬编码字体**：必须引用 `THEME.fonts.*`
3. **禁止直接 import 资源**：必须通过 `resolveAsset()`
4. **禁止 CSS transition**：必须用 `spring` 或 `interpolate`
5. **禁止 useEffect 异步请求**：所有数据通过 props 传入

### 代码输出规范

1. **文件头部注释**：说明场景用途和时长建议
2. **组件名称**：用 PascalCase，以 `Scene` 结尾（如 `HeroScene`）
3. **Props 类型**：如果有 props，定义 TypeScript 接口
4. **动画变量命名**：`entrance`, `exit`, `scale`, `opacity` 等语义化命名

### 示例输出

```tsx
/**
 * 英雄场景 - 片头动画
 * 建议时长：90帧（3秒）
 */
import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../constants';

interface HeroSceneProps {
  title: string;
  subtitle: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 }
  });

  return (
    <AbsoluteFill 
      className="flex flex-col items-center justify-center"
      style={{ backgroundColor: THEME.colors.bg }}
    >
      <h1 
        className="text-[120px] font-bold italic"
        style={{ 
          fontFamily: THEME.fonts.display,
          color: THEME.colors.primary,
          transform: `scale(${entrance})`
        }}
      >
        {title}
      </h1>
      
      <p 
        className="text-4xl mt-8"
        style={{ 
          fontFamily: THEME.fonts.body,
          color: THEME.colors.text,
          opacity: entrance
        }}
      >
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};
```

---

## 调试技巧

### 1. 查看当前帧数

```tsx
const frame = useCurrentFrame();
console.log('Current frame:', frame);

// 在画面上显示
<div className="absolute top-4 left-4 text-white">
  Frame: {frame}
</div>
```

### 2. 条件渲染避免报错

```tsx
// 某些元素在特定帧才出现
{frame > 30 && <MyComponent />}

// 避免除以零
const progress = frame === 0 ? 0 : frame / durationInFrames;
```

### 3. 使用浏览器开发者工具

预览时按 F12，可以：
- 检查元素布局
- 查看 console.log 输出
- 调试 CSS 样式

---

## 总结：开发检查清单

创建新场景前，确认：

- [ ] 场景文件名以 `Scene.tsx` 结尾
- [ ] 所有颜色从 `THEME.colors` 引用
- [ ] 所有字体从 `THEME.fonts` 引用
- [ ] 动画使用 `spring` 或 `interpolate`
- [ ] 如果用了资源，已在 `constants.ts` 注册
- [ ] 使用 `resolveAsset()` 获取资源 URL
- [ ] 没有 `useEffect` 异步请求
- [ ] 特殊字符已转义（`>>` → `&gt;&gt;`）
- [ ] 布局适配 4K 超宽屏（使用三段式）
- [ ] 组件有 TypeScript 类型定义

现在你已经掌握了所有开发规范，可以开始创作了！🚀
