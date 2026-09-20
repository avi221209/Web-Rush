import React, { memo, useState } from 'react';
import { Repeat, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import type { RecurringRitual } from '../../../engine/ritualEngine';

interface RitualSectionProps {
  rituals: RecurringRitual[];
  onReconstructDay?: (dateStr: string) => void;
}

export const RitualSection: React.FC<RitualSectionProps> = memo(({
  rituals,
  onReconstructDay
}) => {
  const [expandedRitualId, setExpandedRitualId] = useState<string | null>(null);

  const toggleExpandRitual = (id: string) => {
    setExpandedRitualId(prev => (prev === id ? null : id));
  };

  if (rituals.length === 0) return null;

  return (
    <div className="space-y-4 pt-6 border-t border-[#E2DDD3]">
      <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#059669]">
        <Repeat className="w-4 h-4 text-[#059669]" />
        <span>RECURRING RITUALS (3+ CATEGORIES ACROSS 3+ WEEKS)</span>
      </div>

      <div className="space-y-4">
        {rituals.map(ritual => {
          const isExpanded = expandedRitualId === ritual.id;

          return (
            <div
              key={ritual.id}
              className="p-6 rounded-2xl border border-[#E2DDD3] bg-[#F7F4EE] space-y-4 shadow-sm hover:border-[#171717]/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <span className="px-2.5 py-1 rounded bg-[#059669]/10 text-[#059669] text-xs font-mono font-bold uppercase border border-[#059669]/30">
                    RITUAL DETECTED &bull; {ritual.typeTag}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#171717]">
                    {ritual.title}
                  </h3>
                </div>

                <span className="text-xs font-mono font-bold text-[#77736C]">
                  Appeared across {ritual.occurrenceCount} calendar weeks
                </span>
              </div>

              <p className="text-xs text-[#77736C] font-sans leading-relaxed">
                {ritual.description}
              </p>

              {/* Sequence pills */}
              <div className="p-4 rounded-xl bg-[#EFEAE0]/70 border border-[#E2DDD3] space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#171717] block">TYPICAL SEQUENCE:</span>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  {ritual.sequence.map((cat, i) => {
                    const info = getCategoryInfo(cat);
                    const Icon = info.icon;
                    return (
                      <React.Fragment key={i}>
                        <span className={`px-2.5 py-1 rounded-lg border font-bold ${info.badgeBg} flex items-center space-x-1`}>
                          <Icon className="w-3 h-3" />
                          <span>{info.label}</span>
                        </span>
                        {i < ritual.sequence.length - 1 && <span className="text-[#77736C] font-bold">&rarr;</span>}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="text-xs font-mono text-[#77736C]">
                  Avg duration: <strong className="text-[#171717]">{ritual.avgDurationText}</strong> &bull; Location: <strong className="text-[#171717]">{ritual.mostCommonLocation}</strong>
                </div>

                <button
                  onClick={() => toggleExpandRitual(ritual.id)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#E2DDD3] bg-[#EFEAE0] hover:bg-[#E2DDD3] text-xs font-mono font-bold text-[#171717] transition-all flex items-center space-x-1 self-start sm:self-auto"
                >
                  <span>{isExpanded ? 'Hide instances' : 'See all instances'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {isExpanded && (
                <div className="pt-4 border-t border-[#E2DDD3] space-y-3 animate-in fade-in duration-200">
                  <span className="text-xs font-mono font-bold text-[#171717] block uppercase">
                    DETECTED RITUAL OCCURRENCES ({ritual.occurrences.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ritual.occurrences.map((occ, i) => (
                      <div
                        key={i}
                        onClick={() => onReconstructDay?.(occ.dateStr)}
                        className="p-3 bg-[#EFEAE0]/50 border border-[#E2DDD3] rounded-xl hover:border-[#171717] cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-[#171717]">{occ.displayDate}</div>
                          <div className="text-[11px] text-[#77736C] font-mono">{occ.receiptIds.length} sequential traces</div>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#059669] flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Reconstruct &rarr;</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

RitualSection.displayName = 'RitualSection';
