import { createTextAnimation } from './shared'

export const Rtl = createTextAnimation('rtl', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    const delay = (chars.length - 1 - i) * 45
    ch.style.cssText = 'opacity:0; transform:translateY(28px); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'translateY(0)'
    }, 20))
  })
  timers.push(setTimeout(() => onDone?.(), (chars.length - 1) * 45 + 600))
  setCleanup(() => timers.forEach(clearTimeout))
})
