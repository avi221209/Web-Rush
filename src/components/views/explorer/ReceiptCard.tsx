import React, { memo } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import { formatReceiptDate } from '../../../utils/dateUtils';
import type { LifeReceipt } from '../../../types/receipt';

interface ReceiptCardProps {
  receipt: LifeReceipt;
  onSelect: (receipt: LifeReceipt) => void;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = memo(({ receipt, onSelect }) => {
  const catInfo = getCategoryInfo(receipt.category);
  const Icon = catInfo.icon;
  const formattedDate = formatReceiptDate(receipt.timestamp);

  return (
    <div
      onClick={() => onSelect(receipt)}
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
});

ReceiptCard.displayName = 'ReceiptCard';
