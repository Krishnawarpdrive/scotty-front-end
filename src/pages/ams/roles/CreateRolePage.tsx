
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleCreationDrawer from './components/RoleCreationDrawer';

const CreateRolePage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to roles page
    navigate('/ams/roles', { 
      state: { openRoleDrawer: true } 
    });
  }, [navigate]);

  return null;
};

export default CreateRolePage;
