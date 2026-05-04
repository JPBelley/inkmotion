import { createSpringAnimation, loop, sp } from './shared'

// Requires a variable font with a wght axis (e.g. Space Grotesk, Fraunces)
export const WeightWave = createSpringAnimation('weight-wave', (chars, _c, rafRef, setCleanup) => {
  const st = chars.map(() => ({ pos: 400, vel: 0 }))
  chars.forEach(ch => {
    ch.style.opacity = '1'
    ch.style.fontFamily = "'Fraunces', Georgia, serif"
  })
  let t = 0
  setCleanup(() => { chars.forEach(ch => { ch.style.fontVariationSettings = '' }) })
  loop(rafRef, () => {
    t++
    chars.forEach((ch, i) => {
      const target = 500 + Math.sin(t * 0.055 - i * 0.5) * 350
      sp(st[i], target, 0.05, 0.82)
      ch.style.fontVariationSettings = `'wght' ${st[i].pos}`
    })
    return false
  })
})
