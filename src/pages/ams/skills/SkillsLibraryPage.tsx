
import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Skill } from './types/SkillTypes';
import { SkillFormDrawer } from './components/SkillFormDrawer';
import { initialSkills } from './data/mockSkills';

const SkillsLibraryPage = () => {
  const { toast } = useToast();
  const [skillsData, setSkillsData] = useState<Skill[]>(initialSkills);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // Extract unique categories from skills data
    const uniqueCategories = ['All', ...new Set(skillsData.map(skill => skill.category || 'Uncategorized'))];
    setCategories(uniqueCategories);
  }, [skillsData]);

  const filteredSkills = skillsData.filter(skill => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const categoryMatch = selectedCategory === 'All' || skill.category === selectedCategory;
    return searchRegex.test(skill.name) && categoryMatch;
  });

  // Update these lines to properly map the data to the expected types
  const skills: Skill[] = skillsData.map(skill => ({
    ...skill,
    aliases: skill.aliases || [],
    usageCount: skill.usageCount || 0,
    dateAdded: skill.created_at || new Date().toISOString()
  }));

  const selectedSkills = selectedSkillIds.map(id => parseInt(id, 10));

  const handleSkillCreated = useCallback(async (skillData: { name: string; category: string }) => {
    const newSkill: Skill = {
      id: String(skillsData.length + 1),
      name: skillData.name,
      category: skillData.category,
      aliases: [],
      usageCount: 0,
      dateAdded: new Date().toISOString(),
    };

    setSkillsData(prevSkills => [...prevSkills, newSkill]);
    toast({
      title: "Skill Created",
      description: `The skill "${skillData.name}" has been successfully created.`,
    });
  }, [skillsData, toast]);

  const handleSkillDelete = () => {
    const filteredSkills = skillsData.filter(skill => !selectedSkillIds.includes(skill.id));
    setSkillsData(filteredSkills);
    setSelectedSkillIds([]);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Skills Deleted",
      description: "The selected skills have been successfully deleted.",
    });
  };

  const toggleSkillSelection = (skillId: string) => {
    setSelectedSkillIds(prevSelected => {
      if (prevSelected.includes(skillId)) {
        return prevSelected.filter(id => id !== skillId);
      } else {
        return [...prevSelected, skillId];
      }
    });
  };

  const isSkillSelected = (skillId: string) => selectedSkillIds.includes(skillId);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Skills Library</h1>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SkillFormDrawer
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            onSkillCreated={handleSkillCreated}
            categories={categories}
          />
          <Button onClick={() => setIsDrawerOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>A list of your skills.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Usage Count</TableHead>
            <TableHead>Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSkills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell>
                <Input
                  type="checkbox"
                  checked={isSkillSelected(skill.id)}
                  onChange={() => toggleSkillSelection(skill.id)}
                />
              </TableCell>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.category}</TableCell>
              <TableCell>{skill.usageCount}</TableCell>
              <TableCell>{skill.dateAdded}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              {selectedSkillIds.length > 0 && (
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete Selected</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete the selected skills from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button type="button" variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                      <Button type="submit" onClick={handleSkillDelete}>Delete Skills</Button>
                    </DrawerFooter>
                  </DialogContent>
                </Dialog>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default SkillsLibraryPage;
