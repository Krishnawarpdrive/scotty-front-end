
import { useState } from 'react';
import { Checklist } from '../types';

export const useChecklistsData = () => {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      name: 'Frontend Developer Interview Checklist',
      type: 'interview',
      roleId: undefined,
      clientId: undefined,
      subdomain: undefined,
      items: [
        { id: '1', text: 'JavaScript fundamentals', completed: false },
        { id: '2', text: 'React/Vue experience', completed: false },
        { id: '3', text: 'CSS/HTML proficiency', completed: false },
        { id: '4', text: 'Problem-solving skills', completed: false }
      ],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const addChecklist = (newChecklist: Omit<Checklist, 'id' | 'createdAt' | 'updatedAt'>) => {
    const checklist: Checklist = {
      ...newChecklist,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setChecklists(prev => [...prev, checklist]);
  };

  const updateChecklist = (id: string, updates: Partial<Checklist>) => {
    setChecklists(prev => 
      prev.map(checklist => 
        checklist.id === id 
          ? { ...checklist, ...updates, updatedAt: new Date().toISOString() }
          : checklist
      )
    );
  };

  return {
    checklists,
    addChecklist,
    updateChecklist
  };
};
