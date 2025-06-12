import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Calendar, 
  FileText, 
  Clock,
  CheckCircle,
  Users,
  Star,
  Award,
  Bell,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface CandidateRightDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}

export const CandidateRightDrawer: React.FC<CandidateRightDrawerProps> = ({ 
  open, 
  onOpenChange, 
  data 
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detailed Analytics & Insights</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4.7</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Interview Success Rate</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Time</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Profile Completeness</span>
                    <span>{data?.profile_completion_percentage || 0}%</span>
                  </div>
                  <Progress value={data?.profile_completion_percentage || 0} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Application Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Most Applied Industry</div>
                    <div className="text-sm text-gray-600">Technology</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">65%</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Preferred Location</div>
                    <div className="text-sm text-gray-600">San Francisco, CA</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Remote OK</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Average Application Time</div>
                    <div className="text-sm text-gray-600">2.4 hours</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">Fast</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Interview Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{data?.interviews_completed || 0}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{data?.interviews_scheduled || 0}</div>
                    <div className="text-xs text-gray-600">Scheduled</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">87%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Technical Interviews</span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Behavioral Interviews</span>
                    <span className="font-medium">4.6/5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Client Interviews</span>
                    <span className="font-medium">4.9/5.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-600" />
                Skills & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Top Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'].map((skill) => (
                      <Badge key={skill} className="bg-blue-100 text-blue-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Skill Gaps</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Docker</span>
                      <Badge className="bg-red-100 text-red-700">Missing</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Kubernetes</span>
                      <Badge className="bg-yellow-100 text-yellow-700">Basic</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Complete Docker certification to improve DevOps skills</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Add more open source projects to your portfolio</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                Recent Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '2 hours ago', action: 'Submitted application for Senior Developer role', type: 'application' },
                  { time: '1 day ago', action: 'Completed technical interview with TechCorp', type: 'interview' },
                  { time: '2 days ago', action: 'Uploaded updated resume', type: 'document' },
                  { time: '3 days ago', action: 'Profile updated with new skills', type: 'profile' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.action}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
