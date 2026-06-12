import { useCurrentFrame } from 'remotion';
import { fadeIn, slideInFrom } from '../styles/animations';

export function useStaggeredFade(baseStartFrame: number, index: number, staggerFrames = 9): number {
  const frame = useCurrentFrame();
  const startFrame = baseStartFrame + index * staggerFrames;
  return fadeIn(frame, startFrame);
}

export function useStaggeredSlide(
  baseStartFrame: number,
  index: number,
  direction: 'left' | 'right' | 'top' | 'bottom',
  staggerFrames = 9,
  distance = 30
): number {
  const frame = useCurrentFrame();
  const startFrame = baseStartFrame + index * staggerFrames;
  return slideInFrom(frame, startFrame, direction, distance);
}
