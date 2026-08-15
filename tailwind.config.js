/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          deep: "#05070c",
          base: "#080c14",
          raised: "#0e1320",
          hover: "#151b2c",
          glass: "rgba(8, 12, 20, 0.82)",
        },
        accent: {
          DEFAULT: "#00f0ff",
          hover: "#38bdf8",
          subtle: "rgba(0, 240, 255, 0.12)",
          glow: "rgba(0, 240, 255, 0.25)",
        },
        text: {
          primary: "#ffffff",
          body: "#e2e8f0",
          muted: "#94a3b8",
          faint: "#64748b",
        },
        border: {
          DEFAULT: "#1e293b",
          hover: "#334155",
        },
        rule: "rgba(255, 255, 255, 0.08)",
        ibm: {
          blue: "#38bdf8",
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        xs: "clamp(0.694rem, 0.65rem + 0.22vw, 0.8rem)",
        sm: "clamp(0.833rem, 0.77rem + 0.32vw, 1rem)",
        base: "clamp(1rem, 0.92rem + 0.42vw, 1.25rem)",
        md: "clamp(1.2rem, 1.08rem + 0.6vw, 1.563rem)",
        lg: "clamp(1.44rem, 1.26rem + 0.9vw, 1.953rem)",
        xl: "clamp(1.728rem, 1.46rem + 1.34vw, 2.441rem)",
        "2xl": "clamp(2.074rem, 1.68rem + 1.97vw, 3.052rem)",
        "3xl": "clamp(2.488rem, 1.92rem + 2.84vw, 3.815rem)",
        hero: "clamp(2.5rem, 1rem + 5vw, 5.5rem)",
      },
      spacing: {
        xs: "clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)",
        sm: "clamp(0.5rem, 0.4rem + 0.5vw, 1rem)",
        md: "clamp(1rem, 0.75rem + 1.25vw, 2rem)",
        lg: "clamp(1.5rem, 1rem + 2.5vw, 3.5rem)",
        xl: "clamp(2rem, 1.25rem + 3.75vw, 5rem)",
        "2xl": "clamp(3rem, 1.5rem + 7.5vw, 8rem)",
        "3xl": "clamp(4rem, 2rem + 10vw, 10rem)",
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'base': '400ms',
        'slow': '600ms',
      },
      zIndex: {
        'base': '1',
        'sticky': '100',
        'overlay': '200',
        'modal': '300',
        'toast': '400',
        'cursor': '500',
      }
    },
  },
  plugins: [],
}
