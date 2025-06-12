
import { useNavigate } from 'react-router-dom';
import { Vendor } from '../../types/VendorTypes';

export const useVendorTableActions = () => {
  const navigate = useNavigate();

  const handleVendorClick = (vendor: Vendor) => {
    navigate(`/ams/vendor-management/${vendor.id}`);
  };

  return {
    handleVendorClick
  };
};
