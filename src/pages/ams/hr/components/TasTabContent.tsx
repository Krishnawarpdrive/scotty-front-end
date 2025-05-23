
import React from 'react';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getTasColumns } from './table-columns/tasColumns';

interface TasTabContentProps {
  tasData: any[];
  handleRowClick: (item: any) => void;
}

const TasTabContent = ({ tasData, handleRowClick }: TasTabContentProps) => {
  const columns = React.useMemo(() => getTasColumns(), []);

  return (
    <Card className="border shadow-sm">
      <div className="overflow-x-auto">
        <DataTable 
          data={tasData}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>
    </Card>
  );
};

export default TasTabContent;
