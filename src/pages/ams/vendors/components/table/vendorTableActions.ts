
import { useCallback } from 'react';
import { Vendor } from '../../types/VendorTypes';

export const useVendorTableActions = () => {
  const handleVendorClick = useCallback((vendor: Vendor) => {
    console.log('Vendor clicked:', vendor);
    // This will be handled by the parent component
  }, []);

  return {
    handleVendorClick
  };
};
