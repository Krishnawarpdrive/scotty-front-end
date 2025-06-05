
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Clock,
  TrendingUp,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { TACandidate } from '../types/CandidateTypes';
import { CandidateTable } from './candidate-table/CandidateTable';
import { mockCandidatesData } from '../data/candidatesMockData';

export const CandidateDashboard: React.FC = () => {
  const [candidates] = useState<TACandidate[]>(mockCandidatesData);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // Calculate dashboard metrics
  const metrics = {
    totalCandidates: candidates.length,
    activeCandidates: candidates.filter(c => c.status === 'Active').length,
    interviewsScheduled: candidates.reduce((sum, c) => sum + c.interviewHistory.filter(i => i.status === 'Scheduled').length, 0),
    pendingActions: candidates.filter(c => c.nextAction && c.status === 'Active').length,
    avgScore: candidates.filter(c => c.score).reduce((sum, c) => sum + (c.score || 0), 0) / candidates.filter(c => c.score).length || 0,
    documentsVerified: candidates.reduce((sum, c) => sum + c.documents.filter(d => d.status === 'Verified').length, 0)
  };

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidates(prev => 
      prev.includes(id) 
        ? prev.filter(candidateId => candidateId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedCandidates(
      selectedCandidates.length === candidates.length 
        ? [] 
        : candidates.map(c => c.id)
    );
  };

  const handleCandidateClick = (candidate: TACandidate) => {
    console.log('Candidate clicked:', candidate.name);
    // Could open a detailed view modal or navigate to candidate detail page
  };

  const handleScheduleInterview = (candidateId: string, roleId: string) => {
    console.log('Schedule interview for candidate:', candidateId, 'role:', roleId);
    // Implement interview scheduling logic
  };

  const handleRequestFeedback = (candidateId: string) => {
    console.log('Request feedback for candidate:', candidateId);
    // Implement feedback request logic
  };

  const handleMoveToNextStage = (candidateId: string, roleId: string) => {
    console.log('Move candidate to next stage:', candidateId, 'role:', roleId);
    // Implement stage progression logic
  };

  const handleAddNote = (candidateId: string, note: string) => {
    console.log('Add note for candidate:', candidateId, 'note:', note);
    // Implement note addition logic
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidate Dashboard</h1>
          <p className="text-gray-600">Manage and track all candidate applications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCandidates}</div>
            <p className="text-xs text-muted-foreground">Active pipeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeCandidates}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.interviewsScheduled}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingActions}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.documentsVerified}</div>
            <p className="text-xs text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <CandidateTable
        candidates={candidates}
        selectedCandidates={selectedCandidates}
        onSelectCandidate={handleSelectCandidate}
        onSelectAll={handleSelectAll}
        onCandidateClick={handleCandidateClick}
        onScheduleInterview={handleScheduleInterview}
        onRequestFeedback={handleRequestFeedback}
        onMoveToNextStage={handleMoveToNextStage}
        onAddNote={handleAddNote}
      />
    </div>
  );
};
