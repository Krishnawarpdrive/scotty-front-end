
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';

export const KeyboardHintsOverlay: React.FC = () => {
  const { shortcuts, currentScope, isGModeActive, showHints } = useKeyboardShortcuts();

  if (!showHints || !isGModeActive) return null;

  // Get G mode shortcuts for current scope
  const gModeShortcuts = shortcuts.filter(s => 
    s.key.startsWith('g+') && 
    (s.scope === currentScope || s.scope === 'global' || !s.scope) &&
    s.enabled !== false
  );

  if (gModeShortcuts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute top-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="bg-blue-600 text-white">G</Badge>
          <span className="text-sm font-medium">Mode Active</span>
        </div>
        
        <div className="space-y-2">
          {gModeShortcuts.map((shortcut) => (
            <div key={shortcut.id} className="flex items-center justify-between text-xs">
              <span>{shortcut.description}</span>
              <Badge variant="outline" className="ml-2 font-mono text-xs bg-gray-800 border-gray-600">
                {shortcut.key.split('+')[1]?.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-gray-300">
          Press <Badge variant="outline" className="mx-1 text-xs">ESC</Badge> to exit
        </div>
      </div>
    </div>
  );
};
