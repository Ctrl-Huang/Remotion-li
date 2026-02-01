import { TridentAsset } from './trident/types';

export const VIDEO_CONFIG = {
  width: 3840,
  height: 1600,
  fps: 30,
  durationInFrames: 300, // 10 seconds default
  id: "Trident_Scaffold"
};

/**
 * 🔱 TRIDENT ASSET REGISTRY
 */
export const ASSETS_MANIFEST: TridentAsset[] = [
  // --- Core Fonts ---
  {
    id: "DisplayFont",
    type: "font",
    src: {
      local: "fonts/ZCOOLQingKeHuangYou-Regular.ttf",
      remote: "https://raw.githubusercontent.com/google/fonts/main/ofl/zcoolqingkehuangyou/ZCOOLQingKeHuangYou-Regular.ttf",
      systemNames: ["ZCOOL QingKe HuangYou", "Impact"]
    },
    fallback: { fontStack: ["Impact", "sans-serif"] }
  },
  {
    id: "BodyFont",
    type: "font",
    src: {
      local: "fonts/NotoSansSC-Variable.ttf",
      remote: "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf",
      systemNames: ["Noto Sans SC", "Microsoft YaHei"]
    },
    fallback: { fontStack: ["sans-serif"] }
  },
  {
    id: "MonoFont",
    type: "font",
    src: {
      local: "fonts/JetBrainsMono-Variable.ttf",
      remote: "https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
      systemNames: ["JetBrains Mono", "Consolas"]
    },
    fallback: { fontStack: ["monospace"] }
  },

  // --- Core Utilities ---
  {
    id: "NoiseTexture",
    type: "image",
    strategy: "greedy",
    src: {
      // 50x50 noise base64 for grain overlays
      remote: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAA5OTkAAAAAAAAAAABMTExERERmZmZnOtmVAAAACHRSTlMAMwAqzMzMwcvk44gAAAB1SURBVDjLjYwxDQAxEAS9+FnPb4IIQAxiEIMYxCAGMYhBDGIQgxjEIAYxiEEM/h8YxCAGMYhBDGIQgxjEIAYxiEEMYhCDGMQgBjGIQQxiEIMYxCAGMYhBDGIQgxjEIAYxiEEMYhCDGMQgBjGIQQxiEIMYxCAGv70DvhABkiyluVIAAAAASUVORK5CYII="
    }
  }
];

export const THEME = {
  colors: {
    primary: '#00F0FF',
    secondary: '#FF00FF',
    accent: '#BD00FF',
    success: '#00FF95',
    warning: '#FFCC00',
    danger: '#FF0055',
    bg: '#020205',
    text: '#FFFFFF'
  },
  fonts: {
    display: `var(--font-DisplayFont)`,
    body: `var(--font-BodyFont)`,
    mono: `var(--font-MonoFont)`,
    emoji: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  layout: {
    safeWidth: 3400,
    safeHeight: 1400,
  }
};
