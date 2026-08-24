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
            duration: 0.95,
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
      duration: 2.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        const v = Math.round(obj.v)
        // Strictly 3 digits: 000 → 001 → ... → 100
        setDisplay(String(v).padStart(3, '0'))
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`
      },
    })
    tl.to({}, { duration: 0.25 })

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [onDone])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[99999] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 select-none overflow-hidden bg-[#090807]"
      aria-label="Loading Symbiosis Quantum Club"
      role="status"
    >
      {/* Top Bar Header */}
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] md:text-xs tracking-[0.3em] uppercase text-white/50">
        <span>SYMBIOSIS QUANTUM CLUB</span>
        <span className="hidden sm:inline">A DECADE OF QUANTUM ✦ 2016 — 2026</span>
      </div>

      {/* Bottom Area: Grand Serif Counter, Gold Hairline, and Metadata */}
      <div className="flex flex-col items-start w-full">
        {/* Counter Number + Amber % Sign */}
        <div className="flex items-baseline gap-1.5 sm:gap-3 leading-none mb-3 sm:mb-5">
          <span
            className="text-[clamp(5.5rem,18vw,14rem)] leading-[0.82] text-[#efe7d6] font-normal"
            style={{
              fontFamily: "'Bodoni Moda', 'Playfair Display', 'Cormorant Garamond', Didot, serif",
              fontVariantNumeric: 'tabular-nums',
              fontFeatureSettings: '"tnum"',
              letterSpacing: '-0.02em',
            }}
          >
            {display}
          </span>
          <span
            className="text-base sm:text-2xl md:text-3xl font-bold font-mono text-[#d97706] mb-2 sm:mb-4 select-none"
            aria-hidden="true"
          >
            %
          </span>
        </div>

        {/* Full-width Gold/Amber Hairline Progress Bar */}
        <div className="w-full h-[1.5px] bg-[#efe7d6]/15 relative overflow-hidden mb-3 sm:mb-4">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left"
            style={{ background: '#d97706', transform: 'scaleX(0)' }}
          />
        </div>

        {/* Bottom Metadata */}
        <div className="flex items-center justify-between w-full font-mono text-[10px] sm:text-[11px] md:text-xs tracking-[0.3em] uppercase text-white/50">
          <span>LOADING SUPERPOSITION</span>
          <span>QISKIT ▪ IBM CLOUD</span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
