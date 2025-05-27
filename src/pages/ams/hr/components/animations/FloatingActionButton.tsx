
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, UserPlus, Briefcase, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingAction {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions: FloatingAction[];
  position?: 'bottom-right' | 'bottom-left';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions,
  position = 'bottom-right'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  const actionPositions = {
    'bottom-right': (index: number) => ({
      x: 0,
      y: -(index + 1) * 60
    }),
    'bottom-left': (index: number) => ({
      x: 0,
      y: -(index + 1) * 60
    })
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40`}>
      {/* Action Buttons */}
      <AnimatePresence>
        {isExpanded && actions.map((action, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ 
              scale: 0,
              opacity: 0,
              ...actionPositions[position](index)
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              ...actionPositions[position](index)
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              x: 0,
              y: 0
            }}
            transition={{ 
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              {position === 'bottom-right' && (
                <motion.span
                  className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.05) + 0.1 }}
                >
                  {action.label}
                </motion.span>
              )}
              
              <Button
                onClick={() => {
                  action.action();
                  setIsExpanded(false);
                }}
                className={`w-12 h-12 rounded-full shadow-lg ${action.color || 'bg-blue-500 hover:bg-blue-600'} text-white`}
                size="sm"
              >
                {action.icon}
              </Button>
              
              {position === 'bottom-left' && (
                <motion.span
                  className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.05) + 0.1 }}
                >
                  {action.label}
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 text-white"
          size="sm"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

// Default actions for role management
export const defaultRoleManagementActions: FloatingAction[] = [
  {
    icon: <UserPlus className="h-5 w-5" />,
    label: "Add Client",
    action: () => console.log("Add client"),
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    label: "Create Role",
    action: () => console.log("Create role"),
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "New Requirement",
    action: () => console.log("New requirement"),
    color: "bg-purple-500 hover:bg-purple-600"
  }
];
