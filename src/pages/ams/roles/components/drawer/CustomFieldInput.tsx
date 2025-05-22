
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomField } from '../types/roleTypes';
import { nanoid } from 'nanoid';

interface CustomFieldInputProps {
  section: 'basic' | 'description' | 'skills' | 'certifications' | 'tags';
  customFields: CustomField[];
  onFieldsChange: (fields: CustomField[]) => void;
}

const CustomFieldInput: React.FC<CustomFieldInputProps> = ({
  section,
  customFields,
  onFieldsChange
}) => {
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'dropdown' | 'date'>('text');

  // Filter fields that belong to this section
  const sectionFields = customFields.filter(field => field.section === section);

  const addNewField = () => {
    if (newFieldLabel.trim()) {
      const newField: CustomField = {
        id: nanoid(),
        label: newFieldLabel.trim(),
        value: '',
        type: newFieldType,
        section
      };
      
      onFieldsChange([...customFields, newField]);
      setNewFieldLabel('');
      setNewFieldType('text');
      setShowAddField(false);
    }
  };

  const updateFieldValue = (id: string, value: string) => {
    onFieldsChange(
      customFields.map(field => 
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const removeField = (id: string) => {
    onFieldsChange(customFields.filter(field => field.id !== id));
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-muted-foreground">Custom Fields</h4>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAddField(true)}
            className={showAddField ? 'hidden' : ''}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Custom Field
          </Button>
        </div>

        {/* Custom fields list */}
        {sectionFields.length > 0 && (
          <div className="space-y-3 mt-3">
            {sectionFields.map((field) => (
              <div key={field.id} className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id={field.id}
                      value={field.value || ''}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      type={field.type === 'number' ? 'number' : 'text'}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(field.id)}
                      className="h-10 w-10 text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add new field form */}
        {showAddField && (
          <div className="mt-3 p-3 border rounded-md bg-muted/20">
            <div className="space-y-3">
              <div>
                <Label htmlFor="new-field-label">Field Label</Label>
                <Input
                  id="new-field-label"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="Enter field name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="new-field-type">Field Type</Label>
                <Select
                  value={newFieldType}
                  onValueChange={(value: 'text' | 'number' | 'dropdown' | 'date') => setNewFieldType(value)}
                >
                  <SelectTrigger id="new-field-type" className="mt-1">
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="dropdown">Dropdown</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAddField(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  size="sm"
                  onClick={addNewField}
                  disabled={!newFieldLabel.trim()}
                >
                  Add Field
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFieldInput;
