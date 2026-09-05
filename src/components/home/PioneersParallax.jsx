import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import pioneers from '../../data/pioneers.json'

gsap.registerPlugin(ScrollTrigger)

const PIONEER_SPECIMENS = {
  feynman: {
    index: '01',
    accent: '#c084fc',
    domainBadge: 'QUANTUM SIMULATION',
    glow: 'rgba(192, 132, 252, 0.25)',
    borderHover: 'hover:border-[#c084fc]/50',
    equation: 'iℏ ∂/∂t |ψ⟩ = Ĥ|ψ⟩',
    citation: 'Simulating Physics with Computers (Int. J. Theor. Phys. 1982)',
    icon: (
      <svg className="w-6 h-6 text-[#c084fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    tagline: 'Nature isn\'t classical, dammit, and if you want to make a simulation of nature, you\'d better make it quantum mechanical.'
  },
  shor: {
    index: '02',
    accent: '#38bdf8',
    domainBadge: 'ALGORITHMIC SUPREMACY',
    glow: 'rgba(56, 189, 248, 0.25)',
    borderHover: 'hover:border-[#38bdf8]/50',
    equation: 'r = ord_N(a)  •  QFT_N |j⟩ = 1/√N ∑ e^(2πijk/N) |k⟩',
    citation: 'Polynomial-Time Algorithms for Prime Factorization (SIAM 1994)',
    icon: (
      <svg className="w-6 h-6 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    tagline: 'Polynomial-time integer factorization algorithm that unlocked quantum supremacy in cryptography.'
  },
  deutsch: {
    index: '03',
    accent: '#f472b6',
    domainBadge: 'UNIVERSAL NETWORK THEORY',
    glow: 'rgba(244, 114, 182, 0.25)',
    borderHover: 'hover:border-[#f472b6]/50',
    equation: 'U_f |x, y⟩ = |x, y ⊕ f(x)⟩  •  H^(⊗n) |0⟩',
    citation: 'Quantum Theory, Church-Turing Principle & Universal Computers (1985)',
    icon: (
      <svg className="w-6 h-6 text-[#f472b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    tagline: 'Formulated the first universal quantum computer and quantum computational network theory.'
  },
  'ibm-team': {
    index: '04',
    accent: '#34d399',
    domainBadge: 'CLOUD HARDWARE & QISKIT',
    glow: 'rgba(52, 211, 153, 0.25)',
    borderHover: 'hover:border-[#34d399]/50',
    equation: '|0⟩ ──[ H ]──●──[ M ]  •  T₁ = 85 μs (Heron 133Q)',
    citation: 'IBM Quantum Experience Cloud Launch & Open Qiskit (2016)',
    icon: (
      <svg className="w-6 h-6 text-[#34d399]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    tagline: 'Put quantum computing on the public cloud with IBM Quantum Experience and open-source Qiskit.'
  }
}

export default function PioneersParallax() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [activeViews, setActiveViews] = useState({
    feynman: 'equation',
    shor: 'equation',
    deutsch: 'equation',
    'ibm-team': 'equation'
  })

  const toggleView = (id) => {
    setActiveViews(prev => ({
      ...prev,
      [id]: prev[id] === 'equation' ? 'quote' : 'equation'
    }))
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const grid = gridRef.current
      if (!grid) return
      const cards = grid.querySelectorAll('.pioneers__specimen-card')
      if (cards.length === 0) return

      const title = sectionRef.current.querySelector('.pioneers__title-block')
      const overlayText = sectionRef.current.querySelector('.pioneers__overlay-text')
      const orbitGuide = sectionRef.current.querySelector('.pioneers__orbit-guide')

      // Measure docked center of each card relative to the SINGLE GRID CENTER
      const getDockedOffsets = () => {
        const gw = grid.offsetWidth
        const gh = grid.offsetHeight
        const cx = gw / 2
        const cy = gh / 2

        return Array.from(cards).map((card) => {
          const cardCx = card.offsetLeft + card.offsetWidth / 2
          const cardCy = card.offsetTop + card.offsetHeight / 2
          const dx = cardCx - cx
          const dy = cardCy - cy
          const phi = Math.atan2(dy, dx)
          const cosPhi = Math.abs(Math.cos(phi)) || 0.707
          const sinPhi = Math.abs(Math.sin(phi)) || 0.707
          return { dx, dy, phi, cosPhi, sinPhi }
        })
      }

      let cardOffsets = getDockedOffsets()

      const spiralState = { progress: 0 }

      const updateSpiral = (P) => {
        if (!cardOffsets || cardOffsets.length === 0) {
          cardOffsets = getDockedOffsets()
          if (!cardOffsets) return
        }

        // Phase 1 Threshold: The center focal reticle and orbital rings appear first
        const centerThreshold = 0.08

        if (P <= centerThreshold) {
          // While center is revealing, hold all cards dormant and hidden at the focal center
          cards.forEach((card, i) => {
            const off = cardOffsets[i]
            if (!off) return
            const theta = off.phi + 1.25 * Math.PI
            const targetX = Math.abs(off.dx) * 0.15 * (Math.cos(theta) / off.cosPhi)
            const targetY = Math.abs(off.dy) * 0.15 * (Math.sin(theta) / off.sinPhi)
            const x = Math.round(targetX - off.dx)
            const y = Math.round(targetY - off.dy)

            gsap.set(card, {
              x,
              y,
              scale: 0.24,
              opacity: 0,
              rotationX: 24,
              rotationZ: 28 * Math.cos(off.phi),
              rotationY: -18 * Math.sin(theta),
              filter: 'blur(10px)',
              transformPerspective: 1400,
              force3D: true,
            })
          })
          return
        }

        // Phase 2: The center is established, now cards emerge and spiral outward swiftly
        const cardPhaseProgress = (P - centerThreshold) / (1 - centerThreshold)
        const stagger = 0.035
        const duration = 0.88

        cards.forEach((card, i) => {
          const off = cardOffsets[i]
          if (!off) return

          const startP = i * stagger
          const cardP = Math.min(1, Math.max(0, (cardPhaseProgress - startP) / duration))

          if (cardP >= 0.999) {
            // Pristinely docked — clear inline transforms so CSS hover transitions work freely
            gsap.set(card, {
              clearProps: 'transform,filter',
              opacity: 1,
            })
            return
          }

          // Inverse progress: u = 1 at hidden start, u = 0 at docked
          const u = 1 - cardP
          const uCurved = Math.pow(u, 1.15) // Smooth non-linear contraction

          // Spiral radius factor: contracts to 0.18 at hidden center, expands to 1.0 at docked
          const r = 1.0 - 0.82 * uCurved

          // Total angular winding along ellipse: 1.25 * PI (225 deg of sweeping celestial arc around ONE center)
          const theta = off.phi + uCurved * (1.25 * Math.PI)

          // Position relative to the ONE SINGLE CENTER of the 4 cards
          const targetX = Math.abs(off.dx) * r * (Math.cos(theta) / off.cosPhi)
          const targetY = Math.abs(off.dy) * r * (Math.sin(theta) / off.sinPhi)

          // GSAP translation relative to card's CSS grid slot
          const x = Math.round(targetX - off.dx)
          const y = Math.round(targetY - off.dy)

          // Scale: expands from compact 0.28 to full size 1.0
          const scale = +(1.0 - 0.72 * uCurved).toFixed(3)

          // Opacity: blooms swiftly from hidden (0) to fully luminous (1.0)
          const opacity = +(cardP < 0.02 ? 0 : Math.min(1, (cardP - 0.02) / 0.18)).toFixed(3)

          // 3D Orbital pitch, roll and yaw around the single center
          const rotZ = +(uCurved * 28 * Math.cos(off.phi)).toFixed(1)
          const rotX = +(22 * uCurved).toFixed(1)
          const rotY = +(-uCurved * 18 * Math.sin(theta)).toFixed(1)

          // Depth-of-field defocus blur
          const blur = +(10 * uCurved).toFixed(1)

          gsap.set(card, {
            x,
            y,
            scale,
            opacity,
            rotationX: rotX,
            rotationY: rotY,
            rotationZ: rotZ,
            filter: blur > 0.4 ? `blur(${blur}px)` : 'none',
            transformPerspective: 1400,
            force3D: true,
          })
        })
      }

      // Initial state: ensure cards start hidden at the single center before scroll triggers
      updateSpiral(0)

      // GSAP ScrollTrigger driving the single-center eclipse spiral with responsive fluid scrub
      gsap.to(spiralState, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 16%',
          scrub: 0.6,
          onUpdate: (self) => {
            updateSpiral(self.progress)
          },
          onRefresh: () => {
            cardOffsets = getDockedOffsets()
            updateSpiral(spiralState.progress)
          }
        },
      })

      // Section title entrance
      if (title) {
        gsap.fromTo(title,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.6,
            },
          }
        )
      }

      // Background watermark fade in
      if (overlayText) {
        gsap.fromTo(overlayText,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 30%',
              scrub: 0.6,
            },
          }
        )
      }

      // Center orbital guide reveals FIRST, fully establishing the focal center
      if (orbitGuide) {
        gsap.fromTo(orbitGuide,
          { opacity: 0, scale: 0.62 },
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'top 68%',
              scrub: 0.5,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 sm:py-32 bg-transparent min-h-[90dvh] flex items-center relative overflow-hidden text-white" ref={sectionRef} id="pioneers">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative">
        
        {/* Archival Specimen Large Background Watermark */}
        <h2 className="pioneers__overlay-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(2.5rem,8vw,8rem)] font-black text-white/[0.02] whitespace-nowrap pointer-events-none z-0 tracking-[-0.04em] uppercase select-none" aria-hidden="true">
          QUANTUM ARCHIVES
        </h2>

        {/* Section Header: Swiss Archival Specimen Standard */}
        <div className="pioneers__title-block text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0e0720]/60 border border-purple-500/30 mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
            <span className="font-pixel text-[11px] font-semibold text-purple-300 uppercase tracking-widest">
              ARCHIVE SPECIMENS // 1981 — 2026
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold text-white tracking-tight m-0">
            Pioneers of the <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">Quantum Realm</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-[62ch] mx-auto mt-3">
            Foundational theorists, mathematical cryptanalysts, and hardware architects who formulated quantum mechanics into computation.
          </p>
        </div>

        {/* Specimen Deck Area: Single Common Center for Orbital Guide and the 4 Cassettes */}
        <div className="relative z-[1]">
          {/* Background Eclipse Spiral Orbital Guide SVG (Centered exactly on the 4 cards' common center) */}
          <div className="pioneers__orbit-guide absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-0 overflow-hidden" aria-hidden="true">
            <svg className="w-[1240px] h-[720px] max-w-none text-purple-500/15" viewBox="-620 -360 1240 720" fill="none">
              {/* Outer Elliptical Orbit */}
              <ellipse cx="0" cy="0" rx="540" ry="280" stroke="currentColor" strokeWidth="1" strokeDasharray="6 10" />
              
              {/* Inner Spiral Winding Guide */}
              <ellipse cx="0" cy="0" rx="380" ry="195" stroke="rgba(56, 189, 248, 0.14)" strokeWidth="1" strokeDasharray="4 8" />
              <ellipse cx="0" cy="0" rx="220" ry="115" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.6" />
              
              {/* Orbital Axes & Polar Nodes */}
              <line x1="-570" y1="0" x2="570" y2="0" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.5" />
              <line x1="0" y1="-300" x2="0" y2="300" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.5" />
              
              {/* Node Pulse Points */}
              <circle cx="-380" cy="0" r="3.5" fill="#c084fc" opacity="0.4" />
              <circle cx="380" cy="0" r="3.5" fill="#38bdf8" opacity="0.4" />
              <circle cx="0" cy="-195" r="3.5" fill="#f472b6" opacity="0.4" />
              <circle cx="0" cy="195" r="3.5" fill="#34d399" opacity="0.4" />

              {/* Central Focal Reticle / Single Center Crosshair */}
              <circle cx="0" cy="0" r="7" fill="#c084fc" opacity="0.8" />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
              <circle cx="0" cy="0" r="18" stroke="#c084fc" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="0" cy="0" r="36" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.8" strokeDasharray="4 6" />
              <circle cx="0" cy="0" r="72" stroke="rgba(192, 132, 252, 0.2)" strokeWidth="0.8" strokeDasharray="2 6" />
              <line x1="-54" y1="0" x2="54" y2="0" stroke="rgba(192, 132, 252, 0.6)" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="0" y1="-54" x2="0" y2="54" stroke="rgba(192, 132, 252, 0.6)" strokeWidth="0.8" strokeDasharray="3 3" />
              <text x="0" y="28" fill="rgba(192, 132, 252, 0.7)" fontFamily='"Departure Mono", monospace' fontSize="8" letterSpacing="0.12em" textAnchor="middle">
                FOCAL_SINGULARITY (0,0)
              </text>

              {/* Scientific Orbital Annotation */}
              <text x="-540" y="-12" fill="rgba(192, 132, 252, 0.35)" fontFamily='"Departure Mono", monospace' fontSize="9" letterSpacing="0.1em">
                ORBITAL_APOAPSIS // θ = 180°
              </text>
              <text x="400" y="-12" fill="rgba(56, 189, 248, 0.35)" fontFamily='"Departure Mono", monospace' fontSize="9" letterSpacing="0.1em">
                PERIAPSIS // θ = 000°
              </text>
              <text x="-120" y="325" fill="rgba(192, 132, 252, 0.25)" fontFamily='"Departure Mono", monospace' fontSize="8" letterSpacing="0.15em">
                SHARED FOCAL SINGULARITY • r(θ) = ae^(-kθ) • 4-ARM VORTEX
              </text>
            </svg>
          </div>

          {/* 4 Pioneer Archival Specimen Cassettes in 2x2 Grid with 3D Perspective Docking */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-[1]" style={{ perspective: '1400px' }}>
          {pioneers.map((pioneer) => {
            const spec = PIONEER_SPECIMENS[pioneer.id] || PIONEER_SPECIMENS.feynman
            const isQuoteView = activeViews[pioneer.id] === 'quote'

            return (
              <div
                key={pioneer.id}
                className={`pioneers__specimen-card p-6 sm:p-8 rounded-3xl bg-[#0a0714]/85 border border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] ${spec.borderHover} hover:shadow-[0_25px_65px_rgba(0,0,0,0.85)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Subtle Specimen Calibration Crosshairs */}
                <span className="absolute top-3 right-3 font-mono text-[10px] text-white/20 select-none">+</span>
                <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/20 select-none">+</span>

                <div className="flex flex-col gap-4">
                  {/* Top Archival Tape Bar */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2 font-pixel text-[10px] sm:text-[11px] text-white/60">
                      <span className="font-bold tracking-wider text-slate-300">
                        SPECIMEN_{spec.index} // 04
                      </span>
                      <span className="text-white/20">•</span>
                      <span 
                        className="px-2 py-0.5 rounded font-mono font-bold"
                        style={{
                          color: spec.accent,
                          backgroundColor: `${spec.accent}15`,
                          border: `1px solid ${spec.accent}30`
                        }}
                      >
                        YEAR: {pioneer.year}
                      </span>
                    </div>

                    <span className="font-pixel text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300">
                      {spec.domainBadge}
                    </span>
                  </div>

                  {/* Icon & Pioneer Dossier Header */}
                  <div className="flex items-start gap-4 pt-1">
                    <div 
                      className="p-3.5 rounded-2xl bg-[#05030a] border border-white/10 group-hover:border-white/25 transition-colors shrink-0 shadow-inner"
                      style={{ boxShadow: `0 0 20px ${spec.glow}` }}
                    >
                      {spec.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight m-0">
                          {pioneer.name}
                        </h3>
                        <button
                          onClick={() => toggleView(pioneer.id)}
                          className="font-pixel text-[10px] uppercase px-2 py-0.5 rounded border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors"
                          title="Toggle between mathematical formulation and historic quote"
                        >
                          {isQuoteView ? 'VIEW FORMULATION' : 'VIEW QUOTE'}
                        </button>
                      </div>
                      <span 
                        className="font-pixel text-[11px] font-bold tracking-wide block mt-1 uppercase"
                        style={{ color: spec.accent }}
                      >
                        {pioneer.role}
                      </span>
                    </div>
                  </div>

                  {/* Core Description */}
                  <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed m-0 pt-1">
                    {pioneer.description}
                  </p>

                  {/* Seminal Formulation / Quote Specimen Well */}
                  <div className="mt-2 p-3.5 sm:p-4 rounded-2xl bg-[#05030a]/90 border border-white/[0.08] relative overflow-hidden shadow-inner">
                    {!isQuoteView ? (
                      <div>
                        <div className="flex items-center justify-between font-pixel text-[10px] text-white/40 mb-1.5 uppercase tracking-wider">
                          <span>SEMINAL FORMULATION</span>
                          <span style={{ color: spec.accent }}>BREAKTHROUGH</span>
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide py-1 select-all overflow-x-auto">
                          {spec.equation}
                        </div>
                        <div className="font-pixel text-[10px] text-slate-400 mt-1.5 truncate">
                          📄 {spec.citation}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-pixel text-[10px] text-white/40 mb-1.5 uppercase tracking-wider">
                          HISTORIC QUOTE & PRINCIPLE
                        </div>
                        <blockquote className="font-body text-xs sm:text-sm text-slate-300 italic leading-relaxed m-0 border-l-2 pl-3" style={{ borderColor: spec.accent }}>
                          &ldquo;{spec.tagline}&rdquo;
                        </blockquote>
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Specimen Verification Seal */}
                <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between font-pixel text-[10px] text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: spec.accent }} />
                    VERIFIED SPECIMEN // ARCHIVE_SQC
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                    ACADEMIC RECORD
                  </span>
                </div>

              </div>
            )
          })}
        </div>
      </div>

    </div>
  </section>
  )
}
