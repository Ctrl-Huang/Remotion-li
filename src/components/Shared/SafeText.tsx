
import React, { useMemo } from 'react';
import { useVideoConfig } from 'remotion';

export const SafeText: React.FC<{
  text: string;
  fontSize: number;
  color: string;
  bold?: boolean;
  italic?: boolean;
  className?: string;
}> = ({ text, fontSize, color, bold = true, italic = true, className = "" }) => {
  const { width: videoWidth } = useVideoConfig();

  // 在离线渲染环境中，Canvas 绘图通常比 DOM 文字渲染更稳定
  const textImage = useMemo(() => {
    if (typeof document === 'undefined') return null;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 预设超大字体以保证 4K 清晰度
    const renderSize = fontSize * 2; 
    ctx.font = `${bold ? '900' : 'normal'} ${italic ? 'italic' : ''} ${renderSize}px "Arial Black", "Impact", sans-serif`;
    
    const metrics = ctx.measureText(text);
    canvas.width = metrics.width + 20;
    canvas.height = renderSize * 1.5;

    // 重新设置 font（更改 canvas 尺寸后重置）
    ctx.font = `${bold ? '900' : 'normal'} ${italic ? 'italic' : ''} ${renderSize}px "Arial Black", "Impact", sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    
    // 绘制文字并添加一个强制描边增强对比度
    ctx.strokeStyle = 'black';
    ctx.lineWidth = renderSize / 20;
    ctx.strokeText(text, 10, canvas.height / 2);
    ctx.fillText(text, 10, canvas.height / 2);

    return canvas.toDataURL();
  }, [text, fontSize, color, bold, italic]);

  if (!textImage) return <span className={className}>{text}</span>;

  return (
    <img 
      src={textImage} 
      alt={text} 
      style={{ height: fontSize, width: 'auto' }} 
      className={className} 
    />
  );
};
