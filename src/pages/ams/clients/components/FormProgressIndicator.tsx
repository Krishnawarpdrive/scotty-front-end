
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FormProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  progress: number;
}

const FormProgressIndicator = ({
  steps,
  currentStep,
  onStepClick,
  progress
}: FormProgressIndicatorProps) => {
  return (
    <div className="py-3 px-6 border-b">
      <div className="mb-2 flex justify-between items-center">
        <div className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</div>
        <div className="text-sm text-muted-foreground">{progress}% complete</div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex mt-4 gap-1 relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={step}>
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(index)}
                disabled={!onStepClick}
                className={cn(
                  "flex flex-col items-center flex-1 group",
                  onStepClick ? "cursor-pointer" : ""
                )}
              >
                <div
                  className={cn(
                    "rounded-full w-6 h-6 flex items-center justify-center font-semibold z-10 transition-colors",
                    isCompleted ? "bg-primary text-primary-foreground" : 
                    isCurrent ? "bg-primary/20 text-primary ring-2 ring-primary" : 
                    "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1.5 font-medium transition-colors text-center",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                    onStepClick ? "group-hover:text-foreground" : ""
                  )}
                >
                  {step}
                </span>
              </button>
              
              {index < steps.length - 1 && (
                <div className="flex-1 border-t border-muted self-start mt-3 -mx-1"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgressIndicator;
