
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { TAAssignmentManager } from './TAAssignmentManager';

export const TAManagementDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#009933]" />
              <div>
                <p className="text-sm text-gray-600">Active TAs</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Open Requirements</p>
                <p className="text-xl font-bold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Avg. Time to Fill</p>
                <p className="text-xl font-bold">14.2d</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#009933]" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-[#009933] hover:bg-[#007728]">
              New Assignment
            </Button>
            <Button variant="outline">
              View Workloads
            </Button>
            <Button variant="outline">
              Performance Report
            </Button>
            <Button variant="outline">
              TA Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#009933]" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Assignment Completed</p>
                  <p className="text-xs text-gray-600">John Doe completed React Developer role</p>
                </div>
                <Badge>Today</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Deadline Approaching</p>
                  <p className="text-xs text-gray-600">Senior Engineer role due in 2 days</p>
                </div>
                <Badge variant="destructive">Urgent</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New Requirement</p>
                  <p className="text-xs text-gray-600">Product Manager at TechCorp</p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">John Doe</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#009933] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Jane Smith</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#009933] h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mike Johnson</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#009933] h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Manager */}
      <TAAssignmentManager />
    </div>
  );
};
