
export const VIDEO_CONFIG = {
  width: 3840,
  height: 1600,
  fps: 30,
  durationInFrames: 150, // 5 seconds
  id: "Main"
};

export const THEME = {
  colors: {
    primary: '#00F0FF',
    bg: '#020205',
    text: '#FFFFFF',
  },
  fonts: {
    display: 'var(--font-TikTokSans)',
    body: 'var(--font-MiSans)',
    mono: 'var(--font-Cascadia)',
    emoji: 'var(--font-Emoji)',
  }
};

/**
 * Trident Ultra: System-First Asset Manifest
 * Using the high-quality fonts pre-installed on the system.
 */
export const ASSETS_MANIFEST = [
  {
    id: "TikTokSans",
    type: "font",
    src: {
      systemNames: [
        "TikTok Sans",
        "TikTok Sans Medium",
        "TikTok Sans SemiBold",
        "TikTok Sans Bold"
      ]
    },
    fallback: { fontStack: ["sans-serif"] }
  },
  {
    id: "MiSans",
    type: "font",
    src: {
      systemNames: [
        "MiSans",
        "MiSans Regular",
        "MiSans Medium",
        "MiSans Bold"
      ]
    },
    fallback: { fontStack: ["sans-serif"] }
  },
  {
    id: "Cascadia",
    type: "font",
    src: {
      systemNames: [
        "Cascadia Code",
        "Cascadia Code Regular"
      ]
    },
    fallback: { fontStack: ["monospace"] }
  },
  {
    id: "Emoji",
    type: "font",
    src: {
      systemNames: [
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"
      ]
    },
    fallback: { fontStack: ["sans-serif"] }
  }
];
