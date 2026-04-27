import { createTextAnimation } from './shared'

export const FadeUp = createTextAnimation('fade-up', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; transform:translateY(28px); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.55s ease ${i * 45}ms, transform 0.55s ease ${i * 45}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'translateY(0)'
    }, 20))
  })
  timers.push(setTimeout(() => onDone?.(), (chars.length - 1) * 45 + 600))
  setCleanup(() => timers.forEach(clearTimeout))
})
