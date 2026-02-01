
import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../constants';

export const ExampleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 }
  });

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div 
        className="text-center" 
        style={{ transform: `scale(${entrance})`, opacity: entrance }}
      >
        <h1 
          className="text-[120px] font-bold text-white italic tracking-tighter"
          style={{ fontFamily: THEME.fonts.display }}
        >
          TRIDENT ENGINE
        </h1>
        
        <div className="mt-8 flex items-center justify-center gap-6">
          <div className="h-1 w-20 bg-primary" />
          <p 
            className="text-3xl text-primary font-mono tracking-[0.5em]"
            style={{ fontFamily: THEME.fonts.mono }}
          >
            SCAFFOLD_READY
          </p>
          <div className="h-1 w-20 bg-primary" />
        </div>
      </div>
    </AbsoluteFill>
  );
};
