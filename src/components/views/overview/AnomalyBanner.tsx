import React, { memo } from 'react';
import { AlertTriangle, Calendar } from 'lucide-react';

import type { AnomalyDay } from '../../../engine/anomalyEngine';

interface AnomalyBannerProps {
  anomaly: AnomalyDay;
  onReconstructDay: (dateStr: string) => void;
}

export const AnomalyBanner: React.FC<AnomalyBannerProps> = memo(({
  anomaly,
  onReconstructDay
}) => {
  return (
    <div className="p-6 rounded-2xl border border-[#E2DDD3] bg-[#EFEAE0]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start space-x-3">
        <div className="p-2.5 rounded-xl bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/30">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold text-[#E11D48] uppercase tracking-wider">
            UNUSUAL ACTIVITY DAY DETECTED
          </span>
          <div className="text-base font-bold text-[#171717] font-serif">{anomaly.displayDate}</div>
          <div className="text-xs text-[#77736C]">
            {anomaly.actualCount} traces recorded ({anomaly.multiplier}× higher than daily baseline)
          </div>
        </div>
      </div>

      <button
        onClick={() => onReconstructDay(anomaly.dateStr)}
        className="px-5 py-2.5 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold transition-all shadow-sm self-stretch sm:self-auto flex items-center justify-center space-x-1.5"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Reconstruct this day &rarr;</span>
      </button>
    </div>
  );
});

AnomalyBanner.displayName = 'AnomalyBanner';
