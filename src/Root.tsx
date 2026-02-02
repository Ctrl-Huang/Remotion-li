import React from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';
import { VIDEO_CONFIG, ASSETS_MANIFEST } from './constants';
import { TridentGate } from './trident/TridentGate';
import './style.css';

const MainVideoWrapper: React.FC = () => {
  return (
    <TridentGate assets={ASSETS_MANIFEST as any}>
      <MainVideo />
    </TridentGate>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={VIDEO_CONFIG.id}
        component={MainVideoWrapper}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};
