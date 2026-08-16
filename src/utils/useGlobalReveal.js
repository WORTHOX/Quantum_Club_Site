import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocation } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export function useGlobalReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Small timeout ensures the DOM has updated for the new route / on reload
    const timer = setTimeout(() => {
      const elements = gsap.utils.toArray('.reveal-up')
      if (!elements || elements.length === 0) return

      // Set initial state
      gsap.set(elements, { autoAlpha: 0, y: 30 })

      ScrollTrigger.batch(elements, {
        interval: 0.1, // time window (in seconds) for batching elements that enter at the same time
        batchMax: 5,   // max elements per batch
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: true
          })
        },
        start: 'top 85%', // trigger when top of element hits 85% down the viewport
        once: true        // only play once
      })

      // Refresh ScrollTrigger positions after initial layout paint
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      // Clean up triggers safely
      ScrollTrigger.getAll().forEach(trigger => {
        const trigEl = trigger.trigger || trigger.vars?.trigger
        if (trigEl && typeof trigEl.classList?.contains === 'function' && trigEl.classList.contains('reveal-up')) {
          trigger.kill()
        }
      })
    }
  }, [pathname])
}
