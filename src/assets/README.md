# SQC Visual Assets Directory (`src/assets`)

This directory houses all visual assets, logos, brand identities, event galleries, team headshots, and master photo archives used across the Symbiosis Quantum Club web platform.

## Directory Structure

```
src/assets/
├── logos/                         # Primary color emblems, mono marks, favicons, app icons
│   ├── logo.png
│   ├── logo.svg
│   ├── logo-mono.png
│   ├── logo-mono.svg
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-192x192.png
│   ├── favicon-512x512.png
│   ├── apple-touch-icon.png
│   └── icons.svg
│
├── images/                        # Dilution refrigerator & laboratory hardware
│   ├── about-large.jpg
│   └── about-small.jpg
│
├── team/                          # Complete executive team headshots (18 members)
│   ├── AKARSH SUNIL (VP).jpg
│   ├── ANSH SAINI (WEBSITE HEAD).jpg
│   ├── APURVA SATKAR (EVENTS HEAD).jpg
│   ├── Archana ma'am.png
│   ├── archana-maam.jpeg
│   ├── Ishan Malviya.jpeg
│   ├── JEET PAGHDAR (MND HEAD).jpg
│   ├── RIDDHIMA DESHMUKH (PRESIDENT).jpg
│   ├── SARVESH DUNGARWAL (MND HEAD).jpg
│   ├── SHANTANU SHAJI (EVENTS HEAD).jpg
│   ├── SHAYAN BHOWMIK (RNT HEAD).jpg
│   ├── anirudh.jpeg
│   ├── disha.png
│   ├── eric.png
│   └── samarth.jpeg
│
├── events/                        # Active web-optimized event photo galleries & badges
│   ├── agentic-ai-2025/           # Agentic AI x Quantum workshop (14 photos)
│   ├── decoding-quantum-2026/     # Decoding Quantum Projects (10 photos)
│   ├── fall-fest-2025/            # IBM Qiskit Fall Fest 2025 (10 photos)
│   ├── ice-breaker-2025/          # Quantum Ice Breaker 2025 (10 photos)
│   ├── ice-breaker-2026/          # Quantum Ice Breaker 2026 (10 photos)
│   ├── iiser-visit/               # IISER Pune Lab Visit (10 photos)
│   ├── iiser-visit-extra/         # IISER Additional captures (11 photos)
│   ├── qiscade-2025/              # Qiscade event archive (11 photos)
│   ├── treasure-hunt-2026/        # SQC Treasure Hunt (11 photos)
│   ├── badge-dark.png, badge.svg, entanglement.png, fall-fest-2026-cover.jpg...
│   └── EVENT_GALLERY_MAPPING.md   # Step-by-step guide for changing any photo
│
├── website-photos/                # Master raw event albums by academic term
│   ├── Agentic AI X Quantum Agents(AY 25-26 Odd Sem)/
│   ├── Decoding Quantum Projects(AY 25-26 Even Sem)/
│   ├── IISER Visit(AY 25-26 Even Sem)/
│   ├── PowerBI with SIS(AY 25-26 Even Sem)/
│   ├── Qiscade(AY 25-26 Odd Sem)/
│   ├── Qiskit Fall Fest(AY 25-26 Odd Sem)/
│   ├── Quantum Ice Breaker(AY 25-26 Odd Sem)/
│   ├── Quantum Ice Breaker(AY 26-27 Odd Sem)/
│   └── SQC Treasure Hunt(AY 26-27 Odd Sem)/
│
├── fallfest/                      # IBM Qiskit Fall Fest illustrations & collectibles
│   ├── 2026/
│   │   ├── illustrations/         # High-DPI hero graphics and banners (2560px)
│   │   ├── stickers/              # Collectible PNG stickers & labels
│   │   └── svg/                   # Vector digital collectibles (01-09) & seals
│   └── root graphics              # Atom, Cat, Circuit, Timeline graphics
│
└── Recruitments/                  # Interview question sheets & recruitment data
```

## How to Make Photo Changes on the Website

See [`src/assets/events/EVENT_GALLERY_MAPPING.md`](events/EVENT_GALLERY_MAPPING.md) for full instructions:
- **Replace an image**: In `src/assets/events/<active-folder>/`, overwrite `photo-X.jpg`.
- **Change event cover**: In `src/data/events.js`, update `coverImage`.
- **Master albums**: Full original high-res photos are kept in `src/assets/website-photos/`.
