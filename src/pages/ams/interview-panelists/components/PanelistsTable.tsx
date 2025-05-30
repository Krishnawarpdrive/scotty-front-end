
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { usePanelistTableColumns } from "../hooks/usePanelistTableColumns";
import { Panelist } from "../types/PanelistTypes";

interface PanelistsTableProps {
  panelists: Panelist[];
  isLoading: boolean;
  error: string | null;
  onSelectPanelist: (id: string) => void;
  onUpdatePanelist: (id: string, data: Partial<Panelist>) => Promise<void>;
  onDeletePanelist: (id: string) => Promise<void>;
}

export const PanelistsTable: React.FC<PanelistsTableProps> = ({
  panelists,
  isLoading,
  error,
  onSelectPanelist,
  onUpdatePanelist,
  onDeletePanelist
}) => {
  const columns = usePanelistTableColumns({
    onSelectPanelist,
    onUpdatePanelist,
    onDeletePanelist
  });

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading panelists: {error}</p>
      </div>
    );
  }

  return (
    <DataTable
      data={panelists}
      columns={columns}
      isLoading={isLoading}
      searchPlaceholder="Search panelists..."
    />
  );
};
