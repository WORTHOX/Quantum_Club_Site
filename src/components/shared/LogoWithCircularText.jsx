import CircularText from '../ui/CircularText'

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
    sm: { radius: 22, logoSize: 56, fontSize: '0.46rem', titleSize: 'text-[0.9rem]', subSize: 'text-[0.62rem]', text: 'SYMBIOSIS QUANTUM CLUB • ' },
    md: { radius: 29, logoSize: 74, fontSize: '0.54rem', titleSize: 'text-[1.05rem]', subSize: 'text-[0.7rem]', text: 'SYMBIOSIS QUANTUM CLUB • ' },
    lg: { radius: 43, logoSize: 108, fontSize: '0.72rem', titleSize: 'text-[1.35rem]', subSize: 'text-[0.85rem]', text: 'SYMBIOSIS QUANTUM CLUB • ' }
  }

  const baseConfig = sizeMap[size] || sizeMap.md
  const config = {
    radius: customRadius || baseConfig.radius,
    logoSize: customLogoSize || baseConfig.logoSize,
    fontSize: customFontSize || baseConfig.fontSize,
    titleSize: baseConfig.titleSize,
    subSize: baseConfig.subSize,
    text: baseConfig.text
  }

  return (
    <div className={`group inline-flex items-center gap-4 no-underline transition-transform duration-200 ease-out hover:-translate-y-[1px] ${className}`}>
      <CircularText
        text={config.text}
        spinDuration={spinDuration}
        radius={config.radius}
        fontSize={config.fontSize}
        letterSpacing="0.10em"
      >
        <div
          className="flex items-center justify-center rounded-full relative"
          style={{
            width: `${config.logoSize}px`,
            height: `${config.logoSize}px`
          }}
        >
          <img
            src="/logo.png"
            alt="Symbiosis Quantum Club Emblem"
            className="w-full h-full object-contain [filter:drop-shadow(0_0_5px_rgba(168,85,247,0.35))_drop-shadow(0_0_2px_rgba(192,132,252,0.25))] transition-all duration-300 group-hover:scale-[1.03] group-hover:[filter:drop-shadow(0_0_8px_rgba(168,85,247,0.5))_drop-shadow(0_0_3px_rgba(192,132,252,0.35))]"
          />
        </div>
      </CircularText>

      {showTitleText && (
        <div className="flex flex-col leading-[1.1]">
          <span className={`font-display font-bold tracking-[0.08em] text-slate-900 dark:text-white ${config.titleSize}`}>
            SYMBIOSIS
          </span>
          <span className={`font-mono font-semibold tracking-[0.14em] text-purple-700 dark:text-[#c084fc] ${config.subSize}`}>
            QUANTUM CLUB
          </span>
        </div>
      )}
    </div>
  )
}
