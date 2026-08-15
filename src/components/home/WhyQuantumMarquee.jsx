const BADGE_STYLES = {
  violet: 'bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
  magenta: 'bg-pink-500/15 text-pink-300 border-pink-500/30 shadow-[0_0_12px_rgba(236,72,153,0.2)]',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
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

  return (
    <section className="py-7 overflow-hidden bg-[#07040d] border-y border-white/[0.08] relative z-10" aria-label="Quantum Club Highlights">
      <div className="overflow-hidden relative flex group">
        <div 
          className="flex w-max motion-reduce:animate-none shrink-0 group-hover:[animation-play-state:paused]" 
          style={{ animation: 'marqueeScroll 28s linear infinite' }}
        >
          {[...items, ...items, ...items, ...items].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 sm:gap-6 px-6 sm:px-8 whitespace-nowrap shrink-0">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[0.68rem] font-bold tracking-wider uppercase border ${BADGE_STYLES[item.accent] || BADGE_STYLES.violet}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-currentColor shadow-[0_0_6px_currentColor]" />
                {item.tag}
              </span>
              <span className="font-display text-[clamp(1.5rem,2.5vw,2.4rem)] font-bold text-white tracking-tight opacity-90 hover:opacity-100 transition-opacity">
                {item.text}
              </span>
              <span className="text-white/20 text-lg pl-2">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
