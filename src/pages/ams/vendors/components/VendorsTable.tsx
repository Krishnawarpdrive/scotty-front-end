
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { Vendor } from '../types/VendorTypes';
import { createVendorTableColumns } from './table/vendorTableColumns';
import { useVendorTableActions } from './table/vendorTableActions';

interface VendorsTableProps {
  vendors: Vendor[];
  onVendorSelect?: (vendor: Vendor) => void;
}

export const VendorsTable: React.FC<VendorsTableProps> = ({ 
  vendors, 
  onVendorSelect 
}) => {
  const { handleVendorClick } = useVendorTableActions();
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
