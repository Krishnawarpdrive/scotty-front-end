
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues, CustomField } from '../roleFormSchema';
import DynamicFieldGroup from '@/components/DynamicFieldGroup';
import SaveAsTemplateField from '../form/SaveAsTemplateField';

interface CustomFieldsStepProps {
  form: UseFormReturn<FormValues>;
  customFields: CustomField[];
  setCustomFields: React.Dispatch<React.SetStateAction<CustomField[]>>;
}

const CustomFieldsStep: React.FC<CustomFieldsStepProps> = ({ 
  form, 
  customFields, 
  setCustomFields 
}) => {
  return (
    <div className="space-y-6">
      <DynamicFieldGroup
        title="Custom Fields"
        fields={customFields}
        onFieldsChange={setCustomFields}
      />

      <SaveAsTemplateField form={form} />
    </div>
  );
};

export default CustomFieldsStep;
