
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues, CustomField } from '../types/roleTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import CustomFieldInput from './CustomFieldInput';

interface RoleRequirementsProps {
  form: UseFormReturn<RoleFormValues>;
}

const RoleRequirements: React.FC<RoleRequirementsProps> = ({ form }) => {
  const customFields = form.watch('customFields') || [];

  const handleCustomFieldsChange = (updatedFields: CustomField[]) => {
    form.setValue('customFields', updatedFields, { shouldValidate: true });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Job Description</h3>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsibilities</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter roles and responsibilities" 
                  className="min-h-24 resize-y"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter job requirements" 
                  className="min-h-24 resize-y"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <CustomFieldInput 
          section="description"
          customFields={customFields}
          onFieldsChange={handleCustomFieldsChange}
        />
      </div>
    </div>
  );
};

export default RoleRequirements;
