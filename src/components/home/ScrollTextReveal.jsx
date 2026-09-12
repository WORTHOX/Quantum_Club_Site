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
          scrub: 0.5,
        },
      })

      words.forEach((word) => {
        tl.to(
          word,
          {
            opacity: 1,
            color: word.classList.contains('scroll-text__word--accent') ? '#c084fc' : '#ffffff',
            textShadow: word.classList.contains('scroll-text__word--accent') ? '0 0 24px rgba(192, 132, 252, 0.6)' : 'none',
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
    <section className="relative h-[120vh] md:h-[140vh] bg-transparent text-white" ref={containerRef} id="welcome">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col items-start">
          <div className="flex flex-col items-start gap-2.5 mb-6 sm:mb-10">
            <span className="font-pixel text-sm sm:text-base md:text-lg font-semibold tracking-widest text-purple-300 uppercase">
              CHAPTER MANIFESTO
            </span>
            <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-wider text-white uppercase leading-tight drop-shadow-[0_0_28px_rgba(168,85,247,0.35)]">
              WELCOME TO <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">QUANTUM CLUB</span>
            </h2>
          </div>
          
          <div className="w-full max-w-[1300px]" ref={textWrapRef}>
            <p className="font-display text-[clamp(1.9rem,3.5vw+0.25rem,3.95rem)] font-semibold leading-[1.22] tracking-tight m-0 text-left">
              {statement.map((item, i) => (
                <span
                  key={i}
                  className={`scroll-text__word inline-block opacity-20 text-white/20 mr-[0.26em] will-change-[opacity,color] ${item.accent ? 'scroll-text__word--accent font-bold' : ''}`}
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
