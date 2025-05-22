
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChecklistsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Checklist Master</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">Create Checklist</button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Checklists Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage standard checklists for onboarding, interviews, and other recruitment processes.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">Checklist templates will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChecklistsPage;
