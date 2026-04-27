import { createTextAnimation } from './shared'

export const ScaleBounce = createTextAnimation('scale-bounce', (chars, _c, _a, setCleanup, onDone) => {
  const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; transform:scale(0.3); transition:none; transform-origin:50% 80%; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.5s ease ${i * 50}ms, transform 0.6s ${spring} ${i * 50}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'scale(1)'
    }, 20))
  })
  timers.push(setTimeout(() => onDone?.(), (chars.length - 1) * 50 + 650))
  setCleanup(() => timers.forEach(clearTimeout))
})
