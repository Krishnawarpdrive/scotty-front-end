
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
import { Input } from '@/components/ui/input';

interface RoleBasicInfoProps {
  form: UseFormReturn<RoleFormValues>;
}

const RoleBasicInfo: React.FC<RoleBasicInfoProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="roleName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Software Engineer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Senior Software Engineer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Engineering" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default RoleBasicInfo;
