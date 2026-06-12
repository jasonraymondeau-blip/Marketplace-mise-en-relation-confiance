import React from 'react';
import { Composition, AbsoluteFill, Sequence, continueRender, delayRender, staticFile } from 'remotion';
import { VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_FPS, VIDEO_DURATION_FRAMES, SCENES } from './consts';
import { Scene1Problem } from './scenes/Scene1Problem';
import { Scene2MoBann } from './scenes/Scene2MoBann';
import { Scene3Solution } from './scenes/Scene3Solution';
import { Scene4Categories } from './scenes/Scene4Categories';
import { Scene5Metrics } from './scenes/Scene5Metrics';
import { Scene6CTA } from './scenes/Scene6CTA';

const ZaferLaunchVideo: React.FC = () => {
  const [handle] = React.useState(() => delayRender('Loading fonts'));

  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap';
    link.onload = () => continueRender(handle);
    link.onerror = () => continueRender(handle);
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', fontFamily: "'DM Sans', sans-serif" }}>
      <Sequence from={SCENES.s1.start} durationInFrames={SCENES.s1.end - SCENES.s1.start + 12}>
        <AbsoluteFill>
          <Scene1Problem />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={SCENES.s2.start - 12} durationInFrames={SCENES.s2.end - SCENES.s2.start + 24}>
        <AbsoluteFill>
          <Scene2MoBann />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={SCENES.s3.start - 12} durationInFrames={SCENES.s3.end - SCENES.s3.start + 24}>
        <AbsoluteFill>
          <Scene3Solution />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={SCENES.s4.start - 12} durationInFrames={SCENES.s4.end - SCENES.s4.start + 24}>
        <AbsoluteFill>
          <Scene4Categories />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={SCENES.s5.start - 12} durationInFrames={SCENES.s5.end - SCENES.s5.start + 24}>
        <AbsoluteFill>
          <Scene5Metrics />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={SCENES.s6.start - 12} durationInFrames={VIDEO_DURATION_FRAMES - (SCENES.s6.start - 12)}>
        <AbsoluteFill>
          <Scene6CTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ZaferLaunch"
        component={ZaferLaunchVideo}
        durationInFrames={VIDEO_DURATION_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
