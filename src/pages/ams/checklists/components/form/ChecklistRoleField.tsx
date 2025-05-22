
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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

interface ChecklistRoleFieldProps {
  form: UseFormReturn<Checklist>;
  roles: Array<{ id: string; name: string }>;
}

export const ChecklistRoleField: React.FC<ChecklistRoleFieldProps> = ({ form, roles }) => {
  return (
    <FormField
      control={form.control}
      name="roleId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Role</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
