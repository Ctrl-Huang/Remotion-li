
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

// 注册根组件，加载逻辑由 Root.tsx 中的 AssetPreloader 处理
registerRoot(RemotionRoot);
