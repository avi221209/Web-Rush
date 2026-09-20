import type { LifeReceipt, Moment, ReceiptCategory } from '../types/receipt';

export function detectMoments(receipts: LifeReceipt[]): Moment[] {
  const sorted = [...receipts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const moments: Moment[] = [];

  // Group receipts occurring within 3.5 hours of each other
  let currentGroup: LifeReceipt[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    if (currentGroup.length === 0) {
      currentGroup.push(current);
    } else {
      const prev = currentGroup[currentGroup.length - 1];
      const diffMs = new Date(current.timestamp).getTime() - new Date(prev.timestamp).getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      // If within 3.5 hours or shares explicit location/event
      const sameLocation = current.location?.name && prev.location?.name && current.location.name === prev.location.name;

      if (diffHours <= 3.5 || sameLocation) {
        currentGroup.push(current);
      } else {
        if (currentGroup.length >= 2) {
          moments.push(buildMomentObject(currentGroup, moments.length + 1));
        }
        currentGroup = [current];
      }
    }
  }

  if (currentGroup.length >= 2) {
    moments.push(buildMomentObject(currentGroup, moments.length + 1));
  }

  // Filter moments to those with rich story value and sort by importance
  return moments.sort((a, b) => b.receiptIds.length - a.receiptIds.length);
}

function buildMomentObject(group: LifeReceipt[], index: number): Moment {
  const startTime = group[0].timestamp;
  const endTime = group[group.length - 1].timestamp;
  const receiptIds = group.map(r => r.id);

  // Determine dominant category
  const categoryCounts: Record<string, number> = {};
  group.forEach(r => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  });
  let maxCat: ReceiptCategory = group[0].category;
  let maxCount = 0;
  for (const [cat, cnt] of Object.entries(categoryCounts)) {
    if (cnt > maxCount) {
      maxCount = cnt;
      maxCat = cat as ReceiptCategory;
    }
  }

  // Determine location
  const locReceipt = group.find(r => r.location?.name);
  const locationName = locReceipt?.location?.name;

  // Title generation logic based on tags, hour of day, and location
  const startHour = new Date(startTime).getHours();
  const allTags = group.flatMap(r => r.tags || []);
  const allTitles = group.map(r => r.title.toLowerCase());

  let title = `Moment #${String(index).padStart(2, '0')}`;
  let subtitle = `${group.length} connected digital traces`;
  let narrativeSummary = `A sequence of ${group.length} events unfolding over ${group.length > 1 ? 'a short window' : 'a single instance'}.`;

  if (allTags.includes('exhibition') || allTitles.some(t => t.includes('exhibition'))) {
    title = 'Exhibition Opening Night';
    subtitle = 'The synthesis of six months of audio & visual work';
    narrativeSummary = 'Gallery guests, soundscapes, celebratory subko coffee & champagne, and late night full circle reflections.';
  } else if (allTags.includes('studio') || allTitles.some(t => t.includes('studio'))) {
    title = 'Studio Build Session';
    subtitle = 'Acoustic traps, wooden desk assembly, binaural test audio';
    narrativeSummary = 'Collaborative day with Anya & Kabir constructing the dedicated Bandra home studio space.';
  } else if (allTags.includes('ramen') || (startHour >= 22 && group.some(r => r.category === 'purchase'))) {
    title = 'An Unexpectedly Long Night';
    subtitle = 'Late night ramen, ocean promenade stroll, and quiet reflection';
    narrativeSummary = 'Late night Izumi ramen, Carter Road midnight sea stroll, Max Richter strings, and saved draft messages.';
  } else if (allTags.includes('dawn') || allTags.includes('docks') || startHour < 7) {
    title = 'Dawn at Sassoon Docks';
    subtitle = '5:15 AM field recordings, fishing boat photos, Irani chai';
    narrativeSummary = 'Early morning binaural sound recording session capturing fish market chatter and sea spray.';
  } else if (allTags.includes('alibaug') || allTags.includes('coastal') || allTags.includes('beach')) {
    title = 'Weekend Coastal Retreat';
    subtitle = 'Mandwa ferry, palm groves, Kiasmos sunset audio, ocean notes';
    narrativeSummary = 'Escaping city density for seaside acoustic field notes and high tide wave recordings.';
  } else if (allTags.includes('kala-ghoda') || allTags.includes('architecture')) {
    title = 'Kala Ghoda Heritage Walk';
    subtitle = 'Acoustics panel talk, bookstore, and bougainvillea architecture';
    narrativeSummary = 'Exploring urban density, architectural acoustics books, and heritage street photography.';
  } else if (allTags.includes('imax') || allTitles.some(t => t.includes('dune'))) {
    title = 'Cinema & Craft Nachos Night';
    subtitle = 'IMAX 70mm screening followed by post-movie drinks with friends';
    narrativeSummary = 'Visceral sound design screening of Dune Part Two with Kabir & Anya at Phoenix Palladium.';
  } else if (startHour >= 22) {
    title = `Late Night ${maxCat.toUpperCase()} Session`;
    subtitle = `${locationName ? `Near ${locationName}` : 'Late hours trace'}`;
    narrativeSummary = `Quiet hours activity comprising ${group.length} interconnected fragments.`;
  } else if (locationName) {
    title = `Glimpse at ${locationName}`;
    subtitle = `${group.length} recorded interactions`;
    narrativeSummary = `Activity centered around ${locationName} involving ${maxCat} and related moments.`;
  }

  return {
    id: `moment-${index}`,
    title,
    subtitle,
    startTime,
    endTime,
    receiptIds,
    dominantCategory: maxCat,
    locationName,
    narrativeSummary
  };
}
