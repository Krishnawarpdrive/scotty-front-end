
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues } from '../types/roleTypes';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface RoleRequirementsProps {
  form: UseFormReturn<RoleFormValues>;
}

const RoleRequirements: React.FC<RoleRequirementsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="responsibilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Responsibilities</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List the main responsibilities of this role"
                className="resize-none"
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
                placeholder="List the main requirements for this role"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default RoleRequirements;
