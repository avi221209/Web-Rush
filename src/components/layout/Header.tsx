import React from 'react';
import { Search, Compass, Layers, GitFork, Sparkles, BookMarked, ScrollText, GitCompare } from 'lucide-react';

export type ActiveTab = 'overview' | 'receipts' | 'connections' | 'patterns' | 'compare' | 'chapters' | 'story';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onReopenIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onReopenIntro
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'receipts', label: 'Receipts', icon: Layers },
    { id: 'connections', label: 'Connections', icon: GitFork },
    { id: 'patterns', label: 'Patterns', icon: Sparkles },
    { id: 'compare', label: 'Compare', icon: GitCompare },
    { id: 'chapters', label: 'Chapters', icon: BookMarked },
    { id: 'story', label: 'Story', icon: ScrollText }
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/90 backdrop-blur-md border-b border-[#E2DDD3] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('overview')}
                className="flex items-center space-x-2 text-left group focus:outline-none"
              >
                <div className="w-8 h-8 rounded bg-[#171717] text-[#F7F4EE] flex items-center justify-center font-mono font-bold text-xs tracking-tighter shadow-sm group-hover:bg-[#333] transition-colors">
                  L//R
                </div>
                <span className="font-mono text-sm tracking-wider font-extrabold text-[#171717]">
                  LIFE//RECEIPTS
                </span>
              </button>
              <span className="hidden md:inline-block text-xs font-mono px-2 py-0.5 rounded-full bg-[#EFEAE0] text-[#77736C] border border-[#E2DDD3]">
                Archival v1.1
              </span>
            </div>

            {/* Desktop Nav Tabs */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#171717] text-[#F7F4EE] shadow-sm'
                        : 'text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Search Action */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenSearch}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-md border border-[#E2DDD3] bg-[#EFEAE0]/50 hover:bg-[#EFEAE0] text-xs text-[#77736C] hover:text-[#171717] transition-all"
                title="Search digital traces (Press /)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-sans">Search traces...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#F7F4EE] text-[#77736C] rounded border border-[#E2DDD3]">
                  /
                </kbd>
              </button>

              {onReopenIntro && (
                <button
                  onClick={onReopenIntro}
                  className="hidden xl:inline-flex items-center px-2.5 py-1.5 text-[11px] font-mono text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] rounded transition-colors"
                  title="Replay intro film"
                >
                  Intro film
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* PRIORITY 8 — MOBILE BOTTOM NAVIGATION BAR (< 768px Viewports) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F4EE]/95 backdrop-blur-md border-t border-[#E2DDD3] px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-mono transition-colors ${
                isActive
                  ? 'text-[#171717] font-bold'
                  : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              <div className={`p-1 rounded-md ${isActive ? 'bg-[#171717] text-[#F7F4EE]' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
