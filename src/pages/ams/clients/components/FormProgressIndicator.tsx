
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
    <div className="w-full mb-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step circle */}
            <div 
              className={cn(
                "flex items-center justify-center rounded-full transition-all",
                "w-8 h-8 text-sm font-medium",
                index < currentStep 
                  ? "bg-primary text-white" 
                  : index === currentStep 
                    ? "bg-primary/20 text-primary border border-primary" 
                    : "bg-gray-100 text-gray-500",
                onStepClick ? "cursor-pointer hover:shadow-md" : ""
              )}
              onClick={() => onStepClick && onStepClick(index)}
            >
              {index < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {/* Step label */}
            <span 
              className={cn(
                "hidden md:block ml-2 text-sm",
                index === currentStep ? "font-medium text-primary" : "text-gray-500"
              )}
            >
              {step}
            </span>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "flex-1 h-[2px] mx-2",
                  index < currentStep ? "bg-primary" : "bg-gray-200"
                )}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormProgressIndicator;
