
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

interface SaveAsTemplateFieldProps {
  form: UseFormReturn<FormValues>;
}

const SaveAsTemplateField: React.FC<SaveAsTemplateFieldProps> = ({ form }) => {
  return (
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
  );
};

export default SaveAsTemplateField;
