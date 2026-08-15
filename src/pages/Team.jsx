import { useEffect, useState, useRef } from 'react'
import teamData from '../data/team.json'

const LinkedinIcon = ({ className, 'aria-hidden': ariaHidden, stroke, strokeWidth, fill }) => (
  <svg className={className} viewBox="0 0 24 24" fill={fill || 'currentColor'} stroke={stroke} strokeWidth={strokeWidth} aria-hidden={ariaHidden}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

/* Helper to format and validate LinkedIn URLs with dynamic search fallback */
const getLinkedinUrl = (url, name) => {
  if (url && typeof url === 'string') {
    const trimmed = url.trim()
    if (trimmed && trimmed !== '#' && trimmed !== 'https://' && trimmed !== 'http://') {
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
      return `https://${trimmed}`
    }
  }
  return name ? `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(name + ' Symbiosis Quantum Club')}` : 'https://www.linkedin.com'
}

/* 5 Group Signature LinkedIn Watermark Styles (Perfectly Balanced Hover & Default Visibility) */
function GroupLinkedinWatermark({ group = 'core', index = 0 }) {
  switch (group) {
    case 'faculty':
      // Style 1 (Faculty): Extra-Zoomed Top-Right Brown Golden Watermark (Anticlockwise rotation & Gradient Fade)
      return (
        <div
          className="absolute -right-12 sm:-right-14 -top-12 sm:-top-14 w-64 sm:w-72 h-64 sm:h-72 pointer-events-none transition-all duration-600 ease-out z-0 -rotate-12 group-hover:-rotate-[16deg] group-hover:scale-105"
          style={{
            maskImage: 'linear-gradient(to bottom left, black 35%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to bottom left, black 35%, transparent 95%)'
          }}
          aria-hidden="true"
        >
          {/* Ambient Warm Golden/Bronze Glow Orb on hover */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-600/20 via-yellow-700/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Brown Golden Emblem */}
          <LinkedinIcon className="w-full h-full text-amber-600/[0.08] group-hover:text-amber-400/35 group-hover:drop-shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all duration-500" />
        </div>
      )

    case 'advisors':
      // Style 2 (Advisors): Zoomed in, positioned in corner with subtle gradient fade
      return (
        <div
          className="absolute -right-6 sm:-right-8 -bottom-9 sm:-bottom-11 w-38 sm:w-44 h-38 sm:h-44 pointer-events-none transition-all duration-500 ease-out z-0 group-hover:scale-105 group-hover:-translate-x-1"
          style={{
            maskImage: 'linear-gradient(to top left, black 35%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to top left, black 35%, transparent 95%)'
          }}
          aria-hidden="true"
        >
          <LinkedinIcon className="w-full h-full text-white/[0.04] group-hover:text-[#0a66c2]/25 transition-colors duration-500" />
        </div>
      )

    case 'core':
      // Style 3 (Core Officers): Zoomed Clockwise twist with Gradient Fade -> Silverish White Grey Shine on hover
      return (
        <div
          className="absolute -right-10 sm:-right-12 -bottom-12 sm:-bottom-14 w-52 sm:w-60 h-52 sm:h-60 pointer-events-none transition-all duration-700 ease-out z-0 rotate-12 group-hover:scale-108 group-hover:rotate-[15deg]"
          style={{
            maskImage: 'linear-gradient(to top left, black 35%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to top left, black 35%, transparent 95%)'
          }}
          aria-hidden="true"
        >
          {/* Ambient Silver / White-Grey Glow Orb */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-200/20 via-slate-400/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Subtle text-white/[0.04] default -> Silverish White Grey shine on hover */}
          <LinkedinIcon className="w-full h-full text-white/[0.04] group-hover:text-slate-200/40 group-hover:drop-shadow-[0_0_22px_rgba(241,245,249,0.45)] transition-all duration-500" />
        </div>
      )

    case 'heads':
      // Style 4 (Department Heads): Soft Indigo Circuit Glow (Pushed right & 50% toned shine)
      return (
        <div
          className="absolute -right-8 sm:-right-10 top-1/2 -translate-y-1/2 w-36 sm:w-44 h-36 sm:h-44 pointer-events-none transition-all duration-700 ease-out z-0 group-hover:-translate-x-1.5 group-hover:scale-105"
          style={{
            maskImage: 'linear-gradient(to left, black 40%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 95%)'
          }}
          aria-hidden="true"
        >
          {/* Ambient Indigo/Violet Glow Orb (50% softer) */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Soft Shining Emblem on hover (50% toned down) */}
          <LinkedinIcon className="w-full h-full text-indigo-400/[0.08] group-hover:text-indigo-300/25 group-hover:drop-shadow-[0_0_12px_rgba(129,140,248,0.3)] transition-all duration-500" />
        </div>
      )

    case 'coheads':
    default:
      // Style 5 (Department Co-Heads): Zoomed & Gradient Faded Emerald Quantum Glow Emblem
      return (
        <div
          className="absolute -right-7 sm:-right-9 -bottom-8 sm:-bottom-10 w-40 sm:w-48 h-40 sm:h-48 pointer-events-none transition-all duration-600 ease-out z-0 -rotate-12 group-hover:-rotate-[16deg] group-hover:scale-108"
          style={{
            maskImage: 'linear-gradient(to top left, black 35%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to top left, black 35%, transparent 95%)'
          }}
          aria-hidden="true"
        >
          {/* Ambient Emerald Glow Orb on hover */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Emerald Quantum Watermark Emblem */}
          <LinkedinIcon className="w-full h-full text-white/[0.04] group-hover:text-emerald-300/35 group-hover:drop-shadow-[0_0_16px_rgba(52,211,153,0.35)] transition-all duration-500" />
        </div>
      )
  }
}

/* 4 Completely independent, geometrically unique float trajectories for each metric node */
function getOrganicFloatPosition(index, t) {
  switch (index) {
    case 0:
      // Node 0: Horizontal Figure-8 (Infinity Loop)
      return {
        x: Math.sin(t * 0.00032 + 0.5) * 44,
        y: Math.sin(t * 0.00064 + 0.5) * 22,
        rotate: Math.cos(t * 0.00024) * 3
      }
    case 1:
      // Node 1: Tilted Ascending Elliptical Orbit
      return {
        x: Math.cos(t * 0.00026 + 2.1) * 38 - Math.sin(t * 0.00015) * 12,
        y: Math.sin(t * 0.00026 + 2.1) * 42 + Math.cos(t * 0.00015) * 10,
        rotate: Math.sin(t * 0.00032 + 1.2) * -3.5
      }
    case 2:
      // Node 2: Vertical Tidal Wave
      return {
        x: Math.sin(t * 0.00018 + 4.2) * 18,
        y: Math.sin(t * 0.00035 + 1.1) * 46 + Math.cos(t * 0.00014) * 12,
        rotate: Math.cos(t * 0.00021 + 3.0) * 2.8
      }
    default:
      // Node 3: 3:2 Lissajous Harmonic Curve
      return {
        x: Math.sin(t * 0.0003 + 3.5) * 40,
        y: Math.cos(t * 0.0002 + 0.8) * 36,
        rotate: Math.sin(t * 0.00028 + 2.4) * 3.5
      }
  }
}

/* Interactive Floating Card that moves continuously in an independent trajectory and smoothly repels from mouse cursor without jitter */
function EvasiveCard({ number, label, badge, index = 0 }) {
  const containerRef = useRef(null)
  const [transform, setTransform] = useState({ x: 0, y: 0, rotate: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Smooth rAF loop for idle organic floating
  useEffect(() => {
    let animId
    const loop = () => {
      if (!isHovered) {
        const time = Date.now()
        const pos = getOrganicFloatPosition(index, time)
        setTransform(pos)
      }
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [isHovered, index])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    setIsHovered(true)
    const rect = containerRef.current.getBoundingClientRect()
    const containerCenterX = rect.left + rect.width / 2
    const containerCenterY = rect.top + rect.height / 2

    // Vector from cursor to static container center (eliminates jitter completely)
    const dx = e.clientX - containerCenterX
    const dy = e.clientY - containerCenterY
    const dist = Math.hypot(dx, dy) || 1

    // Repulsion force with wider displacement
    const maxRepel = 60
    const triggerRadius = rect.width * 1.3
    const force = Math.max(0, (1 - dist / triggerRadius)) * maxRepel

    const shiftX = -(dx / dist) * force
    const shiftY = -(dy / dist) * force
    const rotate = -(dx / rect.width) * 12

    setTransform({ x: shiftX, y: shiftY, rotate })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-1"
    >
      <div
        style={{
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) rotate(${transform.rotate}deg)`,
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.8s ease-out'
        }}
        className="group relative p-3 bg-transparent border-0 shadow-none cursor-pointer select-none"
      >
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[75px]">
          <div>
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-none drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              {number}
            </span>
            <span className="block font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-1.5 drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              {label}
            </span>
          </div>
          {badge && (
            <span className="block font-mono text-[10px] text-gray-400/90 tracking-wide mt-1.5">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  useEffect(() => {
    document.title = 'Our Team — Symbiosis Quantum Club'
  }, [])

  return (
    <main className="min-h-screen bg-[#050507] text-white selection:bg-cyan-500/30" id="main-content">

      {/* ── Team Hero (Elevated Header Section) ── */}
      <section className="relative flex flex-col justify-start pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#050507] text-white">
        {/* Background Visual Layer: Quantum Circuit SVG & Radial Ambient Light */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full object-cover opacity-25" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {/* Horizontal Grid lines */}
            {[...Array(7)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={120 + i * 110}
                x2="1440"
                y2={120 + i * 110}
                stroke="#06b6d4"
                strokeWidth="0.5"
                opacity="0.2"
              />
            ))}
            {/* Circuit Nodes */}
            {[
              [240, 120], [480, 230], [720, 340], [960, 450], [1200, 560],
              [360, 230], [600, 120], [840, 450], [1080, 230], [1320, 340],
              [180, 340], [540, 450], [900, 120], [1140, 560], [420, 560],
            ].map(([cx, cy], i) => (
              <g key={`node-${i}`} className="animate-pulse" style={{ animationDuration: `${2.5 + i * 0.2}s` }}>
                <circle cx={cx} cy={cy} r="5" fill={i % 2 === 0 ? "#06b6d4" : "#38bdf8"} opacity="0.8" />
                <circle cx={cx} cy={cy} r="16" fill="none" stroke={i % 2 === 0 ? "#38bdf8" : "#22d3ee"} strokeWidth="0.5" opacity="0.35" />
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
                stroke={i % 2 === 0 ? "#00f0ff" : "#06b6d4"}
                strokeWidth="0.8"
                opacity="0.3"
              />
            ))}
          </svg>

          {/* Cyan Ambient Glow Orb */}
          <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-cyan-500/15 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/40 via-[#050507]/80 to-[#050507]" />
        </div>

        {/* Hero Content — 2 Column Layout (Left Text, Right Floating Evasive Cards Grid) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Column: Header Lockup, Title, Description, Quick-Jump Pills */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Header Lockup: Divider + Monospace Eyebrow */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_#06b6d4]" />
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase">
                  SYMBIOSIS QUANTUM CLUB ✦ TEAM DIRECTORY 2026
                </span>
              </div>

              {/* Title Row Lockup */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
                <span className="block">Architecting The</span>
                <span className="block">
                  Future Of{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.35)]">
                    Quantum Leadership
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p className="font-body text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed mb-8">
                Meet the faculty mentors, advisors, core officers, and department heads driving research, events, technical development, and community building at Symbiosis Quantum Club.
              </p>

              {/* Quick-Jump Section Anchors */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="#faculty"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-display font-semibold text-xs sm:text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  <span>FACULTY ADVISOR</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#advisors"
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs sm:text-sm transition-all duration-200"
                >
                  ADVISORY COUNCIL
                </a>
                <a
                  href="#core"
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs sm:text-sm transition-all duration-200"
                >
                  EXECUTIVE BOARD
                </a>
                <a
                  href="#heads"
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs sm:text-sm transition-all duration-200"
                >
                  DEPT HEADS
                </a>
                <a
                  href="#coheads"
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs sm:text-sm transition-all duration-200"
                >
                  CO-LEADERSHIP
                </a>
              </div>
            </div>

            {/* Right Column: Floating Evasive Metric Cards Grid */}
            <div className="lg:col-span-5 relative w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                <EvasiveCard
                  index={0}
                  number="15+"
                  label="Active Team Members"
                  badge="Symbiosis Quantum Club"
                />
                <EvasiveCard
                  index={1}
                  number="5"
                  label="Specialized Depts"
                  badge="R&T, Events, Web, Media, Advisory"
                />
                <EvasiveCard
                  index={2}
                  number="IBM Qiskit"
                  label="Fall Fest Partner"
                  badge="Global Partner Event"
                />
                <EvasiveCard
                  index={3}
                  number="SIT Pune"
                  label="Quantum Campus Hub"
                  badge="University Integration"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Progressive Blur Layer at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none z-20" aria-hidden="true" />
      </section>

      {/* 1. Faculty Coordinator (Style 1: Balanced background shade watermark) */}
      <section id="faculty" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b]" aria-labelledby="faculty-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <span className="block font-mono text-xs uppercase tracking-[0.15em] text-cyan-400 mb-2 font-medium">FACULTY MENTOR</span>
            <h2 id="faculty-heading" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">Faculty Coordinator</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
            {teamData.faculty.map((member, idx) => {
              const linkedinUrl = getLinkedinUrl(member.linkedin, member.name)
              return (
                <div key={member.name} className="group relative flex flex-col sm:flex-row bg-[#121215] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15),0_12px_25px_rgba(0,0,0,0.4)] min-h-[280px]">
                  
                  {/* Expanded, Prominent Photo Container */}
                  <div className="relative w-full sm:w-80 md:w-96 sm:shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden bg-[#050507]">
                    {member.image ? (
                      <img
                        src={encodeURI(member.image)}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(255,255,255,0.02)_12px,rgba(255,255,255,0.02)_24px)] text-gray-500 font-mono text-xs">
                        Photo Pending
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#121215] via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                  </div>

                  {/* Refined, Balanced Text Container */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="block font-mono text-xs uppercase tracking-[0.12em] text-cyan-400 mb-1.5 font-medium">{member.role}</span>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-2">
                          {member.name}
                        </a>
                      </h3>
                      <p className="font-body text-sm text-gray-300 leading-relaxed">{member.bio}</p>
                    </div>

                    {/* Group Style 1: Faculty Coordinator Signature Watermark */}
                    <GroupLinkedinWatermark group="faculty" index={idx} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 2. Advisors (Style 2: Balanced background shade watermark) */}
      <section id="advisors" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#050507]" aria-labelledby="advisors-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <span className="block font-mono text-xs uppercase tracking-[0.15em] text-cyan-400 mb-2 font-medium">ADVISORY COUNCIL</span>
            <h2 id="advisors-heading" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">Advisors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamData.advisors.map((advisor, idx) => {
              const linkedinUrl = getLinkedinUrl(advisor.linkedin, advisor.name)
              return (
                <div key={advisor.name} className="group relative flex flex-col bg-[#121215] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(6,182,212,0.15)]">
                  
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#050507]">
                    {advisor.image ? (
                      <img
                        src={encodeURI(advisor.image)}
                        alt={advisor.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top filter grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(255,255,255,0.02)_12px,rgba(255,255,255,0.02)_24px)] text-gray-500 font-mono text-xs">
                        Photo Pending
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="block font-mono text-xs uppercase tracking-wider text-cyan-400/90 mb-1 font-medium">{advisor.role}</span>
                      <h3 className="font-display text-base sm:text-lg font-semibold text-white tracking-tight">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                          {advisor.name}
                        </a>
                      </h3>
                    </div>

                    {/* Group Style 2: Advisors Signature Watermark */}
                    <GroupLinkedinWatermark group="advisors" index={idx} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Executive Board / Core Leadership (Style 3: Balanced Cyan Glow Emblem on hover) */}
      <section id="core" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b]" aria-labelledby="core-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <span className="block font-mono text-xs uppercase tracking-[0.15em] text-cyan-400 mb-2 font-medium">EXECUTIVE BOARD</span>
            <h2 id="core-heading" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">Core Leadership</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {teamData.core.map((member, idx) => {
              const linkedinUrl = getLinkedinUrl(member.linkedin, member.name)
              return (
                <div key={member.name} className="group relative flex flex-col bg-[#121215] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15),0_12px_25px_rgba(0,0,0,0.4)]">
                  
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#050507]">
                    {member.image ? (
                      <img
                        src={encodeURI(member.image)}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(255,255,255,0.02)_12px,rgba(255,255,255,0.02)_24px)] text-gray-500 font-mono text-xs">
                        Photo Pending
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="block font-mono text-xs uppercase tracking-[0.12em] text-cyan-400 mb-1.5 font-medium">{member.role}</span>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight mb-2">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                          {member.name}
                        </a>
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-gray-400 leading-relaxed">{member.bio}</p>
                    </div>

                    {/* Group Style 3: Core Officers Signature Watermark */}
                    <GroupLinkedinWatermark group="core" index={idx} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Department Heads (Style 4: Balanced Duotone Indigo Silhouette) */}
      <section id="heads" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#050507]" aria-labelledby="heads-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="block font-mono text-xs uppercase tracking-[0.15em] text-cyan-400 mb-2 font-medium">DEPARTMENT LEADERSHIP</span>
            <h2 id="heads-heading" className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">Department Heads</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.heads.map((head, idx) => {
              const linkedinUrl = getLinkedinUrl(head.linkedin, head.name)
              return (
                <div key={head.name} className="group relative flex flex-col bg-[#121215] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(6,182,212,0.15)]">
                  
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#050507]">
                    {head.image ? (
                      <img
                        src={encodeURI(head.image)}
                        alt={head.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top filter grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(255,255,255,0.02)_12px,rgba(255,255,255,0.02)_24px)] text-gray-500 font-mono text-xs">
                        Photo Pending
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="block font-mono text-xs uppercase tracking-wider text-cyan-400/90 mb-1 font-medium">{head.department}</span>
                      <h3 className="font-display text-lg font-semibold text-white tracking-tight mb-1">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                          {head.name}
                        </a>
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-gray-400">{head.role}</p>
                    </div>

                    {/* Group Style 4: Department Heads Signature Watermark */}
                    <GroupLinkedinWatermark group="heads" index={idx} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Department Co-Heads (Style 5: Balanced Quantum Lattice Corner Badge) */}
      <section id="coheads" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#09090b]" aria-labelledby="coheads-heading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="block font-mono text-xs uppercase tracking-[0.15em] text-cyan-400 mb-2 font-medium">CO-LEADERSHIP</span>
            <h2 id="coheads-heading" className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">Department Co-Heads</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamData.coheads.map((cohead, idx) => {
              const linkedinUrl = getLinkedinUrl(cohead.linkedin, cohead.name)
              return (
                <div key={cohead.name} className="group relative flex flex-col bg-[#121215] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(6,182,212,0.15)]">
                  
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#050507]">
                    {cohead.image ? (
                      <img
                        src={encodeURI(cohead.image)}
                        alt={cohead.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top filter grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(255,255,255,0.02)_12px,rgba(255,255,255,0.02)_24px)] text-gray-500 font-mono text-xs gap-2">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Photo Pending</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="block font-mono text-xs uppercase tracking-wider text-cyan-400/90 mb-1 font-medium">{cohead.department}</span>
                      <h3 className="font-display text-lg font-semibold text-white tracking-tight mb-1">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                          {cohead.name}
                        </a>
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-gray-400">{cohead.role}</p>
                    </div>

                    {/* Group Style 5: Department Co-Heads Signature Watermark */}
                    <GroupLinkedinWatermark group="coheads" index={idx} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#050507] text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.15em] text-cyan-400 mb-3 font-medium">Recruitment</span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">Want to join the team?</h2>
          <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
            We recruit new members at the start of every academic year. If you're passionate
            about quantum computing and want to help build the community at SIT, we'd love
            to hear from you.
          </p>
          <a
            href="https://www.instagram.com/quantumclub.sit/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-display font-semibold text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(6,182,212,0.4)] active:translate-y-0"
          >
            Follow for updates &rarr;
          </a>
        </div>
      </section>
    </main>
  )
}
