
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { PersonaType, personaConfigs } from '@/types/persona';
import { Shield, Save } from 'lucide-react';

interface PersonaPermissionsDrawerProps {
  open: boolean;
  onClose: () => void;
  persona: PersonaType | null;
  onSavePermissions: (persona: PersonaType, permissions: string[]) => void;
}

const availablePermissions = [
  { id: 'read:all', label: 'Read All Data', description: 'View all system data' },
  { id: 'write:all', label: 'Write All Data', description: 'Modify all system data' },
  { id: 'delete:all', label: 'Delete All Data', description: 'Remove all system data' },
  { id: 'admin:users', label: 'User Administration', description: 'Manage user accounts and roles' },
  { id: 'read:hr', label: 'HR Read Access', description: 'View HR-related data' },
  { id: 'write:hr', label: 'HR Write Access', description: 'Modify HR-related data' },
  { id: 'read:ta', label: 'TA Read Access', description: 'View talent acquisition data' },
  { id: 'write:ta', label: 'TA Write Access', description: 'Modify talent acquisition data' },
  { id: 'read:own', label: 'Read Own Data', description: 'View own profile and data' },
  { id: 'write:own', label: 'Write Own Data', description: 'Modify own profile and data' },
  { id: 'read:vendor', label: 'Vendor Read Access', description: 'View vendor-related data' },
  { id: 'write:vendor', label: 'Vendor Write Access', description: 'Modify vendor-related data' },
  { id: 'read:interview', label: 'Interview Read Access', description: 'View interview data' },
  { id: 'write:feedback', label: 'Feedback Write Access', description: 'Provide interview feedback' },
  { id: 'read:client', label: 'Client Read Access', description: 'View client data' },
  { id: 'approve:client', label: 'Client Approval', description: 'Approve client-related actions' },
];

export const PersonaPermissionsDrawer: React.FC<PersonaPermissionsDrawerProps> = ({
  open,
  onClose,
  persona,
  onSavePermissions
}) => {
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (persona) {
      setSelectedPermissions(personaConfigs[persona].permissions);
    }
  }, [persona]);

  if (!persona) return null;

  const config = personaConfigs[persona];

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permissionId]);
    } else {
      setSelectedPermissions(prev => prev.filter(p => p !== permissionId));
    }
  };

  const handleSave = () => {
    onSavePermissions(persona, selectedPermissions);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <Badge className={config.color}>
              {config.name}
            </Badge>
            Permissions
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="text-sm text-muted-foreground">
            Configure the permissions for the {config.name} persona. These permissions will apply to all users assigned to this persona.
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {availablePermissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-start space-x-3 p-3 border rounded-lg"
              >
                <Checkbox
                  id={permission.id}
                  checked={selectedPermissions.includes(permission.id)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(permission.id, checked as boolean)
                  }
                />
                <div className="flex-1">
                  <label
                    htmlFor={permission.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {permission.label}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {permission.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Permissions
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
