
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Target, TrendingUp } from 'lucide-react';
import { PersonaRoute } from '@/components/auth/PersonaRoute';

const TADashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Active Searches',
      value: '8',
      change: '+2',
      icon: Search,
      color: 'text-blue-600'
    },
    {
      title: 'Candidates Sourced',
      value: '45',
      change: '+12',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Target',
      value: '75%',
      change: '+5%',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '18%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <PersonaRoute allowedPersonas={['ta']}>
      <motion.div 
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Talent Acquisition Dashboard</h1>
            <p className="text-gray-600 mt-1">Source and manage candidates for your assigned roles</p>
          </div>
          <Badge className="bg-green-100 text-green-800">
            TA Specialist
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
              <CardTitle>Assigned Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Senior React Developer</p>
                    <p className="text-sm text-gray-500">TechCorp Inc.</p>
                  </div>
                  <Badge variant="outline">3 days left</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Product Manager</p>
                    <p className="text-sm text-gray-500">StartupXYZ</p>
                  </div>
                  <Badge variant="outline">1 week left</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">DevOps Engineer</p>
                    <p className="text-sm text-gray-500">CloudTech Ltd.</p>
                  </div>
                  <Badge variant="outline">2 weeks left</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sourced</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Screened</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                    </div>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Interviewed</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-sm font-medium">33%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Offered</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full w-1/4"></div>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </PersonaRoute>
  );
};

export default TADashboard;
