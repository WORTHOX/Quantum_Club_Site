const BADGE_STYLES = {
  violet:  'bg-purple-50 dark:bg-purple-500/12 text-purple-800 dark:text-purple-300 border-purple-200/90 dark:border-purple-500/25 shadow-xs',
  cyan:    'bg-cyan-50 dark:bg-cyan-500/12 text-cyan-800 dark:text-cyan-300 border-cyan-200/90 dark:border-cyan-500/25 shadow-xs',
  magenta: 'bg-pink-50 dark:bg-pink-500/12 text-pink-800 dark:text-pink-300 border-pink-200/90 dark:border-pink-500/25 shadow-xs',
  emerald: 'bg-emerald-50 dark:bg-emerald-500/12 text-emerald-800 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-500/25 shadow-xs',
  amber:   'bg-amber-50 dark:bg-amber-500/12 text-amber-800 dark:text-amber-300 border-amber-200/90 dark:border-amber-500/25 shadow-xs',
}

const items = [
  { text: 'IBM Qiskit Fall Fest', accent: 'violet',  tag: 'FLAGSHIP'   },
  { text: 'Quantum Algorithms',  accent: 'cyan',     tag: 'ALGORITHMS' },
  { text: 'Cloud Quantum Access', accent: 'magenta',  tag: 'IBM QISKIT' },
  { text: 'Quantum Cryptography',accent: 'emerald',  tag: 'SECURITY'   },
  { text: 'Quantum ML',          accent: 'amber',    tag: 'AI & QML'   },
  { text: 'Research Publications',accent: 'violet',  tag: 'PAPERS'     },
]

// Duplicate enough times that the seam is invisible
const track = [...items, ...items, ...items, ...items]

export default function WhyQuantumMarquee() {
  return (
    <section
      className="py-5 overflow-hidden bg-transparent border-y border-slate-200/80 dark:border-white/[0.06] relative z-10 transition-colors duration-300"
      aria-label="Quantum Club Highlights"
    >
      <div className="overflow-hidden relative flex group">
        <div
          className="flex w-max shrink-0 motion-reduce:animate-none group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 32s linear infinite' }}
        >
          {track.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 sm:gap-5 px-5 sm:px-7 whitespace-nowrap shrink-0"
            >
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-pixel text-[10px] font-bold tracking-wider uppercase border ${BADGE_STYLES[item.accent]}`}
              >
                {item.tag}
              </span>
              <span className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white/80 tracking-tight">
                {item.text}
              </span>
              <span className="text-slate-400 dark:text-white/15 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
