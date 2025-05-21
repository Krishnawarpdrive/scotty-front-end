
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface SkillsTagsStepProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const SkillsTagsStep: React.FC<SkillsTagsStepProps> = ({ 
  skills, 
  setSkills, 
  tags, 
  setTags 
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [newTag, setNewTag] = useState('');
  
  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Skills</label>
        <div className="flex gap-2">
          <Input 
            placeholder="Add a skill" 
            value={newSkill} 
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={handleAddSkill}
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map(skill => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1 py-1">
              {skill}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleRemoveSkill(skill)}
              />
            </Badge>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No skills added yet</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <div className="flex gap-2">
          <Input 
            placeholder="Add a tag" 
            value={newTag} 
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={handleAddTag}
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1 py-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleRemoveTag(tag)}
              />
            </Badge>
          ))}
          {tags.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No tags added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsTagsStep;
