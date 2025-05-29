
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ClientHiringData {
  id: string;
  name: string;
  totalHires: number;
  targetHires: number;
  completionRate: number;
  averageTimeToHire: number;
  activeDepartments: string[];
  monthlyHires: Array<{
    month: string;
    hires: number;
    target: number;
  }>;
  departmentBreakdown: Array<{
    department: string;
    hires: number;
    color: string;
  }>;
}

interface ClientWiseHiringBreakdownProps {
  data: ClientHiringData[];
  isLoading: boolean;
}

export const ClientWiseHiringBreakdown: React.FC<ClientWiseHiringBreakdownProps> = ({
  data,
  isLoading
}) => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle>Client-wise Hiring Breakdown</CardTitle>
          <CardDescription>Comprehensive hiring analytics by client</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-pulse">
            <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const selectedClientData = selectedClient ? data.find(c => c.id === selectedClient) : data[0];

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Client-wise Hiring Breakdown</CardTitle>
        <CardDescription>Comprehensive hiring analytics by client</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <Tabs defaultValue="overview" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="h-64 overflow-y-auto">
            <div className="space-y-4">
              {data.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedClient(client.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{client.name}</h4>
                    <Badge variant={client.completionRate >= 80 ? 'default' : 'secondary'}>
                      {client.completionRate}% Complete
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{client.totalHires}</div>
                      <div className="text-xs text-gray-500">Total Hires</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{client.targetHires}</div>
                      <div className="text-xs text-gray-500">Target</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{client.averageTimeToHire}d</div>
                      <div className="text-xs text-gray-500">Avg Time</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Target</span>
                      <span>{client.totalHires}/{client.targetHires}</span>
                    </div>
                    <Progress value={client.completionRate} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {client.activeDepartments.map(dept => (
                      <Badge key={dept} variant="outline" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="h-64">
            {selectedClientData && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedClientData.monthlyHires}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hires" fill="#3b82f6" name="Actual Hires" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          
          <TabsContent value="departments" className="h-64">
            {selectedClientData && (
              <div className="flex h-full">
                <div className="w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={selectedClientData.departmentBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="hires"
                      >
                        {selectedClientData.departmentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-2 pt-4">
                  {selectedClientData.departmentBreakdown.map(dept => (
                    <div key={dept.department} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                      <span className="text-sm text-gray-600">{dept.department}</span>
                      <span className="text-sm font-semibold ml-auto">{dept.hires}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
