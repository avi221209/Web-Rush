export type ReceiptCategory =
  | 'music'
  | 'movie'
  | 'place'
  | 'purchase'
  | 'photo'
  | 'message'
  | 'search'
  | 'event'
  | 'note';

export interface LocationData {
  name: string;
  lat?: number;
  lng?: number;
  address?: string;
  city?: string;
}

export interface LifeReceipt {
  id: string;
  category: ReceiptCategory;
  title: string;
  description?: string;
  timestamp: string; // ISO string format
  location?: LocationData;
  tags?: string[];
  metadata?: Record<string, string | number | boolean>;
  amount?: number; // for purchases
  artist?: string; // for music
  venue?: string; // for places/events
  person?: string; // for messages/photos
  rating?: number; // for movies/places
  photoMood?: string;
}

export interface ReceiptConnection {
  sourceId: string;
  targetId: string;
  score: number; // 0 to 1 normalized
  reasons: string[];
  relationshipType: 'temporal' | 'spatial' | 'semantic' | 'shared_tag' | 'shared_event' | 'entity_match';
}

export interface Moment {
  id: string;
  title: string;
  subtitle: string;
  startTime: string;
  endTime: string;
  receiptIds: string[];
  dominantCategory: ReceiptCategory;
  locationName?: string;
  narrativeSummary: string;
  iconName?: string;
}

export interface Pattern {
  id: string;
  type: 'temporal' | 'category' | 'location' | 'purchase' | 'search' | 'social';
  title: string;
  description: string;
  evidenceCount: number;
  receiptIds: string[];
  statHighlight: string;
  detailExplanation: string;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  description: string;
  narrative: string;
  dominantCategories: ReceiptCategory[];
  keyLocations: string[];
  momentIds: string[];
  representativeReceiptIds: string[];
}

export interface StoryNode {
  id: string;
  chapterId: string;
  title: string;
  narrativeParagraph: string;
  evidenceReceiptIds: string[];
  whatChangedText: string;
  comparisonStats: { label: string; previous: string; current: string };
}
