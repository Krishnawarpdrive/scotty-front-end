
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  AlertTriangle,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { useExecutiveClientInsights } from './hooks/useExecutiveClientInsights';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ExecutiveClientManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { clientInsights, loading } = useExecutiveClientInsights();

  // Check if we came from an approval notification
  const fromApproval = searchParams.get('from') === 'approval';
  const approvalType = searchParams.get('type');

  const filteredClients = clientInsights.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleClientSelect = (clientId: string) => {
    navigate(`/ams/executive/clients/${clientId}${fromApproval ? `?from=approval&type=${approvalType}` : ''}`);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
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
            onClick={() => navigate('/ams/executive/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            {fromApproval && (
              <p className="text-sm text-gray-600">
                Reviewing clients for {approvalType?.replace('_', ' ')} approval
              </p>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="at-risk">At Risk</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-blue-500"
                  onClick={() => handleClientSelect(client.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        {client.name}
                      </CardTitle>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Health Score */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Health Score</span>
                        <span className={`font-bold ${getHealthScoreColor(client.health_score)}`}>
                          {client.health_score}%
                        </span>
                      </div>

                      {/* Risk Indicators */}
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(client.risk_indicators).map(([key, value]) => 
                          value && (
                            <Badge 
                              key={key} 
                              variant="outline" 
                              className="text-xs bg-red-50 text-red-700"
                            >
                              {key.replace('_', ' ')}
                            </Badge>
                          )
                        )}
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-blue-600" />
                          <span className="text-gray-600">Requirements:</span>
                          <span className="font-medium">{client.total_requirements}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-green-600" />
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium">{client.budget_utilized}%</span>
                        </div>
                      </div>

                      {/* Recent Insights */}
                      {client.insights.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            <span className="text-xs font-medium text-gray-700">Latest Insight</span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {client.insights[0]?.insight_data?.description || 'Recent activity detected'}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredClients.length === 0 && !loading && (
          <Card className="p-12 text-center">
            <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExecutiveClientManagementPage;
