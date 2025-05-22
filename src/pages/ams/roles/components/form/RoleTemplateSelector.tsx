
import React from 'react';
import TemplateSelector from '@/components/shared/TemplateSelector';

interface RoleTemplateSelectorProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  roleTemplates: Array<{ id: string; name: string; category: string }>;
}

const RoleTemplateSelector: React.FC<RoleTemplateSelectorProps> = ({
  selectedTemplate,
  setSelectedTemplate,
  roleTemplates
}) => {
  return (
    <TemplateSelector 
      selectedTemplate={selectedTemplate} 
      onTemplateChange={setSelectedTemplate} 
      templateOptions={roleTemplates}
      label="Select from Role Library Templates (Optional)"
      placeholder="Select a role template"
      className="mt-4"
    />
  );
};

export default RoleTemplateSelector;
