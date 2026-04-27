import { createTextAnimation, kf } from './shared'

export const Anticipate = createTextAnimation('anticipate', (chars, _c, _a, setCleanup, onDone) => {
  kf('anticipate', `
    0%   { transform: translateY(0)   scale(1);    opacity: 0; }
    20%  { transform: translateY(8px) scale(0.95); opacity: 0.4; }
    100% { transform: translateY(0)   scale(1);    opacity: 1; }
  `)
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.animation = 'inkmotion-anticipate 0.7s cubic-bezier(0.36,-0.3,0.63,1.3) forwards'
      if (i === chars.length - 1) timers.push(setTimeout(() => onDone?.(), 700))
    }, i * 50))
  })
  setCleanup(() => {
    timers.forEach(clearTimeout)
    chars.forEach(ch => { ch.style.animation = '' })
  })
})
