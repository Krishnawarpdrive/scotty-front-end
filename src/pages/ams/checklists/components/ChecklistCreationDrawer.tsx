
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

import { checklistFormSchema } from '../schemas/checklistFormSchema';
import { Checklist, ChecklistItem } from '../types';
import { useChecklistsData } from '../hooks/useChecklistsData';
import { useMockData } from '../hooks/useMockData';
import { useChecklistItems } from '../hooks/useChecklistItems';

import { ChecklistBasicInfoFields } from './form/ChecklistBasicInfoFields';
import { ChecklistTypeFields } from './form/ChecklistTypeFields';
import { ChecklistRoleField } from './form/ChecklistRoleField';
import { ChecklistClientFields } from './form/ChecklistClientFields';
import { ChecklistItemsSection } from './form/ChecklistItemsSection';

interface ChecklistCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingChecklist?: Checklist | null;
}

const ChecklistCreationDrawer: React.FC<ChecklistCreationDrawerProps> = ({ 
  open, 
  onOpenChange,
  editingChecklist = null
}) => {
  const { toast } = useToast();
  const { addChecklist, updateChecklist } = useChecklistsData();
  const { roles, clients } = useMockData();
  
  const form = useForm<Checklist>({
    resolver: zodResolver(checklistFormSchema),
    defaultValues: editingChecklist || {
      id: '',
      name: '',
      type: 'general',
      roleId: undefined,
      clientId: undefined,
      subdomain: undefined,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  });
  
  // Watched values for conditional rendering
  const watchType = form.watch('type');
  const watchClientId = form.watch('clientId');
  
  // Handle checklist items state with custom hook
  const { 
    items: checklistItems, 
    setItems: setChecklistItems,
    getValidItems,
    resetItems
  } = useChecklistItems(editingChecklist?.items || [{ id: '1', text: '', completed: false }]);
  
  // Handle form submission
  const onSubmit = (data: Checklist) => {
    // Filter out empty checklist items
    const validItems = getValidItems();
    
    if (validItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one checklist item",
        variant: "destructive"
      });
      return;
    }
    
    const checklistData: Checklist = {
      ...data,
      items: validItems,
      id: editingChecklist?.id || Math.random().toString(36).substring(2, 9),
      createdAt: editingChecklist?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (editingChecklist) {
      updateChecklist(checklistData);
      toast({
        title: "Checklist Updated",
        description: "The checklist has been updated successfully."
      });
    } else {
      addChecklist(checklistData);
      toast({
        title: "Checklist Created",
        description: "A new checklist has been created successfully."
      });
    }
    
    onOpenChange(false);
    form.reset();
    resetItems();
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[80vw] md:w-[50vw] overflow-hidden p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>
            {editingChecklist ? 'Edit Checklist' : 'Create New Checklist'}
          </SheetTitle>
          <SheetDescription>
            Fill in the details to {editingChecklist ? 'update' : 'create'} a checklist
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1">
          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Basic Info Fields */}
                <ChecklistBasicInfoFields form={form} />
                
                {/* Type Selection Fields */}
                <ChecklistTypeFields form={form} />
                
                {/* Conditional Fields Based on Type */}
                {watchType === 'role' && (
                  <ChecklistRoleField form={form} roles={roles} />
                )}
                
                {watchType === 'client' && (
                  <ChecklistClientFields 
                    form={form} 
                    clients={clients}
                    watchClientId={watchClientId} 
                  />
                )}
                
                {/* Checklist Items Section */}
                <ChecklistItemsSection 
                  initialItems={checklistItems}
                  onChange={setChecklistItems}
                />
              </form>
            </Form>
          </div>
        </ScrollArea>
        
        <SheetFooter className="p-6 border-t flex justify-end gap-2">
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            {editingChecklist ? 'Update Checklist' : 'Create Checklist'}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ChecklistCreationDrawer;
