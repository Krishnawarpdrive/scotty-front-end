
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText, User, Upload, MessageSquare, History, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Stage {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface EnhancedInterviewerStageNavigatorProps {
  activeStage: string;
  onStageChange: (stage: string) => void;
}

const interviewerStages: Stage[] = [
  { id: 'interview-details', label: 'Interview Details', icon: Calendar },
  { id: 'candidate-profile', label: 'Candidate Profile', icon: User },
  { id: 'documents', label: 'Documents', icon: Upload },
  { id: 'interview-feedback', label: 'Interview Feedback', icon: FileText },
  { id: 'interview-notes', label: 'Notes & Comments', icon: MessageSquare },
  { id: 'interview-history', label: 'Interview History', icon: History }
];

export const EnhancedInterviewerStageNavigator: React.FC<EnhancedInterviewerStageNavigatorProps> = ({
  activeStage,
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
    const activeStageIndex = interviewerStages.findIndex(stage => stage.id === activeStage);
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
  }, [activeStage]);

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
          {interviewerStages.map((stage, index) => {
            const isActive = stage.id === activeStage;
            const IconComponent = stage.icon;
            
            return (
              <motion.div
                key={stage.id}
                className="flex-shrink-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => onStageChange(stage.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap",
                    isActive 
                      ? "bg-blue-50 border-blue-200 text-blue-700 ring-2 ring-blue-200" 
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{stage.label}</span>
                </button>
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
