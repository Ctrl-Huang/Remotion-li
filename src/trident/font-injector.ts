
import { TridentAsset } from './types';
import { TridentStore } from './store';

export const injectFontStyles = (fonts: TridentAsset[]) => {
  if (typeof document === 'undefined') return;

  const cssRules = fonts.map(font => {
    const resolvedUrl = TridentStore.get(font.id);
    const systemStack = font.src.systemNames?.map(n => `local('${n}')`).join(', ') || '';
    const fallbackStack = font.fallback?.fontStack?.join(', ') || 'sans-serif';
    
    // 优先级：Blob URL (已下载) -> 系统本地名 -> 回退栈
    const srcArray = [];
    
    // 1. 系统本地名 (最快)
    if (font.src.systemNames) {
      font.src.systemNames.forEach(n => srcArray.push(`local('${n}')`));
    }

    // 2. 挖掘到的资源 (Blob URL)
    if (resolvedUrl) {
      srcArray.push(`url('${resolvedUrl}') format('truetype')`);
    }

    return `
      @font-face {
        font-family: '${font.id}';
        src: ${srcArray.join(', ')};
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      /* 定义全局 CSS 变量方便 Tailwind 使用 */
      :root {
        --font-${font.id}: '${font.id}', ${fallbackStack};
      }
    `;
  }).join('\n');

  const styleId = 'trident-font-styles';
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    document.head.appendChild(style);
  }
  style.innerHTML = cssRules;
};
