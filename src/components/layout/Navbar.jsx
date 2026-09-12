import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, LayoutGroup } from 'framer-motion'
import gsap from 'gsap'
import LogoWithCircularText from '../shared/LogoWithCircularText'
import WhatsappIcon from '../ui/WhatsappIcon'

// Page-specific accent spectrums
const PAGE_THEMES = {
  '/': {
    gradient: 'linear-gradient(90deg, #a855f7 0%, #c084fc 50%, #818cf8 100%)',
    accentColor: '#a855f7',
  },
  '/events': {
    gradient: 'linear-gradient(90deg, #ef4444 0%, #f97316 50%, #f59e0b 100%)',
    accentColor: '#f97316',
  },
  '/blog': {
    gradient: 'linear-gradient(90deg, #34d399 0%, #10b981 50%, #059669 100%)',
    accentColor: '#34d399',
  },
  '/team': {
    gradient: 'linear-gradient(90deg, #06b6d4 0%, #38bdf8 50%, #60a5fa 100%)',
    accentColor: '#06b6d4',
  },
}

const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/events', label: 'EVENTS' },
  { to: '/blog', label: 'BLOG' },
  { to: '/team', label: 'TEAM' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Refs for mobile circle-clip overlay
  const overlayRef = useRef(null)
  const mobileItemsRef = useRef([])

  const isLinkActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  const isFallFestActive = location.pathname === '/fallfest' || location.pathname.startsWith('/events/qiskit-fall-fest')

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP circle clip-path mobile menu animation
  useEffect(() => {
    if (!overlayRef.current) return

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.set(overlayRef.current, { display: 'flex' })
      gsap.fromTo(
        overlayRef.current,
        { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' },
        { clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)', duration: 0.65, ease: 'power3.inOut' }
      )
      gsap.fromTo(
        mobileItemsRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
          duration: 0.5,
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
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[#07040d]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(7,4,13,0.8)]'
            : 'bg-transparent border-b border-transparent'
        }`}
        role="banner"
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          {/* Brand Logo with Rotating Circular Text — Left */}
          <Link
            to="/"
            className="flex items-center gap-3.5 no-underline transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            aria-label="Symbiosis Quantum Club Home"
          >
            <LogoWithCircularText size="md" showTitleText={true} />
          </Link>

          {/* Desktop Navigation Links — Transparent Container with Fluid Gliding Beam */}
          <LayoutGroup id="navbar-links">
            <nav
              className="hidden min-[820px]:flex items-center gap-7 lg:gap-9 bg-transparent"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.to)
                const theme = PAGE_THEMES[link.to] || PAGE_THEMES['/']

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative py-1.5 font-mono text-[0.8rem] tracking-[0.16em] font-semibold uppercase transition-colors duration-200 no-underline inline-flex items-center justify-center select-none active:scale-[0.97] ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {/* Fluid Gliding Quantum Beam Underline — Clean, crisp line without surrounding blur shine */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-beam"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full pointer-events-none z-10"
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

                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              })}

              {/* Fall Fest 2026 — special highlighted button (no beacon dot) */}
              <Link
                to="/events/qiskit-fall-fest-2026"
                className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-[0.75rem] font-bold tracking-wider uppercase transition-all duration-300 select-none active:scale-[0.97] group overflow-hidden ${
                  isFallFestActive
                    ? 'bg-gradient-to-r from-[#FF7EB6] via-[#a78bfa] to-[#38bdf8] text-[#06040a] shadow-[0_0_24px_rgba(255,126,182,0.6)] font-extrabold'
                    : 'bg-gradient-to-r from-[#FF7EB6]/20 via-[#a78bfa]/15 to-[#38bdf8]/15 text-white border border-[#FF7EB6]/50 hover:border-[#FF7EB6] shadow-[0_0_15px_rgba(255,126,182,0.25)] hover:shadow-[0_0_25px_rgba(255,126,182,0.45)]'
                }`}
              >
                {/* Ambient shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <span className="relative z-10 tracking-wider">Fall Fest 2026</span>
              </Link>
            </nav>
          </LayoutGroup>

          {/* Action Buttons — Right */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* WhatsApp */}
            <a
              href="https://chat.whatsapp.com/JIujrGfVOwJD9z0fhsTIIa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#25D366] hover:-translate-y-0.5 p-1.5 transition-all duration-200 grid place-items-center active:scale-[0.95]"
              aria-label="WhatsApp"
            >
              <WhatsappIcon size={20} strokeWidth={1.5} className="w-5 h-5" />
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/Symbiosis-Quantum-Club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white hover:-translate-y-0.5 p-1.5 transition-all duration-200 grid place-items-center active:scale-[0.95]"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/quantumclub.sit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#e1306c] hover:-translate-y-0.5 p-1.5 transition-all duration-200 grid place-items-center active:scale-[0.95]"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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
              className="text-slate-400 hover:text-[#0A66C2] hover:-translate-y-0.5 p-1.5 transition-all duration-200 grid place-items-center active:scale-[0.95]"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="flex min-[820px]:hidden flex-col gap-1.5 w-8 p-1 cursor-pointer z-50 bg-transparent border-0 active:scale-[0.92]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block w-full h-[2px] bg-white rounded-full transition-transform duration-300 ${menuOpen ? 'translate-y-[8px] rotate-45' : ''}`} />
              <span className={`block w-full h-[2px] bg-white rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-full h-[2px] bg-white rounded-full transition-transform duration-300 ${menuOpen ? '-translate-y-[8px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Circle-Clip Drawer */}
      <div
        ref={overlayRef}
        style={{ display: 'none', clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
        className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-4 px-8 md:px-14 bg-[#07040d]/98 backdrop-blur-2xl"
      >
        <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <nav aria-label="Mobile navigation" className="flex flex-col items-start gap-2 w-full">
          {navLinks.map((link, i) => {
            const isActive = isLinkActive(link.to)
            const theme = PAGE_THEMES[link.to] || PAGE_THEMES['/']
            return (
              <Link
                key={link.to}
                ref={(el) => (mobileItemsRef.current[i] = el)}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="group relative font-display text-[12vw] sm:text-[9vw] leading-tight font-bold no-underline transition-colors duration-200 active:scale-[0.97]"
                style={{ color: isActive ? theme.accentColor : 'rgba(239,231,214,0.8)' }}
              >
                <span className="relative">
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                    style={{ background: theme.gradient }}
                  />
                </span>
              </Link>
            )
          })}
          {/* Fall Fest mobile link */}
          <Link
            to="/events/qiskit-fall-fest-2026"
            onClick={() => setMenuOpen(false)}
            className="font-display text-[clamp(1.75rem,8vw,2.85rem)] leading-tight font-bold no-underline active:scale-[0.97] mt-2"
            style={{
              background: 'linear-gradient(90deg, #FF7EB6, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            FALL FEST 2026
          </Link>
        </nav>

        <div
          ref={(el) => (mobileItemsRef.current[navLinks.length] = el)}
          className="mt-6 flex flex-col gap-4 w-full max-w-xs"
        >

          <div className="flex items-center gap-4 pt-1 flex-wrap">
            <a href="https://chat.whatsapp.com/JIujrGfVOwJD9z0fhsTIIa" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#25D366] transition-colors font-mono text-[10px] tracking-widest uppercase">WhatsApp</a>
            <span className="text-white/20">·</span>
            <a href="https://github.com/Symbiosis-Quantum-Club" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors font-mono text-[10px] tracking-widest uppercase">GitHub</a>
            <span className="text-white/20">·</span>
            <a href="https://www.instagram.com/quantumclub.sit/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#e1306c] transition-colors font-mono text-[10px] tracking-widest uppercase">Instagram</a>
            <span className="text-white/20">·</span>
            <a href="https://www.linkedin.com/company/symbiosis-quantum-club/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#0A66C2] transition-colors font-mono text-[10px] tracking-widest uppercase">LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  )
}
