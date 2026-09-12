import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useGlobalReveal } from './utils/useGlobalReveal'
import Preloader from './components/ui/Preloader'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageTransition, { isDetailPage } from './components/layout/PageTransition'

/* Lazy-loaded route chunks to isolate Three.js and reduce initial bundle */
const Home = lazy(() => import('./pages/Home'))
const Events = lazy(() => import('./pages/Events'))
const EventDetail = lazy(() => import('./pages/EventDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Team = lazy(() => import('./pages/Team'))
const FallFest = lazy(() => import('./pages/FallFest'))
const NotFound = lazy(() => import('./pages/NotFound'))

/* Helper for legacy Qiskit archive links */
function QiskitRedirect() {
  const { year } = useParams()
  if (year === '2025') return <Navigate to="/fallfest" replace />
  if (year === '2026') return <Navigate to="/events/qiskit-fall-fest-2026" replace />
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
      <Suspense fallback={null}>
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
          <Route path="/fallfest-2026" element={<Navigate to="/events/qiskit-fall-fest-2026" replace />} />
          <Route path="/fallfest/2026" element={<Navigate to="/events/qiskit-fall-fest-2026" replace />} />
          <Route path="/fallfest_2026" element={<Navigate to="/events/qiskit-fall-fest-2026" replace />} />

          <Route path="/blog"          element={<Blog />} />
          <Route path="/blog/:id"      element={<BlogDetail />} />
          <Route path="/team"          element={<Team />} />
          <Route path="/qiskit/:year"  element={<QiskitRedirect />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageTransition>
  )
}

export default function App() {
  // Trigger preloader on direct visit to any page (e.g. /events, /team, /fallfest) once per session,
  // and always reload preloader on the home page ('/')
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return false
    const cleanPath = (window.location.pathname || '').replace(/\/+$/, '') || '/'
    if (cleanPath === '/') return true
    try {
      return !sessionStorage.getItem('sqc_preloader_seen')
    } catch {
      return true
    }
  })

  const handlePreloaderDone = () => {
    setLoading(false)
    try {
      sessionStorage.setItem('sqc_preloader_seen', 'true')
    } catch {}
  }

  // Ensure scroll is at the top on initial mount / reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <BrowserRouter>
      {loading && <Preloader onDone={handlePreloaderDone} />}
      <RouteEffects />
      <Navbar />
      <div id="app-root" className="relative w-full">
        <ErrorBoundary>
          <AnimatedRoutes />
        </ErrorBoundary>
      </div>
      <Footer />
    </BrowserRouter>
  )
}
