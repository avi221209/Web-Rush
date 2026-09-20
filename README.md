# LIFE//RECEIPTS
> **Your Life, In Receipts &bull; Personal Archaeology &amp; Digital Life Reconstruction**

**Moments &rarr; Connections &rarr; Patterns &rarr; Chapters &rarr; Meaning**

---

## 1. Project Summary
**LIFE//RECEIPTS** is an interactive digital museum and personal archaeology web application built for the WebRush hackathon challenge: *"Your Life, In Receipts"*. Rather than presenting a static timeline or sterile administrative dashboard, LIFE//RECEIPTS transforms an extensive dataset of 200+ fragmented digital traces (songs, GPS places, transactions, camera timestamps, messages, search queries, and notes) into an intelligent, connected life documentary. Through pure client-side analytical engines, the system calculates multi-factor relationships, detects recurring behavioral rituals, isolates statistical anomaly spikes, reconstructs entire days from scattered fragments, and segments 6 months of digital footprints into meaningful narrative chapters.

---

## 2. Problem Statement Alignment & Feature Traceability Matrix

| Challenge Brief Requirement | Implementation Location | Interactive Experience / Capability |
| :--- | :--- | :--- |
| **Moments &rarr; Connections &rarr; Patterns &rarr; Chapters &rarr; Meaning** | [`src/context/ArchiveContext.tsx`](src/context/ArchiveContext.tsx) | Complete 5-tier analytical hierarchy synthesized dynamically on the client |
| **Personal Archaeology (Not a Dashboard)** | [`src/components/views/OverviewView.tsx`](src/components/views/OverviewView.tsx) &bull; [`AboutView.tsx`](src/components/views/AboutView.tsx) | Curated archival paper aesthetic (`#F7F4EE`), editorial typography, museum artifact cards |
| **Evidence-Backed Insights** | [`src/components/views/patterns/PatternCard.tsx`](src/components/views/patterns/PatternCard.tsx) | Every pattern and ritual features an interactive "Show evidence" drawer with underlying traces |
| **"Follow the Thread" Traversal** | [`src/components/modals/ThreadJourneyModal.tsx`](src/components/modals/ThreadJourneyModal.tsx) &bull; [`src/utils/threadChain.ts`](src/utils/threadChain.ts) | Multi-hop narrative trace journey linking disparate traces across time and space |
| **Multi-Factor Connection Graph** | [`src/components/views/ConnectionMapView.tsx`](src/components/views/ConnectionMapView.tsx) &bull; [`src/engine/connectionEngine.ts`](src/engine/connectionEngine.ts) | Interactive SVG network graph with radial/force coordinates, strength filtering, and reasoning cards |
| **Day Reconstruction Tool** | [`src/components/modals/DayReconstructionModal.tsx`](src/components/modals/DayReconstructionModal.tsx) | Gap-by-gap timeline analysis revealing that isolated receipts formed a single continuous day |
| **Documentary Story Mode** | [`src/components/views/StoryView.tsx`](src/components/views/StoryView.tsx) &bull; [`src/engine/storyEngine.ts`](src/engine/storyEngine.ts) | Six-chapter narrative reader with "What Changed" comparative delta analysis and evidence cards |
| **Anomaly & Spike Detection** | [`src/components/views/patterns/AnomalySection.tsx`](src/components/views/patterns/AnomalySection.tsx) &bull; [`src/engine/anomalyEngine.ts`](src/engine/anomalyEngine.ts) | Statistical outlier engine flagging days exceeding $>1.2\sigma$ above historical baseline |
| **Recurring Ritual Detection** | [`src/components/views/patterns/RitualSection.tsx`](src/components/views/patterns/RitualSection.tsx) &bull; [`src/engine/ritualEngine.ts`](src/engine/ritualEngine.ts) | Behavioral routine detector grouping 3+ categories appearing consistently across calendar weeks |
| **Side-by-Side Era Comparison** | [`src/components/views/ComparePeriodsView.tsx`](src/components/views/ComparePeriodsView.tsx) &bull; [`src/engine/comparisonEngine.ts`](src/engine/comparisonEngine.ts) | Period-over-period category density shifts with percentage delta indicators |
| **Empty State & Data Restoration** | [`src/components/views/explorer/EmptyArchiveState.tsx`](src/components/views/explorer/EmptyArchiveState.tsx) &bull; [`SettingsModal.tsx`](src/components/modals/SettingsModal.tsx) | Dynamic empty state handling with instant "Load Sample Archive" restoration |
| **Offline / Frontend-Only / Zero Auth** | Whole Codebase (`src/`) | 100% in-browser memory execution; zero backend; zero database; zero credentials required |

---

## 3. Architecture Overview & Directory Structure

The codebase is organized into strict separation of concerns, ensuring single-responsibility modules, zero business logic inside UI views, and no component exceeding 150-200 lines:

```
src/
├── types/                     # Centralized TypeScript domain & UI interfaces
│   ├── receipt.ts             # LifeReceipt, Moment, Pattern, Chapter, StoryNode
│   ├── ui.ts                  # ActiveTab, ViewMode, SortOrder, OverviewMetrics
│   └── index.ts               # Barrel exports for centralized typing
├── utils/                     # Pure, testable deterministic helper functions
│   ├── categoryUtils.ts       # Category taxonomy, colors, icons, badge styles
│   ├── dateUtils.ts           # Timestamp formatting, short dates, time gap calculation
│   ├── threadChain.ts         # Multi-hop trace chain generator (used by Follow the Thread)
│   ├── graphLayout.ts         # Pure trigonometric radial coordinates for SVG network canvas
│   └── exportUtils.ts         # Safe JSON archive file generator and browser download trigger
├── engine/                    # Client-side analytical engines (data mining & synthesis)
│   ├── receiptEngine.ts       # Aggregated metrics calculation & global grouped search
│   ├── connectionEngine.ts    # Pairwise multi-factor proximity scoring
│   ├── momentEngine.ts        # Temporal-spatial clustering into coherent moments
│   ├── patternEngine.ts       # Behavioral habit & category correlation detection
│   ├── chapterEngine.ts       # Chronological life chapter detection & storytelling
│   ├── storyEngine.ts         # Documentary reader text generation & shift analytics
│   ├── anomalyEngine.ts       # Statistical outlier engine (Gaussian >1.2σ day spike detection)
│   ├── ritualEngine.ts        # Recurring multi-category weekly routine detector
│   └── comparisonEngine.ts    # Period-over-period category delta analyzer
├── context/                   # Centralized in-memory application state
│   └── ArchiveContext.tsx     # Eliminates prop-drilling (>2 levels) for receipts, selections, & actions
├── hooks/                     # Custom React hooks
│   ├── useArchive.ts          # Access & mutate archive data, metrics, and restore triggers
│   ├── useNavigation.ts       # Active tab navigation and chapter focus routing
│   ├── useModalState.ts       # Centralized drawer & modal state management
│   └── useKeyDown.ts          # Reusable keyboard shortcut listener (Escape modal closure)
├── components/                # Pure presentation components (<150 lines per file)
│   ├── common/
│   │   ├── RouteErrorBoundary.tsx # Catches route-level rendering errors gracefully
│   │   └── ViewSkeleton.tsx       # Suspense loading skeleton for lazy-loaded views
│   ├── brand/
│   │   └── Logo.tsx               # Custom LIFE//RECEIPTS SVG vector branding & mark
│   ├── layout/
│   │   ├── Header.tsx             # Primary navigation bar (<130 lines)
│   │   ├── AnalyzeDropdown.tsx    # Keyboard-accessible Analyze menu
│   │   ├── MobileNavBar.tsx       # Bottom navigation bar for mobile devices
│   │   ├── Footer.tsx             # Editorial archive footer
│   │   └── SearchModal.tsx        # Instant global search dialog
│   ├── views/
│   │   ├── OverviewView.tsx       # Main archival dashboard (<100 lines)
│   │   ├── overview/              # Decomposed Overview subcomponents
│   │   │   ├── OverviewMetricsGrid.tsx  # 6 stat counter cards (React.memo)
│   │   │   ├── HeroMomentCard.tsx       # Discovered hero moment & distinct CTAs
│   │   │   ├── AnomalyBanner.tsx        # Highlight card for unusual day
│   │   │   ├── LifePulseSection.tsx     # 6-month density grid
│   │   │   └── WhatWeFoundSection.tsx   # Top pattern highlights
│   │   ├── ExplorerView.tsx       # Receipt explorer (<110 lines)
│   │   ├── explorer/              # Decomposed Explorer subcomponents
│   │   │   ├── ExplorerFilters.tsx      # Search, sort, category pills, tags
│   │   │   ├── ReceiptCard.tsx          # Memoized grid card
│   │   │   ├── ReceiptListItem.tsx      # Memoized list row
│   │   │   └── EmptyArchiveState.tsx    # Empty archive notice + sample reload CTA
│   │   ├── ConnectionMapView.tsx  # Network graph view (<115 lines)
│   │   ├── connections/           # Decomposed Graph subcomponents
│   │   │   ├── ConnectionGraphCanvas.tsx # Pure SVG network rendering
│   │   │   └── ConnectionEdgeDetail.tsx  # Selected edge algorithmic reasoning card
│   │   ├── PatternsView.tsx       # Behavioral patterns view (<80 lines)
│   │   ├── patterns/              # Decomposed Pattern subcomponents
│   │   │   ├── AnomalySection.tsx       # Spikes grid (>1.2σ days)
│   │   │   ├── RitualSection.tsx        # Multi-category routines accordion
│   │   │   └── PatternCard.tsx          # Behavioral pattern card with evidence
│   │   ├── ChaptersView.tsx       # Chronological life eras timeline (<135 lines)
│   │   ├── StoryView.tsx          # Documentary reader (<140 lines)
│   │   ├── story/                 # Decomposed Story subcomponents
│   │   │   ├── StoryChapterNav.tsx      # Chapter stepper buttons
│   │   │   └── StoryEvidenceGrid.tsx    # Underlying evidence traces
│   │   ├── ComparePeriodsView.tsx # Side-by-side era comparison (<145 lines)
│   │   ├── AboutView.tsx          # Educational methodology & explanation
│   │   └── IntroView.tsx          # Immersive opening animation
│   └── modals/                    # Contextual modal dialogs & slide-over drawers
│       ├── ReceiptDetailDrawer.tsx # Slide-out drawer for individual trace (<145 lines)
│       ├── receipt-drawer/
│       │   ├── DrawerMetadataGrid.tsx   # Detailed trace attributes & tags
│       │   └── DrawerConnectedTraces.tsx # Associated traces & reasoning cards
│       ├── ThreadJourneyModal.tsx  # Multi-step narrative journey (<140 lines)
│       ├── thread/
│       │   └── ThreadStepCard.tsx       # Individual step in narrative thread
│       ├── DayReconstructionModal.tsx # Full day continuous timeline
│       ├── DemoStoryModal.tsx      # Interactive guided walkthrough tour
│       └── SettingsModal.tsx       # Archive management & JSON export dialog
└── __tests__/                     # Vitest + React Testing Library suite (52 tests)
    ├── receiptEngine.test.ts      # Analytical engines math & scoring verification
    ├── Logo.test.tsx              # Brand identity & SVG mark rendering
    ├── Header.test.tsx            # Navigation bar & ARIA accessibility
    ├── Overview.test.tsx          # Stat counters & distinct hero CTAs
    ├── AnalyzeDropdown.test.tsx   # Mouse & keyboard navigation (Enter, Escape)
    ├── EmptyState.test.tsx        # Empty state rendering & sample archive restore
    └── SettingsModal.test.tsx     # JSON export validity & download trigger
```

---

## 4. Analytical Engine Algorithms

### A. Multi-Factor Connection Matching (`connectionEngine.ts`)
Evaluates candidate pairs of traces across 5 dimensions:
1. **Temporal Proximity**: Up to $+0.45$ for traces within 30 minutes; $+0.32$ within 2 hours; $+0.18$ same morning/evening.
2. **Spatial Proximity**: $+0.40$ for identical venue names; $+0.28$ for GPS coordinates within $\approx 1.5\text{ km}$.
3. **Entity Match**: $+0.35$ for matching artists, contacts, or venues.
4. **Shared Tags**: $+0.12$ per matching hashtag (capped at $+0.30$).
5. **Category Synergy**: $+0.15$ for high-affinity pairings (e.g. `music + place` or `event + photo`).

Pairs scoring above threshold ($\ge 0.32$) form edges in the relationship network, accompanied by human-readable explanations.

### B. Statistical Anomaly Spikes (`anomalyEngine.ts`)
Calculates mean daily activity $\mu$ and standard deviation $\sigma$:
$$\text{Threshold} = \mu + 1.2\sigma$$
Days exceeding this threshold are flagged as unusual behavioral surges (e.g. June 14 recording $5\times$ normal baseline), automatically prompting day reconstruction.

### C. Recurring Ritual Clustering (`ritualEngine.ts`)
Identifies structured sequences of 3 or more distinct categories occurring across 3 or more separate calendar weeks (e.g., Friday night routine: `music` $\to$ `place` $\to$ `purchase` $\to$ `photo`).

---

## 5. Local Setup & Execution

### Prerequisites
- Node.js 18+
- npm 9+

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Run automated test suite (52 tests across 7 test files)
npm run test

# 4. Run test coverage
npm run test:coverage

# 5. Type-check & build production bundle
npm run build
```

---

## 6. Performance & Quality Guarantees
- **Code-Splitting**: All non-overview routes (`ExplorerView`, `ConnectionMapView`, `PatternsView`, `ChaptersView`, `StoryView`, `ComparePeriodsView`, `AboutView`) are lazy-loaded via `React.lazy` + `<Suspense>`, keeping the initial bundle lean.
- **Error Boundaries**: Every view is wrapped in `<RouteErrorBoundary>` to ensure component-level errors do not crash the application.
- **Zero CLS**: All vector marks and SVG icons include explicit width/height dimensions.
- **Keyboard Navigation**: Full keyboard navigation across all interactive elements, modal escape handlers, and skip-to-content links (`#main-content`).
