
import React from "react";

interface StageDotsProps {
  stage: number;
  totalStages?: number;
}

export const StageDots: React.FC<StageDotsProps> = ({ stage, totalStages = 6 }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStages }, (_, index) => index + 1).map((dot) => (
        <div
          key={dot}
          className={`h-2 w-2 rounded-full ${dot <= stage ? 'bg-green-500' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  );
};
