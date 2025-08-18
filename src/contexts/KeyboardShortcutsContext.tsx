
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  id: string;
  key: string;
  description: string;
  category: string;
  action: () => void;
  scope?: string;
  enabled?: boolean;
}

export interface KeyboardShortcutsContextType {
  shortcuts: KeyboardShortcut[];
  currentScope: string;
  isGModeActive: boolean;
  showHints: boolean;
  isModalOpen: boolean;
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  unregisterShortcut: (id: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setCurrentScope: (scope: string) => void;
  toggleHints: () => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined);

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([]);
  const [currentScope, setCurrentScope] = useState<string>('global');
  const [isGModeActive, setIsGModeActive] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const registerShortcut = useCallback((shortcut: KeyboardShortcut) => {
    setShortcuts(prev => [...prev.filter(s => s.id !== shortcut.id), shortcut]);
  }, []);

  const unregisterShortcut = useCallback((id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const toggleHints = useCallback(() => {
    setShowHints(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle ? key to open shortcuts modal
      if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        openModal();
        return;
      }

      // Handle G mode activation
      if (event.key === 'g' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        setIsGModeActive(true);
        setTimeout(() => setIsGModeActive(false), 1000);
        return;
      }

      // Find and execute matching shortcuts
      const key = `${event.ctrlKey ? 'ctrl+' : ''}${event.metaKey ? 'cmd+' : ''}${event.altKey ? 'alt+' : ''}${event.shiftKey ? 'shift+' : ''}${event.key.toLowerCase()}`;
      
      const matchingShortcut = shortcuts.find(s => 
        s.key === key && 
        s.enabled !== false &&
        (!s.scope || s.scope === currentScope || s.scope === 'global')
      );

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, currentScope, openModal]);

  return (
    <KeyboardShortcutsContext.Provider value={{
      shortcuts,
      currentScope,
      isGModeActive,
      showHints,
      isModalOpen,
      registerShortcut,
      unregisterShortcut,
      openModal,
      closeModal,
      setCurrentScope,
      toggleHints
    }}>
      {children}
    </KeyboardShortcutsContext.Provider>
  );
}

export function useKeyboardShortcuts() {
  const context = useContext(KeyboardShortcutsContext);
  if (!context) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider');
  }
  return context;
}
