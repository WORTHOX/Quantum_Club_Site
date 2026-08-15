import useScrollReveal from '../../hooks/useScrollReveal'

export default function VideoRecap() {
  const revealRef = useScrollReveal()

  return (
    <section className="py-24 sm:py-32 bg-[#07040d] text-center text-white relative overflow-hidden" id="recap" ref={revealRef}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="w-full max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120d1c] border border-[#a855f7]/30 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
          <span className="font-mono text-xs font-semibold text-[#c084fc] tracking-widest uppercase">
            FALL FEST 2025 ARCHIVE
          </span>
        </div>

        <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white tracking-tight mt-1 mb-10 sm:mb-12">
          Last Year in 60 Seconds
        </h2>

        {/* Video Player Card with Real Poster Visual */}
        <div className="max-w-[900px] mx-auto aspect-video rounded-2xl overflow-hidden relative border border-white/15 bg-[#120d1c] shadow-2xl cursor-pointer group">
          <img
            src="/assets/fallfest/Full_Illustration.png"
            alt="IBM Qiskit Fall Fest 2025 Keynote and Workshops"
            className="w-full h-full object-cover brightness-75 contrast-110 group-hover:scale-103 group-hover:brightness-90 transition-all duration-700 ease-out"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#07040d]/90 via-black/40 to-transparent flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              {/* Glowing Play Icon in Violet & Magenta */}
              <div className="w-18 h-18 rounded-full bg-[#120d1c]/90 border border-[#c084fc]/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.35)] group-hover:scale-110 group-hover:shadow-[0_0_45px_rgba(236,72,153,0.6)] group-hover:border-[#ec4899] transition-all duration-300">
                <svg className="w-8 h-8 text-[#c084fc] group-hover:text-[#f472b6] ml-1 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <span className="font-mono text-xs sm:text-sm bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full text-slate-200 border border-white/15 tracking-wider uppercase font-semibold">
                Watch Festival Highlights
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-left pointer-events-none">
            <span className="font-mono text-xs text-white drop-shadow-md">Symbiosis Institute of Technology</span>
            <span className="font-mono text-xs text-[#c084fc] font-bold drop-shadow-md">1:00 MIN</span>
          </div>
        </div>

        {/* Stats strip */}
        <p className="font-mono text-xs sm:text-sm text-slate-400 mt-8 tracking-wide">
          <span className="text-[#c084fc]">127 attendees</span> ✦ <span className="text-[#f472b6]">3 days</span> ✦ <span className="text-white">12 workshops</span> ✦ <span className="text-[#38bdf8]">1 hackathon</span>
        </p>
      </div>
    </section>
  )
}
