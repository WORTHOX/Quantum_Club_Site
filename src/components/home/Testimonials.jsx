import { useState, useEffect, useCallback } from 'react'

const testimonials = [
	
	{
		quote: 'The Quantum Club is exactly the kind of forward-thinking initiative that defines the spirit of SIT Pune. It pushes our students to think beyond classical computing and explore the limitless possibilities of the quantum world. I am proud to support and witness this journey!',
		name: 'Dr. Sumit Kumar',
		role: 'Professor & Head of Department - AIML, SIT Pune',
		initials: 'SK',
		accent: 'from-indigo-500 via-violet-500 to-purple-500',
		image: '/sumit-kumar.jpeg',
	},{
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
		initials: 'PK',
		accent: 'from-cyan-500 via-violet-500 to-purple-500',
		image: '/mayur-gaikwad.png',
	},
	{
		quote: "The Quantum Club in the AIML Department is building a strong culture of innovation, bringing quantum computing closer to students through hands-on learning and industry-relevant initiatives. I am proud to see the club building a platform that inspires students to explore, experiment and innovate through emerging technologies.",
		name: 'Dr. Nivedita Mishra',
		role: 'Industry Connect In-Charge, Assistant Professor, AIML Dept, SIT Pune',
		initials: 'NM',
		accent: 'from-cyan-500 via-violet-500 to-purple-500',
		image: '/nivedita-mishra.jpeg',
	},
]

export default function Testimonials() {
	const [active, setActive] = useState(0)

	const next = useCallback(() => setActive((p) => (p + 1) % testimonials.length), [])

	useEffect(() => {
		const timer = setInterval(next, 6000)
		return () => clearInterval(timer)
	}, [next])

	const t = testimonials[active]

	return (
		<section
			className="py-20 sm:py-28 bg-transparent text-white relative overflow-hidden"
			id="testimonials"
		>
			{/* Ambient glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] max-w-[600px] h-[40vw] max-h-[400px] rounded-full pointer-events-none blur-[130px] opacity-10 bg-purple-500" />

			<div className="w-full max-w-3xl mx-auto px-5 sm:px-8 flex flex-col items-center gap-8 relative z-10">
				{/* Eyebrow — minimal, no badge chrome */}
				<span className="font-pixel text-[11px] font-bold tracking-widest text-purple-300 uppercase">
					Faculty Voices
				</span>

				{/* Quote card */}
				<div
					key={active}
					className="w-full p-5 sm:p-10 rounded-2xl bg-[#090714]/80 border border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden hover:border-purple-500/25 transition-colors duration-500"
				>
					{/* Decorative quote mark */}
					<span className="absolute top-5 left-6 text-[5rem] leading-none font-serif text-white/[0.035] pointer-events-none select-none" aria-hidden="true">
						"
					</span>

					<blockquote className="flex flex-col items-center text-center gap-7 relative z-10 animate-fadeIn">
						<div className="relative">
							<div className={`w-20 h-20 rounded-full bg-gradient-to-br ${t.accent} border border-white/20 shadow-[0_0_25px_rgba(168,85,247,0.4)] overflow-hidden relative flex items-center justify-center`}>
								{t.image ? (
									<img
										src={t.image}
										alt={t.name}
										className="w-full h-full object-cover object-center"
									/>
								) : (
									<span className="relative z-10 font-display text-2xl font-bold text-white">{t.initials}</span>
								)}
								<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_30%)]" />
							</div>
						</div>

						<p className="font-body text-[1.05rem] sm:text-[1.2rem] leading-[1.75] text-slate-200 italic m-0 max-w-[40ch]">
							&ldquo;{t.quote}&rdquo;
						</p>

						<footer className="flex flex-col items-center gap-2.5">
							<div className="flex flex-col items-center gap-0.5">
								<cite className="font-display text-base sm:text-lg font-bold text-white not-italic">
									{t.name}
								</cite>
								<div className="flex items-center gap-2 font-pixel text-[10px] text-slate-400">
									<span className="text-purple-300">{t.role}</span>
									<span className="text-white/20">·</span>
									<span>{t.year}</span>
								</div>
							</div>
						</footer>
					</blockquote>
				</div>

				{/* Pagination dots */}
				<div className="flex items-center gap-1" role="tablist" aria-label="Testimonials">
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
										? 'w-8 bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]'
										: 'w-2 bg-white/20 group-hover:bg-white/35'
								}`}
							/>
						</button>
					))}
				</div>
			</div>
		</section>
	)
}
