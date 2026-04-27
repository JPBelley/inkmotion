import { createSpringAnimation, loop, sp } from './shared'
import type { S1 } from './shared'

export const SpringKerning = createSpringAnimation('spring-kerning', (chars, _c, rafRef, setCleanup) => {
  const mid = (chars.length - 1) / 2
  const spread: S1 = { pos: 0, vel: 0 }
  chars.forEach(ch => { ch.style.opacity = '1' })
  let mx = 0
  const onMove = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 80 }
  document.addEventListener('mousemove', onMove)
  setCleanup(() => {
    document.removeEventListener('mousemove', onMove)
    chars.forEach(ch => { ch.style.transform = '' })
  })
  loop(rafRef, () => {
    sp(spread, mx, 0.06, 0.80)
    chars.forEach((ch, i) => {
      ch.style.transform = `translateX(${(i - mid) / Math.max(mid, 1) * spread.pos}px)`
    })
    return false
  })
})
