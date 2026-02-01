
export * from './types';
export * from './TridentGate';
export { TridentStore } from './store';
// Helper hook to use assets in components
import { TridentStore } from './store';

export const useTridentUrl = (id: string) => {
  const url = TridentStore.get(id);
  if (!url) {
    console.warn(`[Trident] Accessing undefined asset: ${id}`);
    return '';
  }
  return url;
};
