import { createSpringAnimation, loop, sp } from './shared'

export const Pendulum = createSpringAnimation('pendulum', (chars, _c, rafRef, _cl, onDone) => {
  const st = chars.map((_, i) => ({
    pos: (i % 2 === 0 ? 1 : -1) * (25 + Math.random() * 25),
    vel: 0,
  }))
  chars.forEach(ch => { ch.style.opacity = '1'; ch.style.transformOrigin = '50% 0%' })
  loop(rafRef, () => chars.every((ch, i) => {
    const done = sp(st[i], 0, 0.025, 0.94)
    ch.style.transform = `rotateZ(${st[i].pos}deg)`
    return done
  }), onDone)
})
