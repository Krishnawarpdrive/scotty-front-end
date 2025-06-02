
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, PauseCircle, XCircle, ChevronRight } from 'lucide-react';
import { CandidateStage } from '../types/CandidateStageTypes';

interface StageProgressIndicatorProps {
  stages: CandidateStage[];
  currentStage: string;
  onStageSelect: (stageId: string) => void;
}

export const StageProgressIndicator: React.FC<StageProgressIndicatorProps> = ({
  stages,
  currentStage,
  onStageSelect
}) => {
  const getStageStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'on-hold': return <PauseCircle className="h-5 w-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <div className="h-5 w-5 rounded-full bg-gray-300" />;
    }
  };

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getConnectorColor = (stage: CandidateStage, nextStage?: CandidateStage) => {
    if (stage.status === 'completed') return 'bg-green-400';
    if (stage.status === 'current' && nextStage) return 'bg-gradient-to-r from-blue-400 to-gray-300';
    return 'bg-gray-300';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <div 
                className={`flex flex-col items-center space-y-2 cursor-pointer transition-all hover:scale-105 ${
                  currentStage === stage.id ? 'scale-105' : ''
                }`}
                onClick={() => onStageSelect(stage.id)}
              >
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all
                  ${currentStage === stage.id 
                    ? 'ring-2 ring-blue-500 ring-offset-2 border-blue-500 bg-blue-50' 
                    : stage.status === 'completed' 
                      ? 'border-green-500 bg-green-50'
                      : stage.status === 'current'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-gray-50'
                  }
                `}>
                  {getStageStatusIcon(stage.status)}
                </div>
                
                <div className="text-center">
                  <p className={`text-sm font-medium ${
                    currentStage === stage.id ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {stage.name}
                  </p>
                  
                  <Badge 
                    variant="outline" 
                    className={`mt-1 text-xs ${getStageStatusColor(stage.status)}`}
                  >
                    {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                  </Badge>
                  
                  {stage.completedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(stage.completedAt).toLocaleDateString()}
                    </p>
                  )}
                  
                  {stage.assignedTo && (
                    <p className="text-xs text-gray-600 mt-1">
                      Assigned to: {stage.assignedTo}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`h-1 rounded-full ${getConnectorColor(stage, stages[index + 1])}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
