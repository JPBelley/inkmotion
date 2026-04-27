import { createTextAnimation } from './shared'

export const StaggerFade = createTextAnimation('stagger-fade', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    const delay = i * 80
    ch.style.cssText = 'opacity:0; transform:translateY(10px); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'translateY(0)'
    }, 20))
  })
  timers.push(setTimeout(() => onDone?.(), (chars.length - 1) * 80 + 1050))
  setCleanup(() => timers.forEach(clearTimeout))
})
