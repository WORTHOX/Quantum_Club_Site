import { Link } from 'react-router-dom'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function JourneyCTA() {
  const revealRef = useScrollReveal({ children: true })

  return (
    <section className="py-24 sm:py-32 bg-[#07040d] text-white relative overflow-hidden" id="journey" ref={revealRef}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
        
        {/* Register Card */}
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between border border-white/15 bg-[#120d1c]/90 shadow-2xl group hover:border-[#d946ef]/50 transition-all duration-500">
          <div className="absolute w-0 h-0 group-hover:w-[170%] group-hover:h-[170%] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 transition-all duration-700 ease-out z-[1] pointer-events-none" aria-hidden="true" />
          
          <div className="relative z-10 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[0.68rem] font-bold tracking-wider uppercase bg-[#a855f7]/15 text-[#c084fc] border border-[#a855f7]/30 w-fit">
              ✦ IBM QISKIT PARTNER
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight m-0">
              Register for Fall Fest 2026
            </h3>
            <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed max-w-[42ch] m-0">
              Three days of immersive quantum circuits, hardware workshops, and competitive hackathons powered by IBM Quantum.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <Link 
              to="/fallfest" 
              className="inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] group-hover:scale-102 transition-all duration-200"
            >
              <span>SIGN UP NOW</span>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Join Card */}
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between border border-white/15 bg-[#120d1c]/90 shadow-2xl group hover:border-cyan-400/50 transition-all duration-500">
          <div className="absolute w-0 h-0 group-hover:w-[170%] group-hover:h-[170%] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500/10 transition-all duration-700 ease-out z-[1] pointer-events-none" aria-hidden="true" />
          
          <div className="relative z-10 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[0.68rem] font-bold tracking-wider uppercase bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 w-fit">
              ✦ BECOME A MEMBER
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight m-0">
              Join Symbiosis Quantum Club
            </h3>
            <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed max-w-[42ch] m-0">
              Open to all university branches and years. No prior quantum physics prerequisites needed — just passion for computing.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <a 
              href="https://www.instagram.com/quantumclub.sit/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-full bg-[#07040d] border border-cyan-400/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-400 hover:text-white hover:bg-cyan-500/20 group-hover:scale-102 transition-all duration-200"
            >
              <span>CONNECT WITH US</span>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
