import React, { useState, useMemo } from 'react';

import { useArchive } from '../../hooks/useArchive';
import { filterReceipts } from '../../engine/receiptEngine';
import { ExplorerFilters } from './explorer/ExplorerFilters';
import { ReceiptCard } from './explorer/ReceiptCard';
import { ReceiptListItem } from './explorer/ReceiptListItem';
import { EmptyArchiveState } from './explorer/EmptyArchiveState';

import type { LifeReceipt, ReceiptCategory } from '../../types/receipt';
import type { SortOrder, ViewMode } from '../../types/ui';

export interface ExplorerViewProps {
  onSelectReceipt?: (receipt: LifeReceipt) => void;
  onResetSampleData?: () => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  onSelectReceipt,
  onResetSampleData
}) => {
  const { receipts, restoreSampleArchive } = useArchive();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ReceiptCategory | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOrder>('date_asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Extract top unique tags
  const allTags = useMemo(() => {
    return Array.from(new Set(receipts.flatMap(r => r.tags || []))).slice(0, 15);
  }, [receipts]);

  // Memoize filtered receipts
  const filtered = useMemo(() => {
    return filterReceipts(receipts, query, selectedCategory, selectedTag, sortBy);
  }, [receipts, query, selectedCategory, selectedTag, sortBy]);

  const handleRestore = () => {
    restoreSampleArchive();
    onResetSampleData?.();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
        <h1 className="font-serif text-4xl font-bold text-[#171717]">Receipt Explorer</h1>
        <p className="text-sm text-[#77736C] font-sans">
          Browse, filter, and inspect all {receipts.length} individual digital traces in the dataset.
        </p>
      </div>

      {/* Control Bar */}
      <ExplorerFilters
        query={query}
        onQueryChange={setQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        receipts={receipts}
        allTags={allTags}
      />

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between text-xs font-mono text-[#77736C]">
        <span>Showing {filtered.length} matching receipts</span>
        {(query || selectedCategory !== 'all' || selectedTag !== 'all') && (
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
              setSelectedTag('all');
            }}
            className="text-[#2563EB] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid or List View or Empty State */}
      {receipts.length === 0 ? (
        <EmptyArchiveState onResetSampleData={handleRestore} />
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-[#EFEAE0]/40 rounded-2xl border border-[#E2DDD3] space-y-2">
          <p className="font-serif italic text-lg text-[#171717]">No digital traces found matching criteria.</p>
          <p className="text-xs text-[#77736C]">Try clearing search inputs or changing category filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(receipt => (
            <ReceiptCard
              key={receipt.id}
              receipt={receipt}
              onSelect={r => onSelectReceipt?.(r)}
            />
          ))}
        </div>
      ) : (
        <div className="divide-y divide-[#E2DDD3] border border-[#E2DDD3] rounded-2xl bg-[#F7F4EE] overflow-hidden">
          {filtered.map(receipt => (
            <ReceiptListItem
              key={receipt.id}
              receipt={receipt}
              onSelect={r => onSelectReceipt?.(r)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
