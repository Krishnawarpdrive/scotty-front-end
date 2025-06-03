
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { InterviewerMetric } from '../../types/InterviewerTypes';

interface PerformanceMetricsProps {
  metrics: InterviewerMetric[];
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const [timeRange, setTimeRange] = useState('month');

  const getMetricsByType = (type: string) => {
    return metrics
      .filter(m => m.metric_type === type)
      .sort((a, b) => new Date(a.period_start).getTime() - new Date(b.period_start).getTime())
      .map(m => ({
        date: new Date(m.period_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: m.metric_value,
        fullDate: m.period_start
      }));
  };

  const interviewData = getMetricsByType('interviews_conducted');
  const feedbackData = getMetricsByType('feedback_submitted');
  const qualityData = getMetricsByType('quality_score');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Performance Metrics</h2>
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="quarter">This Quarter</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interviews Conducted */}
        <Card>
          <CardHeader>
            <CardTitle>Interviews Conducted</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feedback Quality */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feedback Submitted */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feedbackData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Interviews:</span>
                <span className="font-semibold">{interviewData.reduce((sum, d) => sum + d.value, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Quality Score:</span>
                <span className="font-semibold">
                  {qualityData.length > 0 
                    ? (qualityData.reduce((sum, d) => sum + d.value, 0) / qualityData.length).toFixed(1)
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>Feedback Submissions:</span>
                <span className="font-semibold">{feedbackData.reduce((sum, d) => sum + d.value, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Feedback Rate:</span>
                <span className="font-semibold">
                  {interviewData.length > 0 
                    ? Math.round((feedbackData.reduce((sum, d) => sum + d.value, 0) / interviewData.reduce((sum, d) => sum + d.value, 0)) * 100)
                    : 0
                  }%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
