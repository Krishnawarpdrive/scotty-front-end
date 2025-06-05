
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Code, Users, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stage {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'completed' | 'active' | 'pending';
}

interface InterviewerPipelineStageNavigatorProps {
  activeStage: string;
  onStageChange: (stage: string) => void;
}

const pipelineStages: Stage[] = [
  { id: 'phone-screening', label: 'Phone Screening', icon: Phone, status: 'completed' },
  { id: 'technical-screening', label: 'Technical Screening', icon: Code, status: 'active' },
  { id: 'client-screening', label: 'Client Screening', icon: Users, status: 'pending' }
];

export const InterviewerPipelineStageNavigator: React.FC<InterviewerPipelineStageNavigatorProps> = ({
  activeStage,
  onStageChange
}) => {
  const getStageStatus = (stage: Stage, index: number) => {
    const activeIndex = pipelineStages.findIndex(s => s.id === activeStage);
    if (index < activeIndex) return 'completed';
    if (index === activeIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {pipelineStages.map((stage, index) => {
          const status = getStageStatus(stage, index);
          const isActive = stage.id === activeStage;
          const IconComponent = stage.icon;
          
          return (
            <React.Fragment key={stage.id}>
              <motion.div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => onStageChange(stage.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-200",
                    status === 'completed' 
                      ? "bg-green-100 border-green-500 text-green-700"
                      : status === 'active'
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-gray-100 border-gray-300 text-gray-500"
                  )}
                >
                  {status === 'completed' ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <IconComponent className="h-6 w-6" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium text-center",
                    isActive ? "text-blue-700" : "text-gray-600"
                  )}
                >
                  {stage.label}
                </span>
              </motion.div>

              {index < pipelineStages.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-all duration-200",
                    index < pipelineStages.findIndex(s => s.id === activeStage)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
