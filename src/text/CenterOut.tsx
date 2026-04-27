import { createTextAnimation } from './shared'

export const CenterOut = createTextAnimation('center-out', (chars, _c, _a, setCleanup, onDone) => {
  const mid = (chars.length - 1) / 2
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    const delay = Math.abs(i - mid) * 55
    ch.style.cssText = 'opacity:0; transform:scale(0.5) translateY(20px); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'scale(1) translateY(0)'
    }, 20))
  })
  const maxDelay = Math.max(...chars.map((_, i) => Math.abs(i - mid))) * 55
  timers.push(setTimeout(() => onDone?.(), maxDelay + 600))
  setCleanup(() => timers.forEach(clearTimeout))
})
