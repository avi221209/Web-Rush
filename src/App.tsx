import { Suspense, lazy } from 'react';

import { ArchiveProvider, useArchiveContext } from './context/ArchiveContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';

import { IntroView } from './components/views/IntroView';
import { OverviewView } from './components/views/OverviewView';
import { RouteErrorBoundary } from './components/common/RouteErrorBoundary';
import { ViewSkeleton } from './components/common/ViewSkeleton';

import { ReceiptDetailDrawer } from './components/modals/ReceiptDetailDrawer';
import { ThreadJourneyModal } from './components/modals/ThreadJourneyModal';
import { DemoStoryModal } from './components/modals/DemoStoryModal';
import { DayReconstructionModal } from './components/modals/DayReconstructionModal';
import { SettingsModal } from './components/modals/SettingsModal';

// Performance Engine: Lazy-load all non-Overview routes via React.lazy
const ExplorerView = lazy(() =>
  import('./components/views/ExplorerView').then(m => ({ default: m.ExplorerView }))
);
const ConnectionMapView = lazy(() =>
  import('./components/views/ConnectionMapView').then(m => ({ default: m.ConnectionMapView }))
);
const PatternsView = lazy(() =>
  import('./components/views/PatternsView').then(m => ({ default: m.PatternsView }))
);
const ChaptersView = lazy(() =>
  import('./components/views/ChaptersView').then(m => ({ default: m.ChaptersView }))
);
const StoryView = lazy(() =>
  import('./components/views/StoryView').then(m => ({ default: m.StoryView }))
);
const ComparePeriodsView = lazy(() =>
  import('./components/views/ComparePeriodsView').then(m => ({ default: m.ComparePeriodsView }))
);
const AboutView = lazy(() =>
  import('./components/views/AboutView').then(m => ({ default: m.AboutView }))
);

function AppContent() {
  const {
    activeTab,
    setActiveTab,
    hasEnteredIntro,
    setHasEnteredIntro,
    selectedReceipt,
    setSelectedReceipt,
    threadReceipt,
    setThreadReceipt,
    reconstructDate,
    setReconstructDate,
    isSearchOpen,
    setIsSearchOpen,
    isDemoTourOpen,
    setIsDemoTourOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    focusedChapterId,
    focusChapterInStory
  } = useArchiveContext();

  if (!hasEnteredIntro) {
    return <IntroView onEnterApp={() => setHasEnteredIntro(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#171717] flex flex-col justify-between selection:bg-[#171717] selection:text-[#F7F4EE]">
      {/* Skip Navigation for keyboard accessibility */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      {/* Top Fixed Header & Mobile Bottom Nav */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReopenIntro={() => setHasEnteredIntro(false)}
      />

      {/* Main Route Container with Error Boundary & Suspense */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full">
        {activeTab === 'overview' && (
          <RouteErrorBoundary fallbackTitle="Overview System Encountered an Issue">
            <OverviewView
              onSelectReceipt={setSelectedReceipt}
              onFollowThread={setThreadReceipt}
              onReconstructDay={setReconstructDate}
              onOpenDemoTour={() => setIsDemoTourOpen(true)}
              onNavigateTab={setActiveTab}
            />
          </RouteErrorBoundary>
        )}

        {activeTab === 'receipts' && (
          <RouteErrorBoundary fallbackTitle="Explorer Encountered an Issue">
            <Suspense fallback={<ViewSkeleton />}>
              <ExplorerView onSelectReceipt={setSelectedReceipt} />
            </Suspense>
          </RouteErrorBoundary>
        )}

        {activeTab === 'connections' && (
          <RouteErrorBoundary fallbackTitle="Connection Map Encountered an Issue">
            <Suspense fallback={<ViewSkeleton />}>
              <ConnectionMapView
                onSelectReceipt={setSelectedReceipt}
                onFollowThread={setThreadReceipt}
              />
            </Suspense>
          </RouteErrorBoundary>
        )}

        {activeTab === 'patterns' && (
          <RouteErrorBoundary fallbackTitle="Pattern Discovery Encountered an Issue">
            <Suspense fallback={<ViewSkeleton />}>
              <PatternsView
                onSelectReceipt={setSelectedReceipt}
                onReconstructDay={setReconstructDate}
              />
            </Suspense>
          </RouteErrorBoundary>
        )}

        {activeTab === 'compare' && (
          <RouteErrorBoundary fallbackTitle="Compare Periods Encountered an Issue">
            <Suspense fallback={<ViewSkeleton />}>
              <ComparePeriodsView />
            </Suspense>
          </RouteErrorBoundary>
        )}

        {activeTab === 'chapters' && (
          <RouteErrorBoundary fallbackTitle="Chapters Timeline Encountered an Issue">
            <Suspense fallback={<ViewSkeleton />}>
              <ChaptersView
                onSelectReceipt={setSelectedReceipt}
                onFocusChapterInStory={focusChapterInStory}
              />
            </Suspense>
          </RouteErrorBoundary>
        )}

        {activeTab === 'story' && (
          <RouteErrorBoundary fallbackTitle="Story Documentary Encountered an Issue">
            <Suspense fallback={<ViewSkeleton />}>
              <StoryView
                initialChapterId={focusedChapterId}
                onSelectReceipt={setSelectedReceipt}
                onFollowThread={setThreadReceipt}
              />
            </Suspense>
          </RouteErrorBoundary>
        )}

        {activeTab === 'about' && (
          <RouteErrorBoundary fallbackTitle="About View Encountered an Issue">
            <Suspense fallback={<ViewSkeleton />}>
              <AboutView
                onNavigateTab={setActiveTab}
                onExploreArchive={() => setActiveTab('receipts')}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            </Suspense>
          </RouteErrorBoundary>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <ReceiptDetailDrawer
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        onSelectReceipt={setSelectedReceipt}
        onFollowThread={setThreadReceipt}
        onReconstructDay={setReconstructDate}
      />

      <ThreadJourneyModal
        initialReceipt={threadReceipt}
        onClose={() => setThreadReceipt(null)}
        onSelectReceipt={setSelectedReceipt}
      />

      <DayReconstructionModal
        dateStr={reconstructDate}
        onClose={() => setReconstructDate(null)}
        onSelectReceipt={setSelectedReceipt}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectReceipt={setSelectedReceipt}
      />

      <DemoStoryModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onNavigateToTab={setActiveTab}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ArchiveProvider>
      <AppContent />
    </ArchiveProvider>
  );
}

export default App;
