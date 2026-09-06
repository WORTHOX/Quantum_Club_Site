import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import events from '../data/events'

/**
 * IMPORTANT: The /fallfest URL is published on IBM's official Qiskit page.
 * It MUST remain a proper landing page — never a redirect — so that IBM's
 * link continues to resolve with correct SEO and content.
 *
 * Future annual editions are routed as /fallfest_2026, /fallfest_2027, etc.
 * This component handles both cases via the `year` param.
 */

const FALL_FEST_EDITIONS = {
  '2025': {
    year: '2025',
    title: 'IBM Qiskit Fall Fest 2025',
    subtitle: 'A Decade of Quantum on Cloud',
    tagline: 'Official IBM Qiskit Global Partner Event',
    description: [
      "Symbiosis Quantum Club proudly hosts the IBM Qiskit Fall Fest 2025 — one of the most anticipated quantum computing events in India. This multi-day festival brings together students, researchers, and quantum enthusiasts for hands-on workshops, circuit design challenges, and algorithm hackathons powered by real IBM quantum hardware.",
      "As an official IBM Qiskit Global Partner, Symbiosis Quantum Club continues its mission of democratising quantum education and building India's next generation of quantum-ready engineers and scientists.",
    ],
    highlights: [
      'Live IBM Quantum Hardware Sessions via IBM Cloud',
      'Qiskit Circuit Design & VQE Implementation Workshops',
      'Algorithm Hackathon with Real QPU Access',
      '48-hour Quantum Challenge',
      'Expert Mentoring from IBM Qiskit Advocates',
      'Certificate from IBM & Symbiosis Quantum Club',
    ],
    stats: [
      { label: 'Participants', value: '200+' },
      { label: 'IBM QPUs Used', value: '5+' },
      { label: 'Workshops', value: '6' },
      { label: 'Hours of Learning', value: '48' },
    ],
    canonicalUrl: 'https://symbiosisquantumclub.vercel.app/fallfest',
    eventId: 'qiskit-fall-fest-2025',
    accentColor: '#38bdf8',
    gradientFrom: '#0ea5e9',
    gradientTo: '#8b5cf6',
    status: 'past',
    scheduleLabel: null,
    schedule: null,
  },
}

const edition = FALL_FEST_EDITIONS['2025']

export default function FallFest() {
  const linkedEvent = events.find(
    (e) => e.id === edition.eventId || e.category === 'Fall Fest'
  )

  useEffect(() => {
    document.title = `${edition.title} — Symbiosis Quantum Club`

    const canonEl = document.querySelector('link[rel="canonical"]')
    if (canonEl) canonEl.setAttribute('href', edition.canonicalUrl)

    const setMeta = (attr, attrVal, content) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, attrVal)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description',
      `${edition.title} — ${edition.subtitle}. Official IBM Qiskit Global Partner Event hosted by Symbiosis Quantum Club at Symbiosis Institute of Technology, Pune, India.`)
    setMeta('property', 'og:title', `${edition.title} — Symbiosis Quantum Club`)
    setMeta('property', 'og:url', edition.canonicalUrl)
    setMeta('property', 'og:description',
      `${edition.subtitle} — Official IBM Qiskit Fall Fest hosted by Symbiosis Quantum Club. Quantum workshops, hackathons, and real IBM QPU access.`)

    window.scrollTo(0, 0)

    return () => {
      const canon = document.querySelector('link[rel="canonical"]')
      if (canon) canon.setAttribute('href', 'https://symbiosisquantumclub.vercel.app/')
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content',
        "Symbiosis Quantum Club (SQC) — India's premier student quantum computing community at Symbiosis Institute of Technology. Official host of IBM Qiskit Fall Fest. Workshops, hackathons, research, and quantum education.")
    }
  }, [edition])

  return (
    <main className="bg-[#060409] min-h-dvh text-slate-200 pt-[calc(72px+2rem)] pb-20">

      <section className="relative px-4 pb-20 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 pointer-events-none blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${edition.gradientFrom} 0%, ${edition.gradientTo} 60%, transparent 100%)` }}
        />

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center gap-6 z-10">

          {/* Edition Reference Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 p-1.5 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="font-mono text-[11px] text-slate-400">
              Viewing Fall Fest 2025 Archive (Official IBM Partner Link)
            </span>
            <span className="text-slate-600 font-mono text-xs">•</span>
            <Link
              to="/events/qiskit-fall-fest-2026"
              className="font-mono text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              View Upcoming Fall Fest 2026 →
            </Link>
          </div>

          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border backdrop-blur-md"
            style={{ borderColor: `${edition.accentColor}50`, backgroundColor: `${edition.accentColor}12` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: edition.accentColor }} />
            <span className="font-mono text-[0.68rem] font-bold tracking-[0.22em] uppercase" style={{ color: edition.accentColor }}>
              {edition.tagline}
            </span>
          </div>

          {edition.badgeSvg && (
            <div className="w-20 h-20 relative mb-1 group">
              <img
                src={edition.badgeSvg}
                alt="Official IBM Qiskit Fall Fest Badge"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,126,182,0.5)] transition-transform duration-500 group-hover:scale-110 animate-[spin_24s_linear_infinite] hover:animate-none"
              />
            </div>
          )}

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white leading-tight m-0"
            style={{ textShadow: `0 0 40px ${edition.accentColor}40` }}
          >
            QISKIT FALL FEST
            <span
              className="block"
              style={{
                background: `linear-gradient(135deg, ${edition.gradientFrom}, ${edition.gradientTo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {edition.year}
            </span>
          </h1>

          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em]" style={{ color: edition.accentColor }}>
            {edition.subtitle}
          </p>

          <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            {edition.description[0]}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mt-4">
            {edition.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 p-4 rounded-2xl border"
                style={{ borderColor: `${edition.accentColor}30`, backgroundColor: `${edition.accentColor}08` }}
              >
                <span className="font-mono text-2xl font-black" style={{ color: edition.accentColor }}>{edition.stats.find(s => s.label === stat.label).value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {edition.applicationAlert ? (
              <div
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border font-mono text-xs font-bold uppercase tracking-wider"
                style={{
                  borderColor: `${edition.accentColor}60`,
                  backgroundColor: `${edition.accentColor}12`,
                  color: edition.accentColor,
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: edition.accentColor }} />
                {edition.applicationAlert}
              </div>
            ) : (
              linkedEvent && (
                <Link
                  to={`/events/${linkedEvent.id}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${edition.gradientFrom}, ${edition.gradientTo})`,
                    boxShadow: `0 0 32px ${edition.accentColor}40`,
                  }}
                >
                  View Full Event Details →
                </Link>
              )
            )}
            <Link
              to="/events?category=fall-fest"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider border text-slate-300 hover:text-white transition-all duration-300"
              style={{ borderColor: `${edition.accentColor}40`, backgroundColor: `${edition.accentColor}10` }}
            >
              All Fall Fest Editions
            </Link>
          </div>

          {edition.bannerImage ? (
            <div className="w-full max-w-4xl mx-auto mt-6 rounded-2xl overflow-hidden border border-white/[0.12] bg-[#070a08] p-2 sm:p-2.5 shadow-2xl relative group">
              <div className="relative rounded-xl overflow-hidden border border-white/[0.06]">
                <img
                  src={edition.bannerImage}
                  alt={edition.title}
                  className="w-full h-auto object-cover max-h-[460px]"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-mono text-[10px] text-cyan-300 hidden sm:flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  IBM Quantum Heron Architecture • Fall Fest 2026 Key Visual
                </div>
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-mono text-[9px] text-slate-300 hidden sm:block">
                  CANONICAL RES: 2560×1440
                </div>
              </div>
            </div>
          ) : edition.heroSvg && (
            <div className="w-full max-w-4xl mx-auto mt-6 rounded-2xl overflow-hidden border border-cyan-900/40 bg-[#070a08] p-2 sm:p-3 shadow-2xl relative group">
              <img src={edition.heroSvg} alt={edition.title} className="w-full h-auto object-contain" />
              <div className="absolute top-4 left-5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-mono text-[11px] text-cyan-300 hidden sm:block">
                IBM Quantum Heron Architecture • Key Artwork
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 max-w-3xl mx-auto mb-16 flex flex-col gap-5">
        {edition.description.slice(1).map((para, i) => (
          <p key={i} className="text-base sm:text-lg text-slate-300 leading-relaxed">{para}</p>
        ))}
      </section>

      {edition.schedule && (
        <section className="px-4 max-w-5xl mx-auto mb-16">
          <div className="mb-8 flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase" style={{ color: edition.accentColor }}>
              {edition.scheduleLabel}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {edition.schedule.map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col gap-4 p-6 rounded-2xl border overflow-hidden"
                style={{ borderColor: `${edition.accentColor}25`, backgroundColor: `${edition.accentColor}06` }}
              >
                {/* Step number accent */}
                <span
                  className="absolute top-4 right-5 font-mono text-5xl font-black leading-none select-none pointer-events-none"
                  style={{ color: `${edition.accentColor}10` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Stage + badge + sticker row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-1.5">
                    <span
                      className="font-mono text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: edition.accentColor }}
                    >
                      {item.stage}
                    </span>
                    <span
                      className="inline-self-start font-mono text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border w-fit"
                      style={{ color: `${edition.accentColor}cc`, borderColor: `${edition.accentColor}30`, backgroundColor: `${edition.accentColor}10` }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  {item.sticker && (
                    <div className="w-11 h-11 p-1 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      <img src={item.sticker} alt={item.badge} className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
                {/* Title */}
                <p className="font-bold text-white text-[0.95rem] leading-snug">{item.title}</p>
                {/* Description */}
                <p className="text-[0.8rem] text-slate-400 leading-relaxed flex-1">{item.desc}</p>
                {/* Footnote */}
                {item.footnote && (
                  <p className="font-mono text-[9px] uppercase tracking-wider mt-1" style={{ color: `${edition.accentColor}90` }}>
                    ⏱ {item.footnote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Key Details ───────────────────────────────────────────────────── */}
      {edition.keyDetails && (
        <section className="px-4 max-w-5xl mx-auto mb-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase" style={{ color: edition.accentColor }}>
              Key Details
            </span>
          </div>
          <div
            className="rounded-2xl border divide-y"
            style={{ borderColor: `${edition.accentColor}20`, backgroundColor: `${edition.accentColor}05` }}
          >
            {edition.keyDetails.map((row, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 px-5 py-3.5"
                style={{ borderColor: `${edition.accentColor}12` }}
              >
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-widest shrink-0 sm:w-52 pt-0.5"
                  style={{ color: edition.accentColor }}
                >
                  {row.label}
                </span>
                <span className="text-sm text-slate-300">{row.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 max-w-5xl mx-auto mb-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase" style={{ color: edition.accentColor }}>
            What to Expect
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {edition.highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl border"
              style={{ borderColor: `${edition.accentColor}25`, backgroundColor: `${edition.accentColor}08` }}
            >
              <span className="font-mono text-lg shrink-0" style={{ color: edition.accentColor }}>✦</span>
              <span className="text-sm text-slate-300 leading-relaxed">{h}</span>
            </div>
          ))}
        </div>
      </section>



      <section className="px-4 max-w-5xl mx-auto mb-12 pt-10 border-t border-slate-800/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-1">Hosted by</p>
            <p className="text-white font-bold text-lg">Symbiosis Quantum Club</p>
            <p className="text-slate-400 text-sm font-mono">Symbiosis Institute of Technology, Pune, India</p>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <Link
              to="/"
              className="font-mono text-xs uppercase tracking-wider hover:text-white transition-colors"
              style={{ color: edition.accentColor }}
            >
              Visit Symbiosis Quantum Club →
            </Link>
            <Link to="/events" className="font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
              Browse All Events →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
