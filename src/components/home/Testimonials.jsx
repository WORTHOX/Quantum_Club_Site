import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  {
    quote: "The Quantum Club is exactly the kind of forward-thinking initiative that defines the spirit of SIT Pune. It pushes our students to think beyond classical computing and explore the limitless possibilities of the quantum world. I am proud to support and witness this journey!",
    name: "Dr. Sumit Kumar",
    role: "Professor & Head of Department - AIML, SIT Pune",
    initials: "SK",
    image: "/sumit-kumar.jpeg",
  },
  {
    quote: "The Quantum Club provides an excellent platform for students to explore the emerging world of quantum technologies through hands-on learning and innovation. Its activities encourage curiosity, collaboration, and the development of future-ready skills in quantum computing.",
    name: "Dr. Shivali Wagle",
    role: "Associate Professor, SIT Pune",
    initials: "SW",
    image: "/shivali-wagle.jpeg",
  },
  {
    quote: "As a Faculty and AI Club Incharge at the AI & ML Department, I particularly appreciate the club’s efforts towards promoting interdisciplinary learning at the intersection of AI and Quantum Computing, encouraging students to explore new computational paradigms and future-ready applications. Their enthusiasm, collaborative spirit, and commitment to building a vibrant technical community are highly appreciable. I wish the Quantum Club continued success in driving research, innovation, and meaningful student engagement.",
    name: "Dr. Pooja Kamat",
    role: "Associate Professor, AIML Dept, Research Associate, SCAAI, AI Club Faculty I/C, SIT Pune",
    initials: "PK",
    image: "/pooja-kamat.jpeg",
  },
  {
    quote: "Symbiosis Quantum Club is the youngest, but the most active club in Symbiosis. Quantum Technology and it's awareness is on responsible shoulders of Symbiosis Quantum Club.",
    name: "Prof. Mayur Gaikwad",
    role: "Assistant Professor, AIML Dept, FOSS Club Faculty I/C, SIT Pune",
    initials: "MG",
    image: "/mayur-gaikwad.png",
  },
  {
    quote: "The Quantum Club in the AIML Department is building a strong culture of innovation, bringing quantum computing closer to students through hands-on learning and industry-relevant initiatives. I am proud to see the club building a platform that inspires students to explore, experiment and innovate through emerging technologies.",
    name: "Dr. Nivedita Mishra",
    role: "Industry Connect In-Charge, Assistant Professor, AIML Dept, SIT Pune",
    initials: "NM",
    image: "/nivedita-mishra.jpeg",
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
            FACULTY VOICES
          </span>
        </div>

        {/* Testimonial Quote Box in Sculpted Obsidian Glass */}
        <div className="w-full max-w-[820px] p-8 sm:p-14 rounded-3xl bg-[#090714]/80 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-500 hover:border-purple-500/30">
          {/* Subtle Decorative Quote Glyph Watermark */}
          <span className="absolute top-4 left-6 text-7xl font-serif text-white/[0.04] pointer-events-none select-none leading-none" aria-hidden="true">
            “
          </span>

          <blockquote className="animate-fadeIn flex flex-col items-center text-center gap-8 relative z-10" key={active}>
            <p className="font-display text-[clamp(1.15rem,2.2vw,1.75rem)] font-normal leading-relaxed text-slate-100 italic tracking-tight m-0 max-w-[42ch]">
              &ldquo;{current.quote}&rdquo;
            </p>
            
            <footer className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/25 via-purple-500/25 to-pink-500/25 border-2 border-purple-500/40 flex items-center justify-center font-display font-bold text-purple-200 text-base shadow-[0_0_20px_rgba(168,85,247,0.3)] overflow-hidden relative">
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span>{current.initials}</span>
                )}
              </div>

              <div className="flex flex-col items-center gap-1.5 px-2">
                <cite className="font-display text-lg sm:text-xl font-bold text-white not-italic tracking-tight">
                  {current.name}
                </cite>
                <div className="font-mono text-xs text-slate-400 max-w-lg text-center leading-relaxed">
                  <span className="text-purple-300 font-medium">{current.role}</span>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Dot / Pill Pagination */}
        <div className="flex items-center gap-3" role="tablist" aria-label="Faculty testimonial navigation">
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
