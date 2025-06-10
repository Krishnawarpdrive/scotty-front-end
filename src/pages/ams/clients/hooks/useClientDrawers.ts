
import { useState } from 'react';

export const useClientDrawers = () => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isRoleDrawerOpen, setIsRoleDrawerOpen] = useState(false);
  
  const handleEditClient = () => {
    setIsEditDrawerOpen(true);
  };
  
  const handleCreateRole = () => {
    setIsRoleDrawerOpen(true);
  };

  return {
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    isRoleDrawerOpen,
    setIsRoleDrawerOpen,
    handleEditClient,
    handleCreateRole
  };
};
