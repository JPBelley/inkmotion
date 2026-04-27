import { createSpringAnimation, loop, sp, sp2 } from './shared'

export const CenterBurst = createSpringAnimation('center-burst', (chars, _c, rafRef, _cl, onDone) => {
  const textRect = chars[0]?.parentElement?.getBoundingClientRect()
  const cx = textRect ? textRect.left + textRect.width / 2 : 0
  const offsets = chars.map(ch => {
    const r = ch.getBoundingClientRect()
    return (r.left + r.width / 2) - cx
  })
  const xst = chars.map((_, i) => ({ pos: -offsets[i], vel: 0 }))
  const yst = chars.map(() => ({ pos: (Math.random() - 0.5) * 40, vel: 0 }))
  const ops = chars.map(() => ({ pos: 0, vel: 0 }))
  chars.forEach((ch, i) => {
    ch.style.transform = `translate(${xst[i].pos}px, ${yst[i].pos}px)`
    ch.style.opacity = '0'
  })
  loop(rafRef, () => chars.every((ch, i) => {
    const xd = sp(xst[i], 0, 0.07, 0.70)
    const yd = sp(yst[i], 0, 0.09, 0.68)
    sp(ops[i], 1, 0.08, 0.74)
    ch.style.transform = `translate(${xst[i].pos}px, ${yst[i].pos}px)`
    ch.style.opacity = String(ops[i].pos)
    return xd && yd
  }), onDone)
})
