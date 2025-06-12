
import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UnifiedDataTableProps<T extends { id: string }> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
  onBulkAction?: (action: string, items: T[]) => void;
  bulkActions?: Array<{ key: string; label: string; variant?: 'default' | 'destructive' }>;
  className?: string;
}

export function UnifiedDataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder = 'Search...',
  onRowClick,
  onBulkAction,
  bulkActions = [],
  className,
}: UnifiedDataTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const handleBulkAction = (actionKey: string) => {
    if (onBulkAction) {
      onBulkAction(actionKey, selectedItems);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {selectedItems.length > 0 && bulkActions.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Badge variant="secondary">{selectedItems.length} selected</Badge>
          {bulkActions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant || 'outline'}
              size="sm"
              onClick={() => handleBulkAction(action.key)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
      
      <DataTable
        data={data}
        columns={columns}
        onRowClick={onRowClick}
        searchable={true}
        emptyMessage="No data available"
      />
    </div>
  );
}
