export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION_FRAMES = 1350; // 45s * 30fps

// Scene timing in frames (1 frame = 1/30s)
export const SCENES = {
  s1: { start: 0,   end: 120  }, // 0-4s
  s2: { start: 120, end: 300  }, // 4-10s
  s3: { start: 300, end: 600  }, // 10-20s
  s4: { start: 600, end: 900  }, // 20-30s
  s5: { start: 900, end: 1140 }, // 30-38s
  s6: { start: 1140, end: 1350 }, // 38-45s
};

// Transition duration in frames
export const TRANSITION_FRAMES = 12; // 0.4s
