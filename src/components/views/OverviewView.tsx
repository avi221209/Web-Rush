import React from 'react';
import { Compass, Play, Shuffle } from 'lucide-react';

import { useArchive } from '../../hooks/useArchive';
import { OverviewMetricsGrid } from './overview/OverviewMetricsGrid';
import { HeroMomentCard } from './overview/HeroMomentCard';
import { AnomalyBanner } from './overview/AnomalyBanner';
import { LifePulseSection } from './overview/LifePulseSection';
import { WhatWeFoundSection } from './overview/WhatWeFoundSection';

import type { LifeReceipt } from '../../types/receipt';
import type { ActiveTab } from '../../types/ui';

export interface OverviewViewProps {
  onSelectReceipt?: (receipt: LifeReceipt) => void;
  onFollowThread?: (receipt: LifeReceipt) => void;
  onReconstructDay?: (dateStr: string) => void;
  onOpenDemoTour?: () => void;
  onNavigateTab?: (tab: ActiveTab) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectReceipt,
  onFollowThread,
  onReconstructDay,
  onOpenDemoTour,
  onNavigateTab
}) => {
  const { receipts, metrics, anomalies, patterns } = useArchive();

  const heroReceipt = receipts.find(r => r.id === 'rcpt-053') || receipts[0];

  const handleRandomExplore = () => {
    if (receipts.length === 0) return;
    const randomIndex = Math.floor(Math.random() * receipts.length);
    onSelectReceipt?.(receipts[randomIndex]);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Overview Top Header & Single Dominant CTA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2DDD3]">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#77736C]">
            <Compass className="w-4 h-4 text-[#171717]" />
            <span>ARCHIVAL SYSTEM OVERVIEW</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
            A life, reconstructed.
          </h1>
          <p className="text-sm text-[#77736C] font-sans max-w-xl leading-relaxed">
            Analyzing 200+ digital traces across 6 months into connected moments, patterns, and story chapters.
          </p>
        </div>

        {/* Judging Demo Quick Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDemoTour}
            className="px-5 py-2.5 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#F7F4EE]" />
            <span>Show me a story</span>
          </button>

          <button
            onClick={handleRandomExplore}
            className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-[#EFEAE0] text-[#77736C] hover:text-[#171717] border border-[#E2DDD3] text-xs font-mono font-medium flex items-center space-x-2 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Explore randomly</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics Counters — Fixed Taxonomy System */}
      <OverviewMetricsGrid metrics={metrics} />

      {/* HERO MOMENT SECTION — Distinct Primary CTA and Secondary Link */}
      {heroReceipt && (
        <HeroMomentCard
          heroReceipt={heroReceipt}
          onFollowThread={rcpt => onFollowThread?.(rcpt)}
          onReconstructDay={dateStr => onReconstructDay?.(dateStr)}
        />
      )}

      {/* ANOMALY CARD SNAPSHOT */}
      {anomalies.length > 0 && (
        <AnomalyBanner
          anomaly={anomalies[0]}
          onReconstructDay={dateStr => onReconstructDay?.(dateStr)}
        />
      )}

      {/* LIFE PULSE */}
      <LifePulseSection
        receipts={receipts}
        onNavigateTab={() => onNavigateTab?.('receipts')}
      />

      {/* WHAT WE FOUND SECTION */}
      <WhatWeFoundSection
        patterns={patterns}
        onNavigateTab={() => onNavigateTab?.('patterns')}
      />
    </div>
  );
};
