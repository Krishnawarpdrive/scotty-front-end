
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Clock, 
  Calendar,
  Target,
  Award,
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface QuickInsight {
  id: string;
  type: 'metric' | 'achievement' | 'alert' | 'tip';
  title: string;
  value?: string | number;
  description: string;
  action?: string;
  priority?: 'high' | 'medium' | 'low';
  trend?: 'up' | 'down' | 'stable';
}

interface CandidateQuickInsightsProps {
  insights: QuickInsight[];
  overallStats: {
    responseRate: number;
    averageProgressTime: string;
    interviewSuccessRate: number;
    activeApplications: number;
  };
}

export const CandidateQuickInsights: React.FC<CandidateQuickInsightsProps> = ({
  insights,
  overallStats
}) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'metric':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-green-600" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'tip':
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'metric':
        return 'bg-blue-50 border-blue-200';
      case 'achievement':
        return 'bg-green-50 border-green-200';
      case 'alert':
        return 'bg-amber-50 border-amber-200';
      case 'tip':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Your Performance Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {overallStats.responseRate}%
              </div>
              <div className="text-sm text-gray-600">Response Rate</div>
              <Progress value={overallStats.responseRate} className="h-2 mt-2" />
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {overallStats.averageProgressTime}
              </div>
              <div className="text-sm text-gray-600">Avg. Progress Time</div>
              <div className="flex items-center justify-center mt-2">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {overallStats.interviewSuccessRate}%
              </div>
              <div className="text-sm text-gray-600">Interview Success</div>
              <Progress value={overallStats.interviewSuccessRate} className="h-2 mt-2" />
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {overallStats.activeApplications}
              </div>
              <div className="text-sm text-gray-600">Active Applications</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <Card key={insight.id} className={getInsightColor(insight.type)}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 rounded-lg bg-white">
                  {getInsightIcon(insight.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    {insight.value && (
                      <div className="text-lg font-bold text-gray-700">
                        {insight.value}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  
                  <div className="flex items-center justify-between">
                    {insight.action && (
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        {insight.action}
                      </button>
                    )}
                    
                    {insight.priority && (
                      <Badge 
                        className={
                          insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                          insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }
                      >
                        {insight.priority} priority
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Upcoming Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Technical Interview - TechCorp</div>
                <div className="text-sm text-gray-600">Tomorrow at 2:00 PM</div>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Interview</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Upload Updated Resume</div>
                <div className="text-sm text-gray-600">Due by end of week</div>
              </div>
              <Badge className="bg-amber-100 text-amber-700">Document</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Respond to HR Query - DataFlow</div>
                <div className="text-sm text-gray-600">Waiting for your response</div>
              </div>
              <Badge className="bg-green-100 text-green-700">Response</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
