import { createSpringAnimation, loop, sp } from './shared'

export const Pendulum = createSpringAnimation('pendulum', (chars, _c, rafRef, _cl, onDone) => {
  const st = chars.map((_, i) => ({
    pos: (i % 2 === 0 ? 1 : -1) * (14 + i * 1.8),
    vel: 0,
  }))
  chars.forEach(ch => { ch.style.opacity = '1'; ch.style.transformOrigin = '50% -16px' })
  let f = 0
  loop(rafRef, () => {
    f++
    let allDone = true
    chars.forEach((ch, i) => {
      if (f < i * 6) { allDone = false; return }
      const done = sp(st[i], 0, 0.016, 0.986)
      ch.style.transform = `rotateZ(${st[i].pos}deg)`
      if (!done) allDone = false
    })
    return allDone
  }, onDone)
})
