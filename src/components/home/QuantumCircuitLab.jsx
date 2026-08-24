import { useState, useMemo } from 'react'

const PRESETS = {
  bell: {
    name: 'Bell Entangled State (|Φ⁺⟩)',
    description: 'Generates maximal entanglement between q₀ and q₁. Measuring q₀ instantaneously collapses q₁.',
    gates: {
      q0: ['H', 'none', 'none'],
      q1: ['none', 'CX_tgt', 'none'],
      q2: ['none', 'none', 'none'],
    },
    cnot: { control: 0, target: 1, step: 1 },
    formula: '|ψ⟩ = 1/√2 (|000⟩ + |110⟩)',
  },
  ghz: {
    name: '3-Qubit GHZ State',
    description: 'Tripartite quantum entanglement across all three qubits. Used in quantum secret sharing and error correction.',
    gates: {
      q0: ['H', 'none', 'none'],
      q1: ['none', 'CX_tgt', 'none'],
      q2: ['none', 'none', 'CX_tgt2'],
    },
    cnot: { control: 0, target: 1, step: 1, target2: 2, step2: 2 },
    formula: '|ψ⟩ = 1/√2 (|000⟩ + |111⟩)',
  },
  superposition: {
    name: 'Uniform Superposition (Hadamard Layer)',
    description: 'Applies Hadamard gates across all qubits, creating an equal superposition over all 2³ = 8 computational basis states.',
    gates: {
      q0: ['H', 'none', 'none'],
      q1: ['H', 'none', 'none'],
      q2: ['H', 'none', 'none'],
    },
    cnot: null,
    formula: '|ψ⟩ = 1/√8 (|000⟩ + |001⟩ + ... + |111⟩)',
  },
  grover: {
    name: "Grover's Oracle Target (|101⟩)",
    description: 'Marks target state |101⟩ with a phase inversion, priming it for amplitude amplification.',
    gates: {
      q0: ['H', 'X', 'H'],
      q1: ['H', 'none', 'none'],
      q2: ['H', 'X', 'H'],
    },
    cnot: null,
    formula: '|ψ⟩ = 0.50|101⟩ + 0.28∑|others⟩',
  },
}

export default function QuantumCircuitLab() {
  const [activePresetKey, setActivePresetKey] = useState('bell')

  const currentPreset = PRESETS[activePresetKey]

  // Calculate probabilities based on preset
  const probabilities = useMemo(() => {
    if (activePresetKey === 'bell') {
      return [
        { state: '|000⟩', prob: 50, amp: '1/√2 (0.707)', phase: 0 },
        { state: '|001⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|010⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|011⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|100⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|101⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|110⟩', prob: 50, amp: '1/√2 (0.707)', phase: 0 },
        { state: '|111⟩', prob: 0, amp: '0.000', phase: 0 },
      ]
    }
    if (activePresetKey === 'ghz') {
      return [
        { state: '|000⟩', prob: 50, amp: '1/√2 (0.707)', phase: 0 },
        { state: '|001⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|010⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|011⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|100⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|101⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|110⟩', prob: 0, amp: '0.000', phase: 0 },
        { state: '|111⟩', prob: 50, amp: '1/√2 (0.707)', phase: 0 },
      ]
    }
    if (activePresetKey === 'superposition') {
      return [
        { state: '|000⟩', prob: 12.5, amp: '1/√8 (0.354)', phase: 0 },
        { state: '|001⟩', prob: 12.5, amp: '1/√8 (0.354)', phase: 0 },
        { state: '|010⟩', prob: 12.5, amp: '1/√8 (0.354)', phase: 0 },
        { state: '|011⟩', prob: 12.5, amp: '1/√8 (0.354)', phase: 0 },
        { state: '|100⟩', prob: 12.5, amp: '1/√8 (0.354)', phase: 0 },
        { state: '|101⟩', prob: 12.5, amp: '1/√8 (0.354)', phase: 0 },
        { state: '|110⟩', prob: 12.5, amp: '1/√8 (0.354)', phase: 0 },
        { state: '|111⟩', prob: 12.5, amp: '1/√8 (0.354)', phase: 0 },
      ]
    }
    // Grover marked state
    return [
      { state: '|000⟩', prob: 7.1, amp: '0.267', phase: 0 },
      { state: '|001⟩', prob: 7.1, amp: '0.267', phase: 0 },
      { state: '|010⟩', prob: 7.1, amp: '0.267', phase: 0 },
      { state: '|011⟩', prob: 7.1, amp: '0.267', phase: 0 },
      { state: '|100⟩', prob: 7.1, amp: '0.267', phase: 0 },
      { state: '|101⟩', prob: 50.4, amp: '0.710', phase: 180 },
      { state: '|110⟩', prob: 7.1, amp: '0.267', phase: 0 },
      { state: '|111⟩', prob: 7.1, amp: '0.267', phase: 0 },
    ]
  }, [activePresetKey])

  return (
    <section className="py-24 sm:py-32 bg-[#07040d] text-white relative overflow-hidden border-t border-white/[0.06]" id="circuit-lab">
      {/* Background Circuit Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-start gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-gradient-to-r from-[#c084fc] to-[#38bdf8]" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#c084fc] uppercase">
              INTERACTIVE QUANTUM LABORATORY
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 w-full">
            <div>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold text-white tracking-tight leading-[1.1]">
                Real-Time Quantum Circuit &
                <br />
                <span className="bg-gradient-to-r from-[#c084fc] via-[#f472b6] to-[#38bdf8] bg-clip-text text-transparent">
                  State Vector Probability Simulator
                </span>
              </h2>
              <p className="font-body text-base sm:text-lg text-slate-300 mt-2 max-w-[60ch]">
                Select standard Qiskit algorithm circuits to see unitary transformations, Dirac notation state collapse, and live probability amplitude distributions.
              </p>
            </div>

            {/* Circuit Preset Buttons */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => setActivePresetKey(key)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activePresetKey === key
                      ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.4)] border border-fuchsia-400/40'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {preset.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Circuit Lab Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
          
          {/* Left Column: Interactive Quantum Circuit Wireboard */}
          <div className="rounded-3xl bg-[#0e0b17]/90 border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white m-0">
                    {currentPreset.name}
                  </h3>
                  <p className="font-body text-xs text-slate-400 mt-1 max-w-[45ch]">
                    {currentPreset.description}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#38bdf8] px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20">
                  Qiskit 1.0 Ready
                </span>
              </div>

              {/* Circuit Register Wireboard */}
              <div className="space-y-6 py-4">
                {['q₀', 'q₁', 'q₂'].map((qubit, qIndex) => {
                  const qKey = `q${qIndex}`
                  const gates = currentPreset.gates[qKey] || ['none', 'none', 'none']

                  return (
                    <div key={qubit} className="flex items-center gap-4 relative">
                      {/* Qubit Label */}
                      <div className="w-10 font-mono text-sm font-bold text-purple-300 flex items-center justify-center p-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
                        {qubit}
                      </div>

                      {/* Continuous Quantum Circuit Wire */}
                      <div className="flex-1 h-[2px] bg-purple-500/40 relative flex items-center justify-around px-6">
                        {gates.map((gate, stepIdx) => {
                          if (gate === 'H') {
                            return (
                              <div
                                key={`g-${stepIdx}`}
                                className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center font-mono text-sm font-bold text-white relative z-10 animate-scaleIn"
                              >
                                H
                              </div>
                            )
                          }
                          if (gate === 'X') {
                            return (
                              <div
                                key={`g-${stepIdx}`}
                                className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-600 to-pink-600 border border-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center justify-center font-mono text-sm font-bold text-white relative z-10 animate-scaleIn"
                              >
                                X
                              </div>
                            )
                          }
                          if (gate === 'CX_tgt' || gate === 'CX_tgt2') {
                            return (
                              <div
                                key={`g-${stepIdx}`}
                                className="w-10 h-10 rounded-full bg-cyan-600 border-2 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center justify-center font-mono text-lg font-bold text-white relative z-10"
                              >
                                ⊕
                              </div>
                            )
                          }
                          return (
                            <div
                              key={`g-${stepIdx}`}
                              className="w-10 h-10 rounded-lg border border-dashed border-white/10 flex items-center justify-center font-mono text-[10px] text-slate-600 z-10"
                            >
                              —
                            </div>
                          )
                        })}
                      </div>

                      {/* Measurement Gate at end */}
                      <div className="w-8 h-8 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 font-mono text-xs">
                        📊
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Circuit Dirac Formula Output */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-mono text-xs text-slate-400">Calculated State Vector:</span>
              <div className="font-mono text-xs sm:text-sm font-bold text-purple-300 px-3.5 py-1.5 rounded-lg bg-black/60 border border-purple-500/30">
                {currentPreset.formula}
              </div>
            </div>
          </div>

          {/* Right Column: Live State Vector Probability Bar Graph */}
          <div className="rounded-3xl bg-[#0e0b17]/90 border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="font-mono text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                  ✦ MEASUREMENT PROBABILITY HISTOGRAM
                </span>
                <span className="font-mono text-[11px] text-slate-400">10,000 Shots</span>
              </div>

              {/* Probability Bars for all 8 computational basis states */}
              <div className="space-y-3">
                {probabilities.map((item) => {
                  const isNonZero = item.prob > 0
                  return (
                    <div key={item.state} className="flex items-center gap-3 font-mono text-xs">
                      <span className={`w-12 text-left font-bold ${isNonZero ? 'text-white' : 'text-slate-500'}`}>
                        {item.state}
                      </span>
                      
                      {/* Bar Track */}
                      <div className="flex-1 h-5 bg-slate-900/90 rounded-md border border-white/[0.06] overflow-hidden relative">
                        <div
                          className={`h-full rounded-md transition-all duration-500 ${
                            isNonZero
                              ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                              : 'bg-transparent'
                          }`}
                          style={{ width: `${item.prob}%` }}
                        />
                      </div>

                      {/* Percentage readout */}
                      <span className={`w-14 text-right font-semibold ${isNonZero ? 'text-cyan-300' : 'text-slate-600'}`}>
                        {item.prob > 0 ? `${item.prob}%` : '0%'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Fidelity Annotation */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span>Entropy S = {activePresetKey === 'superposition' ? '3.00 bits' : activePresetKey === 'grover' ? '1.82 bits' : '1.00 bit'}</span>
              <span className="text-emerald-400 font-bold">Purity Tr(ρ²) = 1.0 (Pure State)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
