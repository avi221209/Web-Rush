import React, { useState } from 'react';
import { ScrollText, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

import { getCategoryInfo } from '../../lib/categoryUtils';
import { GLOBAL_CHAPTERS, GLOBAL_RECEIPTS, GLOBAL_STORY_NODES } from '../../engine/receiptEngine';
import type { LifeReceipt } from '../../types/receipt';

interface StoryViewProps {
  initialChapterId?: string;
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onFollowThread: (receipt: LifeReceipt) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  initialChapterId,
  onSelectReceipt,
  onFollowThread
}) => {
  const initialIndex = initialChapterId
    ? GLOBAL_STORY_NODES.findIndex(node => node.chapterId === initialChapterId)
    : 0;

  const [activeStoryIndex, setActiveStoryIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  const activeStoryNode = GLOBAL_STORY_NODES[activeStoryIndex] || GLOBAL_STORY_NODES[0];
  const activeChapter = GLOBAL_CHAPTERS.find(c => c.id === activeStoryNode.chapterId) || GLOBAL_CHAPTERS[0];

  const evidenceReceipts = activeStoryNode.evidenceReceiptIds
    .map(id => GLOBAL_RECEIPTS.find(r => r.id === id)!)
    .filter(Boolean);

  const handleNext = () => {
    if (activeStoryIndex < GLOBAL_STORY_NODES.length - 1) {
      setActiveStoryIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E2DDD3] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#77736C]">
            <ScrollText className="w-4 h-4 text-[#171717]" />
            <span>INTERACTIVE DIGITAL DOCUMENTARY</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">THE STORY SO FAR</h1>
        </div>

        {/* Chapter Stepper Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 sm:pb-0">
          {GLOBAL_CHAPTERS.map((chap, idx) => {
            const isActive = idx === activeStoryIndex;
            return (
              <button
                key={chap.id}
                onClick={() => setActiveStoryIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#171717] text-[#F7F4EE] shadow-sm'
                    : 'bg-[#EFEAE0] text-[#77736C] hover:text-[#171717]'
                }`}
              >
                Ch. 0{chap.chapterNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Documentary Reader Card */}
      <div className="bg-[#F7F4EE] border border-[#E2DDD3] rounded-3xl p-6 sm:p-12 shadow-md space-y-10">
        {/* Chapter Title Badge */}
        <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFEAE0] border border-[#E2DDD3] text-xs font-mono text-[#171717] font-bold">
            <span>CHAPTER 0{activeChapter.chapterNumber} OF 06</span>
            <span>&bull;</span>
            <span>{activeChapter.subtitle}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] leading-tight">
            {activeChapter.title}
          </h2>
        </div>

        {/* Documentary Narrative Paragraph */}
        <div className="space-y-4">
          <p className="font-serif text-xl sm:text-2xl text-[#171717] leading-relaxed font-normal">
            {activeStoryNode.narrativeParagraph}
          </p>
        </div>

        {/* What Changed? Visual Comparison Card */}
        <div className="p-6 rounded-2xl bg-[#EFEAE0]/70 border border-[#E2DDD3] space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#171717]">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>WHAT CHANGED IN THIS CHAPTER?</span>
          </div>

          <p className="text-xs text-[#77736C] font-sans">
            {activeStoryNode.whatChangedText}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#E2DDD3] space-y-1">
              <span className="text-[10px] text-[#77736C]">PREVIOUS STATE:</span>
              <div className="font-bold text-[#77736C]">{activeStoryNode.comparisonStats.previous}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#171717] text-[#F7F4EE] border border-[#171717] space-y-1 shadow-sm">
              <span className="text-[10px] text-[#EFEAE0]/70">NEW BEHAVIORAL SHIFT:</span>
              <div className="font-bold text-[#059669]">{activeStoryNode.comparisonStats.current}</div>
            </div>
          </div>
        </div>

        {/* Concrete Dataset Evidence Section */}
        <div className="space-y-4 pt-4 border-t border-[#E2DDD3]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#171717] uppercase tracking-wider">
              ACTUAL DATASET EVIDENCE ({evidenceReceipts.length} TRACES)
            </span>
            <span className="text-xs font-mono text-[#77736C]">Click any evidence card to inspect</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {evidenceReceipts.map(rcpt => {
              const catInfo = getCategoryInfo(rcpt.category);
              const Icon = catInfo.icon;
              const formattedDate = new Date(rcpt.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={rcpt.id}
                  onClick={() => onSelectReceipt(rcpt)}
                  className="p-5 rounded-2xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0] transition-all cursor-pointer space-y-3 group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${catInfo.badgeBg}`}>
                      <Icon className="w-3.5 h-3.5 inline mr-1" />
                      {catInfo.label.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-[#77736C]">
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#171717] group-hover:underline">
                    {rcpt.title}
                  </h3>

                  {rcpt.description && (
                    <p className="text-xs text-[#77736C] line-clamp-2">
                      {rcpt.description}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#2563EB]">
                    <span>{rcpt.location?.name || 'Trace Record'}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onFollowThread(rcpt);
                      }}
                      className="text-[#171717] hover:underline font-bold"
                    >
                      Follow thread &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Narrative Navigation Controls */}
        <div className="pt-6 border-t border-[#E2DDD3] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={activeStoryIndex === 0}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
              activeStoryIndex === 0
                ? 'opacity-40 cursor-not-allowed text-[#77736C]'
                : 'bg-[#EFEAE0] text-[#171717] border border-[#E2DDD3] hover:bg-[#E2DDD3]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          {activeStoryIndex < GLOBAL_STORY_NODES.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold shadow-md transition-all"
            >
              <span>Next Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#059669]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Story Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
