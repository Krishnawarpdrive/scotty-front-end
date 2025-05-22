
import React from 'react';
import { DataTable } from "@/components/ui/data-table";

interface ClientsTableContainerProps {
  clients: any[];
  columns: any[];
  onRowClick: (client: any) => void;
}

export const ClientsTableContainer: React.FC<ClientsTableContainerProps> = ({
  clients,
  columns,
  onRowClick
}) => {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className="max-h-[70vh] overflow-auto">
        <DataTable
          data={clients}
          columns={columns}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
};

export default ClientsTableContainer;
