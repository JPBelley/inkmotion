import { createTextAnimation, kf, COLOR_MINT } from './shared'

export const NeonPulse = createTextAnimation('neon-pulse', (chars, _c, accentColor, setCleanup, onDone) => {
  kf('neon', `
    0%   { opacity: 0; text-shadow: none; }
    30%  { opacity: 1; text-shadow: 0 0 8px ${accentColor}, 0 0 20px ${accentColor}, 0 0 40px ${accentColor}; color: #fff; }
    60%  { text-shadow: 0 0 4px ${COLOR_MINT}, 0 0 12px ${COLOR_MINT}; color: #fff; }
    100% { opacity: 1; text-shadow: none; }
  `)
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.animation = 'inkmotion-neon 0.7s ease forwards'
      if (i === chars.length - 1) timers.push(setTimeout(() => onDone?.(), 700))
    }, i * 55))
  })
  setCleanup(() => {
    timers.forEach(clearTimeout)
    chars.forEach(ch => { ch.style.animation = '' })
  })
})
