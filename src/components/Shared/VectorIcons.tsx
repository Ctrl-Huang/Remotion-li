import React from 'react';

// 专为 4K 设计的矢量图标，不依赖系统字体
export const VectorIcons = {
  Browser: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <path d="M2 8h20M6 13h4M6 17h8" strokeLinecap="round" />
    </svg>
  ),
  Shield: ({ size = 100, color = "#00FF95" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" />
    </svg>
  ),
  Fingerprint: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M12 11c0 3.517-2.167 6.517-5.222 7.5M17 5.14C16.07 4.43 14.79 4 13.5 4c-3.037 0-5.5 2.463-5.5 5.5v1.14M12 11c0-1.105.895-2 2-2s2 .895 2 2v2M10.5 11.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v3" />
    </svg>
  ),
  Alert: ({ size = 100, color = "#FF0055" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" />
    </svg>
  ),
  // Added icons to support FingerprintV5/05_DisguiseMaster
  Palette: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1.5" fill={color} />
      <circle cx="16" cy="12" r="1.5" fill={color} />
      <circle cx="12" cy="16" r="1.5" fill={color} />
      <circle cx="8" cy="12" r="1.5" fill={color} />
    </svg>
  ),
  Antenna: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.59 16.11a6 6 0 0 1 6.82 0M12 20h.01" strokeLinecap="round" />
    </svg>
  ),
  Settings: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" strokeLinecap="round" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinecap="round" />
    </svg>
  ),
  Cpu: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" strokeLinecap="round" />
    </svg>
  ),
  Check: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Added icons to support FingerprintV5/06_MultiEnvironment
  Globe: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" />
    </svg>
  ),
  Monitor: ({ size = 100, color = "#00F0FF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
    </svg>
  ),
};

// Fix for DisguiseMaster and MultiEnvironment scenes that import 'Icons'
export const Icons = VectorIcons;
