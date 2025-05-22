
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

interface WorkModeFieldProps {
  form: UseFormReturn<FormValues>;
}

const WorkModeField: React.FC<WorkModeFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="workMode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Work Mode *</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select work mode" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">Onsite</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WorkModeField;
