
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

interface ChecklistClientFieldsProps {
  form: UseFormReturn<Checklist>;
  clients: Array<{ id: string; name: string }>;
  watchClientId: string | undefined;
}

export const ChecklistClientFields: React.FC<ChecklistClientFieldsProps> = ({ 
  form, 
  clients,
  watchClientId 
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="clientId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {watchClientId && (
        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subdomain</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subdomain" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="region-north">North Region</SelectItem>
                  <SelectItem value="region-south">South Region</SelectItem>
                  <SelectItem value="department-hr">HR Department</SelectItem>
                  <SelectItem value="department-it">IT Department</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
