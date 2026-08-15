import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function VideoHero() {
  const heroRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from('.hero__divider', {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .from('.hero__eyebrow', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.hero__title-word', {
        y: 45,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.hero__description', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.hero__stats', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.25')
      .from('.hero__actions', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 sm:pb-24 pt-32 overflow-hidden bg-[#07040d] text-white" ref={heroRef} id="hero">
      {/* Background Visual Layer: Animated Quantum Circuit in Violet & Magenta (Logo Aligned) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="w-full h-full opacity-65" aria-hidden="true">
          <svg className="w-full h-full object-cover" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            {/* Grid lines */}
            {[...Array(7)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={120 + i * 110}
                x2="1440"
                y2={120 + i * 110}
                stroke="#a855f7"
                strokeWidth="0.5"
                opacity="0.18"
              />
            ))}
            {/* Gate nodes */}
            {[
              [240, 120], [480, 230], [720, 340], [960, 450], [1200, 560],
              [360, 230], [600, 120], [840, 450], [1080, 230], [1320, 340],
              [180, 340], [540, 450], [900, 120], [1140, 560], [420, 560],
            ].map(([cx, cy], i) => (
              <g key={`node-${i}`} className="animate-pulse" style={{ animationDuration: `${2.5 + (i % 4) * 0.5}s` }}>
                <circle cx={cx} cy={cy} r="5" fill={i % 2 === 0 ? "#a855f7" : "#ec4899"} opacity="0.85" />
                <circle cx={cx} cy={cy} r="16" fill="none" stroke={i % 2 === 0 ? "#c084fc" : "#f472b6"} strokeWidth="0.5" opacity="0.35" />
              </g>
            ))}
            {/* Interconnections */}
            {[
              [240, 120, 360, 230], [480, 230, 600, 120], [720, 340, 840, 450],
              [960, 450, 1080, 230], [180, 340, 360, 230], [540, 450, 720, 340],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={`conn-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={i % 2 === 0 ? "#d946ef" : "#a855f7"}
                strokeWidth="0.8"
                opacity="0.28"
              />
            ))}
          </svg>
        </div>
        
        {/* Radial Lighting in Violet & Magenta Ambient Glow */}
        <div className="absolute top-[12%] left-[15%] w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,rgba(236,72,153,0.09)_45%,transparent_70%)] blur-[95px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07040d]/30 via-[#07040d]/75 to-[#07040d]" aria-hidden="true" />
      </div>

      {/* Hero Content — Left Aligned */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col items-start" ref={textRef}>
        {/* Eyebrow Lockup */}
        <div className="flex items-center gap-4 mb-6">
          <div className="hero__divider w-10 h-[2px] bg-gradient-to-r from-[#a855f7] to-[#ec4899] origin-left shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
          <span className="hero__eyebrow font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#c084fc] uppercase">
            SYMBIOSIS QUANTUM CLUB ✦ IBM QISKIT FALL FEST 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.8rem,6.5vw+1rem,6.5rem)] font-bold leading-[0.95] tracking-tight mb-6 text-white">
          <span className="block">
            <span className="hero__title-word inline-block">Decode</span>{' '}
            <span className="hero__title-word inline-block">The</span>{' '}
            <span className="hero__title-word inline-block bg-gradient-to-br from-white via-[#c084fc] to-[#f472b6] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(168,85,247,0.45)]">Future</span>
          </span>
          <span className="block">
            <span className="hero__title-word inline-block">Of</span>{' '}
            <span className="hero__title-word inline-block bg-gradient-to-r from-[#c084fc] via-[#e879f9] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(217,70,239,0.35)]">Quantum</span>
          </span>
        </h1>

        {/* Description */}
        <p className="hero__description font-body text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 max-w-[60ch] mb-8">
          Symbiosis Quantum Club is an experiential launchpad for student researchers, hardware builders, and algorithm pioneers. Join three days of hands-on IBM Qiskit workshops, hackathons, and lectures.
        </p>

        {/* Live Metric Badges */}
        <div className="hero__stats flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120d1c]/90 border border-[#a855f7]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#c084fc] animate-pulse" />
            <span className="font-mono text-xs font-semibold text-slate-200">500+ Qubits Simulated</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120d1c]/90 border border-[#ec4899]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
            <span className="font-mono text-xs font-semibold text-slate-200">12+ Workshops</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120d1c]/90 border border-white/15 backdrop-blur-md">
            <span className="font-mono text-xs font-semibold text-[#c084fc]">✦ IBM Qiskit Partner</span>
          </div>
        </div>

        {/* Actions */}
        <div className="hero__actions flex flex-wrap items-center gap-4 sm:gap-5">
          <Link 
            to="/fallfest" 
            className="inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white border border-[#d946ef] shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:from-[#c084fc] hover:to-[#ec4899] hover:border-[#ec4899] hover:shadow-[0_0_40px_rgba(236,72,153,0.65)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span>REGISTER FOR FALL FEST</span>
            <span className="w-6.5 h-6.5 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-250 group-hover:scale-115 group-hover:translate-x-0.5 group-hover:bg-white/30">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
          <Link 
            to="/events" 
            className="inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full border border-[#a855f7]/35 text-white bg-[#a855f7]/[0.06] backdrop-blur-md hover:border-[#c084fc] hover:text-[#c084fc] hover:bg-[#a855f7]/15 hover:shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 transition-all duration-300"
          >
            EXPLORE EVENTS
          </Link>
        </div>
      </div>

      {/* Multi-Layered Progressive Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[5] bg-gradient-to-b from-transparent via-[#07040d]/70 to-[#07040d]" aria-hidden="true" />
    </section>
  )
}
