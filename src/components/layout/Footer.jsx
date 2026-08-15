import { Link } from 'react-router-dom'
import LogoWithCircularText from '../shared/LogoWithCircularText'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#040716] border-t border-gray-800 text-gray-400 py-16 px-4 sm:px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" aria-label="Symbiosis Quantum Club Home" className="inline-flex hover:opacity-95 transition-opacity">
              <LogoWithCircularText size="lg" showTitleText={true} />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Exploring the frontiers of quantum computing at Symbiosis Institute of Technology.
            </p>
          </div>

          <nav className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6" aria-label="Footer navigation">
            <div className="flex flex-col gap-3">
              <h6 className="font-mono text-xs uppercase tracking-wider text-gray-200 font-semibold">Navigate</h6>
              <Link to="/" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/events" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Events</Link>
              <Link to="/blog" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Blog</Link>
              <Link to="/team" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Team</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="font-mono text-xs uppercase tracking-wider text-gray-200 font-semibold">Events</h6>
              <Link to="/events" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Fall Fest 2026</Link>
              <Link to="/events" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Workshops</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="font-mono text-xs uppercase tracking-wider text-gray-200 font-semibold">Connect</h6>
              <a href="https://www.instagram.com/quantumclub.sit/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/symbiosis-quantum-club/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="mailto:quantumclub@sitpune.edu.in" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Email</a>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="font-mono text-xs uppercase tracking-wider text-gray-200 font-semibold">Resources</h6>
              <a href="https://www.ibm.com/quantum" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">IBM Quantum</a>
              <a href="https://qiskit.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Qiskit</a>
              <a href="https://quantum.country/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Quantum Country</a>
            </div>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>
            &copy; {currentYear} Symbiosis Quantum Club. Built with purpose.
          </p>
          <p className="text-blue-400/80">
            IBM Qiskit Fall Fest Partner
          </p>
        </div>
      </div>
    </footer>
  )
}
