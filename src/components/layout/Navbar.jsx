import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

import LogoWithCircularText from '../shared/LogoWithCircularText'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
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

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/events', label: 'EVENTS' },
    { to: '/blog', label: 'BLOG' },
    { to: '/team', label: 'TEAM' },
  ]

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}
      role="banner"
    >
      <div className="navbar__inner">
        {/* Brand Logo with Rotating Circular Text — Left */}
        <Link to="/" className="navbar__brand" aria-label="Symbiosis Quantum Club Home">
          <LogoWithCircularText size="md" showTitleText={true} />
        </Link>

        {/* Desktop Navigation Links — Center */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(link => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons — Right */}
        <div className="navbar__actions">
          <a
            href="https://www.instagram.com/quantumclub.sit/"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__icon-link"
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
            className="navbar__icon-link"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <Link to="/events" className="navbar__btn navbar__btn--primary">
            <span>JOIN CLUB</span>
            <span className="navbar__btn-icon-bg">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__mobile-link ${location.pathname === link.to ? 'navbar__mobile-link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar__mobile-actions">
            <Link to="/events" className="navbar__btn navbar__btn--primary w-full justify-center" onClick={() => setMenuOpen(false)}>
              <span>JOIN CLUB NOW</span>
              <span className="navbar__btn-icon-bg">
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
