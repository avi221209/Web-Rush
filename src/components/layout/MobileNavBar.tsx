import React from 'react';
import { Compass, Layers, GitFork, Sparkles, BookMarked, ScrollText } from 'lucide-react';

import type { ActiveTab } from '../../types/ui';

interface MobileNavBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
  activeTab,
  onSelectTab
}) => {
  const mobileNavItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'receipts', label: 'Receipts', icon: Layers },
    { id: 'connections', label: 'Map', icon: GitFork },
    { id: 'patterns', label: 'Patterns', icon: Sparkles },
    { id: 'chapters', label: 'Chapters', icon: BookMarked },
    { id: 'story', label: 'Story', icon: ScrollText }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F4EE]/95 backdrop-blur-md border-t border-[#E2DDD3] px-2 py-2 flex items-center justify-around shadow-lg"
      aria-label="Mobile navigation"
    >
      {mobileNavItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
              isActive ? 'text-[#171717] font-bold' : 'text-[#77736C]'
            }`}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span className="text-[10px] font-mono mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
