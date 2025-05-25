
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
    const newItem: ChecklistItem = { 
      id: Date.now().toString(), // Use timestamp for unique ID
      text: '', 
      completed: false 
    };
    setItems(prevItems => [...prevItems, newItem]);
  };
  
  // Remove an item
  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };
  
  // Update item text
  const updateItemText = (index: number, text: string) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], text };
      return updatedItems;
    });
  };
  
  // Move item (for drag and drop)
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    setItems(prevItems => {
      const dragItem = prevItems[dragIndex];
      const newItems = [...prevItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      return newItems;
    });
  };
  
  // Get valid items (non-empty)
  const getValidItems = () => {
    return items.filter(item => item.text.trim() !== '');
  };
  
  // Reset to initial state
  const resetItems = () => {
    setItems([{ id: Date.now().toString(), text: '', completed: false }]);
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
