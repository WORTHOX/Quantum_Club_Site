import useScrollReveal from '../../hooks/useScrollReveal'

export default function AboutDoubleImage() {
  const revealRef = useScrollReveal({ children: true })

  return (
    <section className="py-24 sm:py-32 bg-[#07040d] text-white relative overflow-hidden" id="about" ref={revealRef}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-pink-600/10 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Real Layered Event Images with Glassmorphic Badges */}
          <div className="relative grid grid-cols-[1fr_0.65fr] gap-4 sm:gap-6 items-end">
            {/* Primary Large Image */}
            <div className="aspect-[4/5] bg-[#120d1c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group">
              <img
                src="/assets/events/iiser-visit/photo-1.jpg"
                alt="Symbiosis Quantum Club IISER Pune Laboratory Visit"
                className="w-full h-full object-cover brightness-90 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07040d]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#120d1c]/90 border border-white/15 backdrop-blur-md flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-white">IISER Pune Lab Visit</span>
                <span className="font-mono text-[0.68rem] text-[#c084fc] uppercase tracking-wider">Research Tour</span>
              </div>
            </div>

            {/* Secondary Overlapping Image */}
            <div className="aspect-[3/4] bg-[#120d1c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative -translate-y-[15%] group">
              <img
                src="/assets/events/iiser-visit/photo-5.jpg"
                alt="Quantum computing hardware and circuit demonstration"
                className="w-full h-full object-cover brightness-90 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07040d]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#120d1c]/90 border border-white/15 backdrop-blur-md">
                <span className="block font-mono text-[0.72rem] font-semibold text-white truncate">Qiskit Fall Fest</span>
                <span className="block font-mono text-[0.62rem] text-[#f472b6] uppercase tracking-wider">Hands-on Sprints</span>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Content & Bento Stat Grid */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#a855f7] to-[#ec4899]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#c084fc] uppercase">
                OUR MISSION & ROOTS
              </span>
            </div>

            <h2 className="font-display text-[clamp(2.2rem,3.8vw,3.2rem)] font-extrabold text-white leading-[1.08] tracking-tight m-0">
              We make quantum computing
              <br />
              <span className="bg-gradient-to-r from-[#c084fc] via-[#f472b6] to-[#00f0ff] bg-clip-text text-transparent">
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
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-3 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-[#120d1c]/80 border border-white/10 flex flex-col gap-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#c084fc] tracking-tight leading-none">127+</span>
                <span className="font-mono text-[0.68rem] sm:text-xs text-slate-400 uppercase tracking-wider">2025 Attendees</span>
              </div>
              <div className="p-4 rounded-xl bg-[#120d1c]/80 border border-white/10 flex flex-col gap-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#f472b6] tracking-tight leading-none">3 Days</span>
                <span className="font-mono text-[0.68rem] sm:text-xs text-slate-400 uppercase tracking-wider">Flagship Fest</span>
              </div>
              <div className="p-4 rounded-xl bg-[#120d1c]/80 border border-white/10 flex flex-col gap-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#38bdf8] tracking-tight leading-none">12+</span>
                <span className="font-mono text-[0.68rem] sm:text-xs text-slate-400 uppercase tracking-wider">Workshops Run</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
