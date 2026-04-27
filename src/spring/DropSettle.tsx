import { createSpringAnimation, loop, sp } from './shared'

export const DropSettle = createSpringAnimation('drop-settle', (chars, _c, rafRef, _cl, onDone) => {
  const st = chars.map(() => ({ pos: -100, vel: 0, op: 0, opv: 0 }))
  let f = 0
  loop(rafRef, () => {
    f++
    let done = true
    chars.forEach((ch, i) => {
      if (f < i * 3) { done = false; return }
      if (!sp(st[i], 0, 0.07, 0.68)) done = false
      st[i].opv += (1 - st[i].op) * 0.09; st[i].opv *= 0.72; st[i].op += st[i].opv
      ch.style.transform = `translateY(${st[i].pos}px)`
      ch.style.opacity = String(st[i].op)
    })
    return done
  }, onDone)
})
