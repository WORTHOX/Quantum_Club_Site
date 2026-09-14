import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  {
    quote: 'The Quantum Club is exactly the kind of forward-thinking initiative that defines the spirit of SIT Pune. It pushes our students to think beyond classical computing and explore the limitless possibilities of the quantum world. I am proud to support and witness this journey!',
    name: 'Dr. Sumit Kumar',
    role: 'Professor & Head of Department - AIML, SIT Pune',
    initials: 'SK',
    accent: 'from-indigo-500 via-violet-500 to-purple-500',
    image: '/sumit-kumar.jpeg',
  },
  {
    quote: 'The Quantum Club provides an excellent platform for students to explore the emerging world of quantum technologies through hands-on learning and innovation. Its activities encourage curiosity, collaboration, and the development of future-ready skills in quantum computing.',
    name: 'Dr. Shivali Wagle',
    role: 'Associate Professor, SIT Pune',
    initials: 'SW',
    accent: 'from-violet-500 via-purple-500 to-fuchsia-500',
    image: '/shivali-wagle.jpeg',
  },
  {
    quote: 'As a Faculty and AI Club Incharge at the AI & ML Department, I particularly appreciate the club’s efforts towards promoting interdisciplinary learning at the intersection of AI and Quantum Computing, encouraging students to explore new computational paradigms and future-ready applications. Their enthusiasm, collaborative spirit, and commitment to building a vibrant technical community are highly appreciable. I wish the Quantum Club continued success in driving research, innovation, and meaningful student engagement.',
    name: 'Dr. Pooja Kamat',
    role: 'Associate Professor, AIML Dept, Research Associate, SCAAI, AI Club Faculty I/C, SIT Pune',
    initials: 'PK',
    accent: 'from-cyan-500 via-violet-500 to-purple-500',
    image: '/pooja-kamat.jpeg',
  },
  {
    quote: "Symbiosis Quantum Club is the youngest, but the most active club in Symbiosis. Quantum Technology and it's awareness is on responsible shoulders of Symbiosis Quantum Club.",
    name: 'Prof. Mayur Gaikwad',
    role: 'Assistant Professor, AIML Dept, FOSS Club Faculty I/C, SIT Pune',
    initials: 'MG',
    accent: 'from-cyan-500 via-violet-500 to-purple-500',
    image: '/mayur-gaikwad.png',
  },
  {
    quote: 'The Quantum Club in the AIML Department is building a strong culture of innovation, bringing quantum computing closer to students through hands-on learning and industry-relevant initiatives. I am proud to see the club building a platform that inspires students to explore, experiment and innovate through emerging technologies.',
    name: 'Dr. Nivedita Mishra',
    role: 'Industry Connect In-Charge, Assistant Professor, AIML Dept, SIT Pune',
    initials: 'NM',
    accent: 'from-cyan-500 via-violet-500 to-purple-500',
    image: '/nivedita-mishra.jpeg',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[active]

  return (
    <section
      className="py-20 sm:py-28 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300"
      id="testimonials"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] max-w-[600px] h-[40vw] max-h-[400px] rounded-full pointer-events-none blur-[130px] opacity-5 dark:opacity-10 bg-purple-500" />

      <div className="w-full max-w-3xl mx-auto px-5 sm:px-8 flex flex-col items-center gap-8 relative z-10">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-500/12 border border-purple-200/90 dark:border-purple-500/25 shadow-xs">
          <span className="font-pixel text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase">
            Faculty Voices
          </span>
        </div>

        {/* Liquid Glass Testimonial Card */}
        <div
          key={active}
          className="w-full p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#090714]/90 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden hover:border-purple-400/40 dark:hover:border-purple-500/25 transition-all duration-500"
        >
          {/* Subtle Decorative quote mark */}
          <span
            className="absolute top-5 left-6 text-[5rem] leading-none font-serif text-slate-900/[0.04] dark:text-white/[0.035] pointer-events-none select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="flex flex-col items-center text-center gap-6 sm:gap-7 relative z-10 animate-fadeIn">
            
            {/* 1. Image First (Apple-inspired portrait halo avatar) */}
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${t.accent} border border-slate-200/50 dark:border-white/20 shadow-[0_0_20px_rgba(147,51,234,0.25)] dark:shadow-[0_0_25px_rgba(168,85,247,0.4)] overflow-hidden relative flex items-center justify-center`}
              >
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="relative z-10 font-display text-2xl font-bold text-white">
                    {t.initials}
                  </span>
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_30%)]" />
              </div>
            </div>

            {/* 2. Refined, Legible Quote Typography (Apple HIG proportions, not oversized) */}
            <p className="font-body text-[1.02rem] sm:text-[1.15rem] leading-[1.75] text-slate-800 dark:text-slate-200 italic m-0 max-w-[42ch]">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* 3. Author Name and Academic Designation */}
            <footer className="flex flex-col items-center gap-2">
              <cite className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white not-italic tracking-tight">
                {t.name}
              </cite>
              <div className="font-pixel text-[10px] sm:text-[11px] text-purple-800 dark:text-purple-300 max-w-lg text-center leading-relaxed font-semibold dark:font-normal">
                {t.role}
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Accessible Tactile Pagination Dots (min 44px hit targets) */}
        <div className="flex items-center gap-1" role="tablist" aria-label="Faculty testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
              className="p-2.5 flex items-center justify-center cursor-pointer group"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-8 bg-purple-600 dark:bg-purple-400 shadow-[0_0_10px_rgba(147,51,234,0.4)] dark:shadow-[0_0_10px_rgba(168,85,247,0.6)]'
                    : 'w-2 bg-slate-300 dark:bg-white/20 group-hover:bg-slate-400 dark:group-hover:bg-white/35'
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
