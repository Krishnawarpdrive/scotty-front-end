
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Download, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  accessor?: (item: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'multiselect' | 'date';
  filterOptions?: Array<{ value: string; label: string }>;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  condition?: (item: T) => boolean;
}

export interface BulkAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (items: T[]) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  condition?: (items: T[]) => boolean;
}

export interface EnhancedDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  exportable?: boolean;
  refreshable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  loading?: boolean;
  emptyMessage?: string;
  actions?: TableAction<T>[];
  bulkActions?: BulkAction<T>[];
  onRefresh?: () => void;
  onExport?: (data: T[]) => void;
  className?: string;
  rowClassName?: (item: T) => string;
  onRowClick?: (item: T) => void;
}

export function EnhancedDataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  title,
  description,
  searchPlaceholder = "Search...",
  searchable = true,
  filterable = true,
  sortable = true,
  selectable = false,
  exportable = false,
  refreshable = false,
  pagination = true,
  pageSize = 10,
  loading = false,
  emptyMessage = "No data available",
  actions = [],
  bulkActions = [],
  onRefresh,
  onExport,
  className,
  rowClassName,
  onRowClick,
}: EnhancedDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search logic
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchable && searchQuery) {
      result = result.filter(item => {
        return columns.some(column => {
          const value = column.accessor ? 
            String(column.accessor(item)) : 
            String(item[column.key as keyof T]);
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        });
      });
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        result = result.filter(item => {
          const itemValue = String(item[key as keyof T]).toLowerCase();
          if (Array.isArray(value)) {
            return value.some(v => itemValue.includes(v.toLowerCase()));
          }
          return itemValue.includes(String(value).toLowerCase());
        });
      }
    });

    return result;
  }, [data, searchQuery, filters, columns, searchable]);

  // Sort logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Handlers
  const handleSort = useCallback((key: string) => {
    if (!sortable) return;
    
    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  }, [sortable]);

  const handleSelectAll = useCallback(() => {
    if (selectedItems.size === paginatedData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(paginatedData.map(item => String(item[keyField]))));
    }
  }, [selectedItems.size, paginatedData, keyField]);

  const handleSelectItem = useCallback((id: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const getSelectedData = useCallback(() => {
    return data.filter(item => selectedItems.has(String(item[keyField])));
  }, [data, selectedItems, keyField]);

  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              {title && <CardTitle className="text-xl font-semibold">{title}</CardTitle>}
              {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
            </div>
            <div className="flex items-center gap-2">
              {refreshable && onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              )}
              {exportable && onExport && (
                <Button variant="outline" size="sm" onClick={() => onExport(filteredData)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent>
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {filterable && (
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="shrink-0"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {Object.values(filters).filter(Boolean).length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {Object.values(filters).filter(Boolean).length}
                </Badge>
              )}
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && filterable && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 border rounded-lg bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {columns.filter(col => col.filterable).map(column => (
                  <div key={String(column.key)} className="space-y-2">
                    <label className="text-sm font-medium">{column.header}</label>
                    {column.filterType === 'select' ? (
                      <Select
                        value={filters[String(column.key)] || ''}
                        onValueChange={(value) => handleFilterChange(String(column.key), value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All</SelectItem>
                          {column.filterOptions?.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        placeholder={`Filter ${column.header.toLowerCase()}`}
                        value={filters[String(column.key)] || ''}
                        onChange={(e) => handleFilterChange(String(column.key), e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Actions */}
        {selectable && selectedItems.size > 0 && bulkActions.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedItems.size} item(s) selected
              </span>
              <div className="flex items-center gap-2">
                {bulkActions.map((action, index) => {
                  const selectedData = getSelectedData();
                  const isEnabled = !action.condition || action.condition(selectedData);
                  
                  return (
                    <Button
                      key={index}
                      variant={action.variant || 'outline'}
                      size="sm"
                      disabled={!isEnabled}
                      onClick={() => action.onClick(selectedData)}
                    >
                      {action.icon}
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {selectable && (
                    <th className="w-12 p-3">
                      <Checkbox
                        checked={selectedItems.size === paginatedData.length && paginatedData.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                  )}
                  {columns.map(column => (
                    <th
                      key={String(column.key)}
                      className={cn(
                        "p-3 text-left font-medium text-gray-900",
                        column.sortable && sortable && "cursor-pointer hover:bg-gray-100",
                        column.align === 'center' && "text-center",
                        column.align === 'right' && "text-right"
                      )}
                      style={{ width: column.width }}
                      onClick={() => column.sortable && sortable && handleSort(String(column.key))}
                    >
                      <div className="flex items-center gap-2">
                        {column.header}
                        {sortConfig?.key === column.key && (
                          <span className="text-xs">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th className="w-24 p-3 text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                      className="p-8 text-center text-gray-500"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => {
                    const itemKey = String(item[keyField]);
                    const isSelected = selectedItems.has(itemKey);
                    
                    return (
                      <motion.tr
                        key={itemKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "border-t hover:bg-gray-50 transition-colors",
                          isSelected && "bg-blue-50",
                          rowClassName?.(item),
                          onRowClick && "cursor-pointer"
                        )}
                        onClick={() => onRowClick?.(item)}
                      >
                        {selectable && (
                          <td className="p-3">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleSelectItem(itemKey)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                        )}
                        {columns.map(column => (
                          <td
                            key={String(column.key)}
                            className={cn(
                              "p-3",
                              column.align === 'center' && "text-center",
                              column.align === 'right' && "text-right"
                            )}
                          >
                            {column.accessor 
                              ? column.accessor(item)
                              : String(item[column.key as keyof T] || '')
                            }
                          </td>
                        ))}
                        {actions.length > 0 && (
                          <td className="p-3">
                            <div className="flex items-center justify-end gap-1">
                              {actions.map((action, actionIndex) => {
                                const isEnabled = !action.condition || action.condition(item);
                                
                                return (
                                  <Button
                                    key={actionIndex}
                                    variant={action.variant || 'ghost'}
                                    size="sm"
                                    disabled={!isEnabled}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.onClick(item);
                                    }}
                                  >
                                    {action.icon}
                                    {action.label}
                                  </Button>
                                );
                              })}
                            </div>
                          </td>
                        )}
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
