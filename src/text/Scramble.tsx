import { createTextAnimation } from './shared'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$'

export const Scramble = createTextAnimation('scramble', (chars, _c, accentColor, setCleanup, onDone) => {
  const originals = chars.map(ch => ch.textContent ?? '')
  const timers: ReturnType<typeof setTimeout>[] = []
  const intervals: ReturnType<typeof setInterval>[] = []
  chars.forEach(ch => { ch.style.cssText = 'display:inline-block; white-space:pre; opacity:1;' })
  let resolved = 0
  chars.forEach((ch, i) => {
    if (ch.textContent === ' ') { resolved++; return }
    let ticks = 0
    const target = originals[i]
    const settle = 8 + Math.floor(Math.random() * 6)
    timers.push(setTimeout(() => {
      const iv = setInterval(() => {
        if (ticks >= settle) {
          ch.textContent = target
          ch.style.color = ''
          clearInterval(iv)
          resolved++
          if (resolved >= chars.length) onDone?.()
        } else {
          ch.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
          ch.style.color = accentColor
        }
        ticks++
      }, 50)
      intervals.push(iv)
    }, i * 40))
  })
  setCleanup(() => {
    timers.forEach(clearTimeout)
    intervals.forEach(clearInterval)
    chars.forEach((ch, i) => { ch.textContent = originals[i]; ch.style.color = '' })
  })
})
