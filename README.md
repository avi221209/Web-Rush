# LIFE//RECEIPTS
> Your digital life, reconstructed.

**Raw Data &rarr; Insights &rarr; Connections &rarr; Story**

## What it does
LIFE//RECEIPTS is an interactive digital museum and personal archaeology web application that transforms fragments of digital receipts (songs, places, purchases, photos, searches, messages, events, notes) into a cohesive human story. Instead of presenting a generic admin dashboard, it calculates multi-factor relationships, detects recurring behavioral rituals, identifies unusual activity anomalies, and groups digital traces into meaningful life chapters. Users can explore isolated fragments, follow narrative threads, reconstruct entire days, and read their digital documentary.

## How the connection engine works
The client-side relationship engine (`src/engine/connectionEngine.ts`) evaluates candidate receipt pairs using a multi-factor proximity algorithm:
1. **Temporal Proximity** (Score bonus up to +0.45 for traces within 30 minutes to 2 hours).
2. **Spatial Similarity** (Score bonus +0.40 for identical locations or $+0.28$ for nearby coordinates).
3. **Shared Entities** (+0.35 for matching artists, contacts, or venues).
4. **Tag Synergies** (+0.12 per shared tag).
5. **Category Pairings** (+0.15 for high-synergy pairings like `music+place` or `event+photo`).

Scores are normalized between 0 and 1. Only connections meeting confidence thresholds are presented alongside human-readable reasoning cards explaining *why* the traces belong together.

## Dataset compatibility
The dataset is cleanly isolated in [`src/data/receipts.ts`](src/data/receipts.ts). To swap the mock dataset with the official organizer dataset:
1. Open `src/data/receipts.ts`.
2. Replace `MOCK_RECEIPTS` or update the exported `ALL_RECEIPTS` array matching the `LifeReceipt` interface schema (`id`, `category`, `title`, `description`, `timestamp`, `location`, `tags`, `metadata`).
3. The analytical engines (`connectionEngine`, `momentEngine`, `patternEngine`, `chapterEngine`, `storyEngine`, `anomalyEngine`, `ritualEngine`) will automatically re-index and synthesize the new dataset on load.

## Run locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

## Tech stack
- **Core**: React 18 &bull; TypeScript &bull; Vite
- **Styling**: Tailwind CSS v4 &bull; Custom Archival Paper Palette (`#F7F4EE`)
- **Icons & Animation**: Lucide React &bull; Framer Motion &bull; Canvas Confetti
- **Analytics & Graphs**: Pure Client-Side TypeScript Data Engines &bull; SVG Interactive Network Visualization

## Hackathon compliance
- [x] **Frontend-only** (No backend, no database, no server code)
- [x] **Zero Authentication** (Immediate access without login screens)
- [x] **No External Persistence Requirement** (Runs entirely in browser memory)
- [x] **Deployable to Netlify / Vercel / GitHub Pages** (Static Vite production build)
- [x] **Fully Responsive** (Optimized for desktop 1440px, tablet 768px, and mobile 390px with bottom navigation bar)
- [x] **Accessible & Performant** (Clean HTML5 semantics, memoized data engines, zero console errors)
