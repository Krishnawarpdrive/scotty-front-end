
import React from 'react';
import { motion } from 'framer-motion';
import { useVendors } from '../hooks/useVendors';
import { useVendorDashboard } from '../hooks/useVendorDashboard';
import { VendorDashboardHeader } from './dashboard/VendorDashboardHeader';
import { VendorKPICards } from './dashboard/VendorKPICards';
import { VendorFiltersBar } from './dashboard/VendorFiltersBar';
import { VendorsTable } from './VendorsTable';
import { VendorDetailDrawer } from './VendorDetailDrawer';

export const VendorDashboard: React.FC = () => {
  const { vendors, isLoading } = useVendors();
  const {
    selectedVendor,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleVendorSelect,
    filteredVendors,
    metrics
  } = useVendorDashboard(vendors);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vendors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <VendorDashboardHeader />

          {/* KPI Cards */}
          <VendorKPICards
            totalVendors={metrics.totalVendors}
            activeVendors={metrics.activeVendors}
            totalRoles={metrics.totalRoles}
            slaBreaches={metrics.slaBreaches}
          />

          {/* Filters and Search */}
          <VendorFiltersBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Vendors Table */}
          <VendorsTable
            vendors={filteredVendors}
            onVendorSelect={handleVendorSelect}
          />

          {/* Vendor Detail Drawer */}
          <VendorDetailDrawer
            vendor={selectedVendor}
            open={isDetailDrawerOpen}
            onOpenChange={setIsDetailDrawerOpen}
          />
        </motion.div>
      </div>
    </div>
  );
};
