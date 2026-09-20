import React, { memo } from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';

import { CATEGORY_MAP } from '../../../utils/categoryUtils';
import type { LifeReceipt, ReceiptCategory } from '../../../types/receipt';
import type { SortOrder, ViewMode } from '../../../types/ui';

interface ExplorerFiltersProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCategory: ReceiptCategory | 'all';
  onCategoryChange: (cat: ReceiptCategory | 'all') => void;
  selectedTag: string | 'all';
  onTagChange: (tag: string | 'all') => void;
  sortBy: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  receipts: LifeReceipt[];
  allTags: string[];
}

export const ExplorerFilters: React.FC<ExplorerFiltersProps> = memo(({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  selectedTag,
  onTagChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  receipts,
  allTags
}) => {
  return (
    <div className="bg-[#EFEAE0]/50 border border-[#E2DDD3] rounded-2xl p-4 sm:p-6 space-y-4">
      {/* Search & Layout toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#77736C] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Search traces by keyword, title, place, artist..."
            aria-label="Search digital traces"
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl text-xs text-[#171717] placeholder-[#77736C] focus:outline-none focus:border-[#171717]"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center space-x-1 border border-[#E2DDD3] rounded-xl bg-[#F7F4EE] p-1">
            <button
              onClick={() => onSortChange('date_asc')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                sortBy === 'date_asc' ? 'bg-[#171717] text-[#F7F4EE]' : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              Oldest First
            </button>
            <button
              onClick={() => onSortChange('date_desc')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                sortBy === 'date_desc' ? 'bg-[#171717] text-[#F7F4EE]' : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              Newest First
            </button>
          </div>

          <div className="flex items-center space-x-1 border border-[#E2DDD3] rounded-xl bg-[#F7F4EE] p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#171717] text-[#F7F4EE]' : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              aria-label="List view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#171717] text-[#F7F4EE]' : 'text-[#77736C] hover:text-[#171717]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-[#77736C] uppercase tracking-wider block">
          FILTER BY CATEGORY
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#171717] text-[#F7F4EE]'
                : 'bg-[#F7F4EE] text-[#77736C] border border-[#E2DDD3] hover:text-[#171717]'
            }`}
          >
            All ({receipts.length})
          </button>
          {Object.entries(CATEGORY_MAP).map(([catKey, info]) => {
            const count = receipts.filter(r => r.category === catKey).length;
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => onCategoryChange(catKey as ReceiptCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#171717] text-[#F7F4EE]'
                    : 'bg-[#F7F4EE] text-[#77736C] border border-[#E2DDD3] hover:text-[#171717]'
                }`}
              >
                <span>{info.label}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tag Pills */}
      {allTags.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-[#E2DDD3]/60">
          <span className="text-[11px] font-mono text-[#77736C] uppercase tracking-wider block">
            POPULAR TAGS
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onTagChange('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                selectedTag === 'all' ? 'bg-[#171717] text-[#F7F4EE]' : 'bg-[#F7F4EE] text-[#77736C] border border-[#E2DDD3]'
              }`}
            >
              #all
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagChange(tag)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                  selectedTag === tag ? 'bg-[#171717] text-[#F7F4EE]' : 'bg-[#F7F4EE] text-[#77736C] border border-[#E2DDD3] hover:text-[#171717]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ExplorerFilters.displayName = 'ExplorerFilters';
