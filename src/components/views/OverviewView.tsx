import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, Compass, Shuffle, MapPin, Music, Receipt, Calendar, AlertTriangle, Layers, BookMarked, Camera, MessageSquare } from 'lucide-react';

import { getOverviewMetrics, GLOBAL_ANOMALIES, GLOBAL_PATTERNS, GLOBAL_RECEIPTS } from '../../engine/receiptEngine';
import type { LifeReceipt } from '../../types/receipt';

interface OverviewViewProps {
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onFollowThread: (receipt: LifeReceipt) => void;
  onReconstructDay: (dateStr: string) => void;
  onOpenDemoTour: () => void;
  onNavigateTab: (tab: 'overview' | 'receipts' | 'connections' | 'patterns' | 'compare' | 'chapters' | 'story') => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectReceipt,
  onFollowThread,
  onReconstructDay,
  onOpenDemoTour,
  onNavigateTab
}) => {
  const metrics = getOverviewMetrics();
  const [selectedPulsePeriod, setSelectedPulsePeriod] = useState<string | null>(null);

  // Group receipts by month for Life Pulse
  const monthGroups: Record<string, LifeReceipt[]> = {
    'March 2026': GLOBAL_RECEIPTS.filter(r => new Date(r.timestamp).getMonth() === 2),
    'April 2026': GLOBAL_RECEIPTS.filter(r => new Date(r.timestamp).getMonth() === 3),
    'May 2026': GLOBAL_RECEIPTS.filter(r => new Date(r.timestamp).getMonth() === 4),
    'June 2026': GLOBAL_RECEIPTS.filter(r => new Date(r.timestamp).getMonth() === 5),
    'July 2026': GLOBAL_RECEIPTS.filter(r => new Date(r.timestamp).getMonth() === 6),
    'August 2026': GLOBAL_RECEIPTS.filter(r => new Date(r.timestamp).getMonth() === 7)
  };

  const heroReceipt = GLOBAL_RECEIPTS.find(r => r.id === 'rcpt-053') || GLOBAL_RECEIPTS[0];

  const handleRandomExplore = () => {
    const randomIndex = Math.floor(Math.random() * GLOBAL_RECEIPTS.length);
    onSelectReceipt(GLOBAL_RECEIPTS[randomIndex]);
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

        {/* Judging Demo Quick Buttons — Clear Priority */}
        <div className="flex items-center gap-3">
          {/* Dominant Primary CTA */}
          <button
            onClick={onOpenDemoTour}
            className="px-5 py-2.5 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#F7F4EE]" />
            <span>Show me a story</span>
          </button>

          {/* Secondary Ghost CTA */}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'digital traces', value: metrics.totalTraces, color: 'text-[#171717]', icon: Layers },
          { label: 'places', value: metrics.placesCount, color: 'text-[#2563EB]', icon: MapPin },
          { label: 'songs', value: metrics.songsCount, color: 'text-[#7C3AED]', icon: Music },
          { label: 'purchases', value: metrics.purchasesCount, color: 'text-[#D97706]', icon: Receipt },
          { label: 'events', value: metrics.eventsCount, color: 'text-[#EA580C]', icon: Calendar },
          { label: 'chapters', value: metrics.chaptersCount, color: 'text-[#059669]', icon: BookMarked }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-[#EFEAE0]/30 border border-[#E2DDD3] rounded-xl p-4 text-center space-y-1.5 hover:border-[#171717]/30 transition-all hover:bg-[#EFEAE0]/50"
            >
              <div className="flex items-center justify-center space-x-1.5">
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                <div className={`font-serif text-3xl sm:text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
              <div className="text-[11px] font-mono text-[#77736C] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* HERO MOMENT SECTION — Clear Spacing & Button Hierarchy */}
      <div className="bg-[#171717] text-[#F7F4EE] rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono text-[#EFEAE0]/70 border-b border-[#F7F4EE]/10 pb-4">
          <span className="flex items-center space-x-1.5 uppercase tracking-widest text-[#059669] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>DISCOVERED HERO MOMENT</span>
          </span>
          <span className="bg-[#F7F4EE]/10 px-2.5 py-1 rounded text-[11px]">JUNE 14 &bull; BANDRA WEST</span>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
            “We found something.”
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#EFEAE0]/90">
            5 digital receipts. 1 single evening. 1 connected story.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { icon: Music, label: '🎵 Song', detail: 'Max Richter' },
            { icon: Receipt, label: '💳 Purchase', detail: 'Izumi Ramen' },
            { icon: Camera, label: '📸 Photo', detail: 'Ramen bowl' },
            { icon: MapPin, label: '📍 Place', detail: 'Carter Road' },
            { icon: MessageSquare, label: '💬 Message', detail: 'High tide draft' }
          ].map((item, i) => (
            <div key={i} className="bg-[#F7F4EE]/10 p-3 rounded-lg border border-[#F7F4EE]/15 text-xs font-mono space-y-1">
              <div className="font-bold text-[#F7F4EE]">{item.label}</div>
              <div className="text-[11px] text-[#EFEAE0]/70 truncate">{item.detail}</div>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#F7F4EE]/15">
          <p className="text-xs text-[#EFEAE0]/80 font-sans max-w-xl leading-relaxed">
            “These records were never designed to tell a story. But together, they do.”
          </p>
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
            {/* Secondary Text Link */}
            <button
              onClick={() => onFollowThread(heroReceipt)}
              className="text-[#EFEAE0]/90 hover:text-white font-mono text-xs font-bold transition-all flex items-center space-x-1.5 hover:underline"
            >
              <span>Follow the thread</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Primary Solid Action */}
            <button
              onClick={() => onReconstructDay('2026-06-14')}
              className="px-5 py-3 rounded-xl bg-[#F7F4EE] text-[#171717] hover:bg-white font-mono text-xs font-bold transition-all shadow-md flex items-center space-x-2"
            >
              <span>Reconstruct this day</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ANOMALY CARD SNAPSHOT */}
      {GLOBAL_ANOMALIES.length > 0 && (
        <div className="p-6 rounded-2xl border border-[#E2DDD3] bg-[#EFEAE0]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-[#E11D48] uppercase tracking-wider">UNUSUAL ACTIVITY DAY DETECTED</span>
              <div className="text-base font-bold text-[#171717] font-serif">{GLOBAL_ANOMALIES[0].displayDate}</div>
              <div className="text-xs text-[#77736C]">
                {GLOBAL_ANOMALIES[0].actualCount} traces recorded ({GLOBAL_ANOMALIES[0].multiplier}× higher than daily baseline)
              </div>
            </div>
          </div>

          <button
            onClick={() => onReconstructDay(GLOBAL_ANOMALIES[0].dateStr)}
            className="px-5 py-2.5 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] text-xs font-mono font-bold transition-all shadow-sm self-stretch sm:self-auto flex items-center justify-center space-x-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reconstruct this day &rarr;</span>
          </button>
        </div>
      )}

      {/* LIFE PULSE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#171717]">Life Pulse</h3>
            <p className="text-xs text-[#77736C] font-mono">Horizontal activity density across 6 months. Hover for details, click to zoom.</p>
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

      {/* WHAT WE FOUND SECTION */}
      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#171717]">What We Found</h3>
          <p className="text-xs text-[#77736C] font-mono">Calculated from client-side analytical data engines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GLOBAL_PATTERNS.slice(0, 4).map(pattern => (
            <div
              key={pattern.id}
              onClick={() => onNavigateTab('patterns')}
              className="p-6 rounded-xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0]/80 transition-all cursor-pointer space-y-3 group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-[#EFEAE0] text-[11px] font-mono font-bold text-[#171717] uppercase">
                  {pattern.type} PATTERN
                </span>
                <span className="text-xs font-mono font-bold text-[#059669]">
                  {pattern.statHighlight}
                </span>
              </div>

              <h4 className="font-serif text-xl font-bold text-[#171717] group-hover:underline">
                {pattern.title}
              </h4>

              <p className="text-xs text-[#77736C] leading-relaxed">
                {pattern.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#171717]">
                <span>{pattern.evidenceCount} matching traces</span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>Explore pattern</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
