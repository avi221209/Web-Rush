import React, { useState } from 'react';
import { GitCompare, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';

import { CATEGORY_MAP } from '../../utils/categoryUtils';
import { comparePeriods } from '../../engine/receiptEngine';
import { useArchive } from '../../hooks/useArchive';
import type { ReceiptCategory } from '../../types/receipt';

export const ComparePeriodsView: React.FC = () => {
  const { receipts } = useArchive();
  const [periodARange, setPeriodARange] = useState({ start: '2026-03-01', end: '2026-04-30', label: 'March–April (Early Phase)' });
  const [periodBRange, setPeriodBRange] = useState({ start: '2026-07-01', end: '2026-08-31', label: 'July–August (Synthesis Phase)' });

  const result = comparePeriods(
    receipts,
    periodARange.start,
    periodARange.end,
    periodBRange.start,
    periodBRange.end,
    periodARange.label,
    periodBRange.label
  );

  const categories: ReceiptCategory[] = ['music', 'movie', 'place', 'purchase', 'photo', 'message', 'search', 'event', 'note'];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#77736C]">
          <GitCompare className="w-4 h-4 text-[#171717]" />
          <span>SIDE-BY-SIDE ERA COMPARISON</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-[#171717]">Compare Periods</h1>
        <p className="text-sm text-[#77736C] font-sans">
          Analyze behavioral shifts, category density changes, and activity deltas between any two date ranges.
        </p>
      </div>

      {/* Preset Range Selector Bar */}
      <div className="bg-[#EFEAE0]/50 border border-[#E2DDD3] rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="text-xs font-mono font-bold text-[#171717] uppercase tracking-wider">
          SELECT PERIODS TO COMPARE
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-2">
            <span className="text-[#77736C]">PERIOD A:</span>
            <select
              value={`${periodARange.start}|${periodARange.end}|${periodARange.label}`}
              onChange={e => {
                const [start, end, label] = e.target.value.split('|');
                setPeriodARange({ start, end, label });
              }}
              className="w-full p-2.5 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl text-[#171717] font-semibold focus:outline-none focus:ring-2 focus:ring-[#171717]"
            >
              <option value="2026-03-01|2026-04-30|March–April (Early Phase)">March–April 2026 (Early Academic Phase)</option>
              <option value="2026-05-01|2026-05-31|May 2026 (Summer Retreat)">May 2026 (Summer Retreat)</option>
              <option value="2026-06-01|2026-06-30|June 2026 (Studio Build)">June 2026 (Studio Build)</option>
            </select>
          </div>

          <div className="space-y-2">
            <span className="text-[#77736C]">PERIOD B:</span>
            <select
              value={`${periodBRange.start}|${periodBRange.end}|${periodBRange.label}`}
              onChange={e => {
                const [start, end, label] = e.target.value.split('|');
                setPeriodBRange({ start, end, label });
              }}
              className="w-full p-2.5 bg-[#F7F4EE] border border-[#E2DDD3] rounded-xl text-[#171717] font-semibold focus:outline-none focus:ring-2 focus:ring-[#171717]"
            >
              <option value="2026-07-01|2026-08-31|July–August (Synthesis Phase)">July–August 2026 (Synthesis Phase)</option>
              <option value="2026-06-01|2026-06-30|June 2026 (Studio Build)">June 2026 (Studio Build)</option>
              <option value="2026-05-01|2026-05-31|May 2026 (Summer Retreat)">May 2026 (Summer Retreat)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Auto-Generated "What Changed" Card */}
      <div className="bg-[#171717] text-[#F7F4EE] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#059669]">
          <Sparkles className="w-4 h-4" />
          <span>WHAT CHANGED BETWEEN THESE PERIODS?</span>
        </div>

        <div className="space-y-2 font-serif text-lg sm:text-xl text-[#F7F4EE]">
          {result.whatChanged.map((text, i) => (
            <p key={i} className="leading-relaxed">&bull; {text}</p>
          ))}
        </div>

        {/* Largest Delta Badge */}
        <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-[#EFEAE0]">
          {result.largestDelta.direction === 'increased' ? (
            <TrendingUp className="w-4 h-4 text-[#059669]" />
          ) : (
            <TrendingDown className="w-4 h-4 text-[#E11D48]" />
          )}
          <span>
            Largest Delta: <strong className="text-white capitalize">{result.largestDelta.category}</strong> {result.largestDelta.direction} by {result.largestDelta.percentChange}%
          </span>
        </div>
      </div>

      {/* Side-by-Side Category Distribution Visualization */}
      <div className="bg-[#F7F4EE] border border-[#E2DDD3] rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2DDD3] pb-4 font-mono text-xs font-bold text-[#171717]">
          <span>CATEGORY DISTRIBUTION COMPARISON</span>
          <span>{result.periodA.totalTraces} traces (A) vs {result.periodB.totalTraces} traces (B)</span>
        </div>

        <div className="space-y-4">
          {categories.map(cat => {
            const info = CATEGORY_MAP[cat];
            const Icon = info.icon;

            const countA = result.periodA.categoryCounts[cat] || 0;
            const countB = result.periodB.categoryCounts[cat] || 0;

            const maxVal = Math.max(...Object.values(result.periodA.categoryCounts), ...Object.values(result.periodB.categoryCounts), 1);

            const widthPctA = Math.round((countA / maxVal) * 100);
            const widthPctB = Math.round((countB / maxVal) * 100);

            return (
              <div key={cat} className="space-y-1 text-xs">
                <div className="flex items-center justify-between font-mono font-semibold text-[#171717]">
                  <span className="flex items-center space-x-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{info.label}</span>
                  </span>
                  <span className="text-[#77736C]">
                    Period A: {countA} &bull; Period B: {countB}
                  </span>
                </div>

                {/* Side by side bars */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Bar A */}
                  <div className="bg-[#EFEAE0] h-4 rounded-full overflow-hidden relative">
                    <div
                      className="bg-[#77736C] h-full rounded-full transition-all duration-500"
                      style={{ width: `${widthPctA}%` }}
                    />
                  </div>

                  {/* Bar B */}
                  <div className="bg-[#EFEAE0] h-4 rounded-full overflow-hidden relative">
                    <div
                      className="bg-[#171717] h-full rounded-full transition-all duration-500"
                      style={{ width: `${widthPctB}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
