
import React from 'react';

export const GeoIcon = {
  // 用三个嵌套方块代替指纹
  Target: ({ size = 100, color = "#00F0FF" }) => (
    <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
      <div className="absolute inset-0 border-4 animate-spin-slow" style={{ borderColor: color, borderRadius: '20%' }} />
      <div className="absolute inset-4 border-2 opacity-60" style={{ borderColor: color, borderRadius: '15%' }} />
      <div className="w-4 h-4" style={{ backgroundColor: color }} />
    </div>
  ),
  // 用几何盾牌
  Shield: ({ size = 100, color = "#00FF95" }) => (
    <div style={{ width: size, height: size * 1.2, border: `6px solid ${color}`, borderRadius: '0 0 50% 50%', borderTopWidth: '15px' }} />
  ),
  // 警告三角
  Alert: ({ size = 100, color = "#FF0055" }) => (
    <div style={{ 
      width: 0, height: 0, 
      borderLeft: `${size/2}px solid transparent`, 
      borderRight: `${size/2}px solid transparent`, 
      borderBottom: `${size}px solid ${color}` 
    }} />
  )
};
