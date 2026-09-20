import type { Chapter, StoryNode } from '../types/receipt';

export function buildStoryNodes(chapters: Chapter[]): StoryNode[] {

  return chapters.map((chap, idx) => {
    let whatChangedText = '';
    let previousStat = '';
    let currentStat = '';

    if (idx === 0) {
      whatChangedText = 'Baseline established: Solitary acoustic research and late-night study patterns.';
      previousStat = '0 field recordings';
      currentStat = '14 late-night tracks played';
    } else if (idx === 1) {
      whatChangedText = 'Shift from theoretical reading to active physical recording across the city.';
      previousStat = '1 neighborhood (Bandra)';
      currentStat = '4 new districts (Colaba, Mahim, etc.)';
    } else if (idx === 2) {
      whatChangedText = 'Break from urban density into coastal environments and live concert experiences.';
      previousStat = '100% urban activity';
      currentStat = '35% coastal/outdoor traces';
    } else if (idx === 3) {
      whatChangedText = 'Solitary exploration transforms into dedicated studio workspace construction with collaborators.';
      previousStat = 'Individual focus';
      currentStat = '3 active collaborators';
    } else if (idx === 4) {
      whatChangedText = 'Monsoon rainfall inspires deep aesthetic synthesis of sound, rain, and quiet daily rituals.';
      previousStat = 'Dry weather recording';
      currentStat = 'Rain frequency audio capture';
    } else {
      whatChangedText = 'Private field notes and raw audio convert into a public gallery exhibition.';
      previousStat = 'Private drafts';
      currentStat = '85 gallery attendees & 18 prints';
    }

    return {
      id: `story-node-${chap.id}`,
      chapterId: chap.id,
      title: `Chapter 0${chap.chapterNumber} — ${chap.title}`,
      narrativeParagraph: chap.narrative,
      evidenceReceiptIds: chap.representativeReceiptIds,
      whatChangedText,
      comparisonStats: {
        label: 'Behavioral Shift',
        previous: previousStat,
        current: currentStat
      }
    };
  });
}
