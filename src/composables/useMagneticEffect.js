import { gsap } from 'gsap'

/**
 * useMagneticEffect
 * A reusable composable that applies a magnetic pull effect to elements on hover.
 *
 * @param {Object} options
 * @param {number} options.strength   - How strong the pull is (default: 0.4)
 * @param {number} options.duration   - GSAP tween duration in seconds (default: 0.3)
 * @param {number} options.resetDuration - Duration to snap back (default: 0.6)
 * @param {string} options.ease       - GSAP ease for the pull (default: 'power2.out')
 * @param {string} options.resetEase  - GSAP ease for the reset (default: 'elastic.out(1, 0.4)')
 *
 * @returns {{ onMouseMove, onMouseLeave }}
 *   Two event handlers to bind to your element via @mousemove / @mouseleave
 */
export function useMagneticEffect(options = {}) {
  const {
    strength = 0.4,
    duration = 0.3,
    resetDuration = 0.6,
    ease = 'power2.out',
    resetEase = 'elastic.out(1, 0.4)',
  } = options

  /**
   * Call this on @mousemove of the target element.
   * @param {MouseEvent} event
   * @param {HTMLElement} el - the element to move (usually event.currentTarget)
   */
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

  /**
   * Call this on @mouseleave of the target element.
   * @param {MouseEvent} event
   * @param {HTMLElement} el - the element to reset
   */
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
