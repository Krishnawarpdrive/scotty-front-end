import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from 'lucide-react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { checklistFormSchema } from '../schemas/checklistFormSchema';
import { Checklist, ChecklistItem } from '../types';
import { useChecklistsData } from '../hooks/useChecklistsData';
import { useMockData } from '../hooks/useMockData';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableItem } from './DraggableItem';

interface ChecklistCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingChecklist?: Checklist | null;
}

const ChecklistCreationDrawer = ({ 
  open, 
  onOpenChange,
  editingChecklist = null
}: ChecklistCreationDrawerProps) => {
  const { toast } = useToast();
  const { addChecklist, updateChecklist } = useChecklistsData();
  const { roles, clients } = useMockData();
  
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    editingChecklist?.items || [{ id: '1', text: '', completed: false }]
  );
  
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
  
  const watchType = form.watch('type');
  const watchClientId = form.watch('clientId');
  
  // Handle checklist item addition
  const addChecklistItem = () => {
    setChecklistItems([
      ...checklistItems, 
      { 
        id: (checklistItems.length + 1).toString(), 
        text: '', 
        completed: false 
      }
    ]);
  };
  
  // Handle checklist item removal
  const removeChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };
  
  // Handle checklist item text change
  const updateChecklistItemText = (index: number, text: string) => {
    const updatedItems = [...checklistItems];
    updatedItems[index].text = text;
    setChecklistItems(updatedItems);
  };
  
  // Handle checklist item reordering
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = checklistItems[dragIndex];
    const newItems = [...checklistItems];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setChecklistItems(newItems);
  };
  
  // Handle form submission
  const onSubmit = (data: Checklist) => {
    // Filter out empty checklist items
    const validItems = checklistItems.filter(item => item.text.trim() !== '');
    
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
    setChecklistItems([{ id: '1', text: '', completed: false }]);
  };
  
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90%] overflow-auto">
        <DrawerHeader>
          <DrawerTitle>
            {editingChecklist ? 'Edit Checklist' : 'Create New Checklist'}
          </DrawerTitle>
          <DrawerDescription>
            Fill in the details to {editingChecklist ? 'update' : 'create'} a checklist
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    <FormLabel>Checklist Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                    <FormDescription>
                      The type of checklist determines its availability and association.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Conditional Fields Based on Type */}
              {watchType === 'role' && (
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {watchType === 'client' && (
                <>
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a client" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {watchClientId && (
                    <FormField
                      control={form.control}
                      name="subdomain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subdomain</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subdomain" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* Mock subdomains based on client */}
                              <SelectItem value="region-north">North Region</SelectItem>
                              <SelectItem value="region-south">South Region</SelectItem>
                              <SelectItem value="department-hr">HR Department</SelectItem>
                              <SelectItem value="department-it">IT Department</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Checklist Items</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={addChecklistItem}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          Add Item
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a new checklist item</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="space-y-2 max-h-[300px] overflow-y-auto p-2">
                  <DndProvider backend={HTML5Backend}>
                    {checklistItems.map((item, index) => (
                      <DraggableItem
                        key={item.id}
                        id={item.id}
                        index={index}
                        text={item.text}
                        onTextChange={(text) => updateChecklistItemText(index, text)}
                        onRemove={() => removeChecklistItem(index)}
                        moveItem={moveItem}
                      />
                    ))}
                  </DndProvider>
                </div>
              </div>
            
              <DrawerFooter className="border-t pt-4">
                <Button type="submit">
                  {editingChecklist ? 'Update Checklist' : 'Create Checklist'}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChecklistCreationDrawer;
