
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface SchedulerProgressProps {
  currentStep: number;
  steps: Step[];
}

export const SchedulerProgress: React.FC<SchedulerProgressProps> = ({
  currentStep,
  steps
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            ${currentStep >= step.id 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
            }
          `}>
            {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
          </div>
          <div className="ml-2 text-sm">
            <div className="font-medium">{step.title}</div>
            <div className="text-gray-500">{step.description}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`
              mx-4 h-0.5 w-8 
              ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}
            `} />
          )}
        </div>
      ))}
    </div>
  );
};
