import React from 'react';
import { BookMarked, ArrowRight, MapPin, Layers } from 'lucide-react';

import { getCategoryInfo } from '../../lib/categoryUtils';
import { GLOBAL_CHAPTERS, GLOBAL_RECEIPTS } from '../../engine/receiptEngine';
import type { Chapter, LifeReceipt } from '../../types/receipt';

interface ChaptersViewProps {
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onFocusChapterInStory: (chapter: Chapter) => void;
}

export const ChaptersView: React.FC<ChaptersViewProps> = ({
  onSelectReceipt,
  onFocusChapterInStory
}) => {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#77736C]">
          <BookMarked className="w-4 h-4 text-[#059669]" />
          <span>BEHAVIORAL ERA DETECTION</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-[#171717]">Life Chapters</h1>
        <p className="text-sm text-[#77736C] font-sans">
          Periods where behavior, focus, and environment shifted across 6 months of digital receipts.
        </p>
      </div>

      {/* Chapters Timeline Stack */}
      <div className="space-y-8 relative before:absolute before:left-4 sm:before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E2DDD3]">
        {GLOBAL_CHAPTERS.map(chap => {
          const representativeReceipts = chap.representativeReceiptIds
            .map(id => GLOBAL_RECEIPTS.find(r => r.id === id)!)
            .filter(Boolean);

          return (
            <div key={chap.id} className="relative pl-10 sm:pl-16 group">
              {/* Timeline Marker Badge */}
              <div className="absolute left-1.5 sm:left-5 top-6 w-6 h-6 rounded-full bg-[#171717] text-[#F7F4EE] flex items-center justify-center text-xs font-mono font-bold border-4 border-[#F7F4EE] shadow-sm">
                {chap.chapterNumber}
              </div>

              {/* Main Chapter Card */}
              <div className="bg-[#F7F4EE] border border-[#E2DDD3] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm hover:border-[#171717]/40 transition-all">
                {/* Top Chapter Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2DDD3] pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#059669] uppercase tracking-wider">
                      CHAPTER 0{chap.chapterNumber} &bull; {chap.subtitle}
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-[#171717]">
                      {chap.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => onFocusChapterInStory(chap)}
                    className="self-start sm:self-center px-4 py-2 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold flex items-center space-x-2 transition-all shadow-sm group-hover:scale-105"
                  >
                    <span>Read in Story Mode</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Narrative Summary */}
                <p className="font-serif italic text-base text-[#171717] leading-relaxed bg-[#EFEAE0]/50 p-4 rounded-xl border border-[#E2DDD3]/70">
                  “{chap.narrative}”
                </p>

                {/* Dominant Categories & Locations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1.5 p-3 rounded-lg bg-[#EFEAE0]/40 border border-[#E2DDD3]">
                    <span className="text-[#77736C] uppercase font-bold flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-[#171717]" />
                      <span>DOMINANT CATEGORIES</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {chap.dominantCategories.map(cat => {
                        const info = getCategoryInfo(cat);
                        return (
                          <span key={cat} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${info.badgeBg}`}>
                            {info.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-lg bg-[#EFEAE0]/40 border border-[#E2DDD3]">
                    <span className="text-[#77736C] uppercase font-bold flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>KEY LOCATIONS</span>
                    </span>
                    <div className="text-[#171717] font-semibold pt-1">
                      {chap.keyLocations.join(' • ')}
                    </div>
                  </div>
                </div>

                {/* Representative Receipts */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono font-bold text-[#77736C] uppercase tracking-wider block">
                    REPRESENTATIVE TRACES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {representativeReceipts.map(rcpt => {
                      const info = getCategoryInfo(rcpt.category);
                      const Icon = info.icon;
                      return (
                        <div
                          key={rcpt.id}
                          onClick={() => onSelectReceipt(rcpt)}
                          className="p-3 rounded-xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0] transition-colors cursor-pointer space-y-1.5 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className={`p-1 rounded ${info.badgeBg}`}>
                              <Icon className="w-3 h-3" />
                            </span>
                            <span className="text-[10px] font-mono text-[#77736C]">
                              {new Date(rcpt.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-[#171717] group-hover:underline truncate">
                            {rcpt.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
