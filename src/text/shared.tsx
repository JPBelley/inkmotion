import React, { useCallback, useEffect, useRef } from 'react'

// ─── Design tokens ─────────────────────────────────────────────────────────

export const FONT_SANS   = "'Space Grotesk', system-ui, sans-serif"
export const FONT_MONO   = "'DM Mono', monospace"
export const COLOR_TEXT  = '#E8EAF0'
export const COLOR_ACCENT = '#7C5CFF'
export const COLOR_MINT  = '#2EE6A6'

// ─── Keyframe injection ────────────────────────────────────────────────────

const _injected = new Set<string>()

export function kf(name: string, css: string) {
  if (_injected.has(name) || typeof document === 'undefined') return
  const s = document.createElement('style')
  s.id = `inkmotion-kf-${name}`
  s.textContent = `@keyframes inkmotion-${name} { ${css} }`
  document.head.appendChild(s)
  _injected.add(name)
}

// ─── Runner type ───────────────────────────────────────────────────────────

export type TextRunner = (
  chars: HTMLSpanElement[],
  container: HTMLElement,
  accentColor: string,
  setCleanup: (fn: () => void) => void,
  onDone?: () => void
) => void

// ─── Props ─────────────────────────────────────────────────────────────────

export interface TextAnimationProps {
  text?: string
  fontSize?: string
  color?: string
  accentColor?: string
  fontFamily?: string
  showLabel?: boolean
  showReplay?: boolean
  animateInView?: boolean
  onComplete?: () => void
  style?: React.CSSProperties
  className?: string
}

// ─── Factory ───────────────────────────────────────────────────────────────

export function createTextAnimation(label: string, runner: TextRunner): React.FC<TextAnimationProps> {
  function Component({
    text = 'Always cooking something',
    fontSize = 'clamp(28px, 5vw, 64px)',
    color = COLOR_TEXT,
    accentColor = COLOR_ACCENT,
    fontFamily = FONT_SANS,
    showLabel = true,
    showReplay = true,
    animateInView = false,
    onComplete,
    style,
    className,
  }: TextAnimationProps) {
    const chars = text.split('')
    const containerRef = useRef<HTMLElement | null>(null)
    const charRefs = useRef<HTMLSpanElement[]>([])
    const cleanupRef = useRef<() => void>(() => {})

    const start = useCallback(() => {
      const el = containerRef.current
      if (!el || charRefs.current.length === 0) return
      cleanupRef.current()
      cleanupRef.current = () => {}
      runner(charRefs.current, el, accentColor, fn => { cleanupRef.current = fn }, onComplete)
    }, [accentColor, onComplete])

    useEffect(() => {
      if (!animateInView) {
        const t = setTimeout(start, 16)
        return () => { clearTimeout(t); cleanupRef.current() }
      }

      const el = containerRef.current
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { start(); observer.disconnect() } },
        { threshold: 0.2 }
      )
      observer.observe(el)
      return () => { observer.disconnect(); cleanupRef.current() }
    }, [start, text, animateInView])

    return (
      <div
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            color: `${accentColor}99`,
            marginBottom: 24,
          }}>
            {label}
          </span>
        )}

        <span
          ref={el => { containerRef.current = el }}
          style={{
            fontFamily,
            fontSize,
            fontWeight: 700,
            color,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
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

        {showReplay && (
          <button
            onClick={start}
            style={{
              marginTop: 40,
              padding: '10px 24px',
              background: `${accentColor}1F`,
              border: `1px solid ${accentColor}4D`,
              borderRadius: 6,
              color: accentColor,
              fontFamily: FONT_MONO,
              fontSize: 12,
              cursor: 'pointer',
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
