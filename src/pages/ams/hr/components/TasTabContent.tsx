
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AGGridTable } from "@/components/ag-grid/AGGridTable";
import { createStandardColumns, commonColumns } from "@/components/ag-grid/utils/columnUtils";
import { ColDef } from 'ag-grid-community';

interface TasTabContentProps {
  tasData: any[];
  handleRowClick: (item: any) => void;
}

const TasTabContent = ({ tasData, handleRowClick }: TasTabContentProps) => {
  const [selectedTAs, setSelectedTAs] = useState<string[]>([]);

  const handleRowAction = (action: string, rowData: any) => {
    switch (action) {
      case 'view':
        handleRowClick(rowData);
        break;
      default:
        console.log(`Action ${action} for TA:`, rowData);
    }
  };

  // AG Grid column definitions
  const columnDefs: ColDef[] = [
    ...createStandardColumns([
      { field: 'name', headerName: 'TA Name', width: 200 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'specialization', headerName: 'Specialization', width: 150 },
      { field: 'status', headerName: 'Status', width: 120, type: 'status' },
      { field: 'active_requirements', headerName: 'Active Req.', width: 120, type: 'number' },
      { field: 'performance_score', headerName: 'Performance', width: 120, type: 'number' },
      { field: 'joined_date', headerName: 'Joined', width: 150, type: 'date' }
    ]),
    commonColumns.actions(handleRowAction)
  ];

  return (
    <Card className="border shadow-sm">
      <div className="overflow-x-auto">
        <AGGridTable
          title="Team Members"
          rowData={tasData}
          columnDefs={columnDefs}
          totalCount={tasData.length}
          selectedCount={selectedTAs.length}
          onRowClicked={(event) => handleRowClick(event.data)}
          height="600px"
        />
      </div>
    </Card>
  );
};

export default TasTabContent;
