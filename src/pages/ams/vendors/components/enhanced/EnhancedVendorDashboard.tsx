
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedVendorsTable } from './EnhancedVendorsTable';
import { useVendors } from '../../hooks/useVendors';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';
import { Plus, Download, Filter, TrendingUp, Users, Star, AlertTriangle } from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';

export function EnhancedVendorDashboard() {
  const { vendors, loading, refetch } = useVendors();
  const toast = useEnhancedToast();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    // Navigate to vendor details page
    console.log('View vendor details:', vendor);
  };

  const handleEditVendor = (vendor: Vendor) => {
    console.log('Edit vendor:', vendor);
    toast.info({
      title: 'Edit Vendor',
      description: `Opening edit form for ${vendor.name}`
    });
  };

  const handleDeleteVendor = (vendor: Vendor) => {
    console.log('Delete vendor:', vendor);
  };

  const handleActivateVendors = (vendorList: Vendor[]) => {
    console.log('Activate vendors:', vendorList);
  };

  const handleDeactivateVendors = (vendorList: Vendor[]) => {
    console.log('Deactivate vendors:', vendorList);
  };

  const handleExportVendors = (vendorList: Vendor[]) => {
    console.log('Export vendors:', vendorList);
    // Implement CSV export logic
    const csvData = vendorList.map(vendor => ({
      Name: vendor.name,
      'Vendor ID': vendor.vendorId,
      Status: vendor.status,
      Tier: vendor.tier,
      Rating: vendor.rating,
      'Active Roles': vendor.rolesAssigned,
      'SLA Status': vendor.slaStatus,
      'Last Active': vendor.lastActiveDate
    }));
    
    // Simple CSV download implementation
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendors-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate dashboard metrics
  const metrics = React.useMemo(() => {
    if (!vendors.length) return { active: 0, premium: 0, avgRating: 0, slaBreaches: 0 };
    
    return {
      active: vendors.filter(v => v.status === 'Active').length,
      premium: vendors.filter(v => v.tier === 'Premium').length,
      avgRating: vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length,
      slaBreaches: vendors.filter(v => v.slaStatus === 'Breach').length
    };
  }, [vendors]);

  const pageActions = (
    <>
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Advanced Filters
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExportVendors(vendors)}>
        <Download className="h-4 w-4 mr-2" />
        Export All
      </Button>
      <Button size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Vendor
      </Button>
    </>
  );

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Vendor Management"
        subtitle="Manage vendor relationships, performance, and SLA compliance"
        actions={pageActions}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-green-600">{metrics.active}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Premium Vendors</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.premium}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{metrics.avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SLA Breaches</p>
                <p className="text-2xl font-bold text-red-600">{metrics.slaBreaches}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Vendors Table */}
      <EnhancedVendorsTable
        vendors={vendors}
        loading={loading}
        onRefresh={refetch}
        onViewDetails={handleViewDetails}
        onEditVendor={handleEditVendor}
        onDeleteVendor={handleDeleteVendor}
        onActivateVendors={handleActivateVendors}
        onDeactivateVendors={handleDeactivateVendors}
        onExportVendors={handleExportVendors}
      />
    </motion.div>
  );
}
