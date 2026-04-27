import { createSpringAnimation, loop } from './shared'

export const GravityBounce = createSpringAnimation('gravity-bounce', (chars, _c, rafRef, _cl, onDone) => {
  const GRAVITY = 0.9, BOUNCE = 0.42
  const st = chars.map((_, i) => ({ pos: -(60 + i * 12), vel: 0, settled: false, op: 0, opv: 0 }))
  let f = 0
  loop(rafRef, () => {
    f++
    let done = true
    chars.forEach((ch, i) => {
      if (f < i * 4) { done = false; return }
      const s = st[i]
      if (!s.settled) {
        s.vel += GRAVITY
        s.pos += s.vel
        if (s.pos >= 0) {
          s.pos = 0; s.vel *= -BOUNCE
          if (Math.abs(s.vel) < 1.0) { s.vel = 0; s.settled = true }
          else done = false
        } else done = false
      }
      s.opv += (1 - s.op) * 0.07; s.opv *= 0.78; s.op += s.opv
      ch.style.transform = `translateY(${s.pos}px)`
      ch.style.opacity = String(s.op)
    })
    return done
  }, onDone)
})
