
import React from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';
import { VIDEO_CONFIG, ASSETS_MANIFEST } from './constants';
import { TridentGate } from './trident/TridentGate';
import './style.css'; 

export const RemotionRoot: React.FC = () => {
  return (
    <TridentGate assets={ASSETS_MANIFEST}>
      <Composition
        id={VIDEO_CONFIG.id}
        component={MainVideo}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{
          env: 'preview'
        }}
      />
    </TridentGate>
  );
};
