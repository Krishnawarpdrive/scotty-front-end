
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Star, MessageSquare, Eye } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  score: number;
  status: 'new' | 'reviewed' | 'feedback_pending';
  skills: string[];
  lastUpdate: string;
}

interface CandidatePoolSectionProps {
  data: Candidate[];
}

export const CandidatePoolSection: React.FC<CandidatePoolSectionProps> = ({ data }) => {
  const mockCandidates: Candidate[] = [
    {
      id: '1',
      name: 'John Smith',
      role: 'Senior Software Engineer',
      experience: '5+ years',
      score: 4.5,
      status: 'feedback_pending',
      skills: ['React', 'Node.js', 'TypeScript'],
      lastUpdate: '2 hours ago'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      role: 'Product Manager',
      experience: '8+ years',
      score: 4.8,
      status: 'reviewed',
      skills: ['Product Strategy', 'Agile', 'Analytics'],
      lastUpdate: '1 day ago'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'UX Designer',
      experience: '4+ years',
      score: 4.2,
      status: 'new',
      skills: ['Figma', 'User Research', 'Prototyping'],
      lastUpdate: '3 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-green-100 text-green-800';
      case 'feedback_pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'reviewed': return 'Reviewed';
      case 'feedback_pending': return 'Feedback Pending';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Candidate Pool & Feedback
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Candidates
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockCandidates.map((candidate) => (
          <div key={candidate.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium">{candidate.name}</h4>
                <p className="text-sm text-gray-600">{candidate.role} • {candidate.experience}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{candidate.score}</span>
                </div>
                <Badge className={getStatusColor(candidate.status)}>
                  {getStatusLabel(candidate.status)}
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {candidate.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Updated {candidate.lastUpdate}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Profile
                </Button>
                {candidate.status === 'feedback_pending' && (
                  <Button variant="default" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Provide Feedback
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
