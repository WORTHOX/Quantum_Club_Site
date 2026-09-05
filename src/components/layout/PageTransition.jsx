import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import events from '../../data/events'
import blogData from '../../data/blog.json'

/* ─── Detect if route is a "detail" page ─── */
export const isDetailPage = (pathname) =>
  /^\/events\/[^?#/]+/.test(pathname) || /^\/blog\/[^?#/]+/.test(pathname)

/* ─── Build overlay metadata from destination pathname ─── */
export const getPageMeta = (pathname) => {
  if (/^\/events\/.+/.test(pathname)) {
    const rawId = pathname.replace('/events/', '').split(/[?#]/)[0]
    const event = events.find(e => e.id === rawId || e.slug === rawId)
    let accent = '#f97316'
    if (event?.category === 'Workshop')       accent = '#10b981'
    if (event?.category === 'Fall Fest')      accent = '#38bdf8'
    if (event?.category === 'Induction')      accent = '#ec4899'
    if (event?.category === 'Industrial Visit') accent = '#f59e0b'
    return {
      title: event ? event.title.toUpperCase() : rawId.replace(/-/g, ' ').toUpperCase(),
      subtitle: event?.subtitle || 'SYMBIOSIS QUANTUM CLUB ✦ EVENT',
      accent,
      type: 'EVENT',
    }
  }
  if (/^\/blog\/.+/.test(pathname)) {
    const rawId = pathname.replace('/blog/', '').split(/[?#]/)[0]
    const post = blogData.find(p => p.id === rawId || p.slug === rawId)
    return {
      title: post ? post.title.toUpperCase() : rawId.replace(/-/g, ' ').toUpperCase(),
      subtitle: post?.category ? `${post.category.toUpperCase()} ✦ RESEARCH PUBLICATION` : 'QUANTUM JOURNAL',
      accent: '#34d399',
      type: 'ARTICLE',
    }
  }
  return { title: 'QUANTUM', subtitle: 'SYMBIOSIS QUANTUM CLUB', accent: '#10b981', type: 'PAGE' }
}

/* ─── 12 × 8 CSS pixel tile grid overlay ─── */
const COLS = 12
const ROWS = 8
const TILES = []
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    TILES.push({ id: `${c}-${r}`, c, r, waveIn: c + r, waveOut: (COLS - 1 - c) + (ROWS - 1 - r) })
  }
}
const MAX_WAVE_IN  = (COLS - 1) + (ROWS - 1)
const MAX_WAVE_OUT = MAX_WAVE_IN

/* ─── Overlay visual component ─── */
function PixelOverlay({ visible, exiting, meta }) {
  if (!visible && !exiting) return null
  const { title, subtitle, accent, type } = meta
  const isCovered = visible && !exiting

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Tiled pixel grid */}
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
      >
        {TILES.map((tile) => {
          const delay = isCovered
            ? `${(tile.waveIn  / MAX_WAVE_IN  * 0.28).toFixed(3)}s`
            : `${(tile.waveOut / MAX_WAVE_OUT * 0.24).toFixed(3)}s`
          return (
            <div
              key={tile.id}
              style={{
                backgroundColor: '#070a08',
                border: `1px solid ${accent}14`,
                transform: isCovered ? 'scale(1)' : 'scale(0)',
                opacity: isCovered ? 1 : 0,
                transition: `transform 0.18s cubic-bezier(.2,.9,.3,1) ${delay}, opacity 0.16s ease ${delay}`,
                willChange: 'transform, opacity',
              }}
            />
          )
        })}
      </div>

      {/* Text content — fades in after tiles cover the screen */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        style={{
          opacity: isCovered ? 1 : 0,
          transform: isCovered ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transition: isCovered
            ? 'opacity 0.3s ease 0.22s, transform 0.35s cubic-bezier(.16,1,.3,1) 0.2s'
            : 'opacity 0.18s ease, transform 0.2s ease',
          zIndex: 10,
        }}
      >
        {/* Pill eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
          style={{
            backgroundColor: `${accent}15`,
            borderColor: `${accent}45`,
            boxShadow: `0 0 18px ${accent}20`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: accent }}
          />
          <span
            className="font-mono text-[0.65rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            SYMBIOSIS QUANTUM CLUB ✦ {type}
          </span>
        </div>

        {/* Main title — Blackhood/Lilita One style */}
        <h2
          className="m-0 uppercase leading-none"
          style={{
            fontFamily: "'Lilita One', 'Dela Gothic One', 'Rubik Mono One', Impact, sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
            color: '#fffdfa',
            maxWidth: '1100px',
            padding: '0 1rem',
            letterSpacing: '-0.01em',
            textShadow: `3px 3px 0 ${accent}, 6px 6px 0 #030504, 0 0 60px ${accent}55`,
            WebkitTextStroke: `1px rgba(255,255,255,0.12)`,
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          className="mt-3 m-0 font-mono text-xs font-semibold uppercase tracking-[0.18em] max-w-[65ch]"
          style={{ color: '#64748b', letterSpacing: '0.18em' }}
        >
          {subtitle}
        </p>

        {/* Pixel bar */}
        <div className="mt-6 flex items-center gap-2">
          {[32, 20, 14, 8].map((w, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                width: w, height: 6,
                backgroundColor: accent,
                opacity: [1, 0.75, 0.5, 0.25][i],
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   PageTransition
   ────────────────────────────────────────────────────────────────────────
   Architecture:
   - `displayChildren` holds the content that is CURRENTLY SHOWN.
   - `pendingRef` holds the incoming children waiting behind the overlay.
   - Phase sequence: idle → enter (tiles cascade in) → swap (children swap)
     → exit (tiles cascade out) → idle
   - Effect only depends on `location.pathname` — NO `children` dependency!
   - Children are captured into a ref at effect time so they don't cause
     a stale-closure problem.
   ───────────────────────────────────────────────────────────────────────── */
export default function PageTransition({ children }) {
  const location = useLocation()

  // What's actually rendered in the DOM
  const [displayChildren, setDisplayChildren] = useState(children)

  // Overlay state
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayExiting, setOverlayExiting] = useState(false)
  const [overlayMeta, setOverlayMeta] = useState(() => getPageMeta(location.pathname))

  // Refs — no re-renders needed
  const prevPathRef    = useRef(location.pathname)
  const isFirstMount   = useRef(true)
  const pendingRef     = useRef(null)  // incoming children, captured immediately
  const childrenRef    = useRef(children) // always-fresh mirror of latest children prop

  // Keep childrenRef in sync with latest children WITHOUT triggering the effect
  childrenRef.current = children

  useEffect(() => {
    // Skip very first mount — just display current children
    if (isFirstMount.current) {
      isFirstMount.current = false
      prevPathRef.current = location.pathname
      return
    }

    const from = prevPathRef.current
    const to   = location.pathname

    // No actual path change (search/hash update only)
    if (from === to) {
      setDisplayChildren(childrenRef.current)
      return
    }

    prevPathRef.current = to

    if (isDetailPage(to)) {
      // Capture the incoming children RIGHT NOW before any async state update
      pendingRef.current = childrenRef.current
      setOverlayMeta(getPageMeta(to))

      // ①  Show overlay — tiles cascade IN
      setOverlayVisible(true)
      setOverlayExiting(false)

      // ②  Swap page content mid-transition (tiles are covering the screen ~0.30s)
      const swapTimer = setTimeout(() => {
        setDisplayChildren(pendingRef.current)
        window.scrollTo(0, 0)
      }, 310)

      // ③  Hold briefly then start exit — tiles cascade OUT
      const exitTimer = setTimeout(() => {
        setOverlayExiting(true)
        setOverlayVisible(false)
      }, 420)

      // ④  Fully reset overlay after animation completes (~0.38s after exit start)
      const idleTimer = setTimeout(() => {
        setOverlayExiting(false)
      }, 820)

      return () => {
        clearTimeout(swapTimer)
        clearTimeout(exitTimer)
        clearTimeout(idleTimer)
      }
    } else {
      // Back navigation — instant, no overlay
      setDisplayChildren(childrenRef.current)
      setOverlayVisible(false)
      setOverlayExiting(false)
      window.scrollTo(0, 0)
    }
    // ⚠️ ONLY depend on location.pathname — NOT children!
    // children are read from childrenRef.current inside the callback
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PixelOverlay
        visible={overlayVisible}
        exiting={overlayExiting}
        meta={overlayMeta}
      />
      <div className="w-full min-h-screen">
        {displayChildren}
      </div>
    </>
  )
}
