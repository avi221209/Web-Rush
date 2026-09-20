import type { LifeReceipt, ReceiptConnection } from '../types/receipt';

export function calculateSingleConnection(a: LifeReceipt, b: LifeReceipt): ReceiptConnection | null {
  if (a.id === b.id) return null;

  let totalScore = 0;
  const reasons: string[] = [];
  let relationshipType: ReceiptConnection['relationshipType'] = 'temporal';

  // 1. Temporal Proximity
  const timeA = new Date(a.timestamp).getTime();
  const timeB = new Date(b.timestamp).getTime();
  const diffMinutes = Math.abs(timeA - timeB) / (1000 * 60);

  if (diffMinutes <= 30) {
    totalScore += 0.45;
    reasons.push(`Occurred within ${Math.round(diffMinutes)} minutes`);
    relationshipType = 'temporal';
  } else if (diffMinutes <= 120) {
    totalScore += 0.32;
    reasons.push(`Occurred within ${Math.round(diffMinutes / 60 * 10) / 10} hours`);
    relationshipType = 'temporal';
  } else if (diffMinutes <= 360) {
    totalScore += 0.18;
    reasons.push(`Same morning/evening (${Math.round(diffMinutes / 60)}h apart)`);
  } else if (diffMinutes <= 1440) {
    totalScore += 0.08;
    reasons.push('Same day');
  }

  // 2. Spatial / Location Similarity
  if (a.location && b.location) {
    if (a.location.name && b.location.name && a.location.name === b.location.name) {
      totalScore += 0.40;
      reasons.push(`Same location: ${a.location.name}`);
      relationshipType = 'spatial';
    } else if (a.location.lat && a.location.lng && b.location.lat && b.location.lng) {
      const latDiff = Math.abs(a.location.lat - b.location.lat);
      const lngDiff = Math.abs(a.location.lng - b.location.lng);
      if (latDiff < 0.015 && lngDiff < 0.015) {
        totalScore += 0.28;
        reasons.push(`Nearby location (${a.location.city || 'Same district'})`);
        if (relationshipType !== 'temporal') relationshipType = 'spatial';
      }
    }
  }

  // 3. Entity Match (Person, Artist, Venue)
  if (a.artist && b.artist && a.artist === b.artist) {
    totalScore += 0.35;
    reasons.push(`Shared artist: ${a.artist}`);
    relationshipType = 'entity_match';
  }
  if (a.person && b.person && a.person === b.person) {
    totalScore += 0.35;
    reasons.push(`Shared person: ${a.person}`);
    relationshipType = 'entity_match';
  }
  if (a.venue && b.venue && a.venue === b.venue) {
    totalScore += 0.35;
    reasons.push(`Shared venue: ${a.venue}`);
    relationshipType = 'entity_match';
  }

  // 4. Shared Tags
  if (a.tags && b.tags) {
    const sharedTags = a.tags.filter(t => b.tags?.includes(t));
    if (sharedTags.length > 0) {
      const tagBonus = Math.min(sharedTags.length * 0.12, 0.30);
      totalScore += tagBonus;
      reasons.push(`Shared tag${sharedTags.length > 1 ? 's' : ''}: ${sharedTags.slice(0, 3).join(', ')}`);
      if (totalScore > 0.4 && !reasons.some(r => r.startsWith('Same location') || r.startsWith('Occurred'))) {
        relationshipType = 'shared_tag';
      }
    }
  }

  // 5. Semantic Pairs
  const semanticPair = `${a.category}+${b.category}`;
  const reversePair = `${b.category}+${a.category}`;
  const highSemanticPairs = [
    'music+place', 'place+purchase', 'event+photo', 'search+purchase',
    'movie+message', 'photo+place', 'note+search', 'purchase+event'
  ];

  if (highSemanticPairs.includes(semanticPair) || highSemanticPairs.includes(reversePair)) {
    totalScore += 0.15;
    reasons.push(`Category synergy: ${a.category.toUpperCase()} & ${b.category.toUpperCase()}`);
  }

  // Normalize max score to 1.0
  const normalizedScore = Math.min(Math.round(totalScore * 100) / 100, 1.0);

  if (normalizedScore < 0.28) {
    return null;
  }

  return {
    sourceId: a.id,
    targetId: b.id,
    score: normalizedScore,
    reasons,
    relationshipType
  };
}

export function getAllConnections(receipts: LifeReceipt[], minScore = 0.32): ReceiptConnection[] {
  const connections: ReceiptConnection[] = [];
  const visited = new Set<string>();

  for (let i = 0; i < receipts.length; i++) {
    for (let j = i + 1; j < receipts.length; j++) {
      const conn = calculateSingleConnection(receipts[i], receipts[j]);
      if (conn && conn.score >= minScore) {
        const pairKey = [conn.sourceId, conn.targetId].sort().join('::');
        if (!visited.has(pairKey)) {
          visited.add(pairKey);
          connections.push(conn);
        }
      }
    }
  }

  return connections.sort((a, b) => b.score - a.score);
}

export function getConnectionsForReceipt(targetId: string, receipts: LifeReceipt[], minScore = 0.28): { receipt: LifeReceipt; connection: ReceiptConnection }[] {
  const target = receipts.find(r => r.id === targetId);
  if (!target) return [];

  const results: { receipt: LifeReceipt; connection: ReceiptConnection }[] = [];

  for (const other of receipts) {
    if (other.id === targetId) continue;
    const conn = calculateSingleConnection(target, other);
    if (conn && conn.score >= minScore) {
      results.push({ receipt: other, connection: conn });
    }
  }

  return results.sort((a, b) => b.connection.score - a.connection.score);
}
