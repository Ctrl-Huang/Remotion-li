import React from 'react';
import { AbsoluteFill } from 'remotion';
import { THEME } from './constants';

export const MainVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{
            backgroundColor: THEME.colors.bg,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: THEME.colors.text,
            fontSize: 100,
            fontFamily: THEME.fonts.display
        }}>
            Purity & Stability Active
        </AbsoluteFill>
    );
};
