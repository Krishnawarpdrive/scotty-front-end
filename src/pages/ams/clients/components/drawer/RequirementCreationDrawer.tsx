
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Save, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RequirementFormValues } from '../../types/RequirementTypes';

const requirementSchema = z.object({
  name: z.string().min(1, 'Requirement name is required'),
  description: z.string().optional(),
  vacancies: z.number().min(1, 'At least 1 vacancy is required'),
  priority: z.enum(['High', 'Medium', 'Low']),
  due_date: z.date().optional(),
  assigned_to: z.string().optional(),
  hiring_manager: z.string().optional(),
  budget_variance: z.string().optional(),
  experience_variance: z.string().optional(),
  custom_jd: z.string().optional(),
});

interface RequirementCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: any;
  clientId: string;
  clientName: string;
  onRequirementCreated?: (requirement: any) => void;
}

const RequirementCreationDrawer: React.FC<RequirementCreationDrawerProps> = ({
  open,
  onOpenChange,
  role,
  clientId,
  clientName,
  onRequirementCreated
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vacancyWarning, setVacancyWarning] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RequirementFormValues>({
    resolver: zodResolver(requirementSchema),
    defaultValues: {
      name: `${role?.name} Developer`,
      description: role?.job_description || '',
      vacancies: 1,
      priority: 'Medium',
      hired_manager: role?.hiring_manager || '',
      custom_jd: role?.job_description || ''
    }
  });

  const watchedVacancies = form.watch('vacancies');

  // Check vacancy constraints
  React.useEffect(() => {
    const checkVacancyLimit = async () => {
      if (!watchedVacancies || !role?.id) return;

      try {
        // Get current requirements for this role
        const { data: existingRequirements } = await supabase
          .from('requirements')
          .select('vacancies')
          .eq('role_id', role.id);

        const currentTotal = existingRequirements?.reduce((sum, req) => sum + req.vacancies, 0) || 0;
        const roleMaxVacancies = role.vacancies || 10; // Default max
        const newTotal = currentTotal + watchedVacancies;

        if (newTotal > roleMaxVacancies) {
          setVacancyWarning(
            `Vacancy limit exceeded. Total vacancies (${newTotal}) cannot exceed role maximum (${roleMaxVacancies})`
          );
        } else {
          setVacancyWarning(null);
        }
      } catch (error) {
        console.error('Error checking vacancy limit:', error);
      }
    };

    checkVacancyLimit();
  }, [watchedVacancies, role?.id]);

  const onSubmit = async (data: RequirementFormValues) => {
    if (vacancyWarning) {
      toast({
        title: 'Error',
        description: vacancyWarning,
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const requirementData = {
        role_id: role.id,
        client_id: clientId,
        name: data.name,
        description: data.description,
        vacancies: data.vacancies,
        priority: data.priority,
        due_date: data.due_date ? format(data.due_date, 'yyyy-MM-dd') : null,
        assigned_to: data.assigned_to,
        hiring_manager: data.hiring_manager,
        budget_variance: data.budget_variance,
        experience_variance: data.experience_variance,
        custom_jd: data.custom_jd,
        status: 'Open'
      };

      const { data: requirement, error } = await supabase
        .from('requirements')
        .insert(requirementData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success!',
        description: `Requirement "${data.name}" has been created successfully.`,
      });

      if (onRequirementCreated) {
        onRequirementCreated(requirement);
      }

      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      console.error('Error creating requirement:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create requirement. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Requirement"
      description={`Add a new requirement for ${role?.name} role at ${clientName}`}
      size="xl"
    >
      <div className="p-6 space-y-6">
        {/* Role Information Summary */}
        <div className="bg-muted/20 p-4 rounded-lg border">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            Role Information
            <Badge variant="outline">From Role Template</Badge>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Role:</span> {role?.name}</div>
            <div><span className="font-medium">Max Vacancies:</span> {role?.vacancies || 10}</div>
            <div><span className="font-medium">Employment Type:</span> {role?.employment_type}</div>
            <div><span className="font-medium">Work Mode:</span> {role?.work_mode}</div>
            <div><span className="font-medium">Experience:</span> {role?.min_experience}-{role?.max_experience} years</div>
            <div><span className="font-medium">Category:</span> {role?.category}</div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Requirement Details</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirement Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior React Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vacancies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Vacancies *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      {vacancyWarning && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          {vacancyWarning}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="High">
                            <Badge variant="outline" className={getPriorityColor('High')}>High</Badge>
                          </SelectItem>
                          <SelectItem value="Medium">
                            <Badge variant="outline" className={getPriorityColor('Medium')}>Medium</Badge>
                          </SelectItem>
                          <SelectItem value="Low">
                            <Badge variant="outline" className={getPriorityColor('Low')}>Low</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
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
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assigned_to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned TA</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="hiring_manager"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hiring Manager</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Variances */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Requirement Variances</h3>
              <p className="text-sm text-muted-foreground">
                Override specific aspects of the role for this requirement
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget_variance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Variance</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. +20%, -10%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience_variance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Variance</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5-8 years instead of 3-5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Custom JD */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Job Description</h3>
                <Badge variant="outline">
                  {form.watch('custom_jd') !== role?.job_description ? 'Custom' : 'From Role'}
                </Badge>
              </div>

              <FormField
                control={form.control}
                name="custom_jd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter custom job description or modify the existing one..."
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes or requirements specific to this position..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || !!vacancyWarning}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Requirement
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </SideDrawer>
  );
};

export default RequirementCreationDrawer;
