
import { useState, useMemo, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Skill {
  id: string;
  name: string;
  category: string;
  popularity: number;
  created_at: string;
  aliases?: string[];
}

export const useSkillsData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({
    name: [],
    category: [],
    popularity: [],
    created_at: []
  });
  const [columnSearchTerms, setColumnSearchTerms] = useState<Record<string, string>>({
    name: '',
    category: '',
    popularity: '',
    created_at: ''
  });

  // Fetch skills data from Supabase
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        // Transform data to match our Skill interface
        const transformedData = data.map(skill => ({
          ...skill,
          aliases: [], // We don't have aliases in the database yet
          usageCount: skill.popularity || 0,
          dateAdded: skill.created_at
        }));
        
        setSkills(transformedData);
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast({
          title: "Error",
          description: "Failed to load skills data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [toast]);

  // Filter skills based on search term and column filters
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      // Main search filter
      const matchesSearch = searchTerm === '' || 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Column filters
      const matchesNameFilter = columnFilters.name.length === 0 || 
        columnFilters.name.some(filter => skill.name.includes(filter));
      
      const matchesCategoryFilter = columnFilters.category.length === 0 || 
        columnFilters.category.includes(skill.category);
      
      // Add other column filters as needed
      
      return matchesSearch && matchesNameFilter && matchesCategoryFilter;
    });
  }, [searchTerm, columnFilters, skills]);

  // Sort skills based on selected column and direction
  const sortedSkills = useMemo(() => {
    return [...filteredSkills].sort((a, b) => {
      if (!sortColumn) return 0;
      
      const compareValue = (col: string) => {
        switch (col) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'category':
            return (a.category || '').localeCompare(b.category || '');
          case 'popularity':
            return (a.popularity || 0) - (b.popularity || 0);
          case 'created_at':
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          default:
            return 0;
        }
      };
  
      return sortDirection === 'asc' 
        ? compareValue(sortColumn) 
        : -compareValue(sortColumn);
    });
  }, [filteredSkills, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectSkill = (id: string) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter(skillId => skillId !== id));
    } else {
      setSelectedSkills([...selectedSkills, id]);
    }
  };

  const handleSelectAllSkills = () => {
    if (selectedSkills.length === sortedSkills.length) {
      setSelectedSkills([]);
    } else {
      setSelectedSkills(sortedSkills.map(skill => skill.id));
    }
  };
  
  // Handle column filter changes
  const handleColumnFilterChange = (column: string, value: string) => {
    if (columnFilters[column].includes(value)) {
      setColumnFilters({
        ...columnFilters,
        [column]: columnFilters[column].filter(item => item !== value)
      });
    } else {
      setColumnFilters({
        ...columnFilters,
        [column]: [...columnFilters[column], value]
      });
    }
  };
  
  // Clear all filters for a column
  const clearColumnFilter = (column: string) => {
    setColumnFilters({
      ...columnFilters,
      [column]: []
    });
    setColumnSearchTerms({
      ...columnSearchTerms,
      [column]: ''
    });
  };
  
  // Update column search term
  const handleColumnSearchChange = (column: string, value: string) => {
    setColumnSearchTerms({
      ...columnSearchTerms,
      [column]: value
    });
  };

  // Add new skill to database
  const addSkill = async (skill: { name: string; category: string }) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([{ 
          name: skill.name,
          category: skill.category,
          popularity: 0
        }])
        .select();

      if (error) throw error;
      
      // Add to local state if successful
      if (data && data[0]) {
        setSkills([...skills, {
          ...data[0],
          aliases: [],
          usageCount: 0,
          dateAdded: data[0].created_at
        }]);

        toast({
          title: "Success",
          description: `Skill "${skill.name}" has been added.`,
        });
      }
      
      return data?.[0];
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    sortColumn,
    sortDirection,
    selectedSkills,
    columnFilters,
    columnSearchTerms,
    sortedSkills,
    loading,
    handleSort,
    handleSelectSkill,
    handleSelectAllSkills,
    handleColumnFilterChange,
    clearColumnFilter,
    handleColumnSearchChange,
    addSkill
  };
};
