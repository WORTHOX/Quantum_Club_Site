import useSEO from '../utils/useSEO'
import QuantumDepartureBackground from '../components/home/QuantumDepartureBackground'
import VideoHero from '../components/home/VideoHero'
import ScrollTextReveal from '../components/home/ScrollTextReveal'
import WhyQuantumMarquee from '../components/home/WhyQuantumMarquee'
import AboutDoubleImage from '../components/home/AboutDoubleImage'
import QuantumLifeStories from '../components/home/QuantumLifeStories'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  useSEO({
    title: 'Symbiosis Quantum Club — Official IBM Qiskit Fall Fest Host | SIT Pune',
    description: "Symbiosis Quantum Club (SQC) at Symbiosis Institute of Technology is India's premier student quantum computing community. Official host of IBM Qiskit Fall Fest, research workshops, hackathons, and quantum circuit education.",
    keywords: 'Symbiosis Quantum Club, IBM Qiskit Fall Fest 2026, SIT Pune quantum, student quantum club India, Qiskit hackathon, quantum computing community',
    canonical: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Symbiosis Quantum Club',
      'alternateName': 'SQC',
      'url': 'https://symbiosisquantumclub.vercel.app/',
      'logo': 'https://symbiosisquantumclub.vercel.app/favicon-32x32.png',
      'description': "India's premier student quantum computing community at Symbiosis Institute of Technology. Official host of IBM Qiskit Fall Fest.",
      'memberOf': {
        '@type': 'Organization',
        'name': 'IBM Qiskit Network'
      },
      'sameAs': [
        'https://www.instagram.com/symbiosisquantumclub',
        'https://www.linkedin.com/company/symbiosis-quantum-club'
      ]
    }
  })

  return (
    <main className="overflow-x-clip bg-[#06040a] relative">
      <QuantumDepartureBackground />
      <div className="relative z-10">
        <VideoHero />
        <ScrollTextReveal />
        <WhyQuantumMarquee />
        <AboutDoubleImage />
        <QuantumLifeStories />
        <Testimonials />
      </div>
    </main>
  )
}
