
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ClientDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-600">Monitor your recruitment progress and candidates</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-gray-600">Currently recruiting</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Candidates in Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">47</div>
              <p className="text-sm text-gray-600">Under review</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Completed Hires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardPage;
