import React from 'react'

/**
 * QuantumErrorBoundary
 * Catches unhandled runtime exceptions (WebGL context drops, lazy chunk load failures, etc.)
 * and renders a high-aesthetic quantum recovery UI instead of a blank screen.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('QuantumErrorBoundary caught an anomaly:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070a08] text-slate-200 relative overflow-hidden flex items-center justify-center px-4 py-16 select-none">
          {/* Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[550px] h-[60vw] max-h-[550px] rounded-full pointer-events-none blur-[140px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(52, 211, 153, 0.35) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-lg w-full mx-auto text-center flex flex-col items-center p-8 rounded-3xl bg-[#121513]/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-pixel text-[11px] tracking-wider uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>TELEMETRY // SYSTEM_RECOVERY</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Quantum State Decoherence
            </h1>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-6">
              A temporary runtime fluctuation occurred during state simulation. You can safely recalibrate the system.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-[#070a08] font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.35)] transition-all duration-200 cursor-pointer active:scale-95"
              >
                ✦ Recalibrate System
              </button>

              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95"
              >
                Return to Home
              </button>
            </div>

            {/* Diagnostic trace in dev mode */}
            {this.state.error && (
              <div className="mt-6 pt-4 border-t border-white/[0.08] w-full text-left">
                <details className="text-[11px] font-mono text-slate-500">
                  <summary className="cursor-pointer hover:text-slate-400 mb-1 select-none">
                    Diagnostic Telemetry Trace
                  </summary>
                  <pre className="p-3 rounded-lg bg-black/40 border border-white/5 overflow-x-auto text-[10px] text-amber-400/90 whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
