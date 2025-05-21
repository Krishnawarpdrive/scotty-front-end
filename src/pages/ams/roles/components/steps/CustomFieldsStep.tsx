
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from 'react-hook-form';
import { FormValues, CustomField } from '../roleFormSchema';
import DynamicFieldGroup from '@/components/DynamicFieldGroup';

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

      <div className="flex items-center space-x-2">
        <FormField
          control={form.control}
          name="saveAsTemplate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Save as template</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CustomFieldsStep;
