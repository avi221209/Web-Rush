import type { LifeReceipt, ReceiptCategory } from '../types/receipt';

export interface PeriodStats {
  label: string;
  startDate: string;
  endDate: string;
  totalTraces: number;
  categoryCounts: Record<ReceiptCategory, number>;
}

export interface ComparisonResult {
  periodA: PeriodStats;
  periodB: PeriodStats;
  whatChanged: string[];
  largestDelta: {
    category: ReceiptCategory;
    percentChange: number;
    direction: 'increased' | 'decreased';
  };
}

export function comparePeriods(
  receipts: LifeReceipt[],
  startA: string,
  endA: string,
  startB: string,
  endB: string,
  labelA = 'Period A',
  labelB = 'Period B'
): ComparisonResult {
  const receiptsA = receipts.filter(r => {
    const d = r.timestamp.substring(0, 10);
    return d >= startA && d <= endA;
  });

  const receiptsB = receipts.filter(r => {
    const d = r.timestamp.substring(0, 10);
    return d >= startB && d <= endB;
  });

  const cats: ReceiptCategory[] = ['music', 'movie', 'place', 'purchase', 'photo', 'message', 'search', 'event', 'note'];

  const getCatCounts = (list: LifeReceipt[]) => {
    const map: Record<ReceiptCategory, number> = {
      music: 0, movie: 0, place: 0, purchase: 0, photo: 0, message: 0, search: 0, event: 0, note: 0
    };
    list.forEach(r => {
      map[r.category] = (map[r.category] || 0) + 1;
    });
    return map;
  };

  const catA = getCatCounts(receiptsA);
  const catB = getCatCounts(receiptsB);

  // Find largest delta
  let maxChangePct = 0;
  let maxCat: ReceiptCategory = 'place';
  let direction: 'increased' | 'decreased' = 'increased';

  cats.forEach(c => {
    const countA = catA[c] || 0;
    const countB = catB[c] || 0;

    const diff = countB - countA;
    const pct = countA > 0 ? Math.round((diff / countA) * 100) : countB * 100;

    if (Math.abs(pct) > Math.abs(maxChangePct)) {
      maxChangePct = pct;
      maxCat = c;
      direction = pct >= 0 ? 'increased' : 'decreased';
    }
  });

  const whatChanged: string[] = [];

  const placeRatio = catA.place > 0 ? Math.round((catB.place / catA.place) * 10) / 10 : catB.place;
  if (placeRatio > 1) {
    whatChanged.push(`Location check-ins increased ${placeRatio}× from ${labelA} to ${labelB}`);
  } else if (placeRatio < 1 && placeRatio > 0) {
    whatChanged.push(`Location activity decreased to ${Math.round(placeRatio * 100)}% of baseline`);
  }

  const purchaseDiff = (catB.purchase || 0) - (catA.purchase || 0);
  if (purchaseDiff > 0) {
    whatChanged.push(`Purchases increased by +${purchaseDiff} traces due to gear acquisition`);
  }

  const photoRatio = catA.photo > 0 ? Math.round((catB.photo / catA.photo) * 10) / 10 : catB.photo;
  if (photoRatio > 1.2) {
    whatChanged.push(`Photographic capturing expanded ${photoRatio}×`);
  }

  if (whatChanged.length === 0) {
    whatChanged.push(`Total activity shifted from ${receiptsA.length} traces in ${labelA} to ${receiptsB.length} traces in ${labelB}`);
  }

  return {
    periodA: {
      label: labelA,
      startDate: startA,
      endDate: endA,
      totalTraces: receiptsA.length,
      categoryCounts: catA
    },
    periodB: {
      label: labelB,
      startDate: startB,
      endDate: endB,
      totalTraces: receiptsB.length,
      categoryCounts: catB
    },
    whatChanged,
    largestDelta: {
      category: maxCat,
      percentChange: Math.abs(maxChangePct),
      direction
    }
  };
}
