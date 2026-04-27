import { createSpringAnimation, loop, sp2 } from './shared'

export const ThermalNoise = createSpringAnimation('thermal-noise', (chars, _c, rafRef, setCleanup) => {
  const st = chars.map(() => ({
    x: 0, y: 0, vx: 0, vy: 0,
    tx: 0, ty: 0, timer: Math.floor(Math.random() * 30),
  }))
  chars.forEach(ch => { ch.style.opacity = '1' })
  setCleanup(() => { chars.forEach(ch => { ch.style.transform = '' }) })
  loop(rafRef, () => {
    chars.forEach((ch, i) => {
      const s = st[i]
      if (--s.timer <= 0) {
        s.tx = (Math.random() - 0.5) * 10
        s.ty = (Math.random() - 0.5) * 7
        s.timer = 20 + Math.floor(Math.random() * 35)
      }
      sp2(s, s.tx, s.ty, 0.07, 0.76)
      ch.style.transform = `translate(${s.x}px, ${s.y}px)`
    })
    return false
  })
})
