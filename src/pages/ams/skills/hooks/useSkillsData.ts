
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Skill {
  id: string;
  name: string;
  category: string;
  popularity: number;
  created_at: string;
}

export const useSkillsData = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<{ column: string; direction: 'asc' | 'desc' }>({
    column: 'name',
    direction: 'asc'
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [popularityFilter, setPopularityFilter] = useState<[number, number]>([0, 100]);
  const [nameFilter, setNameFilter] = useState('');

  // Fetch skills from Supabase
  useEffect(() => {
    fetchSkills();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [skills, searchTerm, nameFilter, categoryFilter, popularityFilter]);
  
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*');
      
      if (error) throw error;

      setSkills(data as Skill[]);
      setFilteredSkills(data as Skill[]);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: 'Error',
        description: 'Failed to load skills data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...skills];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (skill.category && skill.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply name filter
    if (nameFilter) {
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter.length > 0) {
      filtered = filtered.filter(skill => 
        categoryFilter.includes(skill.category || 'Uncategorized')
      );
    }

    // Apply popularity filter
    filtered = filtered.filter(skill => {
      const popularity = skill.popularity || 0;
      return popularity >= popularityFilter[0] && popularity <= popularityFilter[1];
    });

    // Apply sorting
    filtered = sortSkills(filtered);

    setFilteredSkills(filtered);
  };

  const sortSkills = (skillsToSort: Skill[]) => {
    return [...skillsToSort].sort((a, b) => {
      const aValue = a[sort.column as keyof Skill];
      const bValue = b[sort.column as keyof Skill];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    setSort({ column, direction });

    const sorted = sortSkills(filteredSkills);
    setFilteredSkills(sorted);
  };

  const handleSelectSkill = (skillId: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const handleSelectAllSkills = () => {
    if (selectedSkills.length === filteredSkills.length) {
      setSelectedSkills([]);
    } else {
      setSelectedSkills(filteredSkills.map(skill => skill.id));
    }
  };

  const resetFilters = () => {
    setNameFilter('');
    setCategoryFilter([]);
    setPopularityFilter([0, 100]);
    setSearchTerm('');
  };

  const addSkill = async (skillData: { name: string; category: string }) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([
          { 
            name: skillData.name,
            category: skillData.category,
            popularity: 0,
          }
        ])
        .select();
      
      if (error) throw error;
      
      // Add the new skill to the list
      if (data && data.length > 0) {
        const newSkill = data[0] as Skill;
        setSkills(prev => [...prev, newSkill]);
        return newSkill;
      }
      
      return null;
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add skill',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Prepare data for the table
  const sortedSkills = filteredSkills;

  return {
    searchTerm,
    setSearchTerm,
    sortedSkills,
    selectedSkills,
    loading,
    nameFilter,
    setNameFilter,
    categoryFilter,
    setCategoryFilter,
    popularityFilter,
    setPopularityFilter,
    resetFilters,
    handleSort,
    handleSelectSkill,
    handleSelectAllSkills,
    addSkill
  };
};
