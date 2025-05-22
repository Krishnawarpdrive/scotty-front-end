
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';
import RoleNameField from '../form/RoleNameField';
import ExternalNameField from '../form/ExternalNameField';
import RoleCategoryField from '../form/RoleCategoryField';

interface BasicInfoStepProps {
  form: UseFormReturn<FormValues>;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RoleNameField form={form} />
        <ExternalNameField form={form} />
      </div>
      <RoleCategoryField form={form} />
    </div>
  );
};

export default BasicInfoStep;
