
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
      <div className="max-h-[calc(100vh-250px)] overflow-auto">
        <div className="sticky-column-wrapper min-w-full">
          <DataTable
            data={clients}
            columns={columns}
            onRowClick={onRowClick}
          />
        </div>
      </div>
      <style jsx global>{`
        .sticky-column-wrapper table thead tr th:nth-child(2),
        .sticky-column-wrapper table tbody tr td:nth-child(2) {
          position: sticky;
          left: 0;
          z-index: 20;
          background-color: white;
        }
        
        .sticky-column-wrapper table thead tr th:nth-child(2)::after,
        .sticky-column-wrapper table tbody tr td:nth-child(2)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background-color: #e5e7eb;
        }
        
        .dark .sticky-column-wrapper table thead tr th:nth-child(2),
        .dark .sticky-column-wrapper table tbody tr td:nth-child(2) {
          background-color: hsl(var(--background));
        }
      `}</style>
    </div>
  );
};

export default ClientsTableContainer;
