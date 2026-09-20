/**
 * Pure date and time utility functions for LIFE//RECEIPTS.
 */

export function formatReceiptDate(timestamp: string): string {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatFullDate(timestamp: string): string {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatShortDate(timestamp: string): string {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

export function getDateString(timestamp: string): string {
  return timestamp.substring(0, 10);
}

export function calculateTimeGapMinutes(t1: string, t2: string): number {
  const ms1 = new Date(t1).getTime();
  const ms2 = new Date(t2).getTime();
  return Math.round(Math.abs(ms2 - ms1) / (1000 * 60));
}
