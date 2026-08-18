import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Preloader = ({ onDone }) => {
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const [display, setDisplay] = useState('000')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const obj = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        if (rootRef.current) {
          gsap.to(rootRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'expo.inOut',
            onComplete: () => {
              document.body.style.overflow = ''
              onDone && onDone()
            },
          })
        } else {
          document.body.style.overflow = ''
          onDone && onDone()
        }
      },
    })

    tl.to(obj, {
      v: 100,
      duration: 2.6,
      ease: 'power3.inOut',
      onUpdate: () => {
        const v = Math.round(obj.v)
        // Always 3 digits: 000 → 001 → ... → 100
        setDisplay(String(v).padStart(3, '0'))
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`
      },
    })
    tl.to({}, { duration: 0.3 })

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [onDone])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[99999] flex flex-col justify-between p-8 md:p-12 lg:p-14 select-none overflow-hidden"
      style={{ background: '#0a0908' }}
      aria-label="Loading Symbiosis Quantum Club"
      role="status"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase text-[rgba(239,231,214,0.6)]">
        <span>Symbiosis Quantum Club</span>
        <span className="hidden md:inline">A Decade of Quantum ✦ 2016 — 2026</span>
      </div>

      {/* Bottom Lockup */}
      <div className="flex flex-col items-start gap-4 md:gap-5 w-full">
        {/* 3-digit counter with tabular-nums so width never shifts */}
        <div className="flex items-baseline gap-2 sm:gap-3 leading-none">
          <span
            className="text-[clamp(5.5rem,17vw,13.5rem)] leading-[0.85] text-[#efe7d6] font-normal"
            style={{
              fontFamily: "'Playfair Display', 'Didot', 'Bodoni MT', Georgia, serif",
              fontVariantNumeric: 'tabular-nums',
              fontFeatureSettings: '"tnum"',
              letterSpacing: '0.01em',
            }}
          >
            {display}
          </span>
          <span
            className="text-sm sm:text-base text-[#d97706] font-semibold font-mono mb-1"
          >
            %
          </span>
        </div>

        {/* Full-width horizontal progress bar */}
        <div className="w-full h-[1px] bg-[rgba(239,231,214,0.18)] relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left"
            style={{ background: '#d97706', transform: 'scaleX(0)' }}
          />
        </div>

        {/* Bottom metadata */}
        <div className="flex items-center justify-between w-full font-mono text-[11px] tracking-[0.25em] uppercase text-[rgba(239,231,214,0.55)] pt-0.5">
          <span>Loading Superposition</span>
          <span>Qiskit ▪ IBM Cloud</span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
