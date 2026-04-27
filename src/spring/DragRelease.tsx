import { createSpringAnimation, loop, sp2 } from './shared'

export const DragRelease = createSpringAnimation('drag-release', (chars, _c, rafRef, setCleanup) => {
  const st = chars.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, held: false }))
  chars.forEach(ch => { ch.style.opacity = '1'; ch.style.cursor = 'grab' })
  let dragIdx = -1, lx = 0, ly = 0
  const onDown = (e: MouseEvent) => {
    chars.forEach((ch, i) => {
      const r = ch.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        dragIdx = i; st[i].held = true; lx = e.clientX; ly = e.clientY
        ch.style.cursor = 'grabbing'
      }
    })
  }
  const onMove = (e: MouseEvent) => {
    if (dragIdx < 0) return
    const s = st[dragIdx]
    s.vx = e.clientX - lx; s.vy = e.clientY - ly
    s.x += s.vx; s.y += s.vy
    lx = e.clientX; ly = e.clientY
    chars[dragIdx].style.transform = `translate(${s.x}px, ${s.y}px)`
  }
  const onUp = () => {
    if (dragIdx >= 0) { st[dragIdx].held = false; chars[dragIdx].style.cursor = 'grab' }
    dragIdx = -1
  }
  document.addEventListener('mousedown', onDown)
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
  setCleanup(() => {
    document.removeEventListener('mousedown', onDown)
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
    chars.forEach(ch => { ch.style.transform = ''; ch.style.cursor = '' })
  })
  loop(rafRef, () => {
    chars.forEach((ch, i) => {
      if (st[i].held) return
      sp2(st[i], 0, 0, 0.08, 0.70)
      ch.style.transform = `translate(${st[i].x}px, ${st[i].y}px)`
    })
    return false
  })
})
