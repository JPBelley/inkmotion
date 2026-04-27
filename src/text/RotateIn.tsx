import { createTextAnimation } from './shared'

export const RotateIn = createTextAnimation('rotate-in', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; transform:translateY(30px) rotate(-20deg); transition:none; transform-origin:50% 80%; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.5s ease ${i * 50}ms, transform 0.55s cubic-bezier(0.34,1.3,0.64,1) ${i * 50}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'translateY(0) rotate(0)'
    }, 20))
  })
  timers.push(setTimeout(() => onDone?.(), (chars.length - 1) * 50 + 600))
  setCleanup(() => timers.forEach(clearTimeout))
})
