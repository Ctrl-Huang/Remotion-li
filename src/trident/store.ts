
/**
 * 🧠 Trident Memory Store
 * 存储已经通过 "深度挖掘" 后生成的 Blob URL 或最终确认可用的 URL
 */

const resolvedAssets = new Map<string, string>();

export const TridentStore = {
  set: (id: string, url: string) => {
    resolvedAssets.set(id, url);
  },
  
  get: (id: string): string | undefined => {
    return resolvedAssets.get(id);
  },

  has: (id: string): boolean => {
    return resolvedAssets.has(id);
  },

  dump: () => Object.fromEntries(resolvedAssets)
};
