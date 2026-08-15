import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal — GSAP ScrollTrigger wrapper for reveal animations
 * Respects prefers-reduced-motion
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const {
      y = 20,
      x = 0,
      opacity = 0,
      duration = 0.7,
      delay = 0,
      stagger = 0.08,
      ease = 'power3.out',
      start = 'top 88%',
      children = false,
    } = options

    const ctx = gsap.context(() => {
      const targets = children ? el.children : el

      gsap.from(targets, {
        y,
        x,
        opacity,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [options])

  return ref
}
