import { useArchiveContext } from '../context/ArchiveContext';

export function useModalState() {
  const {
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
    setIsSettingsOpen
  } = useArchiveContext();

  return {
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
    setIsSettingsOpen
  };
}
