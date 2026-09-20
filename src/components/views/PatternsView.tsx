import React, { useState } from 'react';
import { Sparkles, Layers, BarChart3, Clock, MapPin, Search, Users, ChevronDown, ChevronUp, AlertTriangle, Repeat, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';

import { getCategoryInfo } from '../../lib/categoryUtils';
import { GLOBAL_ANOMALIES, GLOBAL_PATTERNS, GLOBAL_RECEIPTS, GLOBAL_RITUALS } from '../../engine/receiptEngine';
import type { LifeReceipt, Pattern } from '../../types/receipt';

interface PatternsViewProps {
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onReconstructDay: (dateStr: string) => void;
}

export const PatternsView: React.FC<PatternsViewProps> = ({
  onSelectReceipt,
  onReconstructDay
}) => {
  const [expandedPatternId, setExpandedPatternId] = useState<string | null>('pat-01');
  const [expandedRitualId, setExpandedRitualId] = useState<string | null>(null);

  const toggleExpandPattern = (id: string) => {
    setExpandedPatternId(prev => (prev === id ? null : id));
  };

  const toggleExpandRitual = (id: string) => {
    setExpandedRitualId(prev => (prev === id ? null : id));
  };

  const getPatternIcon = (type: Pattern['type']) => {
    switch (type) {
      case 'temporal': return Clock;
      case 'location': return MapPin;
      case 'category': return Layers;
      case 'purchase': return BarChart3;
      case 'search': return Search;
      case 'social': return Users;
      default: return Sparkles;
    }
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

      {/* PRIORITY 4 — ANOMALY DETECTION (UNUSUAL DAYS SECTION) */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#E11D48]">
          <AlertTriangle className="w-4 h-4 text-[#E11D48]" />
          <span>UNUSUAL DAYS DETECTED (&gt;1.2&sigma; SPIKES)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GLOBAL_ANOMALIES.slice(0, 4).map(anomaly => (
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

      {/* PRIORITY 5 — RECURRING RITUAL DETECTION SECTION */}
      <div className="space-y-4 pt-6 border-t border-[#E2DDD3]">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#059669]">
          <Repeat className="w-4 h-4 text-[#059669]" />
          <span>RECURRING RITUALS (3+ CATEGORIES ACROSS 3+ WEEKS)</span>
        </div>

        <div className="space-y-4">
          {GLOBAL_RITUALS.map(ritual => {
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
                            <Icon className="w-3.5 h-3.5" />
                            <span>{info.label}</span>
                          </span>
                          {i < ritual.sequence.length - 1 && <span className="text-[#77736C] font-bold">&rarr;</span>}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs font-mono text-[#77736C]">
                    Avg duration: <strong className="text-[#171717]">{ritual.avgDurationText}</strong> &bull; Location: <strong className="text-[#171717]">{ritual.mostCommonLocation}</strong>
                  </div>

                  <button
                    onClick={() => toggleExpandRitual(ritual.id)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#E2DDD3] bg-[#EFEAE0] hover:bg-[#E2DDD3] text-xs font-mono font-bold text-[#171717] transition-all flex items-center space-x-1"
                  >
                    <span>{isExpanded ? 'Hide instances' : 'See all instances'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded Instances Collapsed Day Timelines */}
                {isExpanded && (
                  <div className="pt-4 border-t border-[#E2DDD3] space-y-3 animate-in fade-in duration-200">
                    <span className="text-xs font-mono font-bold text-[#171717] block uppercase">
                      DETECTED RITUAL OCCURRENCES ({ritual.occurrences.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ritual.occurrences.map((occ, i) => (
                        <div
                          key={i}
                          onClick={() => onReconstructDay(occ.dateStr)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onReconstructDay(occ.dateStr); } }}
                          role="button"
                          tabIndex={0}
                          aria-label={`Reconstruct day: ${occ.displayDate}`}
                          className="p-3.5 rounded-xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0] transition-colors cursor-pointer flex items-center justify-between font-mono text-xs group"
                        >
                          <span className="font-bold text-[#171717] flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#77736C]" />
                            <span>{occ.displayDate}</span>
                          </span>
                          <span className="text-[#2563EB] group-hover:underline font-bold">
                            Reconstruct day &rarr;
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

      {/* PRIORITY 1 — EVIDENCE-BACKED INSIGHTS WALL */}
      <div className="space-y-6 pt-6 border-t border-[#E2DDD3]">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#171717]">Calculated Insight Cards</h2>
          <p className="text-xs text-[#77736C] font-mono">Click "Show evidence" on any card to reveal raw counts and confidence scoring.</p>
        </div>

        <div className="space-y-6">
          {GLOBAL_PATTERNS.map(pattern => {
            const Icon = getPatternIcon(pattern.type);
            const isExpanded = expandedPatternId === pattern.id;
            const matchingReceipts = GLOBAL_RECEIPTS.filter(r => pattern.receiptIds.includes(r.id));

            return (
              <div
                key={pattern.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-[#F7F4EE] border-[#171717] shadow-md'
                    : 'bg-[#EFEAE0]/50 border-[#E2DDD3] hover:border-[#171717]/40'
                }`}
              >
                {/* Card Header */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#171717] text-[#F7F4EE] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#F7F4EE]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-[#EFEAE0] text-[10px] font-mono font-bold text-[#171717] uppercase">
                          {pattern.type} PATTERN
                        </span>
                        <span className="text-xs font-mono font-bold text-[#059669]">
                          {pattern.statHighlight}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[#171717]">
                        {pattern.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpandPattern(pattern.id)}
                    className="px-4 py-2 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] font-mono text-xs font-bold transition-all shadow-sm self-end sm:self-center flex items-center space-x-1.5"
                  >
                    <span>{isExpanded ? 'Hide evidence' : 'Show evidence'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* PRIORITY 1 — EVIDENCE PANEL */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#E2DDD3] space-y-6 bg-[#F7F4EE] animate-in fade-in duration-200">
                    {/* Evidence Box */}
                    <div className="p-5 rounded-xl bg-[#EFEAE0]/90 border border-[#E2DDD3] space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-[#E2DDD3] pb-2">
                        <span className="font-bold text-[#171717] flex items-center space-x-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#059669]" />
                          <span>EVIDENCE & DATASET CALCULATIONS</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-[#059669] text-white text-[10px] font-bold">
                          Confidence: High
                        </span>
                      </div>

                      <p className="text-[#171717] leading-relaxed">
                        {pattern.detailExplanation}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[#77736C]">
                        <span>Dataset evidence count: <strong className="text-[#171717]">{matchingReceipts.length} traces</strong></span>
                        <span>Source: Client-side Pattern Engine</span>
                      </div>
                    </div>

                    {/* Underlying Evidence Receipts */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-[#171717]">
                        <span className="font-bold uppercase tracking-wider">SUPPORTING RECEIPT TRACES ({matchingReceipts.length})</span>
                        <span className="text-[#77736C]">Click any trace to inspect</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {matchingReceipts.map(rcpt => {
                          const catInfo = getCategoryInfo(rcpt.category);
                          const RcptIcon = catInfo.icon;
                          const formattedDate = new Date(rcpt.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          });

                          return (
                            <div
                              key={rcpt.id}
                              onClick={() => onSelectReceipt(rcpt)}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectReceipt(rcpt); } }}
                              role="button"
                              tabIndex={0}
                              aria-label={`View receipt: ${rcpt.title}`}
                              className="p-3.5 rounded-xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0] transition-colors cursor-pointer space-y-2 group shadow-sm"
                            >
                              <div className="flex items-center justify-between">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${catInfo.badgeBg}`}>
                                  <RcptIcon className="w-3 h-3 inline mr-1" />
                                  {catInfo.label.toUpperCase()}
                                </span>
                                <span className="text-[10px] font-mono text-[#77736C]">
                                  {formattedDate}
                                </span>
                              </div>

                              <div className="text-xs font-bold text-[#171717] group-hover:underline truncate">
                                {rcpt.title}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
