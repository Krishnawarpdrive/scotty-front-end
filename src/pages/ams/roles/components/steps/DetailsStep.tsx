
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';
import WorkModeField from '../form/WorkModeField';
import EmploymentTypeField from '../form/EmploymentTypeField';
import ExperienceRangeSelector from '../form/ExperienceRangeSelector';
import JobDescriptionField from '../form/JobDescriptionField';
import { FormLabel } from "@/components/ui/form";

interface DetailsStepProps {
  form: UseFormReturn<FormValues>;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WorkModeField form={form} />
        <EmploymentTypeField form={form} />
      </div>

      <div className="space-y-2">
        <FormLabel>Experience Range *</FormLabel>
        <ExperienceRangeSelector form={form} />
      </div>

      <JobDescriptionField form={form} />
    </div>
  );
};

export default DetailsStep;
