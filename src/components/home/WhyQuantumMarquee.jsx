const BADGE_STYLES = {
  violet:  'bg-purple-500/12 text-purple-300 border-purple-500/25',
  cyan:    'bg-cyan-500/12 text-cyan-300 border-cyan-500/25',
  magenta: 'bg-pink-500/12 text-pink-300 border-pink-500/25',
  emerald: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25',
  amber:   'bg-amber-500/12 text-amber-300 border-amber-500/25',
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
      className="py-5 overflow-hidden bg-transparent border-y border-white/[0.06] relative z-10"
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
              <span className="font-display text-base sm:text-lg font-semibold text-white/80 tracking-tight">
                {item.text}
              </span>
              <span className="text-white/15 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
