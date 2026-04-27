import { createTextAnimation } from './shared'

export const RandomRain = createTextAnimation('random-rain', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    const fromY = -(40 + Math.random() * 120)
    const delay = Math.random() * 600
    const dur = 400 + Math.random() * 300
    ch.style.cssText = `opacity:0; transform:translateY(${fromY}px); transition:none; display:inline-block; white-space:pre;`
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity ${dur}ms ease, transform ${dur}ms cubic-bezier(0.34,1.4,0.64,1)`
      ch.style.opacity = '1'
      ch.style.transform = 'translateY(0)'
      if (i === chars.length - 1) timers.push(setTimeout(() => onDone?.(), dur))
    }, delay))
  })
  setCleanup(() => timers.forEach(clearTimeout))
})
