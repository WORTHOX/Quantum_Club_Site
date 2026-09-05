import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
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
    applicationAlert: null,
  },
  '2026': {
    year: '2026',
    title: 'IBM Qiskit Fall Fest 2026',
    subtitle: 'October 2026',
    tagline: 'IBM PLUS',
    description: [
      "For the second year running, the Symbiosis Quantum Club is an official partner for IBM Qiskit Fall Fest.",
      "Qiskit Fall Fest is a part of IBM's global push to bring quantum computing to more students through the open-source Qiskit framework, now marking a decade since IBM first put quantum computers on the cloud.",
      "This year's edition centers on a flagship Ideathon: teams pitch an original idea at the problem statement stage, then bring it to life over two days on campus. Alongside that, a curated line-up of speaker sessions will bring in voices from quantum research, industry, and IBM itself — giving participants a rare window into where the field is actually heading.",
    ],
    highlights: [
      'Flagship Ideathon — pitch, build, and present your quantum idea',
      'Curated speaker sessions from quantum researchers and IBM',
      'Second consecutive year as official IBM Qiskit Fall Fest partner',
      'Open to all students — zero prerequisites for speaker sessions',
      'IBM certification for participants',
      'Quantum community of 250+ across institutions',
    ],
    stats: [
      { label: 'Team Size', value: '1–3' },
      { label: 'Format', value: 'Ideathon' },
      { label: 'Sessions', value: 'Speaker' },
      { label: 'Quantum Community', value: '250+' },
    ],
    canonicalUrl: 'https://symbiosisquantumclub.vercel.app/fallfest_2026',
    eventId: 'qiskit-fall-fest-2026',
    accentColor: '#38bdf8',
    gradientFrom: '#0ea5e9',
    gradientTo: '#06b6d4',
    status: 'upcoming',
    scheduleLabel: 'Tentative Fallfest Schedule',
    schedule: [
      {
        stage: 'STAGE 1',
        badge: 'IDEATHON KICKOFF',
        title: 'Team Formation & Pitch Submission',
        desc: 'Form a team of 1–3 and submit your project pitch deck via Google Form. This is your entry into the Ideathon — shortlisted teams move on to the on-campus rounds.',
        footnote: 'Submission deadline: TBD',
      },
      {
        stage: 'DAY 1',
        badge: 'FOUNDATIONS',
        title: 'Speaker Sessions + Workshop',
        desc: 'Four talks — two external quantum experts and two from the club — on current trends and applications in quantum computing, followed immediately by a hands-on workshop to prep teams for Day 2.',
        footnote: null,
      },
      {
        stage: 'DAY 2',
        badge: 'ROUND TWO',
        title: 'Build, Refine & Results',
        desc: 'Shortlisted teams get guidance and mentorship, work time to finalize their submission, and pitch their final version — with results announced at the end of the day.',
        footnote: null,
      },
    ],
    keyDetails: [
      { label: 'Format', value: 'In-person Ideathon, 2 days on campus (plus remote pitch submission stage)' },
      { label: 'Team size', value: '1–3 members' },
      { label: 'Dates', value: '9th and 10th October' },
      { label: 'Timing', value: '9:00 AM – 4:00 PM, both days' },
      { label: 'Venue', value: 'SIT Campus, 5th Floor Seminar Hall & Labs — exact room details shared on registration' },
      { label: 'Speaker Session Registration', value: 'Via Google Form (opening soon)' },
      { label: 'Ideathon Registration', value: 'Via Unstop (link opening soon)' },
      { label: 'Pitch deck submission', value: 'Via Google Form (deadline TBD)' },
    ],
    applicationAlert: 'Applications Opening Soon',
  },
}

const DEFAULT_YEAR = '2025'

export default function FallFest() {
  const { year } = useParams()
  const resolvedYear = year || DEFAULT_YEAR
  const edition = FALL_FEST_EDITIONS[resolvedYear] || FALL_FEST_EDITIONS[DEFAULT_YEAR]

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

          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border backdrop-blur-md"
            style={{ borderColor: `${edition.accentColor}50`, backgroundColor: `${edition.accentColor}12` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: edition.accentColor }} />
            <span className="font-mono text-[0.68rem] font-bold tracking-[0.22em] uppercase" style={{ color: edition.accentColor }}>
              {edition.tagline}
            </span>
          </div>

          <h1
            className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none m-0"
            style={{ textShadow: `0 0 60px ${edition.accentColor}50` }}
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

          <p className="font-mono text-sm uppercase tracking-[0.18em]" style={{ color: edition.accentColor }}>
            {edition.subtitle}
          </p>

          {resolvedYear === '2026' && (
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Quantum Community of 250+ &nbsp;|&nbsp; Ideathon &nbsp;|&nbsp; Speaker Session
            </p>
          )}

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
                {/* Stage + badge row */}
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
