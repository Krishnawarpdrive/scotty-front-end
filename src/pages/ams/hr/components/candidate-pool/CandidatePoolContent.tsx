
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, UserPlus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Candidate } from './types';

interface CandidatePoolContentProps {
  onCandidateClick: (candidate: Candidate) => void;
}

export const CandidatePoolContent: React.FC<CandidatePoolContentProps> = ({ onCandidateClick }) => {
  // Mock candidates data
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      currentPosition: 'Senior Frontend Developer',
      currentEmployer: 'TechCorp Inc.',
      experienceYears: 5,
      location: 'San Francisco, CA',
      currentStage: 'Technical Interview',
      source: 'LinkedIn',
      status: 'Active',
      appliedDate: '2024-01-15',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      resumeUrl: '#',
      notes: 'Excellent technical skills, strong communication, looking for remote opportunities.'
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 987-6543',
      currentPosition: 'Full Stack Developer',
      currentEmployer: 'StartupXYZ',
      experienceYears: 3,
      location: 'New York, NY',
      currentStage: 'Phone Screening',
      source: 'Indeed',
      status: 'Active',
      appliedDate: '2024-01-18',
      skills: ['Python', 'Django', 'React', 'PostgreSQL'],
      resumeUrl: '#',
      notes: 'Strong problem-solving skills, eager to learn new technologies.'
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'phone screening': return 'bg-yellow-100 text-yellow-800';
      case 'technical interview': return 'bg-purple-100 text-purple-800';
      case 'final interview': return 'bg-green-100 text-green-800';
      case 'offer': return 'bg-emerald-100 text-emerald-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidate Pool</h1>
          <p className="text-gray-600 mt-2">Manage and track all candidates</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search candidates..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold">{candidates.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">
                  {candidates.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Review</p>
                <p className="text-2xl font-bold">
                  {candidates.filter(c => c.currentStage && c.currentStage !== 'Applied').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 gap-4">
        {candidates.map((candidate) => (
          <Card 
            key={candidate.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => onCandidateClick(candidate)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" alt={candidate.name} />
                  <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{candidate.name}</h3>
                  <p className="text-gray-600">{candidate.currentPosition} at {candidate.currentEmployer}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStageColor(candidate.currentStage || '')} variant="secondary">
                      {candidate.currentStage}
                    </Badge>
                    <Badge variant="outline">
                      {candidate.experienceYears} years exp
                    </Badge>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">{candidate.email}</p>
                  <p className="text-sm text-gray-600">{candidate.location}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Applied: {candidate.appliedDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
