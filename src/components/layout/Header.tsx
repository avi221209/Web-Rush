import React from 'react';
import { Search, Compass, Layers, BookMarked, ScrollText, Film, Settings, Info } from 'lucide-react';

import { Logo } from '../brand/Logo';
import { AnalyzeDropdown } from './AnalyzeDropdown';
import { MobileNavBar } from './MobileNavBar';
import type { ActiveTab } from '../../types/ui';

export type { ActiveTab };

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
  const primaryNavItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'receipts', label: 'Receipts', icon: Layers },
    { id: 'chapters', label: 'Chapters', icon: BookMarked },
    { id: 'story', label: 'Story', icon: ScrollText }
  ];

  return (
    <>
      {/* Top Fixed Desktop & Tablet Navigation */}
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/90 backdrop-blur-md border-b border-[#E2DDD3] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Custom Logo */}
            <div className="flex items-center space-x-3">
              <Logo
                variant="full"
                size="md"
                onClick={() => setActiveTab('overview')}
              />
            </div>

            {/* Collapsed Primary Desktop Nav */}
            <nav
              className="hidden md:flex items-center space-x-1"
              aria-label="Primary navigation"
            >
              {primaryNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#171717] text-[#F7F4EE] shadow-sm'
                        : 'text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Single "Analyze" Dropdown Menu */}
              <AnalyzeDropdown activeTab={activeTab} onSelectTab={setActiveTab} />
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2">
              {/* De-emphasized Compact Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Open search and archive"
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-[#EFEAE0]/60 hover:bg-[#EFEAE0] text-[#77736C] hover:text-[#171717] border border-[#E2DDD3] text-xs font-mono transition-all"
              >
                <Search className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Quick Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-[#F7F4EE] rounded border border-[#E2DDD3] text-[#A39E93]">
                  ⌘K
                </kbd>
              </button>

              {/* About Button */}
              <button
                onClick={() => setActiveTab('about')}
                aria-label="About the project"
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === 'about'
                    ? 'bg-[#171717] text-[#F7F4EE]'
                    : 'text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]'
                }`}
                title="About LIFE//RECEIPTS"
              >
                <Info className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Intro Film Minimal Trigger */}
              {onReopenIntro && (
                <button
                  onClick={onReopenIntro}
                  aria-label="Replay intro film"
                  className="p-2 rounded-lg text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] transition-colors"
                  title="Replay Opening Film"
                >
                  <Film className="w-4 h-4" aria-hidden="true" />
                </button>
              )}

              {/* Settings / Archive Manager Trigger */}
              <button
                onClick={onOpenSettings}
                aria-label="Archive settings & data options"
                className="p-2 rounded-lg text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0] transition-colors"
                title="Archive Settings"
              >
                <Settings className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileNavBar activeTab={activeTab} onSelectTab={setActiveTab} />
    </>
  );
};
