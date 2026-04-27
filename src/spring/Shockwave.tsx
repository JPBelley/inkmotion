import { createSpringAnimation, loop, sp2 } from './shared'

export const Shockwave = createSpringAnimation('shockwave', (chars, container, rafRef, setCleanup) => {
  const rects = chars.map(ch => ch.getBoundingClientRect())
  const st = chars.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, op: 1, opv: 0 }))
  chars.forEach(ch => { ch.style.opacity = '1' })

  const shock = (ex: number, ey: number) => {
    chars.forEach((_, i) => {
      const r = rects[i]
      const dx = (r.left + r.width / 2) - ex
      const dy = (r.top + r.height / 2) - ey
      const dist = Math.hypot(dx, dy)
      if (dist < 220 && dist > 0) {
        const force = ((220 - dist) / 220) * 9
        st[i].vx += (dx / dist) * force
        st[i].vy += (dy / dist) * force
        st[i].op = Math.max(0.1, st[i].op - ((220 - dist) / 220) * 0.8)
        st[i].opv = 0
      }
    })
  }

  const cr = container.getBoundingClientRect()
  shock(cr.left + cr.width / 2, cr.top + cr.height / 2)

  const onClick = (e: MouseEvent) => shock(e.clientX, e.clientY)
  document.addEventListener('click', onClick)
  setCleanup(() => {
    document.removeEventListener('click', onClick)
    chars.forEach(ch => { ch.style.transform = ''; ch.style.opacity = '1' })
  })
  loop(rafRef, () => {
    chars.forEach((ch, i) => {
      sp2(st[i], 0, 0, 0.07, 0.74)
      st[i].opv += (1 - st[i].op) * 0.12; st[i].opv *= 0.70; st[i].op += st[i].opv
      ch.style.transform = `translate(${st[i].x}px, ${st[i].y}px)`
      ch.style.opacity = String(st[i].op)
    })
    return false
  })
})
