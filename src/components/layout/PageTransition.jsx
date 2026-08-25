import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Page identity mapping
const PAGE_DATA = {
  '/': { name: 'HOME', color: '#c084fc', gradient: 'linear-gradient(90deg, #c084fc, #ec4899)' },
  '/events': { name: 'EVENTS', color: '#f97316', gradient: 'linear-gradient(90deg, #ef4444, #f59e0b)' },
  '/blog': { name: 'BLOG', color: '#34d399', gradient: 'linear-gradient(90deg, #34d399, #10b981)' },
  '/team': { name: 'TEAM', color: '#06b6d4', gradient: 'linear-gradient(90deg, #06b6d4, #38bdf8)' },
  '/fallfest': { name: 'FALL FEST 2026', color: '#a855f7', gradient: 'linear-gradient(90deg, #a855f7, #d946ef)' },
}

export default function PageTransition({ children }) {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)
  const isFirstMount = useRef(true)

  const columnsRef = useRef([])
  const overlayRef = useRef(null)
  const hudRef = useRef(null)
  const contentRef = useRef(null)

  const [displayChildren, setDisplayChildren] = useState(children)

  const pageInfo = PAGE_DATA[location.pathname] || {
    name: location.pathname.replace('/', '').toUpperCase() || 'QUANTUM',
    color: '#c084fc',
    gradient: 'linear-gradient(90deg, #c084fc, #38bdf8)',
  }

  useEffect(() => {
    // Skip animation on initial page load (preloader handles initial entrance)
    if (isFirstMount.current) {
      isFirstMount.current = false
      prevPathRef.current = location.pathname
      setDisplayChildren(children)
      return
    }

    if (prevPathRef.current === location.pathname) {
      setDisplayChildren(children)
      return
    }

    prevPathRef.current = location.pathname

    const cols = columnsRef.current.filter(Boolean)
    const overlay = overlayRef.current
    const hud = hudRef.current
    const content = contentRef.current

    if (!overlay || cols.length === 0) {
      setDisplayChildren(children)
      window.scrollTo(0, 0)
      return
    }

    // Master Quantum Shutter GSAP Timeline with extended cinematic delay & presence
    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(overlay, { display: 'flex', pointerEvents: 'auto' })
      },
    })

    // Step 1: Staggered drop of 5 vertical quantum shutter blades from top
    tl.set(cols, { yPercent: -100 })
      .to(cols, {
        yPercent: 0,
        duration: 0.55,
        stagger: 0.065,
        ease: 'power3.inOut',
      })
      // Step 2: Show the Quantum State Telemetry Badge in center with extended readable hold
      .fromTo(
        hud,
        { opacity: 0, scale: 0.86, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.38,
          ease: 'power2.out',
          onStart: () => {
            // Swap child route content while behind shutter curtain
            setDisplayChildren(children)
            window.scrollTo(0, 0)
          },
        },
        '-=0.15'
      )
      .to(hud, {
        opacity: 0,
        scale: 1.08,
        filter: 'blur(8px)',
        duration: 0.28,
        delay: 0.75, // Extended comfortable hold delay
        ease: 'power2.in',
      })
      // Step 3: Staggered exit of 5 shutter blades sliding down & off screen
      .to(
        cols,
        {
          yPercent: 100,
          duration: 0.58,
          stagger: 0.065,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.set(overlay, { display: 'none', pointerEvents: 'none' })
            gsap.set(cols, { yPercent: -100 })
          },
        },
        '-=0.12'
      )
      // Step 4: Smooth entrance for the newly mounted page content
      .fromTo(
        content,
        { opacity: 0.5, y: 24, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.35'
      )

    return () => {
      tl.kill()
    }
  }, [location.pathname, children])

  return (
    <>
      {/* Interactive 5-Column Quantum Shutter Overlay */}
      <div
        ref={overlayRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[9999] flex flex-row pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* 5 Vertical Obsidian Shutter Columns */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`col-${i}`}
            ref={(el) => (columnsRef.current[i] = el)}
            className="w-1/5 h-full bg-[#080511] relative border-r border-white/[0.04] flex flex-col justify-end"
          >
            {/* Glowing Neon Leading Edge at Bottom of each blade */}
            <div
              className="w-full h-[3px] shadow-[0_0_15px_rgba(168,85,247,0.9)]"
              style={{ background: pageInfo.gradient }}
            />
          </div>
        ))}

        {/* Central Quantum State HUD Badge */}
        <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
          <div
            ref={hudRef}
            className="flex flex-col items-center gap-3 p-6 sm:p-8 rounded-2xl bg-[#100b1e]/95 border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ background: pageInfo.color }}
              />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-slate-300 uppercase">
                ✦ QUANTUM STATE COLLAPSE ✦
              </span>
            </div>

            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <span>ENTERING: </span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: pageInfo.gradient }}
              >
                |{pageInfo.name}⟩
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[10px] sm:text-xs text-slate-400 border-t border-white/10 pt-3">
              <span>|ψ(t)⟩ = e^(-iHt/ℏ)|ψ(0)⟩</span>
              <span className="text-emerald-400 font-semibold">T₁ Coherence: OK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Mounted Content */}
      <div ref={contentRef} className="w-full min-h-screen">
        {displayChildren}
      </div>
    </>
  )
}
