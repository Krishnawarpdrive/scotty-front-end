
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRolePage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to roles page and trigger the drawer to open
    navigate('/ams/roles', { 
      state: { openRoleDrawer: true } 
    });
  }, [navigate]);

  return null;
};

export default CreateRolePage;
