
import React from 'react';
import { cn } from "@/lib/utils";

interface FormProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  progress?: number;
}

const FormProgressIndicator: React.FC<FormProgressIndicatorProps> = ({ 
  steps, 
  currentStep,
  onStepClick,
  progress = 0
}) => {
  return (
    <div className="w-full mb-6 px-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Connector line (before the first step, we don't need it) */}
            {index > 0 && (
              <div 
                className={cn(
                  "flex-1 h-[2px]",
                  index <= currentStep 
                    ? "bg-primary" 
                    : index === currentStep + 1 
                      ? `bg-gradient-to-r from-primary to-gray-200` 
                      : "bg-gray-200"
                )}
              ></div>
            )}
            
            {/* Step circle */}
            <div 
              className={cn(
                "flex items-center justify-center transition-all",
                "w-auto rounded-full px-3 py-1 text-sm font-medium",
                index === currentStep 
                  ? "bg-primary text-white" 
                  : index < currentStep 
                    ? "bg-primary/20 text-primary border border-primary" 
                    : "bg-gray-100 text-gray-500",
                onStepClick ? "cursor-pointer hover:shadow-md" : ""
              )}
              onClick={() => onStepClick && onStepClick(index)}
            >
              {step}
            </div>
          </React.Fragment>
        ))}
      </div>
      
      {/* Progress indicator under the step text */}
      <div className="w-full mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgressIndicator;
