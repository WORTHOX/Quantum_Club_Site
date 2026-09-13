import useScrollReveal from '../../hooks/useScrollReveal'

export default function VideoRecap() {
  const revealRef = useScrollReveal()

  return (
    <section
      className="py-20 sm:py-28 bg-transparent text-white relative overflow-hidden"
      id="recap"
      ref={revealRef}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[700px] h-[40vw] max-h-[400px] rounded-full pointer-events-none blur-[130px] opacity-15 bg-purple-600" />

      <div className="w-full max-w-5xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Header — left-aligned for variety, not centred like every other section */}
        <span className="font-pixel text-[11px] font-bold tracking-widest text-purple-300 uppercase block mb-3">
          Fall Fest 2025
        </span>
        <h2 className="font-display text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold text-white tracking-tight mb-8">
          Last Year in 60 Seconds
        </h2>

        {/* Video card */}
        <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/[0.08] bg-[#090714] shadow-[0_24px_64px_rgba(0,0,0,0.8)] cursor-pointer group transition-all duration-400 hover:border-purple-400/35">
          <img
            src="/assets/fallfest/Full_Illustration.png"
            alt="IBM Qiskit Fall Fest 2025"
            className="w-full h-full object-cover brightness-70 group-hover:brightness-80 group-hover:scale-[1.02] transition-all duration-600 ease-out"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06040a]/85 via-black/20 to-transparent flex items-center justify-center">
            {/* Play button */}
            <div className="relative flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-600/40 blur-xl animate-pulse" />
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-600/85 border border-purple-400/50 flex items-center justify-center backdrop-blur-sm shadow-[0_0_28px_rgba(168,85,247,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_44px_rgba(168,85,247,0.7)] transition-all duration-300">
                  <svg className="w-7 h-7 sm:w-9 sm:h-9 text-white ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="font-pixel text-[10px] sm:text-[11px] bg-black/75 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-purple-200 border border-purple-500/25 tracking-wider uppercase">
                Watch Highlights
              </span>
            </div>
          </div>

          {/* Bottom meta bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="font-pixel text-[10px] text-white/80 drop-shadow">Symbiosis Institute of Technology</span>
            <span className="font-pixel text-[10px] text-purple-300 font-bold px-2 py-0.5 rounded bg-black/60 border border-white/10 backdrop-blur-sm">
              1:00
            </span>
          </div>
        </div>

        {/* Stats pill */}
        <div className="inline-flex flex-wrap items-center gap-2 mt-6 px-5 py-2 rounded-full bg-[#0a0715]/60 border border-white/[0.07] backdrop-blur-md">
          <span className="font-pixel text-[10px] sm:text-[11px] text-slate-300 tracking-wide">
            <span className="text-purple-300 font-semibold">127 attendees</span>
            <span className="text-white/20 mx-2">·</span>
            <span className="text-cyan-300 font-semibold">3 days</span>
            <span className="text-white/20 mx-2">·</span>
            <span className="text-white font-semibold">12 workshops</span>
            <span className="text-white/20 mx-2">·</span>
            <span className="text-emerald-300 font-semibold">1 hackathon</span>
          </span>
        </div>

      </div>
    </section>
  )
}
