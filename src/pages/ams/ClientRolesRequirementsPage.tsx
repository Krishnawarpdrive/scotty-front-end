
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { SideDrawer } from '@/components/ui/side-drawer';
import { 
  Search, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  Filter,
  Star,
  MessageSquare,
  Phone,
  Video,
  MapPin
} from 'lucide-react';

// Mock data types
interface Candidate {
  id: string;
  name: string;
  status: 'Offered' | 'Interview Scheduled';
  experience: string;
  skills: string[];
  interviewFeedback: {
    date: string;
    rating: number;
    comments: string;
    interviewer: string;
  }[];
  scheduledInterviews: {
    date: string;
    time: string;
    mode: 'phone' | 'video' | 'in-person';
    panelists: string[];
  }[];
  offerDetails?: {
    status: string;
    date: string;
    compensation: string;
  };
  notes: string;
}

interface Requirement {
  id: string;
  requirementId: string;
  roleName: string;
  status: 'Open' | 'Closed' | 'On Hold';
  offeredCandidatesCount: number;
  scheduledInterviewsCount: number;
  candidates: Candidate[];
  hiringProgress: number;
  targetCompletionDate: string;
  notes: string;
}

// Mock data
const mockRequirements: Requirement[] = [
  {
    id: '1',
    requirementId: 'REQ-2024-001',
    roleName: 'Senior Software Engineer',
    status: 'Open',
    offeredCandidatesCount: 2,
    scheduledInterviewsCount: 3,
    candidates: [
      {
        id: 'c1',
        name: 'John Smith',
        status: 'Offered',
        experience: '5+ years',
        skills: ['React', 'Node.js', 'TypeScript'],
        interviewFeedback: [
          {
            date: '2024-01-15',
            rating: 4.5,
            comments: 'Strong technical skills, good communication',
            interviewer: 'Sarah Johnson'
          }
        ],
        scheduledInterviews: [],
        offerDetails: {
          status: 'Pending Response',
          date: '2024-01-18',
          compensation: '$120k - $140k'
        },
        notes: 'Excellent candidate, quick response expected'
      },
      {
        id: 'c2',
        name: 'Emily Davis',
        status: 'Interview Scheduled',
        experience: '6+ years',
        skills: ['Java', 'Spring', 'AWS'],
        interviewFeedback: [
          {
            date: '2024-01-10',
            rating: 4.2,
            comments: 'Good technical background, needs system design assessment',
            interviewer: 'Mike Chen'
          }
        ],
        scheduledInterviews: [
          {
            date: '2024-01-25',
            time: '10:00 AM',
            mode: 'video',
            panelists: ['Tech Lead - Alex Wilson', 'HR - Lisa Rodriguez']
          }
        ],
        notes: 'Final round candidate'
      }
    ],
    hiringProgress: 75,
    targetCompletionDate: '2024-02-15',
    notes: 'Priority role for Q1 expansion'
  },
  {
    id: '2',
    requirementId: 'REQ-2024-002',
    roleName: 'Product Manager',
    status: 'Open',
    offeredCandidatesCount: 1,
    scheduledInterviewsCount: 2,
    candidates: [
      {
        id: 'c3',
        name: 'Michael Johnson',
        status: 'Offered',
        experience: '4+ years',
        skills: ['Product Strategy', 'Analytics', 'Agile'],
        interviewFeedback: [
          {
            date: '2024-01-12',
            rating: 4.8,
            comments: 'Exceptional product thinking, strong leadership',
            interviewer: 'David Park'
          }
        ],
        scheduledInterviews: [],
        offerDetails: {
          status: 'Accepted',
          date: '2024-01-16',
          compensation: '$110k - $130k'
        },
        notes: 'Start date: Feb 1st'
      }
    ],
    hiringProgress: 90,
    targetCompletionDate: '2024-01-30',
    notes: 'Near completion, one more backup candidate needed'
  }
];

const ClientRolesRequirementsPage: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCandidateStatusColor = (status: string) => {
    switch (status) {
      case 'Offered': return 'bg-purple-100 text-purple-800';
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      id: 'roleName',
      header: 'Role Name',
      enableSorting: true,
      enableFiltering: true,
      cell: (requirement: Requirement) => (
        <div className="font-medium text-gray-900">{requirement.roleName}</div>
      )
    },
    {
      id: 'requirementId',
      header: 'Requirement ID',
      enableSorting: true,
      enableFiltering: true,
      cell: (requirement: Requirement) => (
        <div className="text-sm text-gray-600">{requirement.requirementId}</div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      enableSorting: true,
      enableFiltering: true,
      cell: (requirement: Requirement) => (
        <Badge className={getStatusBadgeColor(requirement.status)}>
          {requirement.status}
        </Badge>
      )
    },
    {
      id: 'offeredCandidates',
      header: 'Offered Candidates',
      enableSorting: true,
      cell: (requirement: Requirement) => (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="font-medium">{requirement.offeredCandidatesCount}</span>
        </div>
      )
    },
    {
      id: 'scheduledInterviews',
      header: 'Scheduled Interviews',
      enableSorting: true,
      cell: (requirement: Requirement) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="font-medium">{requirement.scheduledInterviewsCount}</span>
        </div>
      )
    },
    {
      id: 'candidates',
      header: 'Candidates',
      cell: (requirement: Requirement) => (
        <div className="space-y-1">
          {requirement.candidates.map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => handleCandidateClick(candidate)}
              className="flex items-center gap-2 text-left hover:bg-gray-50 p-1 rounded"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                {candidate.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  {candidate.name}
                </div>
                <Badge className={`text-xs ${getCandidateStatusColor(candidate.status)}`}>
                  {candidate.status}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'hiringProgress',
      header: 'Progress',
      enableSorting: true,
      cell: (requirement: Requirement) => (
        <div className="w-24">
          <Progress value={requirement.hiringProgress} className="h-2" />
          <div className="text-xs text-gray-600 mt-1">{requirement.hiringProgress}%</div>
        </div>
      )
    },
    {
      id: 'targetDate',
      header: 'Target Date',
      enableSorting: true,
      cell: (requirement: Requirement) => (
        <div className="text-sm text-gray-600">{requirement.targetCompletionDate}</div>
      )
    },
    {
      id: 'notes',
      header: 'Notes',
      cell: (requirement: Requirement) => (
        <div className="max-w-xs truncate text-sm text-gray-600" title={requirement.notes}>
          {requirement.notes}
        </div>
      )
    }
  ];

  const filteredRequirements = mockRequirements.filter(req => {
    const matchesSearch = req.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.requirementId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Roles & Requirements</h1>
              <p className="text-gray-600">Track your active roles and candidate progress</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search roles or requirements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{mockRequirements.length}</div>
                  <p className="text-sm text-gray-600">Active Requirements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {mockRequirements.reduce((sum, req) => sum + req.offeredCandidatesCount, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Offered Candidates</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {mockRequirements.reduce((sum, req) => sum + req.scheduledInterviewsCount, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Scheduled Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(mockRequirements.reduce((sum, req) => sum + req.hiringProgress, 0) / mockRequirements.length)}%
                  </div>
                  <p className="text-sm text-gray-600">Avg. Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Requirements Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredRequirements}
                columns={columns}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Candidate Detail Side Drawer */}
      <SideDrawer
        title="Candidate Details"
        subtitle={selectedCandidate?.name}
        open={!!selectedCandidate}
        onOpenChange={() => setSelectedCandidate(null)}
        size="lg"
      >
        {selectedCandidate && (
          <div className="p-6 space-y-6">
            {/* Profile Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">
                  {selectedCandidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedCandidate.name}</h3>
                  <p className="text-gray-600">{selectedCandidate.experience} experience</p>
                  <Badge className={getCandidateStatusColor(selectedCandidate.status)}>
                    {selectedCandidate.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Interview Feedback */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Interview Feedback
              </h4>
              <div className="space-y-3">
                {selectedCandidate.interviewFeedback.map((feedback, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{feedback.interviewer}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{feedback.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{feedback.comments}</p>
                    <p className="text-xs text-gray-500">{feedback.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Interviews */}
            {selectedCandidate.scheduledInterviews.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Scheduled Interviews
                </h4>
                <div className="space-y-3">
                  {selectedCandidate.scheduledInterviews.map((interview, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {interview.mode === 'phone' && <Phone className="h-4 w-4 text-blue-500" />}
                        {interview.mode === 'video' && <Video className="h-4 w-4 text-green-500" />}
                        {interview.mode === 'in-person' && <MapPin className="h-4 w-4 text-purple-500" />}
                        <span className="font-medium">{interview.date} at {interview.time}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Panelists:</p>
                        <div className="space-y-1">
                          {interview.panelists.map((panelist, pIndex) => (
                            <span key={pIndex} className="text-sm bg-gray-100 px-2 py-1 rounded mr-2">
                              {panelist}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offer Details */}
            {selectedCandidate.offerDetails && (
              <div className="space-y-3">
                <h4 className="font-semibold">Offer Details</h4>
                <div className="border rounded-lg p-3 bg-green-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Status</span>
                    <Badge className="bg-green-100 text-green-800">
                      {selectedCandidate.offerDetails.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Date:</span> {selectedCandidate.offerDetails.date}</p>
                    <p><span className="font-medium">Compensation:</span> {selectedCandidate.offerDetails.compensation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-3">
              <h4 className="font-semibold">Notes</h4>
              <div className="border rounded-lg p-3 bg-gray-50">
                <p className="text-sm text-gray-600">{selectedCandidate.notes}</p>
              </div>
            </div>
          </div>
        )}
      </SideDrawer>
    </div>
  );
};

export default ClientRolesRequirementsPage;
