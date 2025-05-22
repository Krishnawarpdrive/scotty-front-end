
import React, { useState } from 'react';
import { X, Plus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface Skill {
  id: string | number;
  name: string;
  category: string;
}

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  availableSkills?: Skill[];
  className?: string;
}

/**
 * A reusable component for selecting skills from a list or adding custom skills
 */
const SkillSelector: React.FC<SkillSelectorProps> = ({
  selectedSkills,
  onSkillsChange,
  availableSkills = [],
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newCustomSkill, setNewCustomSkill] = useState('');
  
  // Use provided skills or fallback to default mock data
  const skills = availableSkills.length > 0 ? availableSkills : [
    { id: 1, name: "React", category: "Frontend Development" },
    { id: 2, name: "TypeScript", category: "Programming Languages" },
    { id: 3, name: "Node.js", category: "Backend Development" },
    { id: 4, name: "AWS", category: "Cloud Services" },
    { id: 5, name: "Docker", category: "DevOps" },
    { id: 6, name: "Python", category: "Programming Languages" },
    { id: 7, name: "SQL", category: "Database" },
    { id: 8, name: "MongoDB", category: "Database" },
    { id: 9, name: "Git", category: "Development Tools" },
    { id: 10, name: "REST API", category: "Web Development" }
  ];
  
  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleToggleSkill = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      onSkillsChange(selectedSkills.filter(skill => skill !== skillName));
    } else {
      onSkillsChange([...selectedSkills, skillName]);
    }
  };
  
  const handleAddCustomSkill = () => {
    if (newCustomSkill && !selectedSkills.includes(newCustomSkill)) {
      onSkillsChange([...selectedSkills, newCustomSkill]);
      setNewCustomSkill('');
    }
  };
  
  const handleRemoveSkill = (skillName: string) => {
    onSkillsChange(selectedSkills.filter(skill => skill !== skillName));
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-medium mb-4">Selected Skills</h3>
        <div className="flex flex-wrap gap-2 min-h-12 p-2 border rounded-md bg-muted/20">
          {selectedSkills.map(skill => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1 py-1">
              {skill}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleRemoveSkill(skill)}
              />
            </Badge>
          ))}
          {selectedSkills.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No skills selected yet</p>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Available Skills</h3>
          <Button 
            variant="link" 
            className="p-0 h-auto" 
            onClick={() => onSkillsChange(skills.map(s => s.name))}
          >
            Select All
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <ScrollArea className="h-[300px] border rounded-md p-2">
          <div className="space-y-2">
            {filteredSkills.map(skill => (
              <div key={skill.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`skill-${skill.id}`}
                  checked={selectedSkills.includes(skill.name)}
                  onCheckedChange={() => handleToggleSkill(skill.name)}
                />
                <Label 
                  htmlFor={`skill-${skill.id}`}
                  className="flex-1 cursor-pointer flex justify-between"
                >
                  <span>{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.category}</span>
                </Label>
              </div>
            ))}
            {filteredSkills.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-4">
                No skills match your search
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Add Custom Skill</h3>
        <div className="flex gap-2">
          <Input 
            placeholder="Enter custom skill" 
            value={newCustomSkill} 
            onChange={e => setNewCustomSkill(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomSkill();
              }
            }}
            className="flex-1"
          />
          <Button 
            onClick={handleAddCustomSkill} 
            type="button"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Can't find the skill you need? Add it here and it will be available for this role.
        </p>
      </div>
    </div>
  );
};

export default SkillSelector;
