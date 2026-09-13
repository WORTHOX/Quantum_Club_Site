import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Statement split into word objects
const statement = [
  { text: 'We', accent: false },
  { text: 'are', accent: false },
  { text: 'more', accent: true },
  { text: 'than', accent: true },
  { text: 'a', accent: true },
  { text: 'student', accent: true },
  { text: 'society.', accent: true },
  { text: 'We', accent: false },
  { text: 'are', accent: false },
  { text: 'a', accent: false },
  { text: 'launchpad', accent: true },
  { text: 'for', accent: true },
  { text: 'pioneers', accent: true },
  { text: '—', accent: false },
  { text: 'where', accent: false },
  { text: 'abstract', accent: false },
  { text: 'physics', accent: false },
  { text: 'becomes', accent: false },
  { text: 'real', accent: true },
  { text: 'computing,', accent: true },
  { text: 'and', accent: false },
  { text: 'curious', accent: false },
  { text: 'minds', accent: false },
  { text: 'forge', accent: false },
  { text: 'the', accent: false },
  { text: 'future', accent: true },
  { text: 'of', accent: true },
  { text: 'technology.', accent: true },
]

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
        tl.to(word, {
          opacity: 1,
          color: word.classList.contains('scroll-text__word--accent') ? '#c084fc' : '#ffffff',
          duration: 0.5,
          ease: 'none',
        }, '>-0.35')
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-[120vh] md:h-[150vh] bg-transparent text-white" ref={containerRef} id="welcome">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[1100px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <div ref={textWrapRef}>
            <p className="font-display text-[clamp(1.6rem,3.6vw+0.5rem,4.2rem)] font-semibold leading-[1.22] tracking-tight m-0">
              {statement.map((item, i) => (
                <span
                  key={i}
                  className={`scroll-text__word inline-block opacity-[0.15] text-white/20 mr-[0.24em] will-change-[opacity,color] ${
                    item.accent ? 'scroll-text__word--accent font-bold' : ''
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
