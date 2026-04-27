import { createTextAnimation } from './shared'

export const FallDown = createTextAnimation('fall-down', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; transform:translateY(-60px); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.3s ease ${i * 45}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 45}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'translateY(0)'
    }, 20))
  })
  timers.push(setTimeout(() => onDone?.(), (chars.length - 1) * 45 + 550))
  setCleanup(() => timers.forEach(clearTimeout))
})
