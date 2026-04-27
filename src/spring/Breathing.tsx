import { createSpringAnimation, loop, sp } from './shared'

export const Breathing = createSpringAnimation('breathing', (chars, _c, rafRef, setCleanup) => {
  const st = chars.map(() => ({ pos: 1, vel: 0 }))
  chars.forEach(ch => { ch.style.opacity = '1'; ch.style.transformOrigin = '50% 80%' })
  let t = 0
  setCleanup(() => { chars.forEach(ch => { ch.style.transform = ''; ch.style.transformOrigin = '' }) })
  loop(rafRef, () => {
    t++
    chars.forEach((ch, i) => {
      const target = 1 + Math.sin(t * 0.04 + i * 0.45) * 0.18
      sp(st[i], target, 0.05, 0.84)
      ch.style.transform = `scale(${st[i].pos})`
    })
    return false
  })
})
