import { type RefObject, useEffect } from 'react';

export function useNotificationsPanelDismiss(
  open: boolean,
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>,
  excludeRef?: RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (excludeRef?.current?.contains(target)) return;
      onClose();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, panelRef, excludeRef]);
}
