import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Eye, 
  MoreHorizontal, 
  Calendar, 
  MapPin,
  Briefcase,
  Star
} from 'lucide-react';

interface CandidateRolesTabsProps {
  applications: any[];
  onViewApplication: (applicationId: string) => void;
}

export const CandidateRolesTabs: React.FC<CandidateRolesTabsProps> = ({ 
  applications, 
  onViewApplication 
}) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredApplications = activeTab === 'all' ? applications : applications.filter(app => app.status === activeTab);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All Applications</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="offer">Offer</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>
      
      <div className="mt-4">
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No applications found for the selected status.</p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map(application => (
            <Card key={application.id} className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{application.roleName} at {application.companyName}</span>
                  <Button variant="outline" size="sm" onClick={() => onViewApplication(application.id)}>
                    View Application
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Current Stage: {application.currentStage}</p>
                    <Progress value={application.progress} className="h-2 mt-1" />
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{application.status}</Badge>
                      {application.priority && (
                        <Badge variant="outline">{application.priority}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Tabs>
  );
};
