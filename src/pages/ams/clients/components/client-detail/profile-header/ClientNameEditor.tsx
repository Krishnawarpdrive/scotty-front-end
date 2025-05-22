
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientNameEditorProps {
  isEditingName: boolean;
  editedName: string;
  clientName: string;
  clientId: string;
  setEditedName: (value: string) => void;
  handleNameSave: () => void;
  setIsEditingName: (value: boolean) => void;
  isCollapsed: boolean;
}

const ClientNameEditor: React.FC<ClientNameEditorProps> = ({
  isEditingName,
  editedName,
  clientName,
  clientId,
  setEditedName,
  handleNameSave,
  setIsEditingName,
  isCollapsed
}) => {
  if (isEditingName) {
    return (
      <div className="flex items-center gap-2">
        <Input 
          value={editedName} 
          onChange={(e) => setEditedName(e.target.value)}
          className="h-8 text-xs border-primary focus-visible:ring-1 focus-visible:ring-primary"
        />
        <Button size="icon" variant="ghost" onClick={handleNameSave} className="h-7 w-7">
          <Check className="h-3 w-3" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setIsEditingName(false)} className="h-7 w-7">
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2 group">
      <h1 className={cn(
        "font-bold",
        isCollapsed ? "text-lg" : "text-2xl"
      )}>
        {clientName}
      </h1>
      {!isCollapsed && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsEditingName(true)}
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Pencil className="h-3 w-3" />
        </Button>
      )}
      {!isCollapsed && (
        <p className="text-[10px] text-muted-foreground ml-1">ID: {clientId.slice(0, 8)}</p>
      )}
    </div>
  );
};

export default ClientNameEditor;
