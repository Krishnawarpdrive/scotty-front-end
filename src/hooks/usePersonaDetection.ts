
import { useState, useEffect } from 'react';
import { PersonaType, getPersonaFromRoles } from '@/types/persona';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const usePersonaDetection = () => {
  const { user } = useAuthContext();
  const [currentPersona, setCurrentPersona] = useState<PersonaType | null>(null);
  const [availablePersonas, setAvailablePersonas] = useState<PersonaType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCurrentPersona(null);
      setAvailablePersonas([]);
      setLoading(false);
      return;
    }

    fetchUserPersonas();
  }, [user]);

  const fetchUserPersonas = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data: rolesData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching user roles:', error);
        return;
      }

      const userRoles = rolesData?.map(r => r.role as PersonaType) || [];
      const primaryPersona = getPersonaFromRoles(userRoles);
      
      setAvailablePersonas(userRoles);
      setCurrentPersona(primaryPersona);
    } catch (error) {
      console.error('Error in fetchUserPersonas:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchPersona = (persona: PersonaType) => {
    if (availablePersonas.includes(persona)) {
      setCurrentPersona(persona);
    }
  };

  return {
    currentPersona,
    availablePersonas,
    loading,
    switchPersona,
    refetch: fetchUserPersonas
  };
};
