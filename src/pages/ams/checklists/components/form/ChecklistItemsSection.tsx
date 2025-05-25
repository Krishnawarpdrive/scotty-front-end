
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableItem } from '../DraggableItem';
import { ChecklistItem } from '../../types';
import { useChecklistItems } from '../../hooks/useChecklistItems';

interface ChecklistItemsSectionProps {
  initialItems: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
}

export const ChecklistItemsSection: React.FC<ChecklistItemsSectionProps> = ({ initialItems, onChange }) => {
  const {
    items,
    addItem,
    removeItem,
    updateItemText,
    moveItem
  } = useChecklistItems(initialItems, onChange);
  
  // Ensure items is always an array and filter out any invalid items
  const validItems = Array.isArray(items) ? items.filter(item => 
    item && 
    typeof item === 'object' && 
    typeof item.id === 'string' && 
    typeof item.text === 'string' && 
    typeof item.completed === 'boolean'
  ) : [];
  
  console.log('ChecklistItemsSection - validItems:', validItems);
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Checklist Items</Label>
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto p-2">
        <DndProvider backend={HTML5Backend}>
          {validItems.map((item, index) => {
            console.log('Rendering item:', item, 'at index:', index);
            return (
              <DraggableItem
                key={item.id}
                id={item.id}
                index={index}
                text={item.text}
                onTextChange={(text) => updateItemText(index, text)}
                onRemove={() => removeItem(index)}
                moveItem={moveItem}
              />
            );
          })}
        </DndProvider>
      </div>
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm"
        onClick={addItem}
        className="w-full flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        Add Item
      </Button>
    </div>
  );
};
