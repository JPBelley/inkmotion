import { createTextAnimation } from './shared'

export const FlipX = createTextAnimation('flip-x', (chars, container, _a, setCleanup, onDone) => {
  container.style.perspective = '600px'
  const timers: ReturnType<typeof setTimeout>[] = []
  chars.forEach((ch, i) => {
    ch.style.cssText = 'opacity:0; transform:rotateX(90deg); transition:none; transform-origin:50% 100%; display:inline-block; white-space:pre;'
    timers.push(setTimeout(() => {
      ch.style.transition = `opacity 0.4s ease ${i * 50}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 50}ms`
      ch.style.opacity = '1'
      ch.style.transform = 'rotateX(0)'
    }, 20))
  })
  timers.push(setTimeout(() => { container.style.perspective = ''; onDone?.() }, (chars.length - 1) * 50 + 550))
  setCleanup(() => { timers.forEach(clearTimeout); container.style.perspective = '' })
})
