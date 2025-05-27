
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Eye, Edit, Archive, Users, Calendar, DollarSign } from 'lucide-react';
import { InteractiveCardContainer } from '../animations/InteractiveCardContainer';
import { UniversalCommentingSystem } from '../commenting/UniversalCommentingSystem';

interface Role {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'paused' | 'closed';
  requirements: Requirement[];
  totalVacancies: number;
  filledPositions: number;
  budget: number;
  deadline: Date;
}

interface Requirement {
  id: string;
  name: string;
  roleId: string;
  status: 'open' | 'in_progress' | 'closed' | 'on_hold';
  priority: 'high' | 'medium' | 'low';
  vacancies: number;
  assignedTo?: string;
  dueDate?: Date;
  budgetVariance?: string;
  experienceVariance?: string;
  customJD?: string;
  progress: {
    sourced: number;
    screened: number;
    interviewed: number;
    offered: number;
    hired: number;
  };
}

interface RoleRequirementsIntegrationProps {
  roles: Role[];
  onCreateRole?: () => void;
  onCreateRequirement?: (roleId: string) => void;
  onEditRole?: (role: Role) => void;
  onEditRequirement?: (requirement: Requirement) => void;
}

export const RoleRequirementsIntegration: React.FC<RoleRequirementsIntegrationProps> = ({
  roles,
  onCreateRole,
  onCreateRequirement,
  onEditRole,
  onEditRequirement
}) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'open': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
      case 'on_hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateRoleProgress = (role: Role) => {
    const totalProgress = role.requirements.reduce((sum, req) => 
      sum + req.progress.hired, 0
    );
    return Math.round((totalProgress / role.totalVacancies) * 100);
  };

  const RequirementCard: React.FC<{ requirement: Requirement; role: Role }> = ({ requirement, role }) => (
    <InteractiveCardContainer hoverEffect="lift">
      <Card className="h-full">
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{requirement.name}</h4>
              <p className="text-sm text-gray-600">{role.name} • {role.client}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Badge variant="outline" className={getStatusColor(requirement.status)}>
                {requirement.status.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(requirement.priority)}>
                {requirement.priority}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Vacancies:</span>
              <span className="font-medium ml-1">{requirement.vacancies}</span>
            </div>
            <div>
              <span className="text-gray-600">Hired:</span>
              <span className="font-medium ml-1">{requirement.progress.hired}</span>
            </div>
          </div>
          
          {/* Progress Pipeline */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600">Candidate Pipeline</div>
            <div className="grid grid-cols-5 gap-1 text-xs">
              <div className="text-center">
                <div className="bg-blue-100 rounded px-1 py-1">
                  <div className="font-medium">{requirement.progress.sourced}</div>
                  <div className="text-gray-600">Sourced</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded px-1 py-1">
                  <div className="font-medium">{requirement.progress.screened}</div>
                  <div className="text-gray-600">Screened</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded px-1 py-1">
                  <div className="font-medium">{requirement.progress.interviewed}</div>
                  <div className="text-gray-600">Interview</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded px-1 py-1">
                  <div className="font-medium">{requirement.progress.offered}</div>
                  <div className="text-gray-600">Offered</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded px-1 py-1">
                  <div className="font-medium">{requirement.progress.hired}</div>
                  <div className="text-gray-600">Hired</div>
                </div>
              </div>
            </div>
          </div>
          
          {requirement.assignedTo && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Assigned to:</span>
              <span className="font-medium">{requirement.assignedTo}</span>
            </div>
          )}
          
          {requirement.dueDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Due:</span>
              <span className="font-medium">{requirement.dueDate.toLocaleDateString()}</span>
            </div>
          )}
          
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onEditRequirement?.(requirement)}
              className="flex-1"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </InteractiveCardContainer>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Role & Requirements Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCreateRole}>
            <Plus className="h-4 w-4 mr-2" />
            New Role
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">All Requirements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InteractiveCardContainer 
                  hoverEffect="glow"
                  onCardClick={() => setSelectedRole(role)}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <p className="text-sm text-gray-600">{role.client}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(role.status)}>
                          {role.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Requirements</div>
                          <div className="font-semibold">{role.requirements.length}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Vacancies</div>
                          <div className="font-semibold">{role.totalVacancies}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Filled</div>
                          <div className="font-semibold text-green-600">{role.filledPositions}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Progress</div>
                          <div className="font-semibold">{calculateRoleProgress(role)}%</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onCreateRequirement?.(role.id)}
                          className="flex-1"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Req
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onEditRole?.(role)}
                          className="flex-1"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </InteractiveCardContainer>
              </motion.div>
            ))}
          </div>

          {/* Selected Role Detail */}
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedRole.name} - Requirements</span>
                    <Button 
                      size="sm"
                      onClick={() => onCreateRequirement?.(selectedRole.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedRole.requirements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedRole.requirements.map(requirement => (
                        <RequirementCard 
                          key={requirement.id} 
                          requirement={requirement} 
                          role={selectedRole} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No requirements created yet for this role.</p>
                      <Button 
                        className="mt-4"
                        onClick={() => onCreateRequirement?.(selectedRole.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Requirement
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Comments for selected role */}
              <UniversalCommentingSystem
                entityType="role"
                entityId={selectedRole.id}
                title={`Comments for ${selectedRole.name}`}
                allowReplies={true}
                allowReactions={true}
                allowPrivateComments={true}
              />
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.flatMap(role => 
              role.requirements.map(requirement => (
                <RequirementCard 
                  key={requirement.id} 
                  requirement={requirement} 
                  role={role} 
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Analytics dashboard coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
