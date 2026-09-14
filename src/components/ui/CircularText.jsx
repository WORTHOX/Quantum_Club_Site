export default function CircularText({
  text = 'SYMBIOSIS QUANTUM CLUB • ',
  spinDuration = 12,
  radius = 45,
  fontSize = '0.62rem',
  letterSpacing = '0.12em',
  className = '',
  children
}) {
  const letters = Array.from(text)
  const deg = 360 / letters.length
  const containerDim = Math.max(radius * 2 + 16, 64)

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{
        width: `${containerDim}px`,
        height: `${containerDim}px`,
        '--spin-duration': `${spinDuration}s`
      }}
    >
      <div
        className="absolute inset-0 rounded-full origin-center pointer-events-none z-[2] will-change-transform animate-[spin_var(--spin-duration,12s)_linear_infinite]"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {letters.map((letter, i) => {
          const rotationAngle = i * deg
          return (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 origin-[0_0] font-display font-bold uppercase text-purple-700 dark:text-[#e0aaff] whitespace-pre pointer-events-none leading-none [text-shadow:none] dark:[text-shadow:0_0_8px_rgba(168,85,247,0.95),0_0_16px_rgba(236,72,153,0.7)]"
              style={{
                transform: `rotate(${rotationAngle}deg) translateY(-${radius}px) translate(-50%, -50%)`,
                fontSize: fontSize,
                letterSpacing: letterSpacing
              }}
            >
              {letter}
            </span>
          )
        })}
      </div>

      {children && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
