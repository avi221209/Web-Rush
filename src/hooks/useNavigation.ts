import { useArchiveContext } from '../context/ArchiveContext';

export function useNavigation() {
  const {
    activeTab,
    setActiveTab,
    hasEnteredIntro,
    setHasEnteredIntro,
    focusChapterInStory
  } = useArchiveContext();

  return {
    activeTab,
    setActiveTab,
    hasEnteredIntro,
    setHasEnteredIntro,
    focusChapterInStory
  };
}
