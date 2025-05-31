
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastInstance } from '../types/ToastTypes';
import { getToastColors } from '../utils/ToastUtils';
import { cn } from '@/lib/utils';

interface EnhancedToastCardProps {
  toast: ToastInstance;
  onDismiss: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  index: number;
  position: string;
}

export const EnhancedToastCard: React.FC<EnhancedToastCardProps> = ({
  toast,
  onDismiss,
  onPause,
  onResume,
  index,
  position
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const colors = getToastColors(toast.type || 'info');
  const progressRef = useRef<number>(100);
  const timerRef = useRef<NodeJS.Timeout>();

  // Smart timing based on content length and type
  const getSmartDuration = () => {
    if (toast.persistent || toast.duration === 0) return 0;
    if (toast.duration) return toast.duration;

    const baseTime = 4000;
    const contentLength = (toast.title?.length || 0) + (toast.description?.length || 0);
    const readingTime = Math.max(contentLength * 50, 1000); // 50ms per character, min 1s
    
    const typeMultiplier = {
      'error': 1.5,
      'warning': 1.3,
      'success': 1.0,
      'info': 1.0,
      'loading': 0
    };

    return Math.min(baseTime + readingTime, 8000) * (typeMultiplier[toast.type as keyof typeof typeMultiplier] || 1);
  };

  const duration = getSmartDuration();

  useEffect(() => {
    if (duration === 0 || isPaused) return;

    const interval = 50;
    const decrement = (interval / duration) * 100;

    timerRef.current = setInterval(() => {
      progressRef.current = Math.max(progressRef.current - decrement, 0);
      setProgress(progressRef.current);
      setTimeRemaining(Math.ceil((progressRef.current / 100) * duration / 1000));

      if (progressRef.current <= 0) {
        clearInterval(timerRef.current!);
        onDismiss(toast.id);
      }
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [duration, isPaused, toast.id, onDismiss]);

  const handlePause = () => {
    setIsPaused(true);
    onPause(toast.id);
  };

  const handleResume = () => {
    setIsPaused(false);
    onResume(toast.id);
  };

  const handleRestart = () => {
    progressRef.current = 100;
    setProgress(100);
    setIsPaused(false);
    onResume(toast.id);
  };

  const getAnimationVariants = () => {
    const isTopPosition = position.includes('top');
    const isRightPosition = position.includes('right');
    const isLeftPosition = position.includes('left');

    return {
      initial: {
        opacity: 0,
        scale: 0.3,
        x: isRightPosition ? 100 : isLeftPosition ? -100 : 0,
        y: isTopPosition ? -100 : 100,
      },
      animate: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        x: isRightPosition ? 100 : isLeftPosition ? -100 : 0,
        transition: { duration: 0.2 }
      },
      hover: {
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }
    };
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      className={cn(
        'relative w-full max-w-sm overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm cursor-pointer',
        colors.bg,
        toast.className
      )}
      style={{ zIndex: 1000 - index }}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      onMouseEnter={() => {
        setIsHovered(true);
        if (duration > 0) handlePause();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (duration > 0) handleResume();
      }}
      layout
    >
      {/* Enhanced Progress Bar with Animation */}
      {duration > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/10">
          <motion.div
            className={cn('h-full relative overflow-hidden', colors.progress)}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-100, 100] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            />
          </motion.div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Animated Icon */}
            {toast.icon && (
              <motion.div 
                className={cn('flex-shrink-0 mt-0.5', colors.icon)}
                animate={toast.type === 'loading' ? { rotate: 360 } : {}}
                transition={toast.type === 'loading' ? { repeat: Infinity, duration: 1 } : {}}
              >
                {toast.icon}
              </motion.div>
            )}

            {/* Content with stagger animation */}
            <div className="flex-1 min-w-0">
              <motion.div 
                className={cn('font-medium text-sm', colors.text)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {toast.title}
              </motion.div>
              
              {toast.description && (
                <motion.div 
                  className={cn('mt-1 text-sm opacity-90', colors.text)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {toast.description}
                </motion.div>
              )}

              {/* Enhanced Actions */}
              {toast.actions && toast.actions.length > 0 && (
                <motion.div 
                  className="mt-3 flex gap-2 flex-wrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {toast.actions.map((action, actionIndex) => (
                    <motion.div
                      key={actionIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        variant={action.variant || 'outline'}
                        onClick={action.onClick}
                        disabled={action.disabled}
                        className="h-7 text-xs"
                      >
                        {action.loading && (
                          <motion.div 
                            className="animate-spin mr-1 h-3 w-3 border border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          />
                        )}
                        {action.icon && !action.loading && (
                          <span className="mr-1">{action.icon}</span>
                        )}
                        {action.label}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Enhanced Controls */}
          <AnimatePresence>
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Time Remaining Indicator */}
              {isHovered && duration > 0 && timeRemaining > 0 && (
                <motion.div
                  className="text-xs text-gray-500 mr-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {timeRemaining}s
                </motion.div>
              )}

              {/* Interactive Controls */}
              {duration > 0 && (
                <motion.div
                  className="flex gap-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleRestart}
                    className="h-6 w-6 p-0"
                    title="Restart timer"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={isPaused ? handleResume : handlePause}
                    className="h-6 w-6 p-0"
                    title={isPaused ? "Resume" : "Pause"}
                  >
                    {isPaused ? (
                      <Play className="h-3 w-3" />
                    ) : (
                      <Pause className="h-3 w-3" />
                    )}
                  </Button>
                </motion.div>
              )}

              {toast.dismissible && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDismiss(toast.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Status indicator for different types */}
      <motion.div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1',
          {
            'bg-green-500': toast.type === 'success',
            'bg-red-500': toast.type === 'error',
            'bg-yellow-500': toast.type === 'warning',
            'bg-blue-500': toast.type === 'info',
            'bg-gray-500': toast.type === 'loading',
          }
        )}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      />
    </motion.div>
  );
};
