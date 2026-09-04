import { useEffect } from 'react'
import QuantumDepartureBackground from '../components/home/QuantumDepartureBackground'
import VideoHero from '../components/home/VideoHero'
import ScrollTextReveal from '../components/home/ScrollTextReveal'
import WhyQuantumMarquee from '../components/home/WhyQuantumMarquee'
import AboutDoubleImage from '../components/home/AboutDoubleImage'
import PioneersParallax from '../components/home/PioneersParallax'
import DepartureHUD from '../components/home/DepartureHUD'
import DecadeTimeline from '../components/home/DecadeTimeline'
import QuantumLifeStories from '../components/home/QuantumLifeStories'
import VideoRecap from '../components/home/VideoRecap'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  useEffect(() => {
    document.title = 'Symbiosis Quantum Club'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="overflow-x-clip bg-[#06040a] relative">
      {/* ── Departure Mono Quantum CRT Background — absolute, covers full page ── */}
      <QuantumDepartureBackground />

      <div className="relative z-10">
        <VideoHero />
        <ScrollTextReveal />
        <WhyQuantumMarquee />
        <AboutDoubleImage />
        <PioneersParallax />

        {/* ── Departure Mono-inspired Quantum HUD Dashboard ── */}
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-400" />
            <span className="font-pixel text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
              LIVE QPU TELEMETRY
            </span>
          </div>
          <DepartureHUD />
        </div>

        <DecadeTimeline />
        <QuantumLifeStories />
        <VideoRecap />
        <Testimonials />
      </div>
    </main>
  )
}
