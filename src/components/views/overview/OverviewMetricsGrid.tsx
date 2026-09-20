import React, { memo } from 'react';
import { Layers, MapPin, Music, Receipt, Calendar, BookMarked } from 'lucide-react';

import type { OverviewMetrics } from '../../../types/ui';

interface OverviewMetricsGridProps {
  metrics: OverviewMetrics;
}

export const OverviewMetricsGrid: React.FC<OverviewMetricsGridProps> = memo(({ metrics }) => {
  const statCards = [
    { label: 'digital traces', value: metrics.totalTraces, color: 'text-[#171717]', icon: Layers },
    { label: 'places', value: metrics.placesCount, color: 'text-[#2563EB]', icon: MapPin },
    { label: 'songs', value: metrics.songsCount, color: 'text-[#7C3AED]', icon: Music },
    { label: 'purchases', value: metrics.purchasesCount, color: 'text-[#D97706]', icon: Receipt },
    { label: 'events', value: metrics.eventsCount, color: 'text-[#EA580C]', icon: Calendar },
    { label: 'chapters', value: metrics.chaptersCount, color: 'text-[#059669]', icon: BookMarked }
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      data-testid="overview-metrics-grid"
    >
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            data-testid={`stat-card-${stat.label.replace(/\s+/g, '-')}`}
            className="bg-[#EFEAE0]/30 border border-[#E2DDD3] rounded-xl p-4 text-center space-y-1.5 hover:border-[#171717]/30 transition-all hover:bg-[#EFEAE0]/50"
          >
            <div className="flex items-center justify-center space-x-1.5">
              <Icon className={`w-3.5 h-3.5 ${stat.color}`} aria-hidden="true" />
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
  );
});

OverviewMetricsGrid.displayName = 'OverviewMetricsGrid';
