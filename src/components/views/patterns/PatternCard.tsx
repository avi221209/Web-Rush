import React, { memo } from 'react';
import { Sparkles, Layers, BarChart3, Clock, MapPin, Search, Users, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

import { getCategoryInfo } from '../../../utils/categoryUtils';
import type { LifeReceipt, Pattern } from '../../../types/receipt';

interface PatternCardProps {
  pattern: Pattern;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  receipts: LifeReceipt[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const PatternCard: React.FC<PatternCardProps> = memo(({
  pattern,
  isExpanded,
  onToggleExpand,
  receipts,
  onSelectReceipt
}) => {
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

  const Icon = getPatternIcon(pattern.type);

  return (
    <div className="bg-[#F7F4EE] border border-[#E2DDD3] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm hover:border-[#171717]/40 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DDD3] pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#EFEAE0] text-[#171717] border border-[#E2DDD3]">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#77736C]">
              <span className="uppercase font-bold text-[#171717]">{pattern.type} PATTERN</span>
              <span>&bull;</span>
              <span>{pattern.evidenceCount} traces</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#171717]">
              {pattern.title}
            </h3>
          </div>
        </div>

        <div className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-[#059669]/10 text-[#059669] border border-[#059669]/30 text-xs font-mono font-bold">
          {pattern.statHighlight}
        </div>
      </div>

      <p className="text-sm text-[#77736C] font-sans leading-relaxed">
        {pattern.description}
      </p>

      {/* Detail Explanation Box */}
      <div className="p-4 rounded-xl bg-[#EFEAE0]/50 border border-[#E2DDD3] space-y-1.5 text-xs font-mono">
        <div className="flex items-center space-x-1.5 font-bold text-[#171717]">
          <ShieldCheck className="w-4 h-4 text-[#059669]" />
          <span>STATISTICAL DERIVATION:</span>
        </div>
        <p className="text-[#77736C] leading-relaxed">
          {pattern.detailExplanation}
        </p>
      </div>

      {/* Expand/Collapse Evidence Traces */}
      <div className="pt-2">
        <button
          onClick={() => onToggleExpand(pattern.id)}
          className="text-xs font-mono text-[#2563EB] hover:underline flex items-center space-x-1"
        >
          <span>{isExpanded ? 'Hide evidence traces' : `Show evidence (${pattern.receiptIds.length} receipts)`}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t border-[#E2DDD3]/60">
            {pattern.receiptIds.map(id => {
              const rcpt = receipts.find(r => r.id === id);
              if (!rcpt) return null;
              const info = getCategoryInfo(rcpt.category);
              const CatIcon = info.icon;

              return (
                <div
                  key={rcpt.id}
                  onClick={() => onSelectReceipt(rcpt)}
                  className="p-3 bg-[#EFEAE0]/40 border border-[#E2DDD3] rounded-xl hover:border-[#171717] cursor-pointer transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="flex items-center space-x-1 text-[#77736C]">
                      <CatIcon className="w-3 h-3" />
                      <span>{info.label}</span>
                    </span>
                    <span className="text-[#77736C]">
                      {new Date(rcpt.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#171717] group-hover:underline truncate">
                    {rcpt.title}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

PatternCard.displayName = 'PatternCard';
