import type { LifeReceipt, ReceiptCategory } from './receipt';

export type ActiveTab =
  | 'overview'
  | 'receipts'
  | 'connections'
  | 'patterns'
  | 'compare'
  | 'chapters'
  | 'story'
  | 'about';

export type ViewMode = 'grid' | 'list';

export type SortOrder = 'date_asc' | 'date_desc';

export type StrengthFilter = 'all' | 'medium' | 'strong';

export interface FilterState {
  query: string;
  category: ReceiptCategory | 'all';
  tag: string | 'all';
  sortBy: SortOrder;
}

export interface ModalState {
  selectedReceipt: LifeReceipt | null;
  threadReceipt: LifeReceipt | null;
  reconstructDate: string | null;
  isSearchOpen: boolean;
  isDemoTourOpen: boolean;
  isSettingsOpen: boolean;
  focusedChapterId?: string;
}

export interface OverviewMetrics {
  totalTraces: number;
  placesCount: number;
  songsCount: number;
  purchasesCount: number;
  eventsCount: number;
  chaptersCount: number;
}
