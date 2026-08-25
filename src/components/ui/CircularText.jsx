import './CircularText.css'

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
      className={`circular-text-container ${className}`}
      style={{
        width: `${containerDim}px`,
        height: `${containerDim}px`,
        '--spin-duration': `${spinDuration}s`
      }}
    >
      <div
        className="circular-text-ring"
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
              className="circular-text-char"
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

      {children && <div className="circular-text-center">{children}</div>}
    </div>
  )
}
