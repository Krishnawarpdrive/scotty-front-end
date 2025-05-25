
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, DollarSign, Users, Target, FileText, Template } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { RoleCreationFormValues } from '../schemas/roleCreationSchema';

interface FinalDetailsStepProps {
  form: UseFormReturn<RoleCreationFormValues>;
  clientName: string;
}

const FinalDetailsStep: React.FC<FinalDetailsStepProps> = ({ form, clientName }) => {
  const watchedData = form.watch();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Final Role Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Complete the role details and review your configuration before creating the role.
          </p>
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="vacancies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Number of Vacancies *
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="e.g., 2"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Target Hiring Deadline
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., $50,000 - $70,000 annually"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Role Description *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the role responsibilities, requirements, and what the candidate will be working on..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional information, special requirements, or notes about this role..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save as Template Option */}
        <FormField
          control={form.control}
          name="saveAsTemplate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center gap-2 text-base">
                  <Template className="h-4 w-4" />
                  Save as Template
                </FormLabel>
                <div className="text-sm text-muted-foreground">
                  Save this role configuration as a template for future use
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Configuration Summary */}
        <div className="mt-8 p-4 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-3">Configuration Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Role:</span> {watchedData.roleName}
            </div>
            <div>
              <span className="font-medium">Client:</span> {clientName}
            </div>
            <div>
              <span className="font-medium">Employment Type:</span> {watchedData.employmentType}
            </div>
            <div>
              <span className="font-medium">Work Mode:</span> {watchedData.workMode}
            </div>
            <div>
              <span className="font-medium">Experience:</span> {watchedData.experienceRange}
            </div>
            <div>
              <span className="font-medium">Vacancies:</span> {watchedData.vacancies}
            </div>
            <div>
              <span className="font-medium">Skills:</span> {watchedData.skills?.length || 0} selected
            </div>
            <div>
              <span className="font-medium">Certifications:</span> {watchedData.certifications?.length || 0} selected
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Checklist Items:</span>{' '}
              {(watchedData.generalChecklists?.length || 0) + 
               (watchedData.roleChecklists?.length || 0) + 
               (watchedData.clientChecklists?.length || 0)} total
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalDetailsStep;
