import { createSpringAnimation, loop, sp } from './shared'

export const StretchWave = createSpringAnimation('stretch-wave', (chars, _c, rafRef, setCleanup) => {
  const st = chars.map(() => ({ pos: 1, vel: 0 }))
  chars.forEach(ch => { ch.style.opacity = '1' })
  let t = 0
  setCleanup(() => { chars.forEach(ch => { ch.style.transform = '' }) })
  loop(rafRef, () => {
    t++
    chars.forEach((ch, i) => {
      const target = 1 + Math.sin(t * 0.055 - i * 0.5) * 0.45
      sp(st[i], target, 0.05, 0.82)
      ch.style.transform = `scaleY(${st[i].pos})`
    })
    return false
  })
})
