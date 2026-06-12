import { useCurrentFrame } from 'remotion';
import { counterValue } from '../styles/animations';

export function useCounterAnimation(startFrame: number, target: number, durationFrames = 60): number {
  const frame = useCurrentFrame();
  return counterValue(frame, startFrame, target, durationFrames);
}
