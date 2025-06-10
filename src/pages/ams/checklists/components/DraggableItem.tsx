
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Trash2, GripVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

interface DraggableItemProps {
  id: string;
  index: number;
  text: string;
  onTextChange: (text: string) => void;
  onRemove: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  id: string;
  index: number;
  type: string;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  index,
  text,
  onTextChange,
  onRemove,
  moveItem
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'CHECKLIST_ITEM',
    item: { id, index, type: 'CHECKLIST_ITEM' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'CHECKLIST_ITEM',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  
  // Initialize the drag preview and the drop target
  preview(drop(ref));
  
  return (
    <div 
      ref={ref}
      data-handler-id={handlerId}
      className={cn(
        "flex items-center gap-2 border rounded-md p-2 bg-white transition-opacity",
        isDragging && "opacity-50"
      )}
    >
      <div ref={drag} className="cursor-move touch-none">
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      
      <Input
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter checklist item text..."
        className="flex-1"
      />
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Remove item</span>
      </Button>
    </div>
  );
};
