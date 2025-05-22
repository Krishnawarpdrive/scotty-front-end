
import React, { useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { useRoleForm } from './hooks/useRoleForm';
import { RoleFormValues } from './types/roleTypes';
import RoleCreationForm from './drawer/RoleCreationForm';
import { SideDrawer } from '@/components/ui/side-drawer';

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
    <SideDrawer 
      open={open} 
      onOpenChange={onOpenChange}
      title="Create New Role"
      description={clientName ? `Create a new role for ${clientName}.` : 'Enter the role details to create a new job opening.'}
      size="lg"
    >
      <Form {...form}>
        <RoleCreationForm
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
        />
      </Form>
    </SideDrawer>
  );
};

export default RoleCreationDrawer;
