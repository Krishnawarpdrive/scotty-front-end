
import React, { useState } from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, User, Calendar, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface PipelineDetailSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage: string | null;
  data: any;
}

export const PipelineDetailSidebar: React.FC<PipelineDetailSidebarProps> = ({
  open,
  onOpenChange,
  stage,
  data
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  if (!stage || !data) return null;

  // Filter candidates based on search term
  const filteredCandidates = data.candidates?.filter((candidate: any) => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    candidate.ta.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Determine health status for the stage
  const getHealthStatus = () => {
    if (data.avgDaysInStage > 7) return 'critical';
    if (data.avgDaysInStage > 4) return 'warning';
    return 'good';
  };
  
  const healthStatus = getHealthStatus();

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`${stage} Stage Details`}
      subtitle={`${data.count} candidates in this stage`}
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Stage Summary Card */}
        <Card className="p-4 border-l-4 mb-6" 
          style={{ borderLeftColor: 
            healthStatus === 'critical' ? '#ef4444' :
            healthStatus === 'warning' ? '#f59e0b' : 
            '#10b981'
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold mb-1">{stage} Stage Overview</h3>
              <p className="text-sm text-gray-600">
                Average time in stage: <span className={`font-medium ${
                  healthStatus === 'critical' ? 'text-red-600' : 
                  healthStatus === 'warning' ? 'text-amber-600' : 
                  'text-emerald-600'
                }`}>{data.avgDaysInStage} days</span>
              </p>
            </div>
            <div>
              {healthStatus === 'critical' && 
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Critical Attention Needed
                </Badge>
              }
              {healthStatus === 'warning' && 
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Attention Needed
                </Badge>
              }
              {healthStatus === 'good' && 
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  On Track
                </Badge>
              }
            </div>
          </div>
        </Card>

        {/* TA Workload Section */}
        <div>
          <h3 className="font-semibold mb-3">TA Workload</h3>
          <div className="space-y-3 mb-6">
            {data.taDistribution?.map((ta: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{ta.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{ta.name}</h4>
                    <p className="text-xs text-gray-500">{ta.count} candidates</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {ta.overloaded && (
                    <Badge variant="destructive" className="text-xs">Overloaded</Badge>
                  )}
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Message
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Candidates Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Candidates ({filteredCandidates.length})</h3>
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
          </div>
          
          <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
            <TabsList className="mb-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="atRisk">At Risk</TabsTrigger>
              <TabsTrigger value="onTrack">On Track</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-3">
            {filteredCandidates
              .filter((candidate: any) => {
                if (activeTab === 'all') return true;
                if (activeTab === 'atRisk') return candidate.daysInStage >= 5;
                if (activeTab === 'onTrack') return candidate.daysInStage < 5;
                return true;
              })
              .map((candidate: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{candidate.name}</h4>
                        <p className="text-sm text-gray-500">Assigned to: {candidate.ta}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center text-xs px-2 py-1 rounded ${
                        candidate.daysInStage > 7 ? 'bg-red-100 text-red-800' :
                        candidate.daysInStage > 4 ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {candidate.daysInStage} days in stage
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      Message TA
                    </Button>
                    <Button size="sm" variant={candidate.daysInStage > 5 ? "default" : "outline"} className="flex items-center gap-1">
                      {candidate.daysInStage > 5 ? (
                        <>
                          <AlertCircle className="h-3 w-3" />
                          Take Action
                        </>
                      ) : (
                        <>
                          <Calendar className="h-3 w-3" />
                          Schedule
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
              
            {filteredCandidates.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No candidates match your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};
