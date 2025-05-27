
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface KeyboardShortcut {
  id: string;
  key: string;
  description: string;
  category: 'navigation' | 'search' | 'actions' | 'help' | 'workflow' | 'crud';
  action: () => void;
  scope?: string;
  enabled?: boolean;
  hint?: string;
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
  isGModeActive: boolean;
  showHints: boolean;
  setShowHints: (show: boolean) => void;
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
  const [isGModeActive, setIsGModeActive] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [gModeTimeout, setGModeTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const activateGMode = () => {
    setIsGModeActive(true);
    setShowHints(true);
    
    // Clear existing timeout
    if (gModeTimeout) {
      clearTimeout(gModeTimeout);
    }
    
    // Set timeout to deactivate G mode after 3 seconds
    const timeout = setTimeout(() => {
      setIsGModeActive(false);
      setShowHints(false);
    }, 3000);
    
    setGModeTimeout(timeout);
  };

  const deactivateGMode = () => {
    setIsGModeActive(false);
    setShowHints(false);
    if (gModeTimeout) {
      clearTimeout(gModeTimeout);
      setGModeTimeout(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const hasModifier = event.ctrlKey || event.metaKey;
      const hasShift = event.shiftKey;
      const hasAlt = event.altKey;

      // Ignore if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      // Help modal shortcut (?)
      if (key === '?' && !hasModifier && !isGModeActive) {
        event.preventDefault();
        openModal();
        return;
      }

      // G mode activation
      if (key === 'g' && !hasModifier && !isGModeActive) {
        event.preventDefault();
        activateGMode();
        return;
      }

      // Handle G mode shortcuts
      if (isGModeActive && !hasModifier) {
        event.preventDefault();
        deactivateGMode();
        
        // Find G mode shortcut
        const gShortcut = shortcuts.find(s => 
          s.key === `g+${key}` && 
          (s.enabled !== false) &&
          (s.scope === currentScope || s.scope === 'global' || !s.scope)
        );
        
        if (gShortcut) {
          gShortcut.action();
        }
        return;
      }

      // Escape key deactivates G mode
      if (key === 'escape' && isGModeActive) {
        event.preventDefault();
        deactivateGMode();
        return;
      }

      // Handle regular shortcuts
      let shortcutKey = '';
      if (hasModifier) {
        const modifiers = [];
        if (hasShift) modifiers.push('shift');
        if (hasAlt) modifiers.push('alt');
        modifiers.push('ctrl');
        shortcutKey = `${modifiers.join('+')}+${key}`;
      } else {
        shortcutKey = key;
      }

      const matchingShortcut = shortcuts.find(s => 
        s.key === shortcutKey && 
        (s.enabled !== false) &&
        (s.scope === currentScope || s.scope === 'global' || !s.scope) &&
        !s.key.startsWith('g+') // Exclude G mode shortcuts from regular handling
      );

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (gModeTimeout) {
        clearTimeout(gModeTimeout);
      }
    };
  }, [shortcuts, currentScope, isGModeActive, gModeTimeout]);

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
        isGModeActive,
        showHints,
        setShowHints,
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  );
};
