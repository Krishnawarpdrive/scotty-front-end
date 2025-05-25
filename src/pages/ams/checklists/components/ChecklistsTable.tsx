
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
      key: 'name',
      label: 'Name',
      render: (checklist: Checklist) => (
        <div className="font-medium">{checklist.name}</div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (checklist: Checklist) => {
        const typeLabels = {
          general: 'General',
          role: 'Role-based',
          client: 'Client-specific'
        };
        return (
          <Badge variant="outline">
            {typeLabels[checklist.type as keyof typeof typeLabels] || checklist.type}
          </Badge>
        );
      }
    },
    {
      key: 'items',
      label: 'Items',
      render: (checklist: Checklist) => {
        const itemCount = Array.isArray(checklist.items) ? checklist.items.length : 0;
        return <span className="text-muted-foreground">{itemCount} items</span>;
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (checklist: Checklist) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(checklist)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(checklist.id)}
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
