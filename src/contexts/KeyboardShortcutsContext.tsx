
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface KeyboardShortcut {
  id: string;
  key: string;
  description: string;
  category: 'navigation' | 'search' | 'actions' | 'help';
  action: () => void;
  scope?: string;
  enabled?: boolean;
}

interface KeyboardShortcutsContextType {
  shortcuts: KeyboardShortcut[];
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  unregisterShortcut: (id: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  currentScope: string;
  setCurrentScope: (scope: string) => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined);

export const useKeyboardShortcuts = () => {
  const context = useContext(KeyboardShortcutsContext);
  if (!context) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider');
  }
  return context;
};

interface KeyboardShortcutsProviderProps {
  children: ReactNode;
}

export const KeyboardShortcutsProvider: React.FC<KeyboardShortcutsProviderProps> = ({ children }) => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentScope, setCurrentScope] = useState('global');

  const registerShortcut = (shortcut: KeyboardShortcut) => {
    setShortcuts(prev => {
      const filtered = prev.filter(s => s.id !== shortcut.id);
      return [...filtered, shortcut];
    });
  };

  const unregisterShortcut = (id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle global shortcuts
      const key = event.key.toLowerCase();
      const hasModifier = event.ctrlKey || event.metaKey;
      const hasShift = event.shiftKey;

      // Help modal shortcut (?)
      if (key === '?' && !hasModifier) {
        event.preventDefault();
        openModal();
        return;
      }

      // Find matching shortcut
      const shortcutKey = hasModifier ? `${hasShift ? 'shift+' : ''}ctrl+${key}` : key;
      const matchingShortcut = shortcuts.find(s => 
        s.key === shortcutKey && 
        (s.enabled !== false) &&
        (s.scope === currentScope || s.scope === 'global' || !s.scope)
      );

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, currentScope]);

  return (
    <KeyboardShortcutsContext.Provider
      value={{
        shortcuts,
        registerShortcut,
        unregisterShortcut,
        isModalOpen,
        openModal,
        closeModal,
        currentScope,
        setCurrentScope,
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  );
};
