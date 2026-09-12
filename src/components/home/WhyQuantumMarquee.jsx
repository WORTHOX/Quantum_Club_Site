const BADGE_STYLES = {
  violet: 'bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.15)]',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.15)]',
  magenta: 'bg-pink-500/15 text-pink-300 border-pink-500/30 shadow-[0_0_8px_rgba(236,72,153,0.15)]',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.15)]',
}

export default function WhyQuantumMarquee() {
  const items = [
    { text: 'IBM Qiskit Fall Fest', accent: 'violet', tag: 'FLAGSHIP' },
    { text: 'Quantum Supremacy', accent: 'cyan', tag: 'ALGORITHMS' },
    { text: 'Qubit Hardware Labs', accent: 'magenta', tag: 'HARDWARE' },
    { text: 'Quantum Cryptography', accent: 'emerald', tag: 'SECURITY' },
    { text: 'Quantum Machine Learning', accent: 'amber', tag: 'AI & QML' },
    { text: 'Research Publications', accent: 'violet', tag: 'PAPERS' },
  ]

  // Quadruple items to ensure seamless continuous loop across any viewport width
  const marqueeItems = [...items, ...items, ...items, ...items]

  return (
    <section 
      className="py-2.5 sm:py-3 overflow-hidden bg-[#070a08]/75 backdrop-blur-md border-y border-white/[0.08] relative z-10 select-none" 
      aria-label="Quantum Club Highlights Marquee"
    >
      {/* Edge gradient masks for smooth fade-in / fade-out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#06040a] to-transparent z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#06040a] to-transparent z-10" aria-hidden="true" />

      {/* Inline self-contained keyframe animation for smooth 60fps GPU acceleration */}
      <style>{`
        @keyframes marqueeTrack {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>

      <div className="overflow-hidden relative flex group">
        <div 
          className="flex w-max shrink-0 motion-reduce:animate-none group-hover:[animation-play-state:paused]"
          style={{ 
            animation: 'marqueeTrack 32s linear infinite',
            willChange: 'transform'
          }}
        >
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 whitespace-nowrap shrink-0">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border ${BADGE_STYLES[item.accent] || BADGE_STYLES.violet}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-currentColor shadow-[0_0_6px_currentColor] animate-pulse" />
                {item.tag}
              </span>
              <span className="font-display text-xs sm:text-sm md:text-[0.9375rem] font-bold text-white tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                {item.text}
              </span>
              <span className="text-[#34d399]/40 text-xs sm:text-sm pl-2 select-none" aria-hidden="true">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
