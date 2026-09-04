import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  {
    quote: "Fall Fest 2025 was the first time I ran a quantum circuit on real hardware. The workshop made it feel less like science fiction and more like a skill I could actually learn.",
    name: "Priya Sharma",
    role: "Computer Science & Engineering",
    year: "3rd Year",
  },
  {
    quote: "The hackathon forced me to think differently. We built a quantum random number generator in 6 hours. Not perfect, but it worked on IBM hardware.",
    name: "Arjun Mehta",
    role: "Electronics & Telecommunication",
    year: "2nd Year",
  },
  {
    quote: "I came in knowing nothing about quantum computing. I left understanding superposition, entanglement, and how to write basic Qiskit code. That is a good three days.",
    name: "Sneha Kulkarni",
    role: "Information Technology",
    year: "4th Year",
  },
  {
    quote: "The community is what makes SQC different. It is not just a technical club. People actually help each other learn and collaborate on research.",
    name: "Rohan Desai",
    role: "Artificial Intelligence & ML",
    year: "3rd Year",
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
      <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 flex flex-col items-center gap-10 sm:gap-12 relative z-10">
        
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-transparent border border-purple-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="font-pixel text-[11px] font-semibold text-purple-300 tracking-widest uppercase">
            COMMUNITY VOICES
          </span>
        </div>

        {/* Testimonial Quote Box */}
        <div className="w-full max-w-[780px] p-8 sm:p-12 rounded-2xl bg-transparent border border-purple-500/25 shadow-2xl relative">
          <blockquote className="animate-fadeIn flex flex-col items-center text-center gap-8" key={active}>
            <p className="font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-normal leading-relaxed text-slate-100 italic tracking-tight m-0">
              &ldquo;{current.quote}&rdquo;
            </p>
            
            <footer className="flex flex-col items-center gap-1.5">
              <cite className="font-display text-lg sm:text-xl font-bold text-white not-italic">
                {current.name}
              </cite>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="text-purple-300 font-medium">{current.role}</span>
                <span>•</span>
                <span>{current.year}</span>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center gap-3" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === active 
                  ? 'w-8 bg-purple-400 shadow-[0_0_12px_#a855f7]' 
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
