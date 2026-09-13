// QuantumDepartureBackground — lightweight CSS-only replacement
// Replaced the 818-line canvas RAF loop (multiple diagram draws, ResizeObserver,
// layout cache, scroll listeners, mouse tracking) with a static CSS gradient.
// The visual feel is preserved: deep dark purple background with a subtle radial glow.

export default function QuantumDepartureBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(168,85,247,0.07) 0%, transparent 70%), #06040a',
      }}
    />
  )
}
