
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedToast } from '@/hooks/useUnifiedToast';
import { Users, UserPlus, Search, Filter, Shield } from 'lucide-react';
import { PersonaType, personaConfigs, getPersonaFromRoles } from '@/types/persona';
import { PersonaAssignmentCard } from './components/PersonaAssignmentCard';
import { PersonaUsersDrawer } from './components/PersonaUsersDrawer';
import { PersonaPermissionsDrawer } from './components/PersonaPermissionsDrawer';

interface UserWithProfile {
  id: string;
  email: string;
  user_profiles?: {
    first_name: string | null;
    last_name: string | null;
    department: string | null;
  };
  user_roles: Array<{
    role: PersonaType;
    is_active: boolean;
    assigned_at: string;
  }>;
  persona?: PersonaType;
}

interface PersonaUser {
  id: string;
  name: string;
  email: string;
  assignedAt: string;
}

// Database role mapping
type DatabaseRole = 'hr' | 'candidate' | 'interviewer' | 'vendor' | 'client-hr' | 'bo' | 'ams' | 'ta';

const mapToDbRole = (role: PersonaType): DatabaseRole => {
  return role as DatabaseRole;
};

const mapFromDbRole = (role: string): PersonaType => {
  return role as PersonaType;
};

export default function UserManagementPage() {
  const toast = useUnifiedToast();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  
  // Drawer states
  const [showUsersDrawer, setShowUsersDrawer] = useState(false);
  const [showPermissionsDrawer, setShowPermissionsDrawer] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<PersonaType | null>(null);
  const [personaUsers, setPersonaUsers] = useState<PersonaUser[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*');

      if (profilesError) throw profilesError;

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

          const activeRoles = (rolesData || [])
            .filter(role => role.is_active)
            .map(role => ({
              role: mapFromDbRole(role.role),
              is_active: role.is_active || false,
              assigned_at: role.assigned_at || ''
            }));

          const userPersona = getPersonaFromRoles(activeRoles.map(r => r.role));

          return {
            id: profile.user_id,
            email: profile.email || '',
            user_profiles: {
              first_name: profile.first_name,
              last_name: profile.last_name,
              department: profile.department
            },
            user_roles: activeRoles,
            persona: userPersona || undefined
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

  const assignPersona = async (userId: string, persona: PersonaType) => {
    try {
      const dbRole = mapToDbRole(persona);
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
        description: `Persona ${personaConfigs[persona].name} assigned successfully`
      });

      fetchUsers();
    } catch (error) {
      console.error('Error assigning persona:', error);
      toast.error({
        title: 'Error',
        description: 'Failed to assign persona'
      });
    }
  };

  const removePersona = async (userId: string, persona: PersonaType) => {
    try {
      const dbRole = mapToDbRole(persona);
      const { error } = await supabase
        .from('user_roles')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('role', dbRole);

      if (error) throw error;

      toast.success({
        title: 'Success',
        description: `Persona ${personaConfigs[persona].name} removed successfully`
      });

      fetchUsers();
    } catch (error) {
      console.error('Error removing persona:', error);
      toast.error({
        title: 'Error',
        description: 'Failed to remove persona'
      });
    }
  };

  const handleViewUsers = (persona: PersonaType) => {
    const usersWithPersona = users
      .filter(user => user.persona === persona)
      .map(user => ({
        id: user.id,
        name: `${user.user_profiles?.first_name || ''} ${user.user_profiles?.last_name || ''}`.trim() || user.email,
        email: user.email,
        assignedAt: user.user_roles.find(r => r.role === persona)?.assigned_at || ''
      }));
    
    setPersonaUsers(usersWithPersona);
    setCurrentPersona(persona);
    setShowUsersDrawer(true);
  };

  const handleManagePermissions = (persona: PersonaType) => {
    setCurrentPersona(persona);
    setShowPermissionsDrawer(true);
  };

  const handleSavePermissions = (persona: PersonaType) => {
    // This would typically save to a permissions configuration
    toast.success({
      title: 'Success',
      description: `Permissions updated for ${personaConfigs[persona].name}`
    });
  };

  const getPersonaCounts = () => {
    const counts: Record<PersonaType, number> = {} as Record<PersonaType, number>;
    Object.keys(personaConfigs).forEach(persona => {
      counts[persona as PersonaType] = users.filter(user => user.persona === persona).length;
    });
    return counts;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.user_profiles?.first_name} ${user.user_profiles?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPersona = selectedPersona === 'all' || user.persona === selectedPersona;

    return matchesSearch && matchesPersona;
  });

  const personaCounts = getPersonaCounts();

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
          subtitle="Manage user personas and permissions"
          actions={
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          }
        />

        <Tabs defaultValue="personas" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personas" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Personas
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Persona Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(personaConfigs).map(([key]) => (
                    <PersonaAssignmentCard
                      key={key}
                      persona={key as PersonaType}
                      userCount={personaCounts[key as PersonaType] || 0}
                      onViewUsers={handleViewUsers}
                      onManagePermissions={handleManagePermissions}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
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
                    <Label htmlFor="persona-filter">Filter by Persona</Label>
                    <Select value={selectedPersona} onValueChange={setSelectedPersona}>
                      <SelectTrigger>
                        <SelectValue placeholder="All personas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Personas</SelectItem>
                        {Object.entries(personaConfigs).map(([value, config]) => (
                          <SelectItem key={value} value={value}>{config.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                        {user.persona && (
                          <Badge className={personaConfigs[user.persona].color}>
                            {personaConfigs[user.persona].name}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Current Persona:</span>
                          {user.persona ? (
                            <Badge className={personaConfigs[user.persona].color}>
                              {personaConfigs[user.persona].name}
                            </Badge>
                          ) : (
                            <span className="text-sm text-gray-500">No persona assigned</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Assign Persona:</span>
                          <Select onValueChange={(persona) => assignPersona(user.id, persona as PersonaType)}>
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Select persona to assign" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(personaConfigs)
                                .filter(([persona]) => user.persona !== persona)
                                .map(([value, config]) => (
                                  <SelectItem key={value} value={value}>{config.name}</SelectItem>
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
          </TabsContent>
        </Tabs>

        {/* Drawers */}
        <PersonaUsersDrawer
          open={showUsersDrawer}
          onClose={() => setShowUsersDrawer(false)}
          persona={currentPersona}
          users={personaUsers}
          onRemoveUser={removePersona}
        />

        <PersonaPermissionsDrawer
          open={showPermissionsDrawer}
          onClose={() => setShowPermissionsDrawer(false)}
          persona={currentPersona}
          onSavePermissions={handleSavePermissions}
        />
      </motion.div>
    </ProtectedRoute>
  );
}
