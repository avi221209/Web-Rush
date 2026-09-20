import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '../brand/Logo';

interface IntroViewProps {
  onEnterApp: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#171717] flex flex-col justify-between p-6 sm:p-12 selection:bg-[#171717] selection:text-[#F7F4EE]">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <Logo variant="full" size="md" showTagline />
        <span className="text-xs font-mono text-[#77736C] bg-[#EFEAE0] px-3 py-1 rounded-full border border-[#E2DDD3]">
          WebRush Hackathon Submission
        </span>
      </div>

      {/* Main Cinematic Opening Content */}
      <main className="max-w-4xl mx-auto w-full py-16 sm:py-24 space-y-10 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EFEAE0] border border-[#E2DDD3] text-xs font-mono text-[#171717] animate-in fade-in duration-500">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Interactive Digital Museum &bull; Personal Archaeology</span>
        </div>

        <div className="space-y-6">
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717] leading-[1.1]">
            Your life leaves traces.
          </h1>
          <p className="font-sans text-xl sm:text-2xl text-[#77736C] max-w-2xl font-normal leading-relaxed">
            Songs. Places. Purchases. Photos. Searches. Messages.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#E2DDD3]">
          <p className="font-sans text-sm sm:text-base text-[#77736C] tracking-wide">
            Individually, they are fragments.
          </p>
          <div className="font-serif italic text-3xl sm:text-4xl text-[#171717] font-semibold">
            “Together, they become a story.”
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#171717] text-[#F7F4EE] hover:bg-[#333] font-mono text-sm font-bold tracking-wider flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all group focus:outline-none"
          >
            <span>EXPLORE THIS LIFE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <span className="text-xs font-mono text-[#77736C] self-center">
            Frontend-only dataset analysis &bull; ~200 digital traces
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full text-center sm:text-left text-xs font-mono text-[#A39E93] pt-8 border-t border-[#E2DDD3]/60 flex flex-col sm:flex-row justify-between gap-2">
        <span>LIFE//RECEIPTS &bull; Archival Paper Theme #F7F4EE</span>
        <span>Press anywhere to enter</span>
      </footer>
    </div>
  );
};
