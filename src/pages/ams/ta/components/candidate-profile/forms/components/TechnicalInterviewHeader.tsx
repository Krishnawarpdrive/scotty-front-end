
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Code, 
  CheckCircle, 
  Clock, 
  Star,
  CalendarDays
} from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';

interface TechnicalInterviewHeaderProps {
  candidate: Candidate;
  interviewScheduled: boolean;
  onScheduleInterview: () => void;
}

export const TechnicalInterviewHeader: React.FC<TechnicalInterviewHeaderProps> = ({
  candidate,
  interviewScheduled,
  onScheduleInterview
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Technical Interview Assessment
          </CardTitle>
          {!interviewScheduled ? (
            <Button 
              onClick={onScheduleInterview}
              className="flex items-center gap-2"
            >
              <CalendarDays className="h-4 w-4" />
              Schedule Interview
            </Button>
          ) : (
            <Badge variant="default" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Interview Scheduled
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <User className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.appliedRole}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Clock className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">60 Minutes</h3>
            <p className="text-sm text-gray-600">Interview Duration</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Star className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Technical Focus</h3>
            <p className="text-sm text-gray-600">Problem Solving</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
