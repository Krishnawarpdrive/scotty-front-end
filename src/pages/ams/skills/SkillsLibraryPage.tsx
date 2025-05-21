
import React, { useState } from 'react';
import { Download, Upload, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SkillFormDrawer from './components/SkillFormDrawer';
import SkillsSearchBar from './components/SkillsSearchBar';
import SkillsFilterSheet from './components/SkillsFilterSheet';
import { useSkillsData } from './hooks/useSkillsData';
import { skillCategories } from './data/mockData';
import { getColumnFilterOptions } from './utils/skillsUtils';
import { Table } from '@/components/ui/table';
import SkillsTableHeader from './components/SkillsTableHeader';
import SkillsTableBody from './components/SkillsTableBody';

const SkillsLibraryPage: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [skillDrawerOpen, setSkillDrawerOpen] = useState(false);
  const [editSkill, setEditSkill] = useState<any>(null);
  
  const {
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
  } = useSkillsData();

  const handleEditSkill = (skill: any) => {
    setEditSkill(skill);
    setSkillDrawerOpen(true);
  };

  const handleCreateSkill = () => {
    setEditSkill(null);
    setSkillDrawerOpen(true);
  };
  
  // Get column filter options with search term applied
  const getFilterOptions = (column: string) => {
    return getColumnFilterOptions(column, columnSearchTerms[column]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Skills Library</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-9"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-9"
            disabled={selectedSkills.length === 0}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            className="flex items-center gap-2 h-9 bg-primary hover:bg-primary/90"
            onClick={handleCreateSkill}
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <SkillsSearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onFilterClick={() => setFilterOpen(true)}
            />
            
            <div className="bg-white rounded-md shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <Table>
                  <SkillsTableHeader
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    selectedSkills={selectedSkills}
                    skills={sortedSkills}
                    columnFilters={columnFilters}
                    columnSearchTerms={columnSearchTerms}
                    handleSort={handleSort}
                    handleSelectAllSkills={handleSelectAllSkills}
                    handleColumnFilterChange={handleColumnFilterChange}
                    clearColumnFilter={clearColumnFilter}
                    handleColumnSearchChange={handleColumnSearchChange}
                    getColumnFilterOptions={getFilterOptions}
                  />
                  <SkillsTableBody
                    skills={sortedSkills}
                    selectedSkills={selectedSkills}
                    handleSelectSkill={handleSelectSkill}
                    handleEditSkill={handleEditSkill}
                  />
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters Sheet/Drawer */}
      <SkillsFilterSheet 
        open={filterOpen}
        onOpenChange={setFilterOpen}
        skillCategories={skillCategories}
      />
      
      {/* Skill Creation/Edit Drawer */}
      <SkillFormDrawer 
        open={skillDrawerOpen} 
        onOpenChange={setSkillDrawerOpen}
        skill={editSkill}
      />
    </div>
  );
};

export default SkillsLibraryPage;
