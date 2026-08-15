import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocation } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Small timeout ensures the DOM has updated for the new route
    const timer = setTimeout(() => {
      const elements = gsap.utils.toArray('.reveal-up')
      if (elements.length === 0) return

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
    }, 100) // 100ms is usually enough for React to render

    return () => {
      clearTimeout(timer)
      // Clean up triggers created for reveal-up elements
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger.classList?.contains('reveal-up')) {
          trigger.kill()
        }
      })
    }
  }, [pathname])
}
