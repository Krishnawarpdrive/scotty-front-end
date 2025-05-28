
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending';
  order: number;
}

interface EnhancedStageNavigatorProps {
  stages: Stage[];
  currentStageId: string;
  onStageChange: (stageId: string) => void;
}

export const EnhancedStageNavigator: React.FC<EnhancedStageNavigatorProps> = ({
  stages,
  currentStageId,
  onStageChange
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToStage = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Auto-scroll to active stage
    const activeStageIndex = stages.findIndex(stage => stage.id === currentStageId);
    if (scrollContainerRef.current && activeStageIndex !== -1) {
      const container = scrollContainerRef.current;
      const activeElement = container.children[activeStageIndex] as HTMLElement;
      if (activeElement) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();
        
        if (elementRect.left < containerRect.left || elementRect.right > containerRect.right) {
          activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }
    }
  }, [currentStageId, stages]);

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'active':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStageColor = (status: string, isActive: boolean) => {
    if (isActive) return 'bg-blue-50 border-blue-200 text-blue-700';
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100';
      case 'active':
        return 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToStage('left')}
          className="h-8 w-8 p-0 flex-shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {stages.map((stage, index) => {
            const isActive = stage.id === currentStageId;
            
            return (
              <motion.div
                key={stage.id}
                className="flex items-center gap-2 flex-shrink-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => onStageChange(stage.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap",
                    getStageColor(stage.status, isActive),
                    isActive && "ring-2 ring-blue-200"
                  )}
                >
                  {getStageIcon(stage.status)}
                  <span className="text-sm font-medium">{stage.name}</span>
                </button>
                
                {index < stages.length - 1 && (
                  <div className="w-8 flex justify-center">
                    <div className={cn(
                      "h-0.5 w-6",
                      stage.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                    )} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToStage('right')}
          className="h-8 w-8 p-0 flex-shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
