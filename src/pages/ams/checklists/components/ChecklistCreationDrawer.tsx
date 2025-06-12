
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { checklistFormSchema, ChecklistFormData } from '../schemas/checklistFormSchema';
import { Checklist } from '../types';
import { useChecklistsData } from '../hooks/useChecklistsData';

interface ChecklistCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingChecklist?: Checklist | null;
}

const ChecklistCreationDrawer: React.FC<ChecklistCreationDrawerProps> = ({
  open,
  onOpenChange,
  editingChecklist
}) => {
  const { createChecklist, updateChecklist } = useChecklistsData();
  
  const form = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistFormSchema),
    defaultValues: {
      name: '',
      type: 'general',
      description: '',
      items: []
    }
  });

  useEffect(() => {
    if (editingChecklist) {
      form.reset({
        name: editingChecklist.name,
        type: editingChecklist.type,
        description: editingChecklist.description || '',
        items: editingChecklist.items || []
      });
    } else {
      form.reset({
        name: '',
        type: 'general',
        description: '',
        items: []
      });
    }
  }, [editingChecklist, form]);

  const onSubmit = async (data: ChecklistFormData) => {
    try {
      if (editingChecklist) {
        await updateChecklist(editingChecklist.id, data);
      } else {
        await createChecklist(data);
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error saving checklist:', error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] w-[50%] ml-auto">
        <DrawerHeader className="border-b">
          <DrawerTitle>
            {editingChecklist ? 'Edit Checklist' : 'Create New Checklist'}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Checklist Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter checklist name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select checklist type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="role">Role-based</SelectItem>
                        <SelectItem value="client">Client-based</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter checklist description" 
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingChecklist ? 'Update Checklist' : 'Create Checklist'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChecklistCreationDrawer;
