
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { Edit, Trash2 } from 'lucide-react';
import { Checklist } from '../types';

interface ChecklistsTableProps {
  checklists: Checklist[];
  onEdit: (checklist: Checklist) => void;
  onDelete: (id: string) => void;
}

export const ChecklistsTable: React.FC<ChecklistsTableProps> = ({
  checklists,
  onEdit,
  onDelete
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'bg-blue-100 text-blue-800';
      case 'role': return 'bg-green-100 text-green-800';
      case 'client': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'general': return 'General';
      case 'role': return 'Role-based';
      case 'client': return 'Client-based';
      default: return type;
    }
  };

  const columns = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name' as keyof Checklist,
      cell: (data: Checklist) => (
        <div>
          <p className="font-medium">{data.name}</p>
          {data.description && (
            <p className="text-sm text-gray-500 mt-1">{data.description}</p>
          )}
        </div>
      )
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type' as keyof Checklist,
      cell: (data: Checklist) => (
        <Badge className={getTypeColor(data.type)}>
          {getTypeLabel(data.type)}
        </Badge>
      )
    },
    {
      id: 'items',
      header: 'Items',
      cell: (data: Checklist) => (
        <span className="text-sm text-gray-600">
          {data.items ? data.items.length : 0} items
        </span>
      )
    },
    {
      id: 'createdAt',
      header: 'Created',
      accessorKey: 'createdAt' as keyof Checklist,
      cell: (data: Checklist) => (
        <span className="text-sm text-gray-500">
          {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}
        </span>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (data: Checklist) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(data)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(data.id)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <DataTable
      data={checklists}
      columns={columns}
      searchable={false}
      emptyMessage="No checklists found"
    />
  );
};
