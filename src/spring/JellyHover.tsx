import { createSpringAnimation, loop } from './shared'

export const JellyHover = createSpringAnimation('jelly-hover', (chars, container, rafRef, setCleanup) => {
  const st = chars.map(() => ({ sx: 1, svx: 0, sy: 1, svy: 0 }))
  chars.forEach(ch => { ch.style.opacity = '1'; ch.style.transformOrigin = '50% 80%' })
  const onEnter = (e: MouseEvent) => {
    const idx = chars.indexOf(e.target as HTMLSpanElement)
    if (idx < 0) return
    st[idx].svx = -0.06
    st[idx].svy = 0.06
  }
  container.addEventListener('mouseover', onEnter)
  setCleanup(() => {
    container.removeEventListener('mouseover', onEnter)
    chars.forEach(ch => { ch.style.transform = ''; ch.style.transformOrigin = '' })
  })
  loop(rafRef, () => {
    chars.forEach((ch, i) => {
      const s = st[i]
      s.svx += (1 - s.sx) * 0.14; s.svx *= 0.58; s.sx += s.svx
      s.svy += (1 - s.sy) * 0.14; s.svy *= 0.58; s.sy += s.svy
      ch.style.transform = `scaleX(${s.sx}) scaleY(${s.sy})`
    })
    return false
  })
})
