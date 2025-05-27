
import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InterviewStageData {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  description?: string;
  duration?: string;
  interviewer?: string;
}

interface InterviewStageProps {
  stage: InterviewStageData;
  isLast?: boolean;
}

export const InterviewStage: React.FC<InterviewStageProps> = ({ stage, isLast = false }) => {
  const getStatusIcon = () => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'current':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'upcoming':
        return <Circle className="w-4 h-4 text-gray-300" />;
      default:
        return <Circle className="w-4 h-4 text-gray-300" />;
    }
  };

  const getStatusColor = () => {
    switch (stage.status) {
      case 'completed': return 'bg-green-600';
      case 'current': return 'bg-amber-500';
      case 'upcoming': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="flex items-start gap-3 relative">
      {/* Timeline Line */}
      {!isLast && (
        <div 
          className={cn(
            "absolute left-2 top-6 w-0.5 h-8",
            stage.status === 'completed' ? 'bg-green-600' : 'bg-gray-200'
          )}
        />
      )}
      
      {/* Status Icon */}
      <div className={cn(
        "relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-white border-2",
        stage.status === 'completed' && 'border-green-600',
        stage.status === 'current' && 'border-amber-500',
        stage.status === 'upcoming' && 'border-gray-300'
      )}>
        {getStatusIcon()}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h4 className={cn(
              "text-sm font-medium font-rubik",
              stage.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
            )}>
              {stage.title}
            </h4>
            
            {stage.date && (
              <p className="text-xs text-gray-500 font-rubik mt-0.5">
                {stage.date}
              </p>
            )}
            
            {stage.description && (
              <p className="text-xs text-gray-600 font-rubik mt-1">
                {stage.description}
              </p>
            )}
            
            {stage.interviewer && (
              <p className="text-xs text-gray-500 font-rubik mt-1">
                Interviewer: {stage.interviewer}
              </p>
            )}
          </div>
          
          {stage.duration && (
            <span className="text-xs text-gray-400 font-rubik">
              {stage.duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
