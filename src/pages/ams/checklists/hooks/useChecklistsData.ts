
import { useState, useEffect } from 'react';
import { Checklist } from '../types';
import { mockChecklists } from '../data/mockData';

export const useChecklistsData = () => {
  const [checklists, setChecklists] = useState<Checklist[]>(mockChecklists);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Add a new checklist
  const addChecklist = (newChecklist: Checklist) => {
    setChecklists([...checklists, newChecklist]);
  };
  
  // Update an existing checklist
  const updateChecklist = (updatedChecklist: Checklist) => {
    setChecklists(
      checklists.map(checklist => 
        checklist.id === updatedChecklist.id ? updatedChecklist : checklist
      )
    );
  };
  
  // Delete a checklist
  const deleteChecklist = (checklistId: string) => {
    setChecklists(checklists.filter(checklist => checklist.id !== checklistId));
  };
  
  // Find a checklist by ID
  const getChecklistById = (checklistId: string) => {
    return checklists.find(checklist => checklist.id === checklistId);
  };
  
  // Get checklists by type
  const getChecklistsByType = (type: string) => {
    return checklists.filter(checklist => checklist.type === type);
  };
  
  // Get checklists by role
  const getChecklistsByRole = (roleId: string) => {
    return checklists.filter(
      checklist => checklist.type === 'role' && checklist.roleId === roleId
    );
  };
  
  // Get checklists by client
  const getChecklistsByClient = (clientId: string) => {
    return checklists.filter(
      checklist => checklist.type === 'client' && checklist.clientId === clientId
    );
  };
  
  return {
    checklists,
    isLoading,
    addChecklist,
    updateChecklist,
    deleteChecklist,
    getChecklistById,
    getChecklistsByType,
    getChecklistsByRole,
    getChecklistsByClient
  };
};
