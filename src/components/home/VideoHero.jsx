import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function VideoHero() {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const floatGroupRef = useRef(null)

  // Interactive wave phase for physics card
  const [wavePhase, setWavePhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase((prev) => (prev + 0.15) % (Math.PI * 2))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      tl.from('.hero__divider', {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .from('.hero__eyebrow', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
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
      .from('.hero__floating-card', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.5')

      // Subtle continuous floating motion on the cards
      gsap.to('.float-card-1', {
        y: -10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.float-card-2', {
        y: 12,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      })
      gsap.to('.float-card-3', {
        y: -8,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-transparent text-white" ref={heroRef} id="hero">
      {/* Clean transparent hero layer — no grids or diagrams behind text */}

      {/* Main Grid: Left Hero Copy + Right Floating Scientific HUD */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Editorial Content */}
        <div className="flex flex-col items-start" ref={textRef}>
          {/* Eyebrow Lockup */}
          <div className="flex items-center gap-4 mb-6">
            <div className="hero__divider w-10 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 origin-left" />
            <span className="hero__eyebrow font-pixel text-[11px] sm:text-xs font-semibold tracking-widest text-purple-300 uppercase">
              SYMBIOSIS QUANTUM CLUB ✦ IBM QISKIT FALL FEST 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.8rem,5.8vw,5.8rem)] font-bold leading-[0.96] tracking-tight mb-6 text-white">
            <span className="block">
              <span className="hero__title-word inline-block">Decode</span>{' '}
              <span className="hero__title-word inline-block">The</span>{' '}
              <span className="hero__title-word inline-block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">Future</span>
            </span>
            <span className="block">
              <span className="hero__title-word inline-block">Of</span>{' '}
              <span className="hero__title-word inline-block bg-gradient-to-r from-purple-300 via-violet-200 to-indigo-300 bg-clip-text text-transparent">Quantum</span>
            </span>
          </h1>

          {/* Description */}
          <p className="hero__description font-body text-base sm:text-lg leading-relaxed text-slate-300 max-w-[58ch] mb-8">
            Symbiosis Quantum Club is an experiential launchpad for student researchers, hardware builders, and algorithm pioneers. Explore quantum linear algebra, transmon physics, and molecular Hamiltonian simulation with IBM Qiskit.
          </p>

          {/* Live Scientific & Hardware Telemetry Badges */}
          <div className="hero__stats flex flex-wrap items-center gap-2.5 sm:gap-3 mb-9">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-transparent border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="font-pixel text-[11px] font-semibold text-purple-200">500+ Qubits Simulated</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-transparent border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="font-pixel text-[11px] font-semibold text-cyan-200">15 mK Dilution Stage</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-transparent border border-purple-500/30">
              <span className="font-pixel text-[11px] font-semibold text-purple-300">✦ IBM Qiskit Partner</span>
            </div>
          </div>

          {/* Actions */}
          <div className="hero__actions flex flex-wrap items-center gap-4">
            <Link 
              to="/fallfest" 
              className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 group"
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
              className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full border border-purple-500/30 text-purple-200 bg-[#0e0720]/30 backdrop-blur-[2px] hover:border-purple-400 hover:text-white hover:bg-purple-500/15 transition-all duration-200"
            >
              EXPLORE EVENTS
            </Link>
          </div>
        </div>

        {/* Right Side: Floating Scientific Quantum HUD Cards */}
        <div className="relative w-full max-w-[540px] mx-auto lg:mx-0 lg:ml-auto flex flex-col gap-4" ref={floatGroupRef}>
          
          {/* Card 1: Physics & Wave Interference (Top) */}
          <div className="hero__floating-card float-card-1 p-5 rounded-2xl bg-transparent border border-purple-500/30 shadow-[0_12px_36px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="font-pixel text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                  PHYSICS ▪ RAMSEY OSCILLATION & DECOHERENCE
                </span>
              </div>
              <span className="font-pixel text-[11px] text-purple-300/80">T₁ = 85 μs</span>
            </div>

            {/* Live Oscillating Wave SVG */}
            <div className="w-full h-20 bg-black/40 rounded-xl border border-white/[0.06] p-2 relative overflow-hidden mb-3">
              <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                <line x1="0" y1="30" x2="300" y2="30" stroke="#ffffff" strokeOpacity="0.1" strokeDasharray="3 3" />
                {(() => {
                  const points = []
                  for (let x = 0; x <= 300; x += 3) {
                    const t = x / 300
                    const env = Math.exp(-t * 2.2)
                    const y = 30 - env * 22 * Math.cos((x * 0.08) + wavePhase)
                    points.push(`${x},${y}`)
                  }
                  return (
                    <path
                      d={`M ${points.join(' L ')}`}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                    />
                  )
                })()}
              </svg>
              <span className="absolute bottom-1 right-2 font-pixel text-[11px] text-cyan-400/80">
                ⟨σ_z(t)⟩ = e^(-t/T₂) cos(ωt)
              </span>
            </div>

            <div className="flex items-center justify-between font-pixel text-[11px] text-slate-300">
              <span>State: <strong className="text-purple-300 font-normal">|ψ⟩ = 1/√2 (|0⟩ + |1⟩)</strong></span>
              <span className="text-emerald-400 font-bold">Fidelity: 99.82%</span>
            </div>
          </div>

          {/* Card 2: Mathematics & Grover Search Multiplier (Middle Left Overlapping) */}
          <div className="hero__floating-card float-card-2 p-5 rounded-2xl bg-transparent border border-purple-500/30 shadow-[0_12px_36px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="font-pixel text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                  MATHEMATICS ▪ COMPLEXITY ADVANTAGE
                </span>
              </div>
              <span className="font-pixel text-[11px] text-purple-300 font-bold">O(√N) Speedup</span>
            </div>

            <div className="grid grid-cols-[1.2fr_1fr] gap-3 items-center">
              {/* Mini Complexity SVG Curve */}
              <div className="h-16 bg-black/40 rounded-xl border border-white/[0.06] p-1 relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 160 50" preserveAspectRatio="none">
                  {/* Classical O(N) */}
                  <path d="M 10 42 Q 70 35, 150 6" fill="none" stroke="#f43f5e" strokeWidth="2" />
                  {/* Quantum Grover O(sqrt(N)) */}
                  <path d="M 10 42 Q 60 40, 150 28" fill="none" stroke="#c084fc" strokeWidth="2.5" />
                  <circle cx="150" cy="28" r="3.5" fill="#c084fc" className="animate-ping" />
                  <circle cx="150" cy="28" r="2.5" fill="#a855f7" />
                </svg>
                <span className="absolute top-1 left-2 font-pixel text-[11px] text-rose-400">Classical O(N)</span>
                <span className="absolute bottom-1 right-2 font-pixel text-[11px] text-purple-300">Grover O(√N)</span>
              </div>

              {/* Speedup Metric */}
              <div className="flex flex-col items-start">
                <span className="font-pixel text-[22px] font-black text-white leading-none">886x</span>
                <span className="font-pixel text-[11px] text-slate-400 mt-1">Faster Search at N = 10⁶</span>
              </div>
            </div>
          </div>

          {/* Card 3: Chemistry & VQE Molecular Ground Energy (Bottom) */}
          <div className="hero__floating-card float-card-3 p-4 rounded-2xl bg-transparent border border-purple-500/30 shadow-[0_12px_36px_rgba(0,0,0,0.3)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-mono text-xs font-bold text-purple-300">
                H₂
              </div>
              <div className="flex flex-col">
                <span className="font-pixel text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                  CHEMISTRY ▪ VQE MOLECULAR GROUND STATE
                </span>
                <span className="font-pixel text-[11px] text-white">
                  E(R = 0.741 Å) = <strong className="text-purple-300 font-bold">-1.1744 Ha</strong>
                </span>
              </div>
            </div>
            <span className="font-pixel text-[11px] px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
              Jordan-Wigner
            </span>
          </div>

          {/* Floating Subtle Physics Badges */}
          <div className="flex items-center justify-between px-2 pt-1 font-pixel text-[10px] text-slate-500">
            <span>iℏ ∂/∂t |ψ⟩ = Ĥ|ψ⟩</span>
            <span>Tr(ρ²) = 1.0 (Pure)</span>
          </div>

        </div>

      </div>
    </section>
  )
}
