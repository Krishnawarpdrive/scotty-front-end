
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

interface ExternalNameFieldProps {
  form: UseFormReturn<FormValues>;
}

const ExternalNameField: React.FC<ExternalNameFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="externalName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>External Name (optional)</FormLabel>
          <FormControl>
            <Input placeholder="Name shown to candidates" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ExternalNameField;
