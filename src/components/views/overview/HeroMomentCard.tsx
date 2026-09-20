import React, { memo } from 'react';
import { Sparkles, ArrowRight, Music, Receipt, Camera, MapPin, MessageSquare } from 'lucide-react';

import type { LifeReceipt } from '../../../types/receipt';

interface HeroMomentCardProps {
  heroReceipt: LifeReceipt;
  onFollowThread: (receipt: LifeReceipt) => void;
  onReconstructDay: (dateStr: string) => void;
}

export const HeroMomentCard: React.FC<HeroMomentCardProps> = memo(({
  heroReceipt,
  onFollowThread,
  onReconstructDay
}) => {
  const heroItems = [
    { icon: Music, label: '🎵 Song', detail: 'Max Richter' },
    { icon: Receipt, label: '💳 Purchase', detail: 'Izumi Ramen' },
    { icon: Camera, label: '📸 Photo', detail: 'Ramen bowl' },
    { icon: MapPin, label: '📍 Place', detail: 'Carter Road' },
    { icon: MessageSquare, label: '💬 Message', detail: 'High tide draft' }
  ];

  return (
    <div
      data-testid="hero-moment-card"
      className="bg-[#171717] text-[#F7F4EE] rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden"
    >
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
        {heroItems.map((item, i) => (
          <div
            key={i}
            className="bg-[#F7F4EE]/10 p-3 rounded-lg border border-[#F7F4EE]/15 text-xs font-mono space-y-1"
          >
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
          {/* Secondary Link */}
          <button
            onClick={() => onFollowThread(heroReceipt)}
            data-testid="hero-secondary-link"
            aria-label="Follow the thread of connected receipts"
            className="text-[#EFEAE0]/90 hover:text-white font-mono text-xs font-bold transition-all flex items-center space-x-1.5 hover:underline"
          >
            <span>Follow the thread</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onReconstructDay('2026-06-14')}
            data-testid="hero-primary-cta"
            aria-label="Reconstruct June 14 day"
            className="px-5 py-3 rounded-xl bg-[#F7F4EE] text-[#171717] hover:bg-white font-mono text-xs font-bold transition-all shadow-md flex items-center space-x-2"
          >
            <span>Reconstruct this day</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

HeroMomentCard.displayName = 'HeroMomentCard';
