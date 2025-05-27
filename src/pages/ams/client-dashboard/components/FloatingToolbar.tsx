
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Layout, 
  Save, 
  Share, 
  Settings, 
  Undo, 
  Redo,
  Palette,
  Grid,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

interface FloatingToolbarProps {
  onAddWidget: () => void;
  onSaveLayout: () => void;
  onResetLayout: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  onAddWidget,
  onSaveLayout,
  onResetLayout,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toolbarItems = [
    { 
      icon: Plus, 
      label: 'Add Widget', 
      action: onAddWidget,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      icon: Layout, 
      label: 'Reset Layout', 
      action: onResetLayout,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      icon: Save, 
      label: 'Save Layout', 
      action: onSaveLayout,
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      icon: Undo, 
      label: 'Undo', 
      action: onUndo,
      color: 'bg-orange-500 hover:bg-orange-600',
      disabled: !canUndo
    },
    { 
      icon: Redo, 
      label: 'Redo', 
      action: onRedo,
      color: 'bg-orange-500 hover:bg-orange-600',
      disabled: !canRedo
    },
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-lg rounded-full p-2 shadow-lg border border-gray-200"
        >
          {/* Main Toggle Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="h-5 w-5" />
            </motion.div>
          </motion.button>

          {/* Expandable Tools */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                {toolbarItems.map((item, index) => (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={item.action}
                          disabled={item.disabled}
                          className={`
                            p-2 rounded-full text-white transition-all duration-200
                            ${item.color}
                            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                          `}
                        >
                          <item.icon className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </TooltipProvider>
  );
};
