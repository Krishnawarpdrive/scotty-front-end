
import { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';

export const useChecklistItems = (
  initialItems: ChecklistItem[] = [{ id: '1', text: '', completed: false }],
  onChange?: (items: ChecklistItem[]) => void
) => {
  // Ensure initialItems is always a valid array
  const sanitizedInitialItems = Array.isArray(initialItems) ? initialItems : [{ id: '1', text: '', completed: false }];
  const [items, setItems] = useState<ChecklistItem[]>(sanitizedInitialItems);
  
  // Update external state when items change
  useEffect(() => {
    if (onChange && Array.isArray(items)) {
      onChange(items);
    }
  }, [items, onChange]);
  
  // Add a new item
  const addItem = () => {
    const newItem: ChecklistItem = { 
      id: Date.now().toString(), 
      text: '', 
      completed: false 
    };
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      return [...currentItems, newItem];
    });
  };
  
  // Remove an item
  const removeItem = (index: number) => {
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      return currentItems.filter((_, i) => i !== index);
    });
  };
  
  // Update item text
  const updateItemText = (index: number, text: string) => {
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      if (index < 0 || index >= currentItems.length) return currentItems;
      
      const updatedItems = [...currentItems];
      updatedItems[index] = { ...updatedItems[index], text };
      return updatedItems;
    });
  };
  
  // Move item (for drag and drop)
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      if (dragIndex < 0 || dragIndex >= currentItems.length || hoverIndex < 0 || hoverIndex >= currentItems.length) {
        return currentItems;
      }
      
      const dragItem = currentItems[dragIndex];
      const newItems = [...currentItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      return newItems;
    });
  };
  
  // Get valid items (non-empty)
  const getValidItems = () => {
    const currentItems = Array.isArray(items) ? items : [];
    return currentItems.filter(item => item && item.text && item.text.trim() !== '');
  };
  
  // Reset to initial state
  const resetItems = () => {
    setItems([{ id: Date.now().toString(), text: '', completed: false }]);
  };
  
  return {
    items: Array.isArray(items) ? items : [],
    setItems,
    addItem,
    removeItem,
    updateItemText,
    moveItem,
    getValidItems,
    resetItems
  };
};
