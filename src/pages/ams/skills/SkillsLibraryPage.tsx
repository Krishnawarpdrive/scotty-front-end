
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SkillsTable from './components/SkillsTable';
import SkillsSearchBar from './components/SkillsSearchBar';
import SkillsFilterSheet from './components/SkillsFilterSheet';
import SkillFormDrawer from './components/SkillFormDrawer';
import { useSkillsData } from './hooks/useSkillsData';
import { skillCategories } from './data/mockData';

const SkillsLibraryPage: React.FC = () => {
  const { toast } = useToast();
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [skillFormOpen, setSkillFormOpen] = useState(false);
  const skillsData = useSkillsData();

  const {
    searchTerm,
    setSearchTerm,
    sortedSkills,
    selectedSkills,
    handleSort,
    handleSelectSkill,
    handleSelectAllSkills,
    loading,
    addSkill,
    nameFilter,
    setNameFilter,
    categoryFilter,
    setCategoryFilter,
    popularityFilter, 
    setPopularityFilter,
    resetFilters
  } = skillsData;

  const handleAddSkill = async (skillData: { name: string; category: string }) => {
    const result = await addSkill(skillData);
    if (result) {
      setSkillFormOpen(false);
      toast({
        title: 'Success',
        description: `Skill "${skillData.name}" added successfully.`,
      });
    }
  };

  const handleDeleteSkills = () => {
    if (selectedSkills.length === 0) {
      toast({
        title: "No skills selected",
        description: "Please select at least one skill to delete.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Not implemented",
      description: "Bulk delete functionality is not implemented yet.",
    });
  };

  const handleExportSkills = () => {
    toast({
      title: "Not implemented",
      description: "Export functionality is not implemented yet.",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterData = {
    nameFilter,
    setNameFilter,
    categoryFilter,
    setCategoryFilter,
    popularityFilter,
    setPopularityFilter,
    resetFilters
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Skills Library</h1>
        <Button 
          onClick={() => setSkillFormOpen(true)} 
          className="bg-primary text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills Management</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillsSearchBar 
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectedCount={selectedSkills.length}
            onFilterClick={() => setFilterSheetOpen(true)}
            onDeleteClick={handleDeleteSkills}
            onExportClick={handleExportSkills}
          />

          <div className="mt-6">
            <SkillsTable 
              skills={sortedSkills}
              selectedSkills={selectedSkills}
              onSelectSkill={handleSelectSkill}
              onSelectAll={handleSelectAllSkills}
              onSort={handleSort}
              isLoading={loading}
            />
          </div>
        </CardContent>
      </Card>

      <SkillsFilterSheet 
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        categories={skillCategories}
        skillsData={filterData}
      />

      <SkillFormDrawer 
        open={skillFormOpen}
        onOpenChange={setSkillFormOpen}
        onSkillCreated={handleAddSkill}
        categories={skillCategories}
      />
    </div>
  );
};

export default SkillsLibraryPage;
