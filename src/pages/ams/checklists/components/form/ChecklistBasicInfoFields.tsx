
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checklist } from '../../types';

interface ChecklistBasicInfoFieldsProps {
  form: UseFormReturn<Checklist>;
}

export const ChecklistBasicInfoFields: React.FC<ChecklistBasicInfoFieldsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Checklist Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter checklist name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
