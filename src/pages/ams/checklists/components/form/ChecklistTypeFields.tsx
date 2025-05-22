
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checklist } from '../../types';

interface ChecklistTypeFieldsProps {
  form: UseFormReturn<Checklist>;
}

export const ChecklistTypeFields: React.FC<ChecklistTypeFieldsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Checklist Type</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select checklist type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="role">Role-based</SelectItem>
              <SelectItem value="client">Client-based</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            The type of checklist determines its availability and association.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
