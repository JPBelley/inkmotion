import { createTextAnimation } from './shared'

export const Wave = createTextAnimation('wave', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    const delay = i * 55 + Math.sin(i * 0.9) * 120
    ch.style.cssText = 'opacity:0; transform:translateY(32px); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'translateY(0)'
    }, 20))
  })
  const last = Math.max(...chars.map((_, i) => i * 55 + Math.sin(i * 0.9) * 120))
  timers.push(setTimeout(() => onDone?.(), last + 550))
  setCleanup(() => timers.forEach(clearTimeout))
})
