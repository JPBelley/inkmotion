import React, { useCallback, useEffect, useRef } from 'react'

// ─── Design tokens ─────────────────────────────────────────────────────────

export const FONT_SERIF  = "'Instrument Serif', Georgia, serif"
export const FONT_MONO   = "'DM Mono', monospace"
export const COLOR_TEXT  = '#0E0C09'
export const COLOR_MUTED = '#B0A090'
export const COLOR_ACCENT = '#E6100F'

// ─── Spring physics ────────────────────────────────────────────────────────

export type S1 = { pos: number; vel: number }
export type S2 = { x: number; y: number; vx: number; vy: number }

export function sp(s: S1, target: number, k = 0.08, d = 0.72): boolean {
  s.vel += (target - s.pos) * k
  s.vel *= d
  s.pos += s.vel
  return Math.abs(s.vel) + Math.abs(target - s.pos) < 0.05
}

export function sp2(s: S2, tx: number, ty: number, k = 0.08, d = 0.72): boolean {
  s.vx += (tx - s.x) * k; s.vx *= d; s.x += s.vx
  s.vy += (ty - s.y) * k; s.vy *= d; s.y += s.vy
  return Math.hypot(s.vx, s.vy) + Math.hypot(tx - s.x, ty - s.y) < 0.05
}

// ─── RAF loop ──────────────────────────────────────────────────────────────

export type RAFRef = React.MutableRefObject<number | null>

export function loop(rafRef: RAFRef, tick: () => boolean, onDone?: () => void) {
  cancelAnimationFrame(rafRef.current!)
  const run = () => {
    if (!tick()) rafRef.current = requestAnimationFrame(run)
    else onDone?.()
  }
  rafRef.current = requestAnimationFrame(run)
}

export function resetChars(chars: HTMLSpanElement[]) {
  chars.forEach(ch => {
    ch.style.cssText = 'display:inline-block; white-space:pre; opacity:0;'
  })
}

// ─── Runner type ───────────────────────────────────────────────────────────

export type Runner = (
  chars: HTMLSpanElement[],
  container: HTMLElement,
  rafRef: RAFRef,
  setCleanup: (fn: () => void) => void,
  onDone?: () => void
) => void

// ─── Props ─────────────────────────────────────────────────────────────────

export interface SpringAnimationProps {
  text?: string
  fontSize?: string
  color?: string
  fontFamily?: string
  italic?: boolean
  showLabel?: boolean
  showReplay?: boolean
  showBaseline?: boolean
  animateInView?: boolean
  onComplete?: () => void
  style?: React.CSSProperties
  className?: string
}

// ─── Factory ───────────────────────────────────────────────────────────────

export function createSpringAnimation(label: string, runner: Runner): React.FC<SpringAnimationProps> {
  function Component({
    text = 'Always cooking',
    fontSize = 'clamp(48px, 9vw, 110px)',
    color = COLOR_TEXT,
    fontFamily = FONT_SERIF,
    italic = true,
    showLabel = true,
    showReplay = true,
    showBaseline = true,
    animateInView = false,
    onComplete,
    style,
    className,
  }: SpringAnimationProps) {
    const chars = text.split('')
    const containerRef = useRef<HTMLElement | null>(null)
    const charRefs = useRef<HTMLSpanElement[]>([])
    const rafRef = useRef<number | null>(null)
    const cleanupRef = useRef<() => void>(() => {})

    const start = useCallback(() => {
      const el = containerRef.current
      if (!el || charRefs.current.length === 0) return
      cleanupRef.current()
      cleanupRef.current = () => {}
      cancelAnimationFrame(rafRef.current!)
      resetChars(charRefs.current)
      runner(charRefs.current, el, rafRef, fn => { cleanupRef.current = fn }, onComplete)
    }, [onComplete])

    useEffect(() => {
      if (!animateInView) {
        const t = setTimeout(start, 16)
        return () => {
          clearTimeout(t)
          cancelAnimationFrame(rafRef.current!)
          cleanupRef.current()
        }
      }

      const el = containerRef.current
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { start(); observer.disconnect() } },
        { threshold: 0.2 }
      )
      observer.observe(el)
      return () => {
        observer.disconnect()
        cancelAnimationFrame(rafRef.current!)
        cleanupRef.current()
      }
    }, [start, text, animateInView])

    return (
      <div
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '40px 48px',
          fontFamily: FONT_MONO,
          ...style,
        }}
      >
        {showLabel && (
          <span style={{
            fontFamily: FONT_MONO,
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: COLOR_MUTED,
            marginBottom: 20,
          }}>
            {label}
          </span>
        )}

        <span
          ref={el => { containerRef.current = el }}
          style={{
            fontFamily,
            fontSize,
            fontWeight: 400,
            fontStyle: italic ? 'italic' : 'normal',
            color,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {chars.map((ch, i) => (
            <span
              key={i}
              ref={el => { if (el) charRefs.current[i] = el }}
              style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}
            >
              {ch}
            </span>
          ))}
        </span>

        {showBaseline && (
          <div style={{
            width: '100%',
            height: 1,
            background: color,
            marginTop: 18,
            opacity: 0.18,
          }} />
        )}

        {showReplay && (
          <button
            onClick={start}
            style={{
              marginTop: 28,
              padding: 0,
              background: 'none',
              border: 'none',
              fontFamily: FONT_MONO,
              fontSize: 11,
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: COLOR_ACCENT,
              cursor: 'pointer',
              textTransform: 'lowercase',
            }}
          >
            ↺ replay
          </button>
        )}
      </div>
    )
  }

  Component.displayName = label
  return Component
}
