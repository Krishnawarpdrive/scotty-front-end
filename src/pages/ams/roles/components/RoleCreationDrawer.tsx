
import React, { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
import { Form } from '@/components/ui/form';
import { useRoleForm } from './hooks/useRoleForm';
import { RoleFormValues } from './types/roleTypes';
import RoleBasicInfo from './drawer/RoleBasicInfo';
import RoleDetails from './drawer/RoleDetails';
import RoleSkills from './drawer/RoleSkills';
import RoleRequirements from './drawer/RoleRequirements';
import RoleFormActions from './drawer/RoleFormActions';

interface RoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleCreated?: (values: RoleFormValues) => void;
  clientId?: string;
  clientName?: string;
}

const RoleCreationDrawer: React.FC<RoleCreationDrawerProps> = ({
  open,
  onOpenChange,
  onRoleCreated,
  clientId,
  clientName
}) => {
  const { form, isSubmitting, onSubmit } = useRoleForm(clientId, onRoleCreated);

  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-md">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Create New Role</SheetTitle>
          <SheetDescription>
            {clientName ? `Create a new role for ${clientName}.` : 'Enter the role details to create a new job opening.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <RoleBasicInfo form={form} />
            <RoleDetails form={form} />
            <RoleRequirements form={form} />
            <RoleSkills form={form} />
            
            <RoleFormActions 
              isSubmitting={isSubmitting}
              onCancel={() => onOpenChange(false)}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default RoleCreationDrawer;
