
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SmartPaperContent } from './SmartPaperContent';
import { useSmartActionContext } from '@/hooks/useSmartActionContext';
import { cn } from '@/lib/utils';

interface SmartActionCenterProps {
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  className?: string;
}

export const SmartActionCenter: React.FC<SmartActionCenterProps> = ({
  position = 'bottom-right',
  className
}) => {
  const {
    context,
    actions,
    isVisible,
    toggleVisibility,
    handleTaskClick,
    handleActionClick,
    handleNotificationDismiss
  } = useSmartActionContext();

  const [currentPaper, setCurrentPaper] = useState<'urgent' | 'important' | 'contextual'>('urgent');
  const [isExpanded, setIsExpanded] = useState(false);

  const papers = ['urgent', 'important', 'contextual'] as const;
  
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-center':
        return 'bottom-6 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
      default:
        return 'bottom-6 right-6';
    }
  };

  const getTotalBadgeCount = () => {
    if (!context) return 0;
    
    const urgentCount = context.pendingTasks.filter(t => t.priority === 'urgent').length +
                      context.notifications.filter(n => n.type === 'urgent').length;
    const importantCount = context.pendingTasks.filter(t => t.priority === 'high').length +
                          context.notifications.filter(n => n.type === 'important').length;
    
    return urgentCount + importantCount;
  };

  const getPaperBadgeCount = (paperType: 'urgent' | 'important' | 'contextual') => {
    if (!context) return 0;
    
    if (paperType === 'urgent') {
      return context.pendingTasks.filter(t => t.priority === 'urgent').length +
             context.notifications.filter(n => n.type === 'urgent').length;
    }
    
    if (paperType === 'important') {
      return context.pendingTasks.filter(t => t.priority === 'high').length +
             context.notifications.filter(n => n.type === 'important').length;
    }
    
    return actions.filter(a => a.priority === 'contextual').length;
  };

  const handleFolderClick = () => {
    if (isVisible) {
      setIsExpanded(!isExpanded);
    } else {
      toggleVisibility();
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => toggleVisibility(), 200);
  };

  const goToPreviousPaper = () => {
    const currentIndex = papers.indexOf(currentPaper);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : papers.length - 1;
    setCurrentPaper(papers[previousIndex]);
  };

  const goToNextPaper = () => {
    const currentIndex = papers.indexOf(currentPaper);
    const nextIndex = currentIndex < papers.length - 1 ? currentIndex + 1 : 0;
    setCurrentPaper(papers[nextIndex]);
  };

  const getPaperColor = (paper: 'urgent' | 'important' | 'contextual') => {
    switch (paper) {
      case 'urgent': return 'bg-red-500';
      case 'important': return 'bg-amber-500';
      case 'contextual': return 'bg-blue-500';
    }
  };

  const shouldPulse = context?.isUrgent || false;

  if (!isVisible && !shouldPulse) return null;

  return (
    <div className={cn('fixed z-50', getPositionClasses(), className)}>
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Paper Stack Effect */}
            <div className="relative">
              {/* Background papers */}
              <div className="absolute inset-0 transform translate-x-1 translate-y-1 rotate-1">
                <div className="w-80 h-96 bg-white rounded-lg shadow-md border opacity-60"></div>
              </div>
              <div className="absolute inset-0 transform translate-x-0.5 translate-y-0.5 rotate-0.5">
                <div className="w-80 h-96 bg-white rounded-lg shadow-lg border opacity-80"></div>
              </div>
              
              {/* Main paper */}
              <div className="relative">
                <SmartPaperContent
                  type={currentPaper}
                  tasks={context?.pendingTasks || []}
                  notifications={context?.notifications || []}
                  actions={actions}
                  onTaskClick={handleTaskClick}
                  onActionClick={handleActionClick}
                  onNotificationDismiss={handleNotificationDismiss}
                />
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute -top-2 -right-2 flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-white shadow-md"
                onClick={goToPreviousPaper}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              
              <div className="flex gap-1">
                {papers.map((paper) => (
                  <motion.button
                    key={paper}
                    onClick={() => setCurrentPaper(paper)}
                    className={cn(
                      'w-2 h-8 rounded-full transition-all',
                      currentPaper === paper 
                        ? getPaperColor(paper) 
                        : 'bg-gray-300 hover:bg-gray-400'
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {getPaperBadgeCount(paper) > 0 && (
                      <Badge 
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs"
                        variant="destructive"
                      >
                        {getPaperBadgeCount(paper)}
                      </Badge>
                    )}
                  </motion.button>
                ))}
              </div>
              
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-white shadow-md"
                onClick={goToNextPaper}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-white shadow-md"
                onClick={handleClose}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotateZ: shouldPulse ? [0, -5, 5, 0] : 0
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.2, 
              ease: "easeOut",
              rotateZ: shouldPulse ? { repeat: Infinity, duration: 2 } : undefined
            }}
            className="relative"
          >
            <Button
              onClick={handleFolderClick}
              className={cn(
                'w-14 h-14 rounded-full shadow-lg relative overflow-hidden',
                shouldPulse && 'animate-pulse ring-4 ring-red-400 ring-opacity-50'
              )}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <motion.div
                animate={{ 
                  rotateY: isVisible ? 180 : 0,
                  scale: shouldPulse ? [1, 1.1, 1] : 1
                }}
                transition={{ 
                  duration: 0.3,
                  scale: shouldPulse ? { repeat: Infinity, duration: 1.5 } : undefined
                }}
              >
                <Zap className="h-6 w-6 text-white" />
              </motion.div>
              
              {getTotalBadgeCount() > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-6 w-6 p-0 text-xs animate-bounce"
                  variant="destructive"
                >
                  {getTotalBadgeCount()}
                </Badge>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
