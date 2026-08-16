import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import events, { CATEGORIES, CATEGORY_COLORS } from '../data/events'
import PixelBlast from '../components/ui/PixelBlast'

// URL slug mappings for clean REST-style query parameter synchronization
const SLUG_TO_CATEGORY = {
  'workshop': 'Workshop',
  'fall-fest': 'Fall Fest',
  'hackathons': 'Hackathons / Ideathons',
  'hackathons-ideathons': 'Hackathons / Ideathons',
  'induction': 'Induction',
  'industrial-visit': 'Industrial Visit',
  'industrial-visits': 'Industrial Visit',
}

const CATEGORY_TO_SLUG = {
  'Workshop': 'workshop',
  'Fall Fest': 'fall-fest',
  'Hackathons / Ideathons': 'hackathons',
  'Induction': 'induction',
  'Industrial Visit': 'industrial-visit',
}

// Define metadata for the 5 primary category cards 
// (Base colors: Distinct category themes. Hover state: Red & Yellow Sunrise theme "Rise of New Learning")
const CATEGORY_HUB_DATA = {
  'Workshop': {
    title: 'WORKSHOP',
    subtitle: 'Hands-on Quantum Programming & Circuit Design',
    description: 'Master quantum algorithms, Qiskit circuits, VQE implementations, and data visualization tools through expert-guided technical sessions.',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-[#121513]',
    accentColor: '#10b981',
    borderHover: 'group-hover:border-[#f97316]/60',
    glowHover: 'group-hover:shadow-[0_16px_48px_rgba(249,115,22,0.28)]',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    tag: 'HANDS-ON SESSIONS',
    coverImage: '/assets/events/iiser-visit/photo-5.jpg',
    icon: (
      <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  'Fall Fest': {
    title: 'FALL FEST',
    subtitle: 'IBM Qiskit Global Partner Flagship',
    description: 'Our annual multi-week quantum festival celebrating cloud quantum computing with IBM hardware access, workshops, and hackathons.',
    gradient: 'from-cyan-500/20 via-sky-500/10 to-[#121513]',
    accentColor: '#38bdf8',
    borderHover: 'group-hover:border-[#f97316]/60',
    glowHover: 'group-hover:shadow-[0_16px_48px_rgba(249,115,22,0.28)]',
    badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    tag: 'FLAGSHIP PARTNER',
    coverImage: '/assets/fallfest/Full_Illustration.png',
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  'Hackathons / Ideathons': {
    title: 'HACKATHONS / IDEATHONS',
    subtitle: 'Competitive Quantum Problem Solving Sprints',
    description: '48-hour competitive challenges where student teams construct quantum algorithms, tackle optimization problems, and win cloud credits.',
    gradient: 'from-purple-500/20 via-fuchsia-500/10 to-[#121513]',
    accentColor: '#a855f7',
    borderHover: 'group-hover:border-[#f97316]/60',
    glowHover: 'group-hover:shadow-[0_16px_48px_rgba(249,115,22,0.28)]',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    tag: '48H CODING SPRINT',
    coverImage: '/assets/fallfest/Entanglement.png',
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  'Induction': {
    title: 'INDUCTION',
    subtitle: 'Orientation & SQC Community Welcome',
    description: 'Official induction ceremonies welcoming new quantum enthusiasts, presenting year-round initiatives, and meeting team leads.',
    gradient: 'from-pink-500/20 via-rose-500/10 to-[#121513]',
    accentColor: '#ec4899',
    borderHover: 'group-hover:border-[#f97316]/60',
    glowHover: 'group-hover:shadow-[0_16px_48px_rgba(249,115,22,0.28)]',
    badgeClass: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
    tag: 'ORIENTATION & WELCOME',
    coverImage: '/assets/events/iiser-visit/photo-6.jpg',
    icon: (
      <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  'Industrial Visit': {
    title: 'INDUSTRIAL VISITS',
    subtitle: 'Lab Tours & Research Center Exchanges',
    description: 'Immersive field visits to premier quantum physics laboratories like IISER Pune to witness live experimental quantum hardware.',
    gradient: 'from-amber-500/20 via-orange-500/10 to-[#121513]',
    accentColor: '#f59e0b',
    borderHover: 'group-hover:border-[#f97316]/60',
    glowHover: 'group-hover:shadow-[0_16px_48px_rgba(249,115,22,0.28)]',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    tag: 'RESEARCH LAB TOUR',
    coverImage: '/assets/events/iiser-visit/photo-1.jpg',
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m-4 0h4" />
      </svg>
    ),
  },
}

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  // Derive active category from URL search parameter
  const selectedCategory = useMemo(() => {
    if (!categoryParam) return 'Hub'
    return SLUG_TO_CATEGORY[categoryParam.toLowerCase()] || 'Hub'
  }, [categoryParam])

  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [registeredEmail, setRegisteredEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    document.title = selectedCategory === 'Hub'
      ? 'Quantum Events & Initiatives — Symbiosis Quantum Club'
      : `${selectedCategory} Events — Symbiosis Quantum Club`
    window.scrollTo(0, 0)
  }, [selectedCategory])

  // Count events per category
  const categoryCounts = useMemo(() => {
    const counts = {}
    events.forEach(event => {
      const cat = event.category
      counts[cat] = (counts[cat] || 0) + 1
    })
    return counts
  }, [])

  // List of primary 5 categories
  const mainCategories = useMemo(() => {
    return CATEGORIES.filter(c => c !== 'All')
  }, [])

  // Switch category handler with synchronized URL search param update
  const handleSelectCategory = (catKey) => {
    if (catKey === 'Hub') {
      setSearchParams({})
    } else {
      const slug = CATEGORY_TO_SLUG[catKey] || catKey.toLowerCase().replace(/\s+/g, '-')
      setSearchParams({ category: slug })
    }
    setSearchQuery('')
    setStatusFilter('All')
  }

  // Events filtered for active category view and search query
  const categoryEvents = useMemo(() => {
    return events
      .filter(event => {
        if (selectedCategory !== 'Hub' && event.category !== selectedCategory) {
          return false
        }

        const isUpcoming = new Date(event.date) >= new Date()
        if (statusFilter === 'Upcoming' && !isUpcoming) return false
        if (statusFilter === 'Past' && isUpcoming) return false

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchTitle = event.title.toLowerCase().includes(q)
          const matchExcerpt = (event.excerpt || '').toLowerCase().includes(q)
          const matchLocation = (event.location || '').toLowerCase().includes(q)
          const matchTags = (event.tags || []).some(t => t.toLowerCase().includes(q))
          if (!matchTitle && !matchExcerpt && !matchLocation && !matchTags) return false
        }

        return true
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [selectedCategory, statusFilter, searchQuery])

  // Separate upcoming vs past for timely categorized view
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming = []
    const past = []
    categoryEvents.forEach(e => {
      if (new Date(e.date) >= new Date()) {
        upcoming.push(e)
      } else {
        past.push(e)
      }
    })
    return { upcomingEvents: upcoming, pastEvents: past }
  }, [categoryEvents])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (registeredEmail.trim()) {
      setIsSubscribed(true)
      setRegisteredEmail('')
      setTimeout(() => setIsSubscribed(false), 4000)
    }
  }

  const activeCategoryInfo = CATEGORY_HUB_DATA[selectedCategory]

  return (
    <main className="bg-[#070a08] min-h-screen pt-20 sm:pt-22 pb-24 text-slate-200 relative overflow-x-clip">
      {/* ── ReactBits PixelBlast Background (Sunrise Warm Red/Yellow Patch Format) ── */}
      <PixelBlast
        variant="square"
        pixelSize={3}
        color="#7c2d12"
        patternScale={3.5}
        patternDensity={0.42}
        pixelSizeJitter={0}
        enableRipples
        rippleSpeed={0.15}
        rippleThickness={0.15}
        rippleIntensityScale={0.6}
        liquid={false}
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.15}
        edgeFade={0.4}
        transparent
        style={{ opacity: 0.45 }}
      />

      {/* ── Outer Container ── */}
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* ── Redefined Grid Container Tracks: Expanded 540px Aside Container, Tight 28px Gap ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[540px_1fr] gap-6 lg:gap-8 items-start">
          
          {/* ── Left Sticky Editorial Sidebar Header (Dynamic Animated Transition) ── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-[200px] lg:self-start lg:h-fit lg:z-10 pt-12 lg:pt-22 w-full transition-all duration-500 ease-in-out">
            
            {/* Top of Aside Container: BACK TO ALL CATEGORIES button (placed at top of left container parallel to right search bar) */}
            {selectedCategory !== 'Hub' && (
              <div className="animate-fadeIn transition-all duration-300">
                <button
                  onClick={() => handleSelectCategory('Hub')}
                  className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#121513] border border-[#f59e0b]/40 text-[#f59e0b] hover:text-slate-950 hover:bg-gradient-to-r hover:from-[#ef4444] hover:via-[#f97316] hover:to-[#eab308] hover:border-[#eab308] hover:shadow-[0_4px_20px_rgba(245,158,11,0.35)] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md group shrink-0"
                >
                  <svg className="w-4 h-4 text-[#f59e0b] group-hover:text-slate-950 group-hover:-translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  BACK TO ALL CATEGORIES
                </button>
              </div>
            )}

            {/* Header Lockup: Sunrise Red & Yellow Line Accent + Monospace Eyebrow */}
            <div className="flex items-center gap-3 transition-opacity duration-300">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#eab308] shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
              <span className="font-mono text-[0.675rem] font-bold tracking-widest text-[#f59e0b] uppercase">
                {selectedCategory === 'Hub' 
                  ? 'SYMBIOSIS QUANTUM CLUB ✦ EVENTS 2026'
                  : `SYMBIOSIS QUANTUM CLUB ✦ ${selectedCategory.toUpperCase()}`}
              </span>
            </div>

            {/* Main High-Impact Headline Stack with Dynamic Transition */}
            <div key={selectedCategory} className="flex flex-col animate-fadeIn transition-all duration-500">
              {selectedCategory === 'Hub' ? (
                <h1 className="font-display text-[clamp(2.4rem,4.2vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight uppercase text-white m-0 flex flex-col">
                  <span>EXPLORE OUR</span>
                  <span>QUANTUM</span>
                  <span className="bg-gradient-to-r from-white via-[#f97316] to-[#eab308] bg-clip-text text-transparent">
                    INITIATIVES
                  </span>
                </h1>
              ) : (
                <h1 className="font-display text-[clamp(2.4rem,4.2vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight uppercase text-white m-0 flex flex-col">
                  <span className="text-slate-300 text-lg font-mono tracking-widest font-semibold text-[#f59e0b] mb-1">
                    SELECTED CATEGORY
                  </span>
                  <span className="bg-gradient-to-r from-white via-[#f97316] to-[#eab308] bg-clip-text text-transparent">
                    {activeCategoryInfo?.title || selectedCategory.toUpperCase()}
                  </span>
                </h1>
              )}
            </div>

            {/* Subtitle Paragraph */}
            <p key={`sub-${selectedCategory}`} className="font-body text-base sm:text-lg text-gray-300 max-w-[52ch] leading-relaxed m-0 transition-opacity duration-300">
              {selectedCategory === 'Hub'
                ? 'Immersive hands-on workshops, official IBM Qiskit Fall Fests, 48-hour algorithm hackathons, club inductions, and research lab visits hosted by Symbiosis Quantum Club.'
                : (activeCategoryInfo?.description || `Explore all official ${selectedCategory} events organized chronologically.`)}
            </p>

          </aside>

          {/* ── Right Main Stream ── */}
          <section className="flex flex-col w-full pt-4 lg:pt-6">
            
            {/* Top Toolbar: Search Bar placed at top of right stream container parallel to left Back button */}
            {selectedCategory !== 'Hub' && (
              <div className="pb-6 mb-6 border-b border-[#f59e0b]/20 flex items-center w-full animate-fadeIn transition-all duration-300">
                {/* Search Bar Input */}
                <div className="relative w-full">
                  <input
                    id="event-category-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${selectedCategory} events...`}
                    className="w-full py-3.5 pl-11 pr-10 bg-[#090d0a]/90 border border-[#f59e0b]/30 rounded-xl font-body text-sm text-white outline-none transition-all duration-200 focus:border-[#f59e0b] focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] placeholder:text-slate-500"
                  />
                  {/* Search Icon */}
                  <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {/* Clear Button */}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
                      title="Clear search"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── VIEW 1: SQUARE COVER CATEGORY CARDS (LANDING STATE) ── */}
            {selectedCategory === 'Hub' ? (
              <div className="flex flex-col gap-8 sm:gap-10 w-full max-w-[850px] ml-auto">
                {mainCategories.map(catKey => {
                  const info = CATEGORY_HUB_DATA[catKey] || {
                    title: catKey.toUpperCase(),
                    subtitle: 'Quantum Initiative',
                    description: 'Explore events in this category.',
                    gradient: 'from-amber-500/20 via-orange-500/10 to-[#121513]',
                    accentColor: '#f59e0b',
                    borderHover: 'group-hover:border-[#f97316]/60',
                    glowHover: 'group-hover:shadow-[0_16px_48px_rgba(249,115,22,0.28)]',
                    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                    tag: 'SQC INITIATIVE',
                    coverImage: '/assets/events/iiser-visit/photo-1.jpg',
                  }

                  return (
                    <div
                      key={catKey}
                      onClick={() => handleSelectCategory(catKey)}
                      className={`group relative w-full rounded-3xl p-6 sm:p-7 lg:p-8 bg-gradient-to-r ${info.gradient} border border-white/10 ${info.borderHover} ${info.glowHover} transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-6 sm:gap-8 items-center overflow-hidden shadow-2xl hover:-translate-y-1.5`}
                    >
                      {/* Left Square Visual Cover Frame — Consistent 1:1 Aspect Ratio Across All Categories */}
                      <div className="relative aspect-square w-full sm:w-[240px] md:w-[240px] lg:w-[260px] h-[240px] sm:h-[240px] lg:h-[260px] rounded-2xl overflow-hidden bg-[#090d0a] border border-white/15 group-hover:border-[#f59e0b]/50 transition-all duration-500 shadow-2xl shrink-0">
                        {info.coverImage ? (
                          <img
                            src={info.coverImage}
                            alt={info.title}
                            className="w-full h-full object-cover object-center brightness-90 contrast-[1.05] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#1c130d] via-[#121513] to-[#070a08] flex items-center justify-center">
                            <div className="p-5 rounded-2xl bg-[#121513]/90 border border-white/15 shadow-xl group-hover:scale-110 group-hover:border-[#f59e0b]/50 transition-all duration-300">
                              {info.icon}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Content Area */}
                      <div className="flex flex-col justify-between gap-4 relative z-10 py-1 flex-1 w-full">
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-mono text-xs text-slate-400 font-semibold uppercase tracking-wider">
                              {info.subtitle}
                            </span>
                          </div>

                          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-[#f59e0b] transition-colors m-0">
                            {info.title}
                          </h3>

                          <p className="font-body text-base text-slate-300 leading-relaxed max-w-[62ch] m-0">
                            {info.description}
                          </p>
                        </div>

                        {/* Action Button: Base dark lockup -> Sunrise Red & Yellow Hover pop-up */}
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#121513] border border-[#f59e0b]/30 text-white font-display text-xs font-bold tracking-wider uppercase transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#ef4444] group-hover:via-[#f97316] group-hover:to-[#eab308] group-hover:text-slate-950 group-hover:border-[#eab308] group-hover:shadow-[0_6px_24px_rgba(245,158,11,0.4)]">
                            Explore Category
                            <svg className="w-4 h-4 text-[#f59e0b] group-hover:text-slate-950 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </div>

                      </div>

                    </div>
                  )
                })}
              </div>
            ) : null}

            {/* ── VIEW 2: CATEGORY TIMELINE EVENTS STREAM (INSIDE SELECTED CATEGORY) ── */}
            {selectedCategory !== 'Hub' && (
              <div className="flex flex-col gap-8 w-full max-w-[850px] ml-auto">
                
                {/* Timeline Filter Pills Bar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#121513] via-[#090d0a] to-[#121513] border border-[#f59e0b]/30 flex items-center justify-between gap-4 flex-wrap shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
                      FILTER TIMELINE:
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {['All', 'Upcoming', 'Past'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-[0.725rem] uppercase tracking-wider transition-all ${
                          statusFilter === st
                            ? 'bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#eab308] text-slate-950 font-bold shadow-[0_2px_10px_rgba(245,158,11,0.3)]'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {st} Events
                      </button>
                    ))}
                  </div>
                </div>

                {/* Render Timely Categorized Events */}
                {categoryEvents.length > 0 ? (
                  <div className="flex flex-col gap-10">

                    {/* UPCOMING EVENTS SECTION */}
                    {upcomingEvents.length > 0 && (statusFilter === 'All' || statusFilter === 'Upcoming') && (
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 pb-3 border-b border-[#f59e0b]/30">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse" />
                          <h3 className="font-display text-xl font-bold text-[#f59e0b] tracking-wide uppercase m-0">
                            Upcoming Events
                          </h3>
                        </div>

                        <div className="flex flex-col">
                          {upcomingEvents.map(event => (
                            <EventCardRow key={event.id} event={event} formatDate={formatDate} isUpcoming={true} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PAST EVENTS SECTION */}
                    {pastEvents.length > 0 && (statusFilter === 'All' || statusFilter === 'Past') && (
                      <div className="flex flex-col gap-6 pt-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                          <h3 className="font-display text-xl font-bold text-white tracking-wide uppercase m-0">
                            Past Events & Archives
                          </h3>
                        </div>

                        <div className="flex flex-col">
                          {pastEvents.map(event => (
                            <EventCardRow key={event.id} event={event} formatDate={formatDate} isUpcoming={false} />
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="py-16 px-8 text-center flex flex-col items-center gap-5 text-slate-400 font-body border border-white/10 rounded-2xl bg-[#121513]/50">
                    <p>
                      {searchQuery 
                        ? `No events matching "${searchQuery}" found in ${selectedCategory}.`
                        : `No events currently found in this category view.`}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setStatusFilter('All')
                      }}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#eab308] text-[#070a08] font-display text-xs font-bold transition-transform hover:scale-105"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

              </div>
            )}

          </section>

        </div>

        {/* ── Bottom Editorial Newsletter CTA Section (Sunrise Flame Theme) ── */}
        <section className="mt-24 p-8 sm:p-12 lg:p-16 rounded-2xl bg-gradient-to-br from-[#ef4444]/15 via-[#121513]/80 to-[#070a08] border border-[#f59e0b]/30 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center relative overflow-hidden shadow-2xl">
          <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-bold leading-tight text-white m-0 tracking-tight">
            Be part of the next <span className="bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#eab308] bg-clip-text text-transparent">quantum milestone</span> at Symbiosis.
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-semibold text-white m-0">
              Subscribe to Event Alerts & Registrations
            </h3>

            <form onSubmit={handleSubscribe} className="flex items-center relative w-full">
              <input
                type="email"
                placeholder="Enter your email for event notifications..."
                value={registeredEmail}
                onChange={(e) => setRegisteredEmail(e.target.value)}
                className="w-full py-3.5 pl-5 pr-14 bg-[#090d0a]/80 border border-[#f59e0b]/30 rounded-full font-body text-sm text-white outline-none transition-all duration-200 focus:border-[#f59e0b] focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] placeholder:text-slate-500"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 w-10 h-10 rounded-full bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#eab308] text-slate-950 flex items-center justify-center hover:scale-105 hover:shadow-[0_4px_16px_rgba(245,158,11,0.4)] transition-all duration-200"
                aria-label="Subscribe to events"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            {isSubscribed ? (
              <p className="font-mono text-xs text-[#f59e0b] m-0">
                ✓ Subscribed! You will receive instant notifications for upcoming SQC events.
              </p>
            ) : (
              <p className="font-mono text-xs text-slate-500 m-0">
                Get early registration access for workshops, hackathons, and lab visits.
              </p>
            )}
          </div>
        </section>

      </div>
    </main>
  )
}

// Sub-component for individual Event rows inside active categories
function EventCardRow({ event, formatDate, isUpcoming }) {
  const catTheme = CATEGORY_COLORS[event.category] || { bg: 'bg-amber-500/12', text: 'text-amber-400', border: 'border-amber-500/30' }

  return (
    <article
      className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-7 lg:gap-9 py-8 border-t border-white/10 first:border-t-0 first:pt-0 hover:border-[#f59e0b]/40 transition-colors duration-300 relative"
    >
      {/* 3:4 Aspect Ratio Image Frame */}
      <Link
        to={`/events/${event.id}`}
        className="w-full aspect-[3/4] rounded-xl overflow-hidden relative bg-[#121513] border border-white/10 shadow-lg group-hover:border-[#f59e0b]/40 group-hover:shadow-[0_12px_32px_rgba(245,158,11,0.18)] transition-all duration-300 flex items-center justify-center group/img"
      >
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover transition-all duration-500 ease-out brightness-90 contrast-[1.05] group-hover:scale-[1.07] group-hover:brightness-100 group-hover:contrast-[1.1] transform-gpu"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#270c0c] via-[#121513] to-[#070a08]">
            <span className="font-mono text-[#f59e0b] font-bold text-xs uppercase tracking-widest">
              SQC EVENT
            </span>
            <span className="font-display text-sm font-bold text-white/80 mt-2 line-clamp-2">
              {event.title}
            </span>
          </div>
        )}

        {/* Status Overlay Badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono text-[0.625rem] font-bold tracking-wider uppercase border backdrop-blur-md ${isUpcoming
          ? 'bg-[#ef4444]/80 text-[#fff7ed] border-[#f97316]/50 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
          : 'bg-black/60 text-slate-400 border-white/10'
          }`}>
          {isUpcoming ? '● UPCOMING' : 'PAST'}
        </span>
      </Link>

      {/* Content Meta */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <time className="font-mono text-xs font-semibold text-[#f59e0b] tracking-wider uppercase" dateTime={event.date}>
            {event.dateDisplay || formatDate(event.date)}
          </time>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[0.675rem] font-bold tracking-wider uppercase border ${catTheme.bg} ${catTheme.text} ${catTheme.border}`}>
            {event.category}
          </span>
        </div>

        <Link to={`/events/${event.id}`}>
          <h3 className="font-display text-[clamp(1.2rem,2vw,1.5rem)] font-bold text-white leading-snug m-0 group-hover:text-[#f59e0b] transition-colors duration-200">
            {event.title}
          </h3>
        </Link>

        <div>
          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121513] border border-[#f59e0b]/30 text-white font-display text-xs font-semibold tracking-wide transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#ef4444] group-hover:via-[#f97316] group-hover:to-[#eab308] group-hover:border-[#eab308] group-hover:text-slate-950 group-hover:shadow-[0_4px_18px_rgba(245,158,11,0.35)] cursor-pointer"
          >
            Discover Event
            <svg
              className="w-3.5 h-3.5 text-[#f59e0b] group-hover:text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 12L12 4M12 4H6M12 4V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <p className="font-body text-[0.9rem] text-slate-400 leading-relaxed m-0 max-w-[60ch]">
          {event.excerpt || (event.description && event.description[0])}
        </p>

        <div className="flex items-center gap-4 pt-1 font-mono text-[0.725rem] text-slate-500 flex-wrap">
          {event.location && (
            <span className="flex items-center gap-1.5 text-slate-400">
              <svg className="w-3 h-3 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </span>
          )}
          {event.participants && (
            <>
              <span>•</span>
              <span>{event.participants} Participants</span>
            </>
          )}
          {event.duration && (
            <>
              <span>•</span>
              <span>{event.duration}</span>
            </>
          )}
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            {event.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono text-[0.65rem]">
                #{tag}
              </span>
            ))}
          </div>
        )}

      </div>
    </article>
  )
}
