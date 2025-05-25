
import React, { useState } from 'react';
import SkillsLibraryPage from './skills/SkillsLibraryPage';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SkillsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const [skillDescription, setSkillDescription] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const { toast } = useToast();

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skillName.trim()) {
      toast({
        title: "Error",
        description: "Skill name is required",
        variant: "destructive"
      });
      return;
    }

    // Simulate saving
    toast({
      title: "Success",
      description: `Skill "${skillName}" has been added to the library`
    });

    // Reset form
    setSkillName('');
    setSkillCategory('');
    setSkillDescription('');
    setSkillLevel('');
    setDrawerOpen(false);
  };

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
        description="Enter the details of the skill you want to add to the library"
        size="md"
      >
        <form onSubmit={handleSaveSkill} className="space-y-6 p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Skill Name *</label>
              <Input
                placeholder="e.g. React, Python, Project Management"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={skillCategory} onValueChange={setSkillCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="soft-skills">Soft Skills</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Proficiency Level</label>
              <Select value={skillLevel} onValueChange={setSkillLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Describe this skill and its applications..."
                value={skillDescription}
                onChange={(e) => setSkillDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setDrawerOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Skill
            </Button>
          </div>
        </form>
      </SideDrawer>
    </>
  );
};

export default SkillsPage;
