import React from 'react';
import { Logo } from '../brand/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E2DDD3] bg-[#EFEAE0]/60 py-10 mt-20 text-[#77736C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 flex flex-col items-center">
        <Logo variant="full" size="sm" />
        <p className="font-serif italic text-base text-[#171717]">
          “One dataset. Hundreds of moments. Infinite stories.”
        </p>
        <div className="text-xs font-sans tracking-wide text-[#77736C]">
          Frontend-only digital archaeology experience &bull; Built for WebRush Hackathon
        </div>
        <div className="text-[11px] font-mono text-[#A39E93]">
          No backend &bull; Zero persistence requirement &bull; Archival Paper Theme #F7F4EE
        </div>
      </div>
    </footer>
  );
};
