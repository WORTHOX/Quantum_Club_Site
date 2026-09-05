import useScrollReveal from '../../hooks/useScrollReveal'

export default function VideoRecap() {
  const revealRef = useScrollReveal()

  return (
    <section className="py-24 sm:py-32 bg-transparent text-center text-white relative overflow-hidden" id="recap" ref={revealRef}>
      {/* Soft Ambient Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] h-[50vw] max-h-[500px] rounded-full pointer-events-none blur-[140px] opacity-20 bg-[radial-gradient(circle,#a855f7_0%,transparent_70%)]" />

      <div className="w-full max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e0720]/50 border border-purple-500/30 mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
          <span className="font-pixel text-[11px] font-semibold text-purple-300 tracking-widest uppercase">
            FALL FEST 2025 ARCHIVE
          </span>
        </div>

        <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white tracking-tight mt-1 mb-10 sm:mb-12">
          Last Year in 60 Seconds
        </h2>

        {/* Video Player Card with Real Poster Visual */}
        <div className="max-w-[920px] mx-auto aspect-video rounded-3xl overflow-hidden relative border border-white/[0.09] bg-[#090714]/85 shadow-[0_30px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl cursor-pointer group transition-all duration-500 hover:border-purple-400/40">
          <img
            src="/assets/fallfest/Full_Illustration.png"
            alt="IBM Qiskit Fall Fest 2025 Keynote and Workshops"
            className="w-full h-full object-cover brightness-75 contrast-110 group-hover:scale-103 group-hover:brightness-90 transition-all duration-700 ease-out"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#06040a]/90 via-black/30 to-transparent flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              {/* Glowing Play Icon in Signature Purple with Concentric Halo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl animate-pulse" />
                <div className="w-20 h-20 rounded-full bg-purple-600/90 border border-purple-400/60 flex items-center justify-center backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_55px_rgba(168,85,247,0.8)] group-hover:border-purple-300 transition-all duration-300 relative z-10">
                  <svg className="w-9 h-9 text-white ml-1 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <span className="font-pixel text-[11px] sm:text-xs bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-purple-200 border border-purple-500/30 tracking-wider uppercase font-semibold shadow-lg">
                Watch Festival Highlights
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-left pointer-events-none">
            <span className="font-pixel text-[11px] text-white drop-shadow-md">Symbiosis Institute of Technology</span>
            <span className="font-pixel text-[11px] text-purple-300 font-bold drop-shadow-md px-2 py-0.5 rounded bg-black/50 border border-white/10 backdrop-blur-sm">1:00 MIN</span>
          </div>
        </div>

        {/* Stats strip wrapped in sculpted frosted ribbon */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-8 px-6 py-2.5 rounded-full bg-[#0a0715]/60 border border-white/[0.08] backdrop-blur-md shadow-md">
          <p className="font-pixel text-[11px] sm:text-xs text-slate-300 m-0 tracking-wide">
            <span className="text-purple-300 font-semibold">127 attendees</span> ✦ <span className="text-cyan-300 font-semibold">3 days</span> ✦ <span className="text-white font-semibold">12 workshops</span> ✦ <span className="text-emerald-300 font-semibold">1 hackathon</span>
          </p>
        </div>
      </div>
    </section>
  )
}
