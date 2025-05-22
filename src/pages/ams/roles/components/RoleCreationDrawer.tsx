
import React, { useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { useRoleForm } from './hooks/useRoleForm';
import { RoleFormValues } from './types/roleTypes';
import RoleBasicInfo from './drawer/RoleBasicInfo';
import RoleDetails from './drawer/RoleDetails';
import RoleSkills from './drawer/RoleSkills';
import RoleRequirements from './drawer/RoleRequirements';
import RoleFormActions from './drawer/RoleFormActions';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';

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
  
  const footerContent = (
    <RoleFormActions 
      isSubmitting={isSubmitting}
      onCancel={() => onOpenChange(false)}
    />
  );

  return (
    <SideDrawer 
      open={open} 
      onOpenChange={onOpenChange}
      title="Create New Role"
      description={clientName ? `Create a new role for ${clientName}.` : 'Enter the role details to create a new job opening.'}
      footer={footerContent}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <RoleBasicInfo form={form} />
          <RoleDetails form={form} />
          <RoleRequirements form={form} />
          <RoleSkills form={form} />
        </form>
      </Form>
    </SideDrawer>
  );
};

export default RoleCreationDrawer;
