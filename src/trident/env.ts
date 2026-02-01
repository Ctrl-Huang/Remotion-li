
import { getInputProps } from 'remotion';

export type TridentEnv = 'local' | 'cloud' | 'build';

export const detectEnvironment = (): TridentEnv => {
  // 1. Process / Vite Env
  try {
    if (process.env.REMOTION_RENDER_MODE === 'cloud') return 'cloud';
    if ((import.meta as any).env?.MODE === 'production') return 'build';
  } catch {}

  // 2. Input Props
  try {
    const props = getInputProps();
    if (props.cloud) return 'cloud';
  } catch {}

  // 3. Browser Heuristics
  if (typeof window !== 'undefined') {
    if (navigator.userAgent.includes('HeadlessChrome')) return 'cloud';
  }

  return 'local';
};

export const IS_CLOUD = detectEnvironment() === 'cloud';
