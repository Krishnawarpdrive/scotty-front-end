
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SkillsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Skill Master</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">Add Skill</button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Create and manage skills database for candidate evaluation and role requirements.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">Skills matrix will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsPage;
