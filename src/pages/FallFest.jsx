import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import events from '../data/events'

/**
 * IMPORTANT: The /fallfest URL is published on IBM's official Qiskit page.
 * It MUST remain a proper landing page — never a redirect — so that IBM's
 * link continues to resolve with correct SEO and content.
 */

// ── 2025 Edition data ────────────────────────────────────────────────────────
const EDITION_2025 = {
  year: '2025',
  title: 'Qiskit Fall Fest 2025',
  subtitle: 'Fundamentals of Quantum Mechanics @ SIT Pune',
  tagline: 'Official IBM Qiskit Global Partner Event',
  theme: 'Fundamentals of Quantum Mechanics',
  canonicalUrl: 'https://symbiosisquantumclub.vercel.app/fallfest',
  eventId: 'qiskit-fall-fest-2025',
  accentColor: '#38bdf8',
  gradientFrom: '#0ea5e9',
  gradientTo: '#8b5cf6',
  bannerImage: '/assets/fallfest/Full_Illustration.png',
  timelineImage: '/assets/fallfest/Timeline_01.png',
  tags: [
    'Fundamentals of Quantum Mechanics',
    'Assessment for Certification',
    'Open to Everyone',
  ],
  leadText:
    'Build a solid conceptual foundation and practice circuits with Qiskit in guided workshops. Validate learning with a short assessment for an official course certificate.',
  eventDetails: [
    'Three focused days combining live instruction with hands-on workshops to build intuition quickly.',
    'Guided practice with Qiskit: states, gates, circuits, and simple algorithms.',
    'Short assessment at the end; successful completion makes participants eligible for an official course certificate.',
    'November 2025 · Open to all backgrounds and experience levels at SIT Pune.',
  ],
  whatToExpect: [
    'Clear explanations of states, operators, and measurement with minimal math overhead.',
    'Build and run small circuits in Qiskit to see concepts in action.',
    'Concise assessment to check understanding and qualify for certification.',
  ],
  schedule: [
    {
      day: 'Day 1',
      title: 'Foundations',
      accent: '#40c0cb',
      borderColor: 'border-[#40c0cb]/35',
      badgeBg: 'bg-[#40c0cb]/10 text-[#40c0cb] border-[#40c0cb]/30',
      items: [
        'State vectors, measurements, single-qubit gates.',
        'Live demos in Qiskit to cement concepts.',
      ],
    },
    {
      day: 'Day 2',
      title: 'Circuits',
      accent: '#8b5cf6',
      borderColor: 'border-[#8b5cf6]/35',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      items: [
        'Multi-qubit systems, entanglement.',
        'Compose and run simple circuits.',
      ],
    },
    {
      day: 'Day 3',
      title: 'Algorithms',
      accent: '#fbbf24',
      borderColor: 'border-[#fbbf24]/35',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      items: [
        'Intro to basic algorithms.',
        'Guided practice + assessment briefing.',
      ],
    },
    {
      day: 'Assessment',
      title: 'Certification',
      accent: '#ff4e50',
      borderColor: 'border-[#ff4e50]/35',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      items: [
        'Submission checklist and timeline.',
        'Certification eligibility criteria.',
      ],
    },
  ],
  speakers: [
    {
      title: 'Qiskit 101: Fundamentals of Quantum Mechanics',
      speaker: 'IBM Quantum (Speaker TBA)',
      desc: 'An introduction to the core principles of quantum mechanics and their applications in quantum computing.',
      image: '/assets/fallfest/Cat_01.png',
      badge: 'Keynote & Foundations',
      accent: 'border-cyan-500/30',
    },
    {
      title: 'Getting Started with Qiskit',
      speaker: 'Student-Led Workshop',
      desc: 'A beginner-friendly session on setting up Qiskit and exploring the basics of quantum programming.',
      image: '/assets/fallfest/Circuit.png',
      badge: 'Interactive Workshop',
      accent: 'border-purple-500/30',
    },
    {
      title: 'Hands-On Quantum Circuit Prototyping',
      speaker: 'Student-Led Workshop',
      desc: 'An interactive workshop where participants design and prototype their own quantum circuits using Qiskit.',
      image: '/assets/fallfest/Cat_02.png',
      badge: 'Hands-On Sprint',
      accent: 'border-emerald-500/30',
    },
  ],
  organizers: [
    {
      name: 'Dr. Archana Chaudhari',
      role: 'Faculty in-Charge',
      advisoryRole: 'Faculty Advisor',
      dept: 'Faculty Advisor, SQC · SIT Pune',
      image: '/assets/team/archana-maam.jpeg',
      linkedin: 'https://www.linkedin.com/in/archanachaudhari/',
    },
    {
      name: 'Samarth Bhadane',
      role: 'President',
      advisoryRole: 'President Advisor',
      dept: 'Founding President & Research Enthusiast · Advisory Council',
      image: '/assets/team/samarth.jpeg',
      linkedin: 'https://www.linkedin.com/in/samarthsb4real',
    },
    {
      name: 'Anirudh Raman',
      role: 'Research Head',
      advisoryRole: 'Research Advisor',
      dept: 'Lead Organizer & Advisory Council',
      image: '/assets/team/anirudh.jpeg',
      linkedin: '#',
    },
    {
      name: 'Eric Siquiera',
      role: 'Technical Head',
      advisoryRole: 'Technical Advisor',
      dept: 'Circuits & Advisory Council',
      image: '/assets/team/eric.png',
      linkedin: '#',
    },
    {
      name: 'Disha Gupta',
      role: 'Technical Head',
      advisoryRole: 'VP Advisor',
      dept: 'Quantum Systems & Advisory Council',
      image: '/assets/team/disha.png',
      linkedin: '#',
    },
  ],
  codeOfConduct: [
    {
      title: 'Respect and Inclusivity',
      desc: 'We are committed to providing a friendly, safe, and welcoming environment for all participants, regardless of experience level, background, or identity.',
      icon: '✦',
    },
    {
      title: 'Professionalism',
      desc: 'All participants, speakers, and organizers are expected to conduct themselves professionally and constructively in all sessions and discussions.',
      icon: '✦',
    },
    {
      title: 'Safe Environment',
      desc: 'Harassment in any form will not be tolerated. Everyone is empowered to learn, explore quantum computing, and ask questions safely.',
      icon: '✦',
    },
    {
      title: 'Collaboration and Learning',
      desc: 'Encourage peer learning, shared growth, and active problem solving. Help each other understand quantum concepts and debug circuits.',
      icon: '✦',
    },
  ],
  collaborators: [
    { name: 'IBM Quantum', logo: '/assets/fallfest/IBM Quantum Logo.png', desc: 'Official Global Event Partner' },
    { name: 'Qiskit', logo: '/assets/fallfest/Qiskit_03.png', desc: 'Open Source Quantum SDK' },
  ],
  stats: [
    { label: 'Participants', value: '200+' },
    { label: 'IBM QPUs Used', value: '5+' },
    { label: 'Workshops', value: '3' },
    { label: 'Days', value: '3' },
  ],
}

// ── 2026 Edition data ────────────────────────────────────────────────────────
const EDITION_2026 = {
  year: '2026',
  title: 'IBM Qiskit Fall Fest 2026',
  subtitle: 'A Decade of Quantum on Cloud',
  tagline: 'Official IBM Qiskit Global Partner Event',
  description: [
    "Symbiosis Quantum Club proudly hosts the IBM Qiskit Fall Fest 2026 — one of the most anticipated quantum computing events in India. This multi-day festival brings together students, researchers, and quantum enthusiasts for hands-on workshops, circuit design challenges, and algorithm hackathons powered by real IBM quantum hardware.",
    "As an official IBM Qiskit Global Partner, Symbiosis Quantum Club continues its mission of democratising quantum education and building India's next generation of quantum-ready engineers and scientists.",
  ],
  canonicalUrl: 'https://symbiosisquantumclub.vercel.app/events/qiskit-fall-fest-2026',
  eventId: 'qiskit-fall-fest-2026',
  accentColor: '#FF7EB6',
  gradientFrom: '#FF7EB6',
  gradientTo: '#38bdf8',
  highlights: [
    'Live IBM Quantum Hardware Sessions via IBM Cloud',
    'Qiskit Circuit Design & VQE Implementation Workshops',
    'Algorithm Hackathon with Real QPU Access',
    '48-hour Quantum Challenge',
    'Expert Mentoring from IBM Qiskit Advocates',
    'Certificate from IBM & Symbiosis Quantum Club',
  ],
  stats: [
    { label: 'Participants', value: '300+' },
    { label: 'IBM QPUs', value: '7+' },
    { label: 'Workshops', value: '8' },
    { label: 'Hours', value: '48' },
  ],
}

// Determine which edition to show based on the URL
function useEdition() {
  const path = window.location.pathname
  if (path.includes('fallfest_2026') || path.includes('fall-fest-2026')) return EDITION_2026
  if (path.includes('fallfest_2025') || path.includes('fall-fest-2025')) return EDITION_2025
  // /fallfest canonical → 2025 archive
  return EDITION_2025
}

export default function FallFest() {
  const edition = useEdition()
  const is2026 = edition.year === '2026'
  const linkedEvent = events.find((e) => e.id === edition.eventId || e.category === 'Fall Fest')

  useEffect(() => {
    document.title = `${edition.title} — Symbiosis Quantum Club`

    const canonEl = document.querySelector('link[rel="canonical"]')
    if (canonEl) canonEl.setAttribute('href', edition.canonicalUrl)

    const setMeta = (attr, attrVal, content) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, attrVal); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    setMeta('name', 'description', `${edition.title} — ${edition.subtitle || edition.tagline}. Official IBM Qiskit Global Partner Event hosted by Symbiosis Quantum Club at SIT Pune.`)
    setMeta('property', 'og:title', `${edition.title} — Symbiosis Quantum Club`)
    setMeta('property', 'og:url', edition.canonicalUrl)

    window.scrollTo(0, 0)

    return () => {
      const canon = document.querySelector('link[rel="canonical"]')
      if (canon) canon.setAttribute('href', 'https://symbiosisquantumclub.vercel.app/')
    }
  }, [edition])

  return (
    <main className="bg-[#060409] min-h-dvh text-slate-200 pt-[calc(72px+2rem)] pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Edition Reference Bar ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 p-1.5 px-4 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8">
          <span className="font-mono text-[11px] text-slate-400">
            {is2026 ? 'Fall Fest 2026 — Upcoming Edition' : 'Viewing Fall Fest 2025 Archive (Official IBM Partner Link)'}
          </span>
          <span className="text-slate-600 font-mono text-xs">/</span>
          {is2026 ? (
            <Link to="/fallfest" className="font-mono text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
              View 2025 Archive ←
            </Link>
          ) : (
            <Link to="/events/qiskit-fall-fest-2026" className="font-mono text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
              View Upcoming Fall Fest 2026 →
            </Link>
          )}
        </div>

        {/* ── Hero Section ── */}
        <section className="relative pb-20 overflow-hidden mb-16">
          {/* Ambient radial glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-15 pointer-events-none blur-3xl"
            style={{ background: `radial-gradient(ellipse, ${edition.gradientFrom} 0%, ${edition.gradientTo} 60%, transparent 100%)` }}
          />

          <div className="relative flex flex-col items-center text-center gap-6 z-10">
            {/* Tagline pill */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border backdrop-blur-md"
              style={{ borderColor: `${edition.accentColor}40`, backgroundColor: `${edition.accentColor}0d` }}
            >
              <span className="font-mono text-[0.68rem] font-bold tracking-[0.22em] uppercase" style={{ color: edition.accentColor }}>
                {edition.tagline}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display uppercase tracking-tight text-white leading-tight m-0"
              style={{ textShadow: `0 0 40px ${edition.accentColor}30` }}
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

            {/* Tags / pills (2025) */}
            {edition.tags && (
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl">
                {edition.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wide border bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.07]"
                    style={{
                      borderColor: idx === 0 ? '#40c0cb50' : idx === 1 ? '#8b5cf650' : '#34d39950',
                      color: idx === 0 ? '#40c0cb' : idx === 1 ? '#a78bfa' : '#34d399',
                    }}
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Subtitle */}
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em]" style={{ color: edition.accentColor }}>
              {edition.subtitle}
            </p>

            {/* Lead text */}
            <p className="max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed font-body">
              {edition.leadText || (edition.description && edition.description[0])}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mt-2">
              {edition.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 p-4 rounded-2xl border bg-[#0d0d0f]"
                  style={{ borderColor: `${edition.accentColor}25` }}
                >
                  <span className="font-mono text-2xl font-black" style={{ color: edition.accentColor }}>{stat.value}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              {edition.schedule && (
                <a
                  href="#schedule"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${edition.gradientFrom}, ${edition.gradientTo})`,
                    boxShadow: `0 0 24px ${edition.accentColor}35`,
                  }}
                >
                  View Schedule ↓
                </a>
              )}
              {!edition.schedule && linkedEvent && (
                <Link
                  to={`/events/${linkedEvent.id}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${edition.gradientFrom}, ${edition.gradientTo})`,
                    boxShadow: `0 0 24px ${edition.accentColor}35`,
                  }}
                >
                  View Full Event Details →
                </Link>
              )}
              <Link
                to="/events?category=fall-fest"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border text-slate-300 hover:text-white transition-all duration-300 bg-white/[0.03] border-white/15 hover:bg-white/[0.06]"
              >
                All Fall Fest Editions
              </Link>
            </div>

            {/* Banner image */}
            {edition.bannerImage && (
              <div className="w-full max-w-4xl mx-auto mt-6 rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0a0a0c] p-2 sm:p-2.5 shadow-2xl">
                <div className="relative rounded-xl overflow-hidden border border-white/[0.05]">
                  <img
                    src={edition.bannerImage}
                    alt={edition.title}
                    className="w-full h-auto object-cover max-h-[460px]"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── 2025-only: Event Details & What to Expect ── */}
        {edition.eventDetails && (
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Event Details Card */}
              <div className="p-6 sm:p-10 rounded-3xl bg-[#0d0d0f] border border-cyan-500/25 shadow-xl flex flex-col transition-all duration-300 hover:border-cyan-400/40">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-5">
                    <span>✦</span> Event Details
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight">
                    Immersive 3-Day Quantum Experience
                  </h3>
                  <ul className="space-y-4">
                    {edition.eventDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-slate-200 text-base leading-relaxed">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* What to Expect Card */}
              <div className="p-6 sm:p-10 rounded-3xl bg-[#0d0d0f] border border-purple-500/25 shadow-xl flex flex-col transition-all duration-300 hover:border-purple-400/40">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-wider mb-5">
                    <span>✦</span> What to Expect
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight">
                    Intuition First, Math Overhead Second
                  </h3>
                  <ul className="space-y-4">
                    {edition.whatToExpect.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-slate-200 text-base leading-relaxed">
                        <span className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/35 text-purple-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 2026-only: Highlights ── */}
        {edition.highlights && (
          <section className="mb-24">
            <div className="mb-8 text-center">
              <span className="font-mono text-[11px] font-bold tracking-widest uppercase" style={{ color: edition.accentColor }}>
                What to Expect
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {edition.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border bg-[#0d0d0f]"
                  style={{ borderColor: `${edition.accentColor}20` }}
                >
                  <span className="font-mono text-lg shrink-0" style={{ color: edition.accentColor }}>✦</span>
                  <span className="text-sm text-slate-300 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Schedule (2025 only) ── */}
        {edition.schedule && (
          <section id="schedule" className="mb-24 scroll-mt-24">
            <div className="mb-12 text-center">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
                Curriculum & Roadmap
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Event Schedule
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-base sm:text-lg">
                Four focused milestones taking you from single qubits to circuit design and official certification.
              </p>
            </div>

            {/* Timeline image */}
            {edition.timelineImage && (
              <div className="mb-10 rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0d0d0f] p-6 sm:p-8 shadow-xl flex justify-center">
                <img
                  src={edition.timelineImage}
                  alt="Qiskit Fall Fest Timeline"
                  className="max-h-36 sm:max-h-48 w-auto object-contain"
                />
              </div>
            )}

            {/* 4 Milestone cards — matte dark, not shiny */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {edition.schedule.map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-7 rounded-3xl bg-[#0d0d0f] border ${slot.borderColor} transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[260px]`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`px-3 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider border ${slot.badgeBg}`}>
                        {slot.day}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-4">
                      {slot.title}
                    </h3>
                    <ul className="space-y-3">
                      {slot.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                          <span className="text-cyan-400 shrink-0 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Speakers (2025 only) ── */}
        {edition.speakers && (
          <section className="mb-24">
            <div className="mb-12 text-center">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-purple-400 block mb-2">
                Sessions & Mentors
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Speakers & Workshops
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7">
              {edition.speakers.map((spk, idx) => (
                <div
                  key={idx}
                  className={`group relative p-6 rounded-3xl bg-[#0d0d0f] border ${spk.accent} hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4`}
                >
                  <div className="overflow-hidden rounded-2xl bg-[#111113] border border-white/[0.06]">
                    <img
                      src={spk.image}
                      alt={spk.title}
                      className="w-full h-48 object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full font-mono text-xs font-bold text-slate-300 border border-white/10 bg-white/[0.04] mb-3">
                      {spk.badge}
                    </span>
                    <h3 className="font-display text-base font-bold text-white leading-snug mb-1">{spk.title}</h3>
                    <p className="font-mono text-xs text-slate-500 mb-2">{spk.speaker}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{spk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Organizers / Advisory Members (2025 only) ── */}
        {edition.organizers && (
          <section className="mb-24">
            <div className="mb-12 text-center">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
                Leadership & Coordination
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Organizers & Advisory Council
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-base sm:text-lg">
                Meet the faculty advisor and club leadership who organized Qiskit Fall Fest 2025 at SIT Pune.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
              {edition.organizers.map((org, idx) => (
                <div
                  key={idx}
                  className="group relative p-5 sm:p-6 rounded-3xl bg-[#0d0d0f] border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden min-h-[340px]"
                >
                  {/* Portrait */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4 rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-400/40 transition-all duration-500 bg-[#111113]">
                    <img
                      src={org.image}
                      alt={org.name}
                      className="w-full h-full object-cover object-top filter grayscale-[10%] group-hover:grayscale-0 transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug tracking-tight">
                    {org.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full font-mono text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 mb-2 block w-fit mx-auto">
                    {org.role}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] text-purple-300 bg-purple-500/10 border border-purple-500/25 mb-2 font-medium">
                    ✦ {org.advisoryRole}
                  </span>
                  <p className="font-mono text-xs text-slate-400 tracking-wide mt-auto">
                    {org.dept}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Code of Conduct (2025 only) ── */}
        {edition.codeOfConduct && (
          <section className="mb-24">
            <div className="mb-12 text-center">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-emerald-400 block mb-2">
                Community Standards
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Code of Conduct
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-base sm:text-lg">
                Committed to providing an inclusive, constructive, and inspiring environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {edition.codeOfConduct.map((item, idx) => (
                <div
                  key={idx}
                  className="p-7 sm:p-9 rounded-3xl bg-[#0d0d0f] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-emerald-400 text-xl font-bold">✦</span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Collaborators ── */}
        {edition.collaborators && (
          <section className="mb-20 p-6 sm:p-10 rounded-3xl bg-[#0d0d0f] border border-white/10 text-center shadow-xl">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-400 block mb-3">
              Official Global Collaborators
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white mb-10">
              Powered by IBM Quantum & Qiskit
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
              {edition.collaborators.map((c, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-[#111113] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 w-full sm:w-auto sm:min-w-[240px]"
                >
                  <img src={c.logo} alt={c.name} className="h-10 sm:h-14 object-contain" />
                  <div>
                    <p className="font-bold text-white text-lg sm:text-xl">{c.name}</p>
                    <p className="font-mono text-xs sm:text-sm text-slate-400">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer ── */}
        <section className="max-w-5xl mx-auto mb-12 pt-10 border-t border-slate-800/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-1">
                {edition.organizers ? 'Organized by' : 'Hosted by'}
              </p>
              <p className="text-white font-bold text-lg sm:text-xl font-display">Symbiosis Quantum Club</p>
              <p className="text-slate-400 text-sm font-mono">Symbiosis Institute of Technology, Pune, India</p>
            </div>
            <div className="flex flex-col gap-2.5 sm:text-right">
              <Link to="/" className="font-mono text-xs sm:text-sm uppercase tracking-wider hover:text-white transition-colors" style={{ color: edition.accentColor }}>
                Visit Symbiosis Quantum Club →
              </Link>
              <Link to="/events" className="font-mono text-xs sm:text-sm uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
                Browse All Events →
              </Link>
              {!is2026 && (
                <Link to="/events/qiskit-fall-fest-2026" className="font-mono text-xs sm:text-sm uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                  Qiskit Fall Fest 2026 →
                </Link>
              )}
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
