
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { SideDrawer } from '@/components/ui/side-drawer';
import { 
  Search, 
  Users, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Eye,
  Filter,
  FileText,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart, Funnel } from 'recharts';

// Mock data
const summaryMetrics = [
  {
    title: 'Total Candidates',
    value: 1247,
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Active Candidates',
    value: 324,
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    progress: 68
  },
  {
    title: 'Offers Extended',
    value: 45,
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    trend: '+12%'
  },
  {
    title: 'Offers Accepted',
    value: 32,
    icon: CheckCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    percentage: 71
  },
  {
    title: 'Avg. Time in Pipeline',
    value: '18 days',
    icon: Clock,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  }
];

const funnelData = [
  { name: 'Applied', value: 850, fill: '#3B82F6' },
  { name: 'Screening', value: 420, fill: '#8B5CF6' },
  { name: 'Interview', value: 180, fill: '#10B981' },
  { name: 'Offer', value: 45, fill: '#F59E0B' },
  { name: 'Hired', value: 32, fill: '#EF4444' }
];

const stageTimelineData = [
  { stage: 'Application Review', avgDays: 3, color: '#3B82F6' },
  { stage: 'Phone Screening', avgDays: 7, color: '#8B5CF6' },
  { stage: 'Technical Interview', avgDays: 12, color: '#10B981' },
  { stage: 'Final Interview', avgDays: 8, color: '#F59E0B' },
  { stage: 'Offer Process', avgDays: 5, color: '#EF4444' }
];

const recentActivities = [
  {
    candidate: 'Sarah Johnson',
    action: 'Interview scheduled',
    role: 'Senior Developer',
    time: '2 hours ago',
    recruiter: 'John Smith'
  },
  {
    candidate: 'Mike Chen',
    action: 'Offer extended',
    role: 'Product Manager',
    time: '4 hours ago',
    recruiter: 'Emily Davis'
  },
  {
    candidate: 'Lisa Rodriguez',
    action: 'Moved to final interview',
    role: 'UX Designer',
    time: '6 hours ago',
    recruiter: 'Tom Wilson'
  }
];

const candidateColumns = [
  {
    id: 'name',
    header: 'Candidate Name',
    enableSorting: true,
    enableFiltering: true,
    cell: (candidate: any) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          {candidate.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{candidate.name}</div>
          <div className="text-sm text-gray-500">{candidate.email}</div>
        </div>
      </div>
    )
  },
  {
    id: 'role',
    header: 'Role Applied',
    enableSorting: true,
    enableFiltering: true
  },
  {
    id: 'currentStage',
    header: 'Current Stage',
    enableSorting: true,
    enableFiltering: true,
    cell: (candidate: any) => (
      <Badge variant="outline">{candidate.currentStage}</Badge>
    )
  },
  {
    id: 'daysInStage',
    header: 'Days in Stage',
    enableSorting: true,
    cell: (candidate: any) => (
      <span className={candidate.daysInStage > 7 ? 'text-red-600' : 'text-gray-900'}>
        {candidate.daysInStage}
      </span>
    )
  },
  {
    id: 'score',
    header: 'Score',
    enableSorting: true,
    cell: (candidate: any) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-500" />
        {candidate.score}/5
      </div>
    )
  },
  {
    id: 'offerStatus',
    header: 'Offer Status',
    enableSorting: true,
    enableFiltering: true,
    cell: (candidate: any) => (
      candidate.offerStatus ? (
        <Badge className={candidate.offerStatus === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
          {candidate.offerStatus}
        </Badge>
      ) : (
        <span className="text-gray-400">-</span>
      )
    )
  },
  {
    id: 'recruiter',
    header: 'Recruiter',
    enableSorting: true,
    enableFiltering: true
  }
];

const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    role: 'Senior Developer',
    currentStage: 'Technical Interview',
    daysInStage: 3,
    score: 4.5,
    offerStatus: null,
    recruiter: 'John Smith'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.c@email.com',
    role: 'Product Manager',
    currentStage: 'Offer Extended',
    daysInStage: 2,
    score: 4.8,
    offerStatus: 'Pending',
    recruiter: 'Emily Davis'
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    email: 'lisa.r@email.com',
    role: 'UX Designer',
    currentStage: 'Final Interview',
    daysInStage: 5,
    score: 4.2,
    offerStatus: null,
    recruiter: 'Tom Wilson'
  }
];

const CandidateDashboardPage: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRecruiter, setSelectedRecruiter] = useState('');

  const handleCandidateClick = (candidate: any) => {
    setSelectedCandidate(candidate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Candidate Dashboard</h1>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Recruiter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="emily">Emily Davis</SelectItem>
                  <SelectItem value="tom">Tom Wilson</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Summary Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {summaryMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className={`rounded-full w-10 h-10 ${metric.bgColor} flex items-center justify-center mb-3`}>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  {metric.progress && (
                    <Progress value={metric.progress} className="mt-2 h-2" />
                  )}
                  {metric.trend && (
                    <div className="text-sm text-green-600 mt-1">{metric.trend}</div>
                  )}
                  {metric.percentage && (
                    <div className="text-sm text-gray-500 mt-1">{metric.percentage}% acceptance rate</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Funnel and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Candidate Funnel */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Candidate Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funnelData.map((stage, index) => {
                    const nextStage = funnelData[index + 1];
                    const conversionRate = nextStage ? Math.round((nextStage.value / stage.value) * 100) : 100;
                    
                    return (
                      <div key={stage.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{stage.name}</span>
                          <span className="text-sm text-gray-600">{stage.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: stage.fill,
                              width: `${(stage.value / funnelData[0].value) * 100}%`
                            }}
                          />
                        </div>
                        {index < funnelData.length - 1 && (
                          <div className="text-xs text-gray-500 text-right">
                            {conversionRate}% conversion
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Pipeline Timeline */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <CardTitle>Average Stage Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={stageTimelineData} layout="horizontal">
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="stage" width={120} />
                    <Bar dataKey="avgDays" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.section>
        </div>

        {/* Activity Feed */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.candidate.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.candidate}</span> - {activity.action}
                        </p>
                        <p className="text-xs text-gray-600">{activity.role} • {activity.recruiter}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Candidate List Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Candidate List</CardTitle>
                <Badge variant="outline">{mockCandidates.length} candidates</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={mockCandidates}
                columns={candidateColumns}
                onRowClick={handleCandidateClick}
              />
            </CardContent>
          </Card>
        </motion.section>
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
                  <p className="text-gray-600">{selectedCandidate.email}</p>
                  <Badge>{selectedCandidate.role}</Badge>
                </div>
              </div>
            </div>

            {/* Pipeline Status */}
            <div className="space-y-3">
              <h4 className="font-semibold">Pipeline Status</h4>
              <div className="space-y-2">
                {['Applied', 'Screening', 'Interview', 'Offer', 'Hired'].map((stage, index) => (
                  <div key={stage} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      stage === selectedCandidate.currentStage ? 'bg-blue-500' : 
                      index < ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'].indexOf(selectedCandidate.currentStage) ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <span className={stage === selectedCandidate.currentStage ? 'font-medium' : ''}>{stage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Score & Performance */}
            <div className="space-y-3">
              <h4 className="font-semibold">Performance Score</h4>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-lg font-bold">{selectedCandidate.score}/5</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold">Actions</h4>
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </SideDrawer>
    </div>
  );
};

export default CandidateDashboardPage;
