import { Link } from 'react-router-dom'
import useSEO from '../utils/useSEO'

export default function NotFound() {
  useSEO({
    title: '404 — State Vector Decohered',
    description: 'The requested quantum state does not exist in this Hilbert space.',
    noindex: true,
  })

  return (
    <main className="min-h-screen bg-[#fcfcfd] dark:bg-[#070a08] text-slate-800 dark:text-slate-200 relative overflow-x-clip flex items-center justify-center px-4 py-24 selection:bg-[#34d399]/30 selection:text-white">
      {/* ── Soft Ambient Chromatic Glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[650px] h-[70vw] max-h-[650px] rounded-full pointer-events-none blur-[140px] opacity-10 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, rgba(6, 182, 212, 0.15) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Ultra-faint Swiss Grid Alignment ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.025] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl w-full mx-auto text-center flex flex-col items-center">
        {/* Telemetry pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-300/80 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-pixel text-[10px] sm:text-[11px] tracking-wider uppercase mb-6 shadow-sm dark:shadow-[0_0_15px_rgba(52,211,153,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
          <span>SQC_TELEMETRY // DECOHERENCE_DETECTED</span>
        </div>

        {/* Giant Monolithic 404 Display */}
        <div className="relative select-none my-2">
          <span
            className="font-display font-black text-8xl sm:text-9xl md:text-[11rem] tracking-tighter leading-none inline-block bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-emerald-700 to-cyan-700 dark:from-white dark:via-[#a7f3d0] dark:to-[#34d399]"
            style={{
              textShadow: '0 0 60px rgba(52, 211, 153, 0.2)',
            }}
          >
            404
          </span>
          <div className="font-pixel text-[11px] sm:text-xs text-cyan-700 dark:text-cyan-300 tracking-[0.2em] uppercase mt-1">
            |ψ⟩ = 0|FOUND⟩ + 1|DECOHERED⟩
          </div>
        </div>

        {/* Error headline & explanation */}
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-4 mb-3">
          State Vector Undefined
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
          The quantum coordinates you are targeting have undergone complete environmental decoherence.
          This page does not exist in our Hilbert space.
        </p>

        {/* Action button cluster */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-white dark:text-[#070a08] bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 dark:hover:from-emerald-300 dark:hover:to-cyan-300 shadow-md dark:shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:shadow-lg dark:hover:shadow-[0_0_35px_rgba(52,211,153,0.6)] transition-all duration-300 active:scale-[0.98]"
          >
            <span>✦ Return to Ground State</span>
          </Link>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/[0.03] backdrop-blur-md transition-all duration-300 active:scale-[0.98]"
          >
            <span>Explore Events</span>
          </Link>
        </div>

        {/* Bottom Technical Footnote */}
        <div className="mt-14 pt-6 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-center gap-3 text-slate-500 font-pixel text-[9px] uppercase tracking-widest">
          <span>SYMBIOSIS QUANTUM CLUB</span>
          <span>✦</span>
          <span>DIAGNOSTIC CODE: 0x404_NULL_BASIS</span>
        </div>
      </div>
    </main>
  )
}
