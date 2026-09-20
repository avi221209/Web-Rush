import { useEffect } from 'react';

/**
 * Custom hook for listening to specific key events with automatic cleanup.
 */
export function useKeyDown(key: string, handler: (e: KeyboardEvent) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [key, handler, enabled]);
}
