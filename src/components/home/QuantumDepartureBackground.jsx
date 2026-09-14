import { useEffect, useRef } from 'react'

export default function QuantumDepartureBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let W = 0, H = 0

    // Reliable full document height
    const getDocHeight = () => {
      if (typeof document === 'undefined') return 12000
      return Math.max(
        document.documentElement ? document.documentElement.scrollHeight : 0,
        document.body ? document.body.scrollHeight : 0,
        document.documentElement ? document.documentElement.offsetHeight : 0,
        document.body ? document.body.offsetHeight : 0,
        window.innerHeight || 0
      )
    }

    const layoutCache = {
      footerTop: 1e9,
      footerBottom: 1e9,
      docHeight: typeof window !== 'undefined' ? Math.max(getDocHeight(), 12000) : 12000,
    }

    const updateLayoutCache = () => {
      const scrollY = window.scrollY || 0
      const docH = getDocHeight()

      const footerEl = document.querySelector('footer')
      if (footerEl) {
        const fRect = footerEl.getBoundingClientRect()
        const measuredTop = fRect.top + scrollY
        const measuredBottom = fRect.bottom + scrollY
        if (measuredTop > 1500) {
          layoutCache.footerTop = measuredTop
          layoutCache.footerBottom = Math.max(docH, measuredBottom)
        }
      }

      const effectiveBottom = Math.max(docH, layoutCache.footerBottom < 1e8 ? layoutCache.footerBottom : 0)
      if (effectiveBottom > 1500) {
        layoutCache.docHeight = effectiveBottom
      }
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.scale(dpr, dpr)
      updateLayoutCache()
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    let ro = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateLayoutCache()
      })
      if (document.body) ro.observe(document.body)
      if (document.documentElement) ro.observe(document.documentElement)
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(updateLayoutCache)
    }
    window.addEventListener('load', updateLayoutCache, { once: true })
    const tSync = setTimeout(updateLayoutCache, 2500)

    let lastScrollY = 0
    const onScroll = () => {
      const sy = window.scrollY || 0
      if (Math.abs(sy - lastScrollY) > 800) {
        lastScrollY = sy
        updateLayoutCache()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ─── RENDER LOOP: Margin Ruler Scales Only (All diagrams removed) ───
    const render = () => {
      const scrollY = window.scrollY || 0
      const isDarkMode = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

      ctx.clearRect(0, 0, W, H)

      // 1. Base background
      ctx.fillStyle = isDarkMode ? '#06040a' : '#fcfcfd'
      ctx.fillRect(0, 0, W, H)

      // 2. Subtle radial glow near top of page
      {
        const opacity = Math.max(0, 1 - scrollY / 1200)
        if (opacity > 0) {
          const glow = ctx.createRadialGradient(W * 0.5, H * 0.25, 0, W * 0.5, H * 0.25, W * 0.55)
          if (isDarkMode) {
            glow.addColorStop(0, `rgba(168,85,247,${0.07 * opacity})`)
            glow.addColorStop(1, 'rgba(0,0,0,0)')
          } else {
            glow.addColorStop(0, `rgba(124,58,237,${0.04 * opacity})`)
            glow.addColorStop(1, 'rgba(252,252,253,0)')
          }
          ctx.fillStyle = glow
          ctx.fillRect(0, 0, W, H)
        }
      }

      // 3. Margin Ruler Scales (Flanking left and right margins)
      const bottomLimit = Math.max(layoutCache.docHeight, layoutCache.footerBottom < 1e8 ? layoutCache.footerBottom : 0, H)
      const leftX = 18, rx = W - 24
      const hasRight = W > 860
      const viewTop = scrollY
      const viewBottom = scrollY + H
      const scaleStart = Math.max(0, viewTop)
      const scaleEnd = Math.min(bottomLimit, viewBottom)

      ctx.save()
      ctx.font = '8px "Departure Mono",monospace'

      if (scaleEnd > scaleStart) {
        const toCanvas = (worldY) => worldY - scrollY
        const strokeGuide = isDarkMode ? 'rgba(168,85,247,0.22)' : 'rgba(100,116,139,0.25)'
        const strokeTopCap = isDarkMode ? 'rgba(168,85,247,0.45)' : 'rgba(124,58,237,0.5)'
        const strokeEndCap = isDarkMode ? 'rgba(168,85,247,0.6)' : 'rgba(124,58,237,0.7)'
        const fillEndL = isDarkMode ? 'rgba(192,132,252,0.5)' : 'rgba(124,58,237,0.7)'
        const fillEndR = isDarkMode ? 'rgba(56,189,248,0.5)' : 'rgba(2,132,199,0.7)'
        const strokeMajor = isDarkMode ? 'rgba(168,85,247,0.38)' : 'rgba(124,58,237,0.45)'
        const strokeMinor = isDarkMode ? 'rgba(168,85,247,0.18)' : 'rgba(148,163,184,0.3)'
        const fillMajorL = isDarkMode ? 'rgba(192,132,252,0.35)' : 'rgba(124,58,237,0.65)'
        const fillMajorR = isDarkMode ? 'rgba(56,189,248,0.3)' : 'rgba(2,132,199,0.65)'

        // Vertical guide axes
        ctx.strokeStyle = strokeGuide
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(leftX, toCanvas(scaleStart))
        ctx.lineTo(leftX, toCanvas(scaleEnd))
        ctx.stroke()

        if (hasRight) {
          ctx.beginPath()
          ctx.moveTo(rx, toCanvas(scaleStart))
          ctx.lineTo(rx, toCanvas(scaleEnd))
          ctx.stroke()
        }

        // Page top cap
        if (scrollY <= 0) {
          ctx.strokeStyle = strokeTopCap
          ctx.lineWidth = 1.2
          ctx.beginPath(); ctx.moveTo(leftX - 6, 0); ctx.lineTo(leftX + 6, 0); ctx.stroke()
          if (hasRight) { ctx.beginPath(); ctx.moveTo(rx - 6, 0); ctx.lineTo(rx + 6, 0); ctx.stroke() }
        }

        // Bottom of page cap (END_SCALE)
        const endVY = bottomLimit - scrollY
        if (endVY >= 0 && endVY <= H) {
          ctx.strokeStyle = strokeEndCap
          ctx.lineWidth = 1.5
          ctx.beginPath(); ctx.moveTo(leftX - 8, endVY); ctx.lineTo(leftX + 8, endVY); ctx.stroke()
          if (hasRight) { ctx.beginPath(); ctx.moveTo(rx - 8, endVY); ctx.lineTo(rx + 8, endVY); ctx.stroke() }
          ctx.fillStyle = fillEndL
          ctx.textAlign = 'left'
          ctx.fillText('END_SCALE', leftX + 11, endVY - 4)
          if (hasRight) { ctx.textAlign = 'right'; ctx.fillStyle = fillEndR; ctx.fillText('0xFOOTER', rx - 11, endVY - 4) }
        }

        // Major & Minor tick marks with coordinate labels
        const stepMinor = 24, stepMajor = 120
        const startWorld = Math.floor(viewTop / stepMinor) * stepMinor
        const endWorld = Math.min(viewBottom, bottomLimit)

        for (let worldY = startWorld; worldY <= endWorld; worldY += stepMinor) {
          if (worldY < 0 || worldY > bottomLimit) continue
          const vy = worldY - scrollY
          if (vy < -10 || vy > H + 2) continue

          const isMajor = worldY % stepMajor === 0
          if (isMajor) {
            ctx.strokeStyle = strokeMajor
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(leftX - 5, vy); ctx.lineTo(leftX + 5, vy); ctx.stroke()
            ctx.fillStyle = fillMajorL
            ctx.textAlign = 'left'
            ctx.fillText(`Y:${String(worldY).padStart(5, '0')}`, leftX + 9, vy + 3)
            if (hasRight) {
              ctx.beginPath(); ctx.moveTo(rx - 5, vy); ctx.lineTo(rx + 5, vy); ctx.stroke()
              ctx.fillStyle = fillMajorR
              ctx.textAlign = 'right'
              ctx.fillText(`+${Math.floor(worldY / 10)}`, rx - 9, vy + 3)
            }
          } else {
            ctx.strokeStyle = strokeMinor
            ctx.lineWidth = 0.8
            ctx.beginPath(); ctx.moveTo(leftX - 2.5, vy); ctx.lineTo(leftX + 2.5, vy); ctx.stroke()
            if (hasRight) { ctx.beginPath(); ctx.moveTo(rx - 2.5, vy); ctx.lineTo(rx + 2.5, vy); ctx.stroke() }
          }
        }
      }
      ctx.restore()

      raf = requestAnimationFrame(render)
    }

    if (prefersReduced) {
      const isDarkMode = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDarkMode ? '#06040a' : '#fcfcfd'
      ctx.fillRect(0, 0, W, H)
    } else {
      raf = requestAnimationFrame(render)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else if (!prefersReduced) {
        raf = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      clearTimeout(tSync)
      window.removeEventListener('load', updateLayoutCache)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
