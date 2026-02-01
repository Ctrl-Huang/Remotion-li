
import { TridentConfig } from './types';

/**
 * ⚙️ Trident Default Configuration
 * 修改此处以调整全局默认行为
 */
export const DEFAULT_CONFIG: TridentConfig = {
  timeout: 10000, // 10秒超时
  maxRetries: 2,  // 失败重试2次
  debug: true     // 默认开启日志
};

// 单例配置存储
let currentConfig = { ...DEFAULT_CONFIG };

export const configureTrident = (config: Partial<TridentConfig>) => {
  currentConfig = { ...currentConfig, ...config };
};

export const getConfig = () => currentConfig;
