
import { getInputProps } from 'remotion';

/**
 * 🕵️ Trident Environment Detector
 * 三重环境嗅探机制
 */

// Method 1: Check Node.js/Vite Environment Variables
const checkProcessEnv = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.REMOTION_RENDER_MODE === 'cloud') return 'cloud';
      if (process.env.NODE_ENV === 'production') return 'build';
    }
    // Vite specific
    if ((import.meta as any).env && (import.meta as any).env.MODE === 'production') return 'build';
  } catch (e) {}
  return null;
};

// Method 2: Check Remotion Input Props (Runtime injection)
const checkInputProps = () => {
  try {
    const props = getInputProps();
    if (props.cloud === 'true' || props.cloud === true) return 'cloud';
    if (props.env === 'production') return 'build';
  } catch (e) {}
  return null;
};

// Method 3: Browser/Navigator Heuristics (User Agent & Protocol)
const checkBrowserHeuristics = () => {
  if (typeof window === 'undefined') return 'server';
  
  const ua = window.navigator.userAgent;
  const protocol = window.location.protocol;

  // Headless Chrome usually indicates a render environment
  if (ua.includes('HeadlessChrome')) return 'cloud';
  
  // File protocol usually indicates local render or preview
  if (protocol === 'file:') return 'local-render';
  
  return 'local-preview';
};

export const getEnvironment = () => {
  const env1 = checkProcessEnv();
  if (env1 === 'cloud') return 'cloud';

  const env2 = checkInputProps();
  if (env2 === 'cloud') return 'cloud';

  const env3 = checkBrowserHeuristics();
  if (env3 === 'cloud') return 'cloud';

  return 'local';
};

export const isCloud = () => getEnvironment() === 'cloud';
