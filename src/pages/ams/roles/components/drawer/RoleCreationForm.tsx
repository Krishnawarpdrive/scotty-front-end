
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues } from '../types/roleTypes';
import RoleBasicInfo from './RoleBasicInfo';
import RoleDetails from './RoleDetails';
import RoleSkills from './RoleSkills';
import RoleRequirements from './RoleRequirements';

interface RoleCreationFormProps {
  form: UseFormReturn<RoleFormValues>;
}

const RoleCreationForm: React.FC<RoleCreationFormProps> = ({ form }) => {
  return (
    <form onSubmit={form.handleSubmit} className="space-y-6">
      <RoleBasicInfo form={form} />
      <RoleDetails form={form} />
      <RoleSkills form={form} />
      <RoleRequirements form={form} />
      
      <div className="flex justify-end gap-3">
        <button 
          type="button" 
          className="px-4 py-2 border rounded-md"
          onClick={() => form.reset()}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default RoleCreationForm;
