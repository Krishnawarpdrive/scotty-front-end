
import React from 'react';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import { StatusIndicator, vendorStatusConfig } from '@/design-system/components/StatusIndicator/StatusIndicator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EditIcon, MessageSquareIcon, FileTextIcon, StarIcon } from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';

interface VendorDetailHeaderProps {
  vendor: Vendor;
}

export const VendorDetailHeader: React.FC<VendorDetailHeaderProps> = ({ vendor }) => {
  const handleEditVendor = () => {
    console.log('Edit vendor:', vendor.id);
  };

  const handleSendMessage = () => {
    console.log('Send message to vendor:', vendor.id);
  };

  const handleViewContract = () => {
    console.log('View contract for vendor:', vendor.id);
  };

  return (
    <PageHeader
      title={vendor.name}
      subtitle={`Vendor ID: ${vendor.vendorId} • Primary Contact: ${vendor.contactInfo.primaryContact}`}
      breadcrumbs={[
        { label: 'AMS', href: '/ams' },
        { label: 'Vendor Management', href: '/ams/vendor-management' },
        { label: vendor.name }
      ]}
      status={{
        label: vendor.status,
        variant: vendor.status === 'Active' ? 'default' : vendor.status === 'Paused' ? 'secondary' : 'destructive'
      }}
      actions={[
        {
          label: 'Edit Vendor',
          onClick: handleEditVendor,
          variant: 'outline',
          icon: <EditIcon className="h-4 w-4 mr-2" />
        },
        {
          label: 'Send Message',
          onClick: handleSendMessage,
          variant: 'outline',
          icon: <MessageSquareIcon className="h-4 w-4 mr-2" />
        },
        {
          label: 'View Contract',
          onClick: handleViewContract,
          variant: 'default',
          icon: <FileTextIcon className="h-4 w-4 mr-2" />
        }
      ]}
    />
  );
};
