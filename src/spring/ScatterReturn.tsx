import { createSpringAnimation, loop, sp2 } from './shared'

export const ScatterReturn = createSpringAnimation('scatter-return', (chars, container, rafRef, setCleanup) => {
  const randX = chars.map(() => (Math.random() - 0.5) * 420)
  const randY = chars.map(() => (Math.random() - 0.5) * 220)
  const st = chars.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, op: 1, opv: 0 }))
  chars.forEach(ch => { ch.style.opacity = '1' })
  let hovering = false
  const onEnter = () => { hovering = true }
  const onLeave = () => { hovering = false }
  container.addEventListener('mouseenter', onEnter)
  container.addEventListener('mouseleave', onLeave)
  setCleanup(() => {
    container.removeEventListener('mouseenter', onEnter)
    container.removeEventListener('mouseleave', onLeave)
    chars.forEach(ch => { ch.style.transform = ''; ch.style.opacity = '1' })
  })
  loop(rafRef, () => {
    chars.forEach((ch, i) => {
      const tx = hovering ? randX[i] : 0
      const ty = hovering ? randY[i] : 0
      const k = hovering ? 0.04 : 0.09
      const d = hovering ? 0.88 : 0.72
      sp2(st[i], tx, ty, k, d)
      const targetOp = hovering ? 0.2 : 1
      st[i].opv += (targetOp - st[i].op) * 0.06; st[i].opv *= 0.82; st[i].op += st[i].opv
      ch.style.transform = `translate(${st[i].x}px, ${st[i].y}px)`
      ch.style.opacity = String(st[i].op)
    })
    return false
  })
})
