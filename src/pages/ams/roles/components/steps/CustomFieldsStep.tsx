
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { RoleFormValues } from '../types/roleTypes';

interface CustomFieldsStepProps {
  form: UseFormReturn<RoleFormValues>;
  customFields: any[];
  setCustomFields: (fields: any[]) => void;
}

const CustomFieldsStep: React.FC<CustomFieldsStepProps> = ({
  form,
  customFields,
  setCustomFields
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Final Options</h3>
        
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
                <FormLabel>
                  Save as Template
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Save this role configuration as a template for future use
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="text-sm text-muted-foreground">
          <p>Review your role details and click "Create Role" to finish.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomFieldsStep;
