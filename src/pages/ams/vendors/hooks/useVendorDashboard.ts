
import { useState, useMemo } from 'react';
import { Vendor } from '../types/VendorTypes';

export const useVendorDashboard = (vendors: Vendor[]) => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDetailDrawerOpen(true);
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vendor.vendorId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vendors, searchTerm, statusFilter]);

  // Calculate summary metrics
  const metrics = useMemo(() => ({
    totalVendors: vendors.length,
    activeVendors: vendors.filter(v => v.status === 'Active').length,
    totalRoles: vendors.reduce((sum, v) => sum + v.rolesAssigned, 0),
    slaBreaches: vendors.filter(v => v.slaStatus === 'Breach').length
  }), [vendors]);

  return {
    selectedVendor,
    setSelectedVendor,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleVendorSelect,
    filteredVendors,
    metrics
  };
};
