import { createSpringAnimation, loop } from './shared'

export const Repulsion = createSpringAnimation('repulsion', (chars, _c, rafRef, setCleanup) => {
  const rects = chars.map(ch => ch.getBoundingClientRect())
  const st = chars.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, op: 1, opv: 0 }))
  chars.forEach(ch => { ch.style.opacity = '1' })
  let mx = -9999, my = -9999
  const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
  document.addEventListener('mousemove', onMove)
  setCleanup(() => {
    document.removeEventListener('mousemove', onMove)
    chars.forEach(ch => { ch.style.transform = ''; ch.style.opacity = '1' })
  })
  loop(rafRef, () => {
    chars.forEach((ch, i) => {
      const r = rects[i]
      const wx = r.left + r.width / 2 + st[i].x
      const wy = r.top + r.height / 2 + st[i].y
      const dx = wx - mx, dy = wy - my
      const dist = Math.hypot(dx, dy)
      const RADIUS = 90
      if (dist < RADIUS && dist > 0) {
        const force = ((RADIUS - dist) / RADIUS) * 0.55
        st[i].vx += (dx / dist) * force
        st[i].vy += (dy / dist) * force
      }
      st[i].vx += (0 - st[i].x) * 0.08; st[i].vx *= 0.80; st[i].x += st[i].vx
      st[i].vy += (0 - st[i].y) * 0.08; st[i].vy *= 0.80; st[i].y += st[i].vy
      const disp = Math.hypot(st[i].x, st[i].y)
      const targetOp = Math.max(0.25, 1 - disp / 80)
      st[i].opv += (targetOp - st[i].op) * 0.1; st[i].opv *= 0.75; st[i].op += st[i].opv
      ch.style.transform = `translate(${st[i].x}px, ${st[i].y}px)`
      ch.style.opacity = String(st[i].op)
    })
    return false
  })
})
