
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftIcon, EditIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Vendor } from '../../types/VendorTypes';

interface VendorDetailHeaderProps {
  vendor: Vendor;
}

export const VendorDetailHeader: React.FC<VendorDetailHeaderProps> = ({ vendor }) => {
  const navigate = useNavigate();

  const getStatusBadgeVariant = (status: Vendor['status']) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'destructive';
      case 'Paused': return 'secondary';
      default: return 'outline';
    }
  };

  const getSLABadgeVariant = (slaStatus: string) => {
    switch (slaStatus) {
      case 'Good': return 'default';
      case 'Warning': return 'secondary';
      case 'Breach': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ams/vendor-management')}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Vendors
          </Button>
        </div>
        <Button size="sm">
          <EditIcon className="h-4 w-4 mr-2" />
          Edit Vendor
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
              <p className="text-gray-600 mt-1">Vendor ID: {vendor.vendorId}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{vendor.contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{vendor.contactInfo.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Badge variant="outline">{vendor.tier} Tier</Badge>
                <Badge variant={getStatusBadgeVariant(vendor.status)}>
                  {vendor.status}
                </Badge>
                <Badge variant={getSLABadgeVariant(vendor.slaStatus)}>
                  SLA: {vendor.slaStatus}
                </Badge>
                <div className="flex items-center gap-1 ml-2">
                  <span className="text-sm font-medium">{vendor.rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{vendor.rolesAssigned}</div>
              <div className="text-sm text-gray-600">Roles Assigned</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{vendor.activeRequirements}</div>
              <div className="text-sm text-gray-600">Active Requirements</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
