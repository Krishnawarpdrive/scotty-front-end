
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedCandidateTable } from './EnhancedCandidateTable';
import { EnhancedCandidateDetailDrawer } from '../candidate-detail/EnhancedCandidateDetailDrawer';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';
import { Plus, Download, Filter, Users, Calendar, CheckCircle, Clock } from 'lucide-react';

// Mock data for demonstration with role applications
const mockCandidates = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    current_stage: 'Phone Screening',
    source: 'LinkedIn',
    experience_years: 5,
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    current_position: 'Senior Frontend Developer',
    current_employer: 'Tech Corp Inc',
    status: 'Active' as const,
    applied_date: '2024-01-15',
    last_updated: '2024-01-20',
    location: 'San Francisco, CA',
    overall_score: 85,
    role_applications: [
      {
        id: 'app1',
        role_name: 'Senior Frontend Engineer',
        client_name: 'TechStart Inc',
        applied_date: '2024-01-15',
        current_stage: 'Technical Interview',
        stage_progress: 3,
        total_stages: 5,
        status: 'Active' as const,
        hiring_manager: 'Sarah Johnson',
        ta_assigned: 'Mike Chen',
        next_action: 'Schedule final interview',
        next_action_date: '2024-01-25'
      },
      {
        id: 'app2',
        role_name: 'Lead Developer',
        client_name: 'Innovation Labs',
        applied_date: '2024-01-10',
        current_stage: 'Phone Screening',
        stage_progress: 2,
        total_stages: 4,
        status: 'Active' as const,
        hiring_manager: 'David Wilson',
        ta_assigned: 'Lisa Brown',
        next_action: 'Technical assessment review',
        next_action_date: '2024-01-24'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    current_stage: 'Technical Interview',
    source: 'Referral',
    experience_years: 8,
    skills: ['Java', 'Spring', 'Microservices', 'AWS'],
    current_position: 'Backend Engineer',
    current_employer: 'Enterprise Solutions',
    status: 'Active' as const,
    applied_date: '2024-01-10',
    last_updated: '2024-01-18',
    location: 'Austin, TX',
    overall_score: 92,
    role_applications: [
      {
        id: 'app3',
        role_name: 'Senior Backend Engineer',
        client_name: 'DataFlow Systems',
        applied_date: '2024-01-10',
        current_stage: 'Final Interview',
        stage_progress: 4,
        total_stages: 5,
        status: 'Active' as const,
        hiring_manager: 'Robert Chen',
        ta_assigned: 'Emily Davis',
        next_action: 'Reference check',
        next_action_date: '2024-01-26'
      }
    ]
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    current_stage: 'Final Interview',
    source: 'Direct',
    experience_years: 6,
    skills: ['DevOps', 'Kubernetes', 'Docker', 'CI/CD'],
    current_position: 'DevOps Engineer',
    current_employer: 'Cloud Systems',
    status: 'Active' as const,
    applied_date: '2024-01-05',
    last_updated: '2024-01-19',
    location: 'Seattle, WA',
    overall_score: 78,
    role_applications: [
      {
        id: 'app4',
        role_name: 'DevOps Specialist',
        client_name: 'ScaleUp Corp',
        applied_date: '2024-01-05',
        current_stage: 'Offer Discussion',
        stage_progress: 5,
        total_stages: 5,
        status: 'Active' as const,
        hiring_manager: 'Jennifer Lee',
        ta_assigned: 'Alex Kumar',
        next_action: 'Salary negotiation',
        next_action_date: '2024-01-23'
      }
    ]
  },
];

export function EnhancedTAMissionControl() {
  const toast = useEnhancedToast();
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [candidateDetailOpen, setCandidateDetailOpen] = useState(false);

  const handleViewProfile = (candidate: any) => {
    console.log('View candidate profile:', candidate);
    setSelectedCandidate(candidate);
    setCandidateDetailOpen(true);
  };

  const handleEditCandidate = (candidate: any) => {
    console.log('Edit candidate:', candidate);
    toast.info({
      title: 'Edit Candidate',
      description: `Opening edit form for ${candidate.name}`
    });
  };

  const handleScheduleInterview = (candidate: any) => {
    console.log('Schedule interview:', candidate);
    toast.info({
      title: 'Schedule Interview',
      description: `Opening scheduler for ${candidate.name}`
    });
  };

  const handleMoveToStage = (candidates: any[], stage: string) => {
    console.log('Move candidates to stage:', candidates, stage);
  };

  const handleExportCandidates = (candidates: any[]) => {
    console.log('Export candidates:', candidates);
    const csvData = candidates.map(candidate => ({
      Name: candidate.name,
      Email: candidate.email,
      Phone: candidate.phone || '',
      'Current Stage': candidate.current_stage,
      Status: candidate.status,
      'Experience Years': candidate.experience_years,
      'Current Position': candidate.current_position || '',
      'Current Employer': candidate.current_employer || '',
      Source: candidate.source,
      'Applied Date': candidate.applied_date,
      Skills: candidate.skills.join('; ')
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidates-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    toast.success({
      title: 'Data refreshed',
      description: 'Candidate data has been updated'
    });
  };

  const handleCloseCandidateDetail = () => {
    setCandidateDetailOpen(false);
    setSelectedCandidate(null);
  };

  // Calculate metrics
  const metrics = {
    totalCandidates: mockCandidates.length,
    activeStages: mockCandidates.filter(c => c.status === 'Active').length,
    interviewsScheduled: mockCandidates.filter(c => c.current_stage.includes('Interview')).length,
    readyForOffer: mockCandidates.filter(c => c.current_stage === 'Final Interview').length,
  };

  const pageActions = (
    <>
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Advanced Filters
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExportCandidates(mockCandidates)}>
        <Download className="h-4 w-4 mr-2" />
        Export All
      </Button>
      <Button size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Candidate
      </Button>
    </>
  );

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="TA Mission Control"
        subtitle="Manage your candidate pipeline and hiring progress"
        actions={pageActions}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.totalCandidates}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active in Pipeline</p>
                <p className="text-2xl font-bold text-green-600">{metrics.activeStages}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interviews Scheduled</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.interviewsScheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ready for Offer</p>
                <p className="text-2xl font-bold text-yellow-600">{metrics.readyForOffer}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Candidate Table */}
      <EnhancedCandidateTable
        candidates={mockCandidates}
        loading={loading}
        onRefresh={handleRefresh}
        onViewProfile={handleViewProfile}
        onEditCandidate={handleEditCandidate}
        onScheduleInterview={handleScheduleInterview}
        onMoveToStage={handleMoveToStage}
        onExportCandidates={handleExportCandidates}
      />

      {/* Enhanced Candidate Detail Drawer */}
      <EnhancedCandidateDetailDrawer
        open={candidateDetailOpen}
        onClose={handleCloseCandidateDetail}
        candidate={selectedCandidate}
      />
    </motion.div>
  );
}
