import { createTextAnimation } from './shared'

export const BlurIn = createTextAnimation('blur-in', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; filter:blur(12px); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.6s ease ${i * 40}ms, filter 0.6s ease ${i * 40}ms`
      ch.style.opacity = '1'
      ch.style.filter = 'blur(0)'
    }, 20))
  })
  timers.push(setTimeout(() => onDone?.(), (chars.length - 1) * 40 + 650))
  setCleanup(() => timers.forEach(clearTimeout))
})
