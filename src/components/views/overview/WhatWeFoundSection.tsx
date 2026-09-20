import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';

import type { Pattern } from '../../../types/receipt';

interface WhatWeFoundSectionProps {
  patterns: Pattern[];
  onNavigateTab: (tab: 'patterns') => void;
}

export const WhatWeFoundSection: React.FC<WhatWeFoundSectionProps> = memo(({
  patterns,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl font-bold text-[#171717]">What We Found</h3>
        <p className="text-xs text-[#77736C] font-mono">Calculated from client-side analytical data engines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patterns.slice(0, 4).map(pattern => (
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
  );
});

WhatWeFoundSection.displayName = 'WhatWeFoundSection';
