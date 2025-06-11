
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EnhancedGlobalRoleCreationDrawer from './roles/components/drawer/EnhancedGlobalRoleCreationDrawer';

const RolesLibraryPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleRoleCreated = (role: any) => {
    console.log('Global role created:', role);
    // Refresh any role lists or show success message
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Global Roles Library</h1>
        <Button 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          onClick={handleOpenDrawer}
        >
          Create Global Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page contains all global job roles and positions that can be used as templates for client-specific roles.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">Global roles catalog will be displayed here</p>
          </div>
        </CardContent>
      </Card>

      <EnhancedGlobalRoleCreationDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
        onRoleCreated={handleRoleCreated}
      />
    </div>
  );
};

export default RolesLibraryPage;
