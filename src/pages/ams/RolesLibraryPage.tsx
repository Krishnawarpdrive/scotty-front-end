
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import RoleCreationDrawer from './roles/components/RoleCreationDrawer';

const RolesLibraryPage = () => {
  const [createRoleOpen, setCreateRoleOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Roles Library" 
        subtitle="Manage role templates and job descriptions"
        actions={[
          {
            label: "Create Role",
            onClick: () => setCreateRoleOpen(true),
            variant: "default"
          }
        ]}
      />
      
      <div className="bg-white rounded-lg border p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Roles Library</h3>
        <p className="text-gray-500">
          This page will contain role template management functionality.
        </p>
      </div>

      <RoleCreationDrawer
        open={createRoleOpen}
        onOpenChange={setCreateRoleOpen}
      />
    </div>
  );
};

export default RolesLibraryPage;
