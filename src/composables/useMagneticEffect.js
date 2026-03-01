import { gsap } from 'gsap'

export function useMagneticEffect(options = {}) {
  const {
    strength = 0.4,
    duration = 0.3,
    resetDuration = 0.6,
    ease = 'power2.out',
    resetEase = 'elastic.out(1, 0.4)',
  } = options

  function onMouseMove(event, el) {
    const target = el || event.currentTarget
    const bounds = target.getBoundingClientRect()

    const offsetX = event.clientX - (bounds.left + bounds.width / 2)
    const offsetY = event.clientY - (bounds.top + bounds.height / 2)

    gsap.to(target, {
      x: offsetX * strength,
      y: offsetY * strength,
      duration,
      ease,
    })
  }

  function onMouseLeave(event, el) {
    const target = el || event.currentTarget
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: resetDuration,
      ease: resetEase,
    })
  }

  return { onMouseMove, onMouseLeave }
}
