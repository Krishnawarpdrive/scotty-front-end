
import { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';

export const useChecklistItems = (
  initialItems: ChecklistItem[] = [{ id: '1', text: '', completed: false }],
  onChange?: (items: ChecklistItem[]) => void
) => {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  
  // Update external state when items change
  useEffect(() => {
    if (onChange) {
      onChange(items);
    }
  }, [items, onChange]);
  
  // Add a new item
  const addItem = () => {
    setItems([
      ...items, 
      { 
        id: (items.length + 1).toString(), 
        text: '', 
        completed: false 
      }
    ]);
  };
  
  // Remove an item
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  // Update item text
  const updateItemText = (index: number, text: string) => {
    const updatedItems = [...items];
    updatedItems[index].text = text;
    setItems(updatedItems);
  };
  
  // Move item (for drag and drop)
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setItems(newItems);
  };
  
  // Get valid items (non-empty)
  const getValidItems = () => {
    return items.filter(item => item.text.trim() !== '');
  };
  
  // Reset to initial state
  const resetItems = () => {
    setItems([{ id: '1', text: '', completed: false }]);
  };
  
  return {
    items,
    setItems,
    addItem,
    removeItem,
    updateItemText,
    moveItem,
    getValidItems,
    resetItems
  };
};
