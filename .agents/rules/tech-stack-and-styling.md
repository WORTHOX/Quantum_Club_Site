# Tech Stack & Styling Guidelines

## 1. Core Technology Stack
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS (Utility-First Classes ONLY)
- **Icons & Graphics**: SVG icons & React Lucide / Custom SVGs

---

## 2. STRICT RULE: Zero New CSS Files or Folders

> [!CAUTION]
> **DO NOT CREATE NEW `.CSS` FILES OR FOLDERS UNDER ANY CIRCUMSTANCES.**

- **No Component/Page CSS Files**: Never create `ComponentName.css`, `PageName.css`, or any CSS subdirectories.
- **Pure Tailwind Utility Classes**: All styling, layouts, animations, transitions, responsive breakpoints, gradients, and flex/grid positioning MUST be written directly in JSX using inline Tailwind CSS utility classes.
- **Legacy CSS Refactoring**: When editing existing components or pages, prefer refactoring custom CSS rules into Tailwind utility classes.

---

## 3. Quantum Club Theme & Design Tokens

### Color Palette
- **Primary Background**: `#070a08` (Quantum Obsidian)
- **Elevated Surfaces**: `#121513` / `#090d0a` with `backdrop-blur-xl`
- **Primary Emerald Accent**: `#34d399` (Cyan-Emerald), `#10b981` (Emerald), `#059669` (Deep Emerald)
- **Secondary Cyan Accent**: `#06b6d4` / `#38bdf8`
- **Event Category Purple**: `#a855f7` / `#d946ef`

### Typography & Fonts
- **Display**: `font-display` (Headlines, Titles)
- **Body**: `font-body` (Paragraphs, Descriptions)
- **Monospace**: `font-mono` (Eyebrows, Badges, Tech Specs, Timestamps)

### Glassmorphism & Borders
- **Glass Panel**: `bg-[#121513]/90 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/40`
- **Glow Effects**: `shadow-[0_0_20px_rgba(16,185,129,0.25)]`

---

## 4. Quality & Build Rules
- **No Unused Imports**: Keep imports clean and free of orphaned `.css` imports.
- **Build Verification**: Run `npm run build` after modifications to guarantee 0 build errors.
