import { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useSEO from '../utils/useSEO'
import events, { CATEGORY_COLORS } from '../data/events'

// Slug mapping for category-aware back navigation
const CATEGORY_TO_SLUG = {
  'Workshop': 'workshop',
  'Fall Fest': 'fall-fest',
  'Induction': 'induction',
  'Industrial Visit': 'industrial-visit',
}

// Digital collectible sticker assets utilized for ambient background decor
const FALLFEST_STICKERS = [
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

// Vertical marquee: scrolling decorative column of stickers flanking the page
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
            className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 shrink-0 p-2.5 xl:p-3 2xl:p-3.5 rounded-2xl bg-white/90 dark:bg-white/[0.12] border border-slate-200/90 dark:border-white/[0.22] hover:border-[#FF7EB6]/80 hover:bg-white dark:hover:bg-white/[0.20] shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_24px_rgba(255,126,182,0.3)] hover:shadow-md dark:hover:shadow-[0_8px_38px_rgba(0,0,0,0.7),0_0_36px_rgba(255,126,182,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-105 pointer-events-auto cursor-pointer flex items-center justify-center"
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] opacity-95 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lightboxImg, setLightboxImg] = useState(null)

  const event = useMemo(() => {
    if (id === 'qiskit-fall-fest-2025') return null
    return events.find(e => e.id === id) || null
  }, [id])

  useEffect(() => {
    if (id === 'qiskit-fall-fest-2025') {
      navigate('/fallfest', { replace: true })
    }
  }, [id, navigate])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImg])

  const isFallFest = Boolean(event?.id?.includes('fall-fest') || event?.category === 'Fall Fest')
  const bannerSource = event?.bannerImage || event?.coverImage

  // Compute the back URL: navigate to the event's category page if available
  const backUrl = useMemo(() => {
    if (!event?.category) return '/events'
    const slug = CATEGORY_TO_SLUG[event.category]
    return slug ? `/events?category=${slug}` : '/events'
  }, [event?.category])

  const backLabel = useMemo(() => {
    if (!event?.category) return 'BACK_TO_EVENTS_INDEX'
    const slug = CATEGORY_TO_SLUG[event.category]
    return slug ? `BACK_TO_${event.category.toUpperCase().replace(/\s+/g, '_')}` : 'BACK_TO_EVENTS_INDEX'
  }, [event?.category])

  const structuredData = useMemo(() => {
    if (!event) return null
    const eventUrl = `https://symbiosisquantumclub.vercel.app/events/${event.id}`
    const desc = event.excerpt || (Array.isArray(event.description) ? event.description[0] : event.description) || event.title
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Event',
          '@id': `${eventUrl}#event`,
          'name': event.title,
          'description': desc,
          'startDate': event.date ? (event.date.includes('T') ? event.date : `${event.date}T09:00:00+05:30`) : undefined,
          'endDate': event.date ? (event.date.includes('T') ? event.date : `${event.date}T17:00:00+05:30`) : undefined,
          'eventStatus': 'https://schema.org/EventScheduled',
          'eventAttendanceMode': 'https://schema.org/MixedEventAttendanceMode',
          'image': bannerSource ? `https://symbiosisquantumclub.vercel.app${bannerSource}` : undefined,
          'location': {
            '@type': 'Place',
            'name': event.venue || event.location || 'Symbiosis Institute of Technology',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'SIT Pune Campus, Near Lupin Research Park, Gram Lavale, Taluka Mulshi',
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
          },
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'INR',
            'availability': 'https://schema.org/InStock',
            'url': eventUrl
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
              'name': event.title,
              'item': eventUrl
            }
          ]
        }
      ]
    }
  }, [event, bannerSource])

  useSEO({
    title: event
      ? `${event.title} — ${event.subtitle || 'Symbiosis Quantum Club'}`
      : 'Event Specimen Not Found | Symbiosis Quantum Club',
    description: event
      ? (event.excerpt || (Array.isArray(event.description) ? event.description[0] : event.description))
      : 'The requested quantum event specimen does not exist in the index.',
    keywords: event
      ? `${event.title}, ${event.category}, quantum computing, SIT Pune, IBM Qiskit, ${event.tags ? event.tags.join(', ') : ''}`
      : undefined,
    canonical: event ? `/events/${event.id}` : undefined,
    ogType: 'article',
    ogImage: bannerSource || undefined,
    noindex: !event,
    structuredData,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

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
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
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

  return (
    <main className={`${isFallFest ? 'bg-[#f8f9fc] dark:bg-[#060409]' : 'bg-[#fcfcfd] dark:bg-[#070a08]'} min-h-dvh pt-[calc(72px+clamp(1.5rem,1rem+2.5vw,3.5rem))] pb-12 sm:pb-16 text-slate-800 dark:text-slate-200 relative overflow-x-clip transition-colors duration-300`}>
      {/* Dynamic Ambient Background Aura */}
      {isFallFest ? (
        <div className="absolute top-0 inset-x-0 h-[450px] overflow-hidden pointer-events-none -z-10 flex justify-center">
          <div
            className="w-[min(100vw,900px)] h-full rounded-full opacity-10 dark:opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, #0ea5e9 0%, #6366f1 60%, transparent 100%)' }}
          />
        </div>
      ) : (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-cyan-500/[0.04] via-emerald-500/[0.02] to-transparent pointer-events-none blur-3xl -z-10" />
      )}

      {/* ── Flanking Vertical Marquees on blank margins (Enabled on xl+ screens) ── */}
      {isFallFest && (
        <>
          <div className="fixed inset-y-0 left-1 xl:left-2 2xl:left-4 w-16 xl:w-20 2xl:w-24 h-screen z-0 pointer-events-none hidden xl:flex flex-col items-center overflow-hidden py-4">
            <VerticalMarquee stickers={FALLFEST_STICKERS} direction="up" speed={45} />
          </div>
          <div className="fixed inset-y-0 right-1 xl:right-2 2xl:right-4 w-16 xl:w-20 2xl:w-24 h-screen z-0 pointer-events-none hidden xl:flex flex-col items-center overflow-hidden py-4">
            <VerticalMarquee stickers={[...FALLFEST_STICKERS].reverse()} direction="down" speed={38} />
          </div>

          {/* ── Ambient background decorative stickers ── */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden xl:block" aria-hidden="true">
            <img src={FALLFEST_STICKERS[0]} alt="" aria-hidden="true" className="absolute top-24 left-24 w-24 h-24 opacity-[0.14] rotate-[-15deg] filter drop-shadow-[0_0_24px_rgba(255,126,182,0.35)]" />
            <img src={FALLFEST_STICKERS[5]} alt="" aria-hidden="true" className="absolute top-56 left-12 w-16 h-16 opacity-[0.12] rotate-[20deg] filter drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]" />
            <img src={FALLFEST_STICKERS[2]} alt="" aria-hidden="true" className="absolute top-28 right-24 w-22 h-22 opacity-[0.14] rotate-[12deg] filter drop-shadow-[0_0_24px_rgba(167,139,250,0.35)]" />
            <img src={FALLFEST_STICKERS[8]} alt="" aria-hidden="true" className="absolute top-64 right-12 w-16 h-16 opacity-[0.12] rotate-[-8deg] filter drop-shadow-[0_0_20px_rgba(255,126,182,0.3)]" />
            <img src={FALLFEST_STICKERS[4]} alt="" aria-hidden="true" className="absolute top-[46%] left-16 w-18 h-18 opacity-[0.12] rotate-[6deg] filter drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]" />
            <img src={FALLFEST_STICKERS[6]} alt="" aria-hidden="true" className="absolute top-[42%] right-16 w-18 h-18 opacity-[0.12] rotate-[-10deg] filter drop-shadow-[0_0_20px_rgba(167,139,250,0.3)]" />
            <img src={FALLFEST_STICKERS[3]} alt="" aria-hidden="true" className="absolute bottom-40 left-28 w-18 h-18 opacity-[0.14] rotate-[16deg] filter drop-shadow-[0_0_24px_rgba(56,189,248,0.35)]" />
            <img src={FALLFEST_STICKERS[9]} alt="" aria-hidden="true" className="absolute bottom-28 right-28 w-22 h-22 opacity-[0.14] rotate-[-12deg] filter drop-shadow-[0_0_28px_rgba(255,126,182,0.35)]" />
            <img src={FALLFEST_STICKERS[7]} alt="" aria-hidden="true" className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-16 opacity-[0.10] rotate-[4deg]" />
          </div>
        </>
      )}

      <article className={`mx-auto relative z-10 ${
        isFallFest
          ? 'w-full max-w-[1360px] px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20'
          : 'max-w-6xl px-4 sm:px-6 lg:px-8'
      }`}>

        {/* ── Top Navigation & Telemetry Breadcrumb ── */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-white/[0.06]">
          <Link
            to={backUrl}
            className={`inline-flex items-center gap-1.5 sm:gap-2 font-pixel text-[9px] sm:text-[10px] tracking-widest ${isFallFest ? 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300' : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300'} uppercase transition-colors group shrink-0`}
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>{backLabel}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
            <span className="hidden sm:inline text-slate-300 dark:text-white/30">•</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium tracking-wide">
              SPECIMEN // {event.id.toUpperCase()}
            </span>
            {event.status === 'upcoming' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-[9px] sm:text-[10px] font-pixel tracking-wider uppercase shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                ACTIVE_CYCLE
              </span>
            )}
          </div>
        </div>

        {/* ── Header Dossier Section ── */}
        <header className="mb-7 sm:mb-8">
          <div className="flex flex-col gap-3">
            {/* If Fall Fest 2026, render the prominent IBM Quantum & Qiskit Partner Banner Component */}
            {isFallFest && (
              <div className="mb-4 sm:mb-5 flex justify-center w-full">
                <div className="relative group inline-flex max-w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-purple-500/15 rounded-2xl blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 py-2 px-3.5 sm:py-3 sm:px-6 rounded-2xl bg-white dark:bg-[#0b0818]/80 border border-cyan-500/30 hover:border-cyan-400/50 backdrop-blur-xl shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(6,182,212,0.18)] transition-all duration-300 max-w-full">
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <img
                        src="/assets/fallfest/IBM Quantum Logo.png"
                        alt="IBM Quantum"
                        className="h-6 xs:h-7 sm:h-9 w-auto object-contain"
                      />
                      <span className="h-4 sm:h-6 w-px bg-slate-300 dark:bg-white/20 select-none" aria-hidden="true" />
                      <img
                        src="/assets/fallfest/Badge.png"
                        alt="Qiskit Badge"
                        className="h-6 xs:h-7 sm:h-9 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]"
                      />
                    </div>
                    <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-cyan-500/40 bg-cyan-50 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 text-[10px] xs:text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-center max-w-full shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-500 shrink-0" />
                      <span>Official IBM Qiskit Global Partner Event</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Category badge & date */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border}`}>
                {event.category}
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{event.dateDisplay || event.date}</span>
              {event.location && (
                <>
                  <span className="text-slate-300 dark:text-white/20 hidden sm:inline">•</span>
                  <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">{event.location}</span>
                </>
              )}
            </div>

            {/* Title & Official IBM Partner Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-1">
              <div>
                <h1
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight ${
                    isFallFest ? 'dark:[text-shadow:0_0_40px_rgba(56,189,248,0.25)]' : ''
                  }`}
                >
                  {event.title}
                </h1>
                {event.subtitle && (
                  <p className="font-mono text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider mt-1.5">
                    {event.subtitle}
                  </p>
                )}
              </div>

              {/* Official IBM / Partner Badges (for other events) */}
              {!isFallFest && (event.ibmBadge || event.qiskitLogo) && (
                <div className="flex items-center gap-3 shrink-0 p-2 rounded-2xl bg-slate-100/90 dark:bg-[#0d1217]/80 border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-lg">
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
                    <div className="w-9 h-9 p-1 rounded-xl bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.06] flex items-center justify-center" title="Qiskit SDK Platform">
                      <img
                        src={event.qiskitLogo}
                        alt="Qiskit Logo"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Event Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* ── Visual Asset / Specimen Holo-Display (Full bleed cover/banner) ── */}
        {bannerSource && (
          <div className="mb-8 sm:mb-10 w-full">
            <div className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border ${isFallFest ? 'border-cyan-500/30 shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_32px_rgba(6,182,212,0.18)]' : 'border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-2xl'} bg-[#040206] flex items-center justify-center max-h-[360px] sm:max-h-[460px] md:max-h-[540px] group`}>
              <img
                src={bannerSource}
                alt={`${event.title} Banner`}
                className="w-full h-full object-contain sm:object-cover filter contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        )}

        {/* ── Asymmetric 2-Column Content Dossier ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start mb-10">

          {/* ══ Left Column: Mission Control & Event Details (Sticky on desktop) ══ */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090d12]/90 border border-slate-200/90 dark:border-white/[0.08] shadow-sm dark:shadow-xl p-5 sm:p-6 backdrop-blur-2xl flex flex-col gap-4">

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isFallFest ? 'bg-cyan-500 dark:bg-cyan-400' : 'bg-emerald-500 dark:bg-emerald-400'} animate-pulse`} />
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isFallFest ? 'text-cyan-700 dark:text-cyan-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                    Event Details
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Specs
                </span>
              </div>

              {/* Specifications List */}
              <div className="flex flex-col gap-3 text-sm">

                {(event.dates || event.dateDisplay || event.date) && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-slate-200/70 dark:border-white/[0.05]">
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</span>
                    <span className="text-slate-900 dark:text-white font-bold font-mono text-sm sm:text-[15px] leading-snug">
                      {event.dates || event.dateDisplay || event.date}
                    </span>
                  </div>
                )}

                {event.timing && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-slate-200/70 dark:border-white/[0.05]">
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Time</span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold font-mono text-sm leading-snug">
                      {event.timing}
                    </span>
                  </div>
                )}

                {(event.format || event.duration) && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-slate-200/70 dark:border-white/[0.05]">
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Format</span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold font-mono text-sm leading-snug">
                      {event.format || event.duration}
                    </span>
                  </div>
                )}

                {(event.venue || event.location) && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-slate-200/70 dark:border-white/[0.05]">
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Venue</span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm leading-snug">
                      {event.venue || event.location}
                    </span>
                  </div>
                )}

                {event.teamSize && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-slate-200/70 dark:border-white/[0.05]">
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Team Size</span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold font-mono text-sm leading-snug">
                      {event.teamSize}
                    </span>
                  </div>
                )}

                {event.cloudPlatform && (
                  <div className="flex flex-col gap-0.5 pb-2.5 border-b border-slate-200/70 dark:border-white/[0.05]">
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cloud Platform</span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-semibold font-mono text-xs leading-snug flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {event.cloudPlatform}
                    </span>
                  </div>
                )}

                {event.participants && (
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Participants</span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold font-mono text-sm leading-snug">
                      {event.participants}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Center (Registration / Alert) */}
              <div className="pt-2 flex flex-col gap-2">
                {event.status === 'upcoming' ? (
                  event.registrationUrl ? (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl ${
                        isFallFest
                          ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
                          : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40'
                      } text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.01]`}
                    >
                      Register Now →
                    </a>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono text-xs font-semibold uppercase tracking-wider text-center">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                        <span>{event.applicationAlert || 'Applications Opening Soon'}</span>
                      </div>
                      <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                        Official registrations opening via Unstop &amp; Google Forms
                      </p>
                    </div>
                  )
                ) : (
                  <div className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] font-mono text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider text-center">
                    COMPLETED_EVENT_ARCHIVE
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ══ Right Column: Program Tracks, Highlights, Briefing ══ */}
          <section className="flex flex-col gap-6 sm:gap-7 min-w-0">

            {/* 1. Program Tracks / Curriculum Stages */}
            {event.programTracks && event.programTracks.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.08]">
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-purple-700 dark:text-purple-400 block mb-0.5">
                      CURRICULUM_MATRIX // 3_STAGES
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Program Tracks &amp; Event Timeline
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline uppercase">
                    IBM_QISKIT_CURRICULUM
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {event.programTracks.map((track, idx) => (
                    <div
                      key={track.stage || idx}
                      className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090d12]/90 border border-slate-200/90 dark:border-white/[0.08] hover:border-purple-300 dark:hover:border-purple-400/50 shadow-sm hover:shadow-md dark:shadow-xl transition-all duration-300 flex flex-col justify-between group min-w-0"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200/90 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30 tracking-wider">
                            {track.stage}
                          </span>
                          {track.sticker && (
                            <div className="w-8 h-8 shrink-0 flex items-center justify-center p-1 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-400/40 transition-colors">
                              <img src={track.sticker} alt={track.badge} className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(168,85,247,0.3)]" />
                            </div>
                          )}
                        </div>

                        <span className="font-mono text-[10.5px] font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                          {track.badge}
                        </span>

                        <h3 className="font-display text-base font-bold text-slate-900 dark:text-white leading-snug mb-2 break-words">
                          {track.title}
                        </h3>

                        <p className="font-body text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {track.desc}
                        </p>
                      </div>

                      {track.footnote && (
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] font-mono text-[10px] text-purple-700 dark:text-purple-300/80">
                          {track.footnote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Flagship Highlights Showcase */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090d12]/90 border border-slate-200/90 dark:border-white/[0.08] shadow-sm dark:shadow-xl backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Event Highlights &amp; Flagship Features
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-700 dark:text-cyan-400/80 uppercase tracking-wider hidden xs:inline">
                    KEY_PILLARS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/[0.06] hover:border-cyan-500/30 transition-colors"
                    >
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 text-xs shrink-0 mt-0.5">✦</span>
                      <span className="font-body text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Executive Briefing / Overview */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090d12]/90 border border-slate-200/90 dark:border-white/[0.08] shadow-sm dark:shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-4 pb-2.5 border-b border-slate-200 dark:border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>EXECUTIVE_BRIEFING // OVERVIEW</span>
              </div>

              <div className="flex flex-col gap-4 text-slate-700 dark:text-slate-200 font-body text-sm sm:text-base leading-relaxed max-w-[68ch]">
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

            {/* Photo Gallery */}
            {hasGallery && (
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.08]">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Event Photos
                  </h2>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Click to enlarge
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {event.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-zoom-in group border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/50 transition-colors"
                      onClick={() => setLightboxImg(idx)}
                    >
                      <img
                        src={img.url}
                        alt={img.caption || `Gallery image ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
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
          <section className="pt-6 border-t border-slate-200 dark:border-white/[0.08] mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                More in {event.category}
              </h3>
              <Link to="/events" className={`font-pixel text-[9px] uppercase tracking-wider ${isFallFest ? 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300' : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300'} transition-colors`}>
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedEvents.map(rel => {
                const relUrl = rel.id === 'qiskit-fall-fest-2025' ? '/fallfest' : `/events/${rel.id}`
                return (
                  <Link
                    key={rel.id}
                    to={relUrl}
                    className={`p-4 rounded-xl bg-white dark:bg-[#0a0e13]/80 border border-slate-200/90 dark:border-white/[0.06] ${isFallFest ? 'hover:border-cyan-500/40' : 'hover:border-emerald-500/40'} hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-2 group shadow-sm hover:shadow-md dark:shadow-md`}
                  >
                  {rel.coverImage && (
                    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-1 bg-slate-100 dark:bg-black/40">
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
                  <h4 className={`font-display font-bold text-slate-900 dark:text-white text-sm leading-snug ${isFallFest ? 'group-hover:text-cyan-600 dark:group-hover:text-cyan-300' : 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300'} transition-colors line-clamp-1`}>
                    {rel.title}
                  </h4>
                  {rel.excerpt && (
                    <p className="font-body text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  )}
                </Link>
              )
            })}
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
          {/* Lightbox Index Counter & 4K Specimen Indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
            <div className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-slate-300 font-mono text-xs backdrop-blur-md">
              {lightboxImg + 1} / {event.gallery.length}
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              4K ULTRA-HD
            </span>
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
          {lightboxImg < event.gallery.length - 1 && (
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
            src={event.gallery[lightboxImg].fullUrl || event.gallery[lightboxImg].url}
            alt={event.gallery[lightboxImg].caption || 'Enlarged view'}
            className="max-h-[82vh] max-w-[90vw] rounded-xl object-contain shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          />

          {event.gallery[lightboxImg].caption && (
            <div className="absolute bottom-4 inset-x-4 flex justify-center z-20 pointer-events-none">
              <span className="px-4 py-1.5 rounded-full bg-black/85 border border-white/20 text-slate-200 font-mono text-xs text-center backdrop-blur-md max-w-xl shadow-2xl">
                {event.gallery[lightboxImg].caption}
              </span>
            </div>
          )}
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
