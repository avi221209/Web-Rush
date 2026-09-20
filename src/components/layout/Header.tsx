import React, { useState, useRef, useEffect } from 'react';
import { Search, Compass, Layers, BookMarked, ScrollText, ChevronDown, GitFork, Sparkles, GitCompare, Film, Settings, Info } from 'lucide-react';

export type ActiveTab = 'overview' | 'receipts' | 'connections' | 'patterns' | 'compare' | 'chapters' | 'story' | 'about';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onReopenIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenSettings,
  onReopenIntro
}) => {
  const [analyzeOpen, setAnalyzeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const primaryNavItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'receipts', label: 'Receipts', icon: Layers },
    { id: 'chapters', label: 'Chapters', icon: BookMarked },
    { id: 'story', label: 'Story', icon: ScrollText }
  ];

  const analyzeItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'connections', label: 'Connection Map', icon: GitFork },
    { id: 'patterns', label: 'Patterns & Rituals', icon: Sparkles },
    { id: 'compare', label: 'Compare Periods', icon: GitCompare }
  ];

  const isAnalyzeActive = ['connections', 'patterns', 'compare'].includes(activeTab);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAnalyzeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Fixed Desktop & Tablet Navigation */}
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
            </div>

            {/* Collapsed Primary Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {primaryNavItems.map(item => {
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

              {/* Single "Analyze" Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setAnalyzeOpen(!analyzeOpen)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isAnalyzeActive
                      ? 'bg-[#171717] text-[#F7F4EE] shadow-sm'
                      : 'text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${analyzeOpen ? 'rotate-180' : ''}`} />
                </button>

                {analyzeOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl shadow-xl p-1 z-50 animate-in fade-in duration-150">
                    {analyzeItems.map(subItem => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setActiveTab(subItem.id);
                            setAnalyzeOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                            isSubActive
                              ? 'bg-[#171717] text-[#F7F4EE]'
                              : 'text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]'
                          }`}
                        >
                          <SubIcon className="w-3.5 h-3.5" />
                          <span>{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Controls: De-emphasized Search + Icon Buttons */}
            <div className="flex items-center space-x-2">
              {/* De-emphasized Search Bar */}
              <button
                onClick={onOpenSearch}
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded-md border border-[#E2DDD3]/60 bg-[#EFEAE0]/30 hover:bg-[#EFEAE0] text-xs text-[#77736C] transition-all w-32 sm:w-44 justify-between"
                title="Search digital traces (Press /)"
              >
                <div className="flex items-center space-x-1.5 truncate">
                  <Search className="w-3.5 h-3.5 text-[#77736C]" />
                  <span className="hidden sm:inline font-sans truncate text-[11px]">Search...</span>
                </div>
                <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] font-mono bg-[#F7F4EE] text-[#77736C] rounded border border-[#E2DDD3]/80">
                  /
                </kbd>
              </button>

              {/* Informative "About" Page Button */}
              <button
                onClick={() => setActiveTab('about')}
                className={`p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] transition-colors ${
                  activeTab === 'about' ? 'bg-[#EFEAE0] text-[#171717]' : ''
                }`}
                title="About the Archive & Privacy"
              >
                <Info className="w-4 h-4" />
              </button>

              {/* Icon-Only "Intro film" Button */}
              {onReopenIntro && (
                <button
                  onClick={onReopenIntro}
                  className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] transition-colors"
                  title="Replay intro film"
                >
                  <Film className="w-4 h-4" />
                </button>
              )}

              {/* Settings Icon Button */}
              <button
                onClick={onOpenSettings}
                className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] transition-colors"
                title="Archive settings & data management"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F4EE]/95 backdrop-blur-md border-t border-[#E2DDD3] px-2 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: 'overview' as ActiveTab, label: 'Overview', icon: Compass },
          { id: 'receipts' as ActiveTab, label: 'Receipts', icon: Layers },
          { id: 'patterns' as ActiveTab, label: 'Analyze', icon: Sparkles },
          { id: 'chapters' as ActiveTab, label: 'Chapters', icon: BookMarked },
          { id: 'story' as ActiveTab, label: 'Story', icon: ScrollText }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'patterns' && isAnalyzeActive);
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
