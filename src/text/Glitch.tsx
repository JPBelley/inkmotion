import { createTextAnimation, kf } from './shared'

export const Glitch = createTextAnimation('glitch', (chars, _c, _a, setCleanup, onDone) => {
  kf('glitch', `
    0%   { transform: translate(-4px, 2px) skewX(-5deg); opacity: 0.4; }
    20%  { transform: translate(4px, -2px) skewX(3deg);  opacity: 0.7; }
    40%  { transform: translate(-2px, 4px) skewX(-2deg); opacity: 0.5; }
    60%  { transform: translate(3px, -3px) skewX(4deg);  opacity: 0.8; }
    80%  { transform: translate(-1px, 1px);               opacity: 0.9; }
    100% { transform: translate(0, 0);                    opacity: 1;   }
  `)
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.animation = 'inkmotion-glitch 0.5s ease forwards'
      if (i === chars.length - 1) timers.push(setTimeout(() => onDone?.(), 500))
    }, i * 40))
  })
  setCleanup(() => {
    timers.forEach(clearTimeout)
    chars.forEach(ch => { ch.style.animation = '' })
  })
})
