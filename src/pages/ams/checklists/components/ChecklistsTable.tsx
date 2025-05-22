
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checklist } from '../types';
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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'role':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'client':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
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

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="h-12 px-4 text-left align-middle font-medium text-[12px] text-[#262626]">Checklist Name</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium text-[12px] text-[#262626]">Type</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium text-[12px] text-[#262626]">Items</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium text-[12px] text-[#262626]">Created Date</TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium text-[12px] text-[#262626]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklists.map((checklist) => (
            <TableRow key={checklist.id}>
              <TableCell className="p-4 align-middle text-[12px] text-[#262626] font-medium">{checklist.name}</TableCell>
              <TableCell className="p-4 align-middle text-[12px] text-[#262626]">
                <Badge className={`text-[10px] ${getTypeColor(checklist.type)}`}>
                  {getTypeLabel(checklist.type)}
                </Badge>
              </TableCell>
              <TableCell className="p-4 align-middle text-[12px] text-[#262626]">
                {checklist.items.length}
              </TableCell>
              <TableCell className="p-4 align-middle text-[12px] text-[#262626]">
                {formatDate(checklist.createdAt)}
              </TableCell>
              <TableCell className="p-4 align-middle text-[12px] text-[#262626]">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(checklist)}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
