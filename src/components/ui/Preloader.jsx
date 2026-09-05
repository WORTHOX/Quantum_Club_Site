import React, { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import LogoWithCircularText from '../shared/LogoWithCircularText'

/**
 * Structural Quantum Preloader — Asymmetric Swiss Editorial & Specimen Deck
 *
 * Updates:
 * - Natural 3.0-second continuous flow from 0 to 100% with smooth physical easing.
 * - Dynamic mixture of `font-pixel` (Departure Mono) and `font-mono` (IBM Plex Mono)
 *   to create a high-aesthetic retro-futuristic quantum computing laboratory feel.
 * - Prominent emphasis on Symbiosis Quantum Club (SIT Pune) as the premier student
 *   chapter and official host of IBM Qiskit Fall Fest 2026.
 */

const QUANTUM_STAGES = [
  {
    min: 0,
    max: 24,
    code: '01',
    phase: 'SUPERCONDUCTING LATTICE INIT',
    clubSub: 'SIT PUNE // STUDENT CHAPTER',
    hardwareBadge: '15 mK Dilution Stage',
    badgeColor: 'border-cyan-500/30 text-cyan-200 bg-cyan-500/10',
    dotColor: 'bg-cyan-400',
    tag: '|ψ₀⟩ = |00...0⟩',
    description: 'Initializing Symbiosis Quantum Club research environment & cryogenic simulation cluster.',
    sticker: '/assets/fallfest/2026/svg/sticker_02.svg',
    stickerName: 'Superposition Bloom',
    showClubBadge: true,
    companionPill: null,
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.25)',
  },
  {
    min: 25,
    max: 62,
    code: '02',
    phase: 'COMMUNITY & ALGORITHM COHERENCE',
    clubSub: '500+ RESEARCHERS & DEVELOPERS',
    hardwareBadge: '500+ Qubits Simulated',
    badgeColor: 'border-purple-500/30 text-purple-200 bg-purple-500/10',
    dotColor: 'bg-purple-400 animate-pulse',
    tag: '|Φ⁺⟩ = (|00⟩ + |11⟩) / √2',
    description: 'Connecting student researchers, open-source quantum algorithms, and collaborative workshops.',
    sticker: '/assets/fallfest/2026/svg/sticker_01.svg',
    stickerName: 'Entanglement Glyph',
    showClubBadge: false,
    companionPill: '/assets/fallfest/2026/svg/sticker_qiskit-purple.svg',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.28)',
  },
  {
    min: 63,
    max: 88,
    code: '03',
    phase: 'IBM GLOBAL QUANTUM NETWORK',
    clubSub: 'ACADEMIC RESEARCH PARTNERSHIP',
    hardwareBadge: '133-Qubit Heron Cloud',
    badgeColor: 'border-emerald-500/30 text-emerald-200 bg-emerald-500/10',
    dotColor: 'bg-emerald-400',
    tag: 'DRAG PULSE @ 5.14 GHz',
    description: 'Bridging Pune’s student researchers directly to IBM Quantum hardware & Qiskit SDK pipelines.',
    sticker: '/assets/fallfest/2026/svg/sticker_06.svg',
    stickerName: 'Transmon Cryo Core',
    showClubBadge: false,
    companionPill: '/assets/fallfest/2026/svg/sticker_qiskit-purple.svg',
    accent: '#34d399',
    glow: 'rgba(52, 211, 153, 0.25)',
  },
  {
    min: 89,
    max: 100,
    code: '04',
    phase: 'PORTAL COHERENCE ACHIEVED',
    clubSub: 'WELCOME TO SYMBIOSIS QUANTUM CLUB',
    hardwareBadge: '✦ Official Host',
    badgeColor: 'border-pink-500/30 text-pink-200 bg-pink-500/10',
    dotColor: 'bg-pink-400',
    tag: 'STATUS: ADVANTAGE 100%',
    description: 'Symbiosis Quantum Club welcomes you to IBM Qiskit Fall Fest 2026 — portal fully calibrated.',
    sticker: '/assets/fallfest/2026/svg/badge-pink.svg',
    stickerName: 'Qiskit Fall Fest 2026 Official Seal',
    showClubBadge: true,
    companionPill: '/assets/fallfest/2026/svg/sticker_fall_fest_magenta.svg',
    accent: '#ff7eb6',
    glow: 'rgba(255, 126, 182, 0.35)',
  },
]

export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const leftColRef = useRef(null)
  const rightDeckRef = useRef(null)
  const [percent, setPercent] = useState(0)

  // Current quantum stage based on percentage
  const stage = useMemo(() => {
    return QUANTUM_STAGES.find(s => percent >= s.min && percent <= s.max) || QUANTUM_STAGES[0]
  }, [percent])

  // Apple-grade architectural curtain reveal
  const runExit = () => {
    if (!rootRef.current) {
      document.body.style.overflow = ''
      if (onDone) onDone()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        if (onDone) onDone()
      },
    })

    const targets = [leftColRef.current, rightDeckRef.current].filter(Boolean)

    tl.to(targets, {
      opacity: 0,
      scale: 0.98,
      duration: 0.2,
      ease: 'power2.in',
    }).to(
      rootRef.current,
      {
        yPercent: -100,
        duration: 0.45,
        ease: 'power3.inOut',
      },
      '-=0.08'
    )
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const tracker = { v: 0 }
    const mainTl = gsap.timeline({
      onComplete: runExit,
    })

    /**
     * Organic 3.0-Second Flow from 0 to 100%
     * Deliberate, high-aesthetic quantum telemetry sweep through all 4 calibration stages
     * with smooth physical easing, settling gracefully at 100%.
     */
    mainTl
      .to(tracker, {
        v: 100,
        duration: 3.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          setPercent(Math.round(tracker.v))
        },
      })
      // Physical 150ms hold at 100% for confirmation
      .to({}, { duration: 0.15 })

    return () => {
      document.body.style.overflow = ''
      mainTl.kill()
    }
  }, [onDone])

  return (
    <aside
      ref={rootRef}
      className="fixed inset-0 h-[100dvh] z-[99999] flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16 select-none overflow-hidden bg-[#030206] text-slate-100"
      aria-label="Loading Symbiosis Quantum Club & IBM Qiskit Fall Fest 2026"
      role="status"
    >
      {/* ── Soft Ambient Chromatic Glow in Background ── */}
      <div
        className="absolute top-1/3 right-1/4 w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] rounded-full pointer-events-none blur-[150px] transition-all duration-1000 opacity-25"
        style={{
          background: `radial-gradient(circle, ${stage.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Ultra-faint Swiss Grid Alignment Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* ── Top Masthead Bar: Interplay of font-mono and font-pixel ── */}
      <header className="relative z-10 flex items-center justify-between w-full pb-3 sm:pb-4 border-b border-white/[0.06] shrink-0">
        {/* Left: Brand Logo with Rotating Circular Motion matching Navbar */}
        <div className="flex items-center gap-2 sm:gap-3.5 scale-90 sm:scale-100 origin-left">
          <LogoWithCircularText size="md" showTitleText={true} />
        </div>

        {/* Right: IBM Qiskit Partnership Readout in font-pixel */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-right shrink-0">
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: stage.accent }} />
          <span className="font-pixel text-[9px] sm:text-[11px] text-white/70 hidden sm:inline uppercase">
            HOSTING
          </span>
          <span className="font-pixel text-[9px] sm:text-[11px] text-[#FF7EB6] font-semibold uppercase tracking-wider">
            <span className="hidden xs:inline">IBM </span>QISKIT FALL FEST 2026
          </span>
        </div>
      </header>

      {/* ── Main Structural Grid: Asymmetric 12-Column Layout ── */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center my-auto w-full max-w-7xl mx-auto py-2 sm:py-4 overflow-y-auto lg:overflow-visible max-h-[calc(100dvh-130px)]">
        {/* Left Column (7 cols): Editorial Typography Monolith & Mobile Specimen */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-center space-y-3.5 sm:space-y-5">
          {/* Eyebrow Status Badges — font-pixel Telemetry */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
              <span className="font-pixel text-[10px] sm:text-[11px] font-bold" style={{ color: stage.accent }}>
                STAGE_{stage.code}
              </span>
              <span className="text-white/20 font-mono text-[10px] sm:text-[11px]">/</span>
              <span className="font-pixel text-[9px] sm:text-[10px] tracking-wider text-white/70 uppercase">
                {stage.phase}
              </span>
            </div>

            {/* Live Hardware Telemetry Chip */}
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border ${stage.badgeColor}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${stage.dotColor}`} />
              <span className="font-pixel text-[9px] sm:text-[10px] font-semibold tracking-wide">
                {stage.hardwareBadge}
              </span>
            </div>
          </div>

          {/* Grand Club Headline with Dual Partnership Banner */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="font-pixel text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] text-emerald-400 font-semibold uppercase">
              STUDENT QUANTUM INITIATIVE • PUNE
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-tight leading-[1.05]">
              Symbiosis <br />
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-white">
                Quantum Club
              </span>
            </h1>

            {/* Sub-Headline: Official Host of IBM Qiskit Fall Fest */}
            <div className="flex items-center gap-2 pt-0.5 sm:pt-1">
              <span className="px-2 py-0.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-[#FF7EB6] font-pixel text-[9px] sm:text-xs font-semibold tracking-wider uppercase">
                ✦ OFFICIAL HOST
              </span>
              <span className="text-white/70 font-mono text-[11px] sm:text-sm tracking-wide">
                IBM Qiskit Fall Fest 2026
              </span>
            </div>

            <p className="font-body text-[11px] sm:text-sm md:text-base text-white/60 max-w-lg leading-relaxed pt-1 sm:pt-2 line-clamp-2 sm:line-clamp-none">
              {stage.description}
            </p>
          </div>

          {/* ── Mobile-Only Holographic Specimen HUD Capsule (< lg) ── */}
          <div className="lg:hidden w-full p-2.5 sm:p-3.5 rounded-2xl bg-[#0a0714]/90 border border-white/[0.08] backdrop-blur-xl shadow-lg relative overflow-hidden flex items-center justify-between gap-3">
            {/* Ambient Spotlight */}
            <div
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-[24px] pointer-events-none opacity-60"
              style={{ background: stage.glow }}
            />

            {/* Specimen Sticker with Glowing Halo */}
            <div className="flex items-center gap-2.5 sm:gap-3 relative z-10 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <img
                  key={stage.sticker}
                  src={stage.sticker}
                  alt={stage.stickerName}
                  className="w-full h-full object-contain filter drop-shadow-md"
                  style={{ filter: `drop-shadow(0 0 10px ${stage.glow})` }}
                />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <div className="flex items-center gap-1.5 font-pixel text-[9px] uppercase tracking-wider text-emerald-400 truncate">
                  <span className="shrink-0">STAGE_{stage.code}</span>
                  <span className="text-white/20 shrink-0">•</span>
                  <span style={{ color: stage.accent }} className="truncate font-semibold">{stage.stickerName}</span>
                </div>
                <span className="font-mono text-[10px] text-white/80 tracking-wide mt-0.5 truncate">
                  {stage.hardwareBadge}
                </span>
                <span className="font-pixel text-[8px] text-white/40 tracking-wider uppercase mt-0.5 truncate">
                  {stage.phase}
                </span>
              </div>
            </div>

            {/* Badges / Qiskit Pill */}
            <div className="relative z-10 shrink-0 flex flex-col items-end text-right font-pixel text-[8px] text-white/40">
              {stage.showClubBadge && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 border border-white/15 mb-1">
                  <img src="/logo.png" alt="SQC" className="w-3 h-3 object-contain" />
                  <span className="font-pixel text-[8px] text-white">SQC PUNE</span>
                </div>
              )}
              {stage.companionPill && (
                <img src={stage.companionPill} alt="Companion" className="h-4 object-contain filter drop-shadow-sm mb-1" />
              )}
              <span className="font-mono text-[9px] text-white/70">{stage.tag}</span>
            </div>
          </div>

          {/* Monumental Counter in font-pixel with font-mono Accents */}
          <div className="pt-1 sm:pt-2 flex items-baseline justify-between sm:justify-start gap-3 sm:gap-4">
            <div className="flex items-baseline leading-none">
              <span
                className="font-pixel text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight"
                style={{
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: '"tnum"',
                  textShadow: `0 0 32px ${stage.glow}`,
                }}
              >
                {String(percent).padStart(3, '0')}
              </span>
              <span
                className="font-pixel text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold ml-2 sm:ml-3 transition-colors duration-300"
                style={{ color: stage.accent }}
              >
                %
              </span>
            </div>

            {/* Formula / Club Mission Telemetry in font-pixel */}
            <div className="flex flex-col border-l border-white/[0.1] pl-3 sm:pl-4 py-0.5 sm:py-1 text-left">
              <span className="font-pixel text-[8px] sm:text-[9px] text-white/30 tracking-wider">STATE MATRIX</span>
              <span className="font-mono text-[10px] sm:text-xs text-white/80 font-medium truncate max-w-[130px] sm:max-w-none">{stage.tag}</span>
              <span className="font-pixel text-[8px] sm:text-[9px] text-emerald-400/90 tracking-wide mt-0.5 truncate max-w-[130px] sm:max-w-none">
                {stage.clubSub}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Holographic Specimen Deck (Desktop Only lg:flex) */}
        <div ref={rightDeckRef} className="hidden lg:flex lg:col-span-5 flex-col items-end justify-center">
          <div className="w-full max-w-sm sm:max-w-md rounded-3xl bg-[#0a0714]/80 border border-white/[0.08] backdrop-blur-2xl p-6 sm:p-8 relative shadow-[0_30px_70px_rgba(0,0,0,0.85)] flex flex-col items-center justify-between min-h-[340px] sm:min-h-[380px] overflow-hidden">
            {/* Specimen Cassette Top Tape in font-pixel */}
            <div className="w-full flex items-center justify-between font-pixel text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.06] pb-3 mb-4">
              <span className="text-emerald-400/90 font-semibold">SQC_SPECIMEN // ARTIFACT</span>
              <span style={{ color: stage.accent }}>{stage.code} / 04</span>
            </div>

            {/* Ambient Spotlight Behind Artifact */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none blur-[60px] transition-all duration-700 opacity-60"
              style={{ background: stage.glow }}
            />

            {/* Artifact Presentation Stage */}
            <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center my-auto transition-transform duration-500 hover:scale-105">
              <img
                key={stage.sticker}
                src={stage.sticker}
                alt={stage.stickerName}
                className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-700"
                style={{
                  filter: `drop-shadow(0 0 25px ${stage.glow})`,
                }}
              />
            </div>

            {/* Bottom Specimen Information & Club / Companion Badges */}
            <div className="w-full flex flex-col items-center text-center mt-4 pt-3 border-t border-white/[0.06] relative z-10">
              <div className="flex items-center gap-2 mb-2">
                {stage.showClubBadge && (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                    <img src="/logo.png" alt="SQC" className="w-3.5 h-3.5 object-contain" />
                    <span className="font-pixel text-[9px] text-white font-medium">SQC PUNE</span>
                  </div>
                )}
                {stage.companionPill && (
                  <img
                    src={stage.companionPill}
                    alt="Companion Pill"
                    className="h-5 sm:h-6 object-contain filter drop-shadow-md"
                  />
                )}
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-white/90 font-medium">
                {stage.stickerName}
              </span>
              <span className="font-pixel text-[9px] tracking-widest text-white/40 uppercase mt-0.5">
                SYMBIOSIS QUANTUM CLUB × IBM QISKIT 2026
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ── Bottom Section: Precision Engraved Hairline Timeline ── */}
      <footer className="relative z-10 flex flex-col w-full pt-3 sm:pt-4 border-t border-white/[0.06] shrink-0">
        {/* Discrete Coherence Notches in font-pixel */}
        <div className="flex justify-between w-full font-pixel text-[8px] sm:text-[9px] text-white/30 tracking-wider sm:tracking-widest uppercase mb-1.5 sm:mb-2 px-0.5">
          <span className={percent >= 0 ? 'text-emerald-400 font-medium' : ''}>
            <span className="hidden sm:inline">00% [INIT]</span>
            <span className="sm:hidden">0% INIT</span>
          </span>
          <span className={`hidden sm:inline ${percent >= 25 ? 'text-white/80' : ''}`}>25% [RESEARCH]</span>
          <span className={percent >= 50 ? 'text-white/80' : ''}>
            <span className="hidden sm:inline">50% [COMMUNITY]</span>
            <span className="sm:hidden">50% COMMS</span>
          </span>
          <span className={`hidden sm:inline ${percent >= 75 ? 'text-white/80' : ''}`}>75% [IBM LINK]</span>
          <span className={percent >= 90 ? 'text-pink-400 font-bold' : ''}>
            <span className="hidden sm:inline">100% [COHERENT]</span>
            <span className="sm:hidden">100% READY</span>
          </span>
        </div>

        {/* Laser Hairline Progress Rule with Glowing Tip */}
        <div className="w-full h-[1.5px] bg-white/[0.08] relative overflow-visible mb-2 sm:mb-4 rounded-full">
          <div
            className="h-full relative transition-all duration-75 ease-out rounded-full"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(to right, transparent, ${stage.accent})`,
            }}
          >
            {/* Glowing Focus Spark */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"
              style={{
                boxShadow: `0 0 12px ${stage.accent}, 0 0 4px #ffffff`,
              }}
            />
          </div>
        </div>

        {/* Institutional Coordinates with font-mono & font-pixel mixture */}
        <div className="flex items-center justify-between w-full uppercase text-white/40 text-[8px] sm:text-[10px]">
          <span className="font-mono text-white/60 font-medium tracking-[0.12em] sm:tracking-[0.2em] truncate">
            SYMBIOSIS QUANTUM CLUB • SIT PUNE
          </span>
          <span className="hidden md:inline font-pixel text-[9px] text-white/20 tracking-wider">
            STUDENT CHAPTER // PUNE, INDIA
          </span>
          <span style={{ color: stage.accent }} className="font-pixel font-semibold tracking-wider shrink-0 ml-2">
            <span className="hidden sm:inline">HOSTING </span>IBM QISKIT FALL FEST 2026
          </span>
        </div>
      </footer>
    </aside>
  )
}
