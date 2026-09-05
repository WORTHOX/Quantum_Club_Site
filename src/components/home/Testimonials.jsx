import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  {
    quote: "Fall Fest 2025 was the first time I ran a quantum circuit on real hardware. The workshop made it feel less like science fiction and more like a skill I could actually learn.",
    name: "Priya Sharma",
    role: "Computer Science & Engineering",
    year: "3rd Year",
    initials: "PS",
  },
  {
    quote: "The hackathon forced me to think differently. We built a quantum random number generator in 6 hours. Not perfect, but it worked on IBM hardware.",
    name: "Arjun Mehta",
    role: "Electronics & Telecommunication",
    year: "2nd Year",
    initials: "AM",
  },
  {
    quote: "I came in knowing nothing about quantum computing. I left understanding superposition, entanglement, and how to write basic Qiskit code. That is a good three days.",
    name: "Sneha Kulkarni",
    role: "Information Technology",
    year: "4th Year",
    initials: "SK",
  },
  {
    quote: "The community is what makes SQC different. It is not just a technical club. People actually help each other learn and collaborate on research.",
    name: "Rohan Desai",
    role: "Artificial Intelligence & ML",
    year: "3rd Year",
    initials: "RD",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const current = testimonials[active]

  return (
    <section className="py-24 sm:py-32 bg-transparent min-h-[60dvh] flex items-center justify-center text-white relative overflow-hidden" id="testimonials">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[650px] h-[50vw] max-h-[500px] rounded-full pointer-events-none blur-[140px] opacity-15 bg-[radial-gradient(circle,#c084fc_0%,transparent_70%)]" />

      <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 flex flex-col items-center gap-10 sm:gap-12 relative z-10">
        
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e0720]/50 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
          <span className="font-pixel text-[11px] font-semibold text-purple-300 tracking-widest uppercase">
            COMMUNITY VOICES
          </span>
        </div>

        {/* Testimonial Quote Box in Sculpted Obsidian Glass */}
        <div className="w-full max-w-[820px] p-8 sm:p-14 rounded-3xl bg-[#090714]/80 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-500 hover:border-purple-500/30">
          {/* Subtle Decorative Quote Glyph Watermark */}
          <span className="absolute top-4 left-6 text-7xl font-serif text-white/[0.04] pointer-events-none select-none leading-none">
            “
          </span>

          <blockquote className="animate-fadeIn flex flex-col items-center text-center gap-8 relative z-10" key={active}>
            <p className="font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-normal leading-relaxed text-slate-100 italic tracking-tight m-0 max-w-[42ch]">
              &ldquo;{current.quote}&rdquo;
            </p>
            
            <footer className="flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center font-display font-bold text-purple-200 text-sm shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                {current.initials}
              </div>

              <div className="flex flex-col items-center gap-1">
                <cite className="font-display text-lg sm:text-xl font-bold text-white not-italic tracking-tight">
                  {current.name}
                </cite>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="text-purple-300 font-medium">{current.role}</span>
                  <span className="text-white/20">•</span>
                  <span>{current.year}</span>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Dot / Pill Pagination */}
        <div className="flex items-center gap-3" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === active 
                  ? 'w-9 bg-purple-400 shadow-[0_0_14px_#a855f7]' 
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
