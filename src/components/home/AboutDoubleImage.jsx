import useScrollReveal from '../../hooks/useScrollReveal'

export default function AboutDoubleImage() {
  const revealRef = useScrollReveal({ children: true })

  return (
    <section className="py-20 sm:py-28 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300" id="about" ref={revealRef}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Photo pair formatted cleanly ── */}
          <div className="relative grid grid-cols-[1fr_0.62fr] gap-3 sm:gap-4 items-end">

            {/* Primary image: IBM Qiskit Workshop at SIT Pune */}
            <div className="aspect-[4/5] bg-slate-100 dark:bg-[#090714] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.75)] relative group">
              <img
                src="/assets/images/about-large.webp"
                alt="SQC students at IBM Qiskit Fall Fest workshop"
                className="w-full h-full object-cover brightness-95 dark:brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 dark:from-[#06040a]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                <span className="font-pixel text-[9px] sm:text-[10px] text-white font-semibold truncate">IBM Qiskit Workshop</span>
                <span className="font-pixel text-[8px] sm:text-[9px] text-cyan-300 px-1.5 sm:px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30 shrink-0 font-bold">SIT Pune</span>
              </div>
            </div>

            {/* Secondary image — offset upward: Student Delegation at IISER Pune */}
            <div className="aspect-[3/4] bg-slate-100 dark:bg-[#090714] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative -translate-y-[14%] group">
              <img
                src="/assets/events/iiser-visit/photo-2.webp"
                alt="Symbiosis Quantum Club Student Delegation with Certificates at IISER Pune"
                className="w-full h-full object-cover brightness-95 dark:brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 dark:from-[#06040a]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3">
                <span className="block font-pixel text-[9px] sm:text-[10px] text-white font-semibold truncate">IISER Pune</span>
                <span className="block font-pixel text-[8px] sm:text-[9px] text-emerald-300 mt-0.5 truncate font-bold">Research Visit</span>
              </div>
            </div>
          </div>

          {/* ── Right: Editorial Content formatted cleanly ── */}
          <div className="flex flex-col gap-5">

            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-[#0e0720]/50 border border-purple-200/90 dark:border-purple-500/30 shadow-xs backdrop-blur-md self-start">
              <span className="font-pixel text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase">
                OUR MISSION
              </span>
            </div>

            <h2 className="font-display text-[clamp(1.85rem,3.5vw,3rem)] font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight m-0">
              We make quantum computing{' '}
              <span className="bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-600 dark:from-purple-300 dark:via-violet-200 dark:to-indigo-300 bg-clip-text text-transparent">
                accessible to everyone
              </span>
            </h2>

            <div className="space-y-3">
              <p className="font-body text-base sm:text-[1.05rem] text-slate-700 dark:text-slate-300 leading-[1.75] m-0">
                Symbiosis Quantum Club bridges the gap between theory and practice. We run immersive workshops, cloud quantum computing sessions with Qiskit, and research visits — turning curious students into quantum practitioners.
              </p>
            </div>

            {/* Stats formatted cleanly in modern cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-5 border-t border-slate-200/80 dark:border-white/[0.07]">
              {[
                { value: '20+', label: 'Active Members', color: 'text-purple-700 dark:text-purple-300' },
                { value: '12+', label: 'Workshops Run', color: 'text-cyan-700 dark:text-cyan-300' },
                { value: '1+', label: 'Year Active', color: 'text-emerald-700 dark:text-emerald-300' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#090714]/70 border border-slate-200/90 dark:border-white/[0.07] shadow-sm hover:shadow hover:border-slate-300 dark:hover:border-white/20 transition-all flex flex-col gap-1"
                >
                  <span className={`font-pixel text-base xs:text-lg sm:text-[1.6rem] lg:text-[1.8rem] font-extrabold ${stat.color} leading-none truncate`}>
                    {stat.value}
                  </span>
                  <span className="font-pixel text-[8px] xs:text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-wide leading-tight mt-1 font-semibold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
