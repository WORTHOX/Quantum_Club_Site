import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import timeline from '../../data/timeline.json'

gsap.registerPlugin(ScrollTrigger)

const MILESTONE_METAS = {
  2016: { qpu: 'CANARY // 5-QUBIT QPU', scale: 5, era: 'CLOUD GENESIS', accent: '#c084fc', highlight: '1st Public Cloud QPU' },
  2017: { qpu: 'PROTOTYPE // 50-QUBIT', scale: 50, era: 'SIMULATION LIMIT', accent: '#38bdf8', highlight: 'Classical Boundary' },
  2019: { qpu: 'SUPREMACY // BENCHMARK', scale: 53, era: 'CROSSOVER', accent: '#f472b6', highlight: 'Advantage Debate' },
  2020: { qpu: 'QISKIT // 300K COMMUNITY', scale: 65, era: 'ECOSYSTEM EXPANSION', accent: '#34d399', highlight: 'Fall Fest Inaugural' },
  2021: { qpu: 'EAGLE // 127-QUBIT', scale: 127, era: 'CENTURY MILESTONE', accent: '#38bdf8', highlight: 'Broken 100Q Barrier' },
  2022: { qpu: 'OSPREY // 433-QUBIT', scale: 433, era: 'ERROR MITIGATION', accent: '#c084fc', highlight: '3x Qubit Scaling' },
  2023: { qpu: 'CONDOR // 1,121-QUBIT', scale: 1121, era: 'UTILITY SCALE', accent: '#fbbf24', highlight: '1,000+ Qubits' },
  2024: { qpu: 'HERON // MODULAR FABRIC', scale: 133, era: 'MODULAR INTEGRATION', accent: '#34d399', highlight: '5x Error Reduction' },
  2025: { qpu: 'SQC // FALL FEST 2025', scale: 500, era: 'STUDENT LEADERSHIP', accent: '#c084fc', highlight: '127 Flagship Attendees' },
  2026: { qpu: 'DECADE // CONTINUUM', scale: 1121, era: 'FAULT TOLERANCE', accent: '#38bdf8', highlight: '10 Years on Cloud' },
}

export default function DecadeTimeline() {
  const sectionRef = useRef(null)
  const [activeYear, setActiveYear] = useState(2026)
  const activeMeta = MILESTONE_METAS[activeYear] || MILESTONE_METAS[2026]
  const activeItem = timeline.find(t => t.year === activeYear) || timeline[timeline.length - 1]

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.timeline__specimen-card')

      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => {
            const yr = Number(item.getAttribute('data-year'))
            if (yr) setActiveYear(yr)
          },
          onEnterBack: () => {
            const yr = Number(item.getAttribute('data-year'))
            if (yr) setActiveYear(yr)
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToYear = (year) => {
    setActiveYear(year)
    const target = sectionRef.current.querySelector(`[data-year="${year}"]`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section className="py-24 sm:py-32 bg-transparent text-white relative overflow-visible" ref={sectionRef} id="timeline">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Header: Swiss Archival Specimen Standard */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0e0720]/60 border border-purple-500/30 mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
            <span className="font-pixel text-[11px] font-semibold text-purple-300 tracking-widest uppercase">
              HISTORICAL ACCELERATION // 2016 — 2026
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold text-white tracking-tight m-0">
            A Decade of <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">Quantum Acceleration</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-400 mt-3 max-w-[64ch] mx-auto">
            From the dawn of 5-qubit cloud-accessible processors to utility-scale modular quantum systems and student-led hackathons.
          </p>
        </div>

        {/* Interactive Decade Ribbon Scrubber */}
        <div className="w-full overflow-x-auto pb-4 mb-10 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max p-1.5 bg-[#080512]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl mx-auto w-fit shadow-lg">
            <span className="font-pixel text-[10px] uppercase tracking-widest text-slate-400 px-3 select-none">
              EPOCHS:
            </span>
            {timeline.map((item) => {
              const isSelected = activeYear === item.year
              return (
                <button
                  key={item.year}
                  onClick={() => scrollToYear(item.year)}
                  className={`font-pixel text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/20 scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.year}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Grid: Left Fixed Cockpit Radar + Right Overlapping Sticky Specimen Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          
          {/* Left Column: Fixed / Sticky Cockpit (Remains Pinned Until the Last Card is Reached) */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28 lg:self-start lg:h-fit lg:z-30">
            <div className="rounded-3xl bg-[#0a0714]/95 border border-white/[0.09] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:border-purple-500/40">
              
              {/* Corner crosshairs */}
              <span className="absolute top-3 right-3 font-mono text-[10px] text-white/20 select-none">+</span>
              <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/20 select-none">+</span>

              {/* Console Top Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-pulse" />
                  <span className="font-pixel text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                    RADAR // EPOCH_TRACKER
                  </span>
                </div>
                <span className="font-pixel text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {activeMeta.era}
                </span>
              </div>

              {/* Giant Glowing Year Readout */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-pixel text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 leading-none">
                  {activeYear}
                </span>
                <span className="font-pixel text-xs sm:text-sm text-slate-400 uppercase tracking-widest">
                  ACTIVE EPOCH
                </span>
              </div>

              {/* Focused Milestone Title & QPU Badge */}
              <div className="space-y-3 pb-6 border-b border-white/[0.08]">
                <span className="inline-block font-pixel text-[11px] font-bold px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300">
                  {activeMeta.qpu}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug m-0">
                  {activeItem.title}
                </h3>
                <p className="font-body text-sm text-slate-300 leading-relaxed m-0">
                  {activeItem.description}
                </p>
              </div>

              {/* Metric Accents & Velocity Indicators */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between font-pixel text-xs">
                  <span className="text-slate-400 uppercase">Qubit Capacity Scale:</span>
                  <span className="text-purple-300 font-bold">{activeMeta.scale} Qubits</span>
                </div>

                {/* Progress bar visualizer */}
                <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden border border-white/[0.06]">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.max(5, Math.min(100, (activeMeta.scale / 1121) * 100))}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="block font-pixel text-[10px] text-slate-400 uppercase">Architecture</span>
                    <span className="font-pixel text-[11px] text-white font-bold truncate block mt-0.5">{activeMeta.highlight}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="block font-pixel text-[10px] text-slate-400 uppercase">Global Scale</span>
                    <span className="font-pixel text-[11px] text-cyan-300 font-bold truncate block mt-0.5">224x Density</span>
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Stamp */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between font-pixel text-[10px] text-white/40">
                <span>SQC_ACADEMIC_CHRONO</span>
                <span className="text-cyan-300/80">UTILITY-SCALE</span>
              </div>

            </div>
          </div>

          {/* Right Column: Overlapping Sticky Milestone Specimen Cards */}
          <div className="col-span-12 lg:col-span-7 relative flex flex-col pb-12">
            {timeline.map((item, index) => {
              const meta = MILESTONE_METAS[item.year] || MILESTONE_METAS[2026]
              const isSelected = activeYear === item.year
              const isLast = index === timeline.length - 1

              return (
                <div
                  key={item.year}
                  data-year={item.year}
                  onClick={() => setActiveYear(item.year)}
                  style={{
                    top: `calc(7rem + ${index * 6}px)`,
                    zIndex: index + 10,
                  }}
                  className={`timeline__specimen-card sticky ${
                    isLast ? 'mb-0' : 'mb-28 sm:mb-36'
                  } p-6 sm:p-8 rounded-3xl bg-[#090615] border transition-all duration-300 backdrop-blur-2xl relative overflow-hidden group cursor-pointer shadow-[0_-16px_36px_rgba(0,0,0,0.85),0_24px_55px_rgba(0,0,0,0.95)] ${
                    isSelected
                      ? 'border-purple-400/70 bg-[#0d091a]'
                      : 'border-white/[0.1] hover:border-white/30 hover:bg-[#0c0818]'
                  }`}
                >
                  {/* Subtle Specimen Calibration Crosshairs */}
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-white/20 select-none">+</span>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/20 select-none">+</span>

                  {/* Top Archival Tape Bar */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                    <div className="flex items-center gap-2 font-pixel text-[10px] sm:text-[11px] text-white/60">
                      <span className="font-bold tracking-wider text-slate-300">
                        EPOCH_{String(index + 1).padStart(2, '0')} // 10
                      </span>
                      <span className="text-white/20">•</span>
                      <span 
                        className="px-2.5 py-0.5 rounded font-mono font-bold"
                        style={{
                          color: meta.accent,
                          backgroundColor: `${meta.accent}15`,
                          border: `1px solid ${meta.accent}30`
                        }}
                      >
                        YEAR {item.year}
                      </span>
                    </div>

                    <span className="font-pixel text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300">
                      {meta.qpu}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed m-0">
                    {item.description}
                  </p>

                  {/* Bottom Milestone Footer */}
                  <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between font-pixel text-[10px] text-white/40">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.accent }} />
                      <span className="text-slate-300">{meta.highlight}</span>
                    </span>
                    <span className="font-mono text-slate-500 uppercase">
                      {item.year === 2026 ? '✦ CURRENT HORIZON' : 'VERIFIED MILESTONE'}
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
