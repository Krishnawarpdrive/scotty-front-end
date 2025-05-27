
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { Search, Navigation, Zap, HelpCircle } from 'lucide-react';

const categoryIcons = {
  navigation: Navigation,
  search: Search,
  actions: Zap,
  help: HelpCircle,
};

const categoryNames = {
  navigation: 'Navigation',
  search: 'Search',
  actions: 'Actions',
  help: 'Help',
};

export const KeyboardShortcutsModal: React.FC = () => {
  const { isModalOpen, closeModal, shortcuts } = useKeyboardShortcuts();

  const shortcutsByCategory = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcuts>);

  const formatShortcutKey = (key: string) => {
    return key
      .split('+')
      .map(k => k.charAt(0).toUpperCase() + k.slice(1))
      .join(' + ');
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {Object.entries(shortcutsByCategory).map(([category, categoryShortcuts]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            
            return (
              <div key={category} className="space-y-3">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <IconComponent className="h-4 w-4" />
                  {categoryNames[category as keyof typeof categoryNames]}
                </h3>
                
                <div className="space-y-2">
                  {categoryShortcuts.map((shortcut) => (
                    <div
                      key={shortcut.id}
                      className="flex items-center justify-between p-3 rounded-md bg-muted/50"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {formatShortcutKey(shortcut.key)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {Object.keys(shortcutsByCategory).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No keyboard shortcuts registered yet.
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-md">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Press <Badge variant="outline" className="font-mono mx-1">?</Badge> 
            to open this help modal at any time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
