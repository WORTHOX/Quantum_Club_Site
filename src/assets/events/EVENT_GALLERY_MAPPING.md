# Event Photos Reference & Change Guide

This guide maps each event on the website to its active image folder in `src/assets/events/` and its original album in `src/assets/website-photos/`.

## Quick Reference Table

| Website Event Title | Active Site Folder (`src/assets/events/`) | Original Master Album (`src/assets/website-photos/`) | Cover Image | Total Photos |
| :--- | :--- | :--- | :--- | :--- |
| **Quantum Ice Breaker 2026** | `ice-breaker-2026/` | `Quantum Ice Breaker(AY 26-27 Odd Sem)/` | `photo-3.jpg` | 10 photos |
| **IISER Pune Lab Visit** | `iiser-visit/` | `IISER Visit(AY 25-26 Even Sem)/` | `photo-1.jpg` | 10 photos (+11 extra in `iiser-visit-extra`) |
| **Decoding Quantum Projects** | `decoding-quantum-2026/` | `Decoding Quantum Projects(AY 25-26 Even Sem)/` | `photo-1.jpg` | 10 photos |
| **Agentic AI × Quantum Agents** | `agentic-ai-2025/` | `Agentic AI X Quantum Agents(AY 25-26 Odd Sem)/` | `photo-1.jpg` | 14 photos |
| **Qiscade — Quantum Arcade** | `qiscade-2025/` | `Qiscade(AY 25-26 Odd Sem)/` | `photo-1.jpg` | 11 photos |
| **IBM Qiskit Fall Fest 2025** | `fall-fest-2025/` | `Qiskit Fall Fest(AY 25-26 Odd Sem)/` | `badge-dark.png` | 10 photos |
| **Quantum Ice Breaker 2025** | `ice-breaker-2025/` | `Quantum Ice Breaker(AY 25-26 Odd Sem)/` | `photo-1.jpg` | 10 photos |
| **SQC Treasure Hunt** | `treasure-hunt-2026/` | `SQC Treasure Hunt(AY 26-27 Odd Sem)/` | `photo-1.jpg` | 11 photos |
| **IBM Qiskit Fall Fest 2026** | `fallfest/2026/` | *Design Deliverables & SVGs* | `fall-fest-2026-cover.jpg` | Hero SVG, stickers 01-09 |

---

## How to Make Changes

### 1. Replacing an Existing Photo
1. Go to `src/assets/events/<active-folder>/`
2. Replace `photo-1.jpg` (or whichever number you want to change) with your new image.
3. Keep the same filename (e.g. `photo-1.jpg`) and aspect ratio.
4. The website updates automatically!

### 2. Changing the Cover Photo for an Event
1. Open `src/data/events.js`.
2. Find the event entry and update `coverImage`:
   ```javascript
   coverImage: '/assets/events/ice-breaker-2026/photo-5.jpg',
   ```

### 3. Adding New Photos to an Event Gallery
1. Save your new photo into `src/assets/events/<active-folder>/` as `photo-12.jpg` (next sequential number).
2. In `src/data/events.js`, adjust the gallery count for that event:
   ```javascript
   gallery: Array.from({ length: 12 }, (_, i) => ({
     url: `/assets/events/ice-breaker-2026/photo-${i + 1}.jpg`,
     caption: `...`,
   }))
   ```
