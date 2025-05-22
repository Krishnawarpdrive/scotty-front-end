
import React, { useState } from 'react';
import { Pencil, Trash2, ListChecks } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { ChecklistDrawer } from "@/components/ui/checklist-drawer";
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
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleViewChecklist = (checklist: Checklist) => {
    setSelectedChecklist(checklist);
    setDrawerOpen(true);
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'general':
        return 'General';
      case 'role':
        return 'Role-based';
      case 'client':
        return 'Client-based';
      default:
        return type;
    }
  };
  
  const columns: DataTableColumn<Checklist>[] = [
    {
      id: 'name',
      header: 'Checklist Name',
      accessorKey: 'name',
      enableSorting: true,
      enableFiltering: true,
      cell: (checklist) => (
        <span className="font-medium">{checklist.name}</span>
      ),
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      enableSorting: true,
      enableFiltering: true,
      cell: (checklist) => (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 font-normal">
          {getTypeLabel(checklist.type)}
        </Badge>
      ),
    },
    {
      id: 'items',
      header: 'Items',
      accessorKey: (checklist) => checklist.items.length,
      enableSorting: true,
      enableFiltering: false,
    },
    {
      id: 'createdAt',
      header: 'Created Date',
      accessorKey: (checklist) => formatDate(checklist.createdAt),
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      enableSorting: false,
      enableFiltering: false,
      cell: (checklist) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewChecklist(checklist);
            }}
            className="h-8 w-8 p-0"
          >
            <ListChecks className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(checklist);
            }}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Checklist</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{checklist.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(checklist.id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  ];
  
  return (
    <>
      <DataTable
        data={checklists}
        columns={columns}
        onRowClick={handleViewChecklist}
      />
      
      <ChecklistDrawer 
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        checklist={selectedChecklist}
        viewOnly={true}
        onComplete={() => setDrawerOpen(false)}
      />
    </>
  );
};
