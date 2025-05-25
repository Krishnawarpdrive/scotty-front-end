
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
      if (column.id === 'roleName' || column.accessorKey === 'name') {
        return {
          ...column,
          cell: (role: any) => (
            <button
              onClick={() => handleRoleClick(role)}
              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left font-medium"
              style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}
            >
              {role.name || role.roleName}
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
