
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues } from '../types/roleTypes';
import RoleBasicInfo from './RoleBasicInfo';
import RoleDetails from './RoleDetails';
import RoleSkills from './RoleSkills';
import RoleRequirements from './RoleRequirements';
import RoleFormActions from './RoleFormActions';

interface RoleCreationFormProps {
  form: UseFormReturn<RoleFormValues>;
  onSubmit: (data: RoleFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

const RoleCreationForm: React.FC<RoleCreationFormProps> = ({ 
  form, 
  onSubmit, 
  isSubmitting,
  onCancel 
}) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <RoleBasicInfo form={form} />
      <RoleDetails form={form} />
      <RoleSkills form={form} />
      <RoleRequirements form={form} />
      
      <RoleFormActions 
        isSubmitting={isSubmitting}
        onCancel={onCancel}
      />
    </form>
  );
};

export default RoleCreationForm;
