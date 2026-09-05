import { lazy, Suspense, useEffect } from 'react'

// ── Above-fold: eager imports (needed for LCP) ─────────────────────────────
import QuantumDepartureBackground from '../components/home/QuantumDepartureBackground'
import VideoHero from '../components/home/VideoHero'
import ScrollTextReveal from '../components/home/ScrollTextReveal'
import WhyQuantumMarquee from '../components/home/WhyQuantumMarquee'
import AboutDoubleImage from '../components/home/AboutDoubleImage'

// ── Below-fold: lazy imports (parsed only when Suspense renders them) ──────
const PioneersParallax   = lazy(() => import('../components/home/PioneersParallax'))
const DepartureHUD       = lazy(() => import('../components/home/DepartureHUD'))
const DecadeTimeline     = lazy(() => import('../components/home/DecadeTimeline'))
const QuantumLifeStories = lazy(() => import('../components/home/QuantumLifeStories'))
const VideoRecap         = lazy(() => import('../components/home/VideoRecap'))
const Testimonials       = lazy(() => import('../components/home/Testimonials'))

// Minimal invisible placeholder while lazy section loads
const SectionPlaceholder = ({ minH = '24rem' }) => (
  <div style={{ minHeight: minH }} aria-hidden="true" />
)

export default function Home() {
  useEffect(() => {
    document.title = 'Symbiosis Quantum Club'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="overflow-x-clip bg-[#06040a] relative">
      {/* ── Fixed viewport canvas background ── */}
      <QuantumDepartureBackground />

      <div className="relative z-10">
        {/* ── Above fold — eager ── */}
        <VideoHero />
        <ScrollTextReveal />
        <WhyQuantumMarquee />
        <AboutDoubleImage />

        {/* ── Below fold — lazy ── */}
        <Suspense fallback={<SectionPlaceholder minH="80rem" />}>
          <PioneersParallax />
        </Suspense>

        {/* ── Departure Mono-inspired Quantum HUD Dashboard ── */}
        <Suspense fallback={<SectionPlaceholder minH="32rem" />}>
          <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-400" />
              <span className="font-pixel text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                LIVE QPU TELEMETRY
              </span>
            </div>
            <DepartureHUD />
          </div>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder minH="48rem" />}>
          <DecadeTimeline />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder minH="32rem" />}>
          <QuantumLifeStories />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder minH="24rem" />}>
          <VideoRecap />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder minH="20rem" />}>
          <Testimonials />
        </Suspense>
      </div>
    </main>
  )
}
