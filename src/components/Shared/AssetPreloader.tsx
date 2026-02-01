
import React, { useEffect, useState } from 'react';
import { delayRender, continueRender } from 'remotion';
import { ASSETS_MANIFEST } from '../../constants';
import { excavateAsset } from '../../trident/core';
import { injectFontStyles } from '../../trident/font-injector';
import { TridentAsset } from '../../trident/types';

export const AssetPreloader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [handle] = useState(() => delayRender('Trident_Asset_Protocol'));

  useEffect(() => {
    let active = true;

    const ignite = async () => {
      // Trident Logic: Excavate all assets to populate TridentStore
      // This replaces the old logic and ensures resolveAsset() works in MainVideo
      await Promise.all(ASSETS_MANIFEST.map(excavateAsset));

      // Filter fonts for injection
      const fonts: TridentAsset[] = [];
      ASSETS_MANIFEST.forEach(a => {
        if (a.type === 'font') fonts.push(a);
      });

      // Inject font styles
      injectFontStyles(fonts);

      // Wait for document fonts to be ready
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn("[Trident] System font timeout, ignoring.");
      }

      if (active) {
        setIsReady(true);
        continueRender(handle);
      }
    };

    ignite();

    return () => {
      active = false;
    };
  }, [handle]);

  if (!isReady) return null;

  return <>{children}</>;
};
