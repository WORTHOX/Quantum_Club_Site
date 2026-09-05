import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import events from '../../data/events'
import blogData from '../../data/blog.json'

/* ─── Detect if route is a "detail" page (events/:id or blog/:id) ─── */
export const isDetailPage = (pathname) =>
  /^\/events\/[^?#/]+/.test(pathname) || /^\/blog\/[^?#/]+/.test(pathname)

/* ─── Get the parent list route for a detail page ─── */
/* e.g. /blog/some-post → /blog  |  /events/my-event → /events */
const getParentRoute = (pathname) => {
  if (/^\/events\//.test(pathname)) return '/events'
  if (/^\/blog\//.test(pathname)) return '/blog'
  return null
}

/* ─── Destination metadata for Content Detail Cards (Pixel Transition) ─── */
export const getPageMeta = (pathname) => {
  if (/^\/events\/.+/.test(pathname)) {
    const rawId = pathname.replace('/events/', '').split(/[?#]/)[0]
    const event = events.find((e) => e.id === rawId || e.slug === rawId)
    let accent = '#f97316'
    if (event?.category === 'Workshop') accent = '#10b981'
    if (event?.category === 'Fall Fest') accent = '#38bdf8'
    if (event?.category === 'Induction') accent = '#ec4899'
    if (event?.category === 'Industrial Visit') accent = '#f59e0b'
    return {
      title: event ? event.title.toUpperCase() : rawId.replace(/-/g, ' ').toUpperCase(),
      subtitle: event?.subtitle || event?.dateDisplay || 'SYMBIOSIS QUANTUM CLUB ✦ EVENT',
      accent,
      type: 'EVENT',
    }
  }
  if (/^\/blog\/.+/.test(pathname)) {
    const rawId = pathname.replace('/blog/', '').split(/[?#]/)[0]
    const post = blogData.find((p) => p.id === rawId || p.slug === rawId)
    return {
      title: post ? post.title.toUpperCase() : rawId.replace(/-/g, ' ').toUpperCase(),
      subtitle: post?.category ? `${post.category.toUpperCase()} ✦ RESEARCH PUBLICATION` : 'QUANTUM JOURNAL',
      accent: '#34d399',
      type: 'ARTICLE',
    }
  }
  return { title: 'QUANTUM', subtitle: 'SYMBIOSIS QUANTUM CLUB', accent: '#10b981', type: 'PAGE' }
}

/* ─── Metadata for Top-Level Navigation Pages (Wipe Transition) ─── */
export const ROUTE_DATA = {
  '/': {
    label: 'HOME',
    // Rich, balanced violet tone (slightly lighter)
    panelColor: '#6b21a8',
    // Brilliant gradient fill inside text
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #e879f9 45%, #c084fc 100%)',
    accent: '#a855f7',
  },
  '/events': {
    label: 'QUANT EVENTS',
    // Rich, balanced burnt orange tone (slightly lighter)
    panelColor: '#c2410c',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #fed7aa 40%, #fb923c 100%)',
    accent: '#f97316',
  },
  '/blog': {
    label: 'QUANT BLOGS',
    // Rich, balanced quantum emerald tone (slightly lighter)
    panelColor: '#047857',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #a7f3d0 40%, #34d399 100%)',
    accent: '#10b981',
  },
  '/team': {
    label: 'TEAM',
    // Rich, balanced deep cyan tone (slightly lighter)
    panelColor: '#0e7490',
    textGradient: 'linear-gradient(135deg, #ffffff 0%, #bae6fd 40%, #38bdf8 100%)',
    accent: '#06b6d4',
  },
  '/fallfest': {
    label: 'FALL FEST',
    // Rich, balanced purple tone (slightly lighter)
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

/* ─── 12 × 8 CSS Grid Pixel Tiles ─── */
const COLS = 12
const ROWS = 8
const TILES = Array.from({ length: ROWS * COLS }, (_, i) => ({
  id: i,
  row: Math.floor(i / COLS),
  col: i % COLS,
}))

/* ─────────────────────────────────────────────────────────────────────────
   PageTransition Component
   - Mode A: Wipe Transition (Navigating between main site pages)
   - Mode B: Pixel Transition (Clicking into content card: /events/:id or /blog/:id)
   - Mode C: No Transition (Returning from detail card back to list/cards)
   - Font: "Lilita One" / "Dela Gothic One" (Blackhood chunky display typeface)
   ───────────────────────────────────────────────────────────────────────── */
export default function PageTransition({ children }) {
  const location = useLocation()

  // displayChildren holds what is currently visible in the DOM
  const [displayChildren, setDisplayChildren] = useState(children)

  // Overlay metadata states
  const [wipeMeta, setWipeMeta] = useState(() => getRouteMeta(location.pathname))
  const [pixelMeta, setPixelMeta] = useState(() => getPageMeta(location.pathname))

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

  // Pixel overlay refs
  const pixelOverlayRef = useRef(null)
  const pixelHudRef = useRef(null)
  const tileRefs = useRef([])

  useEffect(() => {
    // Skip animation on initial page load (preloader handles initial entrance)
    if (isFirstMount.current) {
      isFirstMount.current = false
      prevPathRef.current = location.pathname
      prevSearchRef.current = location.search
      setDisplayChildren(children)
      return
    }

    const from = prevPathRef.current
    const to = location.pathname
    const prevSearch = prevSearchRef.current
    const nextSearch = location.search

    // 1. Same route path AND same query string -> instant update, no animation
    if (from === to && prevSearch === nextSearch) {
      setDisplayChildren(children)
      return
    }

    // 1b. Same pathname but DIFFERENT query string (e.g. ?category filter change)
    // -> Hybrid: wipe panel slides in, content swaps, then pixel tiles cascade out
    if (from === to && prevSearch !== nextSearch) {
      prevSearchRef.current = nextSearch

      // Kill stale animations
      if (tlRef.current) {
        tlRef.current.kill()
        if (wipeOverlayRef.current) gsap.set(wipeOverlayRef.current, { display: 'none', pointerEvents: 'none' })
        if (pixelOverlayRef.current) gsap.set(pixelOverlayRef.current, { display: 'none', pointerEvents: 'none' })
      }

      const wipeOverlay = wipeOverlayRef.current
      const wipePanel = wipePanelRef.current
      const pixelOverlay = pixelOverlayRef.current
      const tiles = tileRefs.current.filter(Boolean)

      if (!wipeOverlay || !wipePanel || !pixelOverlay || tiles.length === 0) {
        setDisplayChildren(latestChildrenRef.current)
        return
      }

      // Use events route meta for the wipe color (always on /events for now)
      const meta = getRouteMeta(to)
      setWipeMeta(meta)

      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(wipeOverlay, { display: 'flex', pointerEvents: 'auto' })
          gsap.set(wipePanel, { xPercent: -100 })
          gsap.set(wipeHudRef.current, { opacity: 0 })
          gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
          gsap.set(tiles, { scale: 1, opacity: 1 })
        },
      })
      tlRef.current = tl

      // Phase 1: wipe panel slides in
      tl.to(wipePanel, {
        xPercent: 0,
        duration: 0.48,
        ease: 'power3.inOut',
        onComplete: () => {
          // Content swaps while wipe is fully covering screen
          setDisplayChildren(latestChildrenRef.current)
          window.scrollTo(0, 0)
          // Switch from wipe to pixel overlay seamlessly
          gsap.set(wipeOverlay, { display: 'none', pointerEvents: 'none' })
          gsap.set(pixelOverlay, { display: 'block', pointerEvents: 'none' })
          gsap.set(tiles, { scale: 1, opacity: 1 })
        },
      })
      // Phase 2: pixel tiles cascade out (dissolve reveal) from center to edges
      .to(
        tiles,
        {
          scale: 0,
          opacity: 0,
          duration: 0.40,
          stagger: {
            grid: [ROWS, COLS],
            from: 'center',
            amount: 0.56,
          },
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
          },
        },
        '+=0.06'
      )

      return () => { tl.kill() }
    }

    // Kill any ongoing animation timeline immediately to prevent race conditions
    if (tlRef.current) {
      tlRef.current.kill()
      if (wipeOverlayRef.current) gsap.set(wipeOverlayRef.current, { display: 'none', pointerEvents: 'none' })
      if (pixelOverlayRef.current) gsap.set(pixelOverlayRef.current, { display: 'none', pointerEvents: 'none' })
    }

    // 2. Returning back from a detail page to its OWN parent list -> NO TRANSITION
    // Only suppress when going /blog/:id → /blog or /events/:id → /events.
    // If the user jumps from a detail page to a DIFFERENT section (e.g. /blog/:id → /team),
    // we DO want the wipe transition to fire.
    const parentOfFrom = getParentRoute(from)
    const isReturningToOwnParent = isDetailPage(from) && parentOfFrom === to
    if (isReturningToOwnParent) {
      prevPathRef.current = to
      setDisplayChildren(latestChildrenRef.current)
      window.scrollTo(0, 0)
      return
    }

    prevPathRef.current = to
    prevSearchRef.current = nextSearch

    // 3. Navigating INTO a Detail Page -> PIXEL MOSAIC TRANSITION
    if (isDetailPage(to)) {
      const meta = getPageMeta(to)
      setPixelMeta(meta)

      const pixelOverlay = pixelOverlayRef.current
      const pixelHud = pixelHudRef.current
      const tiles = tileRefs.current.filter(Boolean)

      if (!pixelOverlay || tiles.length === 0) {
        setDisplayChildren(latestChildrenRef.current)
        window.scrollTo(0, 0)
        return
      }

      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(pixelOverlay, { display: 'block', pointerEvents: 'auto' })
          gsap.set(tiles, { scale: 0, opacity: 0 })
          gsap.set(pixelHud, { opacity: 0, y: 30, scale: 0.94 })
        },
      })
      tlRef.current = tl

      // Cascade pixel blocks in via diagonal wave
      tl.to(tiles, {
        scale: 1,
        opacity: 1,
        duration: 0.32,
        stagger: {
          grid: [ROWS, COLS],
          from: 'start',
          amount: 0.32,
        },
        ease: 'power2.out',
      })
      // Reveal center card HUD in Lilita One chunky font + swap page route behind curtain
      .to(
        pixelHud,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.28,
          ease: 'back.out(1.2)',
          onStart: () => {
            setDisplayChildren(latestChildrenRef.current)
            window.scrollTo(0, 0)
          },
        },
        '-=0.12'
      )
      // Hold briefly for comfortable readability
      .to({}, { duration: 0.38 })
      // Fade HUD out
      .to(pixelHud, {
        opacity: 0,
        y: -20,
        scale: 1.02,
        duration: 0.20,
        ease: 'power2.in',
      })
      // Cascade pixel blocks out to bottom-right
      .to(
        tiles,
        {
          scale: 0,
          opacity: 0,
          duration: 0.26,
          stagger: {
            grid: [ROWS, COLS],
            from: 'end',
            amount: 0.28,
          },
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(pixelOverlay, { display: 'none', pointerEvents: 'none' })
          },
        },
        '-=0.08'
      )

      return () => {
        tl.kill()
      }
    }

    // 4. Navigating between Main Top-Level Pages -> FULL-SCREEN WIPE TRANSITION
    const meta = getRouteMeta(to)
    setWipeMeta(meta)

    const wipeOverlay = wipeOverlayRef.current
    const wipePanel = wipePanelRef.current
    const wipeHud = wipeHudRef.current

    if (!wipeOverlay || !wipePanel) {
      setDisplayChildren(latestChildrenRef.current)
      window.scrollTo(0, 0)
      return
    }

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(wipeOverlay, { display: 'flex', pointerEvents: 'auto' })
        gsap.set(wipePanel, { xPercent: -100 })
        gsap.set(wipeHud, { opacity: 0, x: 50 })
      },
    })
    tlRef.current = tl

    // Step 1: Wipe panel slides in from left
    tl.to(wipePanel, {
      xPercent: 0,
      duration: 0.45,
      ease: 'power3.inOut',
    })
    // Step 2: Bold Lilita One label slides in + swap page route content behind wipe
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
    }
  }, [location.pathname, location.search])

  return (
    <>
      {/* ─── FULL-SCREEN LEFT-TO-RIGHT WIPE OVERLAY (FOR TOP-LEVEL PAGES) ─── */}
      <div
        ref={wipeOverlayRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Wipe panel — solid accent color fill */}
        <div
          ref={wipePanelRef}
          className="absolute inset-0"
          style={{ backgroundColor: wipeMeta.panelColor }}
        >
          {/* Glowing white right-edge leading line */}
          <div
            className="absolute top-0 right-0 w-[4px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), #ffffff, rgba(255,255,255,0.6), transparent)',
              boxShadow: '0 0 28px 8px rgba(255,255,255,0.55)',
            }}
          />

          {/* Bottom-right destination label — thin white border stroke, gradient fill inside text */}
          <div
            ref={wipeHudRef}
            className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 lg:bottom-16 lg:right-16 flex flex-col items-end select-none pointer-events-none text-right"
            style={{ opacity: 0 }}
          >
            {/* Gradient-filled text with thinner white stroke border */}
            <span
              className="italic uppercase font-black leading-none pointer-events-none select-none"
              style={{
                fontFamily: "'Lilita One', 'Dela Gothic One', 'Space Grotesk', Impact, sans-serif",
                fontSize: 'clamp(5.8rem, 13vw, 12rem)',
                // Gradient clipped to text interior
                backgroundImage: wipeMeta.textGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                // Thinner pure white border stroke around each letter
                WebkitTextStroke: '1.5px #ffffff',
                paintOrder: 'stroke fill',
                lineHeight: 0.95,
                userSelect: 'none',
                transform: 'scaleX(0.82)',
                transformOrigin: 'right center',
                display: 'block',
                letterSpacing: '-0.02em',
                paddingRight: 'clamp(0.8rem, 1.8vw, 1.8rem)',
                filter: 'drop-shadow(0 6px 30px rgba(0,0,0,0.5))',
              }}
            >
              {wipeMeta.label}
            </span>
          </div>
        </div>
      </div>

      {/* ─── FULL-SCREEN PIXEL MOSAIC OVERLAY (FOR DETAIL CARDS) ─── */}
      <div
        ref={pixelOverlayRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Tiled 12 × 8 Pixel Grid */}
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {TILES.map((tile) => (
            <div
              key={tile.id}
              ref={(el) => (tileRefs.current[tile.id] = el)}
              className="w-full h-full"
              style={{
                backgroundColor: '#070a08',
                border: `1px solid ${pixelMeta.accent}18`,
                boxShadow: `inset 0 0 10px ${pixelMeta.accent}0a`,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>

        {/* Center HUD for Card Title in Lilita One font */}
        <div
          ref={pixelHudRef}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
        >
          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border backdrop-blur-md"
            style={{
              backgroundColor: `${pixelMeta.accent}18`,
              borderColor: `${pixelMeta.accent}50`,
              boxShadow: `0 0 20px ${pixelMeta.accent}25`,
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: pixelMeta.accent }} />
            <span className="font-mono text-[0.68rem] font-bold tracking-[0.22em] uppercase" style={{ color: pixelMeta.accent }}>
              SYMBIOSIS QUANTUM CLUB ✦ {pixelMeta.type}
            </span>
          </div>

          {/* Detail Title */}
          <h2
            className="m-0 uppercase leading-tight max-w-[950px] px-4"
            style={{
              fontFamily: "'Lilita One', 'Dela Gothic One', 'Rubik Mono One', Impact, sans-serif",
              fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              textShadow: `3px 3px 0 ${pixelMeta.accent}, 7px 7px 0 #030504, 0 0 60px ${pixelMeta.accent}70`,
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)',
            }}
          >
            {pixelMeta.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-3 m-0 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 max-w-[70ch] px-4">
            {pixelMeta.subtitle}
          </p>

          {/* Pixel bar indicator */}
          <div className="mt-6 flex items-center gap-2">
            {[32, 20, 14, 8].map((w, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  width: w,
                  height: 6,
                  backgroundColor: pixelMeta.accent,
                  opacity: [1, 0.75, 0.5, 0.25][i],
                  boxShadow: `0 0 10px ${pixelMeta.accent}`,
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
