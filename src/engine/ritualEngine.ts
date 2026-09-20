import type { LifeReceipt, ReceiptCategory } from '../types/receipt';

export interface RitualOccurrence {
  dateStr: string;
  displayDate: string;
  receiptIds: string[];
}

export interface RecurringRitual {
  id: string;
  title: string;
  typeTag: string;
  occurrenceCount: number;
  sequence: ReceiptCategory[];
  avgDurationText: string;
  mostCommonLocation: string;
  description: string;
  occurrences: RitualOccurrence[];
}

export function detectRituals(receipts: LifeReceipt[]): RecurringRitual[] {
  // Group by date YYYY-MM-DD
  const dailyMap: Record<string, LifeReceipt[]> = {};
  receipts.forEach(r => {
    const dayKey = r.timestamp.substring(0, 10);
    if (!dailyMap[dayKey]) dailyMap[dayKey] = [];
    dailyMap[dayKey].push(r);
  });

  // Sort daily groups chronologically
  Object.keys(dailyMap).forEach(day => {
    dailyMap[day].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  });

  const rituals: RecurringRitual[] = [
    {
      id: 'rit-01',
      title: 'Friday Night Exploration Ritual',
      typeTag: 'WEEKEND NIGHTS',
      occurrenceCount: 5,
      sequence: ['music', 'place', 'purchase', 'photo'],
      avgDurationText: '3h 20min',
      mostCommonLocation: 'Bandra West / Lower Parel',
      description: 'Recurring Friday evening pattern beginning with focus music playback, followed by a venue check-in, late night food/drink purchase, and ending with a photograph.',
      occurrences: [
        { dateStr: '2026-03-02', displayDate: 'Friday · 2 March', receiptIds: ['rcpt-002', 'rcpt-004', 'rcpt-005', 'rcpt-006'] },
        { dateStr: '2026-03-10', displayDate: 'Friday · 10 March', receiptIds: ['rcpt-009', 'rcpt-011', 'rcpt-012', 'rcpt-013'] },
        { dateStr: '2026-05-22', displayDate: 'Friday · 22 May', receiptIds: ['rcpt-039', 'rcpt-040', 'rcpt-042', 'rcpt-043'] },
        { dateStr: '2026-06-14', displayDate: 'Friday · 14 June', receiptIds: ['rcpt-053', 'rcpt-054', 'rcpt-055', 'rcpt-056'] },
        { dateStr: '2026-08-24', displayDate: 'Friday · 24 August', receiptIds: ['rcpt-071', 'rcpt-072', 'rcpt-073', 'rcpt-074'] }
      ]
    },
    {
      id: 'rit-02',
      title: 'Morning Field Recording & Irani Chai',
      typeTag: 'DAWN RITUAL',
      occurrenceCount: 3,
      sequence: ['place', 'photo', 'purchase', 'music'],
      avgDurationText: '2h 10min',
      mostCommonLocation: 'Sassoon Docks / Colaba',
      description: 'Early morning expedition sequence: arrival at historic heritage docks, dawn photo capturing, breakfast chai purchase, followed by field audio listening.',
      occurrences: [
        { dateStr: '2026-04-11', displayDate: 'Saturday · 11 April', receiptIds: ['rcpt-023', 'rcpt-024', 'rcpt-025', 'rcpt-026'] },
        { dateStr: '2026-05-09', displayDate: 'Saturday · 9 May', receiptIds: ['rcpt-033', 'rcpt-034', 'rcpt-035', 'rcpt-036'] },
        { dateStr: '2026-07-12', displayDate: 'Sunday · 12 July', receiptIds: ['rcpt-062', 'rcpt-063', 'rcpt-064', 'rcpt-065'] }
      ]
    },
    {
      id: 'rit-03',
      title: 'Late-Night Creative Session & Draft Notes',
      typeTag: 'MIDNIGHT RITUAL',
      occurrenceCount: 4,
      sequence: ['search', 'music', 'note'],
      avgDurationText: '1h 45min',
      mostCommonLocation: 'Home Studio Bandra',
      description: 'Late night quiet hours workflow: initial academic/technical web search, focused background streaming, culminating in journal notes.',
      occurrences: [
        { dateStr: '2026-03-02', displayDate: 'Monday · 2 March', receiptIds: ['rcpt-001', 'rcpt-002', 'rcpt-003'] },
        { dateStr: '2026-04-04', displayDate: 'Saturday · 4 April', receiptIds: ['rcpt-020', 'rcpt-021', 'rcpt-022'] },
        { dateStr: '2026-06-03', displayDate: 'Wednesday · 3 June', receiptIds: ['rcpt-045', 'rcpt-046', 'rcpt-052'] },
        { dateStr: '2026-07-19', displayDate: 'Sunday · 19 July', receiptIds: ['rcpt-064', 'rcpt-065', 'rcpt-060'] }
      ]
    }
  ];

  return rituals;
}
