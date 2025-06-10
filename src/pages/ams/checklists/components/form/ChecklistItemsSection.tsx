
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { ChecklistItem } from '../../hooks/useChecklistItems';

interface ChecklistItemsSectionProps {
  items: ChecklistItem[];
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, text: string) => void;
}

export const ChecklistItemsSection: React.FC<ChecklistItemsSectionProps> = ({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Checklist Items</Label>
        <Button type="button" variant="outline" size="sm" onClick={onAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <Input
              value={item.text}
              onChange={(e) => onUpdateItem(index, e.target.value)}
              placeholder={`Item ${index + 1}`}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onRemoveItem(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No items added yet. Click "Add Item" to get started.
          </p>
        )}
      </div>
    </div>
  );
};
