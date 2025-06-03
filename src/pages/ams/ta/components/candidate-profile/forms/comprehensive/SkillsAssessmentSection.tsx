
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Code, Users } from 'lucide-react';

interface TechnicalSkill {
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsExperience: string;
  notes: string;
}

interface SoftSkill {
  skill: string;
  rating: number;
  notes: string;
}

interface SkillsAssessmentData {
  technicalSkills: TechnicalSkill[];
  softSkills: SoftSkill[];
  overallTechnicalRating: number;
  overallSoftSkillsRating: number;
}

interface SkillsAssessmentSectionProps {
  data: SkillsAssessmentData;
  onChange: (data: SkillsAssessmentData) => void;
}

export const SkillsAssessmentSection: React.FC<SkillsAssessmentSectionProps> = ({
  data,
  onChange
}) => {
  const addTechnicalSkill = () => {
    const newSkill: TechnicalSkill = {
      skill: '',
      level: 'intermediate',
      yearsExperience: '',
      notes: ''
    };
    onChange({
      ...data,
      technicalSkills: [...data.technicalSkills, newSkill]
    });
  };

  const updateTechnicalSkill = (index: number, field: keyof TechnicalSkill, value: string) => {
    const updated = data.technicalSkills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    onChange({ ...data, technicalSkills: updated });
  };

  const removeTechnicalSkill = (index: number) => {
    const updated = data.technicalSkills.filter((_, i) => i !== index);
    onChange({ ...data, technicalSkills: updated });
  };

  const addSoftSkill = () => {
    const newSkill: SoftSkill = {
      skill: '',
      rating: 3,
      notes: ''
    };
    onChange({
      ...data,
      softSkills: [...data.softSkills, newSkill]
    });
  };

  const updateSoftSkill = (index: number, field: keyof SoftSkill, value: string | number) => {
    const updated = data.softSkills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    onChange({ ...data, softSkills: updated });
  };

  const removeSoftSkill = (index: number) => {
    const updated = data.softSkills.filter((_, i) => i !== index);
    onChange({ ...data, softSkills: updated });
  };

  const renderStarRating = (rating: number, onChange: (rating: number) => void) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400 transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Skills Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Technical Skills */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Technical Skills</h3>
            <Button onClick={addTechnicalSkill} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
          
          <div className="space-y-4">
            {data.technicalSkills.map((skill, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border rounded-lg">
                <div>
                  <Label>Skill</Label>
                  <Input
                    value={skill.skill}
                    onChange={(e) => updateTechnicalSkill(index, 'skill', e.target.value)}
                    placeholder="e.g., React, Python"
                  />
                </div>
                
                <div>
                  <Label>Level</Label>
                  <Select
                    value={skill.level}
                    onValueChange={(value) => updateTechnicalSkill(index, 'level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label>Years</Label>
                  <Input
                    value={skill.yearsExperience}
                    onChange={(e) => updateTechnicalSkill(index, 'yearsExperience', e.target.value)}
                    placeholder="2"
                  />
                </div>
                
                <div>
                  <Label>Notes</Label>
                  <Input
                    value={skill.notes}
                    onChange={(e) => updateTechnicalSkill(index, 'notes', e.target.value)}
                    placeholder="Additional notes"
                  />
                </div>
                
                <div className="flex items-end">
                  <Button
                    onClick={() => removeTechnicalSkill(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Label>Overall Technical Rating</Label>
            <div className="flex items-center space-x-3 mt-2">
              {renderStarRating(data.overallTechnicalRating, (rating) => 
                onChange({ ...data, overallTechnicalRating: rating })
              )}
              <span className="text-sm text-gray-600">
                {data.overallTechnicalRating}/5
              </span>
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Soft Skills
            </h3>
            <Button onClick={addSoftSkill} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
          
          <div className="space-y-4">
            {data.softSkills.map((skill, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg">
                <div>
                  <Label>Skill</Label>
                  <Input
                    value={skill.skill}
                    onChange={(e) => updateSoftSkill(index, 'skill', e.target.value)}
                    placeholder="e.g., Communication, Leadership"
                  />
                </div>
                
                <div>
                  <Label>Rating</Label>
                  {renderStarRating(skill.rating, (rating) => updateSoftSkill(index, 'rating', rating))}
                </div>
                
                <div>
                  <Label>Notes</Label>
                  <Input
                    value={skill.notes}
                    onChange={(e) => updateSoftSkill(index, 'notes', e.target.value)}
                    placeholder="Observations"
                  />
                </div>
                
                <div className="flex items-end">
                  <Button
                    onClick={() => removeSoftSkill(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Label>Overall Soft Skills Rating</Label>
            <div className="flex items-center space-x-3 mt-2">
              {renderStarRating(data.overallSoftSkillsRating, (rating) => 
                onChange({ ...data, overallSoftSkillsRating: rating })
              )}
              <span className="text-sm text-gray-600">
                {data.overallSoftSkillsRating}/5
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
