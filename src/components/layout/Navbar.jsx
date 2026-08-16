import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, LayoutGroup } from 'framer-motion'
import LogoWithCircularText from '../shared/LogoWithCircularText'

// Dynamic theme spectrums mapped directly to each page's visual identity
const PAGE_THEMES = {
  '/': {
    name: 'Home',
    gradient: 'linear-gradient(90deg, #c084fc 0%, #e879f9 50%, #ec4899 100%)',
    shadow: '0 0 14px rgba(232, 121, 249, 0.95), 0 0 4px #ec4899',
    accentColor: '#e879f9',
  },
  '/events': {
    name: 'Events',
    gradient: 'linear-gradient(90deg, #ef4444 0%, #f97316 50%, #f59e0b 100%)',
    shadow: '0 0 14px rgba(249, 115, 22, 0.95), 0 0 4px #f59e0b',
    accentColor: '#f97316',
  },
  '/blog': {
    name: 'Blog',
    gradient: 'linear-gradient(90deg, #34d399 0%, #10b981 50%, #059669 100%)',
    shadow: '0 0 14px rgba(52, 211, 153, 0.95), 0 0 4px #10b981',
    accentColor: '#34d399',
  },
  '/team': {
    name: 'Team',
    gradient: 'linear-gradient(90deg, #06b6d4 0%, #38bdf8 50%, #60a5fa 100%)',
    shadow: '0 0 14px rgba(6, 182, 212, 0.95), 0 0 4px #38bdf8',
    accentColor: '#06b6d4',
  },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/events', label: 'EVENTS' },
    { to: '/blog', label: 'BLOG' },
    { to: '/team', label: 'TEAM' },
  ]

  const isLinkActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[#070a08]/92 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(7,4,13,0.7)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      role="banner"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
        {/* Brand Logo with Rotating Circular Text — Left */}
        <Link
          to="/"
          className="flex items-center gap-3.5 no-underline transition-transform duration-200 hover:-translate-y-0.5"
          aria-label="Symbiosis Quantum Club Home"
        >
          <LogoWithCircularText size="md" showTitleText={true} />
        </Link>

        {/* Desktop Navigation Links — Center Glassmorphic Capsule with Fluid Gliding Beam */}
        <LayoutGroup id="navbar-links">
          <nav
            className="hidden min-[820px]:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.to)
              const theme = PAGE_THEMES[link.to] || PAGE_THEMES['/']

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-full font-display text-[0.8rem] tracking-[0.08em] font-semibold uppercase transition-colors duration-200 no-underline inline-flex items-center justify-center select-none ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Fluid Gliding Background Capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}

                  {/* Fluid Gliding Volumetric Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-glow"
                      className="absolute -bottom-1 left-2.5 right-2.5 h-3 rounded-full blur-[4px] opacity-80 pointer-events-none"
                      style={{
                        background: theme.gradient,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}

                  {/* Fluid Gliding Quantum Beam Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-beam"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] rounded-full pointer-events-none z-10"
                      style={{
                        background: theme.gradient,
                        boxShadow: theme.shadow,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>
        </LayoutGroup>

        {/* Action Buttons — Right */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/quantumclub.sit/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-fuchsia-400 hover:-translate-y-0.5 p-1.5 transition-all duration-200 grid place-items-center"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/symbiosis-quantum-club/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-fuchsia-400 hover:-translate-y-0.5 p-1.5 transition-all duration-200 grid place-items-center"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <Link
            to="/events"
            className="group inline-flex items-center gap-2 font-display text-[0.75rem] font-bold uppercase tracking-[0.08em] px-5 py-2.5 rounded-full border border-fuchsia-500 text-white bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:from-purple-400 hover:to-pink-500 hover:border-pink-500 hover:shadow-[0_0_32px_rgba(236,72,153,0.6)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>JOIN CLUB</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-200">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="flex min-[820px]:hidden flex-col gap-1.5 w-7 p-1 cursor-pointer z-50 bg-transparent border-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-full h-[2px] bg-white rounded-full transition-transform duration-300 ${menuOpen ? 'translate-y-[8px] rotate-45' : ''}`} />
          <span className={`block w-full h-[2px] bg-white rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-full h-[2px] bg-white rounded-full transition-transform duration-300 ${menuOpen ? '-translate-y-[8px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 bg-[#070a08]/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center p-8 transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-8 w-full max-w-xs text-center" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.to)
            const theme = PAGE_THEMES[link.to] || PAGE_THEMES['/']

            return (
              <Link
                key={link.to}
                to={link.to}
                className="font-display text-2xl font-bold tracking-wider transition-all duration-200"
                style={isActive ? { color: theme.accentColor, textShadow: `0 0 16px ${theme.accentColor}88` } : { color: '#cbd5e1' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="flex flex-col gap-4 w-full mt-4">
            <Link to="/events" className="group inline-flex items-center justify-center gap-2 font-display text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-full border border-fuchsia-500 text-white bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-[0_0_25px_rgba(168,85,247,0.45)] w-full" onClick={() => setMenuOpen(false)}>
              <span>JOIN CLUB NOW</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
