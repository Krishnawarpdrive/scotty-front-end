
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string | null;
  created_at: string;
}

// Database role types
type DatabaseRole = 'hr' | 'candidate' | 'interviewer' | 'ta' | 'vendor' | 'client-hr' | 'bo';

export function usePermissions() {
  const { user, roles, loading: authLoading } = useAuth();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user && roles.length > 0) {
      fetchPermissions();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, roles, authLoading]);

  const fetchPermissions = async () => {
    try {
      // Map AppRole types to database role types
      const validRoles: DatabaseRole[] = roles
        .map(role => {
          // Map AppRole to DatabaseRole
          if (role === 'admin') return 'hr';
          if (role === 'user') return null; // Skip user role
          if (role === 'manager') return 'hr';
          if (role === 'executive') return 'hr';
          return role as DatabaseRole;
        })
        .filter((role): role is DatabaseRole => 
          role !== null && ['hr', 'candidate', 'interviewer', 'ta', 'vendor', 'client-hr', 'bo'].includes(role)
        );

      if (validRoles.length === 0) {
        setPermissions([]);
        return;
      }

      const { data, error } = await supabase
        .from('role_permissions')
        .select(`
          permission_id,
          permissions (
            id,
            name,
            resource,
            action,
            description,
            created_at
          )
        `)
        .in('role', validRoles);

      if (error) {
        console.error('Error fetching permissions:', error);
        return;
      }

      const userPermissions = data?.map(rp => rp.permissions).filter(Boolean) || [];
      setPermissions(userPermissions as Permission[]);
    } catch (error) {
      console.error('Error in fetchPermissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (resource: string, action: string): boolean => {
    return permissions.some(p => p.resource === resource && p.action === action);
  };

  const canRead = (resource: string): boolean => hasPermission(resource, 'read');
  const canWrite = (resource: string): boolean => hasPermission(resource, 'write');
  const canDelete = (resource: string): boolean => hasPermission(resource, 'delete');

  return {
    permissions,
    loading: loading || authLoading,
    hasPermission,
    canRead,
    canWrite,
    canDelete,
    refetch: fetchPermissions
  };
}
