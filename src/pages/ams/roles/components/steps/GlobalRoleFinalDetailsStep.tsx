
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, FileText } from 'lucide-react';
import { GlobalRoleCreationFormValues } from '../schemas/globalRoleCreationSchema';

interface GlobalRoleFinalDetailsStepProps {
  form: UseFormReturn<GlobalRoleCreationFormValues>;
}

const GlobalRoleFinalDetailsStep: React.FC<GlobalRoleFinalDetailsStepProps> = ({ form }) => {
  const [customFieldLabel, setCustomFieldLabel] = useState('');
  const [customFieldValue, setCustomFieldValue] = useState('');
  
  const customFields = form.watch('customFields') || [];

  const addCustomField = () => {
    if (customFieldLabel && customFieldValue) {
      const newField = {
        id: Date.now().toString(),
        label: customFieldLabel,
        value: customFieldValue
      };
      
      form.setValue('customFields', [...customFields, newField]);
      setCustomFieldLabel('');
      setCustomFieldValue('');
    }
  };

  const removeCustomField = (id: string) => {
    form.setValue('customFields', customFields.filter(field => field.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Final Details</h3>
          <p className="text-sm text-muted-foreground">
            Complete the role configuration with description, notes, and any custom fields.
          </p>
        </div>

        <FormField
          control={form.control}
          name="roleDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Description *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide a comprehensive description of the role, responsibilities, and expectations..."
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional notes or comments about this role..."
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Custom Fields Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-md flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Custom Fields
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Field label (e.g. 'Budget Range')"
                value={customFieldLabel}
                onChange={(e) => setCustomFieldLabel(e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Field value"
                  value={customFieldValue}
                  onChange={(e) => setCustomFieldValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomField();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCustomField}
                  disabled={!customFieldLabel || !customFieldValue}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Display Custom Fields */}
            {customFields.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Added Custom Fields ({customFields.length})</label>
                <div className="space-y-2">
                  {customFields.map((field) => (
                    <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{field.label}</span>
                        <span className="text-sm text-muted-foreground">{field.value}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomField(field.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="saveAsTemplate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Save as Global Template
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  This role will be available as a template for future role creation across all clients.
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Role Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Role Name:</span>
                <p className="text-muted-foreground">{form.watch('roleName') || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-medium">Department:</span>
                <p className="text-muted-foreground">{form.watch('department') || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-medium">Employment Type:</span>
                <p className="text-muted-foreground">{form.watch('employmentType') || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-medium">Work Mode:</span>
                <p className="text-muted-foreground">{form.watch('workMode') || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="font-medium text-sm">Selected Skills:</span>
              <div className="flex flex-wrap gap-1">
                {form.watch('skills')?.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs bg-gray-100 text-gray-700">
                    {skill}
                  </Badge>
                )) || <span className="text-xs text-muted-foreground">No skills selected</span>}
              </div>
            </div>

            {form.watch('certifications')?.length > 0 && (
              <div className="space-y-2">
                <span className="font-medium text-sm">Selected Certifications:</span>
                <div className="flex flex-wrap gap-1">
                  {form.watch('certifications')?.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs bg-gray-100 text-gray-700">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalRoleFinalDetailsStep;
