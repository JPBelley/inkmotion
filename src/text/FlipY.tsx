import { createTextAnimation } from './shared'

export const FlipY = createTextAnimation('flip-y', (chars, container, _a, setCleanup, onDone) => {
  container.style.perspective = '600px'
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; transform:rotateY(90deg); transition:none; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.4s ease ${i * 55}ms, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 55}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'rotateY(0)'
    }, 20))
  })
  timers.push(setTimeout(() => { container.style.perspective = ''; onDone?.() }, (chars.length - 1) * 55 + 600))
  setCleanup(() => { timers.forEach(clearTimeout); container.style.perspective = '' })
})
