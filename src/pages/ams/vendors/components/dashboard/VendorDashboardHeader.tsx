
import React from 'react';
import { Button } from '@/components/ui/button';
import { UsersIcon } from 'lucide-react';

export const VendorDashboardHeader: React.FC = () => {
  return (
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
  );
};
