import { createSpringAnimation, loop } from './shared'

export const MagneticPull = createSpringAnimation('magnetic-pull', (chars, _c, rafRef, setCleanup) => {
  const rects = chars.map(ch => ch.getBoundingClientRect())
  const st = chars.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
  chars.forEach(ch => { ch.style.opacity = '1' })
  let mx = -9999, my = -9999
  const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
  const onLeave = () => { mx = -9999; my = -9999 }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseleave', onLeave)
  setCleanup(() => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseleave', onLeave)
    chars.forEach(ch => { ch.style.transform = '' })
  })
  loop(rafRef, () => {
    chars.forEach((ch, i) => {
      const r = rects[i]
      const wx = r.left + r.width / 2 + st[i].x
      const wy = r.top + r.height / 2 + st[i].y
      const dx = mx - wx, dy = my - wy
      const dist = Math.hypot(dx, dy)
      const RADIUS = 110
      if (dist < RADIUS && dist > 0) {
        const pull = ((RADIUS - dist) / RADIUS) * 0.3
        st[i].vx += (dx / dist) * pull
        st[i].vy += (dy / dist) * pull
      }
      st[i].vx += (0 - st[i].x) * 0.06; st[i].vx *= 0.82; st[i].x += st[i].vx
      st[i].vy += (0 - st[i].y) * 0.06; st[i].vy *= 0.82; st[i].y += st[i].vy
      ch.style.transform = `translate(${st[i].x}px, ${st[i].y}px)`
    })
    return false
  })
})
