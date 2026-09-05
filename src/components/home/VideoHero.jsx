import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function VideoHero() {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const consoleRef = useRef(null)

  // Interactive instrument tab state
  const [activeTab, setActiveTab] = useState('physics')

  // Imperative wave animation — no React state, no re-renders
  const wavePathRef = useRef(null)
  const waveRafRef = useRef(null)
  const wavePhaseRef = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const animate = () => {
      wavePhaseRef.current = (wavePhaseRef.current + 0.15) % (Math.PI * 2)
      const path = wavePathRef.current
      if (path) {
        const pts = []
        for (let x = 0; x <= 320; x += 3) {
          const t = x / 320
          const env = Math.exp(-t * 2.2)
          const y = 32 - env * 24 * Math.cos((x * 0.08) + wavePhaseRef.current)
          pts.push(`${x},${y}`)
        }
        path.setAttribute('d', `M ${pts.join(' L ')}`)
      }
      waveRafRef.current = requestAnimationFrame(animate)
    }
    waveRafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(waveRafRef.current)
  }, [activeTab])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      tl.from('.hero__eyebrow', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .from('.hero__title-word', {
        y: 45,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.hero__description', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.hero__stats', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.25')
      .from('.hero__actions', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2')
      .from('.hero__console', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'opacity',
        onComplete: () => {
          gsap.to('.hero__console', {
            y: -8,
            duration: 4.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        },
      }, '-=0.5')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-transparent text-white" ref={heroRef} id="hero">
      {/* Main Grid: Left Hero Copy + Right Interactive Quantum Laboratory Console */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Side: Editorial Content */}
        <div className="col-span-12 lg:col-span-7 flex flex-col items-start" ref={textRef}>
          {/* Eyebrow Lockup with Luminous Pulse Dot */}
          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-[#0e0720]/50 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
              <span className="hero__eyebrow font-pixel text-[11px] sm:text-xs font-semibold tracking-widest text-purple-200 uppercase">
                SYMBIOSIS QUANTUM CLUB ✦ IBM QISKIT FALL FEST 2026
              </span>
            </div>
          </div>

          {/* Headline with High-Fidelity Gradient Finish (Strict 3 Lines) */}
          <h1 className="font-display text-[clamp(2.8rem,5.8vw,5.8rem)] font-bold leading-[0.98] tracking-tight mb-6 text-white">
            <span className="block">
              <span className="hero__title-word inline-block">Decode</span>
            </span>
            <span className="block">
              <span className="hero__title-word inline-block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">The Future</span>
            </span>
            <span className="block">
              <span className="hero__title-word inline-block bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">Of Quantum</span>
            </span>
          </h1>

          {/* Description */}
          <p className="hero__description font-body text-base sm:text-lg leading-relaxed text-slate-300 max-w-[58ch] mb-8">
            Symbiosis Quantum Club is an experiential launchpad for student researchers, hardware builders, and algorithm pioneers. Explore quantum linear algebra, transmon physics, and molecular Hamiltonian simulation with IBM Qiskit.
          </p>

          {/* Live Scientific & Hardware Telemetry Badges */}
          <div className="hero__stats flex flex-wrap items-center gap-2.5 sm:gap-3 mb-9">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0715]/75 border border-purple-500/30 backdrop-blur-md shadow-[0_4px_16px_rgba(168,85,247,0.15)] hover:border-purple-400/50 hover:-translate-y-0.5 transition-all">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
              <span className="font-pixel text-[11px] font-semibold text-purple-200">500+ Qubits Simulated</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0715]/75 border border-cyan-500/30 backdrop-blur-md shadow-[0_4px_16px_rgba(6,182,212,0.15)] hover:border-cyan-400/50 hover:-translate-y-0.5 transition-all">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              <span className="font-pixel text-[11px] font-semibold text-cyan-200">Student Quantum Community</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0715]/75 border border-emerald-500/30 backdrop-blur-md shadow-[0_4px_16px_rgba(16,185,129,0.15)] hover:border-emerald-400/50 hover:-translate-y-0.5 transition-all">
              <span className="font-pixel text-[11px] font-semibold text-emerald-300">✦ IBM Qiskit Partner</span>
            </div>
          </div>

          {/* Actions with Apple-Grade Precision Lighting & Inner Highlight */}
          <div className="hero__actions flex flex-wrap items-center gap-4">
            <Link 
              to="/events?category=fall-fest" 
              className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-[0_0_24px_rgba(168,85,247,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 group"
            >
              <span>REGISTER FOR FALL FEST</span>
              <span className="w-5.5 h-5.5 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:bg-white/30">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
            <Link 
              to="/events" 
              className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full border border-white/15 text-purple-200 bg-[#0e0720]/40 backdrop-blur-md hover:border-cyan-400/60 hover:text-white hover:bg-cyan-500/15 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              EXPLORE EVENTS
            </Link>
          </div>
        </div>

        {/* Right Side: Interactive Quantum Laboratory Console (Elevated Presentation) */}
        <div className="col-span-12 lg:col-span-5 relative w-full max-w-[560px] mx-auto lg:mx-0 lg:ml-auto z-20" ref={consoleRef}>
          <div className="hero__console w-full rounded-3xl bg-[#090714]/95 border border-white/[0.12] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-5 sm:p-7 relative overflow-hidden transition-all duration-300 hover:border-purple-500/50 opacity-100 z-20">
            
            {/* Top Console Chassis Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-pulse" />
                <span className="font-pixel text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                  SQC_LAB_TELEMETRY // RACK_04
                </span>
              </div>
              <div className="flex items-center gap-2 font-pixel text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>FIDELITY: 99.82%</span>
              </div>
            </div>

            {/* Interactive Domain Mode Switcher Tabs */}
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#05030a]/80 rounded-xl border border-white/[0.06] mb-5">
              {[
                { id: 'physics', label: 'PHYSICS', icon: '⚛' },
                { id: 'math', label: 'MATH', icon: '∑' },
                { id: 'chemistry', label: 'CHEM', icon: '🔬' },
                { id: 'hardware', label: 'QPU', icon: '🌐' },
              ].map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 text-center rounded-lg font-pixel text-[10px] sm:text-[11px] font-bold tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/40 to-cyan-600/30 text-white border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="opacity-70">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Active Display Chamber based on selected Domain */}
            {activeTab === 'physics' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-pixel text-[11px] text-cyan-300 font-semibold uppercase tracking-wider">
                    Ramsey Oscillation & Decoherence
                  </span>
                  <span className="font-pixel text-[11px] text-cyan-400/90 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    T₁ = 85 μs
                  </span>
                </div>

                {/* Live Oscillating Wave SVG */}
                <div className="w-full h-24 bg-[#05030a]/90 rounded-2xl border border-white/[0.06] p-2 relative overflow-hidden shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 320 64" preserveAspectRatio="none">
                    <line x1="0" y1="32" x2="320" y2="32" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="4 4" />
                    <path
                      ref={wavePathRef}
                      d="M 0,32 L 320,32"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.2"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.7))' }}
                    />
                  </svg>
                  <span className="absolute bottom-1.5 right-2.5 font-pixel text-[10px] text-cyan-400/80">
                    ⟨σ_z(t)⟩ = e^(-t/T₂) cos(ωt)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="block font-pixel text-[10px] text-slate-400 uppercase">State Vector</span>
                    <span className="font-pixel text-[11px] text-purple-300 font-bold">|ψ⟩ = 1/√2 (|0⟩ + |1⟩)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="block font-pixel text-[10px] text-slate-400 uppercase">Superposition Phase</span>
                    <span className="font-pixel text-[11px] text-cyan-300 font-bold">Δϕ = ω_01 · Δt</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'math' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-pixel text-[11px] text-purple-300 font-semibold uppercase tracking-wider">
                    Grover Complexity Advantage
                  </span>
                  <span className="font-pixel text-[11px] text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    O(√N) Speedup
                  </span>
                </div>

                <div className="grid grid-cols-[1.3fr_1fr] gap-3 items-center">
                  <div className="h-24 bg-[#05030a]/90 rounded-2xl border border-white/[0.06] p-2 relative overflow-hidden shadow-inner flex items-center">
                    <svg className="w-full h-full" viewBox="0 0 160 50" preserveAspectRatio="none">
                      <path d="M 10 44 Q 70 35, 150 6" fill="none" stroke="#f43f5e" strokeWidth="2" strokeOpacity="0.8" />
                      <path d="M 10 44 Q 60 40, 150 28" fill="none" stroke="#c084fc" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 4px #c084fc)' }} />
                      <circle cx="150" cy="28" r="3.5" fill="#c084fc" className="animate-ping" />
                      <circle cx="150" cy="28" r="2.5" fill="#a855f7" />
                    </svg>
                    <span className="absolute top-1 left-2 font-pixel text-[10px] text-rose-400">Classical O(N)</span>
                    <span className="absolute bottom-1 right-2 font-pixel text-[10px] text-purple-300">Grover O(√N)</span>
                  </div>

                  <div className="flex flex-col items-start p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <span className="font-pixel text-[32px] font-black text-white leading-none tracking-tight">886x</span>
                    <span className="font-pixel text-[10px] text-purple-200 mt-1">Faster at N = 10⁶</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                  <span className="font-pixel text-[10px] text-slate-400">DIFFUSION OPERATOR:</span>
                  <span className="font-pixel text-[11px] text-slate-200">2|ψ⟩⟨ψ| - I</span>
                </div>
              </div>
            )}

            {activeTab === 'chemistry' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-pixel text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
                    VQE Molecular Ground State
                  </span>
                  <span className="font-pixel text-[11px] text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Jordan-Wigner
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#05030a]/90 border border-white/[0.06] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center font-mono text-sm font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0">
                    H₂
                  </div>
                  <div>
                    <span className="block font-pixel text-[11px] text-slate-300">Equilibrium Bond Length: <strong className="text-white">R = 0.741 Å</strong></span>
                    <span className="block font-pixel text-[13px] text-emerald-300 font-bold mt-0.5">
                      E_ground = -1.1744 Hartree
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="block font-pixel text-[10px] text-slate-400 uppercase">Ansatz Depth</span>
                    <span className="font-pixel text-[11px] text-white font-bold">2-Layer RyRz</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="block font-pixel text-[10px] text-slate-400 uppercase">Energy Error</span>
                    <span className="font-pixel text-[11px] text-emerald-400 font-bold">&lt; 1.0 mHa (Chemical)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hardware' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-pixel text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
                    Transmon Qubit Coherence
                  </span>
                  <span className="font-pixel text-[11px] text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    133Q Heron R2
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#05030a]/90 border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between font-pixel text-[11px]">
                    <span className="text-slate-400">Cryostat Stage:</span>
                    <span className="text-cyan-300 font-bold">14.2 mK (Dilution Plate)</span>
                  </div>
                  <div className="flex items-center justify-between font-pixel text-[11px]">
                    <span className="text-slate-400">Dephasing Time T₂*:</span>
                    <span className="text-amber-300 font-bold">62.4 μs</span>
                  </div>
                  <div className="flex items-center justify-between font-pixel text-[11px]">
                    <span className="text-slate-400">Single-Qubit Gate Time:</span>
                    <span className="text-purple-300 font-bold">20.0 ns</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                  <span className="font-pixel text-[10px] text-slate-400">TWO-QUBIT CZ ERROR:</span>
                  <span className="font-pixel text-[11px] text-emerald-400 font-bold">2.1 × 10⁻³</span>
                </div>
              </div>
            )}

            {/* Bottom Telemetry Dock */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between font-pixel text-[10px] text-white/50">
              <span>iℏ ∂/∂t |ψ⟩ = Ĥ|ψ⟩</span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Tr(ρ²) = 1.0 (Pure)
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
