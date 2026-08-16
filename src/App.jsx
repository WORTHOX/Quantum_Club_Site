import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useGlobalReveal } from './utils/useGlobalReveal'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import FallFest from './pages/FallFest'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Team from './pages/Team'
import QiskitArchive from './pages/QiskitArchive'

/* Scroll to top on route change & initialize global reveal animations */
function RouteEffects() {
  const { pathname } = useLocation()
  useGlobalReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/fallfest" element={<FallFest />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/qiskit/:year" element={<QiskitArchive />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
