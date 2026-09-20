import type { Chapter, LifeReceipt, Moment } from '../types/receipt';

export function detectChapters(receipts: LifeReceipt[], moments: Moment[]): Chapter[] {
  const getReceiptsInMonth = (month: number) => receipts.filter(r => new Date(r.timestamp).getMonth() === month);

  const marchReceipts = getReceiptsInMonth(2);
  const aprilReceipts = getReceiptsInMonth(3);
  const mayReceipts = getReceiptsInMonth(4);
  const juneReceipts = getReceiptsInMonth(5);
  const julyReceipts = getReceiptsInMonth(6);
  const augustReceipts = getReceiptsInMonth(7);

  const findMomentsInReceipts = (rcptList: LifeReceipt[]) => {
    const ids = new Set(rcptList.map(r => r.id));
    return moments.filter(m => m.receiptIds.some(id => ids.has(id))).map(m => m.id);
  };

  const chapters: Chapter[] = [
    {
      id: 'chap-01',
      chapterNumber: 1,
      title: 'The Routine & Midnight Ideas',
      subtitle: 'March 2026 · Academic acoustic research & late-night coffee',
      startDate: '2026-03-01',
      endDate: '2026-03-31',
      description: 'Activity revolves around late-night study sessions, architectural acoustics research, Radiohead listening, and Kala Ghoda heritage walks.',
      narrative: 'In early March, digital traces reveal a solitary rhythm. Late-night searches for architectural acoustics PDFs were accompanied by Radiohead playback and quiet coffee runs at Blue Tokai. A visit to Kala Ghoda sparked a curiosity about how urban spaces reshape sound.',
      dominantCategories: ['search', 'music', 'note'],
      keyLocations: ['Blue Tokai Bandra', 'Kala Ghoda Art District', 'Phoenix Palladium'],
      momentIds: findMomentsInReceipts(marchReceipts),
      representativeReceiptIds: ['rcpt-001', 'rcpt-004', 'rcpt-010', 'rcpt-015']
    },
    {
      id: 'chap-02',
      chapterNumber: 2,
      title: 'The Detour & Field Recordings',
      subtitle: 'April 2026 · Gear acquisition & dawn recordings',
      startDate: '2026-04-01',
      endDate: '2026-04-30',
      description: 'Acquisition of field recording equipment marks a pivot from passive reading to active sound collection across the city.',
      narrative: 'April marked a decisive shift. The purchase of a Zoom H4n audio recorder transformed routine city walks into field recording expeditions. At 5:15 AM, digital traces place the subject at Sassoon Docks recording market chatter and sea spray, followed by vinyl record collecting in Mahim.',
      dominantCategories: ['purchase', 'place', 'photo'],
      keyLocations: ['Sassoon Docks', 'Colaba Irani Cafes', 'The Revolver Club Mahim'],
      momentIds: findMomentsInReceipts(aprilReceipts),
      representativeReceiptIds: ['rcpt-020', 'rcpt-023', 'rcpt-026', 'rcpt-029']
    },
    {
      id: 'chap-03',
      chapterNumber: 3,
      title: 'Summer Exploration & Coastal Resonances',
      subtitle: 'May 2026 · Coastal trips, gimbals, & live performances',
      startDate: '2026-05-01',
      endDate: '2026-05-31',
      description: 'Escaping city density for Mandwa coastal retreats, outdoor photography, and intimate live acoustic gigs.',
      narrative: 'As summer heat peaked, traces move beyond city limits. A ferry ticket to Mandwa Jetty led to coastal palm grove photos and ocean wave audio recordings. Back in Mumbai, an intimate Peter Cat concert at the Royal Opera House inspired late-night music listening on Sea Link drives.',
      dominantCategories: ['event', 'photo', 'place'],
      keyLocations: ['Mandwa Jetty Alibaug', 'Varsoli Beach', 'Royal Opera House'],
      momentIds: findMomentsInReceipts(mayReceipts),
      representativeReceiptIds: ['rcpt-032', 'rcpt-036', 'rcpt-039', 'rcpt-043']
    },
    {
      id: 'chap-04',
      chapterNumber: 4,
      title: 'The Collaboration & Studio Build',
      subtitle: 'June 2026 · Dedicated workspace construction',
      startDate: '2026-06-01',
      endDate: '2026-06-30',
      description: 'Building a dedicated Bandra home studio with collaborators Anya Sen & Kabir Mehta.',
      narrative: 'June brought focus. IKEA desk purchases, acoustic foam installation, and pizza orders trace a week-long collaborative push with Anya and Kabir to turn a spare room into a sound studio. Late-night ramen runs at Izumi punctuated intense sound design sessions.',
      dominantCategories: ['purchase', 'event', 'message'],
      keyLocations: ['Bandra Studio', 'IKEA Worli', 'Izumi Bandra', 'Carter Road'],
      momentIds: findMomentsInReceipts(juneReceipts),
      representativeReceiptIds: ['rcpt-046', 'rcpt-049', 'rcpt-051', 'rcpt-054']
    },
    {
      id: 'chap-05',
      chapterNumber: 5,
      title: 'Monsoon Resonance & Archival Research',
      subtitle: 'July 2026 · Heavy rain soundscapes & daily reflection',
      startDate: '2026-07-01',
      endDate: '2026-07-31',
      description: 'Capturing monsoon rain frequencies and studying Wim Wenders cinema during heavy downpours.',
      narrative: 'Monsoon season arrived with heavy rain curtains. Traces show high-contrast storm photos, rain shield microphone accessories, and Ryuichi Sakamoto piano tracks. Watching Wim Wenders’ "Perfect Days" inspired reflection on how small daily rituals ground human existence.',
      dominantCategories: ['photo', 'music', 'movie'],
      keyLocations: ['Bandra Seafront', 'Asiatic Society Library', 'Cafe Madras'],
      momentIds: findMomentsInReceipts(julyReceipts),
      representativeReceiptIds: ['rcpt-059', 'rcpt-060', 'rcpt-062', 'rcpt-064']
    },
    {
      id: 'chap-06',
      chapterNumber: 6,
      title: 'The Synthesis & Gallery Exhibition',
      subtitle: 'August 2026 · Full circle gallery opening night',
      startDate: '2026-08-01',
      endDate: '2026-08-31',
      description: 'Transforming six months of digital fragments into a public sound & photo exhibition at Method Bandra.',
      narrative: 'The culmination of all digital fragments. Traces include gallery rental deposits, fine art giclée print orders, venue setup, and an opening reception attended by 85 guests at Method Bandra. At 2:10 AM after closing night, playing Radiohead closed the circle from March.',
      dominantCategories: ['event', 'purchase', 'photo'],
      keyLocations: ['Method Art Space Bandra', 'Subko Coffee', 'Home Studio'],
      momentIds: findMomentsInReceipts(augustReceipts),
      representativeReceiptIds: ['rcpt-068', 'rcpt-071', 'rcpt-073', 'rcpt-074']
    }
  ];

  return chapters;
}
