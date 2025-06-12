
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
      // Map roles to the database enum values, filtering out invalid ones
      const validDbRoles = ['hr', 'ta', 'candidate', 'vendor', 'interviewer', 'client-hr', 'bo'];
      const dbRoles = roles
        .map(role => {
          switch (role) {
            case 'admin': return 'hr';
            case 'user': return 'candidate';
            case 'manager': return 'hr';
            case 'executive': return 'hr';
            default: return role;
          }
        })
        .filter(role => validDbRoles.includes(role));

      if (dbRoles.length === 0) {
        setLoading(false);
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
        .in('role', dbRoles);

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
