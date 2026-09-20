import { useState } from 'react';

import { Header } from './components/layout/Header';
import type { ActiveTab } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';

import { IntroView } from './components/views/IntroView';
import { OverviewView } from './components/views/OverviewView';
import { ExplorerView } from './components/views/ExplorerView';
import { ConnectionMapView } from './components/views/ConnectionMapView';
import { PatternsView } from './components/views/PatternsView';
import { ChaptersView } from './components/views/ChaptersView';
import { StoryView } from './components/views/StoryView';
import { ComparePeriodsView } from './components/views/ComparePeriodsView';
import { AboutView } from './components/views/AboutView';

import { ReceiptDetailDrawer } from './components/modals/ReceiptDetailDrawer';
import { ThreadJourneyModal } from './components/modals/ThreadJourneyModal';
import { DemoStoryModal } from './components/modals/DemoStoryModal';
import { DayReconstructionModal } from './components/modals/DayReconstructionModal';
import { SettingsModal } from './components/modals/SettingsModal';

import type { Chapter, LifeReceipt } from './types/receipt';

export function App() {
  const [hasEnteredIntro, setHasEnteredIntro] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const [selectedReceipt, setSelectedReceipt] = useState<LifeReceipt | null>(null);
  const [threadReceipt, setThreadReceipt] = useState<LifeReceipt | null>(null);
  const [reconstructDate, setReconstructDate] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [focusedChapterId, setFocusedChapterId] = useState<string | undefined>(undefined);

  const handleFocusChapterInStory = (chapter: Chapter) => {
    setFocusedChapterId(chapter.id);
    setActiveTab('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!hasEnteredIntro) {
    return <IntroView onEnterApp={() => setHasEnteredIntro(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#171717] flex flex-col justify-between selection:bg-[#171717] selection:text-[#F7F4EE]">
      {/* Top Fixed Header & Mobile Bottom Nav */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReopenIntro={() => setHasEnteredIntro(false)}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full">
        {activeTab === 'overview' && (
          <OverviewView
            onSelectReceipt={setSelectedReceipt}
            onFollowThread={setThreadReceipt}
            onReconstructDay={setReconstructDate}
            onOpenDemoTour={() => setIsDemoTourOpen(true)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'receipts' && (
          <ExplorerView
            onSelectReceipt={setSelectedReceipt}
            onResetSampleData={() => window.location.reload()}
          />
        )}

        {activeTab === 'connections' && (
          <ConnectionMapView
            onSelectReceipt={setSelectedReceipt}
            onFollowThread={setThreadReceipt}
          />
        )}

        {activeTab === 'patterns' && (
          <PatternsView
            onSelectReceipt={setSelectedReceipt}
            onReconstructDay={setReconstructDate}
          />
        )}

        {activeTab === 'compare' && (
          <ComparePeriodsView />
        )}

        {activeTab === 'chapters' && (
          <ChaptersView
            onSelectReceipt={setSelectedReceipt}
            onFocusChapterInStory={handleFocusChapterInStory}
          />
        )}

        {activeTab === 'story' && (
          <StoryView
            initialChapterId={focusedChapterId}
            onSelectReceipt={setSelectedReceipt}
            onFollowThread={setThreadReceipt}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onNavigateTab={setActiveTab}
            onExploreArchive={() => setActiveTab('receipts')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
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

export default App;
