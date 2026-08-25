import { useEffect } from 'react'
import VideoHero from '../components/home/VideoHero'
import ScrollTextReveal from '../components/home/ScrollTextReveal'
import WhyQuantumMarquee from '../components/home/WhyQuantumMarquee'
import AboutDoubleImage from '../components/home/AboutDoubleImage'
import PioneersParallax from '../components/home/PioneersParallax'
import DecadeTimeline from '../components/home/DecadeTimeline'
import QuantumLifeStories from '../components/home/QuantumLifeStories'
import VideoRecap from '../components/home/VideoRecap'
import Testimonials from '../components/home/Testimonials'
import JourneyCTA from '../components/home/JourneyCTA'

export default function Home() {
  useEffect(() => {
    document.title = 'Symbiosis Quantum Club — Decode the Future of Quantum'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="overflow-x-clip bg-[#07040d]">
      <VideoHero />
      <ScrollTextReveal />
      <WhyQuantumMarquee />
      <AboutDoubleImage />
      <PioneersParallax />
      <DecadeTimeline />
      <QuantumLifeStories />
      <VideoRecap />
      <Testimonials />
      <JourneyCTA />
    </main>
  )
}
