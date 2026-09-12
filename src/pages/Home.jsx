import { useEffect } from 'react'

// ── Eager imports for instant content availability & zero scroll waterfalls ──
import QuantumDepartureBackground from '../components/home/QuantumDepartureBackground'
import VideoHero from '../components/home/VideoHero'
import ScrollTextReveal from '../components/home/ScrollTextReveal'
import WhyQuantumMarquee from '../components/home/WhyQuantumMarquee'
import AboutDoubleImage from '../components/home/AboutDoubleImage'
import PioneersParallax from '../components/home/PioneersParallax'
import DepartureHUD from '../components/home/DepartureHUD'
import QuantumLifeStories from '../components/home/QuantumLifeStories'
import DecadeTimeline from '../components/home/DecadeTimeline'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  useEffect(() => {
    document.title = 'Symbiosis Quantum Club — IBM Qiskit Fall Fest | Quantum Computing India'
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

        {/* ── Pioneers of the Quantum Realm ── */}
        <PioneersParallax />

        {/* ── Departure Mono-inspired Quantum HUD Dashboard ── */}
        <section className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 relative z-10" id="telemetry">
          {/* Terminal Chassis Header Bar */}
          <div className="rounded-t-3xl bg-[#0b0817]/90 border-t border-x border-white/[0.08] backdrop-blur-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <span className="font-pixel text-[11px] sm:text-xs font-bold tracking-widest text-emerald-300 uppercase">
                LIVE QPU TELEMETRY // HERON_R2 133-QUBIT PROCESSOR
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] text-white/50 tracking-wider">
              <span className="hidden sm:inline">TEMP: 14.2 mK</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-emerald-400 font-semibold">STATUS: COHERENT</span>
            </div>
          </div>

          {/* Console Body */}
          <div className="rounded-b-3xl bg-[#07050f]/80 border-b border-x border-white/[0.08] backdrop-blur-2xl p-4 sm:p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
            <DepartureHUD />
          </div>
        </section>

        <QuantumLifeStories />
        <DecadeTimeline />
        <Testimonials />
      </div>
    </main>
  )
}
