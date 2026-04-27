import { createTextAnimation } from './shared'

export const SlideRight = createTextAnimation('slide-right', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    const delay = (chars.length - 1 - i) * 40
    ch.style.cssText = 'opacity:0; transform:translateX(36px); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'translateX(0)'
    }, 20))
  })
  timers.push(setTimeout(() => onDone?.(), (chars.length - 1) * 40 + 550))
  setCleanup(() => timers.forEach(clearTimeout))
})
