import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import events from '../../data/events'
import blogData from '../../data/blog.json'

/* ─── Category slug → display name mapping for transition HUD ─── */
const SLUG_TO_DISPLAY = {
  'workshop': 'WORKSHOP',
  'fall-fest': 'FALL FEST',
  'induction': 'INDUCTION',
  'industrial-visit': 'INDUSTRIAL VISITS',
  'industrial-visits': 'INDUSTRIAL VISITS',
}

/* ─── Extract category display name from a URL search string ─── */
const getCategoryFromSearch = (search) => {
  const params = new URLSearchParams(search)
  const slug = params.get('category')
  if (!slug) return null
  return SLUG_TO_DISPLAY[slug.toLowerCase()] || slug.replace(/-/g, ' ').toUpperCase()
}

/* ─── Detect if route is a "detail" page (events/:id or blog/:id or /fallfest) ─── */
export const isDetailPage = (pathname) =>
  /^\/events\/[^?#/]+/.test(pathname) || /^\/blog\/[^?#/]+/.test(pathname) || pathname === '/fallfest'

/* ─── Get the parent list route for a detail page ─── */
/* e.g. /blog/some-post → /blog  |  /events/my-event → /events  |  /fallfest → /events */
const getParentRoute = (pathname) => {
  if (/^\/events\//.test(pathname)) return '/events'
  if (/^\/blog\//.test(pathname)) return '/blog'
  if (pathname === '/fallfest') return '/events'
  return null
}

/* ─── Destination metadata for Content Detail Cards (Pixel Transition) ─── */
export const getPageMeta = (pathname) => {
  if (/^\/events\/.+/.test(pathname) || pathname === '/fallfest') {
    const rawId = pathname === '/fallfest' ? 'qiskit-fall-fest-2025' : pathname.replace('/events/', '').split(/[?#]/)[0]
    const event = events.find((e) => e.id === rawId || e.slug === rawId)
    let accent = '#f97316'
    if (event?.category === 'Workshop') accent = '#10b981'
    if (event?.category === 'Fall Fest') accent = '#38bdf8'
    if (event?.category === 'Induction') accent = '#ec4899'
    if (event?.category === 'Industrial Visit') accent = '#f59e0b'
    return {
      id: rawId,
      eventId: event?.id || rawId,
      title: event ? event.title.toUpperCase() : rawId.replace(/-/g, ' ').toUpperCase(),
      subtitle: event?.subtitle || event?.dateDisplay || 'SYMBIOSIS QUANTUM CLUB ✦ EVENT',
      category: event?.category || 'EVENT',
      accent,
      panelColor: event?.category === 'Fall Fest' ? '#7e22ce' : '#c2410c',
      type: 'EVENT',
    }
  }
  if (/^\/blog\/.+/.test(pathname)) {
    const rawId = pathname.replace('/blog/', '').split(/[?#]/)[0]
    const post = blogData.find((p) => p.id === rawId || p.slug === rawId)
    return {
      id: rawId,
      eventId: rawId,
      title: post ? post.title.toUpperCase() : rawId.replace(/-/g, ' ').toUpperCase(),
      subtitle: post?.category ? `${post.category.toUpperCase()} ✦ RESEARCH PUBLICATION` : 'QUANTUM JOURNAL',
      category: post?.category || 'ARTICLE',
      accent: '#34d399',
      panelColor: '#047857',
      type: 'ARTICLE',
    }
  }
  return { id: 'QUANTUM', eventId: 'QUANTUM', title: 'QUANTUM', subtitle: 'SYMBIOSIS QUANTUM CLUB', accent: '#10b981', panelColor: '#047857', type: 'PAGE' }
}

/* ─── Metadata for Top-Level Navigation Pages (Wipe Transition) ─── */
export const ROUTE_DATA = {
  '/': {
    label: 'HOME',
    panelColor: '#6b21a8',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #e879f9 45%, #c084fc 100%)',
    accent: '#a855f7',
  },
  '/events': {
    label: 'QUANT EVENTS',
    panelColor: '#c2410c',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #fed7aa 40%, #fb923c 100%)',
    accent: '#f97316',
  },
  '/blog': {
    label: 'QUANT BLOGS',
    panelColor: '#047857',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #a7f3d0 40%, #34d399 100%)',
    accent: '#10b981',
  },
  '/team': {
    label: 'TEAM',
    panelColor: '#0e7490',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #bae6fd 40%, #38bdf8 100%)',
    accent: '#06b6d4',
  },
  '/fallfest': {
    label: 'FALL FEST',
    panelColor: '#7e22ce',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #f5d0fe 40%, #d946ef 100%)',
    accent: '#a855f7',
  },
}

export const getRouteMeta = (pathname) => {
  if (ROUTE_DATA[pathname]) return ROUTE_DATA[pathname]
  if (pathname.startsWith('/events')) return ROUTE_DATA['/events']
  if (pathname.startsWith('/blog')) return ROUTE_DATA['/blog']
  if (pathname.startsWith('/team')) return ROUTE_DATA['/team']
  const cleanName = pathname.replace(/^\//, '').replace(/-/g, ' ').toUpperCase() || 'QUANTUM'
  return {
    label: cleanName,
    panelColor: '#047857',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #a7f3d0 40%, #34d399 100%)',
    accent: '#10b981',
  }
}

/* ─── 2 cm Square Pixel Box Dimensions ───
   In CSS: 1 inch = 96px, 1 inch = 2.54cm
   2 cm = (96 / 2.54) * 2 = 75.5906px */
const BOX_SIZE_PX = 75.5906

function getGridDimensions() {
  if (typeof window === 'undefined') return { cols: 22, rows: 14 }
  return {
    cols: Math.ceil(window.innerWidth / BOX_SIZE_PX) + 2,
    rows: Math.ceil(window.innerHeight / BOX_SIZE_PX) + 2,
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   PageTransition Component
   - Mode A: Wipe Transition (Navigating between main site pages)
   - Mode B: Wipe-to-Pixel with category name (Forward category filter on /events)
   - Mode C: Clean Wipe-to-Pixel, NO text (Navigating forward into /events/:id)
   - Mode D: No Transition (Returning from detail or removing category filter)
   ───────────────────────────────────────────────────────────────────────── */
export default function PageTransition({ children }) {
  const location = useLocation()

  // displayChildren holds what is currently visible in the DOM
  const [displayChildren, setDisplayChildren] = useState(children)

  // Overlay metadata states
  const [wipeMeta, setWipeMeta] = useState(() => getRouteMeta(location.pathname))
  const [pixelMeta, setPixelMeta] = useState(() => getPageMeta(location.pathname))

  // Constant curtain color across both Wipe cover and Pixel reveal
  const [transitionColor, setTransitionColor] = useState(() => getRouteMeta(location.pathname).panelColor || '#c2410c')

  // Dynamic 2cm square pixel grid based on viewport dimensions
  const [gridDimensions, setGridDimensions] = useState(getGridDimensions)

  useEffect(() => {
    const handleResize = () => setGridDimensions(getGridDimensions())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const tileCount = gridDimensions.cols * gridDimensions.rows
  const tiles = useMemo(() => Array.from({ length: tileCount }, (_, i) => i), [tileCount])

  // Refs for tracking navigation and DOM nodes
  const prevPathRef = useRef(location.pathname)
  const prevSearchRef = useRef(location.search)
  const isFirstMount = useRef(true)
  const latestChildrenRef = useRef(children)
  latestChildrenRef.current = children

  const tlRef = useRef(null)

  // Wipe overlay refs
  const wipeOverlayRef = useRef(null)
  const wipePanelRef = useRef(null)
  const wipeHudRef = useRef(null)
  const wipeEdgeRef = useRef(null)

  // Pixel overlay refs
  const pixelOverlayRef = useRef(null)
  const tileRefs = useRef([])

  // Detail HUD ref (Event ID written on wipe-to-pixel) — now unused for text but kept for cleanup
  const detailHudRef = useRef(null)

  // Category HUD ref (Category name shown at bottom-right during category filter transitions)
  const categoryHudRef = useRef(null)
  const [categoryDisplayName, setCategoryDisplayName] = useState('')

  useEffect(() => {
    // Skip animation on initial page load / reload, but ensure window is scrolled to the top
    if (isFirstMount.current) {
      isFirstMount.current = false
      prevPathRef.current = location.pathname
      prevSearchRef.current = location.search
      setDisplayChildren(children)
      window.scrollTo(0, 0)
      return
    }

    const cleanFrom = (prevPathRef.current || '').replace(/\/+$/, '') || '/'
    const cleanTo = (location.pathname || '').replace(/\/+$/, '') || '/'
    const from = prevPathRef.current
    const to = location.pathname
    const prevSearch = prevSearchRef.current
    const nextSearch = location.search

    // Kill any ongoing animation timeline immediately on route/search change
    if (tlRef.current) {
      tlRef.current.kill()
      tlRef.current = null
    }

    // 1. Same route path AND same query string -> instant update, no animation
    if (from === to && prevSearch === nextSearch) {
      setDisplayChildren(children)
      return
    }

    // 1b. Within /events (or same pathname): category filter navigation
    if (cleanFrom === cleanTo && prevSearch !== nextSearch) {
      prevSearchRef.current = nextSearch

      const prevCategory = getCategoryFromSearch(prevSearch)
      const nextCategory = getCategoryFromSearch(nextSearch)

      // BACKWARD: Going from any category (e.g. /events?category=fall-fest) back to /events -> NO TRANSITION
      if (!nextCategory) {
        if (wipeOverlayRef.current) gsap.set(wipeOverlayRef.current, { display: 'none', pointerEvents: 'none' })
        if (pixelOverlayRef.current) gsap.set(pixelOverlayRef.current, { display: 'none', pointerEvents: 'none' })
        if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none' })
        if (categoryHudRef.current) gsap.set(categoryHudRef.current, { display: 'none' })

        setDisplayChildren(children)
        window.scrollTo(0, 0)
        return
      }

      // FORWARD: Adding or changing ?category → wipe-to-pixel with category name at bottom-right, 2s total
      setCategoryDisplayName(nextCategory || '')

      if (wipeOverlayRef.current) gsap.set(wipeOverlayRef.current, { display: 'none', pointerEvents: 'none' })
      if (pixelOverlayRef.current) gsap.set(pixelOverlayRef.current, { display: 'none', pointerEvents: 'none' })
      if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none' })
      if (categoryHudRef.current) gsap.set(categoryHudRef.current, { display: 'none' })

      const wipeOverlay = wipeOverlayRef.current
      const wipePanel = wipePanelRef.current
      const pixelOverlay = pixelOverlayRef.current
      const categoryHud = categoryHudRef.current
      const currentTiles = tileRefs.current.slice(0, tileCount).filter(Boolean)

      if (!wipeOverlay || !wipePanel || !pixelOverlay || currentTiles.length === 0) {
        setDisplayChildren(children)
        window.scrollTo(0, 0)
        return
      }

      // Single consistent color throughout
      const curtainColor = getRouteMeta(to).panelColor || '#c2410c'
      setTransitionColor(curtainColor)

      if (wipeHudRef.current) gsap.set(wipeHudRef.current, { display: 'none', opacity: 0 })
      if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none', opacity: 0 })
      if (wipeEdgeRef.current) gsap.set(wipeEdgeRef.current, { opacity: 1 })

      gsap.set(wipePanel, { backgroundColor: curtainColor })
      gsap.set(currentTiles, { backgroundColor: curtainColor, outlineColor: curtainColor, scale: 1, opacity: 1 })

      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(wipeOverlay, { display: 'flex', pointerEvents: 'auto' })
          gsap.set(wipePanel, { xPercent: -100, backgroundColor: curtainColor })
          gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
          gsap.set(currentTiles, { scale: 1, opacity: 1, backgroundColor: curtainColor, outlineColor: curtainColor })
          if (categoryHud) gsap.set(categoryHud, { display: 'flex', opacity: 0, y: 20 })
        },
      })
      tlRef.current = tl

      // Phase 1: Wipe panel slides in from left (0.45s)
      tl.to(wipePanel, {
        xPercent: 0,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          setDisplayChildren(latestChildrenRef.current)
          window.scrollTo(0, 0)
        },
      })
      // Phase 2: Category name HUD fades in at bottom-right (0.3s)
      .to(
        categoryHud,
        {
          opacity: 1,
          y: 0,
          duration: 0.30,
          ease: 'power2.out',
        },
        '-=0.12'
      )
      // Phase 3: Seamless handoff to pixel tiles — wipe hides, pixel grid shows
      .add(() => {
        gsap.set(wipeOverlay, { display: 'none', pointerEvents: 'none' })
        gsap.set(pixelOverlay, { display: 'flex', pointerEvents: 'none' })
        gsap.set(currentTiles, { scale: 1, opacity: 1, backgroundColor: curtainColor, outlineColor: curtainColor })
      })
      // Phase 4: Readable hold so user can register the category name (~0.55s)
      .to({}, { duration: 0.55 })
      // Phase 5: Category HUD fades out
      .to(categoryHud, {
        opacity: 0,
        y: -10,
        duration: 0.22,
        ease: 'power2.in',
      })
      // Phase 6: Pixel tiles randomly dissolve out (0.38s + 0.45s stagger = ~0.83s)
      .to(
        currentTiles,
        {
          scale: 0,
          opacity: 0,
          duration: 0.38,
          stagger: {
            from: 'random',
            amount: 0.45,
          },
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
            if (categoryHud) gsap.set(categoryHud, { display: 'none' })
          },
        },
        '-=0.16'
      )

      return () => {
        tl.kill()
        if (wipeOverlay) gsap.set(wipeOverlay, { display: 'none', pointerEvents: 'none' })
        if (pixelOverlay) gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
        if (categoryHud) gsap.set(categoryHud, { display: 'none' })
      }
    }

    // Kill any ongoing animation timeline immediately to prevent race conditions
    if (tlRef.current) {
      tlRef.current.kill()
      if (wipeOverlayRef.current) gsap.set(wipeOverlayRef.current, { display: 'none', pointerEvents: 'none' })
      if (pixelOverlayRef.current) gsap.set(pixelOverlayRef.current, { display: 'none', pointerEvents: 'none' })
      if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none' })
      if (categoryHudRef.current) gsap.set(categoryHudRef.current, { display: 'none' })
    }

    // 2. Returning back from a detail page to its OWN parent list -> NO TRANSITION
    //    This covers /events/:id → /events (with or without ?category query)
    const parentOfFrom = getParentRoute(from)
    const isReturningToOwnParent = isDetailPage(from) && parentOfFrom === cleanTo
    if (isReturningToOwnParent) {
      if (wipeOverlayRef.current) gsap.set(wipeOverlayRef.current, { display: 'none', pointerEvents: 'none' })
      if (pixelOverlayRef.current) gsap.set(pixelOverlayRef.current, { display: 'none', pointerEvents: 'none' })
      if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none' })
      if (categoryHudRef.current) gsap.set(categoryHudRef.current, { display: 'none' })

      prevPathRef.current = to
      prevSearchRef.current = nextSearch
      setDisplayChildren(children)
      window.scrollTo(0, 0)
      return
    }

    prevPathRef.current = to
    prevSearchRef.current = nextSearch

    // 3. Navigating INTO a Detail Page (e.g. /events -> /events/:id or between /events/:id pages)
    // -> CLEAN WIPE TO PIXEL — NO TEXT/NAME (just the transition effect)
    if (isDetailPage(to)) {
      const meta = getPageMeta(to)
      setPixelMeta(meta)

      // Single consistent color: keep the exact same color across Wipe AND Pixels
      const curtainColor = meta.panelColor || getRouteMeta(to).panelColor || getRouteMeta(from).panelColor || '#c2410c'
      setTransitionColor(curtainColor)

      const wipeOverlay = wipeOverlayRef.current
      const wipePanel = wipePanelRef.current
      const wipeHud = wipeHudRef.current
      const wipeEdge = wipeEdgeRef.current
      const pixelOverlay = pixelOverlayRef.current
      const currentTiles = tileRefs.current.slice(0, tileCount).filter(Boolean)

      if (!wipeOverlay || !wipePanel || !pixelOverlay || currentTiles.length === 0) {
        setDisplayChildren(latestChildrenRef.current)
        window.scrollTo(0, 0)
        return
      }

      // Hide ALL HUDs — this is a clean, no-text transition
      if (wipeHud) gsap.set(wipeHud, { display: 'none', opacity: 0 })
      if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none', opacity: 0 })
      if (categoryHudRef.current) gsap.set(categoryHudRef.current, { display: 'none', opacity: 0 })
      if (wipeEdge) gsap.set(wipeEdge, { opacity: 1 })

      // Keep exact same color on both Wipe and Pixels
      gsap.set(wipePanel, { backgroundColor: curtainColor })
      gsap.set(currentTiles, { backgroundColor: curtainColor, outlineColor: curtainColor, scale: 1, opacity: 1 })

      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(wipeOverlay, { display: 'flex', pointerEvents: 'auto' })
          gsap.set(wipePanel, { xPercent: -100, backgroundColor: curtainColor })
          gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
          gsap.set(currentTiles, { scale: 1, opacity: 1, backgroundColor: curtainColor, outlineColor: curtainColor })
        },
      })
      tlRef.current = tl

      // Phase 1: WIPE COVER — Solid curtain sweeps in from left with laser leading line
      tl.to(wipePanel, {
        xPercent: 0,
        duration: 0.40,
        ease: 'power3.inOut',
        onComplete: () => {
          // Content swaps while screen is 100% covered by the curtain
          setDisplayChildren(latestChildrenRef.current)
          window.scrollTo(0, 0)
        },
      })
      // Phase 2: Seamless handoff from Wipe cover to Pixel tiles (exact same color)
      .add(() => {
        gsap.set(wipeOverlay, { display: 'none', pointerEvents: 'none' })
        gsap.set(pixelOverlay, { display: 'flex', pointerEvents: 'none' })
        gsap.set(currentTiles, { scale: 1, opacity: 1, backgroundColor: curtainColor, outlineColor: curtainColor })
      }, '+=0.06')
      // Phase 3: PIXELS REVEAL — 2 cm square pixel boxes randomly dissolve out across the screen
      .to(
        currentTiles,
        {
          scale: 0,
          opacity: 0,
          duration: 0.34,
          stagger: {
            from: 'random',
            amount: 0.40,
          },
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
          },
        },
        '-=0.02'
      )

      return () => {
        tl.kill()
        if (wipeOverlay) gsap.set(wipeOverlay, { display: 'none', pointerEvents: 'none' })
        if (pixelOverlay) gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
      }
    }

    // 4. Navigating between Main Top-Level Pages -> FULL-SCREEN WIPE TRANSITION
    const meta = getRouteMeta(to)
    setWipeMeta(meta)
    setTransitionColor(meta.panelColor)

    const wipeOverlay = wipeOverlayRef.current
    const wipePanel = wipePanelRef.current
    const wipeHud = wipeHudRef.current
    const wipeEdge = wipeEdgeRef.current

    if (!wipeOverlay || !wipePanel) {
      setDisplayChildren(latestChildrenRef.current)
      window.scrollTo(0, 0)
      return
    }

    if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none' })
    if (categoryHudRef.current) gsap.set(categoryHudRef.current, { display: 'none' })

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(wipeOverlay, { display: 'flex', pointerEvents: 'auto' })
        gsap.set(wipePanel, { xPercent: -100, backgroundColor: meta.panelColor })
        if (wipeEdge) gsap.set(wipeEdge, { opacity: 1 })
        if (wipeHud) gsap.set(wipeHud, { display: 'flex', opacity: 0, x: 50 })
        if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none' })
      },
    })
    tlRef.current = tl

    // Step 1: Wipe panel slides in from left
    tl.to(wipePanel, {
      xPercent: 0,
      duration: 0.45,
      ease: 'power3.inOut',
    })
    // Step 2: Bold destination label slides in + swap page route content behind wipe
    .to(
      wipeHud,
      {
        opacity: 1,
        x: 0,
        duration: 0.30,
        ease: 'power2.out',
        onStart: () => {
          setDisplayChildren(latestChildrenRef.current)
          window.scrollTo(0, 0)
        },
      },
      '-=0.14'
    )
    // Step 3: Brief readable hold
    .to({}, { duration: 0.36 })
    // Step 4: Fade HUD out
    .to(wipeHud, {
      opacity: 0,
      x: -25,
      duration: 0.20,
      ease: 'power2.in',
    })
    // Step 5: Wipe slides out to the right
    .to(
      wipePanel,
      {
        xPercent: 100,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(wipeOverlay, { display: 'none', pointerEvents: 'none' })
          gsap.set(wipePanel, { xPercent: -100 })
        },
      },
      '-=0.10'
    )

    return () => {
      tl.kill()
      if (wipeOverlay) gsap.set(wipeOverlay, { display: 'none', pointerEvents: 'none' })
      if (detailHudRef.current) gsap.set(detailHudRef.current, { display: 'none' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, tileCount, gridDimensions])

  return (
    <>
      {/* ─── FULL-SCREEN LEFT-TO-RIGHT WIPE OVERLAY ─── */}
      <div
        ref={wipeOverlayRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Wipe panel — solid accent color fill (exact same color as pixel tiles) */}
        <div
          ref={wipePanelRef}
          className="absolute inset-0"
          style={{ backgroundColor: transitionColor }}
        >
          {/* Glowing white right-edge leading line (only for top-level wipe) */}
          <div
            ref={wipeEdgeRef}
            className="absolute top-0 right-0 w-[4px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), #ffffff, rgba(255,255,255,0.6), transparent)',
              boxShadow: '0 0 28px 8px rgba(255,255,255,0.55)',
            }}
          />

          {/* Bottom-right destination label — Space Grotesk (only shown for Mode 4 top-level wipe) */}
          <div
            ref={wipeHudRef}
            className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 lg:bottom-16 lg:right-16 flex flex-col items-end gap-3 select-none pointer-events-none text-right"
            style={{ opacity: 0 }}
          >
            <span
              className="font-pixel text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{ color: wipeMeta.accent }}
            >
              SYMBIOSIS QUANTUM CLUB ✦ NAVIGATING
            </span>

            <span
              className="inline-block font-display font-extrabold uppercase select-none"
              style={{
                fontSize: 'clamp(4.5rem, 11vw, 10rem)',
                backgroundImage: wipeMeta.textGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                paddingBottom: '0.25em',
                marginBottom: '-0.25em',
                paddingRight: '0.08em',
                filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.4))',
              }}
            >
              {wipeMeta.label}
            </span>
          </div>
        </div>
      </div>

      {/* ─── FULL-SCREEN PIXEL MOSAIC OVERLAY (2 CM SQUARE BOXES) ─── */}
      <div
        ref={pixelOverlayRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden flex items-center justify-center"
        aria-hidden="true"
      >
        {/* Tiled 2 cm Square Pixel Grid */}
        <div
          className="grid pointer-events-none"
          style={{
            gridTemplateColumns: `repeat(${gridDimensions.cols}, 2cm)`,
            gridTemplateRows: `repeat(${gridDimensions.rows}, 2cm)`,
            width: `${gridDimensions.cols * 2}cm`,
            height: `${gridDimensions.rows * 2}cm`,
          }}
        >
          {tiles.map((id) => (
            <div
              key={id}
              ref={(el) => (tileRefs.current[id] = el)}
              style={{
                width: '2cm',
                height: '2cm',
                backgroundColor: transitionColor,
                outline: `1px solid ${transitionColor}`,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>

      </div>

      {/* ─── DETAIL HUD OVERLAY (kept for potential future use, hidden by default) ─── */}
      <div
        ref={detailHudRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[100000] pointer-events-none select-none overflow-hidden flex flex-col items-center justify-center p-6 text-center"
        aria-hidden="true"
      />

      {/* ─── CATEGORY HUD OVERLAY (Category name at bottom-right during category filter transitions) ─── */}
      <div
        ref={categoryHudRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[100000] pointer-events-none select-none overflow-hidden flex items-end justify-end p-8 sm:p-12 lg:p-16"
        aria-hidden="true"
      >
        <div className="flex flex-col items-end gap-2 text-right">
          {/* Eyebrow */}
          <span
            className="font-pixel text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-white/60"
          >
            SYMBIOSIS QUANTUM CLUB ✦ CATEGORY
          </span>

          {/* Category Name — Giant hero display at bottom-right */}
          <span
            className="font-display font-black uppercase leading-[0.92] tracking-tight text-white select-none"
            style={{
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              textShadow: '0 0 50px rgba(249,115,22,0.45), 0 4px 28px rgba(0,0,0,0.85)',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
            }}
          >
            {categoryDisplayName}
          </span>

          {/* Telemetry bars */}
          <div className="mt-2 flex items-center gap-1.5">
            {[32, 20, 12, 6].map((w, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  width: w,
                  height: 3,
                  backgroundColor: '#f97316',
                  opacity: [1, 0.6, 0.35, 0.15][i],
                  boxShadow: i === 0 ? '0 0 10px #f97316' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── MOUNTED PAGE CONTENT ─── */}
      <div className="w-full min-h-screen">
        {displayChildren}
      </div>
    </>
  )
}
