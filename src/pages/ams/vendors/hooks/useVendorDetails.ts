
import { useState, useEffect } from 'react';
import { Vendor, VendorRole, VendorSubmission, VendorPerformance } from '../types/VendorTypes';
import { mockVendors, getMockVendorRoles, getMockVendorSubmissions } from '../data/mockVendorsData';

export const useVendorDetails = (vendorId: string) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorRoles, setVendorRoles] = useState<VendorRole[]>([]);
  const [vendorSubmissions, setVendorSubmissions] = useState<VendorSubmission[]>([]);
  const [vendorPerformance, setVendorPerformance] = useState<VendorPerformance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vendorId) return;

    const fetchVendorDetail = async () => {
      setIsLoading(true);
      
      const foundVendor = mockVendors.find(v => v.id === vendorId);
      const mockRoles = getMockVendorRoles(vendorId);
      const mockSubmissions = getMockVendorSubmissions(vendorId);

      setTimeout(() => {
        setVendor(foundVendor || null);
        setVendorRoles(mockRoles);
        setVendorSubmissions(mockSubmissions);
        setIsLoading(false);
      }, 500);
    };

    fetchVendorDetail();
  }, [vendorId]);

  return {
    vendor,
    vendorRoles,
    vendorSubmissions,
    vendorPerformance,
    isLoading
  };
};
