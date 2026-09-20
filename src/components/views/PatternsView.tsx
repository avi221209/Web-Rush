import React, { useState } from 'react';
import { Sparkles, Layers } from 'lucide-react';

import { useArchive } from '../../hooks/useArchive';
import { AnomalySection } from './patterns/AnomalySection';
import { RitualSection } from './patterns/RitualSection';
import { PatternCard } from './patterns/PatternCard';

import type { LifeReceipt } from '../../types/receipt';

export interface PatternsViewProps {
  onSelectReceipt?: (receipt: LifeReceipt) => void;
  onReconstructDay?: (dateStr: string) => void;
}

export const PatternsView: React.FC<PatternsViewProps> = ({
  onSelectReceipt,
  onReconstructDay
}) => {
  const { receipts, patterns, anomalies, rituals } = useArchive();
  const [expandedPatternId, setExpandedPatternId] = useState<string | null>('pat-01');

  const toggleExpandPattern = (id: string) => {
    setExpandedPatternId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#77736C]">
          <Sparkles className="w-4 h-4 text-[#D97706]" />
          <span>RECURRING BEHAVIOR ENGINE</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-[#171717]">Pattern & Anomaly Discovery</h1>
        <p className="text-sm text-[#77736C] font-sans max-w-2xl">
          Automated client-side calculation of behavioral shifts, temporal peaks, location hubs, unusual day spikes, and recurring rituals.
        </p>
      </div>

      {/* Anomaly Detection Section */}
      <AnomalySection
        anomalies={anomalies}
        onReconstructDay={dateStr => onReconstructDay?.(dateStr)}
      />

      {/* Recurring Rituals Section */}
      <RitualSection
        rituals={rituals}
        onReconstructDay={dateStr => onReconstructDay?.(dateStr)}
      />

      {/* Behavioral & Temporal Patterns */}
      <div className="space-y-6 pt-6 border-t border-[#E2DDD3]">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#171717]">
          <Layers className="w-4 h-4 text-[#171717]" />
          <span>BEHAVIORAL & TEMPORAL PATTERNS ({patterns.length} DETECTED)</span>
        </div>

        <div className="space-y-6">
          {patterns.map(pattern => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              isExpanded={expandedPatternId === pattern.id}
              onToggleExpand={toggleExpandPattern}
              receipts={receipts}
              onSelectReceipt={rcpt => onSelectReceipt?.(rcpt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
