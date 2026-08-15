import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const ARCHIVE_DATA = {
  2025: {
    year: 2025,
    theme: 'Quantum Fundamentals & Circuits',
    tagline: 'Our first IBM Qiskit Fall Fest — where it all began.',
    date: 'October–November 2025',
    location: 'Symbiosis Institute of Technology, Pune',
    duration: '4 weeks',
    participants: '120+',
    sessions: 8,
    highlights: [
      {
        title: 'Introduction to Qiskit',
        desc: 'Hands-on workshop covering quantum gates, circuits, and measurement basics using IBM Qiskit SDK.',
        tag: 'Workshop',
      },
      {
        title: 'Quantum Superposition Lab',
        desc: 'Interactive coding session where participants built their first superposition circuits and ran them on real IBM quantum hardware.',
        tag: 'Lab',
      },
      {
        title: 'Entanglement & Bell States',
        desc: 'Deep dive into quantum entanglement with practical exercises using Qiskit\'s statevector simulator.',
        tag: 'Workshop',
      },
      {
        title: 'Mini Hackathon',
        desc: '8-hour hackathon where teams competed to solve quantum optimization problems using variational algorithms.',
        tag: 'Competition',
      },
    ],
    achievements: [
      'Official IBM Qiskit Fall Fest Partner — first year',
      '120+ students introduced to quantum computing',
      'Top 3 finishing among Indian university participants',
      '4 student projects submitted to IBM review',
    ],
    gallery: [
      { label: 'Opening Workshop' },
      { label: 'Quantum Lab Session' },
      { label: 'Team Hackathon' },
    ],
    sponsors: ['IBM Quantum', 'Symbiosis Institute of Technology'],
    prevYear: null,
    nextYear: 2026,
  },
  2026: {
    year: 2026,
    theme: 'A Decade of Quantum on Cloud',
    tagline: 'Celebrating 10 years of quantum computing on cloud — our biggest Fest yet.',
    date: 'October–November 2026',
    location: 'Symbiosis Institute of Technology, Pune',
    duration: '6 weeks',
    participants: '250+',
    sessions: 14,
    highlights: [
      {
        title: 'Quantum Cloud Computing',
        desc: 'Comprehensive exploration of IBM Quantum systems via the cloud — running algorithms on real quantum processors.',
        tag: 'Workshop',
      },
      {
        title: 'Variational Quantum Eigensolver',
        desc: 'Advanced session on VQE algorithms for molecular simulation and quantum chemistry applications.',
        tag: 'Advanced Lab',
      },
      {
        title: 'Quantum Machine Learning',
        desc: 'Bridging classical ML with quantum advantage — practical demonstrations using Qiskit Machine Learning.',
        tag: 'Workshop',
      },
      {
        title: 'IISER Quantum Symposium Visit',
        desc: 'Collaborative visit to IISER Pune for research exchange and exposure to cutting-edge quantum research.',
        tag: 'Outreach',
      },
      {
        title: 'Industry Panel: Quantum Careers',
        desc: 'Live discussion with quantum researchers and industry professionals on career pathways in quantum tech.',
        tag: 'Panel',
      },
      {
        title: '48-Hour Quantum Hackathon',
        desc: 'Flagship hackathon with real IBM quantum hardware access, problem statements from IBM research team.',
        tag: 'Competition',
      },
    ],
    achievements: [
      'Returning IBM Qiskit Fall Fest Partner — second edition',
      '250+ student participants across SIT & partner colleges',
      'IISER Pune collaborative research session',
      'PowerBI × Quantum data visualization workshop',
      '12 student teams competed in the flagship hackathon',
    ],
    gallery: [
      { label: 'Inaugural Ceremony' },
      { label: 'Cloud Quantum Lab' },
      { label: 'IISER Visit' },
      { label: 'Panel Discussion' },
    ],
    sponsors: ['IBM Quantum', 'Symbiosis Institute of Technology', 'IISER Pune'],
    prevYear: 2025,
    nextYear: null,
  },
}

export default function QiskitArchive() {
  const { year } = useParams()
  const numYear = parseInt(year, 10)
  const data = ARCHIVE_DATA[numYear]

  useEffect(() => {
    if (data) {
      document.title = `Qiskit Fall Fest ${data.year} — Symbiosis Quantum Club`
    }
  }, [data])

  if (!data) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-[#09090b] p-6 text-center">
        <div className="max-w-md flex flex-col items-center gap-4">
          <span className="font-mono text-6xl font-bold text-gray-700">404</span>
          <h1 className="text-3xl font-bold text-white">Archive Not Found</h1>
          <p className="text-gray-400 text-sm">We don't have an archive for Qiskit {year} yet.</p>
          <Link to="/qiskit/2025" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors">
            View 2025 Archive
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#09090b] min-h-dvh pt-[calc(72px+clamp(2rem,1.25rem+3.75vw,5rem))] pb-20">
      {/* Hero */}
      <section className="px-4 pb-16 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold reveal-up">IBM Qiskit Fall Fest</span>
          <h1 className="text-5xl sm:text-7xl font-extrabold font-display text-white tracking-tight reveal-up">{data.year}</h1>
          <p className="text-xl sm:text-2xl font-semibold text-blue-300 reveal-up">{data.theme}</p>
          <p className="text-gray-400 max-w-xl text-base reveal-up">{data.tagline}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-800 text-xs font-mono text-gray-400">
            <span>📅 {data.date}</span>
            <span>📍 {data.location}</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 border-y border-gray-800/80 bg-[#040716]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: data.participants, label: 'Participants' },
            { value: data.sessions, label: 'Sessions' },
            { value: data.duration, label: 'Duration' },
            { value: data.sponsors.length, label: 'Partners' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-bold font-display text-blue-400">{value}</span>
              <span className="font-mono text-xs uppercase tracking-wider text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">What We Covered</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Event Highlights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.highlights.map((item) => (
              <div key={item.title} className="bg-[#040716] border border-gray-800 rounded-xl p-6 hover:border-blue-500/40 transition-colors flex flex-col justify-between reveal-up">
                <div>
                  <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded bg-blue-950/50 border border-blue-900/40 mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 border-t border-gray-800/60 bg-[#040716]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">Impact</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1 mb-8">Key Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {data.achievements.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[#060a20] border border-gray-800 p-4 rounded-lg">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
