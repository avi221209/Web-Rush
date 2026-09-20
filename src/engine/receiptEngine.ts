import { ALL_RECEIPTS } from '../data/receipts';

import { detectChapters } from './chapterEngine';
import { getAllConnections, getConnectionsForReceipt } from './connectionEngine';
import { detectMoments } from './momentEngine';
import { detectPatterns } from './patternEngine';
import { buildStoryNodes } from './storyEngine';
import { detectAnomalies } from './anomalyEngine';
import { detectRituals } from './ritualEngine';
import { comparePeriods } from './comparisonEngine';

import type { Chapter, LifeReceipt, Moment, Pattern, ReceiptCategory, ReceiptConnection, StoryNode } from '../types/receipt';
import type { AnomalyDay } from './anomalyEngine';
import type { RecurringRitual } from './ritualEngine';

// Pre-calculate analytical artifacts once (Client-side engine results)
export const GLOBAL_RECEIPTS: LifeReceipt[] = ALL_RECEIPTS;
export const GLOBAL_CONNECTIONS: ReceiptConnection[] = getAllConnections(GLOBAL_RECEIPTS, 0.32);
export const GLOBAL_MOMENTS: Moment[] = detectMoments(GLOBAL_RECEIPTS);
export const GLOBAL_PATTERNS: Pattern[] = detectPatterns(GLOBAL_RECEIPTS);
export const GLOBAL_CHAPTERS: Chapter[] = detectChapters(GLOBAL_RECEIPTS, GLOBAL_MOMENTS);
export const GLOBAL_STORY_NODES: StoryNode[] = buildStoryNodes(GLOBAL_CHAPTERS);
export const GLOBAL_ANOMALIES: AnomalyDay[] = detectAnomalies(GLOBAL_RECEIPTS);
export const GLOBAL_RITUALS: RecurringRitual[] = detectRituals(GLOBAL_RECEIPTS);

// Helper metrics
export function getOverviewMetrics() {
  const totalTraces = GLOBAL_RECEIPTS.length;

  const placesCount = new Set(GLOBAL_RECEIPTS.filter(r => r.location?.name).map(r => r.location!.name)).size;
  const songsCount = GLOBAL_RECEIPTS.filter(r => r.category === 'music').length;
  const purchasesCount = GLOBAL_RECEIPTS.filter(r => r.category === 'purchase').length;
  const eventsCount = GLOBAL_RECEIPTS.filter(r => r.category === 'event').length;
  const chaptersCount = GLOBAL_CHAPTERS.length;

  return {
    totalTraces,
    placesCount,
    songsCount,
    purchasesCount,
    eventsCount,
    chaptersCount
  };
}

// Search and filter helpers
export function filterReceipts(
  receipts: LifeReceipt[],
  query: string,
  selectedCategory: ReceiptCategory | 'all',
  selectedTag: string | 'all',
  sortBy: 'date_desc' | 'date_asc' | 'relevance' = 'date_asc'
): LifeReceipt[] {
  let result = [...receipts];

  if (selectedCategory !== 'all') {
    result = result.filter(r => r.category === selectedCategory);
  }

  if (selectedTag !== 'all') {
    result = result.filter(r => r.tags?.includes(selectedTag));
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    result = result.filter(r => 
      r.title.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.location?.name.toLowerCase().includes(q) ||
      r.location?.city?.toLowerCase().includes(q) ||
      r.artist?.toLowerCase().includes(q) ||
      r.person?.toLowerCase().includes(q) ||
      r.venue?.toLowerCase().includes(q) ||
      r.tags?.some(t => t.toLowerCase().includes(q))
    );
  }

  if (sortBy === 'date_desc') {
    result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } else if (sortBy === 'date_asc') {
    result.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  return result;
}

export function searchGlobalGrouped(query: string) {
  if (!query.trim()) return {};

  const q = query.toLowerCase().trim();
  const matched = GLOBAL_RECEIPTS.filter(r => 
    r.title.toLowerCase().includes(q) ||
    r.description?.toLowerCase().includes(q) ||
    r.location?.name.toLowerCase().includes(q) ||
    r.location?.city?.toLowerCase().includes(q) ||
    r.artist?.toLowerCase().includes(q) ||
    r.person?.toLowerCase().includes(q) ||
    r.tags?.some(t => t.toLowerCase().includes(q))
  );

  const grouped: Record<string, { count: number; items: LifeReceipt[]; matchContext: string }> = {};

  matched.forEach(r => {
    let matchContext = 'Matched content title';
    if (r.location?.name.toLowerCase().includes(q)) {
      matchContext = `Matched location: ${r.location.name}`;
    } else if (r.artist?.toLowerCase().includes(q)) {
      matchContext = `Matched artist: ${r.artist}`;
    } else if (r.tags?.some(t => t.toLowerCase().includes(q))) {
      const tagMatch = r.tags.find(t => t.toLowerCase().includes(q));
      matchContext = `Matched tag: #${tagMatch}`;
    }

    if (!grouped[r.category]) {
      grouped[r.category] = { count: 0, items: [], matchContext };
    }
    grouped[r.category].items.push(r);
    grouped[r.category].count = grouped[r.category].items.length;
  });

  return grouped;
}

export function reconstructDay(dateStr: string): { receipts: LifeReceipt[]; timeGaps: number[]; narrative: string } {
  const dayReceipts = GLOBAL_RECEIPTS.filter(r => r.timestamp.substring(0, 10) === dateStr)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const timeGaps: number[] = [];
  for (let i = 0; i < dayReceipts.length - 1; i++) {
    const t1 = new Date(dayReceipts[i].timestamp).getTime();
    const t2 = new Date(dayReceipts[i + 1].timestamp).getTime();
    const diffMin = Math.round((t2 - t1) / (1000 * 60));
    timeGaps.push(diffMin);
  }

  let narrative = `What looked like ${dayReceipts.length} isolated receipts was actually one continuous day.`;
  if (dayReceipts.length >= 5) {
    narrative = `An unusually dense sequence of ${dayReceipts.length} traces unfolding seamlessly from morning till late evening.`;
  } else if (dayReceipts.some(r => r.category === 'purchase') && dayReceipts.some(r => r.category === 'music')) {
    narrative = `A quiet rhythm balancing creative playback with focused acquisitions.`;
  }

  return { receipts: dayReceipts, timeGaps, narrative };
}

export { getConnectionsForReceipt, comparePeriods };
