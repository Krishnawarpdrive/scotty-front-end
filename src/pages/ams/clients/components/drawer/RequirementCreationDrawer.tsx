
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface RequirementCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any;
  onSubmit: (requirement: any) => void;
}

export const RequirementCreationDrawer: React.FC<RequirementCreationDrawerProps> = ({
  open,
  onOpenChange,
  client,
  onSubmit
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 'Medium' as const,
    status: 'Open' as const,
    vacancies: 1,
    assigned_to: '',
    hiring_manager: '',
    budget_variance: '',
    experience_variance: '',
    custom_jd: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requirement = {
      ...formData,
      description: formData.description || undefined,
      budget_variance: formData.budget_variance || undefined,
      experience_variance: formData.experience_variance || undefined,
      custom_jd: formData.custom_jd || undefined,
      assigned_to: formData.assigned_to || undefined,
      hiring_manager: formData.hiring_manager || undefined,
      client_id: client.id,
      role_id: 'temp-role-id',
      due_date: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      embedding: null,
      id: Date.now().toString()
    };

    onSubmit(requirement);
    toast({
      title: 'Requirement Created',
      description: 'The requirement has been successfully created.'
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Create New Requirement</SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="name">Requirement Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value: 'High' | 'Medium' | 'Low') => 
                  setFormData(prev => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vacancies">Vacancies</Label>
              <Input
                id="vacancies"
                type="number"
                min="1"
                value={formData.vacancies}
                onChange={(e) => setFormData(prev => ({ ...prev, vacancies: parseInt(e.target.value) || 1 }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="assigned_to">Assigned To</Label>
            <Input
              id="assigned_to"
              value={formData.assigned_to}
              onChange={(e) => setFormData(prev => ({ ...prev, assigned_to: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="hiring_manager">Hiring Manager</Label>
            <Input
              id="hiring_manager"
              value={formData.hiring_manager}
              onChange={(e) => setFormData(prev => ({ ...prev, hiring_manager: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Requirement
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
