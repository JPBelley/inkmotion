import { default as default_2 } from 'react';
import { FC } from 'react';

export declare const Anticipate: FC<TextAnimationProps>;

export declare const BlurIn: FC<TextAnimationProps>;

export declare const Breathing: FC<SpringAnimationProps>;

export declare const CenterBurst: FC<SpringAnimationProps>;

export declare const CenterOut: FC<TextAnimationProps>;

export declare const ColorSweep: FC<TextAnimationProps>;

export declare const DominoFall: FC<SpringAnimationProps>;

export declare const DragRelease: FC<SpringAnimationProps>;

export declare const DropSettle: FC<SpringAnimationProps>;

export declare const ElasticSnap: FC<TextAnimationProps>;

export declare const ExplodeFormation: FC<SpringAnimationProps>;

export declare const FadeUp: FC<TextAnimationProps>;

export declare const FallDown: FC<TextAnimationProps>;

export declare const FlipX: FC<TextAnimationProps>;

export declare const FlipY: FC<TextAnimationProps>;

export declare const Glitch: FC<TextAnimationProps>;

export declare const GravityBounce: FC<SpringAnimationProps>;

export declare const GravityWell: FC<SpringAnimationProps>;

export declare const JellyHover: FC<SpringAnimationProps>;

export declare const MagneticPull: FC<SpringAnimationProps>;

export declare const NeonPulse: FC<TextAnimationProps>;

export declare const OrbitalDrift: FC<SpringAnimationProps>;

export declare const Pendulum: FC<SpringAnimationProps>;

export declare const RandomRain: FC<TextAnimationProps>;

export declare const Repulsion: FC<SpringAnimationProps>;

export declare const RiseOvershoot: FC<SpringAnimationProps>;

export declare const RotateIn: FC<TextAnimationProps>;

export declare const Rtl: FC<TextAnimationProps>;

export declare const ScaleBounce: FC<TextAnimationProps>;

export declare const ScatterReturn: FC<SpringAnimationProps>;

export declare const Scramble: FC<TextAnimationProps>;

export declare const Shockwave: FC<SpringAnimationProps>;

export declare const SlideRight: FC<TextAnimationProps>;

export declare interface SpringAnimationProps {
    text?: string;
    fontSize?: string;
    color?: string;
    fontFamily?: string;
    italic?: boolean;
    showLabel?: boolean;
    showReplay?: boolean;
    showBaseline?: boolean;
    animateInView?: boolean;
    onComplete?: () => void;
    style?: default_2.CSSProperties;
    className?: string;
}

export declare const SpringKerning: FC<SpringAnimationProps>;

export declare const StaggerFade: FC<TextAnimationProps>;

export declare interface TextAnimationProps {
    text?: string;
    fontSize?: string;
    color?: string;
    accentColor?: string;
    fontFamily?: string;
    showLabel?: boolean;
    showReplay?: boolean;
    animateInView?: boolean;
    onComplete?: () => void;
    style?: default_2.CSSProperties;
    className?: string;
}

export declare const ThermalNoise: FC<SpringAnimationProps>;

export declare const Typewriter: FC<TextAnimationProps>;

export declare const Wave: FC<TextAnimationProps>;

export declare const WaveCascade: FC<SpringAnimationProps>;

export declare const WeightWave: FC<SpringAnimationProps>;

export { }
