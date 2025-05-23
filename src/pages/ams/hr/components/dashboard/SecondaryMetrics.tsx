
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { mockSecondaryMetricsData } from '../../mock-dashboard-data';

export const SecondaryMetrics: React.FC = () => {
  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* Candidate Pipeline by TA */}
      <Card className="p-5 shadow-sm">
        <h3 className="font-semibold mb-3">Candidate Pipeline by TA</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockSecondaryMetricsData.candidatePipelineByTA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <Button variant="ghost" size="sm" className="flex items-center w-full justify-between">
            View TA Assignments <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </Card>
      
      {/* Interview-to-Offer Ratio */}
      <Card className="p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Interview-to-Offer Ratio</h3>
          <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
            +8% MoM
          </Badge>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockSecondaryMetricsData.interviewToOfferRatio}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 1]} tickFormatter={(value) => `${value * 100}%`} />
              <Tooltip formatter={(value) => `${(value as number * 100).toFixed(0)}%`} />
              <Line 
                type="monotone" 
                dataKey="ratio" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <Button variant="ghost" size="sm" className="flex items-center w-full justify-between">
            View Interview Analysis <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </Card>
      
      {/* Partner Collaboration */}
      <Card className="p-5 shadow-sm">
        <h3 className="font-semibold mb-3">Source of Hires</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockSecondaryMetricsData.partnerCollaboration}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {mockSecondaryMetricsData.partnerCollaboration.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} hires`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <Button variant="ghost" size="sm" className="flex items-center w-full justify-between">
            View Source Breakdown <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </Card>
      
      {/* Stuck Candidates */}
      <Card className="p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Stuck Candidates</h3>
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Action Required
          </Badge>
        </div>
        <div className="space-y-3 h-52 overflow-y-auto">
          {mockSecondaryMetricsData.stuckCandidates.map((candidate, index) => (
            <div key={index} className="flex items-start justify-between p-2 rounded-md border">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{candidate.name}</p>
                  <p className="text-xs text-gray-500">Stage: {candidate.stage}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  {candidate.days} days
                </Badge>
                <p className="text-xs text-gray-500 mt-1">TA: {candidate.ta}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="ghost" size="sm" className="flex items-center w-full justify-between">
            View All Stuck Candidates <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
