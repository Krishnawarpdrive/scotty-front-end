
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useExecutiveClientInsights } from './hooks/useExecutiveClientInsights';

const ExecutiveClientPage: React.FC = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRequirement, setSelectedRequirement] = useState<any>(null);
  const { clientInsights } = useExecutiveClientInsights();

  const fromApproval = searchParams.get('from') === 'approval';
  const approvalType = searchParams.get('type');

  const client = clientInsights.find(c => c.id === clientId);

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-6">
        <Card className="p-12 text-center">
          <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Client not found</h3>
          <Button onClick={() => navigate('/ams/executive/clients')}>
            Back to Clients
          </Button>
        </Card>
      </div>
    );
  }

  // Mock requirements data
  const requirements = [
    {
      id: 'req-1',
      name: 'Senior Software Engineer',
      status: 'Active',
      priority: 'High',
      vacancies: 3,
      filled: 1,
      dueDate: '2025-02-15',
      assignedTA: 'Sarah Johnson',
      needsApproval: fromApproval && approvalType === 'budget_increase'
    },
    {
      id: 'req-2',
      name: 'Product Manager',
      status: 'Active',
      priority: 'Medium',
      vacancies: 2,
      filled: 0,
      dueDate: '2025-02-28',
      assignedTA: 'Mike Chen',
      needsApproval: fromApproval && approvalType === 'timeline_extension'
    }
  ];

  const handleRequirementClick = (requirement: any) => {
    setSelectedRequirement(requirement);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(fromApproval ? '/ams/executive/clients?from=approval' : '/ams/executive/clients')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Clients
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
              <Badge className={getStatusColor(client.status)}>
                {client.status}
              </Badge>
            </div>
            {fromApproval && (
              <p className="text-sm text-gray-600 mt-1">
                Review for {approvalType?.replace('_', ' ')} approval
              </p>
            )}
          </div>
        </div>

        {/* Client Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Health Score</p>
                  <p className={`text-2xl font-bold ${getHealthScoreColor(client.health_score)}`}>
                    {client.health_score}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requirements</p>
                  <p className="text-2xl font-bold text-gray-900">{client.total_requirements}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Budget Utilized</p>
                  <p className="text-2xl font-bold text-gray-900">{client.budget_utilized}%</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fulfillment Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(client.performance_metrics.fulfillment_rate)}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requirements" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Requirements</span>
                  {fromApproval && (
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">
                      Pending {approvalType?.replace('_', ' ')}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requirements.map((req) => (
                    <motion.div
                      key={req.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        req.needsApproval ? 'border-orange-200 bg-orange-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleRequirementClick(req)}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{req.name}</h4>
                          <Badge className={getPriorityColor(req.priority)}>
                            {req.priority}
                          </Badge>
                          {req.needsApproval && (
                            <Badge variant="outline" className="bg-orange-100 text-orange-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Needs Approval
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Vacancies:</span>
                          <span className="ml-2 font-medium">{req.filled}/{req.vacancies}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Due Date:</span>
                          <span className="ml-2 font-medium">{req.dueDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Assigned TA:</span>
                          <span className="ml-2 font-medium">{req.assignedTA}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <Badge variant="outline" className="ml-2">
                            {req.status}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Client Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.insights.map((insight, index) => (
                    <div key={insight.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="font-medium capitalize">{insight.insight_type}</span>
                        <Badge variant="outline">
                          Priority: {insight.priority_score}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Generated on {new Date(insight.generated_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  
                  {client.insights.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-4" />
                      <p className="text-gray-500">No insights available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Fulfillment Rate</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round(client.performance_metrics.fulfillment_rate)}%
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium mb-2">Cost Efficiency</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(client.performance_metrics.cost_efficiency)}%
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium mb-2">Avg Time to Fill</h4>
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.round(client.performance_metrics.avg_time_to_fill)} days
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium mb-2">Quality Score</h4>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.round(client.performance_metrics.quality_score)}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Requirement Detail Sidebar - will be enhanced */}
      {selectedRequirement && (
        <div className="fixed inset-0 bg-black/20 z-50" onClick={() => setSelectedRequirement(null)}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Requirement Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedRequirement(null)}>
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedRequirement.name}</h4>
                <p className="text-sm text-gray-600">Assigned to {selectedRequirement.assignedTA}</p>
              </div>
              
              {selectedRequirement.needsApproval && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-800">Approval Required</span>
                  </div>
                  <p className="text-sm text-orange-700 mb-3">
                    This requirement needs {approvalType?.replace('_', ' ')} approval.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveClientPage;
