
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PanelistsTable } from "./PanelistsTable";
import { PanelistDetailDrawer } from "./PanelistDetailDrawer";
import { PanelistCreationDrawer } from "./PanelistCreationDrawer";
import { PanelistsHeader } from "./PanelistsHeader";
import { PanelistsFilters } from "./PanelistsFilters";
import { usePanelists } from "../hooks/usePanelists";

export const InterviewPanelistLibrary: React.FC = () => {
  const [selectedPanelist, setSelectedPanelist] = useState<string | null>(null);
  const [isCreationDrawerOpen, setIsCreationDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);

  const {
    panelists,
    isLoading,
    error,
    createPanelist,
    updatePanelist,
    deletePanelist
  } = usePanelists({
    searchQuery,
    department: departmentFilter,
    status: statusFilter,
    skills: skillsFilter
  });

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PanelistsHeader onCreatePanelist={() => setIsCreationDrawerOpen(true)} />
      
      <PanelistsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        departmentFilter={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        skillsFilter={skillsFilter}
        onSkillsChange={setSkillsFilter}
      />

      <PanelistsTable
        panelists={panelists}
        isLoading={isLoading}
        error={error}
        onSelectPanelist={setSelectedPanelist}
        onUpdatePanelist={updatePanelist}
        onDeletePanelist={deletePanelist}
      />

      <PanelistDetailDrawer
        panelistId={selectedPanelist}
        isOpen={!!selectedPanelist}
        onClose={() => setSelectedPanelist(null)}
        onUpdate={updatePanelist}
      />

      <PanelistCreationDrawer
        isOpen={isCreationDrawerOpen}
        onClose={() => setIsCreationDrawerOpen(false)}
        onCreate={createPanelist}
      />
    </motion.div>
  );
};
