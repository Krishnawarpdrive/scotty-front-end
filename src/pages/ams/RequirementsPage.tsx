
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RequirementsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Requirements</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">Add Requirement</button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requirements Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage job requirements and specifications for different roles across clients.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">Requirements list will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementsPage;
