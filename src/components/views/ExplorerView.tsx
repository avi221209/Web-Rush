import React, { useState } from 'react';
import { Search, LayoutGrid, List, MapPin, ChevronRight } from 'lucide-react';

import { CATEGORY_MAP, getCategoryInfo } from '../../lib/categoryUtils';
import { filterReceipts, GLOBAL_RECEIPTS } from '../../engine/receiptEngine';
import type { LifeReceipt, ReceiptCategory } from '../../types/receipt';

interface ExplorerViewProps {
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onResetSampleData?: () => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({ onSelectReceipt, onResetSampleData }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ReceiptCategory | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date_asc' | 'date_desc'>('date_asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract all unique tags
  const allTags = Array.from(new Set(GLOBAL_RECEIPTS.flatMap(r => r.tags || []))).slice(0, 15);

  const filtered = filterReceipts(GLOBAL_RECEIPTS, query, selectedCategory, selectedTag, sortBy);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
        <h1 className="font-serif text-4xl font-bold text-[#171717]">Receipt Explorer</h1>
        <p className="text-sm text-[#77736C] font-sans">
          Browse, filter, and inspect all {GLOBAL_RECEIPTS.length} individual digital traces in the dataset.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-[#EFEAE0]/50 border border-[#E2DDD3] rounded-2xl p-4 sm:p-6 space-y-4">
        {/* Search & Layout toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#77736C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search traces by keyword, title, place, artist..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl text-xs text-[#171717] placeholder-[#77736C] focus:outline-none focus:border-[#171717]"
            />
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center space-x-1 border border-[#E2DDD3] rounded-xl bg-[#F7F4EE] p-1">
              <button
                onClick={() => setSortBy('date_asc')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                  sortBy === 'date_asc' ? 'bg-[#171717] text-[#F7F4EE]' : 'text-[#77736C] hover:text-[#171717]'
                }`}
              >
                Oldest First
              </button>
              <button
                onClick={() => setSortBy('date_desc')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                  sortBy === 'date_desc' ? 'bg-[#171717] text-[#F7F4EE]' : 'text-[#77736C] hover:text-[#171717]'
                }`}
              >
                Newest First
              </button>
            </div>

            <div className="flex items-center space-x-1 border border-[#E2DDD3] rounded-xl bg-[#F7F4EE] p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#171717] text-[#F7F4EE]' : 'text-[#77736C] hover:text-[#171717]'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#171717] text-[#F7F4EE]' : 'text-[#77736C] hover:text-[#171717]'
                }`}
                title="Compact list view"
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
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#171717] text-[#F7F4EE]'
                  : 'bg-[#F7F4EE] text-[#77736C] border border-[#E2DDD3] hover:text-[#171717]'
              }`}
            >
              All ({GLOBAL_RECEIPTS.length})
            </button>
            {Object.entries(CATEGORY_MAP).map(([catKey, info]) => {
              const count = GLOBAL_RECEIPTS.filter(r => r.category === catKey).length;
              const isSelected = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey as ReceiptCategory)}
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
                onClick={() => setSelectedTag('all')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                  selectedTag === 'all' ? 'bg-[#171717] text-[#F7F4EE]' : 'bg-[#F7F4EE] text-[#77736C] border border-[#E2DDD3]'
                }`}
              >
                #all
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
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

      {/* Results Header */}
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

      {/* Grid or List View */}
      {GLOBAL_RECEIPTS.length === 0 ? (
        <div className="p-12 text-center bg-[#EFEAE0]/40 rounded-2xl border border-[#E2DDD3] space-y-4">
          <p className="font-serif italic text-xl text-[#171717]">The archive is currently empty.</p>
          <p className="text-xs text-[#77736C] max-w-md mx-auto font-sans">
            No digital receipts or traces are currently stored in memory. You can reload the organizer sample archive (200+ receipts) at any time.
          </p>
          {onResetSampleData && (
            <button
              onClick={onResetSampleData}
              className="px-5 py-2.5 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold transition-all shadow-sm"
            >
              Load Sample Archive (200+ Traces)
            </button>
          )}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-[#EFEAE0]/40 rounded-2xl border border-[#E2DDD3] space-y-2">
          <p className="font-serif italic text-lg text-[#171717]">No digital traces found matching criteria.</p>
          <p className="text-xs text-[#77736C]">Try clearing search inputs or changing category filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(receipt => {
            const catInfo = getCategoryInfo(receipt.category);
            const Icon = catInfo.icon;
            const formattedDate = new Date(receipt.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={receipt.id}
                onClick={() => onSelectReceipt(receipt)}
                className="bg-[#F7F4EE] border border-[#E2DDD3] hover:border-[#171717] rounded-xl p-5 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${catInfo.badgeBg}`}>
                      <Icon className="w-3 h-3" />
                      <span>{catInfo.label.toUpperCase()}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#77736C]">
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#171717] group-hover:underline leading-snug">
                    {receipt.title}
                  </h3>

                  {receipt.description && (
                    <p className="text-xs text-[#77736C] line-clamp-2 font-sans leading-relaxed">
                      {receipt.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#E2DDD3]/60 flex items-center justify-between text-[11px] font-mono text-[#77736C]">
                  {receipt.location ? (
                    <span className="flex items-center space-x-1 text-[#2563EB]">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[160px]">{receipt.location.name}</span>
                    </span>
                  ) : (
                    <span>Trace #{receipt.id}</span>
                  )}

                  <ChevronRight className="w-4 h-4 text-[#A39E93] group-hover:text-[#171717] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="divide-y divide-[#E2DDD3] border border-[#E2DDD3] rounded-2xl bg-[#F7F4EE] overflow-hidden">
          {filtered.map(receipt => {
            const catInfo = getCategoryInfo(receipt.category);
            const Icon = catInfo.icon;
            const formattedDate = new Date(receipt.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={receipt.id}
                onClick={() => onSelectReceipt(receipt)}
                className="p-4 hover:bg-[#EFEAE0] transition-colors cursor-pointer flex items-center justify-between space-x-4 group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className={`p-2 rounded-lg ${catInfo.badgeBg}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-[#171717] group-hover:underline truncate">
                      {receipt.title}
                    </div>
                    <div className="text-[11px] text-[#77736C] font-mono flex items-center space-x-2">
                      <span>{formattedDate}</span>
                      {receipt.location && <span>&bull; {receipt.location.name}</span>}
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#A39E93] group-hover:text-[#171717] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
