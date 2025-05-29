
import React from 'react';
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getClientsColumns } from './table-columns/clientsColumns';

interface ClientsTabContentProps {
  clientsData: any[];
  handleClientClick: (clientName: string) => void;
  handleRowClick: (item: any) => void;
}

const ClientsTabContent = ({ clientsData, handleClientClick, handleRowClick }: ClientsTabContentProps) => {
  const columns = React.useMemo(() => getClientsColumns(handleClientClick), [handleClientClick]);

  return (
    <Card className="border shadow-sm">
      <div className="overflow-x-auto">
        <DataTable 
          data={clientsData}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>
    </Card>
  );
};

export default ClientsTabContent;
