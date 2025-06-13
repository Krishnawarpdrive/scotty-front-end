
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SkillsTable from './components/SkillsTable';
import SkillsFilterSheet from './components/SkillsFilterSheet';
import SkillFormDrawer from './components/SkillFormDrawer';

const mockSkills = [
  { 
    id: 1, 
    name: 'React', 
    category: 'Technical', 
    aliases: ['ReactJS', 'React.js'], 
    usageCount: 45,
    dateAdded: '2024-01-15'
  },
  { 
    id: 2, 
    name: 'TypeScript', 
    category: 'Technical', 
    aliases: ['TS'], 
    usageCount: 38,
    dateAdded: '2024-01-10'
  },
  { 
    id: 3, 
    name: 'Project Management', 
    category: 'Soft Skills', 
    aliases: ['PM', 'Project Mgmt'], 
    usageCount: 52,
    dateAdded: '2024-01-05'
  },
  { 
    id: 4, 
    name: 'Python', 
    category: 'Technical', 
    aliases: ['Python3'], 
    usageCount: 29,
    dateAdded: '2024-01-20'
  },
  { 
    id: 5, 
    name: 'UI/UX Design', 
    category: 'Design', 
    aliases: ['UX', 'User Experience'], 
    usageCount: 31,
    dateAdded: '2024-01-12'
  },
];

const categories = ['Technical', 'Soft Skills', 'Design', 'Management', 'Language', 'Certification'];

const SkillsLibraryPage = () => {
  const [skills, setSkills] = useState(mockSkills);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [skillDrawerOpen, setSkillDrawerOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  // Filter states
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [popularityFilter, setPopularityFilter] = useState<[number, number]>([0, 100]);

  const resetFilters = () => {
    setNameFilter('');
    setCategoryFilter([]);
    setPopularityFilter([0, 100]);
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesNameFilter = !nameFilter || skill.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesCategoryFilter = categoryFilter.length === 0 || categoryFilter.includes(skill.category);
    const matchesPopularityFilter = skill.usageCount >= popularityFilter[0] && skill.usageCount <= popularityFilter[1];

    return matchesSearch && matchesNameFilter && matchesCategoryFilter && matchesPopularityFilter;
  });

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue = a[sortColumn as keyof typeof a];
    let bValue = b[sortColumn as keyof typeof b];
    
    if (sortColumn === 'dateAdded') {
      aValue = new Date(aValue as string);
      bValue = new Date(bValue as string);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectSkill = (id: number) => {
    setSelectedSkills(prev => 
      prev.includes(id) 
        ? prev.filter(skillId => skillId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAllSkills = () => {
    setSelectedSkills(
      selectedSkills.length === sortedSkills.length 
        ? [] 
        : sortedSkills.map(skill => skill.id)
    );
  };

  const handleEditSkill = (skill: any) => {
    setEditingSkill(skill);
    setSkillDrawerOpen(true);
  };

  const handleCreateSkill = () => {
    setEditingSkill(null);
    setSkillDrawerOpen(true);
  };

  const handleSkillCreated = (skillData: any) => {
    if (editingSkill) {
      setSkills(prev => 
        prev.map(skill => 
          skill.id === editingSkill.id 
            ? { ...skill, ...skillData }
            : skill
        )
      );
    } else {
      const newSkill = {
        ...skillData,
        id: Math.max(...skills.map(s => s.id)) + 1
      };
      setSkills(prev => [...prev, newSkill]);
    }
  };

  const skillsData = {
    nameFilter,
    setNameFilter,
    categoryFilter,
    setCategoryFilter,
    popularityFilter,
    setPopularityFilter,
    resetFilters
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills by name, category, or aliases..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setFilterPanelOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button onClick={handleCreateSkill}>
              Add Skill
            </Button>
          </div>

          {sortedSkills.length > 0 ? (
            <SkillsTable
              skills={sortedSkills}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              selectedSkills={selectedSkills}
              handleSort={handleSort}
              handleSelectSkill={handleSelectSkill}
              handleSelectAllSkills={handleSelectAllSkills}
              handleEditSkill={handleEditSkill}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No skills found matching your criteria.</p>
            </div>
          )}
        </div>
      </CardContent>

      <SkillsFilterSheet
        open={filterPanelOpen}
        onOpenChange={setFilterPanelOpen}
        categories={categories}
        skillsData={skillsData}
      />

      <SkillFormDrawer
        open={skillDrawerOpen}
        onOpenChange={setSkillDrawerOpen}
        onSkillCreated={handleSkillCreated}
        categories={categories}
        skill={editingSkill}
      />
    </Card>
  );
};

export default SkillsLibraryPage;
