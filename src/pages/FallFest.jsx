import { useState, useEffect } from 'react'
import useSEO from '../utils/useSEO'
import { Link } from 'react-router-dom'
import events from '../data/events'

/**
 * IMPORTANT: The /fallfest URL is published on IBM's official Qiskit page.
 * It MUST remain a proper landing page — never a redirect.
 */

const edition = {
  year: '2025',
  title: 'Qiskit Fall Fest 2025',
  institution: 'Symbiosis Institute of Technology, Pune',
  theme: 'Fundamentals of Quantum Mechanics',
  subtitle: 'Fundamentals of Quantum Mechanics @ SIT Pune',
  tagline: 'Official IBM Qiskit Global Partner Event',
  canonicalUrl: 'https://symbiosisquantumclub.vercel.app/fallfest',
  eventId: 'qiskit-fall-fest-2025',
  accentColor: '#38bdf8',
  gradientFrom: '#0ea5e9',
  gradientTo: '#8b5cf6',
  bannerImage: '/assets/fallfest/Full_Illustration.png',
  timelineImage: '/assets/fallfest/Timeline_01.png',
  gallery: Array.from({ length: 10 }, (_, i) => ({
    url: `/assets/events/fall-fest-2025/photo-${i + 1}.jpg`,
    caption: `Qiskit Fall Fest 2025 — Moment ${i + 1}`,
  })),
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
      borderColor: 'border-[#40c0cb]/40',
      badgeBg: 'bg-[#40c0cb]/15 text-[#40c0cb] border-[#40c0cb]/30',
      glow: 'shadow-[0_0_30px_rgba(64,192,203,0.18)]',
      items: [
        'State vectors, measurements, single-qubit gates.',
        'Live demos in Qiskit to cement concepts.',
      ],
    },
    {
      day: 'Day 2',
      title: 'Circuits',
      accent: '#8b5cf6',
      borderColor: 'border-[#8b5cf6]/40',
      badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      glow: 'shadow-[0_0_30px_rgba(139,92,246,0.18)]',
      items: [
        'Multi-qubit systems, entanglement.',
        'Compose and run simple circuits.',
      ],
    },
    {
      day: 'Day 3',
      title: 'Algorithms',
      accent: '#fbbf24',
      borderColor: 'border-[#fbbf24]/40',
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      glow: 'shadow-[0_0_30px_rgba(251,191,36,0.18)]',
      items: [
        'Intro to basic algorithms.',
        'Guided practice + assessment briefing.',
      ],
    },
    {
      day: 'Assessment',
      title: 'Certification',
      accent: '#ff4e50',
      borderColor: 'border-[#ff4e50]/40',
      badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      glow: 'shadow-[0_0_30px_rgba(255,78,80,0.18)]',
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
      accent: 'border-cyan-500/35',
    },
    {
      title: 'Getting Started with Qiskit',
      speaker: 'Student-Led Workshop',
      desc: 'A beginner-friendly session on setting up Qiskit and exploring the basics of quantum programming.',
      image: '/assets/fallfest/Circuit.png',
      badge: 'Interactive Workshop',
      accent: 'border-purple-500/35',
    },
    {
      title: 'Hands-On Quantum Circuit Prototyping',
      speaker: 'Student-Led Workshop',
      desc: 'An interactive workshop where participants design and prototype their own quantum circuits using Qiskit.',
      image: '/assets/fallfest/Cat_02.png',
      badge: 'Hands-On Sprint',
      accent: 'border-emerald-500/35',
    },
  ],
  organizers: [
    {
      name: 'Dr. Archana Chaudhari',
      role: 'Faculty Coordinator',
      advisoryRole: 'Faculty Advisor',
      dept: 'Associate Professor & Faculty Coordinator',
      image: '/assets/team/Archana ma\'am.png',
      linkedin: 'https://www.linkedin.com/in/dr-archana-chaudhari-396a3093/?originalSubdomain=in',
    },
    {
      name: 'Samarth Bura',
      role: 'President',
      advisoryRole: 'President Advisor',
      dept: 'Founding President & Research Enthusiast · Advisory Council',
      image: '/assets/team/samarth.jpeg',
      linkedin: 'https://www.linkedin.com/in/samarthsb4real?utm_source=share_via&utm_content=profile&utm_medium=member_android',
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
    {
      name: 'IBM Quantum',
      logo: '/assets/fallfest/IBM Quantum Logo.png',
      desc: 'Official Global Event Partner',
    },
    {
      name: 'Qiskit',
      logo: '/assets/fallfest/Qiskit_03.png',
      desc: 'Open Source Quantum SDK',
    },
  ],
}

// Sticker assets used as ambient background decor
const STICKERS = [
  '/assets/fallfest/2026/svg/sticker_01.svg',
  '/assets/fallfest/2026/svg/sticker_02.svg',
  '/assets/fallfest/2026/svg/sticker_03.svg',
  '/assets/fallfest/2026/svg/sticker_04.svg',
  '/assets/fallfest/2026/svg/sticker_05.svg',
  '/assets/fallfest/2026/svg/sticker_06.svg',
  '/assets/fallfest/2026/svg/sticker_07.svg',
  '/assets/fallfest/2026/svg/sticker_08.svg',
  '/assets/fallfest/2026/svg/sticker_09.svg',
  '/assets/fallfest/2026/svg/badge-pink.svg',
]

// Vertical marquee: renders a scrolling column of stickers flanking the page
function VerticalMarquee({ stickers, direction = 'up', speed = 40 }) {
  const items = [...stickers, ...stickers]
  const animClass = direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down'
  return (
    <div className="flex flex-col gap-6 overflow-hidden h-full">
      <div
        className={`flex flex-col gap-6 ${animClass}`}
        style={{ animation: `${direction === 'up' ? 'marqueeUp' : 'marqueeDown'} ${speed}s linear infinite` }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 shrink-0 p-2.5 xl:p-3 2xl:p-3.5 rounded-2xl bg-white/[0.12] border border-white/[0.22] hover:border-[#FF7EB6]/80 hover:bg-white/[0.20] shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_24px_rgba(255,126,182,0.3)] hover:shadow-[0_8px_38px_rgba(0,0,0,0.7),0_0_36px_rgba(255,126,182,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-105 pointer-events-auto cursor-pointer flex items-center justify-center"
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] opacity-95 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FallFest() {
  const [lightboxImg, setLightboxImg] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null)
      if (e.key === 'ArrowLeft' && lightboxImg > 0) setLightboxImg((prev) => prev - 1)
      if (e.key === 'ArrowRight' && lightboxImg < edition.gallery.length - 1) setLightboxImg((prev) => prev + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImg])

  const relatedEvents = events
    .filter((e) => (e.category === 'Fall Fest' || e.id.includes('fall-fest')) && e.id !== edition.eventId)
    .slice(0, 3)

  const linkedEvent = events.find(
    (e) => e.id === edition.eventId || e.category === 'Fall Fest'
  )

  useSEO({
    title: `${edition.title} — ${edition.theme} | Symbiosis Quantum Club`,
    description: `${edition.title} — ${edition.theme} @ ${edition.institution}. Official IBM Qiskit Global Partner Event hosted by Symbiosis Quantum Club. Guided circuit workshops, live coding, and certification.`,
    canonical: edition.canonicalUrl,
    keywords: 'IBM Qiskit Fall Fest 2025, Qiskit workshop SIT Pune, quantum circuit programming, IBM partner event, Symbiosis Quantum Club',
    ogType: 'website',
    ogImage: edition.bannerImage,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Event',
          '@id': 'https://symbiosisquantumclub.vercel.app/fallfest#event',
          'name': edition.title,
          'description': `${edition.title} — ${edition.theme} @ ${edition.institution}. Official IBM Qiskit Global Partner Event.`,
          'startDate': '2025-10-08T09:00:00+05:30',
          'endDate': '2025-10-11T17:00:00+05:30',
          'eventStatus': 'https://schema.org/EventScheduled',
          'eventAttendanceMode': 'https://schema.org/MixedEventAttendanceMode',
          'image': `https://symbiosisquantumclub.vercel.app${edition.bannerImage}`,
          'location': {
            '@type': 'Place',
            'name': edition.institution,
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'SIT Pune Campus, Lavale',
              'addressLocality': 'Pune',
              'addressRegion': 'Maharashtra',
              'postalCode': '412115',
              'addressCountry': 'IN'
            }
          },
          'organizer': {
            '@type': 'Organization',
            'name': 'Symbiosis Quantum Club',
            'url': 'https://symbiosisquantumclub.vercel.app/'
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://symbiosisquantumclub.vercel.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Events',
              'item': 'https://symbiosisquantumclub.vercel.app/events'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': edition.title,
              'item': 'https://symbiosisquantumclub.vercel.app/fallfest'
            }
          ]
        }
      ]
    }
  })

  return (
    <main className="bg-[#060409] min-h-dvh pt-[calc(72px+clamp(1.5rem,1rem+2.5vw,3.5rem))] pb-12 sm:pb-16 text-slate-200 relative overflow-x-clip">
      {/* Dynamic Ambient Background Aura */}
      <div className="absolute top-0 inset-x-0 h-[450px] overflow-hidden pointer-events-none -z-10 flex justify-center">
        <div
          className="w-[min(100vw,900px)] h-full rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${edition.gradientFrom} 0%, ${edition.gradientTo} 60%, transparent 100%)` }}
        />
      </div>

      {/* ── Flanking Vertical Marquees on blank margins (Enabled on xl+ screens, matching EventDetail.jsx exactly) ── */}
      <div className="fixed inset-y-0 left-1 xl:left-2 2xl:left-4 w-16 xl:w-20 2xl:w-24 h-screen z-0 pointer-events-none hidden xl:flex flex-col items-center overflow-hidden py-4">
        <VerticalMarquee stickers={STICKERS} direction="up" speed={45} />
      </div>
      <div className="fixed inset-y-0 right-1 xl:right-2 2xl:right-4 w-16 xl:w-20 2xl:w-24 h-screen z-0 pointer-events-none hidden xl:flex flex-col items-center overflow-hidden py-4">
        <VerticalMarquee stickers={[...STICKERS].reverse()} direction="down" speed={38} />
      </div>

      {/* ── Ambient background decorative stickers (matching EventDetail.jsx) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden xl:block" aria-hidden="true">
        <img src={STICKERS[0]} alt="" className="absolute top-24 left-24 w-24 h-24 opacity-[0.14] rotate-[-15deg] filter drop-shadow-[0_0_24px_rgba(255,126,182,0.35)]" />
        <img src={STICKERS[5]} alt="" className="absolute top-56 left-12 w-16 h-16 opacity-[0.12] rotate-[20deg] filter drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]" />
        <img src={STICKERS[2]} alt="" className="absolute top-28 right-24 w-22 h-22 opacity-[0.14] rotate-[12deg] filter drop-shadow-[0_0_24px_rgba(167,139,250,0.35)]" />
        <img src={STICKERS[8]} alt="" className="absolute top-64 right-12 w-16 h-16 opacity-[0.12] rotate-[-8deg] filter drop-shadow-[0_0_20px_rgba(255,126,182,0.3)]" />
        <img src={STICKERS[4]} alt="" className="absolute top-[46%] left-16 w-18 h-18 opacity-[0.12] rotate-[6deg] filter drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]" />
        <img src={STICKERS[6]} alt="" className="absolute top-[42%] right-16 w-18 h-18 opacity-[0.12] rotate-[-10deg] filter drop-shadow-[0_0_20px_rgba(167,139,250,0.3)]" />
        <img src={STICKERS[3]} alt="" className="absolute bottom-40 left-28 w-18 h-18 opacity-[0.14] rotate-[16deg] filter drop-shadow-[0_0_24px_rgba(56,189,248,0.35)]" />
        <img src={STICKERS[9]} alt="" className="absolute bottom-28 right-28 w-22 h-22 opacity-[0.14] rotate-[-12deg] filter drop-shadow-[0_0_28px_rgba(255,126,182,0.35)]" />
        <img src={STICKERS[7]} alt="" className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-16 opacity-[0.10] rotate-[4deg]" />
      </div>

      {/* ── Main content: Exact container dimensions matching EventDetail.jsx ── */}
      <article className="w-full max-w-[1360px] px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 mx-auto relative z-10">

        {/* ── Top Navigation & Telemetry Breadcrumb ── */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-6 pb-4 border-b border-white/[0.06]">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 sm:gap-2 font-pixel text-[9px] sm:text-[10px] tracking-widest text-cyan-400 hover:text-cyan-300 uppercase transition-colors group shrink-0"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>BACK_TO_EVENTS_INDEX</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-slate-400">
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-slate-400 font-medium tracking-wide">
              SPECIMEN // {edition.eventId.toUpperCase()}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[9px] sm:text-[10px] font-pixel tracking-wider uppercase shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              OFFICIAL_IBM_PARTNER_LINK
            </span>
          </div>
        </div>

        {/* ── Header Dossier Section ── */}
        <header className="mb-7 sm:mb-8">
          <div className="flex flex-col gap-3">
            {/* Top Archive Link Notice & IBM Quantum Partner Banner */}
            <div className="mb-4 sm:mb-5 flex flex-col items-center gap-3 w-full">
              <div className="flex flex-wrap items-center justify-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md max-w-full shadow-lg">
                <span className="font-mono text-[11px] sm:text-xs text-slate-300">Fall Fest 2025 Archive — Official IBM Partner Link</span>
                <span className="text-slate-600">·</span>
                <Link to="/events/qiskit-fall-fest-2026" className="font-mono text-[11px] sm:text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                  View Fall Fest 2026 →
                </Link>
              </div>

              {/* IBM Quantum & Qiskit Partner Banner */}
              <div className="relative group inline-flex max-w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-purple-500/15 rounded-2xl blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                <div className="relative inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 py-2 px-3.5 sm:py-3 sm:px-6 rounded-2xl bg-[#0b0818]/80 border border-cyan-500/30 hover:border-cyan-400/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(6,182,212,0.18)] transition-all duration-300 max-w-full">
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <img
                      src="/assets/fallfest/IBM Quantum Logo.png"
                      alt="IBM Quantum"
                      className="h-6 xs:h-7 sm:h-9 w-auto object-contain"
                    />
                    <span className="h-4 sm:h-6 w-px bg-white/20 select-none" aria-hidden="true" />
                    <img
                      src="/assets/fallfest/Badge.png"
                      alt="Qiskit Badge"
                      className="h-6 xs:h-7 sm:h-9 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]"
                    />
                  </div>
                  <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 text-[10px] xs:text-[11px] sm:text-xs font-mono font-medium tracking-wider uppercase text-center max-w-full shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-400 shrink-0" />
                    <span>Official IBM Qiskit Global Partner Event</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category badge & date (Left-aligned, matching EventDetail.jsx) */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded-full border text-[11px] font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border-cyan-500/25">
                Fall Fest 2025
              </span>
              <span className="text-white/20">•</span>
              <span className="text-slate-300 font-medium">November 2025</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">{edition.institution}</span>
            </div>

            {/* Title & Subtitle (Left-aligned, matching EventDetail.jsx) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-1">
              <div>
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight"
                  style={{ textShadow: '0 0 40px rgba(56, 189, 248, 0.4)' }}
                >
                  {edition.title}
                </h1>
                <p className="font-mono text-xs sm:text-sm text-cyan-400 font-semibold uppercase tracking-wider mt-1.5">
                  {edition.subtitle}
                </p>
              </div>
            </div>

            {/* Event Tags (Left-aligned, matching EventDetail.jsx) */}
            {edition.tags && edition.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {edition.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* ── Visual Asset / Specimen Holo-Display (Matching EventDetail.jsx) ── */}
        <div className="mb-8 sm:mb-10 w-full">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_32px_rgba(6,182,212,0.18)] bg-[#040206] flex items-center justify-center max-h-[360px] sm:max-h-[460px] md:max-h-[540px] group">
            <img
              src={edition.bannerImage}
              alt="Qiskit Fall Fest 2025 Illustration"
              className="w-full h-full object-contain sm:object-cover filter contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ── Asymmetric 2-Column Content Dossier (Exact structural match to EventDetail.jsx) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start mb-12">

          {/* ══ Left Column: Mission Control & Event Details (Sticky on desktop) ══ */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="rounded-2xl sm:rounded-3xl bg-[#090d12]/90 border border-white/[0.08] shadow-xl p-5 sm:p-6 backdrop-blur-2xl flex flex-col gap-4">

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Event Details
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  Specs
                </span>
              </div>

              {/* Specifications List */}
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.05]">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Date</span>
                  <span className="text-white font-bold font-mono text-sm sm:text-[15px] leading-snug">
                    November 2025
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.05]">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Format</span>
                  <span className="text-slate-200 font-semibold font-mono text-sm leading-snug">
                    3-Day Guided Workshop + Certification Sprint
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.05]">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Venue</span>
                  <span className="text-slate-200 font-semibold text-xs sm:text-sm leading-snug">
                    {edition.institution}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.05]">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Cloud Platform</span>
                  <span className="text-cyan-300 font-semibold font-mono text-xs leading-snug flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    IBM Quantum Platform &amp; Qiskit SDK
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.05]">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Eligibility</span>
                  <span className="text-slate-200 font-semibold font-mono text-sm leading-snug">
                    Open to Everyone · All Backgrounds
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Certification</span>
                  <span className="text-slate-200 font-semibold font-mono text-sm leading-snug">
                    Official Course Certificate on Assessment
                  </span>
                </div>
              </div>

              {/* Action Center */}
              <div className="pt-2 flex flex-col gap-2.5">
                <div className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-slate-400 uppercase tracking-wider text-center flex flex-col gap-1">
                  <span className="font-bold text-slate-300">COMPLETED_EVENT_ARCHIVE</span>
                  <span className="text-[10px] text-slate-500 lowercase">official ibm partner link maintained</span>
                </div>

                <Link
                  to="/events/qiskit-fall-fest-2026"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.01]"
                >
                  View Fall Fest 2026 →
                </Link>

                <Link
                  to="/events"
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 font-mono text-[11px] text-slate-300 hover:text-white uppercase tracking-wider text-center transition-colors"
                >
                  Browse All Events →
                </Link>
              </div>
            </div>
          </aside>

          {/* ══ Right Column: Program Tracks, Highlights, Briefing ══ */}
          <section className="flex flex-col gap-6 sm:gap-7 min-w-0">

            {/* 1. Program Tracks / Curriculum Stages */}
            <div id="schedule" className="flex flex-col gap-4 scroll-mt-24">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-0.5">
                    CURRICULUM_MATRIX // 4_STAGES
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Program Tracks &amp; Event Timeline
                  </h2>
                </div>
                <span className="font-mono text-[10px] text-slate-400 hidden sm:inline uppercase">
                  IBM_QISKIT_CURRICULUM
                </span>
              </div>

              {/* Timeline Graphic Banner */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] bg-[#090d12]/90 backdrop-blur-2xl p-4 sm:p-6 shadow-xl flex justify-center">
                <img
                  src={edition.timelineImage}
                  alt="Qiskit Fall Fest Timeline"
                  className="max-h-36 sm:max-h-48 md:max-h-56 w-auto object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* 4 Schedule Milestone Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
                {edition.schedule.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-cyan-400/40 shadow-xl transition-all duration-300 flex flex-col justify-between group min-w-0"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider border ${slot.badgeBg}`}>
                          {slot.day}
                        </span>
                      </div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-white leading-snug mb-2.5 tracking-tight break-normal">
                        {slot.title}
                      </h3>
                      <ul className="space-y-2">
                        {slot.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-1.5 sm:gap-2 text-xs text-slate-300 leading-relaxed">
                            <span className="text-cyan-400 shrink-0 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Flagship Highlights Showcase */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#090d12]/90 border border-white/[0.08] shadow-xl backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                    Event Highlights &amp; Flagship Features
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-cyan-400/80 uppercase tracking-wider hidden xs:inline">
                  KEY_PILLARS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {edition.whatToExpect.concat(edition.eventDetails.slice(0, 3)).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/30 transition-colors"
                  >
                    <span className="font-mono text-cyan-400 text-xs shrink-0 mt-0.5">✦</span>
                    <span className="font-body text-xs sm:text-[13px] text-slate-200 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Executive Briefing / Overview */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090d12]/90 border border-white/[0.08] shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 pb-2.5 border-b border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>EXECUTIVE_BRIEFING // OVERVIEW</span>
              </div>

              <div className="flex flex-col gap-4 text-slate-200 font-body text-sm sm:text-base leading-relaxed max-w-[68ch]">
                <p>{edition.leadText}</p>
                {edition.eventDetails.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            </div>

            {/* 4. Photo Gallery */}
            {edition.gallery && edition.gallery.length > 0 && (
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Event Photos
                  </h2>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                    Click to enlarge
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {edition.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 cursor-zoom-in group border border-white/[0.08] hover:border-cyan-500/50 transition-colors"
                      onClick={() => setLightboxImg(idx)}
                    >
                      <img
                        src={img.url}
                        alt={img.caption || `Gallery image ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </section>
        </div>

        {/* ── Speakers & Mentors ── */}
        <section className="mb-14 sm:mb-18 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/[0.08]">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-0.5">
                LEARN_FROM_EXPERTS // WORKSHOPS & KEYNOTES
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Speakers &amp; Mentors
              </h2>
            </div>
            <span className="font-mono text-[10px] text-slate-400 hidden sm:inline uppercase">
              IBM_QUANTUM_LEADERSHIP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {edition.speakers.map((spk, idx) => (
              <div
                key={idx}
                className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-cyan-400/50 backdrop-blur-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 mb-5 rounded-2xl bg-white/[0.04] border border-white/10 p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={spk.image}
                    alt={spk.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 mb-3">
                  {spk.badge}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug">
                  {spk.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-purple-300 font-semibold mb-3">
                  {spk.speaker}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-auto">
                  {spk.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Organizers / Advisory Members ── */}
        <section className="mb-14 sm:mb-18 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/[0.08]">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400 block mb-0.5">
                LEADERSHIP_AND_COORDINATION
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Organizers &amp; Advisory Council
              </h2>
            </div>
            <span className="font-mono text-[10px] text-slate-400 hidden sm:inline uppercase">
              SQC_COMMITTEE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {edition.organizers.map((org, idx) => (
              <div
                key={idx}
                className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-cyan-400/50 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center overflow-hidden min-h-[360px]"
              >
                {/* Portrait */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4 rounded-2xl overflow-hidden border-2 border-white/15 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.6)] bg-slate-900">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover object-top filter grayscale-[10%] group-hover:grayscale-0 transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug tracking-tight">
                  {org.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/35 mb-1.5 shadow-sm block w-fit mx-auto">
                  {org.role}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9.5px] text-purple-300 bg-purple-500/15 border border-purple-500/30 mb-2 font-medium">
                  ✦ {org.advisoryRole}
                </span>
                <p className="font-mono text-[11px] text-slate-400 tracking-wide mt-auto">
                  {org.dept}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Code of Conduct ── */}
        <section className="mb-14 sm:mb-18 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/[0.08]">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400 block mb-0.5">
                COMMUNITY_STANDARDS
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Code of Conduct
              </h2>
            </div>
            <span className="font-mono text-[10px] text-slate-400 hidden sm:inline uppercase">
              INCLUSIVE_POLICY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {edition.codeOfConduct.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-emerald-500/40 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="font-mono text-emerald-400 text-lg font-bold">✦</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Collaborators ── */}
        <section className="mb-14 sm:mb-18 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#090d12]/90 border border-white/[0.08] backdrop-blur-2xl text-center shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/[0.08] text-left">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400 block mb-0.5">
                OFFICIAL_GLOBAL_COLLABORATORS
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Powered by IBM Quantum &amp; Qiskit
              </h2>
            </div>
            <span className="font-mono text-[10px] text-slate-400 hidden sm:inline uppercase">
              GLOBAL_SPONSORS
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {edition.collaborators.map((c, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 w-full sm:w-auto min-w-0 sm:min-w-[260px] shadow-lg"
              >
                <img src={c.logo} alt={c.name} className="h-10 sm:h-12 object-contain filter drop-shadow-md" />
                <div>
                  <p className="font-bold text-white text-base sm:text-lg">{c.name}</p>
                  <p className="font-mono text-xs text-slate-400">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Events Dossier Footer: More in Fall Fest ── */}
        {relatedEvents.length > 0 && (
          <section className="pt-6 border-t border-white/[0.08] mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                More in Fall Fest
              </h3>
              <Link to="/events" className="font-pixel text-[9px] uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedEvents.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/events/${rel.id}`}
                  className="p-4 rounded-xl bg-[#0a0e13]/80 border border-white/[0.06] hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-2 group shadow-md"
                >
                  {rel.coverImage && (
                    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-1 bg-black/40">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                    {rel.dateDisplay || rel.date}
                  </span>
                  <h4 className="font-display font-bold text-white text-sm leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {rel.title}
                  </h4>
                  {rel.excerpt && (
                    <p className="font-body text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

      </article>

      {/* ── Photo Gallery Lightbox Modal ── */}
      {lightboxImg !== null && edition.gallery && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          {/* Lightbox Index Counter */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-slate-300 font-mono text-xs backdrop-blur-md z-20">
            {lightboxImg + 1} / {edition.gallery.length}
          </div>

          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer z-20"
            onClick={() => setLightboxImg(null)}
            aria-label="Close Lightbox"
          >
            ✕
          </button>

          {lightboxImg > 0 && (
            <button
              type="button"
              className="absolute left-2 sm:left-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white text-lg transition-colors cursor-pointer z-20"
              onClick={(e) => { e.stopPropagation(); setLightboxImg(lightboxImg - 1) }}
              aria-label="Previous Image"
            >
              ←
            </button>
          )}
          {lightboxImg < edition.gallery.length - 1 && (
            <button
              type="button"
              className="absolute right-2 sm:right-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white text-lg transition-colors cursor-pointer z-20"
              onClick={(e) => { e.stopPropagation(); setLightboxImg(lightboxImg + 1) }}
              aria-label="Next Image"
            >
              →
            </button>
          )}

          <img
            src={edition.gallery[lightboxImg].url}
            alt={edition.gallery[lightboxImg].caption || 'Enlarged view'}
            className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Vertical marquee keyframes injected inline for portability */}
      <style>{`
        @keyframes marqueeUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marqueeDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
