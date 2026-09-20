import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Sparkles, GitFork, GitCompare } from 'lucide-react';

import type { ActiveTab } from '../../types/ui';

interface AnalyzeDropdownProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const AnalyzeDropdown: React.FC<AnalyzeDropdownProps> = ({
  activeTab,
  onSelectTab
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const analyzeItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'connections', label: 'Connection Map', icon: GitFork },
    { id: 'patterns', label: 'Patterns & Rituals', icon: Sparkles },
    { id: 'compare', label: 'Compare Periods', icon: GitCompare }
  ];

  const isAnalyzeActive = ['connections', 'patterns', 'compare'].includes(activeTab);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Analyze tools menu"
        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          isAnalyzeActive
            ? 'bg-[#171717] text-[#F7F4EE] shadow-sm'
            : 'text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Analyze</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Analysis tools"
          className="absolute left-0 mt-2 w-48 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {analyzeItems.map(item => {
            const Icon = item.icon;
            const isSubActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                role="menuitem"
                onClick={() => {
                  onSelectTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs font-medium transition-colors text-left ${
                  isSubActive
                    ? 'bg-[#EFEAE0] text-[#171717] font-bold'
                    : 'text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
