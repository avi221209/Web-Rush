import React, { memo } from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';

import { formatFullDate, getDateString } from '../../../utils/dateUtils';
import type { LifeReceipt } from '../../../types/receipt';

interface DrawerMetadataGridProps {
  receipt: LifeReceipt;
  onReconstructDay: (dateStr: string) => void;
  onClose: () => void;
}

export const DrawerMetadataGrid: React.FC<DrawerMetadataGridProps> = memo(({
  receipt,
  onReconstructDay,
  onClose
}) => {
  const formattedDate = formatFullDate(receipt.timestamp);
  const dateStr = getDateString(receipt.timestamp);

  return (
    <>
      {/* Key Attributes Card */}
      <div className="bg-[#EFEAE0]/60 border border-[#E2DDD3] rounded-lg p-4 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#171717]">
            <Calendar className="w-4 h-4 text-[#77736C]" />
            <span className="font-mono">{formattedDate}</span>
          </div>
          <button
            onClick={() => {
              onReconstructDay(dateStr);
              onClose();
            }}
            className="text-[11px] font-mono text-[#2563EB] hover:underline font-bold"
          >
            See full day &rarr;
          </button>
        </div>

        {receipt.location && (
          <div className="flex items-center space-x-2 text-[#171717]">
            <MapPin className="w-4 h-4 text-[#2563EB]" />
            <span className="font-semibold">{receipt.location.name}</span>
            {receipt.location.city && <span className="text-[#77736C]">({receipt.location.city})</span>}
          </div>
        )}

        {receipt.amount !== undefined && (
          <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD3]/80">
            <span className="text-[#77736C] font-mono">Amount Paid:</span>
            <span className="font-mono font-bold text-sm text-[#D97706]">
              ₹{receipt.amount.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        {receipt.artist && (
          <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD3]/80">
            <span className="text-[#77736C] font-mono">Artist:</span>
            <span className="font-semibold text-[#7C3AED]">{receipt.artist}</span>
          </div>
        )}

        {receipt.person && (
          <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD3]/80">
            <span className="text-[#77736C] font-mono">Contact / Person:</span>
            <span className="font-semibold text-[#DB2777]">{receipt.person}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {receipt.tags && receipt.tags.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#77736C] flex items-center space-x-1">
            <Tag className="w-3.5 h-3.5" />
            <span>TAGS &amp; CATEGORIZATION</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {receipt.tags.map(t => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-[#EFEAE0] text-[#171717] font-mono text-[11px] border border-[#E2DDD3]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
});

DrawerMetadataGrid.displayName = 'DrawerMetadataGrid';
