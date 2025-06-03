
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AptitudeTest, AptitudeTestFormData } from '../types/AptitudeTestTypes';
import { X, Plus, Trash2 } from 'lucide-react';

interface AptitudeTestFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AptitudeTestFormData) => Promise<boolean>;
  initialData?: AptitudeTest;
  title: string;
}

export const AptitudeTestForm: React.FC<AptitudeTestFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  title
}) => {
  const [formData, setFormData] = useState<AptitudeTestFormData>({
    test_name: '',
    description: '',
    duration_minutes: 60,
    total_questions: 50,
    passing_score: 70,
    category: 'general',
    difficulty_level: 'medium',
    skills_assessed: [],
    instructions: '',
    is_active: true,
    sections: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        test_name: initialData.test_name,
        description: initialData.description || '',
        duration_minutes: initialData.duration_minutes,
        total_questions: initialData.total_questions,
        passing_score: initialData.passing_score,
        category: initialData.category,
        difficulty_level: initialData.difficulty_level,
        skills_assessed: initialData.skills_assessed,
        instructions: initialData.instructions || '',
        is_active: initialData.is_active,
        sections: []
      });
    } else {
      setFormData({
        test_name: '',
        description: '',
        duration_minutes: 60,
        total_questions: 50,
        passing_score: 70,
        category: 'general',
        difficulty_level: 'medium',
        skills_assessed: [],
        instructions: '',
        is_active: true,
        sections: []
      });
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const success = await onSubmit(formData);
      if (success) {
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills_assessed.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills_assessed: [...prev.skills_assessed, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills_assessed: prev.skills_assessed.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleInputChange = (field: keyof AptitudeTestFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="test_name">Test Name *</Label>
                <Input
                  id="test_name"
                  value={formData.test_name}
                  onChange={(e) => handleInputChange('test_name', e.target.value)}
                  placeholder="Enter test name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the test purpose and content"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="general">General</option>
                    <option value="technical">Technical</option>
                    <option value="cognitive">Cognitive</option>
                    <option value="personality">Personality</option>
                    <option value="domain-specific">Domain Specific</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="difficulty_level">Difficulty Level *</Label>
                  <select
                    id="difficulty_level"
                    value={formData.difficulty_level}
                    onChange={(e) => handleInputChange('difficulty_level', e.target.value as 'easy' | 'medium' | 'hard')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="duration_minutes">Duration (minutes) *</Label>
                  <Input
                    id="duration_minutes"
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => handleInputChange('duration_minutes', parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="total_questions">Total Questions *</Label>
                  <Input
                    id="total_questions"
                    type="number"
                    value={formData.total_questions}
                    onChange={(e) => handleInputChange('total_questions', parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="passing_score">Passing Score (%) *</Label>
                  <Input
                    id="passing_score"
                    type="number"
                    value={formData.passing_score}
                    onChange={(e) => handleInputChange('passing_score', parseInt(e.target.value))}
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  value={formData.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                  placeholder="Instructions for test takers"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => handleInputChange('is_active', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="is_active">Test is active and available for use</Label>
              </div>
            </CardContent>
          </Card>

          {/* Skills Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills Assessed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.skills_assessed.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills_assessed.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : (initialData ? 'Update Test' : 'Create Test')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
