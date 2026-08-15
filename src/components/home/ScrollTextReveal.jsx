import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollTextReveal() {
  const containerRef = useRef(null)
  const textWrapRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const words = textWrapRef.current.querySelectorAll('.scroll-text__word')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      })

      words.forEach((word) => {
        tl.to(
          word,
          {
            opacity: 1,
            color: word.classList.contains('scroll-text__word--accent') ? '#e879f9' : '#ffffff',
            textShadow: word.classList.contains('scroll-text__word--accent') ? '0 0 24px rgba(217, 70, 239, 0.6)' : 'none',
            duration: 0.5,
            ease: 'none',
          },
          '>-0.35'
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const statement = [
    { text: "Symbiosis", accent: false },
    { text: "Quantum", accent: false },
    { text: "Club", accent: false },
    { text: "is", accent: false },
    { text: "more", accent: true },
    { text: "than", accent: true },
    { text: "just", accent: true },
    { text: "a", accent: true },
    { text: "student", accent: true },
    { text: "society.", accent: true },
    { text: "We", accent: false },
    { text: "are", accent: false },
    { text: "a", accent: false },
    { text: "launchpad", accent: true },
    { text: "for", accent: true },
    { text: "pioneers,", accent: true },
    { text: "where", accent: false },
    { text: "abstract", accent: false },
    { text: "physics", accent: false },
    { text: "becomes", accent: false },
    { text: "real", accent: true },
    { text: "computing,", accent: true },
    { text: "and", accent: false },
    { text: "curious", accent: false },
    { text: "minds", accent: false },
    { text: "forge", accent: false },
    { text: "the", accent: false },
    { text: "future", accent: true },
    { text: "of", accent: true },
    { text: "technology.", accent: true },
  ]

  return (
    <section className="relative h-[140vh] md:h-[180vh] bg-[#07040d] text-white" ref={containerRef} id="welcome">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[2px] bg-gradient-to-r from-[#a855f7] to-[#ec4899]" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.14em] text-[#c084fc] uppercase">
              WELCOME TO QUANTUM CLUB
            </span>
          </div>
          
          <div className="w-full" ref={textWrapRef}>
            <p className="font-display text-[clamp(1.75rem,4vw+1rem,4.5rem)] font-semibold leading-[1.18] tracking-tight m-0">
              {statement.map((item, i) => (
                <span
                  key={i}
                  className={`scroll-text__word inline-block opacity-20 text-white/20 mr-[0.28em] will-change-[opacity,color] ${item.accent ? 'scroll-text__word--accent font-bold' : ''}`}
                >
                  {item.text}{' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
