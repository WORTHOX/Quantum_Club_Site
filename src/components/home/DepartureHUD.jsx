import { useEffect, useRef, useState } from 'react'

// ── Live clock ──────────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
}

// ── Animated bar ────────────────────────────────────────────────────────────
function HUDBar({ label, value, max, unit = '', color = '#34d399', width = 120 }) {
  const pct = Math.min(1, value / max)
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] tracking-widest opacity-60">{label}</span>
        <span className="text-[9px] font-bold" style={{ color }}>{value}{unit}</span>
      </div>
      <div className="h-[6px] rounded-none relative overflow-hidden" style={{ width, background: 'rgba(255,255,255,0.07)' }}>
        <div
          className="h-full transition-all duration-1000"
          style={{ width: `${pct * 100}%`, background: `linear-gradient(90deg, ${color}99, ${color})`, boxShadow: `0 0 6px ${color}66` }}
        />
      </div>
    </div>
  )
}

// ── Animated reticle SVG — state vector rotated via CSS, zero JS re-renders ──
function HUDReticle() {
  const r = 120

  return (
    <svg
      viewBox="-180 -180 360 360"
      className="w-full h-full"
      style={{ maxWidth: 320, maxHeight: 320 }}
    >
      {/* Inject keyframe once inside SVG (works cross-browser) */}
      <defs>
        <style>{`
          @keyframes hud-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          .hud-vector {
            animation: hud-spin 4.5s linear infinite;
            transform-origin: 0px 0px;
            transform-box: view-box;
          }
        `}</style>
      </defs>

      {/* Outer ring */}
      <circle cx={0} cy={0} r={r + 30} stroke="#34d399" strokeWidth={0.8} strokeOpacity={0.2} fill="none" />
      {/* Main circle */}
      <circle cx={0} cy={0} r={r} stroke="#34d399" strokeWidth={1.2} strokeOpacity={0.5} fill="none" />
      {/* Inner rings */}
      <circle cx={0} cy={0} r={r * 0.65} stroke="#06b6d4" strokeWidth={0.8} strokeOpacity={0.25} fill="none" strokeDasharray="3 5" />
      <circle cx={0} cy={0} r={r * 0.35} stroke="#06b6d4" strokeWidth={0.8} strokeOpacity={0.2} fill="none" />

      {/* Equator ellipse */}
      <ellipse cx={0} cy={0} rx={r} ry={r * 0.28} stroke="#34d399" strokeWidth={0.8} strokeOpacity={0.3} fill="none" />
      {/* Meridian ellipse */}
      <ellipse cx={0} cy={0} rx={r * 0.28} ry={r} stroke="#34d399" strokeWidth={0.8} strokeOpacity={0.3} fill="none" />

      {/* Crosshair lines */}
      <line x1={-(r+48)} y1={0} x2={r+48} y2={0} stroke="#34d399" strokeWidth={0.7} strokeOpacity={0.35} />
      <line x1={0} y1={-(r+48)} x2={0} y2={r+48} stroke="#34d399" strokeWidth={0.7} strokeOpacity={0.35} />

      {/* Diagonal guides */}
      <line x1={-(r+20)} y1={-(r+20)} x2={r+20} y2={r+20} stroke="#06b6d4" strokeWidth={0.4} strokeOpacity={0.15} />
      <line x1={r+20} y1={-(r+20)} x2={-(r+20)} y2={r+20} stroke="#06b6d4" strokeWidth={0.4} strokeOpacity={0.15} />

      {/* Corner brackets */}
      {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx2,sy2], i) => {
        const bx = sx2 * (r + 44), by = sy2 * (r + 44), bs = 20
        return (
          <g key={i}>
            <line x1={bx} y1={by} x2={bx - sx2 * bs} y2={by} stroke="#34d399" strokeWidth={1.5} strokeOpacity={0.7} />
            <line x1={bx} y1={by} x2={bx} y2={by - sy2 * bs} stroke="#34d399" strokeWidth={1.5} strokeOpacity={0.7} />
          </g>
        )
      })}

      {/* Tick marks on outer ring */}
      {Array.from({ length: 36 }, (_, i) => {
        const a = (i / 36) * Math.PI * 2
        const isMaj = i % 9 === 0
        const r1 = r + (isMaj ? 12 : 6), r2 = r + 2
        return (
          <line key={i}
            x1={Math.cos(a) * r2} y1={Math.sin(a) * r2}
            x2={Math.cos(a) * r1} y2={Math.sin(a) * r1}
            stroke="#34d399" strokeWidth={isMaj ? 1.2 : 0.6} strokeOpacity={isMaj ? 0.6 : 0.25}
          />
        )
      })}

      {/* CSS-animated state vector — browser handles at 60fps, zero JS */}
      <g className="hud-vector" style={{ transformOrigin: '0px 0px', transformBox: 'view-box' }}>
        <line x1={0} y1={0} x2={0} y2={-r * 0.8} stroke="#34d399" strokeWidth={1.8} strokeOpacity={0.9}
          style={{ filter: 'drop-shadow(0 0 4px #34d399)' }} />
        <circle cx={0} cy={-r * 0.8} r={4} fill="#34d399" opacity={0.9}
          style={{ filter: 'drop-shadow(0 0 6px #34d399)' }} />
        {/* Projection lines (static-ish, attached to vector) */}
        <line x1={0} y1={-r * 0.8} x2={0} y2={0} stroke="#34d399" strokeWidth={0.6} strokeOpacity={0.3} strokeDasharray="3 4" />
      </g>
      <circle cx={0} cy={0} r={3} fill="#06b6d4" opacity={0.8} />

      {/* Center telemetry box — static display */}
      <rect x={-38} y={-30} width={76} height={60} rx={2}
        stroke="#34d399" strokeWidth={0.8} strokeOpacity={0.45} fill="#070a08" fillOpacity={0.85} />
      <text x={0} y={-14} textAnchor="middle" fontSize={7} fill="#34d399" opacity={0.7} fontFamily="'Departure Mono',monospace">
        R 042
      </text>
      <text x={0} y={-2} textAnchor="middle" fontSize={7} fill="#34d399" opacity={0.7} fontFamily="'Departure Mono',monospace">
        P 045
      </text>
      <text x={0} y={10} textAnchor="middle" fontSize={7} fill="#34d399" opacity={0.7} fontFamily="'Departure Mono',monospace">
        Y 090
      </text>

      {/* LOCK indicator */}
      <rect x={-28} y={18} width={56} height={14} rx={1}
        stroke="#34d399" strokeWidth={0.7} strokeOpacity={0.6} fill="#34d39922" />
      <text x={0} y={28} textAnchor="middle" fontSize={7} fill="#34d399" fontFamily="'Departure Mono',monospace" fontWeight="bold">
        LOCK
      </text>

      {/* Axis labels */}
      <text x={0} y={-(r+54)} textAnchor="middle" fontSize={8} fill="#34d399" opacity={0.6} fontFamily="'Departure Mono',monospace">|0⟩</text>
      <text x={0} y={r+64} textAnchor="middle" fontSize={8} fill="#34d399" opacity={0.6} fontFamily="'Departure Mono',monospace">|1⟩</text>
      <text x={r+54} y={4} textAnchor="start" fontSize={8} fill="#06b6d4" opacity={0.6} fontFamily="'Departure Mono',monospace">|+⟩</text>
      <text x={-(r+54)} y={4} textAnchor="end" fontSize={8} fill="#06b6d4" opacity={0.6} fontFamily="'Departure Mono',monospace">|−⟩</text>
    </svg>
  )
}

// ── Gauge arc ───────────────────────────────────────────────────────────────
function GaugeArc({ value, max, label, color = '#34d399', size = 56 }) {
  const pct = Math.min(1, value / max)
  const r = size / 2 - 5
  const circ = 2 * Math.PI * r
  const arc = circ * 0.75
  const offset = arc - pct * arc
  const start = 135, sweep = 270

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background arc */}
        <circle cx={size/2} cy={size/2} r={r}
          fill="none" stroke={`${color}22`} strokeWidth={4}
          strokeDasharray={`${arc} ${circ - arc}`}
          strokeDashoffset={-circ * 0.125}
          strokeLinecap="round"
          transform={`rotate(135 ${size/2} ${size/2})`}
        />
        {/* Value arc */}
        <circle cx={size/2} cy={size/2} r={r}
          fill="none" stroke={color} strokeWidth={4} strokeOpacity={0.8}
          strokeDasharray={`${arc} ${circ - arc}`}
          strokeDashoffset={offset - circ * 0.125}
          strokeLinecap="round"
          transform={`rotate(135 ${size/2} ${size/2})`}
          style={{ filter: `drop-shadow(0 0 3px ${color})`, transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text x={size/2} y={size/2 + 3} textAnchor="middle" fontSize={9} fill={color} fontFamily="'Departure Mono',monospace" fontWeight="bold">
          {value}
        </text>
      </svg>
      <span className="text-[8px] tracking-wider opacity-50 text-center leading-tight">{label}</span>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function DepartureHUD() {
  const time = useClock()
  const [metrics, setMetrics] = useState({
    t1: 220, t2: 85, fidelity: 99.82, errorRate: 0.18,
    activeQubits: 127, circuitDepth: 42, shotCount: 8192, gateCount: 237,
    heP: 3480, h2P: 3540, masterVol: 72,
  })

  // Subtle metric drift (1.8s interval — acceptable, one re-render/1.8s)
  useEffect(() => {
    const id = setInterval(() => {
      setMetrics(m => ({
        ...m,
        fidelity: +(99.5 + Math.random() * 0.45).toFixed(2),
        errorRate: +(0.12 + Math.random() * 0.12).toFixed(2),
        t1: Math.round(210 + Math.random() * 20),
        t2: Math.round(80 + Math.random() * 10),
        activeQubits: Math.round(120 + Math.random() * 7),
        circuitDepth: Math.round(38 + Math.random() * 8),
        gateCount: Math.round(230 + Math.random() * 14),
        heP: Math.round(3460 + Math.random() * 40),
        h2P: Math.round(3520 + Math.random() * 40),
        masterVol: Math.round(68 + Math.random() * 8),
      }))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  const LINE = 'border-t border-[#34d399]/15'
  const COL  = 'border-l border-[#34d399]/15'
  const PANEL = 'font-["Departure_Mono",monospace] text-[#34d399]'

  return (
    <section className={`relative w-full py-0 overflow-hidden ${PANEL}`} id="departure-hud" aria-label="Quantum telemetry HUD">
      {/* Outer border frame */}
      <div className="relative w-full border border-[#34d399]/25 mx-auto" style={{ fontFamily: "'Departure Mono', 'Courier New', monospace" }}>

        {/* ── HEADER BAR ─────────────────────────────────────────────────────── */}
        <div className={`flex items-center justify-between px-4 py-2 border-b border-[#34d399]/25 text-[10px] tracking-widest text-[#34d399]`}>
          <div className="flex flex-col leading-snug">
            <span className="opacity-60 text-[8px]">QUANTUM TIME:</span>
            <span className="font-bold tabular-nums">{time}</span>
          </div>

          <div className="flex items-center gap-1 opacity-70">
            {Array.from('| | | | | |').map((c, i) => (
              <span key={i} className="text-[10px]">{c}</span>
            ))}
            <span className="mx-3 tracking-[0.3em] font-bold text-[11px]">
              S Y M B I O S I S &nbsp; Q U A N T U M &nbsp; C L U B
            </span>
            {Array.from('| | | | | |').map((c, i) => (
              <span key={i} className="text-[10px]">{c}</span>
            ))}
          </div>

          <div className="flex flex-col leading-snug text-right">
            <span className="opacity-60 text-[8px]">QPU TEMP:</span>
            <span className="font-bold tabular-nums text-cyan-400">15 mK</span>
          </div>
        </div>

        {/* ── MAIN BODY: LEFT | CENTER | RIGHT ───────────────────────────────── */}
        <div className="grid grid-cols-[200px_1fr_200px] min-h-[380px]">

          {/* LEFT PANEL */}
          <div className="flex flex-col border-r border-[#34d399]/15 text-[9px]">
            {/* QPU Metrics */}
            <div className="px-3 py-2 border-b border-[#34d399]/15">
              <div className="flex items-center gap-1 mb-2 opacity-60 tracking-widest text-[8px]">
                <span>┌─</span><span>QPU METRICS</span><span>─┐</span>
              </div>
              <div className="flex flex-col gap-2">
                <HUDBar label="T₁ COHERENCE" value={metrics.t1} max={300} unit=" μs" color="#34d399" width={140} />
                <HUDBar label="T₂ DEPHASING" value={metrics.t2} max={150} unit=" μs" color="#06b6d4" width={140} />
                <HUDBar label="GATE FIDELITY" value={metrics.fidelity} max={100} unit="%" color="#34d399" width={140} />
              </div>
            </div>

            {/* Error & Noise */}
            <div className="px-3 py-2 border-b border-[#34d399]/15">
              <div className="flex items-center gap-1 mb-2 opacity-60 tracking-widest text-[8px]">
                <span>┌─</span><span>NOISE FLOOR</span><span>─┐</span>
              </div>
              <div className="flex flex-col gap-2">
                <HUDBar label="ERROR RATE" value={metrics.errorRate} max={2} unit="%" color="#f87171" width={140} />
                <HUDBar label="SHOT COUNT" value={metrics.shotCount} max={16384} unit="" color="#a78bfa" width={140} />
              </div>
            </div>

            {/* OS Audio / Volume */}
            <div className="px-3 py-2 flex flex-col gap-1">
              <div className="flex items-center gap-1 mb-1 opacity-60 tracking-widest text-[8px]">
                <span>┌─</span><span>SIGNAL AMP</span><span>─┐</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-50 text-[8px]">MASTER GAIN</span>
                <span className="text-[10px] font-bold">{metrics.masterVol} dB</span>
              </div>
              {/* Gauge arc for volume */}
              <div className="flex justify-center mt-1">
                <GaugeArc value={metrics.masterVol} max={100} label="dBm" color="#34d399" size={60} />
              </div>
            </div>
          </div>

          {/* CENTER RETICLE */}
          <div className="flex flex-col items-center justify-center relative py-4 px-4 gap-3">
            {/* Glyph column (left side of reticle) */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-30 tabular-nums text-[9px] pointer-events-none select-none">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i}>{1182 + i}</span>
              ))}
            </div>

            {/* Reticle */}
            <div className="relative" style={{ width: 'min(300px, 50vw)', height: 'min(300px, 50vw)' }}>
              <HUDReticle />
            </div>

            {/* Glyph column (right side) */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1 text-[9px] pointer-events-none select-none opacity-20 tabular-nums">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-[3px] rounded-full bg-current" style={{ width: 20 + Math.random() * 30 }} />
                  <span>{(25 - i * 3)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col border-l border-[#34d399]/15 text-[9px]">
            {/* Qubit ladder */}
            <div className="px-3 py-2 border-b border-[#34d399]/15">
              <div className="flex items-center gap-1 mb-2 opacity-60 tracking-widest text-[8px]">
                <span>┌─</span><span>QUBIT LADDER</span><span>─┐</span>
              </div>
              <div className="flex flex-col gap-2">
                <HUDBar label="ACTIVE QUBITS" value={metrics.activeQubits} max={133} unit="" color="#34d399" width={140} />
                <HUDBar label="CIRCUIT DEPTH" value={metrics.circuitDepth} max={100} unit="" color="#06b6d4" width={140} />
                <HUDBar label="GATE COUNT" value={metrics.gateCount} max={500} unit="" color="#a78bfa" width={140} />
              </div>
            </div>

            {/* Thermal stages */}
            <div className="px-3 py-2 border-b border-[#34d399]/15">
              <div className="flex items-center gap-1 mb-2 opacity-60 tracking-widest text-[8px]">
                <span>┌─</span><span>CRYO STAGES</span><span>─┐</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: '300 K  RT', val: metrics.heP, color: '#f87171' },
                  { label: ' 15 mK QPU', val: metrics.h2P, color: '#34d399' },
                ].map((s, i) => (
                  <HUDBar key={i} label={s.label} value={s.val} max={4000} unit="" color={s.color} width={140} />
                ))}
              </div>
            </div>

            {/* Gauge cluster */}
            <div className="px-3 py-3 flex items-center justify-around">
              <GaugeArc value={metrics.activeQubits} max={133} label="QUBITS" color="#34d399" size={56} />
              <GaugeArc value={metrics.circuitDepth} max={100} label="DEPTH" color="#06b6d4" size={56} />
              <GaugeArc value={Math.round(metrics.fidelity)} max={100} label="FIDEL" color="#a78bfa" size={56} />
            </div>
          </div>
        </div>

        {/* ── FOOTER BAR ─────────────────────────────────────────────────────── */}
        <div className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-t border-[#34d399]/25 text-[8px] tracking-widest opacity-50`}>
          <span className="px-1.5 py-0.5 border border-[#34d399]/50 text-[8px] leading-none">SYMBIOSIS QC</span>
          <span>INITIATED: 2023</span>
          <span>LAUNCHED: 2024 →</span>
          <span>PARTNER: IBM QISKIT</span>
          <span>CLASSIFICATION: OPEN ACCESS</span>
          <span>LICENSE: MIT</span>
        </div>

      </div>
    </section>
  )
}
