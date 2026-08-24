import { useState, useId } from 'react'

export default function QuantumScienceTriad() {
  const [activeDomain, setActiveDomain] = useState('math') // 'math' | 'physics' | 'chemistry'
  
  // Math Interactive State (N problem size)
  const [problemScale, setProblemScale] = useState(6) // 10^x
  
  // Physics Interactive State (Temperature in mK and Magnetic flux)
  const [cryoTemp, setCryoTemp] = useState(15) // mK (10 - 100)
  const [coherenceT1, setCoherenceT1] = useState(85) // microseconds

  // Chemistry Interactive State (Bond length R in Angstroms)
  const [bondLength, setBondLength] = useState(0.74) // 0.3 to 2.5 Angstroms
  
  const mathSliderId = useId()
  const cryoTempSliderId = useId()
  const coherenceSliderId = useId()
  const bondLengthSliderId = useId()

  // Calculate algorithmic speedup
  const N = Math.pow(10, problemScale)
  const classicalOperations = N
  const groverOperations = Math.round(Math.PI / 4 * Math.sqrt(N))
  const speedupRatio = (classicalOperations / (groverOperations || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })

  // Calculate Chemistry H2 Ground State Energy Surface: Morse / Lennard-Jones style approximation
  // E(R) in Hartrees: minimum around R = 0.741 A, depth ~ -1.17 Hartree
  const calcH2Energy = (r) => {
    const De = 0.174 // Dissociation energy in Hartree
    const a = 1.942 // Width parameter
    const re = 0.741 // Equilibrium bond length
    const E_inf = -1.000 // Free atoms limit
    const morse = De * Math.pow(1 - Math.exp(-a * (r - re)), 2) - De + E_inf
    return morse
  }
  const currentEnergy = calcH2Energy(bondLength).toFixed(4)
  const hartreeFockEnergy = (calcH2Energy(bondLength) + 0.042 * (1 + 0.5 * Math.sin(bondLength * 3))).toFixed(4)

  return (
    <section className="py-24 sm:py-32 bg-[#07040d] text-white relative overflow-hidden" id="science-foundations">
      {/* Background Quantum Mesh & Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-900/15 via-cyan-900/10 to-emerald-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 mb-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-gradient-to-r from-[#a855f7] via-[#06b6d4] to-[#10b981]" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase">
              THE TRIAD OF QUANTUM SCIENCE
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-extrabold text-white tracking-tight leading-[1.05]">
            Where{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-300 bg-clip-text text-transparent">Mathematics</span>,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-300 bg-clip-text text-transparent">Physics</span>, &{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300 bg-clip-text text-transparent">Chemistry</span> Converge
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-300 max-w-[70ch] leading-relaxed">
            Quantum computing isn’t just software—it is applied Hilbert-space linear algebra, Hamiltonian quantum mechanics, and molecular orbital energy simulation. Explore live graphs and parametric simulations below.
          </p>

          {/* Domain Tab Selector */}
          <div className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mt-4">
            <button
              onClick={() => setActiveDomain('math')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeDomain === 'math'
                  ? 'bg-purple-600/80 text-white shadow-[0_0_20px_rgba(168,85,247,0.45)] border border-purple-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>1. Mathematics (Complexity & Speedup)</span>
            </button>

            <button
              onClick={() => setActiveDomain('physics')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeDomain === 'physics'
                  ? 'bg-cyan-600/80 text-white shadow-[0_0_20px_rgba(6,182,212,0.45)] border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>2. Physics (Decoherence & Waves)</span>
            </button>

            <button
              onClick={() => setActiveDomain('chemistry')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeDomain === 'chemistry'
                  ? 'bg-emerald-600/80 text-white shadow-[0_0_20px_rgba(16,185,129,0.45)] border border-emerald-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>3. Chemistry (Molecular VQE & H₂)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Domain Graph Viewports */}
        <div className="rounded-3xl bg-[#0e0b17]/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          
          {/* =======================================================================
              TAB 1: MATHEMATICS (Algorithmic Scaling & Grover / Shor Speedups)
             ======================================================================= */}
          {activeDomain === 'math' && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center animate-fadeIn">
              {/* Left: SVG Computational Complexity Curve Graph */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 font-mono text-xs text-purple-300">
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/20 border border-purple-500/30">
                      GRAPH: O(N) vs O(√N)
                    </span>
                    <span className="text-slate-400 hidden sm:inline">Search Space Complexity</span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    Database Size N = 10^{problemScale}
                  </span>
                </div>

                {/* SVG Curve Canvas */}
                <div className="w-full h-72 sm:h-80 rounded-2xl bg-[#07040d] border border-white/[0.08] p-4 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    {[...Array(6)].map((_, i) => (
                      <line
                        key={`grid-y-${i}`}
                        x1="40"
                        y1={20 + i * 38}
                        x2="480"
                        y2={20 + i * 38}
                        stroke="#ffffff"
                        strokeOpacity="0.06"
                        strokeDasharray="4 4"
                      />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={`grid-x-${i}`}
                        x1={40 + i * 55}
                        y1="20"
                        x2={40 + i * 55}
                        y2="210"
                        stroke="#ffffff"
                        strokeOpacity="0.06"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {/* Classical Curve: Linear O(N) in Bright Red/Orange */}
                    <path
                      d="M 40 210 Q 200 180, 480 30"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="3"
                    />

                    {/* Quantum Grover Curve: O(sqrt(N)) in Vivid Purple */}
                    <path
                      d="M 40 210 Q 250 200, 480 155"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3.5"
                    />

                    {/* Dynamic Marker Point for selected Problem Scale */}
                    {(() => {
                      const t = (problemScale - 2) / 8 // normalized 0..1
                      const xClassical = 40 + t * 440
                      const yClassical = 210 - Math.pow(t, 1.3) * 180
                      const xQuantum = 40 + t * 440
                      const yQuantum = 210 - Math.sqrt(t) * 55
                      return (
                        <g>
                          {/* Classical Point */}
                          <circle cx={xClassical} cy={yClassical} r="6" fill="#f43f5e" className="animate-ping" />
                          <circle cx={xClassical} cy={yClassical} r="5" fill="#f43f5e" />
                          {/* Quantum Point */}
                          <circle cx={xQuantum} cy={yQuantum} r="6" fill="#a855f7" className="animate-ping" />
                          <circle cx={xQuantum} cy={yQuantum} r="5" fill="#c084fc" />
                          {/* Connecting Delta */}
                          <line x1={xClassical} y1={yClassical} x2={xQuantum} y2={yQuantum} stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                        </g>
                      )
                    })()}
                  </svg>

                  {/* Graph Legends */}
                  <div className="absolute top-4 left-6 flex flex-wrap gap-4 font-mono text-[11px] pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-rose-500 rounded-full" />
                      <span className="text-rose-300">Classical Search: O(N)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-purple-400 rounded-full shadow-[0_0_8px_#c084fc]" />
                      <span className="text-purple-300 font-bold">Quantum Grover: O(√N)</span>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-4 font-mono text-[10px] text-slate-500">
                    X-Axis: Items (N) ▪ Y-Axis: Execution Time (Steps)
                  </div>
                </div>

                {/* Interactive Scale Slider */}
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <label htmlFor={mathSliderId} className="text-slate-300 font-semibold cursor-pointer">Adjust Problem Dimension (N = 10^{problemScale})</label>
                    <span className="text-purple-400 font-bold">{N.toLocaleString()} elements</span>
                  </div>
                  <input
                    id={mathSliderId}
                    type="range"
                    min="2"
                    max="10"
                    step="1"
                    value={problemScale}
                    onChange={(e) => setProblemScale(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-slate-500">
                    <span>10² (100)</span>
                    <span>10⁶ (1 Million)</span>
                    <span>10¹⁰ (10 Billion)</span>
                  </div>
                </div>
              </div>

              {/* Right: Mathematical Metrics & Equations */}
              <div className="flex flex-col gap-5">
                <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/20 flex flex-col gap-3">
                  <span className="font-mono text-xs text-purple-300 uppercase tracking-wider font-semibold">
                    ✦ QUANTUM ADVANTAGE MULTIPLIER
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
                      {speedupRatio}x
                    </span>
                    <span className="font-mono text-xs text-purple-300">faster operations</span>
                  </div>
                  <p className="font-body text-xs text-slate-300 leading-relaxed">
                    While classical computing requires evaluating each element sequentially (<span className="text-rose-400 font-mono font-bold">{classicalOperations.toLocaleString()} steps</span>), Grover's amplitude amplification solves it in just <span className="text-purple-300 font-mono font-bold">{groverOperations.toLocaleString()} steps</span>.
                  </p>
                </div>

                {/* Mathematical Dirac & Hilbert Notation Box */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-3">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Hilbert Space Operator Matrix
                  </span>
                  <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-purple-300 border border-purple-500/20 overflow-x-auto">
                    <code>
                      |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩<br />
                      G = (2|s⟩⟨s| - I) · O_f
                    </code>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">
                    Unitary rotation transforms probability amplitudes in 2^N dimensional complex projective Hilbert space.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================================
              TAB 2: PHYSICS (Decoherence, T1/T2 Decay & Wave Interference)
             ======================================================================= */}
          {activeDomain === 'physics' && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center animate-fadeIn">
              {/* Left: Physics Oscillating Wave & T1/T2 Decay Graph */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 font-mono text-xs text-cyan-300">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/30">
                      GRAPH: T₁ RELAXATION & T₂* RAMSEY OSCILLATION
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    Cryo T = {cryoTemp} mK
                  </span>
                </div>

                {/* SVG Physics Wave Curve Canvas */}
                <div className="w-full h-72 sm:h-80 rounded-2xl bg-[#07040d] border border-white/[0.08] p-4 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
                    {/* Grid */}
                    {[...Array(6)].map((_, i) => (
                      <line key={`py-${i}`} x1="40" y1={20 + i * 38} x2="480" y2={20 + i * 38} stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 4" />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <line key={`px-${i}`} x1="40 + i * 55" y1="20" x2="40 + i * 55" y2="210" stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 4" />
                    ))}

                    {/* Zero Baseline */}
                    <line x1="40" y1="120" x2="480" y2="120" stroke="#06b6d4" strokeWidth="0.8" strokeOpacity="0.25" />

                    {/* T1 Decay Envelope: Exponential Decay from Excited State */}
                    {(() => {
                      const decayFactor = 0.005 * (cryoTemp / 15)
                      const pointsT1 = []
                      const pointsRamsey = []
                      for (let x = 40; x <= 480; x += 3) {
                        const t = x - 40
                        const env = Math.exp(-t * decayFactor)
                        const yT1 = 200 - env * 170
                        const yRamsey = 120 - env * 85 * Math.cos(t * 0.12)
                        pointsT1.push(`${x},${yT1}`)
                        pointsRamsey.push(`${x},${yRamsey}`)
                      }
                      return (
                        <>
                          {/* Envelope Upper */}
                          <path d={`M ${pointsT1.join(' L ')}`} fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
                          {/* Ramsey Dephasing Oscillating Signal */}
                          <path d={`M ${pointsRamsey.join(' L ')}`} fill="none" stroke="#06b6d4" strokeWidth="2.5" />
                        </>
                      )
                    })()}
                  </svg>

                  {/* Physics Legends */}
                  <div className="absolute top-4 left-6 flex flex-wrap gap-4 font-mono text-[11px] pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]" />
                      <span className="text-cyan-300 font-bold">Ramsey Fringe ⟨σ_z(t)⟩ = e^(-t/T₂) cos(ωt)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-sky-400 rounded-full" />
                      <span className="text-sky-300">T₁ Envelope: e^(-t/T₁)</span>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-4 font-mono text-[10px] text-slate-500">
                    X-Axis: Time (μs) ▪ Y-Axis: State Amplitudes & Polarization
                  </div>
                </div>

                {/* Physics Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col gap-1.5">
                    <div className="flex justify-between font-mono text-xs">
                      <label htmlFor={cryoTempSliderId} className="text-slate-300 font-semibold cursor-pointer">Cryogenic Temp (mK)</label>
                      <span className="text-cyan-400 font-bold">{cryoTemp} mK</span>
                    </div>
                    <input
                      id={cryoTempSliderId}
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={cryoTemp}
                      onChange={(e) => setCryoTemp(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col gap-1.5">
                    <div className="flex justify-between font-mono text-xs">
                      <label htmlFor={coherenceSliderId} className="text-slate-300 font-semibold cursor-pointer">Coherence Baseline (T₁)</label>
                      <span className="text-sky-400 font-bold">{coherenceT1} μs</span>
                    </div>
                    <input
                      id={coherenceSliderId}
                      type="range"
                      min="30"
                      max="150"
                      step="5"
                      value={coherenceT1}
                      onChange={(e) => setCoherenceT1(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Physics Physical Parameters & Transmon Hardware */}
              <div className="flex flex-col gap-5">
                <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex flex-col gap-3">
                  <span className="font-mono text-xs text-cyan-300 uppercase tracking-wider font-semibold">
                    ✦ SUPERCONDUCTING TRANSMON TELEMETRY
                  </span>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="font-mono text-[11px] text-slate-400 block">Qubit Frequency ω₀₁</span>
                      <span className="font-display text-xl font-bold text-white">5.024 GHz</span>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-slate-400 block">Anharmonicity α</span>
                      <span className="font-display text-xl font-bold text-cyan-400">-340 MHz</span>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-slate-400 block">Josephson Energy E_J</span>
                      <span className="font-display text-xl font-bold text-white">18.4 GHz</span>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-slate-400 block">Readout Fidelity</span>
                      <span className="font-display text-xl font-bold text-emerald-400">99.82%</span>
                    </div>
                  </div>
                </div>

                {/* Physics Schrödinger & Wavefunction Principle Box */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-3">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Schrödinger Equation & Hamiltonian
                  </span>
                  <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-cyan-300 border border-cyan-500/20">
                    <code>
                      iℏ ∂/∂t |ψ(t)⟩ = Ĥ |ψ(t)⟩<br />
                      Ĥ = 4E_C(n̂ - n_g)² - E_J cos(φ̂)
                    </code>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">
                    Cooper-pair tunneling across sub-micron Al/AlOₓ/Al Josephson junctions enables non-linear macroscopic quantum energy levels.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================================
              TAB 3: CHEMISTRY (Molecular Hamiltonian & VQE Potential Energy Surfaces)
             ======================================================================= */}
          {activeDomain === 'chemistry' && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center animate-fadeIn">
              {/* Left: SVG Molecular Potential Energy Surface Curve */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 font-mono text-xs text-emerald-300">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30">
                      GRAPH: H₂ MOLECULAR POTENTIAL ENERGY SURFACE E(R)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    R = {bondLength} Å
                  </span>
                </div>

                {/* SVG Chemistry Potential Well Curve Canvas */}
                <div className="w-full h-72 sm:h-80 rounded-2xl bg-[#07040d] border border-white/[0.08] p-4 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
                    {/* Grid */}
                    {[...Array(6)].map((_, i) => (
                      <line key={`cy-${i}`} x1="40" y1={20 + i * 38} x2="480" y2={20 + i * 38} stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 4" />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <line key={`cx-${i}`} x1={40 + i * 55} y1="20" x2="40 + i * 55" y2="210" stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 4" />
                    ))}

                    {/* Asymptote Energy Line */}
                    <line x1="40" y1="90" x2="480" y2="90" stroke="#10b981" strokeWidth="0.8" strokeDasharray="5 5" opacity="0.3" />

                    {/* Classical Hartree-Fock (HF) Energy Curve in Red/Orange */}
                    <path
                      d="M 50 20 Q 90 200, 160 175 T 480 75"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />

                    {/* Exact Quantum Full CI / VQE Potential Energy Well Curve in Emerald */}
                    <path
                      d="M 50 20 Q 85 230, 160 205 T 480 90"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                    />

                    {/* Equilibrium Minimum Indicator at R = 0.741 A (approx x = 160) */}
                    <circle cx="160" cy="205" r="4" fill="#34d399" />
                    <line x1="160" y1="20" x2="160" y2="220" stroke="#34d399" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />

                    {/* Current Selected Bond Length Indicator Point */}
                    {(() => {
                      // Map bondLength (0.3 to 2.5) to SVG X (50 to 480)
                      const xPos = 50 + ((bondLength - 0.3) / 2.2) * 430
                      // Map currentEnergy (-1.17 to -0.8) to SVG Y (205 to 20)
                      const yPos = 205 - (Math.abs(Number(currentEnergy)) - 1.174) * 450
                      return (
                        <g>
                          <circle cx={xPos} cy={Math.max(20, Math.min(220, yPos))} r="7" fill="#10b981" className="animate-ping" />
                          <circle cx={xPos} cy={Math.max(20, Math.min(220, yPos))} r="5" fill="#34d399" />
                        </g>
                      )
                    })()}
                  </svg>

                  {/* Chemistry Legends */}
                  <div className="absolute top-4 left-6 flex flex-wrap gap-4 font-mono text-[11px] pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                      <span className="text-emerald-300 font-bold">VQE Quantum Full CI Energy: E(R)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1 bg-amber-400 rounded-full" />
                      <span className="text-amber-300">Classical Hartree-Fock (Mean Field)</span>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-4 font-mono text-[10px] text-slate-500">
                    X-Axis: Interatomic Distance R (Å) ▪ Y-Axis: Ground Energy (Hartree)
                  </div>
                </div>

                {/* Chemistry Bond Slider */}
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <label htmlFor={bondLengthSliderId} className="text-slate-300 font-semibold cursor-pointer">Nuclear Separation Distance (R in Ångströms)</label>
                    <span className="text-emerald-400 font-bold">{bondLength} Å (Equilibrium = 0.741 Å)</span>
                  </div>
                  <input
                    id={bondLengthSliderId}
                    type="range"
                    min="0.30"
                    max="2.50"
                    step="0.02"
                    value={bondLength}
                    onChange={(e) => setBondLength(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-slate-500">
                    <span>0.30 Å (Repulsion)</span>
                    <span className="text-emerald-400 font-semibold">0.74 Å (Equilibrium Bond)</span>
                    <span>2.50 Å (Dissociation)</span>
                  </div>
                </div>
              </div>

              {/* Right: Chemistry VQE Algorithm Metrics */}
              <div className="flex flex-col gap-5">
                <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex flex-col gap-3">
                  <span className="font-mono text-xs text-emerald-300 uppercase tracking-wider font-semibold">
                    ✦ VQE GROUND STATE CALCULATION
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {currentEnergy} Ha
                    </span>
                    <span className="font-mono text-xs text-emerald-400">Total Ground Energy</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs border-t border-white/10 pt-3">
                    <span className="text-slate-400">Classical HF Error:</span>
                    <span className="text-rose-400 font-bold">+{(Math.abs(Number(currentEnergy) - Number(hartreeFockEnergy))).toFixed(4)} Ha</span>
                  </div>
                  <p className="font-body text-xs text-slate-300 leading-relaxed">
                    Classical methods fail when chemical bonds dissociate due to strong electron correlation. The Variational Quantum Eigensolver (VQE) maps the fermionic Hamiltonian onto qubit Pauli strings to compute exact binding energies.
                  </p>
                </div>

                {/* Electronic Hamiltonian Formula Box */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-3">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Fermionic Second-Quantized Hamiltonian
                  </span>
                  <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-emerald-300 border border-emerald-500/20 overflow-x-auto">
                    <code>
                      Ĥ = ∑ h_pq a†_p a_q + 1/2 ∑ h_pqrs a†_p a†_q a_s a_r<br />
                      Jordan-Wigner / Bravyi-Kitaev ⟶ ∑ c_j P_j
                    </code>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">
                    Maps complex molecular electron orbits to quantum circuits for catalysts, lithium batteries, and enzyme simulation.
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
