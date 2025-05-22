
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

interface ExperienceRangeSelectorProps {
  form: UseFormReturn<FormValues>;
}

const ExperienceRangeSelector: React.FC<ExperienceRangeSelectorProps> = ({ form }) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-4 items-center">
        <FormField
          control={form.control}
          name="minExperience"
          render={({ field }) => (
            <FormItem className="w-24">
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <span>to</span>
        
        <FormField
          control={form.control}
          name="maxExperience"
          render={({ field }) => (
            <FormItem className="w-24">
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <span>years</span>
      </div>
    </div>
  );
};

export default ExperienceRangeSelector;
