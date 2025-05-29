
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AGGridTable } from "@/components/ag-grid/AGGridTable";
import { createStandardColumns, commonColumns } from "@/components/ag-grid/utils/columnUtils";
import RoleDetailDrawer from './drawer/RoleDetailDrawer';
import { ColDef } from 'ag-grid-community';

interface RolesTabContentProps {
  rolesData: any[];
  handleClientClick: (clientName: string) => void;
  handleRowClick: (item: any) => void;
}

const RolesTabContent = ({ rolesData, handleClientClick, handleRowClick }: RolesTabContentProps) => {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleRoleClick = (role: any) => {
    setSelectedRole(role);
    setDrawerOpen(true);
  };

  const handleRowAction = (action: string, rowData: any) => {
    switch (action) {
      case 'view':
        handleRoleClick(rowData);
        break;
      default:
        console.log(`Action ${action} for role:`, rowData);
    }
  };

  // AG Grid column definitions
  const columnDefs: ColDef[] = [
    ...createStandardColumns([
      { 
        field: 'name', 
        headerName: 'Role Name', 
        width: 200,
        cellRenderer: (params: any) => (
          <button
            onClick={() => handleRoleClick(params.data)}
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left font-medium"
            style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}
          >
            {params.value}
          </button>
        )
      },
      { field: 'category', headerName: 'Category', width: 150 },
      { field: 'work_mode', headerName: 'Work Mode', width: 120 },
      { field: 'employment_type', headerName: 'Employment Type', width: 140 },
      { 
        field: 'client', 
        headerName: 'Client', 
        width: 150,
        cellRenderer: (params: any) => (
          <button
            onClick={() => handleClientClick(params.value)}
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            {params.value}
          </button>
        )
      },
      { field: 'status', headerName: 'Status', width: 120, type: 'status' },
      { field: 'created_at', headerName: 'Created', width: 150, type: 'date' }
    ]),
    commonColumns.actions(handleRowAction)
  ];

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedRole(null);
  };

  return (
    <>
      <Card className="border shadow-sm">
        <div className="overflow-x-auto">
          <AGGridTable
            title="Roles"
            rowData={rolesData}
            columnDefs={columnDefs}
            totalCount={rolesData.length}
            selectedCount={selectedRoles.length}
            onRowClicked={(event) => handleRowClick(event.data)}
            height="600px"
          />
        </div>
      </Card>

      <RoleDetailDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        roleData={selectedRole}
      />
    </>
  );
};

export default RolesTabContent;
