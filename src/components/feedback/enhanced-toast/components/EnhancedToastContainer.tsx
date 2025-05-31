
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedToastCard } from './EnhancedToastCard';
import { ToastInstance, ToastPosition } from '../types/ToastTypes';
import { cn } from '@/lib/utils';

interface EnhancedToastContainerProps {
  toasts: ToastInstance[];
  position?: ToastPosition;
  maxToasts?: number;
  onDismiss: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  spacing?: number;
}

const positionStyles = {
  'top-left': {
    container: 'top-4 left-4',
    direction: 'column' as const,
  },
  'top-center': {
    container: 'top-4 left-1/2 -translate-x-1/2',
    direction: 'column' as const,
  },
  'top-right': {
    container: 'top-4 right-4',
    direction: 'column' as const,
  },
  'bottom-left': {
    container: 'bottom-4 left-4',
    direction: 'column-reverse' as const,
  },
  'bottom-center': {
    container: 'bottom-4 left-1/2 -translate-x-1/2',
    direction: 'column-reverse' as const,
  },
  'bottom-right': {
    container: 'bottom-4 right-4',
    direction: 'column-reverse' as const,
  },
};

export const EnhancedToastContainer: React.FC<EnhancedToastContainerProps> = ({
  toasts,
  position = 'top-right',
  maxToasts = 5,
  onDismiss,
  onPause,
  onResume,
  spacing = 8
}) => {
  const visibleToasts = toasts
    .filter(toast => toast.isVisible)
    .slice(0, maxToasts);

  const hiddenCount = Math.max(0, toasts.filter(toast => toast.isVisible).length - maxToasts);
  const styles = positionStyles[position];

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const stackingOffset = (index: number) => {
    if (position.includes('bottom')) {
      return visibleToasts.length - 1 - index;
    }
    return index;
  };

  return (
    <motion.div 
      className={cn(
        'fixed z-[100] flex gap-2 pointer-events-none max-w-sm w-full',
        styles.container
      )}
      style={{ 
        flexDirection: styles.direction,
        gap: `${spacing}px`
      }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AnimatePresence mode="popLayout">
        {visibleToasts.map((toast, index) => {
          const stackIndex = stackingOffset(index);
          
          return (
            <motion.div
              key={toast.id}
              className="pointer-events-auto"
              style={{
                zIndex: 1000 - stackIndex,
              }}
              layout
              layoutId={toast.id}
              initial={{
                opacity: 0,
                scale: 0.3,
                y: position.includes('bottom') ? 100 : -100,
              }}
              animate={{
                opacity: 1 - (stackIndex * 0.1),
                scale: 1 - (stackIndex * 0.02),
                y: 0,
                x: stackIndex * 2,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: position.includes('bottom') ? 100 : -100,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.8,
              }}
            >
              <EnhancedToastCard
                toast={toast}
                onDismiss={onDismiss}
                onPause={onPause}
                onResume={onResume}
                index={stackIndex}
                position={position}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Enhanced hidden count indicator */}
      {hiddenCount > 0 && (
        <motion.div
          className="bg-gray-900 border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-100 text-center pointer-events-auto shadow-lg"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            animate={{ 
              background: [
                'linear-gradient(45deg, #6366f1, #8b5cf6)',
                'linear-gradient(45deg, #8b5cf6, #6366f1)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-md opacity-20"
          />
          <span className="relative">
            +{hiddenCount} more notification{hiddenCount > 1 ? 's' : ''}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
