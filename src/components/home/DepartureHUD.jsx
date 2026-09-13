import { useEffect, useRef, useState } from 'react'

function useClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
}

function HUDBar({ label, value, max, unit = '', color = '#34d399' }) {
  const pct = Math.min(1, value / max)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="font-pixel text-[9px] tracking-widest opacity-60 uppercase">{label}</span>
        <span className="font-pixel text-[9px] font-bold tabular-nums" style={{ color }}>
          {value}{unit}
        </span>
      </div>
      <div className="h-[4px] rounded-full overflow-hidden bg-white/[0.06]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct * 100}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 6px ${color}55`,
          }}
        />
      </div>
    </div>
  )
}

function HUDReticle() {
  const r = 100
  return (
    <svg viewBox="-150 -150 300 300" className="w-full h-full">
      <defs>
        <style>{`
          @keyframes hud-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .hud-vector { animation: hud-spin 4.5s linear infinite; transform-origin: 0px 0px; transform-box: view-box; }
        `}</style>
      </defs>
      <circle cx={0} cy={0} r={r + 22} stroke="#34d399" strokeWidth={0.7} strokeOpacity={0.15} fill="none" />
      <circle cx={0} cy={0} r={r} stroke="#34d399" strokeWidth={1} strokeOpacity={0.45} fill="none" />
      <circle cx={0} cy={0} r={r * 0.6} stroke="#06b6d4" strokeWidth={0.7} strokeOpacity={0.2} fill="none" strokeDasharray="3 5" />
      <ellipse cx={0} cy={0} rx={r} ry={r * 0.28} stroke="#34d399" strokeWidth={0.7} strokeOpacity={0.25} fill="none" />
      <ellipse cx={0} cy={0} rx={r * 0.28} ry={r} stroke="#34d399" strokeWidth={0.7} strokeOpacity={0.25} fill="none" />
      <line x1={-(r + 36)} y1={0} x2={r + 36} y2={0} stroke="#34d399" strokeWidth={0.6} strokeOpacity={0.3} />
      <line x1={0} y1={-(r + 36)} x2={0} y2={r + 36} stroke="#34d399" strokeWidth={0.6} strokeOpacity={0.3} />
      {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx, sy], i) => {
        const bx = sx * (r + 30), by = sy * (r + 30), bs = 14
        return (
          <g key={i}>
            <line x1={bx} y1={by} x2={bx - sx * bs} y2={by} stroke="#34d399" strokeWidth={1.5} strokeOpacity={0.6} />
            <line x1={bx} y1={by} x2={bx} y2={by - sy * bs} stroke="#34d399" strokeWidth={1.5} strokeOpacity={0.6} />
          </g>
        )
      })}
      {Array.from({ length: 36 }, (_, i) => {
        const a = (i / 36) * Math.PI * 2
        const isMaj = i % 9 === 0
        return (
          <line key={i}
            x1={Math.cos(a) * (r + 2)} y1={Math.sin(a) * (r + 2)}
            x2={Math.cos(a) * (r + (isMaj ? 10 : 5))} y2={Math.sin(a) * (r + (isMaj ? 10 : 5))}
            stroke="#34d399" strokeWidth={isMaj ? 1 : 0.5} strokeOpacity={isMaj ? 0.55 : 0.2}
          />
        )
      })}
      <g className="hud-vector">
        <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke="#34d399" strokeWidth={1.6} strokeOpacity={0.9}
          style={{ filter: 'drop-shadow(0 0 4px #34d399)' }} />
        <circle cx={0} cy={-r * 0.78} r={3.5} fill="#34d399" opacity={0.9}
          style={{ filter: 'drop-shadow(0 0 5px #34d399)' }} />
      </g>
      <circle cx={0} cy={0} r={2.5} fill="#06b6d4" opacity={0.8} />
      <text x={0} y={-(r + 44)} textAnchor="middle" fontSize={7} fill="#34d399" opacity={0.6} fontFamily="'Departure Mono',monospace">|0⟩</text>
      <text x={0} y={r + 52} textAnchor="middle" fontSize={7} fill="#34d399" opacity={0.6} fontFamily="'Departure Mono',monospace">|1⟩</text>
      <text x={r + 44} y={4} textAnchor="start" fontSize={7} fill="#06b6d4" opacity={0.6} fontFamily="'Departure Mono',monospace">|+⟩</text>
      <text x={-(r + 44)} y={4} textAnchor="end" fontSize={7} fill="#06b6d4" opacity={0.6} fontFamily="'Departure Mono',monospace">|−⟩</text>
    </svg>
  )
}

export default function DepartureHUD() {
  const time = useClock()
  const [metrics, setMetrics] = useState({
    t1: 220, t2: 85, fidelity: 99.82, errorRate: 0.18,
    activeQubits: 127, circuitDepth: 42, gateCount: 237,
  })

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
      }))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="w-full border border-[#34d399]/20 font-pixel text-[#34d399] overflow-hidden rounded-sm"
      style={{ fontFamily: "'Departure Mono', 'Courier New', monospace" }}
      aria-label="Quantum telemetry HUD"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#34d399]/20 text-[10px] tracking-widest">
        <div className="flex flex-col leading-snug">
          <span className="opacity-50 text-[8px]">QUANTUM TIME</span>
          <span className="font-bold tabular-nums">{time}</span>
        </div>
        <span className="hidden sm:block tracking-[0.25em] font-bold text-[10px] opacity-60">
          SYMBIOSIS · QUANTUM · CLUB
        </span>
        <div className="flex flex-col leading-snug text-right">
          <span className="opacity-50 text-[8px]">QPU TEMP</span>
          <span className="font-bold tabular-nums text-cyan-400">15 mK</span>
        </div>
      </div>

      {/* Body — responsive: stacks on mobile, 3-col on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr]">

        {/* Left metrics */}
        <div className="flex flex-col gap-4 p-4 border-b sm:border-b-0 sm:border-r border-[#34d399]/15">
          <div className="opacity-50 text-[8px] tracking-widest">QPU METRICS</div>
          <HUDBar label="T₁ Coherence" value={metrics.t1} max={300} unit=" μs" color="#34d399" />
          <HUDBar label="T₂ Dephasing" value={metrics.t2} max={150} unit=" μs" color="#06b6d4" />
          <HUDBar label="Gate Fidelity" value={metrics.fidelity} max={100} unit="%" color="#34d399" />
          <div className="mt-2 opacity-50 text-[8px] tracking-widest">NOISE FLOOR</div>
          <HUDBar label="Error Rate" value={metrics.errorRate} max={2} unit="%" color="#f87171" />
        </div>

        {/* Center reticle — hidden on mobile, shown lg */}
        <div className="hidden lg:flex items-center justify-center p-6 border-x border-[#34d399]/15">
          <div style={{ width: 220, height: 220 }}>
            <HUDReticle />
          </div>
        </div>

        {/* Right metrics */}
        <div className="flex flex-col gap-4 p-4 sm:border-l lg:border-l-0 border-[#34d399]/15">
          <div className="opacity-50 text-[8px] tracking-widest">QUBIT LADDER</div>
          <HUDBar label="Active Qubits" value={metrics.activeQubits} max={133} color="#34d399" />
          <HUDBar label="Circuit Depth" value={metrics.circuitDepth} max={100} color="#06b6d4" />
          <HUDBar label="Gate Count" value={metrics.gateCount} max={500} color="#a78bfa" />
          {/* Key stats */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[
              { label: 'QUBITS', value: metrics.activeQubits, color: '#34d399' },
              { label: 'FIDELITY', value: `${metrics.fidelity}%`, color: '#a78bfa' },
            ].map(s => (
              <div key={s.label} className="p-2.5 border border-[#34d399]/15 rounded flex flex-col gap-0.5">
                <span className="text-[8px] opacity-50">{s.label}</span>
                <span className="text-[13px] font-bold tabular-nums" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-t border-[#34d399]/20 text-[8px] tracking-widest opacity-40">
        <span>SYMBIOSIS QC</span>
        <span>PARTNER: IBM QISKIT</span>
        <span>CLASSIFICATION: OPEN ACCESS</span>
      </div>
    </div>
  )
}
