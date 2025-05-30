import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Code, 
  CheckCircle, 
  Clock, 
  FileText, 
  Users, 
  Star,
  CalendarDays,
  MessageSquare,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';
import { InterviewSchedulingDrawer } from '../../interview-scheduling/InterviewSchedulingDrawer';
import type { Candidate } from '../../types/CandidateTypes';
import type { InterviewSchedule } from '../../interview-scheduling/InterviewSchedulingService';

interface EnhancedTechnicalInterviewFormProps {
  candidateData: Candidate;
  onSave: (formData: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EnhancedTechnicalInterviewForm: React.FC<EnhancedTechnicalInterviewFormProps> = ({
  candidateData,
  onSave,
  onNext,
  onBack
}) => {
  const [schedulingDrawerOpen, setSchedulingDrawerOpen] = useState(false);
  const [interviewScheduled, setInterviewScheduled] = useState(false);
  const [formData, setFormData] = useState({
    skillsAssessment: {}
  });

  const handleScheduleComplete = (schedule: InterviewSchedule) => {
    setInterviewScheduled(true);
    console.log('Interview scheduled:', schedule);
  };

  const technicalAreas = [
    { name: 'Problem Solving', weight: 30, score: 0 },
    { name: 'Code Quality', weight: 25, score: 0 },
    { name: 'System Design', weight: 20, score: 0 },
    { name: 'Technical Communication', weight: 15, score: 0 },
    { name: 'Best Practices', weight: 10, score: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Technical Interview Assessment
            </CardTitle>
            {!interviewScheduled ? (
              <Button 
                onClick={() => setSchedulingDrawerOpen(true)}
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
              <h3 className="font-semibold text-gray-900">{candidateData.name}</h3>
              <p className="text-sm text-gray-600">{candidateData.appliedRole}</p>
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

      {/* Technical Assessment Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Assessment Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technicalAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{area.name}</h4>
                    <Badge variant="outline">{area.weight}% weight</Badge>
                  </div>
                  <Progress value={area.score} className="h-2" />
                </div>
                <div className="ml-4 text-right">
                  <span className="text-lg font-semibold text-gray-900">{area.score}</span>
                  <span className="text-sm text-gray-500">/100</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Interview Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Technical Problem Solving</h4>
              <p className="text-sm text-gray-600 mb-3">
                Present a coding problem that requires algorithmic thinking and optimization.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Add Notes</Button>
                <Button variant="outline" size="sm">Record Answer</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">System Design</h4>
              <p className="text-sm text-gray-600 mb-3">
                Discuss how they would design a scalable system for a given use case.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Add Notes</Button>
                <Button variant="outline" size="sm">Record Answer</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Rating
              </label>
              <div className="flex items-center gap-2">
                <Progress value={0} className="flex-1 h-3" />
                <span className="text-sm font-medium">0/10</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Communication Rating
              </label>
              <div className="flex items-center gap-2">
                <Progress value={0} className="flex-1 h-3" />
                <span className="text-sm font-medium">0/10</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Notes
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Record detailed observations, strengths, and areas for improvement..."
            />
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">Save Draft</Button>
            <Button>Complete Assessment</Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills Assessment Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg border p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Code className="h-5 w-5" />
          Skills Assessment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'JavaScript/TypeScript',
            'React/Frontend',
            'Node.js/Backend',
            'Database Design',
            'System Architecture',
            'Problem Solving'
          ].map((skill, index) => (
            <div key={skill} className="space-y-2">
              <label className="block text-sm font-medium">{skill}</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={formData.skillsAssessment[skill] || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  skillsAssessment: {
                    ...prev.skillsAssessment,
                    [skill]: e.target.value
                  }
                }))}
              >
                <option value="">Select Rating</option>
                <option value="1">1 - Beginner</option>
                <option value="2">2 - Basic</option>
                <option value="3">3 - Intermediate</option>
                <option value="4">4 - Advanced</option>
                <option value="5">5 - Expert</option>
              </select>
            </div>
          ))}
        </div>
      </motion.div>

      <InterviewSchedulingDrawer
        open={schedulingDrawerOpen}
        onClose={() => setSchedulingDrawerOpen(false)}
        candidateId={candidateData.id}
        candidateName={candidateData.name}
        onScheduleComplete={handleScheduleComplete}
      />
    </div>
  );
};

export default EnhancedTechnicalInterviewForm;
