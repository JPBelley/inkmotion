import { createSpringAnimation, loop } from './shared'

export const DominoFall = createSpringAnimation('domino-fall', (chars, _c, rafRef, _cl, onDone) => {
  chars.forEach(ch => { ch.style.opacity = '1'; ch.style.transformOrigin = '50% 100%' })
  const st = chars.map(() => ({ angle: 0, vel: 0, active: false, done: false }))
  st[0].active = true
  loop(rafRef, () => {
    let allDone = true
    chars.forEach((ch, i) => {
      const s = st[i]
      if (!s.active || s.done) { if (!s.done) allDone = false; return }
      s.vel += (90 - s.angle) * 0.035
      s.vel *= 0.94
      s.angle += s.vel
      if (s.angle > 50 && i + 1 < chars.length && !st[i + 1].active) st[i + 1].active = true
      if (s.angle >= 90) { s.angle = 90; s.vel = 0; s.done = true }
      else allDone = false
      ch.style.transform = `rotateZ(${s.angle}deg)`
    })
    return allDone
  }, onDone)
})
