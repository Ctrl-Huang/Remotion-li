
import React from 'react';

// 微型装饰图标库 - 用于构建高密度背景
export const MicroIcon = {
  CircuitNode: ({ color = "#00F0FF", size = 80 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
      <circle cx="12" cy="12" r="10" strokeDasharray="2 2" />
    </svg>
  ),
  PulseLine: ({ color = "#34C759", size = 80 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  ),
  BioScan: ({ color = "#F5F5F7", size = 80 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
      <path d="M8 12h8M12 8v8" strokeDasharray="1 1" />
    </svg>
  ),
  ShieldLock: ({ color = "#00F0FF", size = 80 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  ),
  Crosshair: ({ color = "#FFFFFF", size = 80 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  ),
  Hex: ({ color = "#FFFFFF", size = 80 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1">
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
    </svg>
  )
};

// 核心业务图标库
export const TechIcon = {
  Globe: ({ color = "white", size = 80 }: { color?: string, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Lock: ({ color = "white", size = 80 }: { color?: string, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Browser: ({ color = "white", size = 80 }: { color?: string, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <path d="M2 8h20" />
    </svg>
  ),
  Zap: ({ color = "white", size = 80 }: { color?: string, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M13 2 L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Shield: ({ color = "white", size = 80 }: { color?: string, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Cpu: ({ color = "white", size = 80 }: { color?: string, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </svg>
  ),
};
