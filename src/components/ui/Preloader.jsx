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
      className="fixed inset-0 z-[99999] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 select-none overflow-hidden bg-[#07040d]"
      aria-label="Loading Symbiosis Quantum Club"
      role="status"
    >
      {/* Ambient Quantum Radial Lighting in Violet & Cyan */}
      <div className="absolute bottom-0 left-0 w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,rgba(236,72,153,0.08)_45%,transparent_70%)] blur-[95px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_70%)] blur-[95px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* Top Bar Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] sm:text-[11px] md:text-xs tracking-[0.3em] uppercase">
        <span className="text-[#c084fc] font-bold">SYMBIOSIS QUANTUM CLUB</span>
        <span className="hidden sm:inline text-slate-400">A DECADE OF QUANTUM ✦ 2016 — 2026</span>
      </div>

      {/* Bottom Area: Grand Serif Counter, Spectral Hairline, and Metadata */}
      <div className="relative z-10 flex flex-col items-start w-full">
        {/* Counter Number + Glowing Fuchsia % Sign */}
        <div className="flex items-baseline gap-1.5 sm:gap-3 leading-none mb-3 sm:mb-5">
          <span
            className="text-[clamp(5.5rem,18vw,14rem)] leading-[0.82] text-white font-normal drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]"
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
            className="text-base sm:text-2xl md:text-3xl font-bold font-mono text-[#ec4899] mb-2 sm:mb-4 select-none drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]"
            aria-hidden="true"
          >
            %
          </span>
        </div>

        {/* Full-width Spectral Quantum Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden mb-3 sm:mb-4 rounded-full">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left rounded-full shadow-[0_0_16px_rgba(168,85,247,0.9)]"
            style={{
              background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%)',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* Bottom Metadata */}
        <div className="flex items-center justify-between w-full font-mono text-[10px] sm:text-[11px] md:text-xs tracking-[0.3em] uppercase">
          <span className="text-[#c084fc]/90">LOADING SUPERPOSITION</span>
          <span className="text-slate-400">QISKIT ▪ IBM CLOUD</span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
