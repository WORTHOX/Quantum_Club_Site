import useScrollReveal from '../../hooks/useScrollReveal'

export default function VideoRecap() {
  const revealRef = useScrollReveal()

  return (
    <section className="py-24 sm:py-32 bg-transparent text-center text-white relative overflow-hidden" id="recap" ref={revealRef}>
      <div className="w-full max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e0720]/35 border border-purple-500/30 mb-4 backdrop-blur-[2px]">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="font-pixel text-[11px] font-semibold text-purple-300 tracking-widest uppercase">
            FALL FEST 2025 ARCHIVE
          </span>
        </div>

        <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white tracking-tight mt-1 mb-10 sm:mb-12">
          Last Year in 60 Seconds
        </h2>

        {/* Video Player Card with Real Poster Visual */}
        <div className="max-w-[900px] mx-auto aspect-video rounded-2xl overflow-hidden relative border border-purple-500/30 bg-[#0e0720]/25 shadow-2xl backdrop-blur-[2px] cursor-pointer group">
          <img
            src="/assets/fallfest/Full_Illustration.png"
            alt="IBM Qiskit Fall Fest 2025 Keynote and Workshops"
            className="w-full h-full object-cover brightness-75 contrast-110 group-hover:scale-103 group-hover:brightness-90 transition-all duration-700 ease-out"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#06040a]/90 via-black/30 to-transparent flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              {/* Glowing Play Icon in Signature Purple */}
              <div className="w-18 h-18 rounded-full bg-purple-600/80 border border-purple-400/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_45px_rgba(168,85,247,0.7)] group-hover:border-purple-300 transition-all duration-300">
                <svg className="w-8 h-8 text-white ml-1 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <span className="font-pixel text-[11px] sm:text-xs bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full text-purple-200 border border-purple-500/30 tracking-wider uppercase font-semibold">
                Watch Festival Highlights
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-left pointer-events-none">
            <span className="font-pixel text-[11px] text-white drop-shadow-md">Symbiosis Institute of Technology</span>
            <span className="font-pixel text-[11px] text-purple-300 font-bold drop-shadow-md">1:00 MIN</span>
          </div>
        </div>

        {/* Stats strip */}
        <p className="font-pixel text-[11px] sm:text-xs text-slate-400 mt-8 tracking-wide">
          <span className="text-purple-300">127 attendees</span> ✦ <span className="text-cyan-300">3 days</span> ✦ <span className="text-white">12 workshops</span> ✦ <span className="text-emerald-300">1 hackathon</span>
        </p>
      </div>
    </section>
  )
}
