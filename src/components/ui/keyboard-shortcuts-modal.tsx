
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { Search, Navigation, Zap, HelpCircle, Workflow, Database } from 'lucide-react';

const categoryIcons = {
  navigation: Navigation,
  search: Search,
  actions: Zap,
  help: HelpCircle,
  workflow: Workflow,
  crud: Database,
};

const categoryNames = {
  navigation: 'Navigation',
  search: 'Search & Filters',
  actions: 'Actions',
  help: 'Help',
  workflow: 'Workflow',
  crud: 'Create/Edit/Delete',
};

export const KeyboardShortcutsModal: React.FC = () => {
  const { isModalOpen, closeModal, shortcuts, currentScope } = useKeyboardShortcuts();

  // Group shortcuts by category and separate G mode shortcuts
  const regularShortcuts = shortcuts.filter(s => !s.key.startsWith('g+'));
  const gModeShortcuts = shortcuts.filter(s => s.key.startsWith('g+'));

  const shortcutsByCategory = regularShortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcuts>);

  const gModeShortcutsByCategory = gModeShortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcuts>);

  const formatShortcutKey = (key: string) => {
    if (key.startsWith('g+')) {
      return `G + ${key.split('+')[1]?.toUpperCase()}`;
    }
    return key
      .split('+')
      .map(k => k.charAt(0).toUpperCase() + k.slice(1))
      .join(' + ');
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Keyboard Shortcuts
            <Badge variant="outline" className="ml-2 text-xs">
              Current scope: {currentScope}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Regular Shortcuts */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2">Regular Shortcuts</h3>
            
            {Object.entries(shortcutsByCategory).map(([category, categoryShortcuts]) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
              
              return (
                <div key={category} className="space-y-3">
                  <h4 className="flex items-center gap-2 font-medium text-sm">
                    <IconComponent className="h-4 w-4" />
                    {categoryNames[category as keyof typeof categoryNames]}
                  </h4>
                  
                  <div className="space-y-2">
                    {categoryShortcuts.map((shortcut) => (
                      <div
                        key={shortcut.id}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm"
                      >
                        <span>{shortcut.description}</span>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {formatShortcutKey(shortcut.key)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* G Mode Shortcuts */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              G Mode Shortcuts
              <Badge variant="secondary" className="text-xs">Press G to activate</Badge>
            </h3>
            
            {Object.entries(gModeShortcutsByCategory).map(([category, categoryShortcuts]) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
              
              return (
                <div key={category} className="space-y-3">
                  <h4 className="flex items-center gap-2 font-medium text-sm">
                    <IconComponent className="h-4 w-4" />
                    {categoryNames[category as keyof typeof categoryNames]}
                  </h4>
                  
                  <div className="space-y-2">
                    {categoryShortcuts.map((shortcut) => (
                      <div
                        key={shortcut.id}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm"
                      >
                        <span>{shortcut.description}</span>
                        <Badge variant="secondary" className="font-mono text-xs bg-blue-100">
                          {formatShortcutKey(shortcut.key)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {Object.keys(shortcutsByCategory).length === 0 && Object.keys(gModeShortcutsByCategory).length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No keyboard shortcuts registered for the current scope.
          </div>
        )}

        <div className="mt-6 p-4 bg-muted/30 rounded-md space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Press <Badge variant="outline" className="font-mono mx-1">?</Badge> 
            to open this help modal at any time.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>G Mode:</strong> Press <Badge variant="outline" className="font-mono mx-1">G</Badge> 
            to activate navigation mode, then press the highlighted letter to navigate quickly.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
