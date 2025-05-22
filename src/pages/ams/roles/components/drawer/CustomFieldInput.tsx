
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { CustomField } from '../types/roleTypes';
import { nanoid } from 'nanoid';

interface CustomFieldInputProps {
  section: 'basic' | 'description' | 'skills' | 'certifications' | 'tags';
  customFields: CustomField[];
  onFieldsChange: (updatedFields: CustomField[]) => void;
}

const CustomFieldInput: React.FC<CustomFieldInputProps> = ({
  section,
  customFields,
  onFieldsChange
}) => {
  const [showAddField, setShowAddField] = useState(false);
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldType, setFieldType] = useState<'text' | 'number' | 'date' | 'dropdown'>('text');
  const [fieldOptions, setFieldOptions] = useState('');

  const sectionFields = customFields.filter(field => field.section === section);

  const handleAddField = () => {
    if (fieldLabel) {
      const options = fieldType === 'dropdown' 
        ? fieldOptions.split(',').map(opt => opt.trim()).filter(opt => opt)
        : undefined;
      
      const newField: CustomField = {
        id: nanoid(),
        label: fieldLabel,
        type: fieldType,
        value: '',
        section,
        options
      };

      onFieldsChange([...customFields, newField]);
      setFieldLabel('');
      setFieldType('text');
      setFieldOptions('');
      setShowAddField(false);
    }
  };

  const handleRemoveField = (id: string) => {
    const updatedFields = customFields.filter(field => field.id !== id);
    onFieldsChange(updatedFields);
  };

  const handleFieldValueChange = (id: string, value: string) => {
    const updatedFields = customFields.map(field => {
      if (field.id === id) {
        return { ...field, value };
      }
      return field;
    });
    onFieldsChange(updatedFields);
  };

  return (
    <div className="space-y-4">
      {sectionFields.map((field) => (
        <div key={field.id} className="relative border rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor={`custom-field-${field.id}`}>{field.label}</Label>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 absolute top-2 right-2"
              onClick={() => handleRemoveField(field.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {field.type === 'dropdown' && field.options ? (
            <Select
              value={field.value}
              onValueChange={(value) => handleFieldValueChange(field.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option, idx) => (
                  <SelectItem key={`${option}-${idx}`} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === 'date' ? (
            <Input
              id={`custom-field-${field.id}`}
              type="date"
              value={field.value}
              onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            />
          ) : field.type === 'number' ? (
            <Input
              id={`custom-field-${field.id}`}
              type="number"
              value={field.value}
              onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            />
          ) : (
            <Input
              id={`custom-field-${field.id}`}
              type="text"
              value={field.value}
              onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
            />
          )}
        </div>
      ))}

      {showAddField ? (
        <div className="border rounded-md p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="field-label">Field Label</Label>
              <Input
                id="field-label"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
                placeholder="Enter field label"
              />
            </div>
            <div>
              <Label htmlFor="field-type">Field Type</Label>
              <Select value={fieldType} onValueChange={(value: any) => setFieldType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="dropdown">Dropdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {fieldType === 'dropdown' && (
            <div>
              <Label htmlFor="field-options">Options (comma separated)</Label>
              <Input
                id="field-options"
                value={fieldOptions}
                onChange={(e) => setFieldOptions(e.target.value)}
                placeholder="Option 1, Option 2, Option 3"
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddField(false)}>Cancel</Button>
            <Button onClick={handleAddField}>Add Field</Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => setShowAddField(true)}
        >
          <Plus className="h-4 w-4" /> Add Custom Field
        </Button>
      )}
    </div>
  );
};

export default CustomFieldInput;
