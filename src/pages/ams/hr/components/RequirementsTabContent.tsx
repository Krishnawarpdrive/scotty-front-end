
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AGGridTable } from "@/components/ag-grid/AGGridTable";
import { createStandardColumns, commonColumns } from "@/components/ag-grid/utils/columnUtils";
import { ColDef } from 'ag-grid-community';

interface RequirementsTabContentProps {
  requirementsData: any[];
  handleRowClick: (item: any) => void;
}

const RequirementsTabContent = ({ requirementsData, handleRowClick }: RequirementsTabContentProps) => {
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);

  const handleRowAction = (action: string, rowData: any) => {
    switch (action) {
      case 'view':
        handleRowClick(rowData);
        break;
      default:
        console.log(`Action ${action} for requirement:`, rowData);
    }
  };

  // AG Grid column definitions
  const columnDefs: ColDef[] = [
    ...createStandardColumns([
      { field: 'name', headerName: 'Requirement Name', width: 200 },
      { field: 'client', headerName: 'Client', width: 150 },
      { field: 'role', headerName: 'Role', width: 150 },
      { field: 'priority', headerName: 'Priority', width: 120, type: 'status' },
      { field: 'status', headerName: 'Status', width: 120, type: 'status' },
      { field: 'assigned_to', headerName: 'Assigned To', width: 150 },
      { field: 'vacancies', headerName: 'Vacancies', width: 100, type: 'number' },
      { field: 'due_date', headerName: 'Due Date', width: 150, type: 'date' },
      { field: 'created_at', headerName: 'Created', width: 150, type: 'date' }
    ]),
    commonColumns.actions(handleRowAction)
  ];

  return (
    <Card className="border shadow-sm">
      <div className="overflow-x-auto">
        <AGGridTable
          title="Requirements"
          rowData={requirementsData}
          columnDefs={columnDefs}
          totalCount={requirementsData.length}
          selectedCount={selectedRequirements.length}
          onRowClicked={(event) => handleRowClick(event.data)}
          height="600px"
        />
      </div>
    </Card>
  );
};

export default RequirementsTabContent;
