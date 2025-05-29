
import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Badge } from "@/components/ui/badge";

export const StatusBadgeCellRenderer: React.FC<ICellRendererParams> = (params) => {
  const status = params.value;
  
  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'hired':
        return 'default';
      case 'pending':
      case 'in progress':
        return 'secondary';
      case 'delayed':
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Badge variant={getStatusVariant(status)} className="text-xs">
      {status}
    </Badge>
  );
};
