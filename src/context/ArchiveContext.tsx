import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

import { ALL_RECEIPTS } from '../data/receipts';
import {
  getOverviewMetrics,
  GLOBAL_CHAPTERS,
  GLOBAL_CONNECTIONS,
  GLOBAL_MOMENTS,
  GLOBAL_PATTERNS,
  GLOBAL_STORY_NODES,
  GLOBAL_ANOMALIES,
  GLOBAL_RITUALS
} from '../engine/receiptEngine';
import { detectMoments } from '../engine/momentEngine';
import { detectPatterns } from '../engine/patternEngine';
import { detectChapters } from '../engine/chapterEngine';
import { buildStoryNodes } from '../engine/storyEngine';
import { getAllConnections } from '../engine/connectionEngine';
import { detectAnomalies, type AnomalyDay } from '../engine/anomalyEngine';
import { detectRituals, type RecurringRitual } from '../engine/ritualEngine';

import type {
  ActiveTab,
  Chapter,
  LifeReceipt,
  Moment,
  OverviewMetrics,
  Pattern,
  ReceiptConnection,
  StoryNode
} from '../types';

export interface ArchiveContextType {
  receipts: LifeReceipt[];
  metrics: OverviewMetrics;
  chapters: Chapter[];
  moments: Moment[];
  patterns: Pattern[];
  connections: ReceiptConnection[];
  storyNodes: StoryNode[];
  anomalies: AnomalyDay[];
  rituals: RecurringRitual[];

  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  hasEnteredIntro: boolean;
  setHasEnteredIntro: (entered: boolean) => void;

  // Active selections & drawers
  selectedReceipt: LifeReceipt | null;
  setSelectedReceipt: (receipt: LifeReceipt | null) => void;
  threadReceipt: LifeReceipt | null;
  setThreadReceipt: (receipt: LifeReceipt | null) => void;
  reconstructDate: string | null;
  setReconstructDate: (date: string | null) => void;

  // Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isDemoTourOpen: boolean;
  setIsDemoTourOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  focusedChapterId?: string;
  setFocusedChapterId: (id?: string) => void;

  // Data management actions
  restoreSampleArchive: () => void;
  clearArchive: () => void;
  focusChapterInStory: (chapter: Chapter) => void;
}

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider: React.FC<{ children: React.ReactNode; initialReceipts?: LifeReceipt[] }> = ({
  children,
  initialReceipts = ALL_RECEIPTS
}) => {
  const [receipts, setReceipts] = useState<LifeReceipt[]>(initialReceipts);
  const [hasEnteredIntro, setHasEnteredIntro] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const [selectedReceipt, setSelectedReceipt] = useState<LifeReceipt | null>(null);
  const [threadReceipt, setThreadReceipt] = useState<LifeReceipt | null>(null);
  const [reconstructDate, setReconstructDate] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [focusedChapterId, setFocusedChapterId] = useState<string | undefined>(undefined);

  // Memoize data calculations based on active receipts array
  const isDefaultDataset = receipts === ALL_RECEIPTS;

  const moments = useMemo(() => {
    return isDefaultDataset ? GLOBAL_MOMENTS : detectMoments(receipts);
  }, [receipts, isDefaultDataset]);

  const patterns = useMemo(() => {
    return isDefaultDataset ? GLOBAL_PATTERNS : detectPatterns(receipts);
  }, [receipts, isDefaultDataset]);

  const chapters = useMemo(() => {
    return isDefaultDataset ? GLOBAL_CHAPTERS : detectChapters(receipts, moments);
  }, [receipts, moments, isDefaultDataset]);

  const storyNodes = useMemo(() => {
    return isDefaultDataset ? GLOBAL_STORY_NODES : buildStoryNodes(chapters);
  }, [chapters, isDefaultDataset]);

  const connections = useMemo(() => {
    return isDefaultDataset ? GLOBAL_CONNECTIONS : getAllConnections(receipts, 0.32);
  }, [receipts, isDefaultDataset]);

  const anomalies = useMemo(() => {
    return isDefaultDataset ? GLOBAL_ANOMALIES : detectAnomalies(receipts);
  }, [receipts, isDefaultDataset]);

  const rituals = useMemo(() => {
    return isDefaultDataset ? GLOBAL_RITUALS : detectRituals(receipts);
  }, [receipts, isDefaultDataset]);

  const metrics = useMemo(() => {
    return getOverviewMetrics(receipts, chapters);
  }, [receipts, chapters]);

  const restoreSampleArchive = useCallback(() => {
    setReceipts([...ALL_RECEIPTS]);
  }, []);

  const clearArchive = useCallback(() => {
    setReceipts([]);
  }, []);

  const focusChapterInStory = useCallback((chapter: Chapter) => {
    setFocusedChapterId(chapter.id);
    setActiveTab('story');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const value = useMemo<ArchiveContextType>(() => ({
    receipts,
    metrics,
    chapters,
    moments,
    patterns,
    connections,
    storyNodes,
    anomalies,
    rituals,
    activeTab,
    setActiveTab,
    hasEnteredIntro,
    setHasEnteredIntro,
    selectedReceipt,
    setSelectedReceipt,
    threadReceipt,
    setThreadReceipt,
    reconstructDate,
    setReconstructDate,
    isSearchOpen,
    setIsSearchOpen,
    isDemoTourOpen,
    setIsDemoTourOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    focusedChapterId,
    setFocusedChapterId,
    restoreSampleArchive,
    clearArchive,
    focusChapterInStory
  }), [
    receipts,
    metrics,
    chapters,
    moments,
    patterns,
    connections,
    storyNodes,
    anomalies,
    rituals,
    activeTab,
    hasEnteredIntro,
    selectedReceipt,
    threadReceipt,
    reconstructDate,
    isSearchOpen,
    isDemoTourOpen,
    isSettingsOpen,
    focusedChapterId,
    restoreSampleArchive,
    clearArchive,
    focusChapterInStory
  ]);

  return (
    <ArchiveContext.Provider value={value}>
      {children}
    </ArchiveContext.Provider>
  );
};

export function useArchiveContext(): ArchiveContextType {
  const context = useContext(ArchiveContext);
  if (!context) {
    throw new Error('useArchiveContext must be used within an ArchiveProvider');
  }
  return context;
}
