
import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";

interface ActionsCellRendererParams extends ICellRendererParams {
  onRowAction: (action: string, rowData: any) => void;
}

export const ActionsCellRenderer: React.FC<ActionsCellRendererParams> = (params) => {
  const handleAction = (action: string) => {
    params.onRowAction(action, params.data);
  };

  return (
    <div className="flex items-center gap-2 h-full">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleAction('view')}
        className="h-8 w-8 p-0"
      >
        <MoreHorizontalIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
