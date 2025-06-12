
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Building, 
  Briefcase, 
  TrendingUp,
  Download,
  Eye,
  Calendar,
  MapPin
} from 'lucide-react';

interface CandidateDataTablesProps {
  candidateId: string;
}

export const CandidateDataTables: React.FC<CandidateDataTablesProps> = ({ candidateId }) => {
  const [activeTab, setActiveTab] = useState('documents');

  // Mock data - in real implementation, this would come from API
  const documents = [
    {
      id: '1',
      name: 'Resume_2024.pdf',
      type: 'Resume',
      uploadDate: '2024-01-15',
      status: 'Verified',
      size: '2.3 MB'
    },
    {
      id: '2',
      name: 'Cover_Letter_TechCorp.pdf',
      type: 'Cover Letter',
      uploadDate: '2024-01-14',
      status: 'Pending',
      size: '1.1 MB'
    },
    {
      id: '3',
      name: 'Educational_Certificate.pdf',
      type: 'Certificate',
      uploadDate: '2024-01-10',
      status: 'Verified',
      size: '3.7 MB'
    }
  ];

  const companies = [
    {
      id: '1',
      name: 'TechCorp Inc',
      industry: 'Technology',
      location: 'San Francisco, CA',
      applicationCount: 2,
      status: 'Active'
    },
    {
      id: '2',
      name: 'DataFlow Systems',
      industry: 'Data Analytics',
      location: 'Austin, TX',
      applicationCount: 1,
      status: 'Applied'
    },
    {
      id: '3',
      name: 'StartupXYZ',
      industry: 'FinTech',
      location: 'New York, NY',
      applicationCount: 1,
      status: 'Interview'
    }
  ];

  const roles = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      appliedDate: '2024-01-15',
      status: 'Interview Scheduled',
      stage: 'Technical Interview'
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'DataFlow Systems',
      appliedDate: '2024-01-14',
      status: 'Under Review',
      stage: 'Phone Screening'
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'StartupXYZ',
      appliedDate: '2024-01-12',
      status: 'Assessment',
      stage: 'Technical Assessment'
    }
  ];

  const stages = [
    {
      id: '1',
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      currentStage: 'Technical Interview',
      nextStage: 'Client Interview',
      progress: 60,
      dueDate: '2024-01-18'
    },
    {
      id: '2',
      role: 'Full Stack Engineer',
      company: 'DataFlow Systems',
      currentStage: 'Phone Screening',
      nextStage: 'Technical Assessment',
      progress: 30,
      dueDate: '2024-01-20'
    },
    {
      id: '3',
      role: 'React Developer',
      company: 'StartupXYZ',
      currentStage: 'Technical Assessment',
      nextStage: 'Final Interview',
      progress: 80,
      dueDate: '2024-01-19'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Verified': 'bg-green-100 text-green-700 border-green-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Active': 'bg-blue-100 text-blue-700 border-blue-200',
      'Applied': 'bg-purple-100 text-purple-700 border-purple-200',
      'Interview': 'bg-orange-100 text-orange-700 border-orange-200',
      'Interview Scheduled': 'bg-blue-100 text-blue-700 border-blue-200',
      'Under Review': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Assessment': 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="mt-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Companies
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Roles Applied
          </TabsTrigger>
          <TabsTrigger value="stages" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Stage Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium">Document Name</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Upload Date</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Size</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{doc.name}</td>
                        <td className="py-3 px-4">{doc.type}</td>
                        <td className="py-3 px-4">{doc.uploadDate}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusBadge(doc.status)}>
                            {doc.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{doc.size}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Companies Applied To</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium">Company Name</th>
                      <th className="text-left py-3 px-4 font-medium">Industry</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-left py-3 px-4 font-medium">Applications</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company) => (
                      <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{company.name}</td>
                        <td className="py-3 px-4">{company.industry}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                            {company.location}
                          </div>
                        </td>
                        <td className="py-3 px-4">{company.applicationCount}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusBadge(company.status)}>
                            {company.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles Applied To</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium">Role Title</th>
                      <th className="text-left py-3 px-4 font-medium">Company</th>
                      <th className="text-left py-3 px-4 font-medium">Applied Date</th>
                      <th className="text-left py-3 px-4 font-medium">Current Stage</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{role.title}</td>
                        <td className="py-3 px-4">{role.company}</td>
                        <td className="py-3 px-4">{role.appliedDate}</td>
                        <td className="py-3 px-4">{role.stage}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusBadge(role.status)}>
                            {role.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stages" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Stage Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium">Role</th>
                      <th className="text-left py-3 px-4 font-medium">Company</th>
                      <th className="text-left py-3 px-4 font-medium">Current Stage</th>
                      <th className="text-left py-3 px-4 font-medium">Next Stage</th>
                      <th className="text-left py-3 px-4 font-medium">Progress</th>
                      <th className="text-left py-3 px-4 font-medium">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stages.map((stage) => (
                      <tr key={stage.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{stage.role}</td>
                        <td className="py-3 px-4">{stage.company}</td>
                        <td className="py-3 px-4">{stage.currentStage}</td>
                        <td className="py-3 px-4 text-gray-600">{stage.nextStage}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${stage.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{stage.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {stage.dueDate}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
