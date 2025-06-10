
import { useState } from 'react';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export const useChecklistItems = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);

  const addItem = () => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: '',
      completed: false
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItemText = (index: number, text: string) => {
    setItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, text } : item
      )
    );
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    setItems(prev => {
      const newItems = [...prev];
      const draggedItem = newItems[dragIndex];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, draggedItem);
      return newItems;
    });
  };

  const getValidItems = () => {
    return items.filter(item => item.text.trim() !== '');
  };

  const resetItems = () => {
    setItems([]);
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
