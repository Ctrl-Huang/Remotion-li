
import React, { useEffect, useState } from 'react';
import { continueRender, delayRender } from 'remotion';
import { TridentAsset, TridentConfig } from './types';
import { excavateAsset } from './core';
import { injectFontStyles } from './font-injector';
import { configureTrident } from './config';

interface TridentGateProps {
  assets: TridentAsset[];
  config?: Partial<TridentConfig>;
  children: React.ReactNode;
}

export const TridentGate: React.FC<TridentGateProps> = ({ assets, config, children }) => {
  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender('Trident_Asset_Lock'));

  useEffect(() => {
    // 1. 初始化配置
    if (config) {
      configureTrident(config);
    }

    const ignite = async () => {
      const fonts: TridentAsset[] = [];
      const media: TridentAsset[] = [];

      assets.forEach(a => (a.type === 'font' ? fonts.push(a) : media.push(a)));

      // 2. 并行挖掘所有资源 (The Great Excavation)
      await Promise.all(assets.map(excavateAsset));

      // 3. 注入字体 CSS (使用挖掘到的 Blob URL 或 系统名)
      injectFontStyles(fonts);

      // 4. 等待浏览器字体子系统就绪 (The Final Gate)
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn("[Trident] System font timeout, ignoring.");
      }

      setReady(true);
      continueRender(handle);
    };

    ignite();
  }, [assets, handle, config]);

  if (!ready) return null;

  return <>{children}</>;
};
