import { useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function AboutDoubleImage() {
  const revealRef = useScrollReveal({ children: true })
  const [selectedView, setSelectedView] = useState('both') // 'both', 'hardware', 'delegation'

  return (
    <section className="py-24 sm:py-32 bg-transparent text-white relative overflow-hidden" id="about" ref={revealRef}>
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Watermark-Free Archival Specimen Photography Deck */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            
            {/* View Selector Tabs */}
            <div className="flex items-center gap-2 pb-1">
              <span className="font-pixel text-[10px] uppercase tracking-widest text-slate-400 mr-2">SPECIMEN VIEW:</span>
              <button
                onClick={() => setSelectedView('both')}
                className={`font-pixel text-[10px] uppercase tracking-wider px-3 py-1 rounded-full transition-all ${
                  selectedView === 'both'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06]'
                }`}
              >
                DUAL ARCHIVE
              </button>
              <button
                onClick={() => setSelectedView('hardware')}
                className={`font-pixel text-[10px] uppercase tracking-wider px-3 py-1 rounded-full transition-all ${
                  selectedView === 'hardware'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06]'
                }`}
              >
                LAB HARDWARE
              </button>
              <button
                onClick={() => setSelectedView('delegation')}
                className={`font-pixel text-[10px] uppercase tracking-wider px-3 py-1 rounded-full transition-all ${
                  selectedView === 'delegation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06]'
                }`}
              >
                IISER DELEGATION
              </button>
            </div>

            {/* Specimen Frame Grid */}
            <div className="relative grid grid-cols-[1fr_0.68fr] gap-4 sm:gap-6 items-end">
              
              {/* Primary Image: Dilution Cryostat Facility (Pristine High-Res, No Watermarks) */}
              <div 
                className={`aspect-[4/5] bg-[#090714] border border-white/[0.09] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative group transition-all duration-500 ${
                  selectedView === 'delegation' ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <img
                  src="/assets/images/about-large.jpg"
                  alt="State-of-the-art Quantum Dilution Refrigerator and Optical Laser Bench"
                  className="w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06040a]/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Precision Archival Specimen Tag */}
                <div className="absolute top-4 left-4 font-pixel text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-black/70 border border-white/10 backdrop-blur-md text-cyan-300 flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>HARDWARE ROOTS // 15 mK CRYOSTAT</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#090714]/85 border border-white/[0.08] backdrop-blur-xl flex items-center justify-between shadow-lg">
                  <span className="font-pixel text-[11px] font-semibold text-white">Quantum Dilution Chamber</span>
                  <span className="font-pixel text-[10px] text-cyan-300 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    Physical QPU
                  </span>
                </div>
              </div>

              {/* Secondary Overlapping Image: Genuine Student Delegation outside IISER Pune (Zero Watermarks) */}
              <div 
                className={`aspect-[3/4] bg-[#090714] border border-white/[0.09] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative -translate-y-[15%] group transition-all duration-500 ${
                  selectedView === 'hardware' ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <img
                  src="/assets/events/iiser-visit/photo-2.jpg"
                  alt="Symbiosis Quantum Club Student Delegation with Certificates at IISER Pune"
                  className="w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06040a]/90 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-3 right-3 font-pixel text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-black/70 border border-white/10 backdrop-blur-md text-emerald-300 flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>COHORT // CERTIFIED</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#090714]/85 border border-white/[0.08] backdrop-blur-xl shadow-lg">
                  <span className="block font-pixel text-[11px] font-semibold text-white truncate">IISER Pune Delegation</span>
                  <span className="block font-pixel text-[10px] text-emerald-300 uppercase tracking-wider mt-0.5">
                    Student Researchers
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Side: Editorial Content & Bento Stat Grid */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e0720]/50 border border-purple-500/30 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
                <span className="font-pixel text-[11px] font-bold tracking-widest text-purple-300 uppercase">
                  OUR MISSION & ROOTS
                </span>
              </div>
            </div>

            <h2 className="font-display text-[clamp(2.2rem,3.8vw,3.2rem)] font-extrabold text-white leading-[1.08] tracking-tight m-0">
              We make quantum computing
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                accessible to everyone
              </span>
            </h2>

            <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed m-0">
              Symbiosis Quantum Club was founded with a foundational belief: quantum computing should not remain confined to academic silos. We build immersive learning pipelines that take passionate engineers from classical logic to quantum superposition and cloud circuits.
            </p>

            <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed m-0">
              From our flagship IBM Qiskit Fall Fest hackathons to physical delegations at national research laboratories, our members collaborate, construct algorithms, and publish quantum insights.
            </p>

            {/* Bento Stats Grid: Sculpted Architectural Metric Pedestals */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-3 pt-6 border-t border-white/[0.08]">
              {/* Stat 1: 20+ Active Members */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090714]/80 border border-white/[0.08] backdrop-blur-xl shadow-lg flex flex-col gap-1.5 hover:border-purple-500/40 hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[22px] sm:text-[33px] font-extrabold text-purple-300 tracking-tight leading-none">20+</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
                </div>
                <span className="font-pixel text-[10px] sm:text-[11px] text-purple-200/70 uppercase tracking-wider">Active Members</span>
              </div>

              {/* Stat 2: Year-round Workshops */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090714]/80 border border-white/[0.08] backdrop-blur-xl shadow-lg flex flex-col gap-1.5 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[18px] sm:text-[26px] font-extrabold text-cyan-300 tracking-tight leading-none">Year-round</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                </div>
                <span className="font-pixel text-[10px] sm:text-[11px] text-cyan-200/70 uppercase tracking-wider">Workshops</span>
              </div>

              {/* Stat 3: 12+ Hands-on Initiatives */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090714]/80 border border-white/[0.08] backdrop-blur-xl shadow-lg flex flex-col gap-1.5 hover:border-emerald-500/40 hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[22px] sm:text-[33px] font-extrabold text-emerald-300 tracking-tight leading-none">12+</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="font-pixel text-[10px] sm:text-[11px] text-emerald-200/70 uppercase tracking-wider">Workshops Run</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
