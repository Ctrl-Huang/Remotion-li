
import { ReactNode } from "react";

/**
 * Standard Prop Interface for Scenes
 */
export interface BaseSceneProps {
  durationInFrames?: number;
  title?: string;
  subtitle?: string;
}

/**
 * Standard Prop Interface for Animated Components
 */
export interface AnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}
