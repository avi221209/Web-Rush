import {
  BookOpen,
  Camera,
  Calendar,
  Film,
  MapPin,
  MessageSquare,
  Music,
  Receipt,
  Search
} from 'lucide-react';

import type { ReceiptCategory } from '../types/receipt';

export interface CategoryInfo {
  key: ReceiptCategory;
  label: string;
  colorHex: string;
  bgLight: string;
  borderLight: string;
  badgeBg: string;
  textClass: string;
  icon: typeof Music;
}

export const CATEGORY_MAP: Record<ReceiptCategory, CategoryInfo> = {
  music: {
    key: 'music',
    label: 'Music',
    colorHex: '#7C3AED',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    textClass: 'text-purple-700',
    icon: Music
  },
  movie: {
    key: 'movie',
    label: 'Movies',
    colorHex: '#E11D48',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    textClass: 'text-rose-700',
    icon: Film
  },
  place: {
    key: 'place',
    label: 'Places',
    colorHex: '#2563EB',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-200',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    textClass: 'text-blue-700',
    icon: MapPin
  },
  purchase: {
    key: 'purchase',
    label: 'Purchases',
    colorHex: '#D97706',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    textClass: 'text-amber-700',
    icon: Receipt
  },
  photo: {
    key: 'photo',
    label: 'Photos',
    colorHex: '#059669',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    textClass: 'text-emerald-700',
    icon: Camera
  },
  message: {
    key: 'message',
    label: 'Messages',
    colorHex: '#DB2777',
    bgLight: 'bg-pink-50',
    borderLight: 'border-pink-200',
    badgeBg: 'bg-pink-100 text-pink-900 border-pink-300',
    textClass: 'text-pink-700',
    icon: MessageSquare
  },
  search: {
    key: 'search',
    label: 'Searches',
    colorHex: '#0891B2',
    bgLight: 'bg-cyan-50',
    borderLight: 'border-cyan-200',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    textClass: 'text-cyan-700',
    icon: Search
  },
  event: {
    key: 'event',
    label: 'Events',
    colorHex: '#EA580C',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    textClass: 'text-orange-700',
    icon: Calendar
  },
  note: {
    key: 'note',
    label: 'Notes',
    colorHex: '#78350F',
    bgLight: 'bg-yellow-50',
    borderLight: 'border-yellow-200',
    badgeBg: 'bg-amber-900/10 text-amber-950 border-amber-800/30',
    textClass: 'text-amber-900',
    icon: BookOpen
  }
};

export function getCategoryInfo(category: ReceiptCategory): CategoryInfo {
  return CATEGORY_MAP[category] || CATEGORY_MAP.note;
}
