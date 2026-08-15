import CircularText from '../ui/CircularText'
import './LogoWithCircularText.css'

export default function LogoWithCircularText({
  size = 'md', // 'sm' | 'md' | 'lg'
  spinDuration = 12,
  className = '',
  showTitleText = true,
  customLogoSize,
  customRadius,
  customFontSize
}) {
  // Dimension presets — Tighter circular text ring overlapping further inside the logo perimeter
  const sizeMap = {
    sm: { radius: 22, logoSize: 56, fontSize: '0.46rem', text: 'SYMBIOSIS QUANTUM CLUB • ' },
    md: { radius: 29, logoSize: 74, fontSize: '0.54rem', text: 'SYMBIOSIS QUANTUM CLUB • ' },
    lg: { radius: 43, logoSize: 108, fontSize: '0.72rem', text: 'SYMBIOSIS QUANTUM CLUB • ' }
  }

  const baseConfig = sizeMap[size] || sizeMap.md
  const config = {
    radius: customRadius || baseConfig.radius,
    logoSize: customLogoSize || baseConfig.logoSize,
    fontSize: customFontSize || baseConfig.fontSize,
    text: baseConfig.text
  }

  return (
    <div className={`logo-circular-wrapper logo-circular-wrapper--${size} ${className}`}>
      <CircularText
        text={config.text}
        spinDuration={spinDuration}
        radius={config.radius}
        fontSize={config.fontSize}
        letterSpacing="0.10em"
      >
        <div
          className="logo-circular-img-wrap"
          style={{
            width: `${config.logoSize}px`,
            height: `${config.logoSize}px`
          }}
        >
          <img
            src="/logo.png"
            alt="Symbiosis Quantum Club Emblem"
            className="logo-circular-img"
          />
        </div>
      </CircularText>

      {showTitleText && (
        <div className="logo-circular-text-side">
          <span className="logo-circular-title">SYMBIOSIS</span>
          <span className="logo-circular-sub">QUANTUM CLUB</span>
        </div>
      )}
    </div>
  )
}
