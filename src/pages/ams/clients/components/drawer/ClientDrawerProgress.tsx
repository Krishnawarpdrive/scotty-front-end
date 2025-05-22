
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ClientDrawerProgressProps {
  currentStep: number;
  formSections: string[];
  progress: number;
}

const ClientDrawerProgress: React.FC<ClientDrawerProgressProps> = ({
  currentStep,
  formSections,
  progress
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{formSections[currentStep]}</span>
        <span>Step {currentStep + 1} of {formSections.length}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ClientDrawerProgress;
