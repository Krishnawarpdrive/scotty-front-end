
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { SmartLoading } from "@/components/feedback/SmartLoadingStates";
import { useEnhancedToast } from "@/components/feedback/EnhancedToast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DailyMetrics } from "./DailyMetrics";
import { ApplicationStages } from "./ApplicationStages";
import { ApplicationActions } from "./ApplicationActions";
import { EnhancedApplicationTable } from "./enhanced/EnhancedApplicationTable";
import { InterviewDashboard } from "./interview-management/InterviewDashboard";
import { CompactInterviewDashboard } from "./interview-management/CompactInterviewDashboard";
import { RefreshCw, Filter, Download, Plus } from "lucide-react";

export const EnhancedMissionControl: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const toast = useEnhancedToast();

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastUpdated(new Date());
      toast.success({
        title: "Data refreshed successfully",
        description: "All metrics and applications have been updated"
      });
    } catch (error) {
      toast.error({
        title: "Failed to refresh data",
        description: "Please try again in a moment"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const pageActions = (
    <>
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleRefresh}
        disabled={isLoading}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
      <Button size="sm">
        <Plus className="h-4 w-4 mr-2" />
        New Application
      </Button>
    </>
  );

  const statusBadge = {
    label: `Updated ${lastUpdated.toLocaleTimeString()}`,
    variant: 'outline' as const
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="TA Mission Control"
        subtitle="Manage recruitment pipeline and track application progress"
        actions={pageActions}
        badge={statusBadge}
      />

      {/* Quick Stats Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Applications</p>
                <p className="text-2xl font-bold text-blue-600">42</p>
              </div>
              <Badge variant="secondary">+5 today</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interviews Scheduled</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <Badge variant="secondary">3 today</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-yellow-600">8</p>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Offers Extended</p>
                <p className="text-2xl font-bold text-purple-600">6</p>
              </div>
              <Badge variant="secondary">2 accepted</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <DailyMetrics />
      <ApplicationStages />
      <ApplicationActions />
      
      {/* Interview Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <InterviewDashboard />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CompactInterviewDashboard />
        </motion.div>
      </div>
      
      <SmartLoading state={isLoading ? 'loading' : 'idle'} variant="table" />
      {!isLoading && <EnhancedApplicationTable />}
    </motion.div>
  );
};
