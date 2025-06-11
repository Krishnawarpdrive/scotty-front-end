
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorManagementPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the correct vendors path
    navigate('/ams/vendors', { replace: true });
  }, [navigate]);

  return null;
};

export default VendorManagementPage;
