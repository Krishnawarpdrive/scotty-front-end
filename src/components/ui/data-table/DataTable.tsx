
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableRow } from './DataTableRow';
import { DataTableHeader } from './DataTableHeader';
import { sortData } from './utils';

export interface DataTableColumn {
  id: string;
  header: string;
  accessorKey?: string;
  sortable?: boolean;
  cell?: (row: any) => React.ReactNode;
}

export interface DataTableProps {
  data: any[];
  columns: DataTableColumn[];
  onRowClick?: (row: any) => void;
  searchable?: boolean;
  filterable?: boolean;
  filters?: any[];
  selectedFilterValues?: Record<string, string[]>;
  onSearch?: (term: string) => void;
}

export function DataTable({
  data,
  columns,
  onRowClick,
  searchable = false,
  filterable = false,
  filters = [],
  selectedFilterValues = {},
  onSearch,
}: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    if (!key) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = sortConfig && sortConfig.key
    ? sortData(data, sortConfig.key, sortConfig.direction)
    : data;

  return (
    <div className="space-y-4">
      {(searchable || filterable) && (
        <DataTableHeader
          searchable={searchable}
          filterable={filterable}
          filters={filters}
          selectedFilterValues={selectedFilterValues}
          onSearch={onSearch}
        />
      )}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={column.sortable ? "cursor-pointer select-none" : ""}
                  onClick={() => column.sortable && handleSort(column.accessorKey || column.id)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.header}</span>
                    {column.sortable && sortConfig?.key === (column.accessorKey || column.id) && (
                      <span className="text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <DataTableRow
                key={index}
                row={row}
                columns={columns}
                onRowClick={onRowClick}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
