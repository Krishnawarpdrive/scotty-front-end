
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface RoleFormProgressProps {
  currentStep: number;
  totalSteps: number;
  formSections: string[];
  progress: number;
}

const RoleFormProgress: React.FC<RoleFormProgressProps> = ({
  currentStep,
  totalSteps,
  formSections,
  progress
}) => {
  return (
    <div className="mb-6 p-4 bg-muted/30 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {formSections[currentStep]}
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Step {currentStep + 1} of {totalSteps}
          </Badge>
          <span className="text-xs text-muted-foreground">{progress}% Complete</span>
        </div>
      </div>
      <Progress value={progress} className="h-2 mb-3" />
      
      <div className="flex items-center gap-1">
        {formSections.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-sm ${
              index < currentStep 
                ? 'bg-primary' 
                : index === currentStep 
                  ? 'bg-primary/60' 
                  : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleFormProgress;
