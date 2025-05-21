
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface CustomField {
  id: string;
  label: string;
  value: string;
}

interface DynamicFieldGroupProps {
  title: string;
  fields: CustomField[];
  onFieldsChange: (fields: CustomField[]) => void;
}

const DynamicFieldGroup: React.FC<DynamicFieldGroupProps> = ({
  title,
  fields,
  onFieldsChange
}) => {
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [showNewFieldInput, setShowNewFieldInput] = useState(false);

  const addField = () => {
    if (newFieldLabel.trim()) {
      const newField = {
        id: `custom-${Date.now()}`,
        label: newFieldLabel,
        value: ''
      };
      onFieldsChange([...fields, newField]);
      setNewFieldLabel('');
      setShowNewFieldInput(false);
    }
  };

  const removeField = (id: string) => {
    onFieldsChange(fields.filter(field => field.id !== id));
  };

  const updateFieldValue = (id: string, value: string) => {
    onFieldsChange(
      fields.map(field => 
        field.id === id ? { ...field, value } : field
      )
    );
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium">{title}</h3>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => setShowNewFieldInput(true)}
          className="h-8 px-2"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Field
        </Button>
      </div>

      {showNewFieldInput && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Label htmlFor="new-field-label">Field Label</Label>
            <Input
              id="new-field-label"
              value={newFieldLabel}
              onChange={(e) => setNewFieldLabel(e.target.value)}
              placeholder="Enter field label"
              className="mt-1"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              type="button" 
              onClick={addField}
              size="sm"
              className="h-9"
            >
              Add
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowNewFieldInput(false)}
              size="sm"
              className="h-9"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {fields.map(field => (
        <div key={field.id} className="flex gap-2 items-end">
          <div className="flex-1">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              value={field.value}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              className="mt-1"
            />
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => removeField(field.id)}
            size="sm"
            className="h-9 px-2 text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DynamicFieldGroup;
