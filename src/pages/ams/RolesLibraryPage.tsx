
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoleCreationDrawer from './roles/components/RoleCreationDrawer';

const RolesLibraryPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Roles Library</h1>
        <Button 
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={handleOpenDrawer}
        >
          Create Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page will contain all job roles and positions that can be assigned to candidates.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">Roles catalog will be displayed here</p>
          </div>
        </CardContent>
      </Card>

      <RoleCreationDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
};

export default RolesLibraryPage;
