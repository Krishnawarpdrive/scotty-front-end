
import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
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
  const columns = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name' as keyof Checklist,
      cell: (data: Checklist) => (
        <div className="font-medium">{data.name}</div>
      )
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type' as keyof Checklist,
      cell: (data: Checklist) => {
        const typeLabels = {
          general: 'General',
          role: 'Role-based',
          client: 'Client-specific'
        };
        return (
          <Badge variant="outline">
            {typeLabels[data.type as keyof typeof typeLabels] || data.type}
          </Badge>
        );
      }
    },
    {
      id: 'items',
      header: 'Items',
      accessorKey: (data: Checklist) => data.items,
      cell: (data: Checklist) => {
        const items = data.items;
        let itemCount = 0;
        
        if (Array.isArray(items)) {
          itemCount = items.filter(item => 
            item && 
            typeof item === 'object' && 
            typeof item.text === 'string' && 
            item.text.trim() !== ''
          ).length;
        }
        
        return <span className="text-muted-foreground">{itemCount} items</span>;
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: (data: Checklist) => data.id,
      cell: (data: Checklist) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(data)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(data.id)}
            className="text-red-600 hover:text-red-700"
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
    />
  );
};
