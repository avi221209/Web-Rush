import React, { memo } from 'react';
import { ChevronRight } from 'lucide-react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import { formatReceiptDate } from '../../../utils/dateUtils';
import type { LifeReceipt } from '../../../types/receipt';

interface ReceiptListItemProps {
  receipt: LifeReceipt;
  onSelect: (receipt: LifeReceipt) => void;
}

export const ReceiptListItem: React.FC<ReceiptListItemProps> = memo(({ receipt, onSelect }) => {
  const catInfo = getCategoryInfo(receipt.category);
  const Icon = catInfo.icon;
  const formattedDate = formatReceiptDate(receipt.timestamp);

  return (
    <div
      onClick={() => onSelect(receipt)}
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
});

ReceiptListItem.displayName = 'ReceiptListItem';
