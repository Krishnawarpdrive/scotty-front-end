
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BriefcaseIcon, 
  UsersIcon, 
  AlertTriangleIcon,
  PlusIcon
} from 'lucide-react';

interface RoleOwnership {
  id: string;
  roleName: string;
  vendorName?: string;
  vacancies: number;
  filledPositions: number;
  candidatesInPipeline: number;
  status: 'Assigned' | 'Unassigned' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
}

interface ClientRoleOwnershipProps {
  roles: RoleOwnership[];
  onAssignVendor: (roleId: string) => void;
}

export const ClientRoleOwnership: React.FC<ClientRoleOwnershipProps> = ({
  roles,
  onAssignVendor
}) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Assigned': return 'default';
      case 'Unassigned': return 'destructive';
      case 'Completed': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const unassignedRoles = roles.filter(role => role.status === 'Unassigned');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5 text-primary" />
          Role Ownership
          {unassignedRoles.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unassignedRoles.length} unassigned
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 border rounded-lg ${
              role.status === 'Unassigned' ? 'border-red-200 bg-red-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{role.roleName}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {role.vendorName ? (
                    <span>Assigned to: {role.vendorName}</span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <AlertTriangleIcon className="h-3 w-3" />
                      Unassigned
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getPriorityBadgeVariant(role.priority)}>
                  {role.priority}
                </Badge>
                <Badge variant={getStatusBadgeVariant(role.status)}>
                  {role.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{role.vacancies}</div>
                <div className="text-xs text-gray-500">Vacancies</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{role.filledPositions}</div>
                <div className="text-xs text-gray-500">Filled</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{role.candidatesInPipeline}</div>
                <div className="text-xs text-gray-500">In Pipeline</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900">
                  {role.filledPositions}/{role.vacancies} filled
                </span>
              </div>
              <Progress 
                value={(role.filledPositions / role.vacancies) * 100} 
                className="h-2" 
              />
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Deadline: {role.deadline}
              </div>
              {role.status === 'Unassigned' && (
                <Button 
                  size="sm" 
                  onClick={() => onAssignVendor(role.id)}
                  className="h-7 text-xs"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Assign Vendor
                </Button>
              )}
            </div>
          </motion.div>
        ))}

        {roles.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No roles available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
