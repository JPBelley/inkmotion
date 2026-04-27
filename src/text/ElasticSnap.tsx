import { createTextAnimation, kf } from './shared'

export const ElasticSnap = createTextAnimation('elastic-snap', (chars, _c, _a, setCleanup, onDone) => {
  kf('elastic', `
    0%   { transform: scale(0);    opacity: 0; }
    55%  { transform: scale(1.35); opacity: 1; }
    75%  { transform: scale(0.88); }
    90%  { transform: scale(1.08); }
    100% { transform: scale(1);    opacity: 1; }
  `)
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; transform-origin:50% 80%; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.animation = 'inkmotion-elastic 0.7s ease forwards'
      if (i === chars.length - 1) timers.push(setTimeout(() => onDone?.(), 700))
    }, i * 55))
  })
  setCleanup(() => {
    timers.forEach(clearTimeout)
    chars.forEach(ch => { ch.style.animation = '' })
  })
})
