
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastCard } from './ToastCard';
import { ToastInstance, ToastPosition } from '../types/ToastTypes';
import { cn } from '@/lib/utils';

interface ToastContainerProps {
  toasts: ToastInstance[];
  position?: ToastPosition;
  maxToasts?: number;
  onDismiss: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

const getPositionClasses = (position: ToastPosition) => {
  const positions = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };
  return positions[position] || positions['top-right'];
};

const getAnimationDirection = (position: ToastPosition) => {
  if (position.includes('left')) return { x: -100, opacity: 0 };
  if (position.includes('right')) return { x: 100, opacity: 0 };
  if (position.includes('top')) return { y: -100, opacity: 0 };
  return { y: 100, opacity: 0 };
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
  maxToasts = 5,
  onDismiss,
  onPause,
  onResume
}) => {
  const visibleToasts = toasts
    .filter(toast => toast.isVisible)
    .slice(0, maxToasts);

  const hiddenCount = Math.max(0, toasts.filter(toast => toast.isVisible).length - maxToasts);

  const animationInitial = getAnimationDirection(position);
  const animationDirection = position.includes('bottom') ? 'reverse' : 'normal';

  return (
    <div 
      className={cn(
        'fixed z-[100] flex flex-col gap-2 pointer-events-none',
        getPositionClasses(position)
      )}
      style={{ flexDirection: animationDirection === 'reverse' ? 'column-reverse' : 'column' }}
    >
      <AnimatePresence mode="popLayout">
        {visibleToasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            initial={animationInitial}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={animationInitial}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.8
            }}
            layout
            className="pointer-events-auto"
          >
            <ToastCard
              toast={toast}
              onDismiss={onDismiss}
              onPause={onPause}
              onResume={onResume}
              index={index}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {hiddenCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 text-center pointer-events-auto"
        >
          +{hiddenCount} more notification{hiddenCount > 1 ? 's' : ''}
        </motion.div>
      )}
    </div>
  );
};
