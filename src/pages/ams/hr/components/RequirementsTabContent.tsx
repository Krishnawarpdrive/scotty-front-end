
import React from 'react';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getRequirementsColumns } from './table-columns/requirementsColumns';

interface RequirementsTabContentProps {
  requirementsData: any[];
  handleRowClick: (item: any) => void;
}

const RequirementsTabContent = ({ requirementsData, handleRowClick }: RequirementsTabContentProps) => {
  const columns = React.useMemo(() => getRequirementsColumns(), []);

  return (
    <Card className="border shadow-sm">
      <div className="overflow-x-auto">
        <DataTable 
          data={requirementsData}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>
    </Card>
  );
};

export default RequirementsTabContent;
