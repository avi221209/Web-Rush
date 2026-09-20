import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

import { getCategoryInfo } from '../../utils/categoryUtils';
import { searchGlobalGrouped } from '../../engine/receiptEngine';
import { useArchive } from '../../hooks/useArchive';
import type { LifeReceipt } from '../../types/receipt';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectReceipt
}) => {
  const { receipts } = useArchive();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const grouped = searchGlobalGrouped(query, receipts);
  const categoriesFound = Object.keys(grouped);
  const totalResults = categoriesFound.reduce((acc, cat) => acc + grouped[cat].count, 0);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/40 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200"
      role="presentation"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        className="w-full max-w-2xl bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-[#E2DDD3] flex items-center space-x-3 bg-[#EFEAE0]/50">
          <Search className="w-5 h-5 text-[#77736C]" />
          <h2 id="search-modal-title" className="sr-only">Search digital traces</h2>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search titles, places, artists, tags, notes..."
            aria-label="Search receipts"
            className="w-full bg-transparent text-sm text-[#171717] placeholder-[#77736C] focus:outline-none focus-visible:ring-0 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="p-1 rounded text-[#77736C] hover:text-[#171717]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="px-2 py-1 text-xs font-mono text-[#77736C] bg-[#F7F4EE] rounded border border-[#E2DDD3] hover:text-[#171717]"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {!query.trim() ? (
            <div className="py-10 text-center text-xs text-[#77736C] space-y-2">
              <p className="font-serif italic text-sm text-[#171717]">Try searching for digital traces:</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Mumbai', 'Radiohead', 'Coffee', 'Bandra', 'Ramen', 'Anya', 'Vinyl', 'Studio', 'Monsoon'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded bg-[#EFEAE0] hover:bg-[#E2DDD3] text-[#171717] font-mono text-[11px] transition-colors"
                  >
                    "{tag}"
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-serif italic text-base text-[#171717]">Nothing matched "{query}"</p>
              <p className="text-xs text-[#77736C]">Try a different term or filter by category in the Receipt Explorer.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#77736C] pb-2 border-b border-[#E2DDD3]">
                <span>SEARCH RESULTS FOR "{query.toUpperCase()}"</span>
                <span>{totalResults} matches across {categoriesFound.length} categories</span>
              </div>

              {categoriesFound.map(category => {
                const info = getCategoryInfo(category as any);
                const Icon = info.icon;
                const groupData = grouped[category];

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#171717]">
                      <div className="flex items-center space-x-2">
                        <span className={`p-1 rounded ${info.badgeBg}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-bold tracking-wider uppercase">{info.label}</span>
                      </div>
                      <span className="text-[#77736C] font-bold">{groupData.count} results</span>
                    </div>

                    <div className="divide-y divide-[#E2DDD3] border border-[#E2DDD3] rounded-lg bg-[#F7F4EE] overflow-hidden">
                      {groupData.items.map(receipt => (
                        <button
                          key={receipt.id}
                          onClick={() => {
                            onSelectReceipt(receipt);
                            onClose();
                          }}
                          className="w-full p-3.5 text-left hover:bg-[#EFEAE0] transition-colors flex items-center justify-between group"
                        >
                          <div className="space-y-1 min-w-0 pr-4">
                            <div className="text-xs font-semibold text-[#171717] truncate group-hover:text-black">
                              {receipt.title}
                            </div>
                            <div className="flex items-center space-x-2 text-[11px] text-[#77736C] font-mono">
                              <span>{new Date(receipt.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              <span className="text-[#059669] font-medium">&bull; {groupData.matchContext}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#A39E93] group-hover:text-[#171717] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
