
import { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';

export const useChecklistItems = (
  initialItems: ChecklistItem[] = [{ id: '1', text: '', completed: false }],
  onChange?: (items: ChecklistItem[]) => void
) => {
  // Ensure initialItems is always a valid array
  const sanitizedInitialItems = Array.isArray(initialItems) && initialItems.length > 0 
    ? initialItems 
    : [{ id: '1', text: '', completed: false }];
    
  const [items, setItems] = useState<ChecklistItem[]>(sanitizedInitialItems);
  
  // Update external state when items change
  useEffect(() => {
    if (onChange && Array.isArray(items)) {
      console.log('useChecklistItems - onChange called with:', items);
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
      const newItems = [...currentItems, newItem];
      console.log('useChecklistItems - addItem, new items:', newItems);
      return newItems;
    });
  };
  
  // Remove an item
  const removeItem = (index: number) => {
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      const newItems = currentItems.filter((_, i) => i !== index);
      console.log('useChecklistItems - removeItem, new items:', newItems);
      return newItems;
    });
  };
  
  // Update item text
  const updateItemText = (index: number, text: string) => {
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      if (index < 0 || index >= currentItems.length) {
        console.log('useChecklistItems - updateItemText, invalid index:', index);
        return currentItems;
      }
      
      const updatedItems = [...currentItems];
      updatedItems[index] = { ...updatedItems[index], text };
      console.log('useChecklistItems - updateItemText, updated items:', updatedItems);
      return updatedItems;
    });
  };
  
  // Move item (for drag and drop)
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      if (dragIndex < 0 || dragIndex >= currentItems.length || hoverIndex < 0 || hoverIndex >= currentItems.length) {
        console.log('useChecklistItems - moveItem, invalid indices:', dragIndex, hoverIndex);
        return currentItems;
      }
      
      const dragItem = currentItems[dragIndex];
      const newItems = [...currentItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      console.log('useChecklistItems - moveItem, new items:', newItems);
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
    const resetItems = [{ id: Date.now().toString(), text: '', completed: false }];
    console.log('useChecklistItems - resetItems:', resetItems);
    setItems(resetItems);
  };
  
  console.log('useChecklistItems - current items:', items);
  
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
