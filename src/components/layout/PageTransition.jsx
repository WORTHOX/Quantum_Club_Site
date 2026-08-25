import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// Page-specific accent spectrums for the top sweep beam
const PAGE_THEMES = {
  '/': 'linear-gradient(90deg, #c084fc 0%, #e879f9 50%, #ec4899 100%)',
  '/events': 'linear-gradient(90deg, #ef4444 0%, #f97316 50%, #f59e0b 100%)',
  '/blog': 'linear-gradient(90deg, #34d399 0%, #10b981 50%, #059669 100%)',
  '/team': 'linear-gradient(90deg, #06b6d4 0%, #38bdf8 50%, #60a5fa 100%)',
  '/fallfest': 'linear-gradient(90deg, #a855f7 0%, #d946ef 50%, #ec4899 100%)',
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: 'blur(3px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.32,
      ease: [0.23, 1, 0.32, 1], // Emil Kowalski custom ease-out curve
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(3px)',
    transition: {
      duration: 0.18,
      ease: [0.77, 0, 0.175, 1],
    },
  },
}

export default function PageTransition({ children }) {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const activeTheme = PAGE_THEMES[location.pathname] || PAGE_THEMES['/']

  useEffect(() => {
    setIsTransitioning(true)
    const timeout = setTimeout(() => setIsTransitioning(false), 450)
    return () => clearTimeout(timeout)
  }, [location.pathname])

  return (
    <>
      {/* Top Spectral Quantum Route Sweep Beam */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] origin-left pointer-events-none shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            style={{ background: activeTheme }}
          />
        )}
      </AnimatePresence>

      {/* Main Page Fluid Transition with AnimatePresence */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
