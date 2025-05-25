
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, CheckSquare, Users, Building, Target } from 'lucide-react';
import { RoleCreationFormValues } from '../schemas/roleCreationSchema';

interface ChecklistsStepProps {
  form: UseFormReturn<RoleCreationFormValues>;
}

// Mock checklist data
const generalChecklists = [
  'Resume Review',
  'Phone Screening',
  'Technical Assessment',
  'Cultural Fit Interview',
  'Reference Check',
  'Background Verification',
  'Salary Negotiation',
  'Offer Letter'
];

const roleBasedChecklists: Record<string, string[]> = {
  'Software Engineer': [
    'Coding Challenge',
    'System Design Interview',
    'Code Review Session',
    'Technical Whiteboarding',
    'Architecture Discussion',
    'Performance Optimization Quiz'
  ],
  'Frontend Developer': [
    'UI/UX Portfolio Review',
    'Frontend Coding Test',
    'Browser Compatibility Check',
    'Responsive Design Assessment',
    'Framework Knowledge Test'
  ],
  'Product Manager': [
    'Product Case Study',
    'Roadmap Planning Exercise',
    'Stakeholder Management Scenario',
    'Metrics & Analytics Discussion',
    'User Story Writing Test'
  ],
  'UX Designer': [
    'Portfolio Presentation',
    'Design Challenge',
    'User Research Discussion',
    'Prototyping Exercise',
    'Design System Knowledge'
  ]
};

const clientSpecificChecklists = [
  'Company Culture Assessment',
  'Remote Work Capability',
  'Client Communication Skills',
  'Time Zone Alignment Check',
  'Domain Knowledge Evaluation',
  'Previous Client Feedback Review',
  'Contract Terms Discussion',
  'NDA Signing'
];

const ChecklistsStep: React.FC<ChecklistsStepProps> = ({ form }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [customItem, setCustomItem] = useState('');

  const roleName = form.watch('roleName');
  const generalItems = form.watch('generalChecklists') || [];
  const roleItems = form.watch('roleChecklists') || [];
  const clientItems = form.watch('clientChecklists') || [];

  const roleSpecificItems = roleBasedChecklists[roleName] || [];

  const addChecklistItem = (item: string, type: 'general' | 'role' | 'client') => {
    const fieldMap = {
      general: 'generalChecklists' as const,
      role: 'roleChecklists' as const,
      client: 'clientChecklists' as const
    };
    
    const currentItems = form.watch(fieldMap[type]) || [];
    if (item && !currentItems.includes(item)) {
      form.setValue(fieldMap[type], [...currentItems, item]);
    }
  };

  const removeChecklistItem = (item: string, type: 'general' | 'role' | 'client') => {
    const fieldMap = {
      general: 'generalChecklists' as const,
      role: 'roleChecklists' as const,
      client: 'clientChecklists' as const
    };
    
    const currentItems = form.watch(fieldMap[type]) || [];
    form.setValue(fieldMap[type], currentItems.filter(i => i !== item));
  };

  const addCustomItem = () => {
    if (customItem) {
      addChecklistItem(customItem, activeTab as any);
      setCustomItem('');
    }
  };

  const renderChecklistItems = (items: string[], selectedItems: string[], type: 'general' | 'role' | 'client') => (
    <div className="space-y-3">
      <div className="grid gap-2">
        {items.map((item) => (
          <div
            key={item}
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedItems.includes(item)
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-primary/50'
            }`}
            onClick={() => {
              if (selectedItems.includes(item)) {
                removeChecklistItem(item, type);
              } else {
                addChecklistItem(item, type);
              }
            }}
          >
            <div className="flex items-center gap-2">
              <CheckSquare className={`h-4 w-4 ${selectedItems.includes(item) ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm">{item}</span>
            </div>
            {selectedItems.includes(item) && (
              <Badge variant="default" className="text-xs">
                Selected
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const getTotalSelected = () => generalItems.length + roleItems.length + clientItems.length;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Evaluation Checklists</h3>
          <p className="text-sm text-muted-foreground">
            Configure evaluation criteria for this role. You can select from predefined checklists or add custom items.
          </p>
          {getTotalSelected() > 0 && (
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {getTotalSelected()} items selected
              </Badge>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              General ({generalItems.length})
            </TabsTrigger>
            <TabsTrigger value="role" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Role-Based ({roleItems.length})
            </TabsTrigger>
            <TabsTrigger value="client" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Client-Specific ({clientItems.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  General Hiring Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderChecklistItems(generalChecklists, generalItems, 'general')}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="role" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {roleName} Specific Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                {roleSpecificItems.length > 0 ? (
                  renderChecklistItems(roleSpecificItems, roleItems, 'role')
                ) : (
                  <div className="text-center p-6 border-2 border-dashed border-muted rounded-lg">
                    <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No role-specific checklists available for {roleName}.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add custom items using the input below.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Client-Specific Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderChecklistItems(clientSpecificChecklists, clientItems, 'client')}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Custom Item Input */}
        <div className="flex gap-2">
          <Input
            placeholder={`Add custom ${activeTab} checklist item...`}
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustomItem();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addCustomItem}
            disabled={!customItem}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Items Summary */}
        {getTotalSelected() > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-md">Selected Checklist Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {generalItems.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">General ({generalItems.length})</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generalItems.map((item) => (
                      <Badge key={item} variant="default" className="text-xs flex items-center gap-1">
                        {item}
                        <button
                          type="button"
                          onClick={() => removeChecklistItem(item, 'general')}
                          className="hover:text-destructive"
                        >
                          <X className="h-2 w-2" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {roleItems.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role-Based ({roleItems.length})</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {roleItems.map((item) => (
                      <Badge key={item} variant="secondary" className="text-xs flex items-center gap-1">
                        {item}
                        <button
                          type="button"
                          onClick={() => removeChecklistItem(item, 'role')}
                          className="hover:text-destructive"
                        >
                          <X className="h-2 w-2" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {clientItems.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Client-Specific ({clientItems.length})</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {clientItems.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs flex items-center gap-1">
                        {item}
                        <button
                          type="button"
                          onClick={() => removeChecklistItem(item, 'client')}
                          className="hover:text-destructive"
                        >
                          <X className="h-2 w-2" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChecklistsStep;
