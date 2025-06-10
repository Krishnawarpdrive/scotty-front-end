
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CommissionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Commission Tracker</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">Add Commission</button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Track placement commissions, payouts, and performance incentives for recruiters.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">Commission reports will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionsPage;
