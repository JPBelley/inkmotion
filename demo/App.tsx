import { useState, type ComponentType } from 'react'
import {
  DropSettle, RiseOvershoot, GravityBounce, ExplodeFormation, CenterBurst,
  Repulsion, MagneticPull, SpringKerning, DragRelease, GravityWell,
  ThermalNoise, Breathing, OrbitalDrift, StretchWave, Pendulum,
  Shockwave, WaveCascade, JellyHover, ScatterReturn, DominoFall,
  FadeUp, BlurIn, ScaleBounce, SlideRight, Wave, FlipX, FlipY,
  Typewriter, Scramble, Glitch, ColorSweep, CenterOut, FallDown,
  Rtl, NeonPulse, ElasticSnap, RotateIn, Anticipate, StaggerFade, RandomRain,
} from '../src/index'

// ─── Registry ──────────────────────────────────────────────────────────────

const SPRING_COMPONENTS = {
  'drop-settle': DropSettle, 'rise-overshoot': RiseOvershoot,
  'gravity-bounce': GravityBounce, 'explode-formation': ExplodeFormation,
  'center-burst': CenterBurst, 'repulsion': Repulsion,
  'magnetic-pull': MagneticPull, 'spring-kerning': SpringKerning,
  'drag-release': DragRelease, 'gravity-well': GravityWell,
  'thermal-noise': ThermalNoise, 'breathing': Breathing,
  'orbital-drift': OrbitalDrift, 'stretch-wave': StretchWave,
  'pendulum': Pendulum, 'shockwave': Shockwave,
  'wave-cascade': WaveCascade, 'jelly-hover': JellyHover,
  'scatter-return': ScatterReturn, 'domino-fall': DominoFall,
} as const

const TEXT_COMPONENTS = {
  'fade-up': FadeUp, 'blur-in': BlurIn, 'scale-bounce': ScaleBounce,
  'slide-right': SlideRight, 'wave': Wave, 'flip-x': FlipX, 'flip-y': FlipY,
  'typewriter': Typewriter, 'scramble': Scramble, 'glitch': Glitch,
  'color-sweep': ColorSweep, 'center-out': CenterOut, 'fall-down': FallDown,
  'rtl': Rtl, 'neon-pulse': NeonPulse, 'elastic-snap': ElasticSnap,
  'rotate-in': RotateIn, 'anticipate': Anticipate, 'stagger-fade': StaggerFade,
  'random-rain': RandomRain,
} as const

type SpringKey = keyof typeof SPRING_COMPONENTS
type TextKey   = keyof typeof TEXT_COMPONENTS

// ─── Variant metadata ──────────────────────────────────────────────────────

const SPRING_VARIANTS: { id: SpringKey; label: string; category: string }[] = [
  { id: 'drop-settle',       label: 'Drop & Settle',    category: 'entrance' },
  { id: 'rise-overshoot',    label: 'Rise & Overshoot', category: 'entrance' },
  { id: 'gravity-bounce',    label: 'Gravity Bounce',   category: 'entrance' },
  { id: 'explode-formation', label: 'Explode → Form',   category: 'entrance' },
  { id: 'center-burst',      label: 'Center Burst',     category: 'entrance' },
  { id: 'repulsion',         label: 'Repulsion',        category: 'interactive' },
  { id: 'magnetic-pull',     label: 'Magnetic Pull',    category: 'interactive' },
  { id: 'spring-kerning',    label: 'Spring Kerning',   category: 'interactive' },
  { id: 'drag-release',      label: 'Drag & Release',   category: 'interactive' },
  { id: 'gravity-well',      label: 'Gravity Well',     category: 'interactive' },
  { id: 'thermal-noise',     label: 'Thermal Noise',    category: 'ambient' },
  { id: 'breathing',         label: 'Breathing',        category: 'ambient' },
  { id: 'orbital-drift',     label: 'Orbital Drift',    category: 'ambient' },
  { id: 'stretch-wave',      label: 'Stretch Wave',     category: 'ambient' },
  { id: 'pendulum',          label: 'Pendulum',         category: 'ambient' },
  { id: 'shockwave',         label: 'Shockwave',        category: 'event' },
  { id: 'wave-cascade',      label: 'Wave Cascade',     category: 'event' },
  { id: 'jelly-hover',       label: 'Jelly Hover',      category: 'event' },
  { id: 'scatter-return',    label: 'Scatter & Return', category: 'event' },
  { id: 'domino-fall',       label: 'Domino Fall',      category: 'event' },
]

const TEXT_VARIANTS: { id: TextKey; label: string; category: string }[] = [
  { id: 'fade-up',      label: 'Fade Up',       category: 'entrance' },
  { id: 'blur-in',      label: 'Blur In',       category: 'entrance' },
  { id: 'scale-bounce', label: 'Scale Bounce',  category: 'entrance' },
  { id: 'slide-right',  label: 'Slide Right',   category: 'entrance' },
  { id: 'wave',         label: 'Wave',          category: 'entrance' },
  { id: 'flip-x',       label: 'Flip X',        category: 'entrance' },
  { id: 'flip-y',       label: 'Flip Y',        category: 'entrance' },
  { id: 'fall-down',    label: 'Fall Down',     category: 'entrance' },
  { id: 'rtl',          label: 'RTL',           category: 'entrance' },
  { id: 'center-out',   label: 'Center Out',    category: 'entrance' },
  { id: 'typewriter',   label: 'Typewriter',    category: 'stylized' },
  { id: 'scramble',     label: 'Scramble',      category: 'stylized' },
  { id: 'glitch',       label: 'Glitch',        category: 'stylized' },
  { id: 'color-sweep',  label: 'Color Sweep',   category: 'stylized' },
  { id: 'neon-pulse',   label: 'Neon Pulse',    category: 'stylized' },
  { id: 'elastic-snap', label: 'Elastic Snap',  category: 'stylized' },
  { id: 'rotate-in',    label: 'Rotate In',     category: 'stylized' },
  { id: 'anticipate',   label: 'Anticipate',    category: 'stylized' },
  { id: 'stagger-fade', label: 'Stagger Fade',  category: 'stylized' },
  { id: 'random-rain',  label: 'Random Rain',   category: 'stylized' },
]

const MONO  = "'DM Mono', monospace"
const SERIF = "'Instrument Serif', Georgia, serif"

// ─── Preview mode (used by the recording script) ───────────────────────────

function PreviewMode({ name }: { name: string }) {
  const [iteration, setIteration] = useState(0)

  // URL uses PascalCase (ExplodeFormation), registry uses kebab-case (explode-formation)
  const key = name.replace(/([A-Z])/g, (_, c, i) => i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`)
  const isSpring = key in SPRING_COMPONENTS
  const Component = (
    isSpring ? SPRING_COMPONENTS[key as SpringKey] : TEXT_COMPONENTS[key as TextKey]
  ) as ComponentType<{ fontSize?: string; showLabel?: boolean; showReplay?: boolean; showBaseline?: boolean; style?: React.CSSProperties }>

  if (!Component) return null

  const bg    = isSpring ? '#F0EAE0' : '#0F1115'
  const serif = "'Instrument Serif', Georgia, serif"

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <Component
        key={iteration}
        fontSize={isSpring ? 'clamp(56px, 12vw, 96px)' : 'clamp(36px, 8vw, 64px)'}
        showLabel={false}
        showReplay={false}
        showBaseline={isSpring}
        style={{ padding: '0 48px', alignItems: isSpring ? 'flex-start' : 'center' }}
      />
      {/* Hidden button Playwright clicks to trigger each replay */}
      <button
        data-testid="ink-replay"
        onClick={() => setIteration(i => i + 1)}
        style={{ position: 'fixed', bottom: -200, opacity: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      />
      <div style={{
        position: 'fixed',
        bottom: 48,
        right: 48,
        fontFamily: serif,
        fontStyle: 'italic',
        fontSize: 20,
        letterSpacing: '-0.02em',
        color: isSpring ? 'rgba(14,12,9,0.2)' : 'rgba(232,234,240,0.2)',
        userSelect: 'none',
      }}>
        inkmotion
      </div>
    </div>
  )
}

export function App() {
  const preview = new URLSearchParams(window.location.search).get('preview')
  if (preview) return <PreviewMode name={preview} />


  const [tab, setTab]                   = useState<'spring' | 'text'>('spring')
  const [springVariant, setSpringVariant] = useState<SpringKey>('drop-settle')
  const [textVariant, setTextVariant]     = useState<TextKey>('fade-up')

  const isSpring = tab === 'spring'
  const bg     = isSpring ? '#F0EAE0' : '#0F1115'
  const fg     = isSpring ? '#0E0C09' : '#E8EAF0'
  const accent = isSpring ? '#E6100F' : '#7C5CFF'
  const muted  = isSpring ? '#B0A090' : '#4A4A5A'
  const border = isSpring ? 'rgba(14,12,9,0.1)' : 'rgba(255,255,255,0.08)'

  const activeVariant  = isSpring ? springVariant : textVariant
  const variants       = isSpring ? SPRING_VARIANTS : TEXT_VARIANTS
  const categories     = [...new Set(variants.map(v => v.category))]

  const SpringComponent = SPRING_COMPONENTS[springVariant]
  const TextComponent   = TEXT_COMPONENTS[textVariant]

  return (
    <div style={{ minHeight: '100vh', background: bg, color: fg, fontFamily: MONO, transition: 'background 0.4s ease, color 0.4s ease', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', borderBottom: `1px solid ${border}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, letterSpacing: '-0.02em' }}>inkmotion</span>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>v0.1.0</span>
        </div>

        <div style={{ display: 'flex', gap: 2, background: `${fg}0D`, borderRadius: 8, padding: 3 }}>
          {(['spring', 'text'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '6px 16px', borderRadius: 6, border: 'none',
              background: tab === t ? (t === 'spring' ? '#0E0C09' : '#E8EAF0') : 'transparent',
              color: tab === t ? (t === 'spring' ? '#F0EAE0' : '#0F1115') : muted,
              fontFamily: MONO, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s ease',
            }}>
              {t === 'spring' ? 'Spring Physics' : 'CSS Transitions'}
            </button>
          ))}
        </div>

        <span style={{ fontSize: 10, letterSpacing: '0.12em', color: muted, textTransform: 'uppercase' }}>
          {activeVariant}
        </span>
      </header>

      {/* ── Preview ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        {isSpring
          ? <SpringComponent key={springVariant} showLabel={false} showReplay={false} showBaseline />
          : <TextComponent   key={textVariant}   showLabel={false} showReplay={false} />
        }
      </div>

      {/* ── Bottom: picker + docs ─────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 320 }}>

        {/* Variant picker */}
        <div style={{ padding: '32px 48px', borderRight: `1px solid ${border}` }}>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>
                {cat}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {variants.filter(v => v.category === cat).map(v => {
                  const active = activeVariant === v.id
                  return (
                    <button key={v.id}
                      onClick={() => isSpring ? setSpringVariant(v.id as SpringKey) : setTextVariant(v.id as TextKey)}
                      style={{
                        padding: '5px 12px', borderRadius: 4,
                        border: `1px solid ${active ? accent : border}`,
                        background: active ? `${accent}1A` : 'transparent',
                        color: active ? accent : muted,
                        fontFamily: MONO, fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.15s ease',
                      }}
                    >
                      {v.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Documentation */}
        <div style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Install */}
          <section>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 12 }}>install</div>
            <pre style={{ fontFamily: MONO, fontSize: 12, background: `${fg}0A`, border: `1px solid ${border}`, borderRadius: 6, padding: '10px 14px', color: fg }}>
              npm install inkmotion
            </pre>
          </section>

          {/* Usage */}
          <section>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 12 }}>usage</div>
            <pre style={{ fontFamily: MONO, fontSize: 12, background: `${fg}0A`, border: `1px solid ${border}`, borderRadius: 6, padding: '14px 16px', lineHeight: 1.8, overflowX: 'auto' }}>
              <span style={{ color: muted }}>import</span>
              {' { '}
              <span style={{ color: accent }}>{isSpring ? toPascalCase(springVariant) : toPascalCase(textVariant)}</span>
              {' } '}
              <span style={{ color: muted }}>from</span>
              {' '}
              <span style={{ color: isSpring ? '#B87333' : '#4EC9B0' }}>'inkmotion'</span>
              {'\n\n'}
              {'<'}
              <span style={{ color: accent }}>{isSpring ? toPascalCase(springVariant) : toPascalCase(textVariant)}</span>
              {'\n  '}
              <span style={{ color: fg }}>text</span>
              {'='}
              <span style={{ color: isSpring ? '#B87333' : '#4EC9B0' }}>{isSpring ? '"Always cooking"' : '"Always cooking something"'}</span>
              {isSpring ? `\n  showBaseline\n  showReplay` : `\n  showReplay`}
              {'\n  '}
              <span style={{ color: muted }}>{'// animate when scrolled into view'}</span>
              {'\n  animateInView'}
              {'\n/>'}
            </pre>
          </section>

          {/* Props */}
          <section>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 12 }}>props</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <tbody>
                {(isSpring ? SPRING_PROPS : TEXT_PROPS).map(([name, type, def]) => (
                  <tr key={name} style={{ borderBottom: `1px solid ${border}` }}>
                    <td style={{ padding: '7px 0', color: accent, fontFamily: MONO, paddingRight: 16 }}>{name}</td>
                    <td style={{ padding: '7px 0', color: muted, fontFamily: MONO, paddingRight: 16 }}>{type}</td>
                    <td style={{ padding: '7px 0', color: `${fg}80`, fontFamily: MONO }}>{def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

        </div>
      </div>
    </div>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function toPascalCase(s: string) {
  return s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('')
}

const SPRING_PROPS: [string, string, string][] = [
  ['text',         'string',          '"Always cooking"'],
  ['fontSize',     'string',          '"clamp(48px, 9vw, 110px)"'],
  ['color',        'string',          '"#0E0C09"'],
  ['fontFamily',   'string',          'Instrument Serif'],
  ['italic',       'boolean',         'true'],
  ['showLabel',    'boolean',         'true'],
  ['showReplay',   'boolean',         'true'],
  ['showBaseline', 'boolean',         'true'],
  ['animateInView','boolean',         'false'],
  ['onComplete',   '() => void',      '—'],
  ['style',        'CSSProperties',   '—'],
  ['className',    'string',          '—'],
]

const TEXT_PROPS: [string, string, string][] = [
  ['text',        'string',         '"Always cooking something"'],
  ['fontSize',    'string',         '"clamp(28px, 5vw, 64px)"'],
  ['color',       'string',         '"#E8EAF0"'],
  ['accentColor', 'string',         '"#7C5CFF"'],
  ['fontFamily',  'string',         'Space Grotesk'],
  ['showLabel',    'boolean',       'true'],
  ['showReplay',   'boolean',       'true'],
  ['animateInView','boolean',       'false'],
  ['onComplete',   '() => void',    '—'],
  ['style',       'CSSProperties',  '—'],
  ['className',   'string',         '—'],
]
