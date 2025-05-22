
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ClientTableActionsProps {
  client: any;
  onEdit?: (client: any) => void;
  onDelete?: (client: any) => void;
  onView?: (client: any) => void;
}

const ClientTableActions: React.FC<ClientTableActionsProps> = ({ 
  client,
  onEdit,
  onDelete,
  onView 
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit && onEdit(client);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete && onDelete(client.id);
  };
  
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView && onView(client);
  };
  
  return (
    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
      <Button 
        variant="outline" 
        size="sm" 
        className="h-8 w-8 p-0 border-green-100 hover:bg-green-50 hover:text-green-700"
        onClick={handleView}
      >
        <Eye className="h-4 w-4" />
        <span className="sr-only">View</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="h-8 w-8 p-0 border-blue-100 hover:bg-blue-50 hover:text-blue-700"
        onClick={handleEdit}
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 border-red-100 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600 focus:text-red-600 cursor-pointer"
          >
            Confirm delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ClientTableActions;
