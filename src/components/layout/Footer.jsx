import { Link } from 'react-router-dom'
import LogoWithCircularText from '../shared/LogoWithCircularText'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#070a08] border-t border-white/10 text-gray-400 py-16 px-5 sm:px-8 lg:px-12 relative overflow-hidden" role="contentinfo">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" aria-label="Symbiosis Quantum Club Home" className="inline-flex hover:opacity-95 transition-opacity">
              <LogoWithCircularText size="lg" showTitleText={true} />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-body">
              Exploring the frontiers of quantum computing, algorithms, and experimental hardware at Symbiosis Institute of Technology.
            </p>
          </div>

          <nav className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6" aria-label="Footer navigation">
            <div className="flex flex-col gap-3">
              <h6 className="font-mono text-xs uppercase tracking-wider text-gray-200 font-semibold">Navigate</h6>
              <Link to="/" className="text-sm text-gray-400 hover:text-fuchsia-400 transition-colors">Home</Link>
              <Link to="/events" className="text-sm text-gray-400 hover:text-[#f59e0b] transition-colors">Events</Link>
              <Link to="/blog" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">Blog</Link>
              <Link to="/team" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Team</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="font-mono text-xs uppercase tracking-wider text-gray-200 font-semibold">Events</h6>
              <Link to="/events" className="text-sm text-gray-400 hover:text-[#f59e0b] transition-colors">Fall Fest</Link>
              <Link to="/events" className="text-sm text-gray-400 hover:text-[#f59e0b] transition-colors">Workshops</Link>
              <Link to="/events" className="text-sm text-gray-400 hover:text-[#f59e0b] transition-colors">Hackathons</Link>
              <Link to="/events" className="text-sm text-gray-400 hover:text-[#f59e0b] transition-colors">Lab Visits</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="font-mono text-xs uppercase tracking-wider text-gray-200 font-semibold">Connect</h6>
              <a href="https://www.instagram.com/quantumclub.sit/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-fuchsia-400 transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/symbiosis-quantum-club/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
              <a href="mailto:quantumclub@sitpune.edu.in" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">Email</a>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="font-mono text-xs uppercase tracking-wider text-gray-200 font-semibold">Resources</h6>
              <a href="https://www.ibm.com/quantum" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">IBM Quantum</a>
              <a href="https://qiskit.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Qiskit</a>
              <a href="https://quantum.country/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Quantum Country</a>
            </div>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>
            &copy; {currentYear} Symbiosis Quantum Club. Built with purpose.
          </p>
          <p className="text-cyan-400/80">
            IBM Qiskit Global Fall Fest Partner
          </p>
        </div>
      </div>
    </footer>
  )
}
