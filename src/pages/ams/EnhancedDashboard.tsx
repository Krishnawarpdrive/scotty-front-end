
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  RefreshCw, 
  Filter, 
  Search, 
  Download, 
  Settings,
  Bell,
  Calendar,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { useDashboardShortcuts } from '@/hooks/useDashboardShortcuts';
import { useEnhancedAMSDashboard, DashboardFilters } from '@/hooks/useEnhancedAMSDashboard';
import { EnhancedKPICards } from './components/enhanced/EnhancedKPICards';
import { HiringTrendsChart } from './components/enhanced/HiringTrendsChart';
import { DepartmentMetricsChart } from './components/enhanced/DepartmentMetricsChart';
import { WorkloadDistributionChart } from './components/enhanced/WorkloadDistributionChart';
import { EnhancedActivityFeed } from './components/enhanced/EnhancedActivityFeed';

const EnhancedAMSDashboard: React.FC = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  const [filters, setFilters] = useState<DashboardFilters>({ dateRange: '30d' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const {
    data,
    isLoading,
    error,
    realTimeEnabled,
    lastUpdated,
    toggleRealTime,
    refreshData
  } = useEnhancedAMSDashboard(filters);

  // Set the scope when component mounts
  useEffect(() => {
    setCurrentScope('dashboard');
    return () => setCurrentScope('global');
  }, [setCurrentScope]);

  // Register dashboard specific shortcuts
  useDashboardShortcuts();

  const handleFilterChange = (key: keyof DashboardFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load dashboard</h3>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={refreshData}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-6"
    >
      {/* Header Section */}
      <motion.div variants={sectionVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AMS Dashboard</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600">Welcome back! Here's what's happening with your hiring process.</p>
            <Badge variant={realTimeEnabled ? "default" : "secondary"} className="flex items-center gap-1">
              <motion.div
                animate={realTimeEnabled ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className={`w-2 h-2 rounded-full ${realTimeEnabled ? 'bg-green-400' : 'bg-gray-400'}`}
              />
              {realTimeEnabled ? 'Live' : 'Offline'}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleRealTime}
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            {realTimeEnabled ? 'Disable' : 'Enable'} Live Updates
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-0 shadow-sm bg-gray-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Date Range
                    </label>
                    <Select
                      value={filters.dateRange}
                      onValueChange={(value) => handleFilterChange('dateRange', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                        <SelectItem value="1y">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Department
                    </label>
                    <Select
                      value={filters.department || 'all'}
                      onValueChange={(value) => handleFilterChange('department', value === 'all' ? undefined : value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Priority
                    </label>
                    <Select
                      value={filters.priority || 'all'}
                      onValueChange={(value) => handleFilterChange('priority', value === 'all' ? undefined : value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Status
                    </label>
                    <Select
                      value={filters.status || 'all'}
                      onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Buttons */}
      <motion.div variants={sectionVariants} className="flex flex-wrap gap-2">
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Client
        </Button>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Create Role
        </Button>
        <Button size="sm" variant="outline" className="gap-1">
          <Calendar className="h-4 w-4" /> Schedule Interview
        </Button>
        <Button size="sm" variant="outline" className="gap-1">
          <BarChart3 className="h-4 w-4" /> View Reports
        </Button>
        <Link to="/ams/hr/role-management">
          <Button size="sm" variant="outline" className="gap-1">
            <Settings className="h-4 w-4" /> Role Management
          </Button>
        </Link>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={sectionVariants}>
        <EnhancedKPICards 
          kpis={data?.kpis || []} 
          isLoading={isLoading} 
        />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={sectionVariants}>
          <HiringTrendsChart 
            data={data?.hiringTrends || []} 
            isLoading={isLoading} 
          />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <DepartmentMetricsChart 
            data={data?.departmentMetrics || []} 
            isLoading={isLoading} 
          />
        </motion.div>
      </div>

      {/* Secondary Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={sectionVariants} className="lg:col-span-1">
          <WorkloadDistributionChart 
            data={data?.workloadDistribution || []} 
            isLoading={isLoading} 
          />
        </motion.div>
        
        <motion.div variants={sectionVariants} className="lg:col-span-2">
          <EnhancedActivityFeed 
            activities={data?.recentActivity || []} 
            isLoading={isLoading} 
          />
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div variants={sectionVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data?.performanceMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
                >
                  <h4 className="font-medium text-gray-900">{metric.name}</h4>
                  <div className="text-2xl font-bold mt-2" style={{ color: metric.color }}>
                    {metric.value}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: metric.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              )) || []}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedAMSDashboard;
