
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CandidateRolesTabsProps {
  dashboardData: any;
}

export const CandidateRolesTabs: React.FC<CandidateRolesTabsProps> = ({ dashboardData }) => {
  const mockRoles = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      status: 'Active',
      stage: 'Technical Interview'
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'DataFlow Systems',
      status: 'Applied',
      stage: 'Initial Review'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applied Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 space-y-3">
            {mockRoles.map((role) => (
              <div key={role.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{role.title}</h3>
                    <p className="text-sm text-gray-600">{role.company}</p>
                    <p className="text-xs text-gray-500">Current: {role.stage}</p>
                  </div>
                  <Badge variant={role.status === 'Active' ? 'default' : 'secondary'}>
                    {role.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
