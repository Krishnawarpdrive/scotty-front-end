
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChecklistTypeFields } from './form/ChecklistTypeFields';
import { ChecklistItemsSection } from './form/ChecklistItemsSection';
import { useChecklistItems } from '../hooks/useChecklistItems';

interface ChecklistCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (checklist: any) => void;
}

const ChecklistCreationDrawer: React.FC<ChecklistCreationDrawerProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'general' as 'client' | 'general' | 'role',
    roleId: undefined,
    clientId: undefined,
    subdomain: undefined
  });

  const { items, addItem, removeItem, updateItem } = useChecklistItems();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      items
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Create New Checklist</SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <Label htmlFor="name">Checklist Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Checklist Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: 'client' | 'general' | 'role') => 
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="role">Role-specific</SelectItem>
                <SelectItem value="client">Client-specific</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ChecklistTypeFields type={formData.type} />

          <ChecklistItemsSection 
            items={items}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onUpdateItem={updateItem}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Checklist
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ChecklistCreationDrawer;
