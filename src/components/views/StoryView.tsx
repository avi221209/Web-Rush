import React, { useState, useMemo } from 'react';
import { ScrollText, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

import { useArchive } from '../../hooks/useArchive';
import { StoryChapterNav } from './story/StoryChapterNav';
import { StoryEvidenceGrid } from './story/StoryEvidenceGrid';

import type { LifeReceipt } from '../../types/receipt';

export interface StoryViewProps {
  initialChapterId?: string;
  onSelectReceipt?: (receipt: LifeReceipt) => void;
  onFollowThread?: (receipt: LifeReceipt) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  initialChapterId,
  onSelectReceipt
}) => {
  const { receipts, chapters, storyNodes } = useArchive();

  const initialIndex = useMemo(() => {
    if (!initialChapterId) return 0;
    const idx = storyNodes.findIndex(node => node.chapterId === initialChapterId);
    return idx >= 0 ? idx : 0;
  }, [initialChapterId, storyNodes]);

  const [activeStoryIndex, setActiveStoryIndex] = useState(initialIndex);

  const activeStoryNode = storyNodes[activeStoryIndex] || storyNodes[0];
  const activeChapter = chapters.find(c => c.id === activeStoryNode?.chapterId) || chapters[0];

  const evidenceReceipts = useMemo(() => {
    if (!activeStoryNode) return [];
    return activeStoryNode.evidenceReceiptIds
      .map(id => receipts.find(r => r.id === id)!)
      .filter(Boolean);
  }, [activeStoryNode, receipts]);

  const handleNext = () => {
    if (activeStoryIndex < storyNodes.length - 1) {
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

  if (!activeStoryNode || !activeChapter) {
    return null;
  }

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

        {/* Chapter Stepper */}
        <StoryChapterNav
          chapters={chapters}
          activeStoryIndex={activeStoryIndex}
          onSelectIndex={setActiveStoryIndex}
        />
      </div>

      {/* Main Documentary Reader Card */}
      <div className="bg-[#F7F4EE] border border-[#E2DDD3] rounded-3xl p-6 sm:p-12 shadow-md space-y-10">
        <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFEAE0] border border-[#E2DDD3] text-xs font-mono text-[#171717] font-bold">
            <span>CHAPTER 0{activeChapter.chapterNumber} OF 0{chapters.length}</span>
            <span>&bull;</span>
            <span>{activeChapter.subtitle}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] leading-tight">
            {activeChapter.title}
          </h2>
        </div>

        {/* Narrative Paragraph */}
        <div className="space-y-4">
          <p className="font-serif text-xl sm:text-2xl text-[#171717] leading-relaxed font-normal">
            {activeStoryNode.narrativeParagraph}
          </p>
        </div>

        {/* What Changed Comparison Card */}
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

        {/* Actual Dataset Evidence Section */}
        <StoryEvidenceGrid
          evidenceReceipts={evidenceReceipts}
          onSelectReceipt={rcpt => onSelectReceipt?.(rcpt)}
        />

        {/* Bottom Chapter Stepper Navigation */}
        <div className="pt-6 flex items-center justify-between border-t border-[#E2DDD3]">
          <button
            onClick={handlePrev}
            disabled={activeStoryIndex === 0}
            className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center space-x-2 transition-all ${
              activeStoryIndex === 0
                ? 'opacity-30 border-[#E2DDD3] cursor-not-allowed text-[#77736C]'
                : 'border-[#E2DDD3] hover:border-[#171717] text-[#171717] hover:bg-[#EFEAE0]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Chapter</span>
          </button>

          <button
            onClick={handleNext}
            disabled={activeStoryIndex === chapters.length - 1}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all shadow-sm ${
              activeStoryIndex === chapters.length - 1
                ? 'opacity-30 bg-[#E2DDD3] cursor-not-allowed text-[#77736C]'
                : 'bg-[#171717] text-[#F7F4EE] hover:bg-[#333]'
            }`}
          >
            <span>Next Chapter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
