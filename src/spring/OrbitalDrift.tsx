import { createSpringAnimation, loop, sp2 } from './shared'

export const OrbitalDrift = createSpringAnimation('orbital-drift', (chars, _c, rafRef, setCleanup) => {
  const st = chars.map((_, i) => ({ x: 0, y: 0, vx: 0, vy: 0, phase: i * 0.55 }))
  chars.forEach(ch => { ch.style.opacity = '1' })
  let t = 0
  setCleanup(() => { chars.forEach(ch => { ch.style.transform = '' }) })
  loop(rafRef, () => {
    t++
    chars.forEach((ch, i) => {
      const s = st[i]
      const R = 3 + Math.sin(s.phase * 1.7) * 2
      const tx = Math.cos(t * 0.022 + s.phase) * R
      const ty = Math.sin(t * 0.022 + s.phase * 0.7) * R * 0.55
      sp2(s, tx, ty, 0.04, 0.86)
      ch.style.transform = `translate(${s.x}px, ${s.y}px)`
    })
    return false
  })
})
