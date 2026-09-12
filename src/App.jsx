import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGlobalReveal } from './utils/useGlobalReveal'
import Preloader from './components/ui/Preloader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageTransition, { isDetailPage } from './components/layout/PageTransition'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Team from './pages/Team'
import FallFest from './pages/FallFest'

/* Helper for legacy Qiskit archive links */
function QiskitRedirect() {
  const { year } = useParams()
  if (year === '2025') return <Navigate to="/fallfest" replace />
  if (year === '2026') return <Navigate to="/fallfest_2026" replace />
  return <Navigate to="/events?category=fall-fest" replace />
}

/* Global reveal animations — does NOT scroll, PageTransition handles that */
function RouteEffects() {
  useGlobalReveal()
  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <PageTransition>
      {/* ⚠️ Removed key={location.pathname} — that remounted PageTransition
           on every route change, destroying pending timers and children state.
           Instead, we pass `location` so React Router matches the right route
           while PageTransition controls what's visible. */}
      <Routes location={location}>
        <Route path="/"              element={<Home />} />
        <Route path="/events"        element={<Events />} />
        <Route path="/events/qiskit-fall-fest-2025" element={<Navigate to="/fallfest" replace />} />
        <Route path="/events/:id"    element={<EventDetail />} />

        {/*
          ⚠️ IMPORTANT — IBM LINK PRESERVATION:
          /fallfest is published on IBM's official Qiskit Global Partner page.
          This URL MUST resolve to a real page (not a redirect) with proper
          SEO metadata. IBM will NOT update the link — it must always work.
          - /fallfest → Fall Fest 2025 (IBM-linked canonical URL)
        */}
        <Route path="/fallfest"      element={<FallFest />} />
        <Route path="/fallfest_2026" element={<FallFest />} />

        <Route path="/blog"          element={<Blog />} />
        <Route path="/blog/:id"      element={<BlogDetail />} />
        <Route path="/team"          element={<Team />} />
        <Route path="/qiskit/:year"  element={<QiskitRedirect />} />
        <Route path="*"              element={<Home />} />
      </Routes>
    </PageTransition>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <RouteEffects />
      <Navbar />
      <main id="main">
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
