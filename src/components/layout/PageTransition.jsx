import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Page identity mapping — color is the wipe panel bg, label is bottom-right text
const PAGE_DATA = {
  '/':         { label: 'HOME',         bg: '#0d0b1a', accent: '#c084fc' },
  '/events':   { label: 'QUANT EVENTS', bg: '#0f0a04', accent: '#f97316' },
  '/blog':     { label: 'QUANT BLOGS',  bg: '#040f0a', accent: '#34d399' },
  '/team':     { label: 'OUR TEAM',     bg: '#040b0f', accent: '#06b6d4' },
  '/fallfest': { label: 'FALL FEST',    bg: '#0d0718', accent: '#a855f7' },
}

export default function PageTransition({ children }) {
  const location = useLocation()
  const prevPathRef   = useRef(location.pathname)
  const isFirstMount  = useRef(true)

  const wipeRef    = useRef(null)
  const overlayRef = useRef(null)
  const labelRef   = useRef(null)
  const contentRef = useRef(null)

  const [displayChildren, setDisplayChildren] = useState(children)

  // Derive page info from the pathname we're navigating TO
  const pageInfo = PAGE_DATA[location.pathname] || {
    label: location.pathname.replace('/', '').toUpperCase() || 'QUANTUM',
    bg: '#07040d',
    accent: '#c084fc',
  }

  useEffect(() => {
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

    const wipe    = wipeRef.current
    const overlay = overlayRef.current
    const label   = labelRef.current
    const content = contentRef.current

    if (!overlay || !wipe) {
      setDisplayChildren(children)
      window.scrollTo(0, 0)
      return
    }

    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(overlay, { display: 'flex', pointerEvents: 'auto' })
      },
    })

    // Step 1: Wipe slides in from left
    tl.set(wipe,  { xPercent: -100 })
      .set(label, { opacity: 0, x: 40 })
      .to(wipe, {
        xPercent: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      // Step 2: Label fades + slides in from right edge
      .to(
        label,
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: 'power2.out',
          onStart: () => {
            setDisplayChildren(children)
            window.scrollTo(0, 0)
          },
        },
        '-=0.05'
      )
      // Step 3: Hold briefly, then exit wipe to the right
      .to(label, { opacity: 0, x: -30, duration: 0.22, ease: 'power2.in' }, '+=0.55')
      .to(
        wipe,
        {
          xPercent: 100,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.set(overlay, { display: 'none', pointerEvents: 'none' })
            gsap.set(wipe,    { xPercent: -100 })
          },
        },
        '-=0.08'
      )
      // Step 4: Soft entrance for new page content
      .fromTo(
        content,
        { opacity: 0.6, y: 16 },
        { opacity: 1,   y: 0, duration: 0.42, ease: 'power2.out' },
        '-=0.3'
      )

    return () => { tl.kill() }
  }, [location.pathname, children])

  return (
    <>
      {/* Full-screen left-to-right wipe overlay */}
      <div
        ref={overlayRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Wipe panel — colour matches destination page */}
        <div
          ref={wipeRef}
          className="absolute inset-0"
          style={{ background: pageInfo.bg }}
        >
          {/* Glowing right-edge leading line */}
          <div
            className="absolute top-0 right-0 w-[2px] h-full"
            style={{
              background: pageInfo.accent,
              boxShadow: `0 0 20px 4px ${pageInfo.accent}88`,
            }}
          />
        </div>

        {/* Bottom-right destination label */}
        <div
          ref={labelRef}
          className="absolute bottom-8 right-10 flex flex-col items-end select-none"
          style={{ opacity: 0 }}
        >
          {/* Layer 1 — large hollow outline text (behind) */}
          <span
            className="font-display font-black italic uppercase leading-none pointer-events-none"
            style={{
              fontSize: 'clamp(6rem, 12vw, 11rem)',
              color: 'transparent',
              WebkitTextStroke: `2.5px ${pageInfo.accent}55`,
              lineHeight: 1,
              userSelect: 'none',
              transform: 'scaleX(0.72)',
              transformOrigin: 'right center',
              display: 'block',
            }}
          >
            {pageInfo.label}
          </span>

          {/* Layer 2 — filled text shifted up to overlap the outline */}
          <span
            className="font-display font-black italic uppercase leading-none pointer-events-none"
            style={{
              fontSize: 'clamp(6rem, 12vw, 11rem)',
              color: pageInfo.accent,
              WebkitTextStroke: `7px ${pageInfo.accent}`,
              marginTop: 'clamp(-5.5rem, -11vw, -10rem)',
              paddingRight: 'clamp(1.2rem, 2.5vw, 2.2rem)',
              lineHeight: 1,
              userSelect: 'none',
              transform: 'scaleX(0.72)',
              transformOrigin: 'right center',
              display: 'block',
            }}
          >
            {pageInfo.label}
          </span>
        </div>
      </div>

      {/* Main page content */}
      <div ref={contentRef} className="w-full min-h-screen">
        {displayChildren}
      </div>
    </>
  )
}
