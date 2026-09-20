import type { LifeReceipt } from '../types/receipt';
import { getConnectionsForReceipt } from '../engine/connectionEngine';

export interface ThreadStep {
  receipt: LifeReceipt;
  reason: string;
}

/**
 * Builds an intelligent 5-step narrative chain starting from an anchor receipt.
 * Evaluates candidate connections using temporal, spatial, and entity proximity.
 */
export function buildThreadChain(
  initialReceipt: LifeReceipt | null,
  allReceipts: LifeReceipt[],
  maxSteps = 5
): ThreadStep[] {
  if (!initialReceipt) return [];

  const chain: ThreadStep[] = [];
  const visited = new Set<string>();

  let current = initialReceipt;
  chain.push({ receipt: current, reason: 'Initial Anchor Trace' });
  visited.add(current.id);

  for (let i = 0; i < maxSteps - 1; i++) {
    const conns = getConnectionsForReceipt(current.id, allReceipts, 0.25)
      .filter(c => !visited.has(c.receipt.id));

    if (conns.length > 0) {
      const nextItem = conns[0];
      visited.add(nextItem.receipt.id);
      chain.push({
        receipt: nextItem.receipt,
        reason: nextItem.connection.reasons[0] || 'Strong temporal proximity'
      });
      current = nextItem.receipt;
    } else {
      break;
    }
  }

  return chain;
}
