
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastInstance } from '../types/ToastTypes';
import { getToastColors } from '../utils/ToastUtils';
import { cn } from '@/lib/utils';

interface ToastCardProps {
  toast: ToastInstance;
  onDismiss: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  index: number;
}

export const ToastCard: React.FC<ToastCardProps> = ({
  toast,
  onDismiss,
  onPause,
  onResume,
  index
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const colors = getToastColors(toast.type || 'info');

  useEffect(() => {
    if (toast.persistent || toast.duration === 0 || isPaused) return;

    const duration = toast.duration || 4000;
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [toast.duration, toast.persistent, isPaused]);

  const handlePause = () => {
    setIsPaused(true);
    onPause(toast.id);
  };

  const handleResume = () => {
    setIsPaused(false);
    onResume(toast.id);
  };

  const handleDismiss = () => {
    onDismiss(toast.id);
  };

  return (
    <motion.div
      className={cn(
        'relative w-full max-w-sm overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm',
        colors.bg,
        toast.className
      )}
      style={{
        zIndex: 1000 - index,
      }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
    >
      {/* Progress bar */}
      {!toast.persistent && toast.duration !== 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/10">
          <motion.div
            className={cn('h-full', colors.progress)}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon */}
            {toast.icon && (
              <div className={cn('flex-shrink-0 mt-0.5', colors.icon)}>
                {toast.icon}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className={cn('font-medium text-sm', colors.text)}>
                {toast.title}
              </div>
              
              {toast.description && (
                <div className={cn('mt-1 text-sm opacity-90', colors.text)}>
                  {toast.description}
                </div>
              )}

              {/* Actions */}
              {toast.actions && toast.actions.length > 0 && (
                <div className="mt-3 flex gap-2 flex-wrap">
                  {toast.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      size="sm"
                      variant={action.variant || 'outline'}
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className="h-7 text-xs"
                    >
                      {action.loading && (
                        <div className="animate-spin mr-1 h-3 w-3 border border-current border-t-transparent rounded-full" />
                      )}
                      {action.icon && !action.loading && (
                        <span className="mr-1">{action.icon}</span>
                      )}
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {!toast.persistent && toast.duration !== 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={isPaused ? handleResume : handlePause}
                className="h-6 w-6 p-0"
              >
                {isPaused ? (
                  <Play className="h-3 w-3" />
                ) : (
                  <Pause className="h-3 w-3" />
                )}
              </Button>
            )}

            {toast.dismissible && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
