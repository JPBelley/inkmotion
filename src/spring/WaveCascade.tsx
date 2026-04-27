import { createSpringAnimation, loop, sp } from './shared'

export const WaveCascade = createSpringAnimation('wave-cascade', (chars, _c, rafRef, _cl, onDone) => {
  const st = chars.map(() => ({ pos: 0, vel: 0 }))
  st[0].vel = -14
  chars.forEach(ch => { ch.style.opacity = '1' })
  loop(rafRef, () => {
    chars.forEach((ch, i) => {
      if (i > 0) st[i].vel += st[i - 1].vel * 0.09
      sp(st[i], 0, 0.055, 0.76)
      ch.style.transform = `translateY(${st[i].pos}px)`
    })
    return st.every(s => Math.abs(s.pos) + Math.abs(s.vel) < 0.05)
  }, onDone)
})
