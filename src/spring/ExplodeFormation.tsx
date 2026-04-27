import { createSpringAnimation, loop, sp2 } from './shared'

export const ExplodeFormation = createSpringAnimation('explode-formation', (chars, _c, rafRef, _cl, onDone) => {
  const st = chars.map(() => ({
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 400,
    vx: 0, vy: 0, op: 0, opv: 0,
  }))
  chars.forEach((ch, i) => {
    ch.style.transform = `translate(${st[i].x}px, ${st[i].y}px)`
    ch.style.opacity = '0'
  })
  loop(rafRef, () => chars.every((ch, i) => {
    const done = sp2(st[i], 0, 0, 0.06, 0.74)
    st[i].opv += (1 - st[i].op) * 0.05; st[i].opv *= 0.80; st[i].op += st[i].opv
    ch.style.transform = `translate(${st[i].x}px, ${st[i].y}px)`
    ch.style.opacity = String(st[i].op)
    return done
  }), onDone)
})
