
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessor?: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
  searchable?: boolean;
  pageSize?: number;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  searchable = true,
  pageSize = 10
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const { key, direction } = sortConfig;
    return [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    setSortConfig(currentConfig => {
      if (currentConfig?.key === key) {
        return {
          key,
          direction: currentConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return {
          key,
          direction: 'asc',
        };
      }
    });
  };

  const totalPages = Math.ceil(sortedData.length / pageSize);

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchable && (
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {columns.map(column => (
              <TableHead key={column.id} className={column.width ? `w-[${column.width}]` : ''}>
                {column.sortable ? (
                  <Button variant="ghost" onClick={() => handleSort(column.accessor as string)}>
                    {column.header}
                    {sortConfig && sortConfig.key === column.accessor ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      )
                    ) : null}
                  </Button>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {paginatedData.map(item => (
              <TableRow key={item.id} onClick={() => onRowClick?.(item)} className="cursor-pointer">
                {columns.map(column => (
                  <TableCell key={`${item.id}-${column.id}`}>
                    {column.cell ? column.cell(item) : (item[column.accessor as string] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, sortedData.length)} of {sortedData.length} results
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
