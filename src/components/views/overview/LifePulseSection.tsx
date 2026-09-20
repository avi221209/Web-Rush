import React, { memo, useMemo, useState } from 'react';

import type { LifeReceipt } from '../../../types/receipt';

interface LifePulseSectionProps {
  receipts: LifeReceipt[];
  onNavigateTab: (tab: 'receipts') => void;
}

export const LifePulseSection: React.FC<LifePulseSectionProps> = memo(({
  receipts,
  onNavigateTab
}) => {
  const [selectedPulsePeriod, setSelectedPulsePeriod] = useState<string | null>(null);

  const monthGroups = useMemo<Record<string, LifeReceipt[]>>(() => {
    return {
      'March 2026': receipts.filter(r => new Date(r.timestamp).getMonth() === 2),
      'April 2026': receipts.filter(r => new Date(r.timestamp).getMonth() === 3),
      'May 2026': receipts.filter(r => new Date(r.timestamp).getMonth() === 4),
      'June 2026': receipts.filter(r => new Date(r.timestamp).getMonth() === 5),
      'July 2026': receipts.filter(r => new Date(r.timestamp).getMonth() === 6),
      'August 2026': receipts.filter(r => new Date(r.timestamp).getMonth() === 7)
    };
  }, [receipts]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#171717]">Life Pulse</h3>
          <p className="text-xs text-[#77736C] font-mono">
            Horizontal activity density across 6 months. Hover for details, click to zoom.
          </p>
        </div>
        {selectedPulsePeriod && (
          <button
            onClick={() => setSelectedPulsePeriod(null)}
            className="text-xs font-mono text-[#2563EB] hover:underline"
          >
            Reset Zoom
          </button>
        )}
      </div>

      <div className="bg-[#EFEAE0]/40 border border-[#E2DDD3] rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(monthGroups).map(([month, list]) => {
            const isSelected = selectedPulsePeriod === month;
            const count = list.length;
            const heightPct = Math.min(Math.max((count / 40) * 100, 25), 100);

            return (
              <div
                key={month}
                onClick={() => {
                  setSelectedPulsePeriod(month);
                  onNavigateTab('receipts');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-44 ${
                  isSelected
                    ? 'bg-[#171717] text-[#F7F4EE] border-[#171717] shadow-md'
                    : 'bg-[#F7F4EE] text-[#171717] border-[#E2DDD3] hover:border-[#171717]/50'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold">{month}</div>
                  <div className="text-[11px] opacity-70">{count} digital traces</div>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-[#E2DDD3]/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#059669] h-full rounded-full transition-all duration-500"
                      style={{ width: `${heightPct}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-right opacity-60">
                    Click to explore
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

LifePulseSection.displayName = 'LifePulseSection';
