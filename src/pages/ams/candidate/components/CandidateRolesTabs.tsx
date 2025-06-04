
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Briefcase, 
  Calendar,
  Clock,
  MapPin,
  Building,
  TrendingUp
} from 'lucide-react';
import { CandidateJourneyTimeline } from './CandidateJourneyTimeline';

interface RoleApplication {
  id: string;
  roleName: string;
  companyName: string;
  location: string;
  appliedDate: string;
  currentStage: string;
  progress: number;
  status: 'active' | 'offer' | 'rejected' | 'withdrawn';
  priority: 'high' | 'medium' | 'low';
  nextAction?: string;
  stages: any[];
}

interface CandidateRolesTabsProps {
  applications: RoleApplication[];
}

export const CandidateRolesTabs: React.FC<CandidateRolesTabsProps> = ({ applications }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.roleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && app.status === 'active') ||
                         (selectedFilter === 'offers' && app.status === 'offer') ||
                         (selectedFilter === 'completed' && ['rejected', 'withdrawn'].includes(app.status));
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'offer':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search roles or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Applications</option>
                <option value="active">Active</option>
                <option value="offers">Offers</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Roles ({filteredApplications.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({filteredApplications.filter(app => app.status === 'active').length})
          </TabsTrigger>
          <TabsTrigger value="offers">
            Offers ({filteredApplications.filter(app => app.status === 'offer').length})
          </TabsTrigger>
          <TabsTrigger value="archive">
            Archive ({filteredApplications.filter(app => ['rejected', 'withdrawn'].includes(app.status)).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((application) => (
              <CandidateJourneyTimeline
                key={application.id}
                roleId={application.id}
                roleName={application.roleName}
                companyName={application.companyName}
                stages={application.stages}
                overallProgress={application.progress}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {filteredApplications
            .filter(app => app.status === 'active')
            .map((application) => (
              <CandidateJourneyTimeline
                key={application.id}
                roleId={application.id}
                roleName={application.roleName}
                companyName={application.companyName}
                stages={application.stages}
                overallProgress={application.progress}
              />
            ))}
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          {filteredApplications
            .filter(app => app.status === 'offer')
            .map((application) => (
              <Card key={application.id} className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{application.roleName}</h3>
                      <p className="text-gray-600">{application.companyName}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Offer Received
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {application.location}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      Applied {application.appliedDate}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">Accept Offer</Button>
                    <Button variant="outline">Negotiate</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="archive" className="space-y-4">
          {filteredApplications
            .filter(app => ['rejected', 'withdrawn'].includes(app.status))
            .map((application) => (
              <Card key={application.id} className="opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">{application.roleName}</h3>
                      <p className="text-gray-500">{application.companyName}</p>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status === 'rejected' ? 'Not Selected' : 'Withdrawn'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {application.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Applied {application.appliedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Reached {application.currentStage}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
