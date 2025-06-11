
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  Circle,
  AlertCircle 
} from 'lucide-react';
import { Interview } from '../../MyInterviewsPage';

interface InterviewerDrawerProgressProps {
  interview: Interview;
}

export const InterviewerDrawerProgress: React.FC<InterviewerDrawerProgressProps> = ({
  interview
}) => {
  // Mock interview stages data
  const stages = [
    { id: 'screening', name: 'Phone Screening', status: 'completed', date: '2024-01-10' },
    { id: 'technical', name: 'Technical Interview', status: 'current', date: '2024-01-15' },
    { id: 'culture', name: 'Culture Fit', status: 'pending', date: null },
    { id: 'final', name: 'Final Round', status: 'pending', date: null },
  ];

  const currentStageIndex = stages.findIndex(s => s.status === 'current');
  const progressPercentage = ((currentStageIndex + 0.5) / stages.length) * 100;

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'current':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <Circle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'current':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Interview Progress</h3>
        <Badge variant="secondary" className="text-xs">
          Stage {currentStageIndex + 1} of {stages.length}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>Overall Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Stage Timeline */}
      <div className="space-y-2">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center space-x-3">
            {getStageIcon(stage.status)}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  stage.status === 'current' ? 'text-blue-900' : 
                  stage.status === 'completed' ? 'text-green-900' : 
                  'text-gray-700'
                }`}>
                  {stage.name}
                </span>
                
                <Badge className={getStageColor(stage.status)} variant="secondary">
                  {stage.status === 'current' ? 'In Progress' : 
                   stage.status === 'completed' ? 'Completed' : 'Pending'}
                </Badge>
              </div>
              
              {stage.date && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {stage.status === 'completed' ? 'Completed on' : 'Scheduled for'} {stage.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
