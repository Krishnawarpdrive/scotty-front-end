
import React from 'react';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getRolesColumns } from './table-columns/rolesColumns';

interface RolesTabContentProps {
  rolesData: any[];
  handleClientClick: (clientName: string) => void;
  handleRowClick: (item: any) => void;
}

const RolesTabContent = ({ rolesData, handleClientClick, handleRowClick }: RolesTabContentProps) => {
  const columns = React.useMemo(() => getRolesColumns(handleClientClick), [handleClientClick]);

  return (
    <Card className="border shadow-sm">
      <div className="overflow-x-auto">
        <DataTable 
          data={rolesData}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>
    </Card>
  );
};

export default RolesTabContent;
