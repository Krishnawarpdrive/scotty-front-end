
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableItem } from "@/pages/ams/checklists/components/DraggableItem";
import { Checklist, ChecklistItem } from "@/pages/ams/checklists/types";

interface ChecklistDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklist?: Checklist | null;
  viewOnly?: boolean;
  onSave?: (items: ChecklistItem[]) => void;
  onComplete?: (items: ChecklistItem[]) => void;
}

export function ChecklistDrawer({
  open,
  onOpenChange,
  checklist,
  viewOnly = false,
  onSave,
  onComplete
}: ChecklistDrawerProps) {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    checklist?.items || [{ id: '1', text: '', completed: false }]
  );
  
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
  
  const removeChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };
  
  const updateChecklistItemText = (index: number, text: string) => {
    const updatedItems = [...checklistItems];
    updatedItems[index] = { ...updatedItems[index], text };
    setChecklistItems(updatedItems);
  };
  
  const toggleItemCompletion = (index: number) => {
    const updatedItems = [...checklistItems];
    updatedItems[index] = { ...updatedItems[index], completed: !updatedItems[index].completed };
    setChecklistItems(updatedItems);
  };
  
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = checklistItems[dragIndex];
    const newItems = [...checklistItems];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setChecklistItems(newItems);
  };
  
  const handleSave = () => {
    // Filter out empty items
    const validItems = checklistItems.filter(item => item.text.trim() !== '');
    if (onSave) onSave(validItems);
    onOpenChange(false);
  };
  
  const handleComplete = () => {
    if (onComplete) onComplete(checklistItems);
    onOpenChange(false);
  };
  
  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalItems = checklistItems.length;
  const progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[70vw] sm:max-w-[70vw] overflow-hidden p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>
            {viewOnly
              ? checklist?.name || "Checklist Details"
              : checklist
                ? `Edit Checklist: ${checklist.name}`
                : "Add Checklist Items"
            }
          </SheetTitle>
          <SheetDescription>
            {viewOnly 
              ? `Progress: ${completedCount}/${totalItems} (${progress}%)`
              : "Add, edit or reorder checklist items"
            }
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            <DndProvider backend={HTML5Backend}>
              {checklistItems.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3">
                  {viewOnly ? (
                    <>
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={item.completed}
                        onCheckedChange={() => toggleItemCompletion(index)}
                      />
                      <label
                        htmlFor={`item-${item.id}`}
                        className={`flex-1 text-sm cursor-pointer ${item.completed ? 'line-through opacity-70' : ''}`}
                      >
                        {item.text}
                      </label>
                    </>
                  ) : (
                    <DraggableItem
                      id={item.id}
                      index={index}
                      text={item.text}
                      onTextChange={(text) => updateChecklistItemText(index, text)}
                      onRemove={() => removeChecklistItem(index)}
                      moveItem={moveItem}
                    />
                  )}
                </div>
              ))}
            </DndProvider>
            
            {!viewOnly && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={addChecklistItem}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            )}
          </div>
        </ScrollArea>
        
        <SheetFooter className="p-6 border-t">
          {viewOnly ? (
            <Button onClick={handleComplete}>
              Mark as Complete
            </Button>
          ) : (
            <Button onClick={handleSave}>
              Save Items
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
