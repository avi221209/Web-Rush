import React, { memo } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

import type { AnomalyDay } from '../../../engine/anomalyEngine';

interface AnomalySectionProps {
  anomalies: AnomalyDay[];
  onReconstructDay: (dateStr: string) => void;
}

export const AnomalySection: React.FC<AnomalySectionProps> = memo(({
  anomalies,
  onReconstructDay
}) => {
  if (anomalies.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#E11D48]">
        <AlertTriangle className="w-4 h-4 text-[#E11D48]" />
        <span>UNUSUAL DAYS DETECTED (&gt;1.2&sigma; SPIKES)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {anomalies.slice(0, 4).map(anomaly => (
          <div
            key={anomaly.id}
            className="p-6 rounded-2xl border border-[#E2DDD3] bg-[#F7F4EE] shadow-sm space-y-4 hover:border-[#171717]/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-[#E11D48]/10 text-[#E11D48] text-xs font-mono font-bold uppercase border border-[#E11D48]/30 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>UNUSUAL DAY DETECTED</span>
              </span>
              <span className="text-xs font-mono text-[#77736C] font-bold">
                {anomaly.multiplier}× normal activity
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#171717]">
                {anomaly.displayDate}
              </h3>
              <div className="text-xs font-mono text-[#77736C]">
                Normal: {anomaly.normalRangeText} &bull; <strong className="text-[#171717]">{anomaly.actualCount} traces recorded</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EFEAE0]/70 border border-[#E2DDD3] space-y-2 font-mono text-xs">
              <span className="font-bold text-[#171717]">WHY IT'S UNUSUAL:</span>
              <ul className="text-[#77736C] space-y-1">
                {anomaly.reasons.map((r, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span>&bull;</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onReconstructDay(anomaly.dateStr)}
              className="w-full py-2.5 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-sm"
            >
              <span>Reconstruct this day &rarr;</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

AnomalySection.displayName = 'AnomalySection';
