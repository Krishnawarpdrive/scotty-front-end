
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DynamicFieldGroup from "@/components/DynamicFieldGroup";
import { CustomField, DrawerFormValues } from "./clientDrawerSchema";

interface SourcingDetailsStepProps {
  form: UseFormReturn<DrawerFormValues>;
  customSourcingFields: CustomField[];
  setCustomSourcingFields: React.Dispatch<React.SetStateAction<CustomField[]>>;
}

const SourcingDetailsStep: React.FC<SourcingDetailsStepProps> = ({
  form,
  customSourcingFields,
  setCustomSourcingFields
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">Sourcing Details</h2>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="sourcingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sourcing Type <span className="text-red-500">*</span></FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Direct">Direct</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Agency">Agency</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="sourcingAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sourcing Account</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="account1">ABC Recruiters</SelectItem>
                  <SelectItem value="account2">XYZ Agency</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="sourcingPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sourcing Person</FormLabel>
              <FormControl>
                <Input placeholder="Person of contact" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="referrerAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referrer Account</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select referrer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ref1">John Doe</SelectItem>
                  <SelectItem value="ref2">Jane Smith</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="commission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commission %</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 5.0" type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="campaignName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input placeholder="Marketing/Referral ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <DynamicFieldGroup
        title="Additional Sourcing Fields"
        fields={customSourcingFields}
        onFieldsChange={setCustomSourcingFields}
      />
    </div>
  );
};

export default SourcingDetailsStep;
