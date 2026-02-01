import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { THEME, VIDEO_CONFIG } from './constants';
import { ExampleScene } from './scenes/ExampleScene';
import { resolveAsset } from './utils/resource-resolver';

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.bg }}>
      <Sequence from={0} durationInFrames={VIDEO_CONFIG.durationInFrames}>
        <ExampleScene />
      </Sequence>

      {/* Global Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url(${resolveAsset('NoiseTexture')})` }}
      />
    </AbsoluteFill>
  );
};
