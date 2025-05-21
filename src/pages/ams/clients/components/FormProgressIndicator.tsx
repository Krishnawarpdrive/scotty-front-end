
import React from 'react';
import { cn } from "@/lib/utils";

interface FormProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const FormProgressIndicator: React.FC<FormProgressIndicatorProps> = ({ 
  steps, 
  currentStep,
  onStepClick
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
                  "flex-1 h-[2px] mx-2",
                  index <= currentStep ? "bg-primary" : "bg-gray-200"
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
    </div>
  );
};

export default FormProgressIndicator;
