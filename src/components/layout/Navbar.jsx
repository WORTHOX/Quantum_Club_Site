import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, LayoutGroup } from 'framer-motion'
import gsap from 'gsap'
import LogoWithCircularText from '../shared/LogoWithCircularText'

// Page-specific theme spectrums
const PAGE_THEMES = {
  '/': {
    gradient: 'linear-gradient(90deg, #c084fc 0%, #e879f9 50%, #ec4899 100%)',
    shadow: '0 0 14px rgba(232, 121, 249, 0.95), 0 0 4px #ec4899',
    accentColor: '#e879f9',
  },
  '/events': {
    gradient: 'linear-gradient(90deg, #ef4444 0%, #f97316 50%, #f59e0b 100%)',
    shadow: '0 0 14px rgba(249, 115, 22, 0.95), 0 0 4px #f59e0b',
    accentColor: '#f97316',
  },
  '/blog': {
    gradient: 'linear-gradient(90deg, #34d399 0%, #10b981 50%, #059669 100%)',
    shadow: '0 0 14px rgba(52, 211, 153, 0.95), 0 0 4px #10b981',
    accentColor: '#34d399',
  },
  '/team': {
    gradient: 'linear-gradient(90deg, #06b6d4 0%, #38bdf8 50%, #60a5fa 100%)',
    shadow: '0 0 14px rgba(6, 182, 212, 0.95), 0 0 4px #38bdf8',
    accentColor: '#06b6d4',
  },
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'Blog' },
  { to: '/team', label: 'Team' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Refs for GSAP circle-clip mobile overlay
  const overlayRef = useRef(null)
  const mobileItemsRef = useRef([])

  const isLinkActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP circle clip-path mobile menu animation (like reference Navbar.jsx)
  useEffect(() => {
    if (!overlayRef.current) return

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.set(overlayRef.current, { display: 'flex' })
      gsap.fromTo(
        overlayRef.current,
        { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' },
        { clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)', duration: 0.7, ease: 'power3.inOut' }
      )
      gsap.fromTo(
        mobileItemsRef.current.filter(Boolean),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, delay: 0.25, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
          duration: 0.55,
          ease: 'power3.inOut',
          onComplete: () => {
            if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' })
          },
        })
      }
    }

    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
        role="banner"
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'max-w-6xl px-6 py-2.5 mx-5 sm:mx-auto backdrop-blur-xl bg-[#070a08]/80 border border-white/[0.08] rounded-full shadow-[0_4px_30px_rgba(7,4,13,0.6)]'
              : 'max-w-[1440px] px-5 sm:px-8 lg:px-12'
          }`}
        >
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group no-underline"
            aria-label="Symbiosis Quantum Club Home"
          >
            <LogoWithCircularText size="md" showTitleText={true} />
          </Link>

          {/* Desktop Nav — Glassmorphic Capsule with LayoutGroup Fluid Beam */}
          <LayoutGroup id="navbar-links">
            <nav
              className="hidden min-[820px]:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] backdrop-blur-md"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.to)
                const theme = PAGE_THEMES[link.to] || PAGE_THEMES['/']

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 rounded-full font-mono text-[0.72rem] tracking-[0.18em] uppercase transition-colors duration-200 no-underline inline-flex items-center justify-center select-none ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {/* Gliding active capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/10"
                        transition={{ type: 'spring', stiffness: 400, damping: 32, mass: 0.7 }}
                      />
                    )}
                    {/* Gliding neon beam underline */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-beam"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full pointer-events-none"
                        style={{ background: theme.gradient, boxShadow: theme.shadow }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32, mass: 0.7 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          </LayoutGroup>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/quantumclub.sit/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:grid place-items-center p-1.5 text-purple-400 hover:text-fuchsia-400 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="Instagram"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/symbiosis-quantum-club/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:grid place-items-center p-1.5 text-purple-400 hover:text-fuchsia-400 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* CTA */}
            <Link
              to="/events"
              className="hidden min-[820px]:inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] px-4 py-2 rounded-full border border-white/20 text-white/80 hover:border-fuchsia-500 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              Register →
            </Link>

            {/* Mobile hamburger — top-right, triggers circle clip animation */}
            <button
              className="flex min-[820px]:hidden flex-col gap-[5px] w-8 h-8 justify-center items-center cursor-pointer z-[95] bg-transparent border-0 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay — Circle Clip-Path Reveal (reference Navbar.jsx pattern) */}
      <div
        ref={overlayRef}
        style={{ display: 'none', clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
        className="fixed inset-0 z-[85] flex flex-col items-start justify-center gap-3 px-8 md:px-14 bg-[#070a08]"
      >
        {/* Ambient glow accents */}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <nav aria-label="Mobile navigation" className="flex flex-col items-start gap-1 w-full">
          {navLinks.map((link, i) => {
            const isActive = isLinkActive(link.to)
            const theme = PAGE_THEMES[link.to] || PAGE_THEMES['/']
            return (
              <Link
                key={link.to}
                ref={(el) => (mobileItemsRef.current[i] = el)}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="group relative font-display text-[13vw] sm:text-[10vw] md:text-[8vw] leading-tight font-bold no-underline transition-colors duration-200"
                style={{ color: isActive ? theme.accentColor : 'rgba(239,231,214,0.75)' }}
              >
                <span className="relative">
                  {link.label}
                  {/* Hover underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                    style={{ background: theme.gradient }}
                  />
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile CTA */}
        <div
          ref={(el) => (mobileItemsRef.current[navLinks.length] = el)}
          className="mt-8 flex flex-col gap-4 w-full max-w-xs"
        >
          <Link
            to="/events"
            className="inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest px-6 py-3.5 rounded-full border border-fuchsia-500/70 text-white bg-gradient-to-br from-purple-700 to-fuchsia-700 hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-200 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
            onClick={() => setMenuOpen(false)}
          >
            Join Club →
          </Link>
          <div className="flex items-center gap-4 pt-1">
            <a href="https://www.instagram.com/quantumclub.sit/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-fuchsia-400 transition-colors font-mono text-[10px] tracking-widest uppercase">Instagram</a>
            <span className="text-white/20">·</span>
            <a href="https://www.linkedin.com/company/symbiosis-quantum-club/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors font-mono text-[10px] tracking-widest uppercase">LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  )
}
