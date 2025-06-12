
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

export const InterviewMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Interview Completion Rate',
      value: '94%',
      change: '+2.1%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      title: 'Average Interview Duration',
      value: '52 min',
      change: '-3 min',
      trend: 'down',
      period: 'vs last month'
    },
    {
      title: 'Candidate Show-up Rate',
      value: '87%',
      change: '+5.2%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      title: 'Feedback Submission Rate',
      value: '91%',
      change: '+1.8%',
      trend: 'up',
      period: 'vs last month'
    }
  ];

  const interviewTypes = [
    { type: 'Technical', count: 45, percentage: 38 },
    { type: 'Behavioral', count: 32, percentage: 27 },
    { type: 'System Design', count: 24, percentage: 20 },
    { type: 'Portfolio Review', count: 18, percentage: 15 }
  ];

  const weeklyData = [
    { day: 'Mon', interviews: 12, completed: 11 },
    { day: 'Tue', interviews: 15, completed: 14 },
    { day: 'Wed', interviews: 18, completed: 17 },
    { day: 'Thu', interviews: 14, completed: 13 },
    { day: 'Fri', interviews: 16, completed: 15 },
    { day: 'Sat', interviews: 8, completed: 7 },
    { day: 'Sun', interviews: 5, completed: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">{metric.period}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interview Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Interview Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviewTypes.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-600" style={{
                      backgroundColor: `hsl(${index * 90}, 70%, 50%)`
                    }} />
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{item.count}</span>
                    <Badge variant="outline">{item.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Interview Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Interview Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-8">{day.day}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(day.completed / day.interviews) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">{day.completed}/{day.interviews}</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold">284</p>
                <p className="text-xs text-gray-500">Total interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Feedback Time</p>
                <p className="text-2xl font-bold">2.4h</p>
                <p className="text-xs text-gray-500">After interview</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Panelists</p>
                <p className="text-2xl font-bold">28</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
