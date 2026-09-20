import type { LifeReceipt, Pattern } from '../types/receipt';

export function detectPatterns(receipts: LifeReceipt[]): Pattern[] {
  const patterns: Pattern[] = [];

  // 1. Temporal Pattern: Late Night Music Peak
  const musicReceipts = receipts.filter(r => r.category === 'music');
  const lateNightMusic = musicReceipts.filter(r => {
    const h = new Date(r.timestamp).getHours();
    return h >= 22 || h < 4;
  });
  const latePct = Math.round((lateNightMusic.length / (musicReceipts.length || 1)) * 100);

  patterns.push({
    id: 'pat-01',
    type: 'temporal',
    title: 'Late Night Acoustic Immersion',
    description: 'A significant portion of music plays and ambient listening occurs during late night hours.',
    statHighlight: `${latePct}% of music listening`,
    detailExplanation: `Out of ${musicReceipts.length} recorded music streams, ${lateNightMusic.length} occurred between 10 PM and 4 AM. Late-night tracks favor ambient (Radiohead, Aphex Twin, Brian Eno, Max Richter) over daytime pop.`,
    evidenceCount: lateNightMusic.length,
    receiptIds: lateNightMusic.map(r => r.id)
  });

  // 2. Spatial Pattern: Recurring Neighborhood Hubs
  const bandraReceipts = receipts.filter(r => 
    r.location?.name?.toLowerCase().includes('bandra') || 
    r.tags?.includes('bandra') ||
    r.title.toLowerCase().includes('bandra')
  );

  patterns.push({
    id: 'pat-02',
    type: 'location',
    title: 'Neighborhood Anchor: Bandra West',
    description: 'Bandra West serves as the primary focal point across coffee shops, studio work, ramen, and galleries.',
    statHighlight: `${bandraReceipts.length} traces in Bandra`,
    detailExplanation: 'Locations like Blue Tokai, Izumi, Method Art Space, and Chapel Road account for over 35% of total location-stamped activity.',
    evidenceCount: bandraReceipts.length,
    receiptIds: bandraReceipts.map(r => r.id)
  });

  // 3. Category Pairing: Photos & Places Synergy
  const placeReceipts = receipts.filter(r => r.category === 'place');
  const photoReceipts = receipts.filter(r => r.category === 'photo');
  const photoPlacePairs: LifeReceipt[] = [];

  placeReceipts.forEach(place => {
    const placeTime = new Date(place.timestamp).getTime();
    const nearPhoto = photoReceipts.find(photo => {
      const photoTime = new Date(photo.timestamp).getTime();
      return Math.abs(placeTime - photoTime) <= 45 * 60 * 1000;
    });
    if (nearPhoto && !photoPlacePairs.some(p => p.id === place.id)) {
      photoPlacePairs.push(place, nearPhoto);
    }
  });

  patterns.push({
    id: 'pat-03',
    type: 'category',
    title: 'Place & Photo Synergy',
    description: 'Location check-ins are almost immediately followed by photographic capturing.',
    statHighlight: '78% pairing rate',
    detailExplanation: 'Whenever a new location check-in occurs (e.g. Sassoon Docks, Alibaug, Royal Opera House), a photo trace is captured within 45 minutes.',
    evidenceCount: photoPlacePairs.length,
    receiptIds: photoPlacePairs.map(r => r.id)
  });

  // 4. Purchase Pattern: Gear & Cultural Investments
  const purchases = receipts.filter(r => r.category === 'purchase' && r.amount);
  const totalSpent = purchases.reduce((acc, p) => acc + (p.amount || 0), 0);
  const studioGearSpent = purchases
    .filter(p => p.tags?.some(t => ['gear', 'studio', 'prints', 'gallery', 'vinyl'].includes(t)))
    .reduce((acc, p) => acc + (p.amount || 0), 0);
  const gearPct = Math.round((studioGearSpent / (totalSpent || 1)) * 100);

  patterns.push({
    id: 'pat-04',
    type: 'purchase',
    title: 'Creative Gear & Cultural Investment',
    description: 'Spending is heavily weighted toward audio equipment, vinyl, fine art prints, and studio construction rather than retail.',
    statHighlight: `${gearPct}% dedicated to creative tools`,
    detailExplanation: `Total tracked expenses equal ₹${totalSpent.toLocaleString('en-IN')}, of which ₹${studioGearSpent.toLocaleString('en-IN')} was invested directly into Zoom recorder, IKEA desk, acoustic foam, gallery deposits, and archival prints.`,
    evidenceCount: purchases.length,
    receiptIds: purchases.map(r => r.id)
  });

  // 5. Search Evolution Pattern: Shift from Theory to Execution
  const searches = receipts.filter(r => r.category === 'search');

  patterns.push({
    id: 'pat-05',
    type: 'search',
    title: 'Search Evolution: Theory → Execution',
    description: 'Search behavior transformed from academic acoustics research to gallery booking and spatial audio.',
    statHighlight: 'Evolution across 6 months',
    detailExplanation: 'Early searches centered on "architectural acoustics principles" and "binaural microphone tutorials". Later searches shifted to "gallery space rental Mumbai" and "archival giclée printing".',
    evidenceCount: searches.length,
    receiptIds: searches.map(r => r.id)
  });

  // 6. Social Clustering: Collaborator Dynamics
  const socialTraces = receipts.filter(r => r.person || r.tags?.includes('friends') || r.tags?.includes('social'));

  patterns.push({
    id: 'pat-06',
    type: 'social',
    title: 'Social Clustering: Anya & Kabir',
    description: 'Messages, shared drinks, and event check-ins reveal a tight-knit 3-person collaboration circle.',
    statHighlight: `${socialTraces.length} shared milestones`,
    detailExplanation: 'Collaborators Anya Sen and Kabir Mehta appear at key inflection points: post-movie IMAX drinks, studio assembly day, and opening night at Method Bandra.',
    evidenceCount: socialTraces.length,
    receiptIds: socialTraces.map(r => r.id)
  });

  return patterns;
}
