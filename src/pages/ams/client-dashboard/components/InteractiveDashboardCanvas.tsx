
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Maximize2, Minimize2, Move, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DraggableWidget {
  id: string;
  component: React.ReactNode;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface InteractiveDashboardCanvasProps {
  widgets: DraggableWidget[];
  onWidgetUpdate: (widgets: DraggableWidget[]) => void;
}

export const InteractiveDashboardCanvas: React.FC<InteractiveDashboardCanvasProps> = ({
  widgets,
  onWidgetUpdate
}) => {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleWidgetDrag = useCallback((widgetId: string, newPosition: { x: number; y: number }) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId
        ? { ...widget, position: newPosition }
        : widget
    );
    onWidgetUpdate(updatedWidgets);
  }, [widgets, onWidgetUpdate]);

  const handleWidgetSelect = useCallback((widgetId: string) => {
    setSelectedWidget(widgetId);
    // Bring selected widget to front
    const maxZ = Math.max(...widgets.map(w => w.zIndex));
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId
        ? { ...widget, zIndex: maxZ + 1 }
        : widget
    );
    onWidgetUpdate(updatedWidgets);
  }, [widgets, onWidgetUpdate]);

  const handleZoom = useCallback((delta: number, center?: { x: number; y: number }) => {
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);
  }, [scale]);

  const resetView = useCallback(() => {
    setScale(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleZoom(0.1)}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleZoom(-0.1)}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-white/90 backdrop-blur-sm"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Interactive Canvas */}
      <motion.div
        ref={canvasRef}
        className="w-full h-full relative"
        style={{
          scale,
          x: panOffset.x,
          y: panOffset.y,
        }}
        onWheel={(e) => {
          e.preventDefault();
          const delta = e.deltaY > 0 ? -0.05 : 0.05;
          handleZoom(delta);
        }}
      >
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Draggable Widgets */}
        <AnimatePresence>
          {widgets.map((widget) => (
            <DraggableWidget
              key={widget.id}
              widget={widget}
              isSelected={selectedWidget === widget.id}
              onSelect={handleWidgetSelect}
              onDrag={handleWidgetDrag}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

interface DraggableWidgetProps {
  widget: DraggableWidget;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  widget,
  isSelected,
  onSelect,
  onDrag,
  isDragging,
  setIsDragging
}) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ 
        scale: 1.02,
        rotate: 1,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      onDragStart={() => {
        setIsDragging(true);
        onSelect(widget.id);
      }}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        onDrag(widget.id, {
          x: widget.position.x + info.offset.x,
          y: widget.position.y + info.offset.y
        });
      }}
      initial={{ 
        x: widget.position.x, 
        y: widget.position.y,
        opacity: 0,
        scale: 0.8
      }}
      animate={{ 
        x: widget.position.x, 
        y: widget.position.y,
        opacity: 1,
        scale: 1
      }}
      exit={{ 
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 }
      }}
      className={`
        absolute cursor-grab active:cursor-grabbing
        rounded-xl bg-white/95 backdrop-blur-lg border-2
        transition-all duration-200
        ${isSelected 
          ? 'border-blue-400 shadow-xl shadow-blue-100' 
          : 'border-gray-200 shadow-lg hover:shadow-xl'
        }
      `}
      style={{
        width: widget.size.width,
        height: widget.size.height,
        zIndex: widget.zIndex
      }}
      onClick={() => onSelect(widget.id)}
    >
      {/* Widget Header */}
      <div 
        className={`
          flex items-center justify-between p-3 border-b border-gray-100
          cursor-grab active:cursor-grabbing
          ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
        `}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <h3 className="font-medium text-gray-900">{widget.title}</h3>
        <Move className="h-4 w-4 text-gray-400" />
      </div>

      {/* Widget Content */}
      <div className="p-4 h-full overflow-hidden">
        {widget.component}
      </div>

      {/* Selection Indicators */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-blue-400 rounded-xl pointer-events-none"
        />
      )}
    </motion.div>
  );
};
