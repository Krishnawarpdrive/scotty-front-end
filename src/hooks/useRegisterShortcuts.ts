
import { useEffect } from 'react';
import { useKeyboardShortcuts, KeyboardShortcut } from '@/contexts/KeyboardShortcutsContext';

export const useRegisterShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts();

  useEffect(() => {
    // Register all shortcuts
    shortcuts.forEach(shortcut => {
      registerShortcut(shortcut);
    });

    // Cleanup function to unregister shortcuts
    return () => {
      shortcuts.forEach(shortcut => {
        unregisterShortcut(shortcut.id);
      });
    };
  }, [shortcuts, registerShortcut, unregisterShortcut]);
};
