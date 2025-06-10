
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Settings, 
  Filter,
  RefreshCw,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { TAPoolPanel } from './TAPoolPanel';
import { ClientRoleAccordion } from './ClientRoleAccordion';
import { AssignmentSummaryPanel } from './AssignmentSummaryPanel';
import { BulkActionsPanel } from './BulkActionsPanel';
import { SmartRecommendationsPanel } from './SmartRecommendationsPanel';
import { PerformanceMetricsPanel } from './PerformanceMetricsPanel';
import { useTAMappingDragAndDrop } from './hooks/useTAMappingDragAndDrop';

export interface TAProfile {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience_years: number;
  current_workload: number;
  max_capacity: number;
  performance_score: number;
  availability_status: 'available' | 'busy' | 'unavailable';
  specializations: string[];
  location: string;
  timezone: string;
}

export interface ClientRole {
  id: string;
  client_name: string;
  role_name: string;
  requirements_count: number;
  priority: 'high' | 'medium' | 'low';
  skills_required: string[];
  assignment_status: 'unassigned' | 'partially_assigned' | 'fully_assigned';
  due_date: string;
  assigned_tas: string[];
}

export interface AssignmentMapping {
  id: string;
  ta_id: string;
  client_role_id: string;
  assignment_type: 'primary' | 'secondary' | 'backup';
  assigned_at: string;
  workload_percentage: number;
  status: 'active' | 'pending' | 'completed';
}

export const TAMappingInterface: React.FC = () => {
  const [selectedTAs, setSelectedTAs] = useState<string[]>([]);
  const [expandedClients, setExpandedClients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('mapping');
  const [filterCriteria, setFilterCriteria] = useState({
    availability: 'all',
    skills: '',
    workload: 'all'
  });

  const {
    taProfiles,
    clientRoles,
    assignments,
    recommendations,
    performanceMetrics,
    handleDrop,
    handleBulkAssignment,
    handleRemoveAssignment,
    isLoading,
    refreshData
  } = useTAMappingDragAndDrop();

  const handleTASelection = useCallback((taId: string, isSelected: boolean) => {
    setSelectedTAs(prev => 
      isSelected 
        ? [...prev, taId]
        : prev.filter(id => id !== taId)
    );
  }, []);

  const handleClientExpansion = useCallback((clientId: string, isExpanded: boolean) => {
    setExpandedClients(prev => 
      isExpanded 
        ? [...prev, clientId]
        : prev.filter(id => id !== clientId)
    );
  }, []);

  const getAssignmentStats = () => {
    const totalRoles = clientRoles.length;
    const fullyAssigned = clientRoles.filter(role => role.assignment_status === 'fully_assigned').length;
    const partiallyAssigned = clientRoles.filter(role => role.assignment_status === 'partially_assigned').length;
    const unassigned = clientRoles.filter(role => role.assignment_status === 'unassigned').length;

    return { totalRoles, fullyAssigned, partiallyAssigned, unassigned };
  };

  const stats = getAssignmentStats();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header with Stats */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">TA Mapping Interface</h1>
            <p className="text-gray-600">Assign talent acquisition specialists to client roles using drag & drop</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Fully Assigned</p>
                  <p className="text-xl font-bold text-green-600">{stats.fullyAssigned}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Partially Assigned</p>
                  <p className="text-xl font-bold text-yellow-600">{stats.partiallyAssigned}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Unassigned</p>
                  <p className="text-xl font-bold text-red-600">{stats.unassigned}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Roles</p>
                  <p className="text-xl font-bold text-blue-600">{stats.totalRoles}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mapping">Drag & Drop Mapping</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Actions</TabsTrigger>
            <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
            <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="mapping" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* TA Pool Panel */}
              <div className="lg:col-span-1">
                <TAPoolPanel
                  taProfiles={taProfiles}
                  selectedTAs={selectedTAs}
                  onTASelection={handleTASelection}
                  filterCriteria={filterCriteria}
                  onFilterChange={setFilterCriteria}
                />
              </div>

              {/* Client-Role Accordion */}
              <div className="lg:col-span-2">
                <ClientRoleAccordion
                  clientRoles={clientRoles}
                  assignments={assignments}
                  expandedClients={expandedClients}
                  onClientExpansion={handleClientExpansion}
                  onDrop={handleDrop}
                  onRemoveAssignment={handleRemoveAssignment}
                />
              </div>

              {/* Assignment Summary */}
              <div className="lg:col-span-1">
                <AssignmentSummaryPanel
                  assignments={assignments}
                  taProfiles={taProfiles}
                  clientRoles={clientRoles}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6">
            <BulkActionsPanel
              selectedTAs={selectedTAs}
              clientRoles={clientRoles}
              onBulkAssignment={handleBulkAssignment}
            />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <SmartRecommendationsPanel
              recommendations={recommendations}
              taProfiles={taProfiles}
              clientRoles={clientRoles}
              onApplyRecommendation={handleDrop}
            />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceMetricsPanel
              performanceMetrics={performanceMetrics}
              assignments={assignments}
              taProfiles={taProfiles}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  );
};
