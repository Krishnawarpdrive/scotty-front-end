
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus, Sparkles } from 'lucide-react';
import { RoleCreationFormValues } from '../schemas/roleCreationSchema';

interface SkillsStepProps {
  form: UseFormReturn<RoleCreationFormValues>;
}

// Mock skills library based on role
const getSkillSuggestions = (roleName: string) => {
  const skillMap: Record<string, string[]> = {
    'Software Engineer': ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker'],
    'Frontend Developer': ['React', 'Vue.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Sass', 'Webpack'],
    'Product Manager': ['Product Strategy', 'Roadmapping', 'Analytics', 'User Research', 'Agile', 'Scrum', 'Jira'],
    'UX Designer': ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframing', 'Design Systems']
  };

  return skillMap[roleName] || ['Communication', 'Problem Solving', 'Teamwork', 'Leadership', 'Critical Thinking'];
};

const popularSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL', 'AWS',
  'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum', 'Project Management',
  'Communication', 'Leadership', 'Problem Solving', 'Analytics'
];

const SkillsStep: React.FC<SkillsStepProps> = ({ form }) => {
  const [newSkill, setNewSkill] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

  const roleName = form.watch('roleName');
  const selectedSkills = form.watch('skills') || [];
  const suggestions = getSkillSuggestions(roleName);

  const handleSkillInput = (value: string) => {
    setNewSkill(value);
    if (value.length > 0) {
      const filtered = popularSkills.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !selectedSkills.includes(skill)
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      form.setValue('skills', [...selectedSkills, skill]);
      setNewSkill('');
      setFilteredSkills([]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue('skills', selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const addSuggestedSkills = () => {
    const newSkills = suggestions.filter(skill => !selectedSkills.includes(skill));
    form.setValue('skills', [...selectedSkills, ...newSkills]);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Required Skills</h3>
            <p className="text-sm text-muted-foreground">
              Add skills required for this role. You can select from our library or add custom skills.
            </p>
          </div>
          
          {suggestions.length > 0 && selectedSkills.length === 0 && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addSuggestedSkills}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Add Suggested Skills
            </Button>
          )}
        </div>

        {/* Skill Input */}
        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <FormLabel>Skills *</FormLabel>
              <div className="relative">
                <Input
                  placeholder="Type to search skills or add new ones..."
                  value={newSkill}
                  onChange={(e) => handleSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(newSkill);
                    }
                  }}
                />
                {newSkill && (
                  <Button
                    type="button"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => addSkill(newSkill)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {/* Skill Suggestions Dropdown */}
              {filteredSkills.length > 0 && (
                <div className="border rounded-md bg-background shadow-md max-h-40 overflow-y-auto">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role-based Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Suggested skills for {roleName}:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => addSkill(skill)}
                >
                  {skill}
                  {!selectedSkills.includes(skill) && <Plus className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Selected Skills */}
        {selectedSkills.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Selected Skills ({selectedSkills.length})</label>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="default" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Popular Skills */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Popular Skills</label>
          <div className="flex flex-wrap gap-2">
            {popularSkills
              .filter(skill => !selectedSkills.includes(skill))
              .slice(0, 12)
              .map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => addSkill(skill)}
                >
                  {skill}
                  <Plus className="ml-1 h-3 w-3" />
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsStep;
