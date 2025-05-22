
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="mt-4">
      <label className="text-sm font-medium mb-2 block">
        Select from Role Library Templates (Optional)
      </label>
      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
        <SelectTrigger>
          <SelectValue placeholder="Select a role template" />
        </SelectTrigger>
        <SelectContent>
          {roleTemplates.map(template => (
            <SelectItem key={template.id} value={template.id}>
              {template.name} - {template.category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleTemplateSelector;
