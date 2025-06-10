
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RequirementFormValues, Requirement } from '../../types/RequirementTypes';

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
  onRequirementCreated: (requirement: Requirement) => void;
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
  const { toast } = useToast();

  const form = useForm<RequirementFormValues>({
    resolver: zodResolver(requirementSchema),
    defaultValues: {
      name: `${role?.name} - Requirement`,
      description: '',
      vacancies: 1,
      priority: 'Medium',
      assigned_to: '',
      hiring_manager: '',
      budget_variance: '',
      experience_variance: '',
      custom_jd: role?.job_description || '',
    }
  });

  const onSubmit = async (data: RequirementFormValues) => {
    try {
      setIsSubmitting(true);

      const requirementData = {
        role_id: role.id,
        client_id: clientId,
        name: data.name,
        description: data.description,
        vacancies: data.vacancies,
        priority: data.priority as 'High' | 'Medium' | 'Low', // Explicitly type the priority
        due_date: data.due_date ? format(data.due_date, 'yyyy-MM-dd') : null,
        assigned_to: data.assigned_to,
        hiring_manager: data.hiring_manager,
        budget_variance: data.budget_variance,
        experience_variance: data.experience_variance,
        custom_jd: data.custom_jd,
        status: 'Open' as const,
      };

      const { data: insertedRequirement, error } = await supabase
        .from('requirements')
        .insert(requirementData)
        .select()
        .single();

      if (error) throw error;

      // Type the inserted requirement properly
      const typedRequirement: Requirement = {
        ...insertedRequirement,
        priority: insertedRequirement.priority as 'High' | 'Medium' | 'Low',
        status: insertedRequirement.status as 'Open' | 'In Progress' | 'Closed' | 'On Hold'
      };

      onRequirementCreated(typedRequirement);
      
      toast({
        title: "Success!",
        description: `Requirement "${data.name}" has been created successfully.`,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating requirement:', error);
      toast({
        title: "Error",
        description: "Failed to create requirement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`Create Requirement for ${role?.name || 'Role'}`}
      description={`Add a new requirement under ${role?.name} for ${clientName}`}
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Role Information */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Role: {role?.name}</h4>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{role?.employment_type}</Badge>
            <Badge variant="outline">{role?.work_mode}</Badge>
            <Badge variant="outline">{role?.min_experience}-{role?.max_experience} years</Badge>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Requirement Name *</Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="Enter requirement name"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register('description')}
                placeholder="Enter requirement description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vacancies">Vacancies *</Label>
                <Input
                  id="vacancies"
                  type="number"
                  min="1"
                  {...form.register('vacancies', { valueAsNumber: true })}
                />
                {form.formState.errors.vacancies && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.vacancies.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={form.watch('priority')}
                  onValueChange={(value: 'High' | 'Medium' | 'Low') => 
                    form.setValue('priority', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Input
                  id="assigned_to"
                  {...form.register('assigned_to')}
                  placeholder="TA name"
                />
              </div>

              <div>
                <Label htmlFor="hiring_manager">Hiring Manager</Label>
                <Input
                  id="hiring_manager"
                  {...form.register('hiring_manager')}
                  placeholder="Hiring manager name"
                />
              </div>
            </div>

            <div>
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch('due_date') && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch('due_date') ? (
                      format(form.watch('due_date')!, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch('due_date')}
                    onSelect={(date) => form.setValue('due_date', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget_variance">Budget Variance</Label>
                <Input
                  id="budget_variance"
                  {...form.register('budget_variance')}
                  placeholder="e.g., +20%, -10%"
                />
              </div>

              <div>
                <Label htmlFor="experience_variance">Experience Variance</Label>
                <Input
                  id="experience_variance"
                  {...form.register('experience_variance')}
                  placeholder="e.g., +2 years, -1 year"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="custom_jd">Custom Job Description</Label>
              <Textarea
                id="custom_jd"
                {...form.register('custom_jd')}
                placeholder="Custom JD or modifications from role template"
                rows={4}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Requirement'}
            </Button>
          </div>
        </form>
      </div>
    </SideDrawer>
  );
};

export default RequirementCreationDrawer;
