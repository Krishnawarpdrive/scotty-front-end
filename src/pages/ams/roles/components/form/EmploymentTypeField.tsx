
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

interface EmploymentTypeFieldProps {
  form: UseFormReturn<FormValues>;
}

const EmploymentTypeField: React.FC<EmploymentTypeFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="employmentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Employment Type *</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmploymentTypeField;
