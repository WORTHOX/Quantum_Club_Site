import { useEffect, useRef } from 'react'

export default function QuantumDepartureBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect prefers-reduced-motion — skip the RAF loop entirely; only paint the base fill once
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let W = 0, H = 0

    // Helpers to get full document height reliably
    const getDocHeight = () => {
      if (typeof document === 'undefined') return 14000
      return Math.max(
        document.documentElement ? document.documentElement.scrollHeight : 0,
        document.body ? document.body.scrollHeight : 0,
        document.documentElement ? document.documentElement.offsetHeight : 0,
        document.body ? document.body.offsetHeight : 0,
        window.innerHeight || 0
      )
    }

    // Layout Cache: stores world Y positions to eliminate getBoundingClientRect() layout thrashing in RAF
    const layoutCache = {
      footerTop: 1e9,
      footerBottom: 1e9,
      docHeight: typeof window !== 'undefined' ? Math.max(getDocHeight(), 14000) : 14000,
      blochWorldY: 2700,
      circuitWorldY: 6400,
    }

    const updateLayoutCache = () => {
      const scrollY = window.scrollY || 0
      const docH = getDocHeight()

      const footerEl = document.querySelector('footer')
      if (footerEl) {
        const fRect = footerEl.getBoundingClientRect()
        const measuredTop = fRect.top + scrollY
        const measuredBottom = fRect.bottom + scrollY
        // Only accept footer measurements if the page has laid out (top > 2000px)
        if (measuredTop > 2000) {
          layoutCache.footerTop = measuredTop
          layoutCache.footerBottom = Math.max(docH, measuredBottom)
        }
      }

      const effectiveBottom = Math.max(docH, layoutCache.footerBottom < 1e8 ? layoutCache.footerBottom : 0)
      if (effectiveBottom > 2000) {
        layoutCache.docHeight = effectiveBottom
      }

      const pioneersEl = document.querySelector('#pioneers')
      const aboutEl = document.querySelector('#about')
      if (pioneersEl) {
        const pTop = pioneersEl.getBoundingClientRect().top + scrollY
        if (pTop > 1000) layoutCache.blochWorldY = pTop - 60
      } else if (aboutEl) {
        const aBottom = aboutEl.getBoundingClientRect().bottom + scrollY
        if (aBottom > 1000) layoutCache.blochWorldY = aBottom + 100
      }

      const item2016 = document.querySelector('#timeline .timeline__item')
      if (item2016) {
        const rect = item2016.getBoundingClientRect()
        const cY = rect.top + scrollY + rect.height / 2
        if (cY > 2000) layoutCache.circuitWorldY = cY
      }
    }

    // All diagram functions already translate by -scrollY, so they draw correctly.
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight           // ← viewport only, not full scroll height
      canvas.width  = W * dpr
      canvas.height = H * dpr
      canvas.style.width  = `${W}px`
      canvas.style.height = `${H}px`
      ctx.scale(dpr, dpr)
      updateLayoutCache()
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // ResizeObserver tracks dynamic reflows as images, fonts, and preloader complete
    let ro = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateLayoutCache()
      })
      if (document.body) ro.observe(document.body)
      if (document.documentElement) ro.observe(document.documentElement)
    }

    // Deterministic layout cache sync: fonts loaded, assets loaded, and post-preloader reveal
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateLayoutCache)
    }
    window.addEventListener('load', updateLayoutCache, { once: true })
    const tPostPreloader = setTimeout(updateLayoutCache, 3200) // triggers right after preloader curtain reveal

    // Passive scroll check: if scroll advances significantly, ensure layoutCache is synced
    let lastScrollY = 0
    const onScroll = () => {
      const sy = window.scrollY || 0
      if (Math.abs(sy - lastScrollY) > 1000) {
        lastScrollY = sy
        updateLayoutCache()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Mouse tracking (viewport coords)
    const onMove  = (e) => { mouseRef.current.targetX = e.clientX; mouseRef.current.targetY = e.clientY }
    const onLeave = ()  => { mouseRef.current.targetX = -1000; mouseRef.current.targetY = -1000 }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    // ─── DIAGRAM HELPERS ───────────────────────────────────────────────────────
    // Each diagram receives world-space coordinates (absolute Y on the page).
    // We translate by -scrollY to get viewport position before drawing.

    const drawBlochSphere = (wx, wy, r = 240) => {
      const scrollY = window.scrollY || 0
      const vx = wx, vy = wy - scrollY
      ctx.save(); ctx.translate(vx, vy)

      // Outer sphere ring
      ctx.strokeStyle = 'rgba(168,85,247,0.42)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke()

      // Equator ellipse
      ctx.strokeStyle = 'rgba(168,85,247,0.28)'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.28, 0, 0, Math.PI * 2); ctx.stroke()

      // Meridian ellipse
      ctx.beginPath(); ctx.ellipse(0, 0, r * 0.28, r, 0, 0, Math.PI * 2); ctx.stroke()

      // Second meridian (tilted 45°)
      ctx.save()
      ctx.rotate(Math.PI / 4)
      ctx.strokeStyle = 'rgba(168,85,247,0.14)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.28, 0, 0, Math.PI * 2); ctx.stroke()
      ctx.restore()

      // Dotted axes
      ctx.strokeStyle = 'rgba(192,132,252,0.7)'; ctx.lineWidth = 1.8
      ctx.setLineDash([6, 7])

      // Z-axis
      ctx.beginPath()
      ctx.moveTo(0, -(r + 28))
      ctx.lineTo(0,  (r + 28))
      ctx.stroke()

      // X-axis
      ctx.beginPath()
      ctx.moveTo(-(r + 28), 0)
      ctx.lineTo( (r + 28), 0)
      ctx.stroke()
      ctx.setLineDash([])

      // Rotating state vector
      const t = performance.now() / 2800
      const sx = r * Math.sin(Math.PI / 4) * Math.cos(t)
      const sy = -r * Math.cos(Math.PI / 4)

      // Glow trail
      ctx.strokeStyle = 'rgba(192,132,252,0.18)'; ctx.lineWidth = 10
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sx, sy); ctx.stroke()

      // Main arrow line
      ctx.strokeStyle = 'rgba(192,132,252,0.95)'; ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sx, sy); ctx.stroke()

      // Arrowhead
      const angle = Math.atan2(sy, sx)
      const aLen = 12
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(sx - aLen * Math.cos(angle - 0.45), sy - aLen * Math.sin(angle - 0.45))
      ctx.lineTo(sx - aLen * Math.cos(angle + 0.45), sy - aLen * Math.sin(angle + 0.45))
      ctx.closePath()
      ctx.fillStyle = 'rgba(232,180,255,1)'; ctx.fill()

      // Tip dot
      ctx.fillStyle = 'rgba(232,180,255,1)'
      ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill()

      // Origin dot
      ctx.fillStyle = 'rgba(168,85,247,0.7)'
      ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill()

      // Projection lines (dashed, faint)
      ctx.strokeStyle = 'rgba(168,85,247,0.25)'; ctx.lineWidth = 1; ctx.setLineDash([3, 5])
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, 0); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(0, sy); ctx.stroke()
      ctx.setLineDash([])

      // Axis labels
      const fs = Math.max(12, Math.round(r * 0.13))
      ctx.font = `${fs}px "Departure Mono",monospace`
      ctx.fillStyle = 'rgba(192,132,252,0.8)'
      ctx.textAlign = 'center'
      ctx.fillText('|0⟩', 0, -(r + 38))
      ctx.fillText('|1⟩', 0,  (r + 52))
      ctx.textAlign = 'left'
      ctx.fillText('|+⟩', r + 14, 5)
      ctx.textAlign = 'right'
      ctx.fillText('|−⟩', -(r + 14), 5)

      // State label & scientific header
      ctx.font = `9px "Departure Mono",monospace`
      ctx.fillStyle = 'rgba(192,132,252,0.65)'
      ctx.textAlign = 'center'
      ctx.fillText('BLOCH SPHERE // |ψ⟩ STATE SPACE', 0, -(r + 52))
      ctx.font = `11px "Departure Mono",monospace`
      ctx.fillStyle = 'rgba(192,132,252,0.75)'
      ctx.fillText(`|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩`, 0, r + 68)
      ctx.font = `10px "Departure Mono",monospace`
      ctx.fillStyle = 'rgba(56,189,248,0.7)'
      ctx.fillText(`θ = 45.0°   φ = ${Math.round((t * 180 / Math.PI) % 360)}°   |⟨0|ψ⟩|² = 0.50`, 0, r + 84)

      ctx.restore()
    }

    const drawBellCircuit = (wx, wy) => {
      const scrollY = window.scrollY || 0
      const vx = wx, vy = wy - scrollY
      ctx.save(); ctx.translate(vx, vy)
      ctx.font = '11px "Departure Mono",monospace'
      const r0 = 0, r1 = 60
      const scale = 1.5

      ctx.strokeStyle = 'rgba(168,85,247,0.22)'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(-165 * scale, r0); ctx.lineTo(165 * scale, r0); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(-165 * scale, r1); ctx.lineTo(165 * scale, r1); ctx.stroke()

      // Input labels
      ctx.fillStyle = 'rgba(168,85,247,0.5)'; ctx.textAlign = 'right'
      ctx.fillText('|q₀⟩', -165 * scale - 6, r0 + 4)
      ctx.fillText('|q₁⟩', -165 * scale - 6, r1 + 4)

      // H gate
      ctx.strokeStyle = 'rgba(168,85,247,0.45)'; ctx.fillStyle = 'rgba(14,7,32,0.85)'
      ctx.lineWidth = 1.5
      const hx = -100 * scale, hw = 34 * scale, hh = 34
      ctx.beginPath(); ctx.roundRect(hx - hw/2, r0 - hh/2, hw, hh, 3); ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(192,132,252,0.85)'; ctx.textAlign = 'center'
      ctx.font = `bold 14px "Departure Mono",monospace`
      ctx.fillText('H', hx, r0 + 5)

      // CNOT
      const cx = 0
      ctx.strokeStyle = 'rgba(56,189,248,0.55)'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(cx, r0); ctx.lineTo(cx, r1); ctx.stroke()

      // Control dot
      ctx.fillStyle = 'rgba(56,189,248,0.9)'
      ctx.beginPath(); ctx.arc(cx, r0, 5, 0, Math.PI * 2); ctx.fill()

      // Target circle with crosshair
      ctx.strokeStyle = 'rgba(56,189,248,0.75)'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(cx, r1, 14, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx, r1 - 14); ctx.lineTo(cx, r1 + 14)
      ctx.moveTo(cx - 14, r1); ctx.lineTo(cx + 14, r1)
      ctx.stroke()

      // Measurement boxes
      const mx = 100 * scale
      ;[r0, r1].forEach((y, i) => {
        ctx.strokeStyle = 'rgba(52,211,153,0.45)'; ctx.fillStyle = 'rgba(6,78,59,0.15)'
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.roundRect(mx - 18, y - 14, 36, 28, 3); ctx.fill(); ctx.stroke()
        // Meter arc
        ctx.strokeStyle = 'rgba(52,211,153,0.7)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(mx, y + 2, 8, Math.PI, 0); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(mx, y + 2); ctx.lineTo(mx + 6, y - 4); ctx.stroke()
      })

      // Bell state label
      ctx.font = '10px "Departure Mono",monospace'; ctx.fillStyle = 'rgba(56,189,248,0.5)'
      ctx.textAlign = 'left'
      ctx.fillText('|Φ⁺⟩ = (|00⟩ + |11⟩) / √2', cx + 20, r1 + 28)
      ctx.fillText('Bell State — Max Entanglement', -165 * scale, -26)

      ctx.restore()
    }

    const drawMachZehnder = (wx, wy) => {
      const scrollY = window.scrollY || 0
      const vx = wx, vy = wy - scrollY
      ctx.save(); ctx.translate(vx, vy)
      ctx.font = '9px "Departure Mono",monospace'; ctx.lineWidth = 1.5

      // Photon input beam
      ctx.strokeStyle = 'rgba(52,211,153,0.35)'; ctx.setLineDash([5, 4])
      ctx.beginPath(); ctx.moveTo(-200, 0); ctx.lineTo(-110, 0); ctx.stroke(); ctx.setLineDash([])

      // Photon input label
      ctx.fillStyle = 'rgba(52,211,153,0.6)'; ctx.textAlign = 'left'
      ctx.fillText('hν →', -200, -9)

      // BS1
      ctx.strokeStyle = 'rgba(56,189,248,0.45)'; ctx.fillStyle = 'rgba(6,182,212,0.08)'
      ctx.beginPath(); ctx.roundRect(-115, -16, 32, 32, 3); ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(56,189,248,0.6)'; ctx.textAlign = 'center'; ctx.fillText('BS₁', -99, 4)

      // Upper arm
      ctx.strokeStyle = 'rgba(129,140,248,0.35)'; ctx.setLineDash([5, 4])
      ctx.beginPath(); ctx.moveTo(-83, 0); ctx.lineTo(-83, -68); ctx.lineTo(83, -68); ctx.stroke()

      // Lower arm
      ctx.strokeStyle = 'rgba(192,132,252,0.35)'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(-83, 0); ctx.lineTo(-83, 68); ctx.lineTo(-10, 68); ctx.stroke()

      // Phase modulator
      ctx.setLineDash([]); ctx.strokeStyle = 'rgba(168,85,247,0.45)'; ctx.fillStyle = 'rgba(14,7,32,0.85)'
      ctx.beginPath(); ctx.roundRect(-10, 52, 52, 36, 3); ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(192,132,252,0.8)'; ctx.textAlign = 'center'; ctx.fillText('φ', 16, 75)

      // Phase arm continuation
      ctx.strokeStyle = 'rgba(192,132,252,0.35)'; ctx.setLineDash([5, 4])
      ctx.beginPath(); ctx.moveTo(42, 68); ctx.lineTo(83, 68); ctx.stroke()

      // BS2
      ctx.setLineDash([]); ctx.strokeStyle = 'rgba(56,189,248,0.45)'; ctx.fillStyle = 'rgba(6,182,212,0.08)'
      ctx.beginPath(); ctx.roundRect(72, -16, 32, 32, 3); ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(56,189,248,0.6)'; ctx.fillText('BS₂', 88, 4)

      // Detectors
      ctx.strokeStyle = 'rgba(52,211,153,0.45)'; ctx.fillStyle = 'rgba(6,78,59,0.15)'
      ctx.beginPath(); ctx.roundRect(124, -22, 44, 44, 4); ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(52,211,153,0.75)'; ctx.fillText('D₀', 146, 3)

      ctx.strokeStyle = 'rgba(192,132,252,0.45)'; ctx.fillStyle = 'rgba(59,7,100,0.15)'
      ctx.beginPath(); ctx.roundRect(72, 100, 44, 40, 4); ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(192,132,252,0.75)'; ctx.fillText('D₁', 94, 124)

      // Output beams
      ctx.strokeStyle = 'rgba(52,211,153,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([3, 5])
      ctx.beginPath(); ctx.moveTo(104, -68); ctx.lineTo(104, -4); ctx.lineTo(124, -4); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(104, 68); ctx.lineTo(104, 110); ctx.lineTo(72, 118); ctx.stroke()
      ctx.setLineDash([])

      // Formula
      ctx.font = '8px "Departure Mono",monospace'; ctx.fillStyle = 'rgba(192,132,252,0.4)'
      ctx.textAlign = 'left'
      ctx.fillText('P(D₀) = cos²(Δφ/2)', -110, -82)
      ctx.fillText('Mach–Zehnder Interferometer', -200, -96)

      ctx.restore()
    }

    const drawOscilloscope = (wx, wy, w = 340, h = 110) => {
      const scrollY = window.scrollY || 0
      const vx = wx - w/2, vy = wy - h/2 - scrollY
      ctx.save(); ctx.translate(vx, vy)

      // Frame
      ctx.strokeStyle = 'rgba(168,85,247,0.28)'; ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, w, h)

      // Grid
      ctx.strokeStyle = 'rgba(168,85,247,0.1)'; ctx.lineWidth = 0.7
      for (let gx = 0; gx <= w; gx += w/5) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke() }
      for (let gy = 0; gy <= h; gy += h/4) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke() }

      // Animated Ramsey decay trace
      const t = performance.now() / 1200
      const pts = []
      for (let x = 0; x <= w; x += 2) {
        const f = x / w
        pts.push([x, h/2 - Math.exp(-f * 2) * (h * 0.38) * Math.cos(f * Math.PI * 8 + t)])
      }
      ctx.beginPath(); ctx.strokeStyle = 'rgba(192,132,252,0.75)'; ctx.lineWidth = 2
      pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.stroke()

      // Second trace (T1 decay envelope)
      const envPts = []
      for (let x = 0; x <= w; x += 2) {
        const f = x / w
        envPts.push([x, h/2 - Math.exp(-f * 1.5) * (h * 0.38)])
      }
      ctx.beginPath(); ctx.strokeStyle = 'rgba(52,211,153,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([4, 5])
      envPts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.stroke()
      ctx.setLineDash([])

      // Labels
      ctx.font = '8px "Departure Mono",monospace'; ctx.fillStyle = 'rgba(192,132,252,0.55)'
      ctx.textAlign = 'left'; ctx.fillText('RAMSEY OSCILLATION', 6, 14)
      ctx.fillStyle = 'rgba(52,211,153,0.55)'; ctx.fillText('T₂* = 85 μs  |  T₁ = 220 μs', 6, h - 8)
      ctx.fillStyle = 'rgba(192,132,252,0.35)'; ctx.textAlign = 'right'
      ctx.fillText('⟨σ_z(t)⟩ = e^(-t/T₂)cos(ωt)', w - 6, h - 8)

      // Cursor line (animated)
      const curX = ((performance.now() / 3000) % 1) * w
      ctx.strokeStyle = 'rgba(56,189,248,0.4)'; ctx.lineWidth = 0.8; ctx.setLineDash([2, 3])
      ctx.beginPath(); ctx.moveTo(curX, 0); ctx.lineTo(curX, h); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = 'rgba(56,189,248,0.6)'; ctx.textAlign = 'left'
      ctx.fillText(`t=${(curX/w * 85).toFixed(1)}μs`, curX + 4, 14)

      ctx.restore()
    }

    const drawCryoLadder = (wx, wy) => {
      const scrollY = window.scrollY || 0
      const vx = wx, vy = wy - scrollY
      ctx.save(); ctx.translate(vx, vy)
      ctx.font = '9px "Departure Mono",monospace'; ctx.textAlign = 'left'
      const stages = [
        { label: '300 K  │ ROOM TEMPERATURE', color: 'rgba(248,113,113,0.55)', y: 0 },
        { label: ' 50 K  │ 1ST RADIATION SHIELD', color: 'rgba(251,146,60,0.5)', y: 48 },
        { label: '  4 K  │ HEMT AMP +38 dB', color: 'rgba(250,204,21,0.45)', y: 96 },
        { label: '850 mK │ STILL STAGE', color: 'rgba(52,211,153,0.5)', y: 144 },
        { label: '100 mK │ COLD PLATE', color: 'rgba(56,189,248,0.5)', y: 192 },
        { label: ' 15 mK │ QPU STAGE ← TARGET', color: 'rgba(192,132,252,0.75)', y: 240 },
      ]

      // Title
      ctx.fillStyle = 'rgba(192,132,252,0.5)'; ctx.font = '9px "Departure Mono",monospace'
      ctx.fillText('DILUTION REFRIGERATOR — THERMAL STAGES', -100, -20)

      // Vertical spine
      ctx.strokeStyle = 'rgba(100,116,139,0.25)'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(-4, -8); ctx.lineTo(-4, 256); ctx.stroke()

      stages.forEach((s, i) => {
        // Stage bar
        ctx.strokeStyle = s.color; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(-120, s.y); ctx.lineTo(200, s.y); ctx.stroke()
        ctx.fillStyle = s.color
        ctx.font = `9px "Departure Mono",monospace`
        ctx.fillText(s.label, -118, s.y - 6)

        // Node
        ctx.beginPath(); ctx.arc(-4, s.y, 3, 0, Math.PI * 2); ctx.fill()

        // Animated heat line between stages
        if (i < stages.length - 1) {
          const t = performance.now() / 1500
          const dot = s.y + ((stages[i+1].y - s.y) * ((Math.sin(t + i) + 1) / 2))
          ctx.fillStyle = s.color
          ctx.beginPath(); ctx.arc(-4, dot, 1.5, 0, Math.PI * 2); ctx.fill()
        }
      })

      ctx.restore()
    }

    const drawDensityMatrix = (wx, wy, n = 5) => {
      const scrollY = window.scrollY || 0
      const vx = wx, vy = wy - scrollY
      ctx.save(); ctx.translate(vx, vy)
      const cell = 24
      const totalW = n * cell, totalH = n * cell

      // Title
      ctx.font = '9px "Departure Mono",monospace'; ctx.fillStyle = 'rgba(192,132,252,0.5)'
      ctx.textAlign = 'center'; ctx.fillText('DENSITY MATRIX  ρ = |Φ⁺⟩⟨Φ⁺|', 0, -n * cell / 2 - 16)

      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          const isD = r === c
          const x = (c - n/2) * cell, y = (r - n/2) * cell

          // Background fill based on value
          const val = isD ? (r === 0 || r === n-1 ? 0.5 : 0.08) :
                      (Math.abs(r - c) === 1 || (r === 0 && c === n-1) || (r === n-1 && c === 0)) ? 0.12 : 0.03
          if (val > 0.05) {
            ctx.fillStyle = `rgba(168,85,247,${val * 0.35})`; ctx.fillRect(x+1, y+1, cell-2, cell-2)
          }

          // Border
          const alpha = isD ? 0.5 : 0.12
          ctx.strokeStyle = `rgba(168,85,247,${alpha})`; ctx.lineWidth = 0.8
          ctx.strokeRect(x, y, cell, cell)

          // Value text
          if (val > 0.08) {
            ctx.font = `8px "Departure Mono",monospace`
            ctx.fillStyle = `rgba(192,132,252,${val * 1.2})`; ctx.textAlign = 'center'
            ctx.fillText(isD && (r === 0 || r === n-1) ? '0.5' : '...', x + cell/2, y + cell/2 + 3)
          }
        }
      }

      // Bracket delimiters
      const bx = -(totalW/2) - 8, ex = totalW/2 + 8, by = -(totalH/2), ey = totalH/2
      ctx.strokeStyle = 'rgba(168,85,247,0.38)'; ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(bx + 6, by); ctx.lineTo(bx, by); ctx.lineTo(bx, ey); ctx.lineTo(bx + 6, ey)
      ctx.moveTo(ex - 6, by); ctx.lineTo(ex, by); ctx.lineTo(ex, ey); ctx.lineTo(ex - 6, ey)
      ctx.stroke()

      // Stats below
      ctx.font = '8px "Departure Mono",monospace'; ctx.fillStyle = 'rgba(192,132,252,0.45)'
      ctx.textAlign = 'center'
      ctx.fillText('Tr(ρ) = 1.000   Tr(ρ²) = 0.994   Purity: 99.4%', 0, n * cell / 2 + 18)

      ctx.restore()
    }

    const drawQuantumCircuitLarge = (wx, wy, scale = 0.78) => {
      const scrollY = window.scrollY || 0
      const vx = wx, vy = wy - scrollY
      ctx.save(); ctx.translate(vx, vy); ctx.scale(scale, scale)

      const numQubits = 5
      const qSpacing = 52
      const gateWidth = 30
      const startX = -240, endX = 280
      const startY = -(numQubits - 1) * qSpacing / 2

      // Title
      ctx.font = '10px "Departure Mono",monospace'; ctx.fillStyle = 'rgba(192,132,252,0.5)'
      ctx.textAlign = 'center'; ctx.fillText('QUANTUM CIRCUIT — GROVER ORACLE  N=5 QUBITS', 0, startY - 28)

      // Wire lines
      ctx.strokeStyle = 'rgba(168,85,247,0.2)'; ctx.lineWidth = 1.2
      for (let q = 0; q < numQubits; q++) {
        const y = startY + q * qSpacing
        ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(endX, y); ctx.stroke()
        // Input labels
        ctx.fillStyle = 'rgba(168,85,247,0.55)'; ctx.textAlign = 'right'; ctx.font = '9px "Departure Mono",monospace'
        ctx.fillText(`|q${q}⟩`, startX - 6, y + 4)
      }

      // Gate helper
      const gate = (x, y, label, color) => {
        ctx.strokeStyle = color || 'rgba(168,85,247,0.45)'; ctx.fillStyle = 'rgba(14,7,32,0.85)'
        ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.roundRect(x - gateWidth/2, y - 14, gateWidth, 28, 3); ctx.fill(); ctx.stroke()
        ctx.fillStyle = color || 'rgba(192,132,252,0.85)'; ctx.textAlign = 'center'
        ctx.font = `bold 12px "Departure Mono",monospace`
        ctx.fillText(label, x, y + 5)
      }

      // H gates (column 1)
      for (let q = 0; q < numQubits; q++) {
        gate(-180, startY + q * qSpacing, 'H')
      }

      // Oracle box
      ctx.strokeStyle = 'rgba(56,189,248,0.35)'; ctx.fillStyle = 'rgba(6,182,212,0.06)'
      ctx.lineWidth = 1.5
      const oracleX = -80, oracleY = startY - 14, oracleH = (numQubits - 1) * qSpacing + 28
      ctx.beginPath(); ctx.roundRect(oracleX - 40, oracleY, 80, oracleH, 4); ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(56,189,248,0.55)'; ctx.textAlign = 'center'
      ctx.font = '9px "Departure Mono",monospace'
      ctx.fillText('ORACLE', oracleX, startY + (numQubits - 1) * qSpacing / 2 + 4)
      ctx.fillText('Uf', oracleX, startY + (numQubits - 1) * qSpacing / 2 + 16)

      // Diffuser box
      ctx.strokeStyle = 'rgba(192,132,252,0.35)'; ctx.fillStyle = 'rgba(168,85,247,0.06)'
      ctx.lineWidth = 1.5
      const diffX = 60, diffY = startY - 14
      ctx.beginPath(); ctx.roundRect(diffX - 40, diffY, 80, oracleH, 4); ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(192,132,252,0.55)'; ctx.textAlign = 'center'
      ctx.fillText('DIFFUSER', diffX, startY + (numQubits - 1) * qSpacing / 2 + 4)
      ctx.fillText('2|ψ⟩⟨ψ|-I', diffX, startY + (numQubits - 1) * qSpacing / 2 + 16)

      // H gates (column 3)
      for (let q = 0; q < numQubits; q++) {
        gate(160, startY + q * qSpacing, 'H')
      }

      // Measurement gates
      for (let q = 0; q < numQubits; q++) {
        const y = startY + q * qSpacing
        ctx.strokeStyle = 'rgba(52,211,153,0.4)'; ctx.fillStyle = 'rgba(6,78,59,0.12)'
        ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.roundRect(220, y - 14, 30, 28, 3); ctx.fill(); ctx.stroke()
        ctx.strokeStyle = 'rgba(52,211,153,0.6)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(235, y + 2, 7, Math.PI, 0); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(235, y + 2); ctx.lineTo(240, y - 4); ctx.stroke()
      }

      // Grover iterations label
      ctx.font = '9px "Departure Mono",monospace'; ctx.fillStyle = 'rgba(192,132,252,0.4)'
      ctx.textAlign = 'center'
      ctx.fillText('× ⌊π/4 · √N⌋ = 5 iterations  |  O(√N) speedup over classical', 0, startY + numQubits * qSpacing)

      ctx.restore()
    }

    // ─── DIAGRAM SCHEDULE (Elegantly distributed across homepage sections) ───
    const DIAGRAMS = [
      { worldY: 1100, side: 'left',   marginX: 220, fn: drawBellCircuit },
      { worldY: 1950, side: 'right',  marginX: 200, fn: drawMachZehnder },
      { worldY: 3400, side: 'right',  marginX: 200, fn: (wx, wy) => drawDensityMatrix(wx, wy, 5) },
      { worldY: 4400, side: 'left',   marginX: 220, fn: drawCryoLadder },
      { worldY: 5400, side: 'center', marginX: 0,   fn: drawOscilloscope },
    ]

    // ─── RENDER LOOP ────────────────────────────────────────────────────────────
    const render = () => {
      const scrollY = window.scrollY || 0
      const mx = mouseRef.current
      mx.x += (mx.targetX - mx.x) * 0.1
      mx.y += (mx.targetY - mx.y) * 0.1

      // Canvas is now viewport-sized (position: fixed), so clear/fill only the viewport
      ctx.clearRect(0, 0, W, H)

      // Base fill
      ctx.fillStyle = '#06040a'
      ctx.fillRect(0, 0, W, H)

      // Radial glow near top of page
      {
        const opacity = Math.max(0, 1 - scrollY / 1200)
        if (opacity > 0) {
          const glow = ctx.createRadialGradient(W * 0.5, H * 0.3, 0, W * 0.5, H * 0.3, W * 0.55)
          glow.addColorStop(0, `rgba(168,85,247,${0.08 * opacity})`)
          glow.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = glow
          ctx.fillRect(0, 0, W, H)
        }
      }

      // ── BOTTOM OF PAGE BOUNDARY (read from zero-reflow layoutCache) ──
      const bottomLimit = Math.max(layoutCache.docHeight, layoutCache.footerBottom < 1e8 ? layoutCache.footerBottom : 0, H)
      const footerTop = layoutCache.footerTop

      // ── MARGIN RULER SCALES ──
      {
        const leftX = 18, rx = W - 24
        const hasRight = W > 860
        const viewTop = scrollY
        const viewBottom = scrollY + H
        const scaleStart = Math.max(0, viewTop)
        const scaleEnd = Math.min(bottomLimit, viewBottom)

        ctx.save()
        ctx.font = '8px "Departure Mono",monospace'

        if (scaleEnd > scaleStart) {
          // Convert world coords to canvas (viewport) coords
          const toCanvas = (worldY) => worldY - scrollY

          ctx.strokeStyle = 'rgba(168,85,247,0.22)'; ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(leftX, toCanvas(scaleStart)); ctx.lineTo(leftX, toCanvas(scaleEnd)); ctx.stroke()
          if (hasRight) {
            ctx.beginPath(); ctx.moveTo(rx, toCanvas(scaleStart)); ctx.lineTo(rx, toCanvas(scaleEnd)); ctx.stroke()
          }

          // Page top cap
          if (scrollY <= 0) {
            ctx.strokeStyle = 'rgba(168,85,247,0.45)'; ctx.lineWidth = 1.2
            ctx.beginPath(); ctx.moveTo(leftX - 6, 0); ctx.lineTo(leftX + 6, 0); ctx.stroke()
            if (hasRight) { ctx.beginPath(); ctx.moveTo(rx - 6, 0); ctx.lineTo(rx + 6, 0); ctx.stroke() }
          }

          // Bottom of page cap (END_SCALE) — appears at the bottom of the page
          const endVY = bottomLimit - scrollY
          if (endVY >= 0 && endVY <= H) {
            ctx.strokeStyle = 'rgba(168,85,247,0.6)'; ctx.lineWidth = 1.5
            ctx.beginPath(); ctx.moveTo(leftX - 8, endVY); ctx.lineTo(leftX + 8, endVY); ctx.stroke()
            if (hasRight) { ctx.beginPath(); ctx.moveTo(rx - 8, endVY); ctx.lineTo(rx + 8, endVY); ctx.stroke() }
            ctx.fillStyle = 'rgba(192,132,252,0.5)'; ctx.textAlign = 'left'
            ctx.fillText('END_SCALE', leftX + 11, endVY - 4)
            if (hasRight) { ctx.textAlign = 'right'; ctx.fillText('0xFOOTER', rx - 11, endVY - 4) }
          }

          // Major/minor ticks
          const stepMinor = 24, stepMajor = 120
          const startWorld = Math.floor(viewTop / stepMinor) * stepMinor
          const endWorld = Math.min(viewBottom, bottomLimit)

          for (let worldY = startWorld; worldY <= endWorld; worldY += stepMinor) {
            if (worldY < 0 || worldY > bottomLimit) continue
            const vy = worldY - scrollY
            if (vy < -10 || vy > H + 2) continue

            const isMajor = worldY % stepMajor === 0
            if (isMajor) {
              ctx.strokeStyle = 'rgba(168,85,247,0.38)'; ctx.lineWidth = 1
              ctx.beginPath(); ctx.moveTo(leftX - 5, vy); ctx.lineTo(leftX + 5, vy); ctx.stroke()
              ctx.fillStyle = 'rgba(192,132,252,0.35)'; ctx.textAlign = 'left'
              ctx.fillText(`Y:${String(worldY).padStart(5, '0')}`, leftX + 9, vy + 3)
              if (hasRight) {
                ctx.beginPath(); ctx.moveTo(rx - 5, vy); ctx.lineTo(rx + 5, vy); ctx.stroke()
                ctx.fillStyle = 'rgba(56,189,248,0.3)'; ctx.textAlign = 'right'
                ctx.fillText(`+${Math.floor(worldY / 10)}`, rx - 9, vy + 3)
              }
            } else {
              ctx.strokeStyle = 'rgba(168,85,247,0.18)'; ctx.lineWidth = 0.8
              ctx.beginPath(); ctx.moveTo(leftX - 2.5, vy); ctx.lineTo(leftX + 2.5, vy); ctx.stroke()
              if (hasRight) { ctx.beginPath(); ctx.moveTo(rx - 2.5, vy); ctx.lineTo(rx + 2.5, vy); ctx.stroke() }
            }
          }
        }
        ctx.restore()
      }

      // ── VIEWPORT CORNER BRACKETS ──
      ctx.save()
      ctx.strokeStyle = 'rgba(168,85,247,0.28)'; ctx.lineWidth = 1.1
      const b = 13, p = 11
      ctx.beginPath(); ctx.moveTo(p, p+b); ctx.lineTo(p, p); ctx.lineTo(p+b, p); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(W-p-b, p); ctx.lineTo(W-p, p); ctx.lineTo(W-p, p+b); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(p, H-p-b); ctx.lineTo(p, H-p); ctx.lineTo(p+b, H-p); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(W-p-b, H-p); ctx.lineTo(W-p, H-p); ctx.lineTo(W-p, H-p-b); ctx.stroke()
      ctx.restore()

      // ── DIAGRAMS — draw those within ±600px of viewport ──
      const viewTop = scrollY
      const viewBottom = scrollY + H
      const pad = 600

      DIAGRAMS.forEach(({ worldY, side, marginX, fn }) => {
        if (worldY < viewTop - pad || worldY > viewBottom + pad) return
        if (worldY > footerTop && footerTop > 2000) return

        let wx
        if (side === 'center') wx = W / 2
        else if (side === 'left')  wx = marginX
        else                       wx = W - marginX

        fn(wx, worldY)
      })

      // ── BLOCH SPHERE (CIRCLE DIAGRAM) ──
      // Positioned below "We make quantum computing accessible to everyone" (#about)
      // at left side portion just above "Pioneers of the Quantum Realm" (#pioneers)
      const blochWorldY = layoutCache.blochWorldY

      if (blochWorldY >= viewTop - pad && blochWorldY <= viewBottom + pad && (footerTop <= 2000 || blochWorldY <= footerTop)) {
        const blochR = W < 640 ? 115 : (W < 1024 ? 150 : 190)
        const blochMarginX = W < 640 ? Math.max(90, W * 0.22) : (W < 1024 ? 150 : Math.max(180, Math.min(235, W * 0.15)))
        drawBlochSphere(blochMarginX, blochWorldY, blochR)
      }

      // ── QUANTUM CIRCUIT GROVER ORACLE ──
      // Pushed down to the right-side area of "A Decade of Quantum Acceleration" (#timeline),
      // positioned parallel to the 2016 "IBM puts quantum on the cloud" box.
      if (W > 860) {
        const circuitWorldY = layoutCache.circuitWorldY
        if (circuitWorldY >= viewTop - pad && circuitWorldY <= viewBottom + pad && (footerTop <= 2000 || circuitWorldY <= footerTop)) {
          // Center in the right-hand area parallel to the 2016 timeline item (which sits on the left)
          const circuitWX = (W / 2) + Math.min(240, Math.max(185, (W - 860) * 0.25 + 195))
          drawQuantumCircuitLarge(circuitWX, circuitWorldY, 0.78)
        }
      }

      // ── MOUSE RETICLE ──
      if (mx.x > 0 && mx.y > 0 && mx.x < W && mx.y < H) {
        ctx.save()
        ctx.strokeStyle = 'rgba(168,85,247,0.18)'; ctx.lineWidth = 0.8
        ctx.setLineDash([2, 4])
        ctx.beginPath()
        ctx.moveTo(mx.x - 22, mx.y); ctx.lineTo(mx.x + 22, mx.y)
        ctx.moveTo(mx.x, mx.y - 22); ctx.lineTo(mx.x, mx.y + 22)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.font = '7px "Departure Mono",monospace'
        ctx.fillStyle = 'rgba(192,132,252,0.4)'; ctx.textAlign = 'left'
        ctx.fillText(`[${Math.round(mx.x)}, ${Math.round(mx.y + scrollY)}]`, mx.x + 10, mx.y - 8)
        ctx.restore()
      }

      raf = requestAnimationFrame(render)
    }

    if (prefersReduced) {
      // Reduced motion: just paint the background once, no animation
      ctx.fillStyle = '#06040a'
      ctx.fillRect(0, 0, W, H)
    } else {
      raf = requestAnimationFrame(render)
    }

    // Pause RAF when tab is hidden — saves CPU/battery
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else if (!prefersReduced) {
        raf = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      clearTimeout(tPostPreloader)
      window.removeEventListener('load', updateLayoutCache)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
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
