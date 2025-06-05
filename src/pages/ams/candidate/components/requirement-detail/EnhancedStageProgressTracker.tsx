
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertTriangle, Circle } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending' | 'overdue';
  type: 'document' | 'interview' | 'assessment' | 'form';
  completedDate?: string;
  dueDate?: string;
  estimatedTime?: string;
  hasAction?: boolean;
}

interface EnhancedStageProgressTrackerProps {
  stages: Stage[];
  currentStageIndex: number;
  onStageClick: (stageIndex: number) => void;
}

export const EnhancedStageProgressTracker: React.FC<EnhancedStageProgressTrackerProps> = ({
  stages,
  currentStageIndex,
  onStageClick
}) => {
  const getStageIcon = (stage: Stage) => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStageColor = (stage: Stage) => {
    switch (stage.status) {
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'current':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'overdue':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const progressPercentage = ((currentStageIndex + 1) / stages.length) * 100;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Application Progress</h3>
          <Badge variant="secondary">
            {currentStageIndex + 1} of {stages.length} stages
          </Badge>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              onClick={() => onStageClick(index)}
              className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${getStageColor(stage)} ${
                index === currentStageIndex ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {getStageIcon(stage)}
                <div>
                  <h4 className="font-medium">{stage.name}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    {stage.completedDate && (
                      <span>Completed: {stage.completedDate}</span>
                    )}
                    {stage.dueDate && stage.status !== 'completed' && (
                      <span>Due: {stage.dueDate}</span>
                    )}
                    {stage.estimatedTime && (
                      <span>Est: {stage.estimatedTime}</span>
                    )}
                  </div>
                </div>
              </div>
              
              {stage.hasAction && stage.status === 'current' && (
                <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                  Action Required
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
