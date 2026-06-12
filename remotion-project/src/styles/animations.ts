import { interpolate, spring, Easing } from 'remotion';

export const SPRING_PRESETS = {
  logo: { mass: 1, damping: 20, stiffness: 80 },
  card: { mass: 1, damping: 24, stiffness: 120 },
  button: { mass: 0.8, damping: 22, stiffness: 100 },
};

export function fadeIn(frame: number, startFrame: number, durationFrames = 18): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
}

export function slideUp(frame: number, startFrame: number, distance = 20, durationFrames = 24): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [distance, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
}

export function slideInFrom(
  frame: number,
  startFrame: number,
  direction: 'left' | 'right' | 'top' | 'bottom',
  distance = 30,
  durationFrames = 30
): number {
  const from = direction === 'left' || direction === 'top' ? -distance : distance;
  return interpolate(frame, [startFrame, startFrame + durationFrames], [from, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
}

export function scaleSpring(frame: number, startFrame: number, fps: number, config = SPRING_PRESETS.logo): number {
  return spring({ frame: frame - startFrame, fps, config, from: 0, to: 1 });
}

export function counterValue(frame: number, startFrame: number, targetValue: number, durationFrames = 60): number {
  return Math.round(
    interpolate(frame, [startFrame, startFrame + durationFrames], [0, targetValue], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    })
  );
}

export function sceneTransitionOut(frame: number, outStartFrame: number, durationFrames = 12): number {
  return interpolate(frame, [outStartFrame, outStartFrame + durationFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.ease),
  });
}

export function sceneTransitionIn(frame: number, inStartFrame: number, durationFrames = 12): number {
  return interpolate(frame, [inStartFrame, inStartFrame + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
}
