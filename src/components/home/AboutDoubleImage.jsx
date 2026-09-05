import useScrollReveal from '../../hooks/useScrollReveal'

export default function AboutDoubleImage() {
  const revealRef = useScrollReveal({ children: true })

  return (
    <section className="py-24 sm:py-32 bg-transparent text-white relative overflow-hidden" id="about" ref={revealRef}>
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Real Layered Event Images with Glassmorphic Badges */}
          <div className="relative grid grid-cols-[1fr_0.65fr] gap-4 sm:gap-6 items-end">
            {/* Primary Large Image */}
            <div className="aspect-[4/5] bg-transparent border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl relative group">
              <img
                src="/assets/events/iiser-visit/photo-1.jpg"
                alt="Symbiosis Quantum Club IISER Pune Laboratory Visit"
                className="w-full h-full object-cover brightness-90 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06040a]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0e0720]/40 border border-purple-500/30 backdrop-blur-[2px] flex items-center justify-between">
                <span className="font-pixel text-[11px] font-semibold text-white">IISER Pune Lab Visit</span>
                <span className="font-pixel text-[11px] text-purple-300 uppercase tracking-wider">Research Tour</span>
              </div>
            </div>

            {/* Secondary Overlapping Image */}
            <div className="aspect-[3/4] bg-transparent border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl relative -translate-y-[15%] group">
              <img
                src="/assets/events/fall-fest-2025/photo-4.jpg"
                alt="Quantum computing hardware and circuit demonstration"
                className="w-full h-full object-cover brightness-90 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06040a]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#0e0720]/40 border border-purple-500/30 backdrop-blur-[2px]">
                <span className="block font-pixel text-[11px] font-semibold text-white truncate">Qiskit Fall Fest</span>
                <span className="block font-pixel text-[11px] text-cyan-300 uppercase tracking-wider">Hands-on Sprints</span>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Content & Bento Stat Grid */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-pixel text-[11px] font-bold tracking-widest text-purple-300 uppercase">
                OUR MISSION & ROOTS
              </span>
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

            {/* Bento Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-3 pt-6 border-t border-purple-900/30">
              <div className="p-4 rounded-xl bg-transparent border border-purple-500/25 flex flex-col gap-1">
                <span className="font-pixel text-[22px] sm:text-[33px] font-extrabold text-purple-300 tracking-tight leading-none">127+</span>
                <span className="font-pixel text-[11px] text-purple-300/70 uppercase tracking-wider">2025 Attendees</span>
              </div>
              <div className="p-4 rounded-xl bg-transparent border border-purple-500/25 flex flex-col gap-1">
                <span className="font-pixel text-[22px] sm:text-[33px] font-extrabold text-cyan-300 tracking-tight leading-none">3 Days</span>
                <span className="font-pixel text-[11px] text-cyan-300/70 uppercase tracking-wider">Flagship Fest</span>
              </div>
              <div className="p-4 rounded-xl bg-transparent border border-purple-500/25 flex flex-col gap-1">
                <span className="font-pixel text-[22px] sm:text-[33px] font-extrabold text-emerald-300 tracking-tight leading-none">12+</span>
                <span className="font-pixel text-[11px] text-emerald-300/70 uppercase tracking-wider">Workshops Run</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
