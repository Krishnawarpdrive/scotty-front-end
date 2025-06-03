
import React from 'react';

interface StageDotsProps {
  stage: string | number;
  totalStages?: number;
}

export const StageDots: React.FC<StageDotsProps> = ({ stage, totalStages = 6 }) => {
  // Convert stage to number if it's a string
  const currentStage = typeof stage === 'string' ? 
    getStageNumber(stage) : stage;

  function getStageNumber(stageName: string): number {
    const stageMap: { [key: string]: number } = {
      'application': 1,
      'phone-screening': 2,
      'technical': 3,
      'aptitude-test': 3,
      'client-interview': 4,
      'background-verification': 5,
      'final-review': 6
    };
    return stageMap[stageName] || 1;
  }

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStages }, (_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${
            index < currentStage ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
