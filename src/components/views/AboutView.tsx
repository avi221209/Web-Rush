import React from 'react';
import { BookOpen, ShieldCheck, Cpu, Layers, Heart, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigateTab: (tab: 'overview' | 'receipts' | 'connections' | 'patterns' | 'compare' | 'chapters' | 'story') => void;
  onExploreArchive?: () => void;
  onOpenSettings?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-12 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2 border-b border-[#E2DDD3] pb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#77736C]">
          <BookOpen className="w-4 h-4 text-[#171717]" />
          <span>ABOUT THE ARCHIVE & METHODOLOGY</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
          Understanding Life//Receipts
        </h1>
        <p className="text-sm text-[#77736C] font-sans leading-relaxed">
          How raw digital footprints transform into connected moments, behavioral patterns, and personal narrative chapters.
        </p>
      </div>

      {/* Section 1: What is a Digital Trace? */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#171717] flex items-center space-x-2">
          <Layers className="w-5 h-5 text-[#2563EB]" />
          <span>1. What is a Digital Trace?</span>
        </h2>
        <p className="text-sm text-[#77736C] font-sans leading-relaxed">
          Every day, modern digital devices record hundreds of passive micro-interactions. A song played on Spotify, a GPS location check-in on Google Maps, an online coffee purchase, a quick polaroid photo, a saved message draft, or a late-night search query. Individually, these fragments appear disposable and mundane.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
          {[
            { cat: '🎵 Songs', desc: 'Audio streams & listening habits' },
            { cat: '📍 Places', desc: 'GPS check-ins & venue visits' },
            { cat: '💳 Purchases', desc: 'Digital receipts & transactions' },
            { cat: '📸 Photos', desc: 'Camera timestamps & EXIF metadata' },
            { cat: '💬 Messages', desc: 'Communication logs & saved drafts' },
            { cat: '🔍 Searches', desc: 'Web queries & curiosity trails' }
          ].map((item, i) => (
            <div key={i} className="p-3 bg-[#EFEAE0]/50 border border-[#E2DDD3] rounded-xl space-y-1">
              <div className="font-bold text-[#171717]">{item.cat}</div>
              <div className="text-[11px] text-[#77736C]">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: How Traces Get Connected */}
      <section className="space-y-4 pt-4 border-t border-[#E2DDD3]">
        <h2 className="font-serif text-2xl font-bold text-[#171717] flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-[#7C3AED]" />
          <span>2. How Traces Get Connected</span>
        </h2>
        <p className="text-sm text-[#77736C] font-sans leading-relaxed">
          The core mechanic of LIFE//RECEIPTS is its client-side relationship engine (`connectionEngine.ts`). Instead of relying on manual tagging or simple chronological lists, the engine evaluates candidate pairs of traces across five dimensions:
        </p>
        <ul className="space-y-2 text-xs font-mono text-[#171717] bg-[#EFEAE0]/40 p-4 rounded-2xl border border-[#E2DDD3]">
          <li className="flex items-start space-x-2">
            <span className="font-bold text-[#059669]">&bull; Temporal Proximity:</span>
            <span>Traces occurring within 30 minutes to 2 hours earn high proximity weighting.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold text-[#2563EB]">&bull; Spatial Similarity:</span>
            <span>Identical venue names or nearby GPS coordinates link check-ins with photos and food purchases.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold text-[#7C3AED]">&bull; Shared Entities:</span>
            <span>Matching music artists, contacts, or venues form recurring entity bonds.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold text-[#D97706]">&bull; Category Synergy:</span>
            <span>High-synergy combinations like <code>music + place</code> or <code>event + photo</code> boost relationship scores.</span>
          </li>
        </ul>
      </section>

      {/* Section 3: Privacy & Data-Handling Statement */}
      <section className="p-6 rounded-2xl bg-[#059669]/10 border border-[#059669]/30 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#059669] uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>PRIVACY & DATA PROTECTION GUARANTEE</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-[#171717]">
          Your Data Never Leaves Your Browser.
        </h3>
        <p className="text-xs text-[#77736C] font-sans leading-relaxed">
          Because digital receipts contain deeply personal information—location check-ins, financial purchases, private notes, and message logs—LIFE//RECEIPTS is engineered as a <strong>100% frontend-only application</strong>. There is zero server-side storage, zero telemetry tracking, no external API calls, and no database persistence. All analysis runs entirely in client memory inside your web browser.
        </p>
      </section>

      {/* Section 4: Why We Built This */}
      <section className="space-y-4 pt-4 border-t border-[#E2DDD3]">
        <h2 className="font-serif text-2xl font-bold text-[#171717] flex items-center space-x-2">
          <Heart className="w-5 h-5 text-[#E11D48]" />
          <span>4. Why We Built This</span>
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#171717] leading-relaxed bg-[#EFEAE0]/50 p-6 rounded-2xl border border-[#E2DDD3]">
          “We live in an age where our lives are continuously documented by software, yet we rarely see the bigger picture. LIFE//RECEIPTS was created for the WebRush hackathon to prove that data does not have to feel like a corporate admin spreadsheet. When treated with editorial care, raw digital fragments become a mirror—allowing us to discover the unwritten stories of where we've been, who we shared time with, and how we grew.”
        </p>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => onNavigateTab('overview')}
            className="px-6 py-3 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] font-mono text-xs font-bold flex items-center space-x-2 shadow-md transition-all"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
