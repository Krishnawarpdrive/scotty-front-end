import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';
import { Users, UserPlus, Search, Filter } from 'lucide-react';
import { AppRole } from '@/contexts/AuthContext';

interface UserWithProfile {
  id: string;
  email: string;
  user_profiles?: {
    first_name: string | null;
    last_name: string | null;
    department: string | null;
  };
  user_roles: Array<{
    role: AppRole;
    is_active: boolean;
    assigned_at: string;
  }>;
}

// Database role mapping - ensure these match your database enum
type DatabaseRole = 'hr' | 'candidate' | 'interviewer' | 'vendor' | 'client-hr' | 'bo' | 'ams' | 'ta';

const roleLabels: Record<AppRole, string> = {
  hr: 'HR Manager',
  candidate: 'Candidate',
  interviewer: 'Interviewer',
  admin: 'Admin',
  user: 'User',
  manager: 'Manager',
  executive: 'Executive'
};

// Map AppRole to DatabaseRole
const mapToDbRole = (role: AppRole): DatabaseRole => {
  switch (role) {
    case 'admin': return 'hr';
    case 'user': return 'candidate';
    case 'manager': return 'hr';
    case 'executive': return 'hr';
    default: return role as DatabaseRole;
  }
};

// Map DatabaseRole to AppRole
const mapFromDbRole = (role: string): AppRole => {
  switch (role) {
    case 'ams': return 'admin';
    case 'ta': return 'manager';
    default: return role as AppRole;
  }
};

export default function UserManagementPage() {
  const toast = useEnhancedToast();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // First fetch user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*');

      if (profilesError) {
        throw profilesError;
      }

      // Then fetch user roles for each user
      const usersWithRoles = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: rolesData, error: rolesError } = await supabase
            .from('user_roles')
            .select('role, is_active, assigned_at')
            .eq('user_id', profile.user_id);

          if (rolesError) {
            console.error('Error fetching roles for user:', profile.user_id, rolesError);
            return {
              id: profile.user_id,
              email: profile.email || '',
              user_profiles: {
                first_name: profile.first_name,
                last_name: profile.last_name,
                department: profile.department
              },
              user_roles: []
            };
          }

          return {
            id: profile.user_id,
            email: profile.email || '',
            user_profiles: {
              first_name: profile.first_name,
              last_name: profile.last_name,
              department: profile.department
            },
            user_roles: (rolesData || []).map(role => ({
              role: mapFromDbRole(role.role),
              is_active: role.is_active || false,
              assigned_at: role.assigned_at || ''
            }))
          };
        })
      );

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error({
        title: 'Error',
        description: 'Failed to fetch users'
      });
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async (userId: string, role: AppRole) => {
    try {
      const dbRole = mapToDbRole(role);
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: dbRole,
          assigned_by: 'admin'
        });

      if (error) throw error;

      toast.success({
        title: 'Success',
        description: `Role ${roleLabels[role]} assigned successfully`
      });

      fetchUsers();
    } catch (error) {
      console.error('Error assigning role:', error);
      toast.error({
        title: 'Error',
        description: 'Failed to assign role'
      });
    }
  };

  const removeRole = async (userId: string, role: AppRole) => {
    try {
      const dbRole = mapToDbRole(role);
      const { error } = await supabase
        .from('user_roles')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('role', dbRole);

      if (error) throw error;

      toast.success({
        title: 'Success',
        description: `Role ${roleLabels[role]} removed successfully`
      });

      fetchUsers();
    } catch (error) {
      console.error('Error removing role:', error);
      toast.error({
        title: 'Error',
        description: 'Failed to remove role'
      });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.user_profiles?.first_name} ${user.user_profiles?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'all' || 
      user.user_roles.some(ur => ur.role === selectedRole && ur.is_active);

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <ProtectedRoute requiredRoles={['admin']}>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="User Management"
          subtitle="Manage user roles and permissions"
          actions={
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          }
        />

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-filter">Filter by Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="All roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {Object.entries(roleLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Users ({filteredUsers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        {user.user_profiles?.first_name} {user.user_profiles?.last_name}
                      </h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.user_profiles?.department && (
                        <p className="text-sm text-gray-500">{user.user_profiles.department}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Current Roles:</span>
                      <div className="flex flex-wrap gap-2">
                        {user.user_roles
                          .filter(ur => ur.is_active)
                          .map((userRole) => (
                            <Badge key={userRole.role} variant="secondary" className="flex items-center space-x-1">
                              <span>{roleLabels[userRole.role]}</span>
                              <button
                                onClick={() => removeRole(user.id, userRole.role)}
                                className="ml-1 text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        {user.user_roles.filter(ur => ur.is_active).length === 0 && (
                          <span className="text-sm text-gray-500">No active roles</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Assign Role:</span>
                      <Select onValueChange={(role) => assignRole(user.id, role as AppRole)}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select role to assign" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(roleLabels)
                            .filter(([role]) => !user.user_roles.some(ur => ur.role === role && ur.is_active))
                            .map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No users found matching your criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </ProtectedRoute>
  );
}
