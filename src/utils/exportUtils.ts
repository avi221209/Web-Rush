import type { LifeReceipt } from '../types/receipt';

/**
 * Pure export utility for downloading active archive dataset as formatted JSON.
 */
export function generateArchiveExport(receipts: LifeReceipt[]): string {
  return JSON.stringify(receipts, null, 2);
}

export function triggerJSONDownload(jsonData: string, filename?: string): void {
  const actualFilename = filename || `life_receipts_archive_${new Date().toISOString().substring(0, 10)}.json`;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", actualFilename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
