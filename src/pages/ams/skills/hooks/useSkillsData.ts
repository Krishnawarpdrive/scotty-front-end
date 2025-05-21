
import { useState, useMemo } from 'react';
import { Skill, mockSkills } from '../data/mockData';

export const useSkillsData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({
    name: [],
    category: [],
    usageCount: [],
    dateAdded: []
  });
  const [columnSearchTerms, setColumnSearchTerms] = useState<Record<string, string>>({
    name: '',
    category: '',
    usageCount: '',
    dateAdded: ''
  });

  // Filter skills based on search term and column filters
  const filteredSkills = useMemo(() => {
    return mockSkills.filter((skill) => {
      // Main search filter
      const matchesSearch = searchTerm === '' || 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Column filters
      const matchesNameFilter = columnFilters.name.length === 0 || 
        columnFilters.name.some(filter => skill.name.includes(filter));
      
      const matchesCategoryFilter = columnFilters.category.length === 0 || 
        columnFilters.category.includes(skill.category);
      
      // Add other column filters as needed
      
      return matchesSearch && matchesNameFilter && matchesCategoryFilter;
    });
  }, [searchTerm, columnFilters]);

  // Sort skills based on selected column and direction
  const sortedSkills = useMemo(() => {
    return [...filteredSkills].sort((a, b) => {
      if (!sortColumn) return 0;
      
      const compareValue = (col: string) => {
        switch (col) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'category':
            return a.category.localeCompare(b.category);
          case 'usageCount':
            return a.usageCount - b.usageCount;
          case 'dateAdded':
            return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
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

  const handleSelectSkill = (id: number) => {
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

  return {
    searchTerm,
    setSearchTerm,
    sortColumn,
    sortDirection,
    selectedSkills,
    columnFilters,
    columnSearchTerms,
    sortedSkills,
    handleSort,
    handleSelectSkill,
    handleSelectAllSkills,
    handleColumnFilterChange,
    clearColumnFilter,
    handleColumnSearchChange
  };
};
