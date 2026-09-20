import type { LifeReceipt } from '../types/receipt';

export interface AnomalyDay {
  id: string;
  dateStr: string; // YYYY-MM-DD
  displayDate: string;
  normalRangeText: string;
  actualCount: number;
  multiplier: number;
  reasons: string[];
  receiptIds: string[];
}

export function detectAnomalies(receipts: LifeReceipt[]): AnomalyDay[] {
  // Group receipts by YYYY-MM-DD
  const dailyGroups: Record<string, LifeReceipt[]> = {};
  receipts.forEach(r => {
    const dayKey = r.timestamp.substring(0, 10);
    if (!dailyGroups[dayKey]) {
      dailyGroups[dayKey] = [];
    }
    dailyGroups[dayKey].push(r);
  });

  const dayKeys = Object.keys(dailyGroups);
  if (dayKeys.length === 0) return [];

  const counts = dayKeys.map(k => dailyGroups[k].length);
  const total = counts.reduce((a, b) => a + b, 0);
  const mean = total / counts.length;

  const variance = counts.reduce((acc, c) => acc + Math.pow(c - mean, 2), 0) / counts.length;
  const stdDev = Math.sqrt(variance);

  const threshold = mean + 1.2 * stdDev;

  const anomalies: AnomalyDay[] = [];

  dayKeys.forEach(dayKey => {
    const group = dailyGroups[dayKey];
    if (group.length >= Math.max(Math.round(threshold), 4)) {
      const dateObj = new Date(group[0].timestamp);
      const displayDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const mult = Math.round((group.length / (mean || 1)) * 10) / 10;
      const reasons: string[] = [];

      // Calculate category breakdowns
      const catCounts: Record<string, number> = {};
      group.forEach(r => {
        catCounts[r.category] = (catCounts[r.category] || 0) + 1;
      });

      if (catCounts.place && catCounts.place >= 2) {
        reasons.push(`${catCounts.place}× location check-ins in a single day`);
      }
      if (catCounts.purchase && catCounts.purchase >= 2) {
        reasons.push(`${catCounts.purchase} recorded purchases`);
      }
      if (group.some(r => r.tags?.includes('exhibition') || r.tags?.includes('opening'))) {
        reasons.push('Gallery exhibition opening night spike');
      } else if (group.some(r => r.tags?.includes('studio') || r.tags?.includes('diy'))) {
        reasons.push('Studio workspace construction push');
      } else if (group.some(r => r.tags?.includes('alibaug') || r.tags?.includes('coastal'))) {
        reasons.push('Coastal retreat exploration flurry');
      } else {
        reasons.push(`${mult}× higher activity density than daily average`);
      }

      anomalies.push({
        id: `anomaly-${dayKey}`,
        dateStr: dayKey,
        displayDate,
        normalRangeText: `${Math.max(1, Math.floor(mean - 0.5 * stdDev))}–${Math.ceil(mean + 0.5 * stdDev)} traces/day`,
        actualCount: group.length,
        multiplier: mult,
        reasons,
        receiptIds: group.map(r => r.id)
      });
    }
  });

  return anomalies.sort((a, b) => b.actualCount - a.actualCount);
}
