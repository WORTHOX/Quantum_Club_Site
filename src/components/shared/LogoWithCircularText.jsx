import CircularText from '../ui/CircularText'
import './LogoWithCircularText.css'

export default function LogoWithCircularText({
  size = 'md', // 'sm' | 'md' | 'lg'
  spinDuration = 10,
  className = '',
  showTitleText = true,
  customLogoSize,
  customRadius,
  customFontSize
}) {
  // Dimension presets — Clean separation so circular text orbits visibly outside the enlarged central emblem
  const sizeMap = {
    sm: { radius: 30, logoSize: 42, fontSize: '0.48rem', text: 'SYMBIOSIS QUANTUM CLUB • ' },
    md: { radius: 40, logoSize: 56, fontSize: '0.56rem', text: 'SYMBIOSIS QUANTUM CLUB • ' },
    lg: { radius: 54, logoSize: 76, fontSize: '0.74rem', text: 'SYMBIOSIS QUANTUM CLUB • ' }
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
        letterSpacing="0.12em"
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
