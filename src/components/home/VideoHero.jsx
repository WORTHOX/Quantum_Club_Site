import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const POLAROIDS = [
  {
    id: 1,
    image: '/team-brainstorm.jpeg',
    caption: 'Core Brainstorm',
    subtitle: 'Roadmap & ideation',
    date: 'AY 2025–26',
    aspectRatio: '1280 / 960',
    rotation: '-rotate-6',
    position: 'top-1 left-0 sm:left-2',
    zIndex: 'z-10',
    tapePosition: '-top-3.5 left-7 -rotate-6',
    tapeColor: 'bg-white/65 border-white/40',
    width: 'w-36 xs:w-40 sm:w-56 lg:w-64',
  },
  {
    id: 2,
    image: '/feedback-wall.jpeg',
    caption: 'Student Voices',
    subtitle: 'Quantum is the future ✦',
    date: 'Feedback Wall',
    aspectRatio: '960 / 1280',
    rotation: 'rotate-6',
    position: 'top-2 right-0 sm:right-2',
    zIndex: 'z-15',
    tapePosition: '-top-3.5 right-7 rotate-6',
    tapeColor: 'bg-pink-300/60 border-pink-200/50',
    width: 'w-28 xs:w-32 sm:w-46 lg:w-52',
  },
  {
    id: 3,
    image: '/club-induction.jpeg',
    caption: 'Quantum Ice Breaker',
    subtitle: 'Auditorium launch @ SIT',
    date: 'Jul 2025',
    aspectRatio: '1280 / 720',
    rotation: '-rotate-2',
    position: 'top-24 sm:top-36 lg:top-40 left-1/2 -translate-x-1/2',
    zIndex: 'z-25',
    tapePosition: '-top-3.5 left-1/2 -translate-x-1/2 -rotate-1',
    tapeColor: 'bg-cyan-200/60 border-cyan-100/50',
    width: 'w-40 xs:w-48 sm:w-68 lg:w-76 xl:w-80',
  },
  {
    id: 4,
    image: '/classroom-session.jpg',
    caption: 'Classroom Sessions',
    subtitle: 'Foundations & math @ SIT',
    date: 'AY 2025–26',
    aspectRatio: '3840 / 2160',
    rotation: 'rotate-3',
    position: 'bottom-2 left-0 sm:left-2',
    zIndex: 'z-20',
    tapePosition: '-top-3.5 left-7 rotate-3',
    tapeColor: 'bg-amber-200/60 border-amber-100/50',
    width: 'w-36 xs:w-42 sm:w-60 lg:w-68 xl:w-72',
  },
  {
    id: 5,
    image: '/team-night-sync.jpeg',
    caption: 'Late Night Sync',
    subtitle: 'Qiscade build sprint ☕',
    date: 'Sep 2025',
    aspectRatio: '720 / 1280',
    rotation: '-rotate-4',
    position: 'bottom-1 right-0 sm:right-2',
    zIndex: 'z-30',
    tapePosition: '-top-3.5 right-7 -rotate-4',
    tapeColor: 'bg-purple-300/60 border-purple-200/50',
    width: 'w-24 xs:w-28 sm:w-40 lg:w-46',
  },
]

export default function VideoHero() {
  const heroRef = useRef(null)
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhoto(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.from('.hero__eyebrow', { y: 16, opacity: 0, duration: 0.55, ease: 'power3.out' })
        .from('.hero__title-word', { y: 40, opacity: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out' }, '-=0.35')
        .from('.hero__description', { y: 18, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.3')
        .from('.hero__actions', { y: 18, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.25')
        .from('.hero__polaroid', {
          y: 40, opacity: 0, scale: 0.85, stagger: 0.08, duration: 0.7, ease: 'back.out(1.4)',
          clearProps: 'all'
        }, '-=0.3')
        .to('.hero__polaroid-cluster', {
          y: -8, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut'
        })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-transparent text-white"
      ref={heroRef}
      id="hero"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* ── Left: Hero copy ── */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-start min-w-0 w-full">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0e0720]/50 backdrop-blur-md mb-6 max-w-full">
            <span className="hero__eyebrow font-pixel text-[10px] sm:text-[11px] font-semibold tracking-widest text-purple-200 uppercase truncate">
              IBM Qiskit Fall Fest 2026
              <span className="mx-1.5 text-purple-400/50 font-light">/</span>
              Official Host
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.05rem,6.2vw,5.5rem)] font-bold leading-[0.98] tracking-tight mb-5 text-white break-words">
            <span className="block">
              <span className="hero__title-word inline-block">Decode</span>
            </span>
            <span className="block">
              <span className="hero__title-word inline-block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">the Future</span>
            </span>
            <span className="block">
              <span className="hero__title-word inline-block bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">of Quantum</span>
            </span>
          </h1>

          {/* Description — concise, readable */}
          <p className="hero__description font-body text-base sm:text-[1.05rem] leading-[1.7] text-slate-300 max-w-[46ch] mb-8">
            Symbiosis Quantum Club is a student-led community at SIT Pune — running workshops, hackathons, and cloud quantum computing sessions with Qiskit.
          </p>

          {/* CTAs */}
          <div className="hero__actions flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/events?category=fall-fest"
              className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-[0_0_22px_rgba(168,85,247,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 group"
            >
              <span>Register for Fall Fest</span>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-full border border-white/15 text-slate-300 bg-white/[0.04] hover:border-purple-400/50 hover:text-white hover:bg-white/[0.07] active:scale-[0.97] transition-all duration-200"
            >
              Explore Events
            </Link>
          </div>
        </div>

        {/* ── Right: Candid Team Polaroids Stack ── */}
        <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end items-center mt-6 lg:mt-0 w-full min-w-0">
          <div className="hero__polaroid-cluster relative w-full max-w-[320px] xs:max-w-[370px] sm:max-w-[560px] lg:max-w-[640px] xl:max-w-[680px] h-[460px] xs:h-[500px] sm:h-[600px] lg:h-[660px] select-none mx-auto lg:ml-auto">
            {/* Ambient soft glow backdrop */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-500/15 to-cyan-500/20 blur-3xl pointer-events-none" />

            {POLAROIDS.map((item) => (
              <div
                key={item.id}
                className={`hero__polaroid absolute ${item.position} ${item.zIndex} ${item.rotation} transition-all duration-300 ease-out hover:z-50 hover:scale-105 hover:rotate-0 hover:shadow-[0_28px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(168,85,247,0.35)] cursor-pointer`}
                onClick={() => setActivePhoto(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActivePhoto(item)
                  }
                }}
                aria-label={`View photo: ${item.caption}`}
              >
                {/* Washi Tape Strip */}
                <div
                  className={`absolute ${item.tapePosition} w-11 sm:w-14 h-3.5 sm:h-4 ${item.tapeColor} backdrop-blur-sm z-20 shadow-sm border pointer-events-none opacity-90`}
                />

                {/* Polaroid Frame with uncropped natural photo aspect ratio */}
                <div
                  className={`${item.width} p-2.5 sm:p-3 pb-4 sm:pb-5 rounded-md bg-[#faf8f5] border border-stone-200/95 shadow-[0_16px_36px_rgba(0,0,0,0.65),0_4px_12px_rgba(0,0,0,0.3)]`}
                >
                  <div
                    className="w-full overflow-hidden bg-neutral-900 relative shadow-[inset_0_0_8px_rgba(0,0,0,0.4)] rounded-[2px]"
                    style={{ aspectRatio: item.aspectRatio }}
                  >
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-full object-contain filter contrast-[1.03] brightness-[0.98] transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/15 pointer-events-none" />
                  </div>

                  <div className="pt-2.5 px-0.5">
                    <div className="flex items-baseline justify-between gap-1.5">
                      <span className="font-sans text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-snug truncate">
                        {item.caption}
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 shrink-0 font-medium">
                        {item.date}
                      </span>
                    </div>
                    <span className="block font-mono text-[9px] sm:text-[10px] text-slate-500/90 tracking-wide mt-0.5 truncate">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Little playful polaroid pin badge */}
            <div className="absolute -bottom-3 right-2 sm:right-6 max-w-[calc(100%-1rem)] z-40 px-3 py-1.5 rounded-full bg-[#121513]/90 border border-emerald-500/40 backdrop-blur-md shadow-lg flex items-center gap-2 pointer-events-none">
              <span className="font-mono text-[9.5px] sm:text-[10px] font-semibold text-emerald-300 tracking-wide uppercase truncate">
                SQC Team &amp; Crew
                <span className="mx-1 text-emerald-400/40 font-light">/</span>
                SIT Pune
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Full Uncropped View */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#faf8f5] p-3 sm:p-4 pb-4 sm:pb-5 rounded-sm shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-stone-300/80 flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3.5 -right-3.5 w-8 h-8 rounded-full bg-[#121513] border border-white/20 text-white text-sm flex items-center justify-center hover:bg-rose-600 transition-colors shadow-xl z-10 cursor-pointer"
              aria-label="Close photo preview"
            >
              ✕
            </button>

            <div
              className="overflow-hidden bg-neutral-900 relative shadow-inner max-h-[76vh] flex items-center justify-center rounded-sm"
              style={{ aspectRatio: activePhoto.aspectRatio }}
            >
              <img
                src={activePhoto.image}
                alt={activePhoto.caption}
                className="w-full h-full object-contain filter contrast-[1.02]"
              />
            </div>

            <div className="pt-3 px-1 flex items-baseline justify-between gap-4">
              <div>
                <h3 className="font-sans text-sm sm:text-base font-bold text-slate-900 m-0">
                  {activePhoto.caption}
                </h3>
                <p className="font-mono text-xs text-slate-600 m-0 mt-0.5">
                  {activePhoto.subtitle}
                </p>
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold shrink-0">
                {activePhoto.date}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
