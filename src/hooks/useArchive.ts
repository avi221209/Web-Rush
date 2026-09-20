import { useArchiveContext } from '../context/ArchiveContext';

export function useArchive() {
  const {
    receipts,
    metrics,
    chapters,
    moments,
    patterns,
    connections,
    storyNodes,
    anomalies,
    rituals,
    restoreSampleArchive,
    clearArchive
  } = useArchiveContext();

  return {
    receipts,
    metrics,
    chapters,
    moments,
    patterns,
    connections,
    storyNodes,
    anomalies,
    rituals,
    restoreSampleArchive,
    clearArchive
  };
}
