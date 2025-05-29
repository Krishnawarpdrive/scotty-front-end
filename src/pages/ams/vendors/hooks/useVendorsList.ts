
import { useState, useEffect } from 'react';
import { Vendor } from '../types/VendorTypes';
import { mockVendors } from '../data/mockVendorsData';

export const useVendorsList = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setVendors(mockVendors);
        setIsLoading(false);
      }, 1000);
    };

    fetchVendors();
  }, []);

  const deleteVendor = async (vendorId: string) => {
    setVendors(prev => prev.filter(vendor => vendor.id !== vendorId));
  };

  const updateVendorStatus = async (vendorId: string, status: Vendor['status']) => {
    setVendors(prev => 
      prev.map(vendor => 
        vendor.id === vendorId 
          ? { ...vendor, status, updatedAt: new Date().toISOString() }
          : vendor
      )
    );
  };

  return {
    vendors,
    isLoading,
    deleteVendor,
    updateVendorStatus
  };
};
