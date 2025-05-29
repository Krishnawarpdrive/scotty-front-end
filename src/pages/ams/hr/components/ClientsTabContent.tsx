
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AGGridTable } from "@/components/ag-grid/AGGridTable";
import { createStandardColumns, commonColumns } from "@/components/ag-grid/utils/columnUtils";
import { ColDef } from 'ag-grid-community';

interface ClientsTabContentProps {
  clientsData: any[];
  handleClientClick: (clientName: string) => void;
  handleRowClick: (item: any) => void;
}

const ClientsTabContent = ({ clientsData, handleClientClick, handleRowClick }: ClientsTabContentProps) => {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const handleRowAction = (action: string, rowData: any) => {
    switch (action) {
      case 'view':
        handleClientClick(rowData.name);
        break;
      default:
        console.log(`Action ${action} for client:`, rowData);
    }
  };

  // AG Grid column definitions
  const columnDefs: ColDef[] = [
    ...createStandardColumns([
      { 
        field: 'name', 
        headerName: 'Client Name', 
        width: 200,
        cellRenderer: (params: any) => (
          <button
            onClick={() => handleClientClick(params.value)}
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left font-medium"
            style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}
          >
            {params.value}
          </button>
        )
      },
      { field: 'contact', headerName: 'Contact', width: 150 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'status', headerName: 'Status', width: 120, type: 'status' },
      { field: 'account_type', headerName: 'Account Type', width: 140 },
      { field: 'assigned_hr', headerName: 'Assigned HR', width: 150 },
      { field: 'total_requirements', headerName: 'Requirements', width: 120, type: 'number' },
      { field: 'health_score', headerName: 'Health Score', width: 120, type: 'number' },
      { field: 'created_on', headerName: 'Created', width: 150, type: 'date' }
    ]),
    commonColumns.actions(handleRowAction)
  ];

  return (
    <Card className="border shadow-sm">
      <div className="overflow-x-auto">
        <AGGridTable
          title="Clients"
          rowData={clientsData}
          columnDefs={columnDefs}
          totalCount={clientsData.length}
          selectedCount={selectedClients.length}
          onRowClicked={(event) => handleRowClick(event.data)}
          height="600px"
        />
      </div>
    </Card>
  );
};

export default ClientsTabContent;
