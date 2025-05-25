
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, CheckSquare, Users, Building, Target } from 'lucide-react';
import { GlobalRoleCreationFormValues } from '../schemas/globalRoleCreationSchema';
import { useRoleLibraries } from '../../../clients/components/drawer/hooks/useRoleLibraries';

interface GlobalRoleChecklistsStepProps {
  form: UseFormReturn<GlobalRoleCreationFormValues>;
}

const GlobalRoleChecklistsStep: React.FC<GlobalRoleChecklistsStepProps> = ({ form }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [customItem, setCustomItem] = useState('');
  
  const { checklistsLibrary, loading } = useRoleLibraries();
  const roleName = form.watch('roleName');
  const generalItems = form.watch('generalChecklists') || [];
  const roleItems = form.watch('roleChecklists') || [];
  const clientItems = form.watch('clientChecklists') || [];

  // Filter checklists by type and role relevance
  const getChecklistsByType = (type: 'general' | 'role_based' | 'client_specific') => {
    return checklistsLibrary.filter(item => {
      if (item.type !== type) return false;
      if (type === 'role_based' && item.role_relevance) {
        return item.role_relevance.includes(roleName);
      }
      return true;
    });
  };

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

  const renderChecklistItems = (items: typeof checklistsLibrary, selectedItems: string[], type: 'general' | 'role' | 'client') => (
    <div className="space-y-3">
      {loading ? (
        <div className="text-center p-6">Loading checklists...</div>
      ) : items.length === 0 ? (
        <div className="text-center p-6 border-2 border-dashed border-muted rounded-lg">
          <CheckSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No {type} checklists available in library.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Add checklists to the library or use custom items below.
          </p>
        </div>
      ) : (
        <div className="grid gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedItems.includes(item.title)
                  ? 'border-primary bg-gray-100'
                  : 'border-muted hover:border-primary/50'
              }`}
              onClick={() => {
                if (selectedItems.includes(item.title)) {
                  removeChecklistItem(item.title, type);
                } else {
                  addChecklistItem(item.title, type);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <CheckSquare className={`h-4 w-4 ${selectedItems.includes(item.title) ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.title}</span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  )}
                </div>
              </div>
              {selectedItems.includes(item.title) && (
                <Badge className="text-xs bg-gray-200 text-gray-700">
                  Selected
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const getTotalSelected = () => generalItems.length + roleItems.length + clientItems.length;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Evaluation Checklists</h3>
          <p className="text-sm text-muted-foreground">
            Configure evaluation criteria for this role. Select from predefined checklists or add custom items.
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
                {renderChecklistItems(getChecklistsByType('general'), generalItems, 'general')}
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
                {renderChecklistItems(getChecklistsByType('role_based'), roleItems, 'role')}
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
                {renderChecklistItems(getChecklistsByType('client_specific'), clientItems, 'client')}
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
      </div>
    </div>
  );
};

export default GlobalRoleChecklistsStep;
