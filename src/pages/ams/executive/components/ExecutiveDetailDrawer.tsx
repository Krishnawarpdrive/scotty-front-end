
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SideDrawer } from '@/components/ui/side-drawer';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  DollarSign, 
  Target, 
  Building2, 
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter
} from 'lucide-react';

interface ExecutiveDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  drawerType: string | null;
  drawerData: any;
}

export const ExecutiveDetailDrawer: React.FC<ExecutiveDetailDrawerProps> = ({
  open,
  onClose,
  drawerType,
  drawerData
}) => {
  const getDrawerContent = () => {
    switch (drawerType) {
      case 'total-hires':
        return <TotalHiresDetail data={drawerData} />;
      case 'avg-time-to-hire':
        return <TimeToHireDetail data={drawerData} />;
      case 'cost-per-hire':
        return <CostPerHireDetail data={drawerData} />;
      case 'hiring-goal':
        return <HiringGoalDetail data={drawerData} />;
      case 'client-portfolio':
        return <ClientPortfolioDetail data={drawerData} />;
      case 'candidate-quality':
        return <CandidateQualityDetail data={drawerData} />;
      default:
        return <DefaultDetail />;
    }
  };

  const getDrawerTitle = () => {
    switch (drawerType) {
      case 'total-hires':
        return 'Total Hires Analysis';
      case 'avg-time-to-hire':
        return 'Time to Hire Breakdown';
      case 'cost-per-hire':
        return 'Cost per Hire Analysis';
      case 'hiring-goal':
        return 'Hiring Goal Progress';
      case 'client-portfolio':
        return 'Client Portfolio Overview';
      case 'candidate-quality':
        return 'Candidate Quality Metrics';
      default:
        return 'Executive Details';
    }
  };

  const getDrawerDescription = () => {
    switch (drawerType) {
      case 'total-hires':
        return 'Detailed breakdown of successful placements and hiring trends';
      case 'avg-time-to-hire':
        return 'Analysis of hiring cycle duration and bottlenecks';
      case 'cost-per-hire':
        return 'Cost analysis and budget optimization insights';
      case 'hiring-goal':
        return 'Progress tracking and goal achievement metrics';
      case 'client-portfolio':
        return 'Active client relationships and performance';
      case 'candidate-quality':
        return 'Candidate quality metrics and satisfaction scores';
      default:
        return 'Executive dashboard detailed view';
    }
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onClose}
      title={getDrawerTitle()}
      description={getDrawerDescription()}
      size="xl"
      footer={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
          <Button size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="p-6">
        {getDrawerContent()}
      </div>
    </SideDrawer>
  );
};

const TotalHiresDetail: React.FC<{ data: any }> = ({ data }) => {
  const departmentData = [
    { name: 'Engineering', hires: 45, target: 50, completion: 90 },
    { name: 'Sales', hires: 32, target: 35, completion: 91 },
    { name: 'Marketing', hires: 18, target: 20, completion: 90 },
    { name: 'HR', hires: 12, target: 15, completion: 80 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Hiring Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">234</div>
              <div className="text-sm text-gray-600">Total Hires</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+12.5%</div>
              <div className="text-sm text-gray-600">Growth Rate</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Department Breakdown</h4>
            {departmentData.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-sm text-gray-600">
                      {dept.hires}/{dept.target}
                    </span>
                  </div>
                  <Progress value={dept.completion} className="h-2" />
                </div>
                <Badge variant="secondary" className="ml-4">
                  {dept.completion}%
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TimeToHireDetail: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time to Hire Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">28</div>
              <div className="text-sm text-gray-600">Average Days</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">-8.2%</div>
              <div className="text-sm text-gray-600">Improvement</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-600">Fastest Hire</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Stage Breakdown</h4>
            <div className="space-y-3">
              {[
                { stage: 'Sourcing', days: 5, color: 'bg-blue-500' },
                { stage: 'Screening', days: 7, color: 'bg-green-500' },
                { stage: 'Interview', days: 10, color: 'bg-yellow-500' },
                { stage: 'Decision', days: 4, color: 'bg-purple-500' },
                { stage: 'Offer', days: 2, color: 'bg-red-500' }
              ].map((stage, index) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">{stage.stage}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <motion.div
                      className={`h-3 rounded-full ${stage.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(stage.days / 28) * 100}%` }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    />
                  </div>
                  <div className="w-12 text-sm text-gray-600">{stage.days}d</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CostPerHireDetail: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cost per Hire Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$4,250</div>
              <div className="text-sm text-gray-600">Average Cost</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">-5.1%</div>
              <div className="text-sm text-gray-600">Reduction</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Cost Components</h4>
            <div className="space-y-3">
              {[
                { component: 'Sourcing Tools', cost: 1200, percentage: 28 },
                { component: 'TA Salary Allocation', cost: 1800, percentage: 42 },
                { component: 'External Vendors', cost: 800, percentage: 19 },
                { component: 'Interview Costs', cost: 450, percentage: 11 }
              ].map((item, index) => (
                <div key={item.component} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.component}</span>
                      <span className="text-sm font-bold">${item.cost.toLocaleString()}</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {item.percentage}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const HiringGoalDetail: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quarterly Hiring Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">234</div>
              <div className="text-sm text-gray-600">Current</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">300</div>
              <div className="text-sm text-gray-600">Target</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">78%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">234/300</span>
            </div>
            <Progress value={78} className="h-4" />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Monthly Targets</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { month: 'Q2 Jan', target: 25, actual: 28, status: 'completed' },
                { month: 'Q2 Feb', target: 25, actual: 22, status: 'completed' },
                { month: 'Q2 Mar', target: 25, actual: 31, status: 'completed' },
                { month: 'Q2 Apr', target: 30, actual: 25, status: 'active' }
              ].map((month, index) => (
                <div key={month.month} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{month.month}</span>
                    {month.status === 'completed' ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> :
                      <Clock className="h-4 w-4 text-orange-500" />
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    {month.actual}/{month.target} hires
                  </div>
                  <Progress 
                    value={(month.actual / month.target) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ClientPortfolioDetail: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Active Client Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">24</div>
              <div className="text-sm text-gray-600">Active Clients</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-gray-600">High Performing</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">4</div>
              <div className="text-sm text-gray-600">Need Attention</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-gray-600">At Risk</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Top Clients by Activity</h4>
            <div className="space-y-3">
              {[
                { name: 'TechCorp Inc', roles: 15, health: 95, tier: 'Enterprise' },
                { name: 'Global Finance Ltd', roles: 12, health: 88, tier: 'Premium' },
                { name: 'Healthcare Solutions', roles: 8, health: 92, tier: 'Standard' },
                { name: 'Innovation Labs', roles: 6, health: 76, tier: 'Standard' }
              ].map((client, index) => (
                <div key={client.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium">{client.name}</span>
                      <Badge variant="outline">{client.tier}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {client.roles} active roles • Health Score: {client.health}%
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      client.health >= 90 ? 'bg-green-500' :
                      client.health >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium">{client.health}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CandidateQualityDetail: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Candidate Quality Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">4.7</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-gray-600">Pass Rate</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-gray-600">Retention</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Quality Breakdown by Stage</h4>
            <div className="space-y-3">
              {[
                { stage: 'Initial Screening', quality: 4.8, count: 156 },
                { stage: 'Technical Assessment', quality: 4.6, count: 98 },
                { stage: 'Client Interview', quality: 4.7, count: 67 },
                { stage: 'Final Selection', quality: 4.9, count: 45 }
              ].map((stage, index) => (
                <div key={stage.stage} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{stage.stage}</span>
                      <span className="text-sm text-gray-600">{stage.count} candidates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array(5).fill(null).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${
                              i < Math.floor(stage.quality) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{stage.quality}/5.0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DefaultDetail: React.FC = () => {
  return (
    <div className="text-center py-12">
      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
      <p className="text-gray-500">Select a metric to view detailed information.</p>
    </div>
  );
};
