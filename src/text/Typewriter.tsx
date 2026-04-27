import { createTextAnimation } from './shared'

export const Typewriter = createTextAnimation('typewriter', (chars, _c, _a, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach(ch => { ch.style.cssText = 'opacity:0; display:inline-block; white-space:pre;' })
  chars.forEach((ch, i) => {
    timers.push(setTimeout(() => {
      ch.style.opacity = '1'
      if (i === chars.length - 1) onDone?.()
    }, i * 80))
  })
  setCleanup(() => timers.forEach(clearTimeout))
})
