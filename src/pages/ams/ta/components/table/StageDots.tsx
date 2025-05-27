
import React from "react";

export interface StageDotsProps {
  currentStage: number;
  totalStages: number;
}

export const StageDots: React.FC<StageDotsProps> = ({ currentStage, totalStages }) => {
  const stages = Array.from({ length: totalStages }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-1">
      {stages.map((stage) => (
        <div
          key={stage}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            stage <= currentStage
              ? 'bg-[#009933]'
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
