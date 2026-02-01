# 🎨 设计规范手册

本手册定义了 4K 超宽屏技术视频的视觉标准。无论是设计师还是开发者，都应该遵循这些规范。

---

## 画布规格

### 基本参数

```
分辨率：3840 × 1600 像素
宽高比：2.4:1（超宽屏电影比例）
帧率：30 FPS
色彩空间：sRGB
```

### 为什么用 2.4:1？

- **沉浸感**：比传统 16:9 更宽，视野更开阔
- **信息密度**：左右两侧可以放装饰元素，不会让画面空洞
- **科技感**：电影级比例，适合技术解说视频

---

## 布局系统：三段式分布

### 区域划分

```
┌─────────────┬──────────────────────┬─────────────┐
│  环境层     │      逻辑层          │  环境层     │
│  0-800px   │   800-3040px        │ 3040-3840px│
│  装饰区域   │    核心内容区        │  装饰区域   │
│             │   (2240px宽)        │             │
└─────────────┴──────────────────────┴─────────────┘
```

### 1. 逻辑层（核心内容区）

**位置**：水平 800px - 3040px，宽度 2240px

**放什么**：
- 主标题和关键信息
- 产品功能演示
- 重要的动画元素
- 所有需要用户关注的内容

**规则**：
- ✅ 重要内容**必须**在这个区域
- ✅ 文字大小：根据内容,自行设定
- ❌ 不要让内容超出这个区域

### 2. 环境层（装饰区域）

**位置**：
- 左侧：0 - 800px
- 右侧：3040px - 3840px

**放什么**：
- 根据内容,自行设定


**规则**：
- ✅ 装饰性内容，可以放心添加
- ✅ 可以让内容滚动或闪烁


### 3. 垂直安全区

**上下留白**：各 100px

**为什么**：
- 避免内容太靠边缘
- 预留扫描线轨迹空间
- 视觉上更舒适

---

## 配色方案

### 主题色定义

```typescript
// 在 constants.ts 中已定义
根据内容,自行设定
```

### 颜色使用场景

| 颜色 | HEX | 使用场景 | 示例 |
|-----|-----|---------|-----|
| Primary | `#00F0FF` | 扫描线、关键路径、高亮边框 | "已加密"状态 |
| Secondary | `#FF00FF` | 次要强调、品牌色 | Logo、副标题 |
| Accent | `#BD00FF` | 特殊状态、渲染中 | AI 处理动画 |
| Success | `#00FF95` | 验证通过、正确状态 | 隔离成功图标 |
| Warning | `#FFCC00` | 警告、注意事项 | "需要审核" |
| Danger | `#FF0055` | 错误、警报 | IP 泄露警告 |
| BG | `#020205` | 背景色 | 全局背景 |
| Text | `#FFFFFF` | 主要文字 | 所有文字内容 |

### 配色示例

```tsx
// ✅ 正确：用主题色
<div style={{ 
  color: THEME.colors.primary,
  borderColor: THEME.colors.success 
}}>

// ❌ 错误：硬编码颜色
<div style={{ color: '#00F0FF' }}>
```

### 渐变使用

科技风格常用渐变：

```css
/* 青色到紫色 */
background: linear-gradient(135deg, #00F0FF 0%, #BD00FF 100%);

/* 深黑到微亮 */
background: linear-gradient(to bottom, #020205 0%, #0a0a0f 100%);

/* 发光效果 */
box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
```

---

## 字体系统

### 只能选用以下字体以及Emoji 符号并且智能识别本地的字体路径，融合使用，确保云端部署与本地部署完全一致；

```

/usr/local/share/fonts/TikTokSans36pt-SemiBoldItalic.ttf:
/usr/local/share/fonts/TikTokSans36pt-Light.ttf:
/usr/local/share/fonts/seguiemj-1.45-3d.ttf:
/usr/local/share/fonts/TikTokSans36pt-Bold.ttf:
/usr/local/share/fonts/CascadiaCode-LightItalic.otf:
/usr/local/share/fonts/TikTokSans36pt-Medium.ttf:
/usr/local/share/fonts/MiSans-Medium.ttf:
/usr/local/share/fonts/CascadiaCode-Regular.otf:
/usr/local/share/fonts/TikTokSans36pt-Black.ttf:
/usr/local/share/fonts/TikTokSans36pt-Regular.ttf:
/usr/local/share/fonts/TikTokSans36pt-Italic.ttf:
/usr/local/share/fonts/TikTokSans36pt-BoldItalic.ttf:
/usr/local/share/fonts/seguiemj-1.40-3d.ttf:
/usr/local/share/fonts/MiSans-Heavy.ttf:
/usr/local/share/fonts/TikTokSans36pt-SemiBold.ttf:
/usr/local/share/fonts/CascadiaCode-Light.otf:
/usr/local/share/fonts/self-compiled-flat.ttf:
/usr/local/share/fonts/MiSans-Thin.ttf:
/usr/local/share/fonts/MiSans-Semibold.ttf:
/usr/local/share/fonts/MiSans-Bold.ttf:
/usr/local/share/fonts/CascadiaCode-ExtraLight.otf:
/usr/local/share/fonts/TikTokSans36pt-ExtraBoldItalic.ttf:
/usr/local/share/fonts/MiSans-Regular.ttf:
/usr/local/share/fonts/CascadiaCode-SemiLightItalic.otf:
/usr/local/share/fonts/TikTokSans36pt-MediumItalic.ttf:
/usr/local/share/fonts/AppleColorEmoji.woff:
/usr/local/share/fonts/CascadiaCode-SemiLight.otf:
/usr/local/share/fonts/seguisym.ttf:
/usr/local/share/fonts/CascadiaCode-SemiBold.otf:
/usr/local/share/fonts/MiSans-Light.ttf:
/usr/local/share/fonts/TikTokSans36pt-ExtraBold.ttf:
/usr/local/share/fonts/AppleColorEmoji.ttf:
/usr/local/share/fonts/TikTokSans36pt-BlackItalic.ttf:
/usr/local/share/fonts/MiSans-ExtraLight.ttf:
/usr/local/share/fonts/CascadiaCode-SemiBoldItalic.otf:
/usr/local/share/fonts/MiSans-Demibold.ttf:
/usr/local/share/fonts/MiSans-Normal.ttf:
/usr/local/share/fonts/seguiemj-1.35-flat.ttf:
/usr/local/share/fonts/CascadiaCode-BoldItalic.otf:
/usr/local/share/fonts/CascadiaCode-ExtraLightItalic.otf:
/usr/local/share/fonts/TikTokSans36pt-LightItalic.ttf:
/usr/local/share/fonts/CascadiaCode-Italic.otf:
/usr/local/share/fonts/CascadiaCode-Bold.otf:

```


### 使用示例

```tsx
{/* 超大标题 */}
<h1 
  className="text-[160px] font-bold italic"
  style={{ fontFamily: THEME.fonts.display }}
>
  TRIDENT ENGINE
</h1>

{/* 正文说明 */}
<p 
  className="text-4xl"
  style={{ fontFamily: THEME.fonts.body }}
>
  资产锚定协议确保渲染稳定性
</p>

{/* 代码块 */}
<code 
  className="text-2xl font-mono"
  style={{ fontFamily: THEME.fonts.mono }}
>
  192.168.1.1:8080
</code>
```

---

## 排版规则

### 1. 文字间距

```tsx
// 标题：紧凑
<h1 className="tracking-tighter">  // letter-spacing: -0.05em

// 正文：正常
<p className="tracking-normal">    // letter-spacing: 0

// 代码：宽松
<code className="tracking-[0.5em]">  // letter-spacing: 0.5em
```

### 2. 行高

```tsx
// 标题：紧凑（1.0-1.2）
<h1 className="leading-tight">

// 正文：舒适（1.5-1.8）
<p className="leading-relaxed">

// 代码：等行距（1.5）
<code className="leading-normal">
```

### 3. 对齐

```
中心内容：居中对齐（flex items-center justify-center）
说明文字：左对齐
数据：右对齐（数字对齐）
```

---

## 动画规范

### 动画速度

```
快速（弹性入场）：30帧（1秒）
  ├─ 用途：图标、小元素
  └─ spring({ damping: 12 })

中速（平滑过渡）：60帧（2秒）
  ├─ 用途：标题、卡片
  └─ spring({ damping: 20 })

慢速（沉稳展示）：90帧（3秒）
  ├─ 用途：大场景切换
  └─ spring({ damping: 30 })
```

### 动画类型

#### 1. 入场动画

```tsx
// 缩放入场
const scale = spring({ frame, fps, config: { damping: 12 } });
<div style={{ transform: `scale(${scale})` }} />

// 滑入
const translateX = interpolate(frame, [0, 30], [-100, 0]);
<div style={{ transform: `translateX(${translateX}px)` }} />

// 淡入
const opacity = interpolate(frame, [0, 20], [0, 1]);
<div style={{ opacity }} />
```

#### 2. 循环动画

```tsx
// 旋转（每60帧一圈）
const rotation = (frame % 60) * 6;
<div style={{ transform: `rotate(${rotation}deg)` }} />

// 脉冲（心跳效果）
const pulse = Math.sin(frame * 0.1) * 0.1 + 1;
<div style={{ transform: `scale(${pulse})` }} />

// 滚动文字
const scroll = -(frame * 2) % 1000;
<div style={{ transform: `translateY(${scroll}px)` }} />
```

#### 3. 强调动画

```tsx
// 高亮闪烁
const blink = frame % 30 < 15 ? 1 : 0.5;
<div style={{ opacity: blink }} />

// 扫描线
const scanY = (frame * 10) % 1600;
<div style={{ top: `${scanY}px` }} className="scan-line" />
```

---

## 视觉效果

### 1. 发光效果

```tsx
// CSS 发光
<div style={{
  boxShadow: `
    0 0 10px ${THEME.colors.primary},
    0 0 20px ${THEME.colors.primary},
    0 0 40px ${THEME.colors.primary}
  `
}} />

// 文字发光
<h1 style={{
  textShadow: `
    0 0 10px ${THEME.colors.primary},
    0 0 20px ${THEME.colors.primary}
  `
}}>
  发光文字
</h1>
```

### 2. 扫描线效果

```tsx
{/* 水平扫描线 */}
<div 
  className="absolute left-0 w-full h-[2px]"
  style={{
    top: `${(frame * 5) % 1600}px`,
    background: THEME.colors.primary,
    boxShadow: `0 0 10px ${THEME.colors.primary}`
  }}
/>
```

### 3. 网格背景

```css
/* 在 CSS 中 */
.grid-bg {
  background-image: 
    linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

### 4. 毛玻璃效果

```tsx
<div style={{
  background: 'rgba(2, 2, 5, 0.7)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${THEME.colors.primary}`,
  borderRadius: '8px'
}}>
  内容
</div>
```

---

## 组件设计模式

### HUD 面板

```tsx
<div 
  className="absolute top-8 left-8 p-6"
  style={{
    background: 'rgba(0, 240, 255, 0.05)',
    border: `1px solid ${THEME.colors.primary}`,
    fontFamily: THEME.fonts.mono,
    fontSize: '20px'
  }}
>
  <div>STATUS: ACTIVE</div>
  <div>IP: 192.168.1.1</div>
  <div>TIME: 14:32:05</div>
</div>
```

### 数据流效果

```tsx
const DataStream = () => {
  const frame = useCurrentFrame();
  
  return (
    <div className="absolute right-8 top-0 h-full overflow-hidden w-[200px]">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            transform: `translateY(${((frame * 3 + i * 80) % 1600) - 80}px)`,
            opacity: 0.3,
            fontFamily: THEME.fonts.mono,
            fontSize: '14px',
            color: THEME.colors.success
          }}
        >
          {Math.random().toString(16).substring(2, 10).toUpperCase()}
        </div>
      ))}
    </div>
  );
};
```

### 进度条

```tsx
const ProgressBar = ({ progress }: { progress: number }) => (
  <div 
    className="w-[500px] h-[4px]"
    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
  >
    <div 
      style={{
        width: `${progress * 100}%`,
        height: '100%',
        background: THEME.colors.primary,
        boxShadow: `0 0 10px ${THEME.colors.primary}`
      }}
    />
  </div>
);
```

---

## 设计检查清单

在发布场景前，确认：

### 布局
- [ ] 重要内容在逻辑层（800-3040px）
- [ ] 上下留白各 ≥ 100px
- [ ] 左右环境层有装饰元素（不能空白）

### 配色
- [ ] 所有颜色从 `THEME.colors` 引用
- [ ] 没有硬编码的颜色值
- [ ] 配色符合使用场景（如成功用绿色）



### 动画
- [ ] 使用 `spring` 或 `interpolate`，不用 CSS transition
- [ ] 动画速度合理（不要太快或太慢）
- [ ] 循环动画流畅自然

### 效果
- [ ] 发光效果不要太强（避免刺眼）
- [ ] 文字可读性良好（对比度足够）
- [ ] 动画不会让人眼花缭乱

---

## 设计灵感

### 参考风格


- **科技 HUD**：控制台界面、数据流、系统状态


### 不要做

- ❌ 过少装饰（画面太少）
- ❌ 颜色太多（保持3-4种主色）
- ❌ 动画太复杂（容易让人分心）
- ❌ 文字太大或者太小（4K 屏幕也要考虑可读性）

---

## 总结

好的 4K 技术视频设计应该：

1. **清晰**：信息层级分明，重点突出
2. **科技感**：用扫描线、网格、HUD 等元素
3. **舒适**：适当留白，不要太满
4. **一致**：统一的配色和字体
5. **动感**：流畅的动画，但不过度

现在你已经掌握了所有设计规范，可以创作出专业级的技术视频了！🎨
