
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend 
} from 'recharts';
import { MetricData } from '../../hooks/useDashboardData';

interface MetricDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metric: MetricData | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const MetricDetailsDrawer: React.FC<MetricDetailsDrawerProps> = ({ 
  open, 
  onOpenChange, 
  metric 
}) => {
  if (!metric) return null;

  const renderChartContent = () => {
    if (metric.title === 'Time to Hire' || metric.title === 'TA Work Progress') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={metric.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={metric.data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {metric.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  const renderActionButtons = () => {
    if (metric.title === 'Time to Hire') {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Assign Additional TA</Button>
          <Button size="sm" variant="outline">Review Candidate Pipeline</Button>
          <Button size="sm" variant="outline">Schedule Review Meeting</Button>
        </div>
      );
    } else if (metric.title === 'TA Work Progress') {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Reassign Tasks</Button>
          <Button size="sm" variant="outline">Send Motivational Alert</Button>
          <Button size="sm" variant="outline">Flag TA for Review</Button>
        </div>
      );
    } else if (metric.title === 'TA Success Rate') {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Arrange Peer Learning</Button>
          <Button size="sm" variant="outline">Review Performance</Button>
        </div>
      );
    } else if (metric.title === 'Interviewer Load') {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Request Additional Slots</Button>
          <Button size="sm" variant="outline">View Calendar</Button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm">Adjust Algorithm</Button>
          <Button size="sm" variant="outline">View Details</Button>
        </div>
      );
    }
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={metric.title}
      subtitle="Detailed analytics view"
      size="lg"
    >
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
          <p className="text-gray-600">
            {metric.description}
          </p>
        </div>
        
        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="h-80">
            {renderChartContent()}
          </TabsContent>
          
          <TabsContent value="table">
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {metric.data.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Key Insight</h4>
                <p className="text-sm text-gray-600">
                  {metric.insight}
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium mb-2">Recommended Action</h4>
                <p className="text-sm text-gray-600">
                  {metric.recommendation}
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium mb-2">Trends</h4>
                <div className="text-sm text-gray-600 flex items-center">
                  <span 
                    className={`inline-block w-2 h-2 rounded-full mr-2 
                      ${metric.trend > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  ></span>
                  <span>
                    {metric.trendLabel}
                  </span>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="actions">
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Available Actions</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Select an action to take based on the current metrics.
                </p>
                {renderActionButtons()}
              </Card>
              
              {metric.title === 'TA Work Progress' && (
                <Card className="p-4">
                  <h4 className="font-medium mb-2">TA Performance</h4>
                  <div className="space-y-3">
                    {[
                      { name: "John Smith", progress: 92, status: "Excellent" },
                      { name: "Sarah Johnson", progress: 78, status: "Good" },
                      { name: "Mike Peterson", progress: 61, status: "Needs Improvement" }
                    ].map((ta) => (
                      <div key={ta.name} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{ta.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div 
                              className={`h-2.5 rounded-full ${
                                ta.progress > 80 ? 'bg-emerald-500' : 
                                ta.progress > 70 ? 'bg-blue-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${ta.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded ${
                          ta.status === "Excellent" ? 'bg-emerald-100 text-emerald-800' : 
                          ta.status === "Good" ? 'bg-blue-100 text-blue-800' : 
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {ta.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SideDrawer>
  );
};
