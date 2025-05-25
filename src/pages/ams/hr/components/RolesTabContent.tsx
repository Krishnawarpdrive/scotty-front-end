
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getRolesColumns } from './table-columns/rolesColumns';
import RoleDetailDrawer from './drawer/RoleDetailDrawer';

interface RolesTabContentProps {
  rolesData: any[];
  handleClientClick: (clientName: string) => void;
  handleRowClick: (item: any) => void;
}

const RolesTabContent = ({ rolesData, handleClientClick, handleRowClick }: RolesTabContentProps) => {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRoleClick = (role: any) => {
    setSelectedRole(role);
    setDrawerOpen(true);
  };

  // Create enhanced columns that handle role name clicks
  const columns = React.useMemo(() => {
    const baseColumns = getRolesColumns(handleClientClick);
    
    // Find the role name column and enhance it with click handler
    return baseColumns.map(column => {
      if (column.accessorKey === 'name' || column.header === 'Role Name') {
        return {
          ...column,
          cell: ({ row }: any) => (
            <button
              onClick={() => handleRoleClick(row.original)}
              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left font-medium"
              style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}
            >
              {row.getValue('name') || row.original.name}
            </button>
          ),
        };
      }
      return column;
    });
  }, [handleClientClick]);

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedRole(null);
  };

  return (
    <>
      <Card className="border shadow-sm">
        <div className="overflow-x-auto">
          <DataTable 
            data={rolesData}
            columns={columns}
            onRowClick={handleRowClick}
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
