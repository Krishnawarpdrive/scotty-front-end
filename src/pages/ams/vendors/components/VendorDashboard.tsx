
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  SearchIcon, 
  FilterIcon, 
  UsersIcon, 
  BriefcaseIcon,
  TrendingUpIcon,
  AlertTriangleIcon
} from 'lucide-react';
import { useVendors } from '../hooks/useVendors';
import { VendorsTable } from './VendorsTable';
import { VendorDetailDrawer } from './VendorDetailDrawer';
import { Vendor } from '../types/VendorTypes';

export const VendorDashboard: React.FC = () => {
  const { vendors, isLoading } = useVendors();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDetailDrawerOpen(true);
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.vendorId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary metrics
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === 'Active').length;
  const totalRoles = vendors.reduce((sum, v) => sum + v.rolesAssigned, 0);
  const slaBreaches = vendors.filter(v => v.slaStatus === 'Breach').length;

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
              <p className="text-gray-600 mt-1">Manage and track vendor performance</p>
            </div>
            <Button>
              <UsersIcon className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                      <p className="text-2xl font-bold text-gray-900">{totalVendors}</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                      <p className="text-2xl font-bold text-gray-900">{activeVendors}</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUpIcon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Roles</p>
                      <p className="text-2xl font-bold text-gray-900">{totalRoles}</p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BriefcaseIcon className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">SLA Breaches</p>
                      <p className="text-2xl font-bold text-gray-900">{slaBreaches}</p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge 
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={statusFilter === 'Active' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setStatusFilter('Active')}
                  >
                    Active
                  </Badge>
                  <Badge 
                    variant={statusFilter === 'Inactive' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setStatusFilter('Inactive')}
                  >
                    Inactive
                  </Badge>
                  <Badge 
                    variant={statusFilter === 'Paused' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setStatusFilter('Paused')}
                  >
                    Paused
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

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
