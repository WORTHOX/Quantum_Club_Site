import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import events, { CATEGORY_COLORS } from '../data/events'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [activeSticker, setActiveSticker] = useState(null)

  useEffect(() => {
    if (id === 'qiskit-fall-fest-2025') {
      navigate('/fallfest', { replace: true })
      return
    }
    const found = events.find(e => e.id === id)
    if (found) {
      setEvent(found)
      document.title = `${found.title} — Symbiosis Quantum Club Events`
      window.scrollTo(0, 0)
    } else {
      setEvent(null)
    }
  }, [id, navigate])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxImg !== null) setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImg])

  if (event === null) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-[#070a08] p-6 text-center">
        <div className="max-w-md flex flex-col items-center gap-4">
          <span className="font-pixel text-6xl font-bold text-slate-700">404</span>
          <h1 className="text-2xl font-bold font-display text-white">Event Specimen Not Found</h1>
          <p className="font-mono text-slate-400 text-xs leading-relaxed">
            The event dossier you are querying does not exist or has been relocated in the quantum index.
          </p>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
          >
            ← Return to Event Index
          </button>
        </div>
      </main>
    )
  }

  const colorScheme = CATEGORY_COLORS[event.category] || {
    bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/25',
  }

  const relatedEvents = events
    .filter(e => e.category === event.category && e.id !== event.id)
    .slice(0, 3)

  const hasGallery = event.gallery && event.gallery.length > 0
  const bannerSource = event.bannerImage || event.coverImage

  return (
    <main className="bg-[#070a08] min-h-dvh pt-[calc(72px+clamp(1.5rem,1rem+2.5vw,3.5rem))] pb-24 text-slate-200 relative overflow-hidden">
      {/* Subtle Quantum Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-cyan-500/[0.04] via-emerald-500/[0.02] to-transparent pointer-events-none blur-3xl -z-10" />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top Navigation & Telemetry Breadcrumb ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 font-pixel text-[10px] tracking-widest text-emerald-400 hover:text-emerald-300 uppercase transition-colors group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>BACK_TO_EVENTS_INDEX</span>
          </Link>

          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-slate-400 font-medium">SPECIMEN // {event.id.toUpperCase()}</span>
            {event.status === 'upcoming' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-pixel tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                ACTIVE_CYCLE
              </span>
            )}
          </div>
        </div>

        {/* ── Header Dossier Section ── */}
        <header className="mb-8">
          <div className="flex flex-col gap-3">
            {/* Category badge & date */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border}`}>
                {event.category}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-slate-300 font-medium">{event.dateDisplay || event.date}</span>
              {event.location && (
                <>
                  <span className="text-white/20 hidden sm:inline">•</span>
                  <span className="text-slate-400 hidden sm:inline">{event.location}</span>
                </>
              )}
            </div>

            {/* Title & Official IBM Partner Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                  {event.title}
                </h1>
                {event.subtitle && (
                  <p className="font-mono text-xs sm:text-sm text-cyan-400 font-semibold uppercase tracking-wider mt-1.5">
                    {event.subtitle}
                  </p>
                )}
              </div>

              {/* Official IBM / Partner Badges */}
              {(event.ibmBadge || event.qiskitLogo) && (
                <div className="flex items-center gap-3 shrink-0 p-2 rounded-2xl bg-[#0d1217]/80 border border-white/[0.08] shadow-lg">
                  {event.ibmBadge && (
                    <div className="w-12 h-12 relative group" title="Official IBM Qiskit Event Seal">
                      <img
                        src={event.ibmBadge}
                        alt="Official IBM Qiskit Badge"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,126,182,0.4)] transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  {event.qiskitLogo && (
                    <div className="w-9 h-9 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center" title="Qiskit SDK Platform">
                      <img src={event.qiskitLogo} alt="Qiskit Logo" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Hero Showcase Chassis (Banner Display) ── */}
        {bannerSource && (
          <div className="mb-10 rounded-2xl overflow-hidden bg-[#0a0e13] border border-white/[0.09] shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
            {/* Chassis Telemetry Bezel Bar */}
            <div className="px-4 py-2 bg-[#06090c] border-b border-white/[0.06] flex items-center justify-between text-slate-400 font-pixel text-[9px] tracking-widest uppercase">
              <span className="flex items-center gap-2 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                OFFICIAL_VISUAL_KIT // SPECIMEN_DISPLAY
              </span>
              <span className="hidden sm:inline text-white/40">
                SYMBIOSIS QUANTUM CLUB • SIT PUNE CHAPTER
              </span>
            </div>

            {/* Banner Frame */}
            <div className="w-full relative bg-[#040608] flex items-center justify-center overflow-hidden group">
              <img
                src={bannerSource}
                alt={event.title}
                className="w-full h-auto max-h-[460px] object-cover sm:object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        )}

        {/* ── Asymmetric 2-Column Content Dossier ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-8 items-start mb-16">

          {/* ══ Left Column: Mission Control & Telemetry HUD (Sticky) ══ */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-5">
            <div className="rounded-2xl bg-[#0b1016]/90 border border-white/[0.08] p-5 shadow-xl backdrop-blur-xl flex flex-col gap-4">

              {/* HUD Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="font-pixel text-[10px] uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  EVENT_SPECIFICATIONS
                </span>
                <span className="font-mono text-[9px] text-slate-500 uppercase">SYS_TELEMETRY</span>
              </div>

              {/* Specifications Matrix */}
              <div className="flex flex-col gap-3 font-mono text-xs">

                {/* Dates */}
                {(event.dates || event.dateDisplay || event.date) && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.04]">
                    <span className="font-pixel text-[9px] text-white/40 uppercase tracking-wider">SCHEDULE_DATE</span>
                    <span className="text-white font-medium">{event.dates || event.dateDisplay || event.date}</span>
                  </div>
                )}

                {/* Timings */}
                {event.timing && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.04]">
                    <span className="font-pixel text-[9px] text-white/40 uppercase tracking-wider">TIME_WINDOW</span>
                    <span className="text-slate-200">{event.timing}</span>
                  </div>
                )}

                {/* Format */}
                {(event.format || event.duration) && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.04]">
                    <span className="font-pixel text-[9px] text-white/40 uppercase tracking-wider">EVENT_FORMAT</span>
                    <span className="text-slate-200">{event.format || event.duration}</span>
                  </div>
                )}

                {/* Venue */}
                {(event.venue || event.location) && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.04]">
                    <span className="font-pixel text-[9px] text-white/40 uppercase tracking-wider">VENUE_COORDINATES</span>
                    <span className="text-slate-300 text-[11px] leading-relaxed">{event.venue || event.location}</span>
                  </div>
                )}

                {/* Team Size */}
                {event.teamSize && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.04]">
                    <span className="font-pixel text-[9px] text-white/40 uppercase tracking-wider">TEAM_STRUCTURE</span>
                    <span className="text-slate-200">{event.teamSize}</span>
                  </div>
                )}

                {/* Hardware Specimen */}
                {event.hardware && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.04]">
                    <span className="font-pixel text-[9px] text-cyan-400 uppercase tracking-wider">QUANTUM_HARDWARE</span>
                    <span className="text-cyan-200 font-semibold">{event.hardware}</span>
                  </div>
                )}

                {/* Cryo Stage */}
                {event.cryoStage && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-white/[0.04]">
                    <span className="font-pixel text-[9px] text-purple-400 uppercase tracking-wider">CRYO_CLUSTER</span>
                    <span className="text-purple-200">{event.cryoStage}</span>
                  </div>
                )}

                {/* Participants */}
                {event.participants && (
                  <div className="flex flex-col gap-0.5">
                    <span className="font-pixel text-[9px] text-white/40 uppercase tracking-wider">COMMUNITY_SCALE</span>
                    <span className="text-slate-200">{event.participants}</span>
                  </div>
                )}
              </div>

              {/* Action Center (Registration / Alert) */}
              <div className="pt-2">
                {event.status === 'upcoming' ? (
                  event.registrationUrl ? (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02]"
                    >
                      Register Now →
                    </a>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-semibold uppercase tracking-wider text-center shadow-lg shadow-amber-500/10">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                      <span>{event.applicationAlert || 'Applications Opening Soon'}</span>
                    </div>
                  )
                ) : (
                  <div className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] font-pixel text-[10px] text-slate-400 uppercase tracking-wider text-center">
                    COMPLETED_EVENT_ARCHIVE
                  </div>
                )}
              </div>

              {/* Tags Cloud */}
              {event.tags && event.tags.length > 0 && (
                <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md font-pixel text-[8px] uppercase tracking-wider bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* ══ Right Column: Executive Briefing, Tracks & Visual Media ══ */}
          <section className="flex flex-col gap-8 min-w-0">

            {/* 1. Executive Briefing / Overview */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#090d12]/80 border border-white/[0.08] backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2 font-pixel text-[10px] uppercase tracking-widest text-cyan-400 mb-4 pb-2.5 border-b border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>EXECUTIVE_BRIEFING // OVERVIEW</span>
              </div>

              <div className="flex flex-col gap-4 text-slate-300 font-body text-sm sm:text-base leading-relaxed max-w-[65ch]">
                {Array.isArray(event.description) ? (
                  event.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : event.description ? (
                  <p>{event.description}</p>
                ) : (
                  <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                    Detailed event dossier in preparation.
                  </p>
                )}
              </div>
            </div>

            {/* 2. Program Tracks / Curriculum Stages (When present, e.g. Fall Fest) */}
            {event.programTracks && event.programTracks.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <div>
                    <span className="font-pixel text-[10px] uppercase tracking-widest text-purple-400 block mb-0.5">
                      CURRICULUM_MATRIX // 3_STAGES
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Program Tracks & Event Timeline
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 hidden sm:inline uppercase">
                    IBM_QISKIT_CURRICULUM
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.programTracks.map((track, idx) => (
                    <div
                      key={track.stage || idx}
                      className="p-5 rounded-2xl bg-[#0b1016]/90 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-pixel text-[9px] uppercase px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold tracking-wider">
                            {track.stage}
                          </span>
                          {track.sticker && (
                            <div className="w-8 h-8 shrink-0 flex items-center justify-center p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                              <img src={track.sticker} alt={track.badge} className="w-full h-full object-contain" />
                            </div>
                          )}
                        </div>

                        <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                          {track.badge}
                        </span>

                        <h3 className="font-display text-base font-bold text-white leading-snug mb-2">
                          {track.title}
                        </h3>

                        <p className="font-body text-xs text-slate-300 leading-relaxed">
                          {track.desc}
                        </p>
                      </div>

                      {track.footnote && (
                        <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-[10px] text-purple-300/80">
                          {track.footnote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Hardware / Cryostat Spotlight (When present) */}
            {(event.cryoStage || event.hardware) && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#090d14] to-[#060a0f] border border-cyan-500/20 shadow-xl flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-black/50 border border-cyan-500/30 p-2 flex items-center justify-center">
                  <img
                    src="/assets/fallfest/2026/svg/sticker_06.svg"
                    alt="Transmon Cryogenic Cavity"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2 font-pixel text-[9px] uppercase tracking-widest text-cyan-400 mb-1">
                    <span>HARDWARE_ARCHITECTURE // CLOUD_ACCESS</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    {event.hardware || 'IBM Quantum Cloud Hardware Access'}
                  </h3>
                  <p className="font-body text-xs text-slate-300 mt-1 leading-relaxed">
                    Participants gain direct access to simulate and execute quantum circuits on superconducting quantum hardware cooled to millikelvin dilution stages.
                  </p>
                </div>
              </div>
            )}

            {/* 4. Official Collectibles & Swag Grid (For Fall Fest 2026) */}
            {event.id === 'qiskit-fall-fest-2026' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-white/[0.08]">
                  <div>
                    <span className="font-pixel text-[10px] uppercase tracking-widest text-[#FF7EB6] block mb-0.5">
                      ✦ OFFICIAL_DELIVERABLES // 10_SPECIMENS
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      IBM Qiskit Fall Fest Digital Collectibles
                    </h2>
                  </div>
                  <p className="font-mono text-[10px] text-slate-400">
                    Click any sticker to view lore & full vector resolution
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    { name: 'Entanglement', file: '/assets/fallfest/2026/svg/sticker_01.svg', lore: 'Bell State |Φ⁺⟩' },
                    { name: 'Superposition', file: '/assets/fallfest/2026/svg/sticker_02.svg', lore: 'Coherent State Bloom' },
                    { name: 'Circuit Matrix', file: '/assets/fallfest/2026/svg/sticker_03.svg', lore: 'Gate Routing Array' },
                    { name: 'Phase Crystal', file: '/assets/fallfest/2026/svg/sticker_04.svg', lore: 'Parametric Rotation' },
                    { name: 'Wavepacket', file: '/assets/fallfest/2026/svg/sticker_05.svg', lore: 'Tunneling Barrier' },
                    { name: 'Transmon Loop', file: '/assets/fallfest/2026/svg/sticker_06.svg', lore: 'Cryogenic Cavity' },
                    { name: 'Interference', file: '/assets/fallfest/2026/svg/sticker_07.svg', lore: 'Wave Lattice' },
                    { name: 'Pulse Control', file: '/assets/fallfest/2026/svg/sticker_08.svg', lore: 'DRAG Microwave Envelope' },
                    { name: 'Transition', file: '/assets/fallfest/2026/svg/sticker_09.svg', lore: 'Ground to Excited State' },
                    { name: '2026 Seal', file: '/assets/fallfest/2026/svg/badge-pink.svg', lore: 'Official Event Seal' },
                  ].map((stk, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="p-3.5 rounded-xl bg-[#090d13]/90 border border-white/[0.08] hover:border-[#FF7EB6]/60 transition-all duration-300 flex flex-col items-center text-center justify-between aspect-square group cursor-pointer hover:scale-[1.03] shadow-md"
                      onClick={() => setActiveSticker(stk)}
                    >
                      <div className="w-14 h-14 p-1 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">
                        <img src={stk.file} alt={stk.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="w-full">
                        <span className="font-mono text-[11px] font-bold text-white block group-hover:text-cyan-300 transition-colors truncate">
                          {stk.name}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 block truncate mt-0.5">
                          {stk.lore}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Photo Gallery (For past events with photo archives) */}
            {hasGallery && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <div>
                    <span className="font-pixel text-[10px] uppercase tracking-widest text-emerald-400 block mb-0.5">
                      PHOTO_ARCHIVE // {event.gallery.length}_CAPTURES
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Event Photo Gallery
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase">
                    CLICK_TO_ENLARGE
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {event.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 cursor-zoom-in group border border-white/[0.08] hover:border-emerald-500/50 transition-colors"
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

        {/* ── Related Events Dossier Footer ── */}
        {relatedEvents.length > 0 && (
          <section className="pt-10 border-t border-white/[0.08] mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-pixel text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
                  PARALLEL_SPECIMENS
                </span>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  More in {event.category}
                </h3>
              </div>
              <Link to="/events" className="font-pixel text-[9px] uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors">
                VIEW_ALL →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedEvents.map(rel => (
                <Link
                  key={rel.id}
                  to={`/events/${rel.id}`}
                  className="p-4 rounded-xl bg-[#0a0e13]/80 border border-white/[0.06] hover:border-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-2 group shadow-md"
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
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${colorScheme.text}`}>
                    {rel.dateDisplay || rel.date}
                  </span>
                  <h4 className="font-display font-bold text-white text-sm leading-snug group-hover:text-emerald-300 transition-colors line-clamp-1">
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
      {lightboxImg !== null && hasGallery && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            onClick={() => setLightboxImg(null)}
            aria-label="Close Lightbox"
          >
            ✕
          </button>

          {lightboxImg > 0 && (
            <button
              type="button"
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setLightboxImg(lightboxImg - 1) }}
              aria-label="Previous Image"
            >
              ←
            </button>
          )}
          {lightboxImg < event.gallery.length - 1 && (
            <button
              type="button"
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setLightboxImg(lightboxImg + 1) }}
              aria-label="Next Image"
            >
              →
            </button>
          )}

          <img
            src={event.gallery[lightboxImg].url}
            alt={event.gallery[lightboxImg].caption || 'Enlarged view'}
            className="max-h-[88vh] max-w-[90vw] rounded-xl object-contain shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── Active Sticker Collectible Modal ── */}
      {activeSticker && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveSticker(null)}
        >
          <div
            className="bg-[#090d14] border border-[#FF7EB6]/40 p-6 sm:p-7 rounded-2xl max-w-sm w-full flex flex-col items-center text-center relative shadow-[0_0_50px_rgba(255,126,182,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer font-mono text-sm"
              onClick={() => setActiveSticker(null)}
              aria-label="Close Sticker"
            >
              ✕
            </button>
            <div className="w-32 h-32 p-2 my-3 flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(255,126,182,0.5)]">
              <img src={activeSticker.file} alt={activeSticker.name} className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-lg text-white mb-0.5">{activeSticker.name}</span>
            <span className="font-mono text-xs text-cyan-300 font-semibold mb-2">{activeSticker.lore}</span>
            <p className="font-mono text-[10px] text-slate-400">
              Official IBM Qiskit Fall Fest 2026 Deliverable • Symbiosis Quantum Club
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
