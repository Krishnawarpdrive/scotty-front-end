
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { Vendor } from '../types/VendorTypes';
import { createVendorTableColumns } from './table/vendorTableColumns';

interface VendorsTableProps {
  vendors: Vendor[];
  onVendorSelect?: (vendor: Vendor) => void;
}

export const VendorsTable: React.FC<VendorsTableProps> = ({ 
  vendors, 
  onVendorSelect 
}) => {
  const handleVendorClick = (vendor: Vendor) => {
    console.log('Vendor clicked:', vendor);
    if (onVendorSelect) {
      onVendorSelect(vendor);
    }
  };

  const columns = createVendorTableColumns({ onVendorClick: handleVendorClick });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendors ({vendors.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={vendors}
          columns={columns}
          onRowClick={handleVendorClick}
        />
      </CardContent>
    </Card>
  );
};
