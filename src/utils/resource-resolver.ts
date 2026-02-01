
import { TridentStore } from '../trident/store';

/**
 * 兼容性封装：通过 Trident ID 获取 URL
 */
export const resolveAsset = (assetId: string): string => {
  const url = TridentStore.get(assetId);
  if (!url) {
    console.warn(`[ResolveAsset] Asset not found in Trident Store: ${assetId}`);
    return '';
  }
  return url;
};

// Deprecated font resolver (kept to prevent compile errors in old scenes)
export const resolveFontSource = (asset: any): string => {
  return '';
};
