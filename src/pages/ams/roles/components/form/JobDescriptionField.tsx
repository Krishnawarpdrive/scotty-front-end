
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

interface JobDescriptionFieldProps {
  form: UseFormReturn<FormValues>;
}

const JobDescriptionField: React.FC<JobDescriptionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="jobDescription"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Job Description</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter detailed job description..."
              className="min-h-[200px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default JobDescriptionField;
