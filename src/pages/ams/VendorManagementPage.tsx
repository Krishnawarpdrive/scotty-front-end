
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorManagementPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the vendors page immediately
    navigate('/ams/vendors', { replace: true });
  }, [navigate]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to Vendor Management...</p>
      </div>
    </div>
  );
};

export default VendorManagementPage;
