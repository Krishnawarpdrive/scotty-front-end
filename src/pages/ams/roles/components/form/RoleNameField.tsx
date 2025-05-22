
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

interface RoleNameFieldProps {
  form: UseFormReturn<FormValues>;
}

const RoleNameField: React.FC<RoleNameFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="roleName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Role Name *</FormLabel>
          <FormControl>
            <Input placeholder="e.g. Senior Frontend Developer" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RoleNameField;
