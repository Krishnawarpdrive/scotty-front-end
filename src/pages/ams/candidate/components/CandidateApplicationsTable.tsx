import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { 
  Eye,
  MoreHorizontal,
  MessageSquare,
  Calendar,
  FileText,
  Building,
  MapPin,
  Briefcase
} from 'lucide-react';

interface CandidateApplication {
  id: string;
  role: string;
  company: string;
  location: string;
  appliedDate: string;
  stage: string;
  status: 'active' | 'paused' | 'rejected' | 'offered' | 'withdrawn';
  nextInterview?: string;
  lastUpdate: string;
  progress: number;
  feedback?: string;
}

const mockApplications: CandidateApplication[] = [
  {
    id: '1',
    role: 'Software Engineer',
    company: 'TechCorp Inc',
    location: 'San Francisco, CA',
    appliedDate: '2024-03-01',
    stage: 'initial_application',
    status: 'active',
    nextInterview: '2024-03-15',
    lastUpdate: '2024-03-08',
    progress: 25,
    feedback: 'Initial screening completed'
  },
  {
    id: '2',
    role: 'Data Scientist',
    company: 'InnovateDB',
    location: 'New York, NY',
    appliedDate: '2024-02-15',
    stage: 'phone_interview',
    status: 'active',
    nextInterview: '2024-03-22',
    lastUpdate: '2024-03-08',
    progress: 50,
    feedback: 'Awaiting feedback from HM'
  },
  {
    id: '3',
    role: 'Product Manager',
    company: 'Digital Solutions Ltd',
    location: 'London, UK',
    appliedDate: '2024-01-28',
    stage: 'technical_assessment',
    status: 'paused',
    lastUpdate: '2024-03-01',
    progress: 75,
    feedback: 'Technical assessment in progress'
  },
  {
    id: '4',
    role: 'UX Designer',
    company: 'Future Systems',
    location: 'Berlin, Germany',
    appliedDate: '2023-12-20',
    stage: 'final_interview',
    status: 'rejected',
    lastUpdate: '2024-02-15',
    progress: 100,
    feedback: 'Candidate was not a good fit'
  },
  {
    id: '5',
    role: 'Frontend Developer',
    company: 'Smart Tech Co',
    location: 'Sydney, Australia',
    appliedDate: '2024-03-05',
    stage: 'offer_extended',
    status: 'offered',
    lastUpdate: '2024-03-10',
    progress: 90,
    feedback: 'Offer extended, awaiting response'
  },
  {
    id: '6',
    role: 'Backend Developer',
    company: 'Global Innovations',
    location: 'Toronto, Canada',
    appliedDate: '2024-02-01',
    stage: 'withdrawn',
    status: 'withdrawn',
    lastUpdate: '2024-02-10',
    progress: 100,
    feedback: 'Candidate withdrew application'
  },
  {
    id: '7',
    role: 'Full Stack Developer',
    company: 'NextGen Corp',
    location: 'Singapore',
    appliedDate: '2024-01-15',
    stage: 'phone_interview',
    status: 'active',
    nextInterview: '2024-03-29',
    lastUpdate: '2024-03-08',
    progress: 50,
    feedback: 'Phone interview scheduled'
  },
  {
    id: '8',
    role: 'Business Analyst',
    company: 'Alpha Technologies',
    location: 'Bangalore, India',
    appliedDate: '2023-11-30',
    stage: 'technical_assessment',
    status: 'active',
    lastUpdate: '2024-02-28',
    progress: 60,
    feedback: 'Technical assessment completed'
  },
];

export const CandidateApplicationsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');

  const filteredApplications = mockApplications.filter(application => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(application.role) || searchRegex.test(application.company);

    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    const matchesStage = stageFilter === 'all' || application.stage === stageFilter;

    return matchesSearch && matchesStatus && matchesStage;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'rejected': return 'destructive';
      case 'offered': return 'success';
      case 'withdrawn': return 'muted';
      default: return 'default';
    }
  };

  const getStageVariant = (stage: string) => {
    switch (stage) {
      case 'initial_application': return 'outline';
      case 'phone_interview': return 'secondary';
      case 'technical_assessment': return 'default';
      case 'final_interview': return 'primary';
      case 'offer_extended': return 'success';
      case 'withdrawn': return 'muted';
      default: return 'default';
    }
  };

  const columns: DataTableColumn<CandidateApplication>[] = [
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Role & Company',
      cell: (application) => (
        <div className="space-y-1">
          <div className="font-medium">{application.role}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Building className="h-3 w-3" />
            {application.company}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {application.location}
          </div>
        </div>
      ),
    },
    {
      id: 'stage',
      accessorKey: 'stage',
      header: 'Stage & Progress',
      cell: (application) => (
        <div className="space-y-2">
          <Badge variant={getStageVariant(application.stage)}>
            {application.stage}
          </Badge>
          <div className="w-24">
            <div className="text-xs text-muted-foreground mb-1">{application.progress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${application.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: (application) => (
        <Badge variant={getStatusVariant(application.status)}>
          {application.status}
        </Badge>
      ),
    },
    {
      id: 'dates',
      accessorKey: 'appliedDate',
      header: 'Important Dates',
      cell: (application) => (
        <div className="space-y-1">
          <div className="text-sm">
            <span className="text-muted-foreground">Applied:</span> {application.appliedDate}
          </div>
          {application.nextInterview && (
            <div className="text-sm">
              <span className="text-muted-foreground">Next:</span> {application.nextInterview}
            </div>
          )}
          <div className="text-sm">
            <span className="text-muted-foreground">Updated:</span> {application.lastUpdate}
          </div>
        </div>
      ),
    },
    {
      id: 'feedback',
      accessorKey: 'feedback',
      header: 'Feedback',
      cell: (application) => (
        <div className="max-w-48">
          {application.feedback ? (
            <div className="text-sm text-muted-foreground truncate">
              {application.feedback}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">No feedback yet</span>
          )}
        </div>
      ),
    },
    {
      id: 'quickActions',
      accessorKey: 'id',
      header: 'Quick Actions',
      cell: (application) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      id: 'menu',
      accessorKey: 'id',
      header: '',
      cell: () => (
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
    {
      id: 'actions',
      accessorKey: 'id',
      header: 'Actions',
      cell: (application) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-2 mr-2"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-md px-3 py-2 mr-2"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="rejected">Rejected</option>
              <option value="offered">Offered</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">All Stages</option>
              <option value="initial_application">Initial Application</option>
              <option value="phone_interview">Phone Interview</option>
              <option value="technical_assessment">Technical Assessment</option>
              <option value="final_interview">Final Interview</option>
              <option value="offer_extended">Offer Extended</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
          <div>
            <Button>Add Application</Button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredApplications} />
      </CardContent>
    </Card>
  );
};
