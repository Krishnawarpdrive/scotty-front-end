
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getRequirementsColumns } from './table-columns/requirementsColumns';
import { RequirementDetailDrawer } from './drawer/RequirementDetailDrawer';

interface RequirementsTabContentProps {
  requirementsData: any[];
  handleRowClick: (item: any) => void;
}

const RequirementsTabContent = ({ requirementsData, handleRowClick }: RequirementsTabContentProps) => {
  const [selectedRequirement, setSelectedRequirement] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRequirementClick = (requirement: any) => {
    setSelectedRequirement(requirement);
    setDrawerOpen(true);
  };

  // Create enhanced columns that handle requirement ID clicks
  const columns = React.useMemo(() => {
    const baseColumns = getRequirementsColumns();
    
    // Find the requirement ID column and enhance it with click handler
    return baseColumns.map(column => {
      if (column.id === 'requirementId') {
        return {
          ...column,
          cell: (req: any) => (
            <button
              onClick={() => handleRequirementClick(req)}
              className="font-medium hover:text-primary cursor-pointer min-w-[80px] inline-block text-blue-600 hover:text-blue-800 hover:underline text-left"
              style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}
            >
              #{req.id.substring(0, 8)}
            </button>
          ),
        };
      }
      return column;
    });
  }, []);

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedRequirement(null);
  };

  return (
    <>
      <Card className="border shadow-sm">
        <div className="overflow-x-auto">
          <DataTable 
            data={requirementsData}
            columns={columns}
            onRowClick={handleRowClick}
          />
        </div>
      </Card>

      <RequirementDetailDrawer
        open={drawerOpen}
        onOpenChange={handleCloseDrawer}
        requirement={selectedRequirement}
      />
    </>
  );
};

export default RequirementsTabContent;
