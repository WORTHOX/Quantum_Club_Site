import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import timeline from '../../data/timeline.json'

gsap.registerPlugin(ScrollTrigger)

export default function DecadeTimeline() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.timeline__item')

      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        /* Animate the node */
        const node = item.querySelector('.timeline__node')
        if (node) {
          gsap.from(node, {
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          })
        }
      })

      /* Animate the line growing */
      const line = sectionRef.current.querySelector('.timeline__line-fill')
      if (line) {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 sm:py-32 bg-[#07040d] text-white relative overflow-hidden" ref={sectionRef} id="timeline">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" aria-hidden="true" />

      <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#120d1c] border border-[#a855f7]/30 mb-4">
            <span className="font-mono text-xs font-semibold text-[#c084fc] tracking-widest uppercase">
              2016 ✦ 2026
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white tracking-tight mt-2 m-0">
            A Decade of Quantum Acceleration
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-400 mt-3 max-w-[50ch] mx-auto">
            From the dawn of cloud-accessible quantum processors to utility-scale architectures.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical central laser line */}
          <div className="timeline__line absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" aria-hidden="true">
            <div className="timeline__line-fill w-full h-full bg-gradient-to-b from-[#a855f7] via-[#d946ef] to-[#38bdf8] opacity-80 shadow-[0_0_12px_#d946ef]" />
          </div>

          {timeline.map((item, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={item.year}
                className={`timeline__item relative flex items-start pb-12 w-full md:w-1/2 ${
                  isEven
                    ? 'pl-12 md:pl-0 md:pr-12 md:text-right md:self-start'
                    : 'pl-12 md:pl-12 md:ml-[50%]'
                }`}
              >
                {/* Glowing Node */}
                <div
                  className={`timeline__node absolute top-1.5 w-5 h-5 flex items-center justify-center z-[2] ${
                    isEven ? 'left-4 -translate-x-1/2 md:left-auto md:-right-2.5 md:translate-x-0' : 'left-4 -translate-x-1/2 md:-left-2.5 md:translate-x-0'
                  }`}
                  aria-hidden="true"
                >
                  <div className="w-3 h-3 rounded-full bg-[#d946ef] shadow-[0_0_14px_3px_rgba(217,70,239,0.6)] border-2 border-[#07040d]" />
                </div>

                {/* Content Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#120d1c]/90 border border-white/10 shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 w-full">
                  <span className="inline-block font-mono text-xs font-bold text-[#c084fc] px-2.5 py-0.5 rounded bg-[#a855f7]/15 border border-[#a855f7]/30 tracking-wider mb-2">
                    {item.year}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-slate-300 leading-relaxed m-0">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
