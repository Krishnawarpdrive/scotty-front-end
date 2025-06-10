
import { useState } from 'react';

interface Checklist {
  id: string;
  title: string;
  type: string;
  description?: string;
  items: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useChecklistsData = () => {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      title: 'Frontend Developer Interview Checklist',
      type: 'interview',
      description: 'Standard checklist for frontend developer interviews',
      items: [
        'JavaScript fundamentals',
        'React/Vue experience', 
        'CSS/HTML proficiency',
        'Problem-solving skills'
      ],
      isActive: true,
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

  return {
    checklists,
    addChecklist
  };
};
