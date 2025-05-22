
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Trash2, GripVertical } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DraggableItemProps {
  id: string;
  index: number;
  text: string;
  onTextChange: (text: string) => void;
  onRemove: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
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
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'checklist-item',
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
  
  const [{ isDragging }, drag] = useDrag({
    type: 'checklist-item',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const opacity = isDragging ? 0.4 : 1;
  
  drag(drop(ref));
  
  return (
    <div
      ref={ref}
      className="flex items-center gap-2 p-2 rounded-md border bg-card hover:bg-accent/50 transition-colors"
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className="cursor-move flex items-center justify-center px-1">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter checklist item..."
        className="flex-1 text-[12px]"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Remove item</span>
      </Button>
    </div>
  );
};
