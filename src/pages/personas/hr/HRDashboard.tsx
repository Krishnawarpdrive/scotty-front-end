
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, CheckCircle, Clock } from 'lucide-react';
import { PersonaRoute } from '@/components/auth/PersonaRoute';

const HRDashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Total Candidates',
      value: '156',
      change: '+12',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Roles',
      value: '23',
      change: '+3',
      icon: Briefcase,
      color: 'text-green-600'
    },
    {
      title: 'Completed Hires',
      value: '8',
      change: '+2',
      icon: CheckCircle,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Reviews',
      value: '14',
      change: '-1',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  return (
    <PersonaRoute allowedPersonas={['hr']}>
      <motion.div 
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">HR Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your hiring pipeline and candidate relationships</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            HR Manager
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {metric.change} from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">New candidate applied for Frontend Developer</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Interview scheduled for Backend Developer role</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Offer extended to UX Designer candidate</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Review technical assessments</p>
                    <p className="text-xs text-gray-500">5 pending reviews</p>
                  </div>
                  <Badge variant="outline">Today</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Conduct final interviews</p>
                    <p className="text-xs text-gray-500">3 scheduled interviews</p>
                  </div>
                  <Badge variant="outline">Tomorrow</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Update job descriptions</p>
                    <p className="text-xs text-gray-500">2 roles need updates</p>
                  </div>
                  <Badge variant="outline">This week</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </PersonaRoute>
  );
};

export default HRDashboard;
