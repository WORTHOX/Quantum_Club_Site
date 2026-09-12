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

// Vertical marquee: renders a scrolling column of stickers
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
            className="w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 shrink-0 p-3 lg:p-3.5 xl:p-4 rounded-2xl bg-white/[0.12] border border-white/[0.22] hover:border-[#FF7EB6]/80 hover:bg-white/[0.20] shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_24px_rgba(255,126,182,0.3)] hover:shadow-[0_8px_38px_rgba(0,0,0,0.7),0_0_36px_rgba(255,126,182,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-108 pointer-events-auto cursor-pointer flex items-center justify-center"
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
    <main className="bg-[#060409] min-h-dvh text-slate-200 overflow-x-clip">
      {/* ── Vertical marquee columns flanking the page content (Full viewport height & restored large width) ── */}
      <div className="fixed inset-y-0 left-1 xl:left-3 2xl:left-6 w-20 sm:w-24 lg:w-28 xl:w-32 2xl:w-36 h-screen z-0 pointer-events-none hidden lg:flex flex-col items-center overflow-hidden py-4">
        <VerticalMarquee stickers={STICKERS} direction="up" speed={45} />
      </div>
      <div className="fixed inset-y-0 right-1 xl:right-3 2xl:right-6 w-20 sm:w-24 lg:w-28 xl:w-32 2xl:w-36 h-screen z-0 pointer-events-none hidden lg:flex flex-col items-center overflow-hidden py-4">
        <VerticalMarquee stickers={[...STICKERS].reverse()} direction="down" speed={38} />
      </div>

      {/* ── Ambient background stickers (scattered, fixed, purely decorative, hidden on mobile) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block" aria-hidden="true">
        <img src={STICKERS[0]} alt="" className="absolute top-24 left-24 w-24 h-24 opacity-[0.16] rotate-[-15deg] filter drop-shadow-[0_0_24px_rgba(255,126,182,0.35)]" />
        <img src={STICKERS[5]} alt="" className="absolute top-56 left-12 w-16 h-16 opacity-[0.14] rotate-[20deg] filter drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]" />
        <img src={STICKERS[2]} alt="" className="absolute top-28 right-24 w-22 h-22 opacity-[0.16] rotate-[12deg] filter drop-shadow-[0_0_24px_rgba(167,139,250,0.35)]" />
        <img src={STICKERS[8]} alt="" className="absolute top-64 right-12 w-16 h-16 opacity-[0.14] rotate-[-8deg] filter drop-shadow-[0_0_20px_rgba(255,126,182,0.3)]" />
        <img src={STICKERS[4]} alt="" className="absolute top-[46%] left-16 w-18 h-18 opacity-[0.14] rotate-[6deg] filter drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]" />
        <img src={STICKERS[6]} alt="" className="absolute top-[42%] right-16 w-18 h-18 opacity-[0.14] rotate-[-10deg] filter drop-shadow-[0_0_20px_rgba(167,139,250,0.3)]" />
        <img src={STICKERS[3]} alt="" className="absolute bottom-40 left-28 w-18 h-18 opacity-[0.16] rotate-[16deg] filter drop-shadow-[0_0_24px_rgba(56,189,248,0.35)]" />
        <img src={STICKERS[9]} alt="" className="absolute bottom-28 right-28 w-22 h-22 opacity-[0.16] rotate-[-12deg] filter drop-shadow-[0_0_28px_rgba(255,126,182,0.35)]" />
        <img src={STICKERS[7]} alt="" className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-16 opacity-[0.12] rotate-[4deg]" />
      </div>

      {/* ── Main content: Expanded width with ample clearance for large marquees ── */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-28 xl:px-36 2xl:px-44 w-full max-w-[1400px] mx-auto">

        {/* ── Hero ── */}
        <section className="relative pt-[calc(5rem+1.5rem)] pb-16 px-1 sm:px-2 overflow-hidden">
          {/* Radial glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full opacity-18 pointer-events-none blur-3xl"
            style={{ background: `radial-gradient(ellipse, ${edition.gradientFrom} 0%, ${edition.gradientTo} 60%, transparent 100%)` }}
          />

          <div className="relative flex flex-col items-center text-center gap-6 z-10">

            {/* Archive link notice */}
            <div className="flex flex-wrap items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md max-w-full">
              <span className="font-mono text-xs text-slate-300">Fall Fest 2025 Archive — Official IBM Partner Link</span>
              <span className="text-slate-600">·</span>
              <Link to="/events/qiskit-fall-fest-2026" className="font-mono text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                View Fall Fest 2026 →
              </Link>
            </div>

            {/* IBM Quantum & Qiskit partner badge bar */}
            <div className="relative group inline-flex max-w-full">
              {/* Very subtle, light ambient blue hint */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

              <div className="relative inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2.5 px-4 sm:py-3.5 sm:px-8 rounded-2xl bg-white/[0.05] border border-white/[0.14] hover:border-cyan-400/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300 max-w-full">
                <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                  <img
                    src="/assets/fallfest/IBM Quantum Logo.png"
                    alt="IBM Quantum"
                    className="h-7 sm:h-9 md:h-10 w-auto object-contain"
                  />
                  <span className="h-5 sm:h-7 w-px bg-white/20 select-none" aria-hidden="true" />
                  <img
                    src="/assets/fallfest/Badge.png"
                    alt="Qiskit Badge"
                    className="h-7 sm:h-9 md:h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,126,182,0.25)]"
                  />
                </div>
                <div
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-[10.5px] xs:text-xs sm:text-sm font-mono font-medium tracking-wider uppercase text-center max-w-full"
                >
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full animate-pulse bg-cyan-400 shrink-0" />
                  <span>{edition.tagline}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-2xl xs:text-3xl sm:text-6xl md:text-7xl font-extrabold font-display uppercase tracking-tight text-white leading-tight m-0"
              style={{ textShadow: `0 0 50px ${edition.accentColor}40` }}
            >
              {edition.title}
            </h1>

            {/* Subtitle / Institution */}
            <div className="flex flex-col items-center gap-1.5 max-w-3xl">
              <p className="font-mono text-base sm:text-lg font-bold uppercase tracking-[0.16em] text-cyan-300">
                {edition.institution}
              </p>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-purple-300">
                Theme: {edition.theme}
              </p>
            </div>

            {/* Large Banner Illustration (Wider and prominent) */}
            <div className="w-full max-w-4xl xl:max-w-5xl my-4 rounded-3xl overflow-hidden border border-white/15 bg-black/50 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl group">
              <img
                src={edition.bannerImage}
                alt="Qiskit Fall Fest 2025 Illustration"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>

            {/* 3 Key Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl">
              {edition.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wide border bg-white/[0.05] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 shadow-sm"
                  style={{
                    borderColor: idx === 0 ? '#40c0cb60' : idx === 1 ? '#8b5cf660' : '#34d39960',
                    color: idx === 0 ? '#40c0cb' : idx === 1 ? '#a78bfa' : '#34d399',
                  }}
                >
                  ✦ {tag}
                </span>
              ))}
            </div>

            {/* Lead text */}
            <p className="max-w-3xl text-base sm:text-xl text-slate-300 leading-relaxed font-body">
              {edition.leadText}
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <a
                href="#schedule"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${edition.gradientFrom}, ${edition.gradientTo})`,
                  boxShadow: `0 0 32px ${edition.accentColor}45`,
                }}
              >
                View Schedule ↓
              </a>
              <Link
                to="/events?category=fall-fest"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border text-slate-200 hover:text-white transition-all duration-300 bg-white/5 border-white/15 hover:bg-white/10"
              >
                All Fall Fest Editions
              </Link>
            </div>

          </div>
        </section>

        {/* ── Event Details & What to Expect (Expanded 2-column cards) ── */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Event Details Card */}
            <div className="p-5 xs:p-6 sm:p-10 xl:p-12 rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-cyan-400/40 backdrop-blur-2xl shadow-xl flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-5">
                  <span>✦</span> Event Details
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight">
                  Immersive 3-Day Quantum Experience
                </h3>
                <ul className="space-y-4 sm:space-y-5">
                  {edition.eventDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-slate-200 text-base sm:text-lg leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to Expect Card */}
            <div className="p-5 xs:p-6 sm:p-10 xl:p-12 rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-purple-400/40 backdrop-blur-2xl shadow-xl flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 font-mono text-xs uppercase tracking-wider mb-5">
                  <span>✦</span> What to Expect
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight">
                  Intuition First, Math Overhead Second
                </h3>
                <ul className="space-y-4 sm:space-y-5">
                  {edition.whatToExpect.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-slate-200 text-base sm:text-lg leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Schedule & Curriculum (Expanded 4 milestone cards) ── */}
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

          {/* Timeline Graphic Banner */}
          <div className="mb-10 rounded-3xl overflow-hidden border border-white/[0.08] bg-[#090d12]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-xl flex justify-center">
            <img
              src={edition.timelineImage}
              alt="Qiskit Fall Fest Timeline"
              className="max-h-36 sm:max-h-48 md:max-h-56 w-auto object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* 4 Schedule Milestone Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {edition.schedule.map((slot, idx) => (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-cyan-400/40 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 shadow-xl flex flex-col justify-between min-h-[280px]"
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
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-200 leading-relaxed">
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

        {/* ── Speakers & Mentors (Enlarged showcase cards) ── */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-purple-400 block mb-2">
              Learn from Experts
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Speakers & Mentors
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-base sm:text-lg">
              Featuring IBM Quantum leadership and student-led hands-on programming workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {edition.speakers.map((spk, idx) => (
              <div
                key={idx}
                className="group p-8 sm:p-10 rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-cyan-400/50 backdrop-blur-2xl shadow-xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-36 h-36 sm:w-44 sm:h-44 mb-6 rounded-3xl bg-white/[0.04] border border-white/12 p-3 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={spk.image}
                    alt={spk.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <span className="px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 mb-4">
                  {spk.badge}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                  {spk.title}
                </h3>
                <p className="font-mono text-sm sm:text-base text-purple-300 font-semibold mb-4">
                  {spk.speaker}
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-auto">
                  {spk.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Organizers / Advisory Members (Large prominent cards with new high-res advisory images) ── */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-7">
            {edition.organizers.map((org, idx) => (
              <div
                key={idx}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-cyan-400/50 backdrop-blur-2xl shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden min-h-[380px]"
              >
                {/* Large high-res Portrait */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 xl:w-44 xl:h-44 mb-5 rounded-2xl overflow-hidden border-2 border-white/15 group-hover:border-cyan-400 transition-all duration-500 shadow-[0_10px_25px_rgba(0,0,0,0.6)] bg-slate-900">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover object-top filter grayscale-[10%] group-hover:grayscale-0 transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-display text-base sm:text-lg xl:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug tracking-tight">
                  {org.name}
                </h3>
                <span className="px-3 py-1 rounded-full font-mono text-xs font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/35 mb-2 shadow-sm block w-fit mx-auto">
                  {org.role}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] text-purple-300 bg-purple-500/15 border border-purple-500/30 mb-2 font-medium">
                  ✦ {org.advisoryRole}
                </span>
                <p className="font-mono text-xs text-slate-400 tracking-wide mt-auto">
                  {org.dept}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Code of Conduct (Expanded 2-column cards) ── */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {edition.codeOfConduct.map((item, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-[#090d12]/90 border border-white/[0.08] hover:border-emerald-500/40 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:-translate-y-1"
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

        {/* ── Collaborators (Expanded showcase) ── */}
        <section className="mb-20 p-6 sm:p-10 xl:p-14 rounded-3xl bg-[#090d12]/90 border border-white/[0.08] backdrop-blur-2xl text-center shadow-xl">
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
                className="flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.05] border border-white/15 hover:border-cyan-400/50 transition-all duration-300 w-full sm:w-auto min-w-0 sm:min-w-[280px] shadow-lg"
              >
                <img src={c.logo} alt={c.name} className="h-12 sm:h-16 object-contain filter drop-shadow-md" />
                <div>
                  <p className="font-bold text-white text-lg sm:text-xl">{c.name}</p>
                  <p className="font-mono text-xs sm:text-sm text-slate-400">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <section className="max-w-5xl mx-auto mb-16 pt-10 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-1">Organized by</p>
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
              <Link to="/events/qiskit-fall-fest-2026" className="font-mono text-xs sm:text-sm uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                Qiskit Fall Fest 2026 →
              </Link>
            </div>
          </div>
        </section>

      </div>

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
