import React, { memo } from 'react';

import type { Chapter } from '../../../types/receipt';

interface StoryChapterNavProps {
  chapters: Chapter[];
  activeStoryIndex: number;
  onSelectIndex: (index: number) => void;
}

export const StoryChapterNav: React.FC<StoryChapterNavProps> = memo(({
  chapters,
  activeStoryIndex,
  onSelectIndex
}) => {
  return (
    <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 sm:pb-0">
      {chapters.map((chap, idx) => {
        const isActive = idx === activeStoryIndex;
        return (
          <button
            key={chap.id}
            onClick={() => onSelectIndex(idx)}
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
  );
});

StoryChapterNav.displayName = 'StoryChapterNav';
