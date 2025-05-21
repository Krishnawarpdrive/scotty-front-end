
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClientsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">Add Client</button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page will allow you to manage all your clients, add new clients, and view client details.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">Client list will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;
