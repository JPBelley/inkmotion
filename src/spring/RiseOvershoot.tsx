import { createSpringAnimation, loop, sp } from './shared'

export const RiseOvershoot = createSpringAnimation('rise-overshoot', (chars, _c, rafRef, _cl, onDone) => {
  const st = chars.map(() => ({ pos: 80, vel: 0, op: 0, opv: 0 }))
  let f = 0
  loop(rafRef, () => {
    f++
    let done = true
    chars.forEach((ch, i) => {
      if (f < i * 3) { done = false; return }
      if (!sp(st[i], 0, 0.11, 0.62)) done = false
      st[i].opv += (1 - st[i].op) * 0.11; st[i].opv *= 0.68; st[i].op += st[i].opv
      ch.style.transform = `translateY(${st[i].pos}px)`
      ch.style.opacity = String(st[i].op)
    })
    return done
  }, onDone)
})
