/**
 * Tests for receiptEngine.ts — pure function logic
 * These tests verify the data-analysis contract of the core engine.
 */
import { describe, it, expect } from 'vitest';
import {
  getOverviewMetrics,
  filterReceipts,
  searchGlobalGrouped,
  reconstructDay,
  GLOBAL_RECEIPTS,
  GLOBAL_CHAPTERS,
  GLOBAL_PATTERNS,
} from '../engine/receiptEngine';

describe('getOverviewMetrics', () => {
  it('returns an object with all required keys', () => {
    const metrics = getOverviewMetrics();
    expect(metrics).toHaveProperty('totalTraces');
    expect(metrics).toHaveProperty('placesCount');
    expect(metrics).toHaveProperty('songsCount');
    expect(metrics).toHaveProperty('purchasesCount');
    expect(metrics).toHaveProperty('eventsCount');
    expect(metrics).toHaveProperty('chaptersCount');
  });

  it('totalTraces matches GLOBAL_RECEIPTS length', () => {
    const { totalTraces } = getOverviewMetrics();
    expect(totalTraces).toBe(GLOBAL_RECEIPTS.length);
  });

  it('totalTraces is a positive number (dataset is loaded)', () => {
    const { totalTraces } = getOverviewMetrics();
    expect(totalTraces).toBeGreaterThan(0);
  });

  it('chaptersCount matches GLOBAL_CHAPTERS length', () => {
    const { chaptersCount } = getOverviewMetrics();
    expect(chaptersCount).toBe(GLOBAL_CHAPTERS.length);
  });

  it('songsCount counts only music category receipts', () => {
    const { songsCount } = getOverviewMetrics();
    const musicReceipts = GLOBAL_RECEIPTS.filter(r => r.category === 'music');
    expect(songsCount).toBe(musicReceipts.length);
  });
});

describe('filterReceipts', () => {
  it('returns all receipts when no filter is applied', () => {
    const result = filterReceipts(GLOBAL_RECEIPTS, '', 'all', 'all');
    expect(result).toHaveLength(GLOBAL_RECEIPTS.length);
  });

  it('filters by category correctly', () => {
    const result = filterReceipts(GLOBAL_RECEIPTS, '', 'music', 'all');
    expect(result.every(r => r.category === 'music')).toBe(true);
  });

  it('filters by query text (case-insensitive)', () => {
    // Use a known word that appears in the dataset
    const result = filterReceipts(GLOBAL_RECEIPTS, 'mumbai', 'all', 'all');
    // Every result must have 'mumbai' in title, description, location, artist, person, venue, or tags
    expect(result.length).toBeGreaterThan(0);
    result.forEach(r => {
      const combined = [
        r.title,
        r.description ?? '',
        r.location?.name ?? '',
        r.location?.city ?? '',
        r.artist ?? '',
        r.person ?? '',
        r.venue ?? '',
        ...(r.tags ?? []),
      ].join(' ').toLowerCase();
      expect(combined).toContain('mumbai');
    });
  });

  it('sorts by date_desc — most recent first', () => {
    const result = filterReceipts(GLOBAL_RECEIPTS, '', 'all', 'all', 'date_desc');
    for (let i = 0; i < result.length - 1; i++) {
      const t1 = new Date(result[i].timestamp).getTime();
      const t2 = new Date(result[i + 1].timestamp).getTime();
      expect(t1).toBeGreaterThanOrEqual(t2);
    }
  });

  it('sorts by date_asc — oldest first', () => {
    const result = filterReceipts(GLOBAL_RECEIPTS, '', 'all', 'all', 'date_asc');
    for (let i = 0; i < result.length - 1; i++) {
      const t1 = new Date(result[i].timestamp).getTime();
      const t2 = new Date(result[i + 1].timestamp).getTime();
      expect(t1).toBeLessThanOrEqual(t2);
    }
  });

  it('returns empty array when query has no matches', () => {
    const result = filterReceipts(GLOBAL_RECEIPTS, 'xyznotarealword123', 'all', 'all');
    expect(result).toHaveLength(0);
  });
});

describe('searchGlobalGrouped', () => {
  it('returns empty object for empty query', () => {
    const result = searchGlobalGrouped('');
    expect(result).toEqual({});
  });

  it('returns empty object for whitespace-only query', () => {
    const result = searchGlobalGrouped('   ');
    expect(result).toEqual({});
  });

  it('returns grouped results keyed by category', () => {
    const result = searchGlobalGrouped('coffee');
    // Each key should be a valid receipt category string
    for (const key of Object.keys(result)) {
      expect(typeof key).toBe('string');
      expect(result[key]).toHaveProperty('count');
      expect(result[key]).toHaveProperty('items');
      expect(result[key]).toHaveProperty('matchContext');
    }
  });

  it('count matches items array length', () => {
    const result = searchGlobalGrouped('music');
    for (const key of Object.keys(result)) {
      expect(result[key].count).toBe(result[key].items.length);
    }
  });
});

describe('reconstructDay', () => {
  it('returns empty receipts array for a date with no data', () => {
    const result = reconstructDay('1990-01-01');
    expect(result.receipts).toHaveLength(0);
    expect(result.timeGaps).toHaveLength(0);
  });

  it('receipts are sorted chronologically', () => {
    // Find a date that has receipts
    const datesWithReceipts = [
      ...new Set(GLOBAL_RECEIPTS.map(r => r.timestamp.substring(0, 10)))
    ];
    if (datesWithReceipts.length === 0) return; // Skip if no data

    const testDate = datesWithReceipts[0];
    const { receipts } = reconstructDay(testDate);
    for (let i = 0; i < receipts.length - 1; i++) {
      const t1 = new Date(receipts[i].timestamp).getTime();
      const t2 = new Date(receipts[i + 1].timestamp).getTime();
      expect(t1).toBeLessThanOrEqual(t2);
    }
  });

  it('timeGaps has length one less than receipts', () => {
    const datesWithReceipts = [
      ...new Set(GLOBAL_RECEIPTS.map(r => r.timestamp.substring(0, 10)))
    ];
    if (datesWithReceipts.length === 0) return;

    const testDate = datesWithReceipts[0];
    const { receipts, timeGaps } = reconstructDay(testDate);
    expect(timeGaps).toHaveLength(Math.max(0, receipts.length - 1));
  });

  it('returns a non-empty narrative string', () => {
    const datesWithReceipts = [
      ...new Set(GLOBAL_RECEIPTS.map(r => r.timestamp.substring(0, 10)))
    ];
    if (datesWithReceipts.length === 0) return;

    const { narrative } = reconstructDay(datesWithReceipts[0]);
    expect(typeof narrative).toBe('string');
    expect(narrative.length).toBeGreaterThan(0);
  });
});

describe('GLOBAL_PATTERNS', () => {
  it('each pattern has required fields', () => {
    for (const pattern of GLOBAL_PATTERNS) {
      expect(pattern).toHaveProperty('id');
      expect(pattern).toHaveProperty('title');
      expect(pattern).toHaveProperty('type');
      expect(pattern).toHaveProperty('receiptIds');
      expect(Array.isArray(pattern.receiptIds)).toBe(true);
    }
  });

  it('pattern receiptIds reference valid receipts in GLOBAL_RECEIPTS', () => {
    const allIds = new Set(GLOBAL_RECEIPTS.map(r => r.id));
    for (const pattern of GLOBAL_PATTERNS) {
      for (const id of pattern.receiptIds) {
        expect(allIds.has(id)).toBe(true);
      }
    }
  });
});
