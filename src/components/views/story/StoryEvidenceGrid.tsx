import React, { memo } from 'react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import { formatReceiptDate } from '../../../utils/dateUtils';
import type { LifeReceipt } from '../../../types/receipt';

interface StoryEvidenceGridProps {
  evidenceReceipts: LifeReceipt[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const StoryEvidenceGrid: React.FC<StoryEvidenceGridProps> = memo(({
  evidenceReceipts,
  onSelectReceipt
}) => {
  return (
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
          const formattedDate = formatReceiptDate(rcpt.timestamp);

          return (
            <div
              key={rcpt.id}
              onClick={() => onSelectReceipt(rcpt)}
              className="p-4 bg-[#EFEAE0]/50 border border-[#E2DDD3] hover:border-[#171717] rounded-2xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${catInfo.badgeBg}`}>
                  <Icon className="w-3 h-3" />
                  <span>{catInfo.label}</span>
                </span>
                <span className="text-[11px] font-mono text-[#77736C]">
                  {formattedDate}
                </span>
              </div>

              <div className="font-serif text-base font-bold text-[#171717] group-hover:underline">
                {rcpt.title}
              </div>

              {rcpt.description && (
                <p className="text-xs text-[#77736C] line-clamp-2 leading-relaxed">
                  {rcpt.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

StoryEvidenceGrid.displayName = 'StoryEvidenceGrid';
