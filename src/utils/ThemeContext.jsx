import { createContext, useContext, useEffect, useState, useMemo } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    try {
      const saved = localStorage.getItem('sqc_theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch {}
    return 'dark'
  })

  const isDark = theme === 'dark'

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }

    try {
      localStorage.setItem('sqc_theme', theme)
    } catch {}

    // Update meta theme-color for iOS / mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#07040d' : '#fcfcfd')
    }

    // Dispatch global event for non-React canvas elements
    window.dispatchEvent(new CustomEvent('sqc-theme-change', { detail: { theme } }))
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const setTheme = (nextTheme) => {
    if (nextTheme === 'dark' || nextTheme === 'light') {
      setThemeState(nextTheme)
    }
  }

  const value = useMemo(() => ({
    theme,
    isDark,
    toggleTheme,
    setTheme,
  }), [theme, isDark])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
