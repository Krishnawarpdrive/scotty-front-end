
import { useState, useEffect } from 'react';
import { Checklist } from '../types';
import { mockChecklists } from '../data/mockData';

export const useChecklistsData = () => {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [isLoading] = useState(false);

  useEffect(() => {
    // Load mock data
    setChecklists(mockChecklists);
  }, []);

  const createChecklist = async (checklistData: Partial<Checklist>) => {
    const newChecklist: Checklist = {
      id: Date.now().toString(),
      name: checklistData.name || '',
      type: checklistData.type || 'general',
      description: checklistData.description,
      items: checklistData.items || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setChecklists(prev => [...prev, newChecklist]);
    return newChecklist;
  };

  const updateChecklist = async (id: string, updates: Partial<Checklist>) => {
    setChecklists(prev => 
      prev.map(checklist => 
        checklist.id === id 
          ? { ...checklist, ...updates, updatedAt: new Date().toISOString() }
          : checklist
      )
    );
  };

  const deleteChecklist = async (id: string) => {
    setChecklists(prev => prev.filter(checklist => checklist.id !== id));
  };

  return {
    checklists,
    isLoading,
    createChecklist,
    updateChecklist,
    deleteChecklist
  };
};
