import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import pioneers from '../../data/pioneers.json'

gsap.registerPlugin(ScrollTrigger)

const PIONEER_GRAPHICS = {
  feynman: {
    accent: '#c084fc',
    badge: 'SIMULATION',
    icon: (
      <svg className="w-10 h-10 text-[#c084fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    tagline: 'Nature isn\'t classical, dammit, and if you want to make a simulation of nature, you\'d better make it quantum mechanical.'
  },
  shor: {
    accent: '#38bdf8',
    badge: 'ALGORITHMS',
    icon: (
      <svg className="w-10 h-10 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    tagline: 'Polynomial-time integer factorization algorithm that unlocked quantum supremacy in cryptography.'
  },
  deutsch: {
    accent: '#f472b6',
    badge: 'THEORY',
    icon: (
      <svg className="w-10 h-10 text-[#f472b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    tagline: 'Formulated the first universal quantum computer and quantum computational network theory.'
  },
  'ibm-team': {
    accent: '#a855f7',
    badge: 'CLOUD HARDWARE',
    icon: (
      <svg className="w-10 h-10 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    tagline: 'Put quantum computing on the public cloud with IBM Quantum Experience and open-source Qiskit.'
  }
}

export default function PioneersParallax() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.pioneers__card')
      const title = sectionRef.current.querySelector('.pioneers__overlay-text')

      /* Cards converge from corners toward center on scroll */
      cards.forEach((card, i) => {
        const positions = [
          { x: -100, y: -60, rotate: -4 },
          { x: 100, y: -50, rotate: 3 },
          { x: -80, y: 60, rotate: 4 },
          { x: 100, y: 50, rotate: -3 },
        ]

        const pos = positions[i] || { x: 0, y: 0, rotate: 0 }

        gsap.from(card, {
          x: pos.x,
          y: pos.y,
          rotation: pos.rotate,
          opacity: 0,
          scale: 0.88,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1,
          },
        })
      })

      /* Large overlay text fades in */
      if (title) {
        gsap.from(title, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end: 'top 20%',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 sm:py-32 bg-[#07040d] min-h-[90dvh] flex items-center relative overflow-hidden text-white" ref={sectionRef} id="pioneers">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-[40vw] h-[40vw] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative">
        {/* Winchester pattern large overlay watermark */}
        <h2 className="pioneers__overlay-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(2.5rem,8vw,8rem)] font-extrabold text-white/[0.04] whitespace-nowrap pointer-events-none z-0 tracking-[-0.04em] uppercase" aria-hidden="true">
          Original Thinkers
        </h2>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#120d1c] border border-[#a855f7]/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
            <span className="font-mono text-xs font-semibold text-[#c084fc] uppercase tracking-wider">FOUNDATIONAL GIANTS</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white tracking-tight m-0">
            Pioneers of the Quantum Realm
          </h2>
        </div>

        {/* 4 Pioneer Cards in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-[1]">
          {pioneers.map((pioneer) => {
            const meta = PIONEER_GRAPHICS[pioneer.id] || PIONEER_GRAPHICS.feynman
            return (
              <div
                key={pioneer.id}
                className="pioneers__card p-7 rounded-2xl bg-[#120d1c]/90 border border-white/10 shadow-xl hover:border-[#a855f7]/50 hover:shadow-[0_16px_40px_rgba(168,85,247,0.2)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#c084fc] px-2.5 py-1 rounded-md bg-[#a855f7]/15 border border-[#a855f7]/30">
                      {pioneer.year}
                    </span>
                    <span className="font-mono text-[0.68rem] text-slate-400 font-semibold tracking-wider uppercase">
                      {meta.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-[#07040d] border border-white/10 group-hover:border-[#a855f7]/40 transition-colors shrink-0">
                      {meta.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#c084fc] transition-colors m-0">
                        {pioneer.name}
                      </h3>
                      <span className="font-mono text-xs text-[#f472b6] font-medium tracking-wide block mt-0.5">
                        {pioneer.role}
                      </span>
                    </div>
                  </div>

                  {/* Core Description */}
                  <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed m-0 pt-2">
                    {pioneer.description}
                  </p>
                </div>

                {/* Bottom Highlight Tagline */}
                <div className="mt-6 pt-4 border-t border-white/10 font-body text-xs text-slate-400 italic">
                  &ldquo;{meta.tagline}&rdquo;
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
