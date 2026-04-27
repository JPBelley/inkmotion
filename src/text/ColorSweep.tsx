import { createTextAnimation, COLOR_MINT } from './shared'

export const ColorSweep = createTextAnimation('color-sweep', (chars, _c, accentColor, setCleanup, onDone) => {
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = `opacity:0; transform:translateY(20px); color:${accentColor}; transition:none; display:inline-block; white-space:pre;`
    timers.push(setTimeout(() => {
      ch.style.transition = 'opacity 0.4s ease, transform 0.4s ease, color 0.6s ease 0.15s'
      ch.style.opacity = '1'
      ch.style.transform = 'translateY(0)'
      timers.push(setTimeout(() => { ch.style.color = COLOR_MINT }, i * 40 + 200))
      timers.push(setTimeout(() => {
        ch.style.color = ''
        if (i === chars.length - 1) onDone?.()
      }, i * 40 + 600))
    }, i * 40 + 20))
  })
  setCleanup(() => timers.forEach(clearTimeout))
})
