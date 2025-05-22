
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface TemplateOption {
  id: string;
  name: string;
  category?: string;
  description?: string;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  templateOptions: TemplateOption[];
  label?: string;
  placeholder?: string;
  className?: string;
}

/**
 * A reusable component for selecting templates from a dropdown
 */
export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
  templateOptions,
  label = "Select Template",
  placeholder = "Select a template",
  className = ""
}) => {
  return (
    <div className={`${className}`}>
      <label className="text-sm font-medium mb-2 block">
        {label}
      </label>
      <Select value={selectedTemplate} onValueChange={onTemplateChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {templateOptions.map(template => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}{template.category ? ` - ${template.category}` : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TemplateSelector;
