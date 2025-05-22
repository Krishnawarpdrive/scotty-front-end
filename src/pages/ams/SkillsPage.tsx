
import React, { useState } from 'react';
import SkillsLibraryPage from './skills/SkillsLibraryPage';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const SkillsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Skills Library</h1>
        <Button 
          onClick={() => setDrawerOpen(true)} 
          className="bg-primary text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>
      
      <SkillsLibraryPage />

      <SideDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
        title="Add New Skill"
        description="Enter the details of the skill you want to add"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="submit" form="skill-form">Save Skill</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>Skill form will go here</p>
          <form id="skill-form" className="space-y-4">
            {/* Form fields will be added here */}
          </form>
        </div>
      </SideDrawer>
    </>
  );
};

export default SkillsPage;
