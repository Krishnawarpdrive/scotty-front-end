
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AptitudeTestFormData } from '../types/AptitudeTestTypes';
import { Plus, Trash2 } from 'lucide-react';

interface AptitudeTestFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AptitudeTestFormData) => Promise<boolean>;
  initialData?: Partial<AptitudeTestFormData>;
  title: string;
}

export const AptitudeTestForm: React.FC<AptitudeTestFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  title
}) => {
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<AptitudeTestFormData>({
    defaultValues: {
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
      sections: [],
      ...initialData
    }
  });

  const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: 'sections'
  });

  const watchedSkills = watch('skills_assessed') || [];

  const addSkill = () => {
    if (skillInput.trim() && !watchedSkills.includes(skillInput.trim())) {
      setValue('skills_assessed', [...watchedSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setValue('skills_assessed', watchedSkills.filter(s => s !== skill));
  };

  const addSection = () => {
    appendSection({
      section_name: '',
      section_type: 'multiple_choice',
      questions_count: 10,
      time_limit_minutes: 15,
      weightage: 1.0,
      description: ''
    });
  };

  const handleFormSubmit = async (data: AptitudeTestFormData) => {
    setLoading(true);
    const success = await onSubmit(data);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{ zIndex: 9999 }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-purple-900">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Prominent CTA Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">Create New Aptitude Test</h3>
                <p className="text-sm text-purple-700">Design comprehensive assessments to evaluate candidate skills and abilities</p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? 'Creating...' : 'Create Test'}
                </Button>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="test_name">Test Name *</Label>
                  <Input
                    id="test_name"
                    {...register('test_name', { required: 'Test name is required' })}
                    className={errors.test_name ? 'border-red-500' : ''}
                  />
                  {errors.test_name && (
                    <p className="text-sm text-red-500 mt-1">{errors.test_name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setValue('category', value)} defaultValue={watch('category')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={{ zIndex: 10000 }}>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="cognitive">Cognitive</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Brief description of the test..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="duration_minutes">Duration (minutes) *</Label>
                  <Input
                    id="duration_minutes"
                    type="number"
                    {...register('duration_minutes', { 
                      required: 'Duration is required',
                      min: { value: 1, message: 'Duration must be at least 1 minute' }
                    })}
                    className={errors.duration_minutes ? 'border-red-500' : ''}
                  />
                  {errors.duration_minutes && (
                    <p className="text-sm text-red-500 mt-1">{errors.duration_minutes.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="total_questions">Total Questions *</Label>
                  <Input
                    id="total_questions"
                    type="number"
                    {...register('total_questions', { 
                      required: 'Total questions is required',
                      min: { value: 1, message: 'Must have at least 1 question' }
                    })}
                    className={errors.total_questions ? 'border-red-500' : ''}
                  />
                  {errors.total_questions && (
                    <p className="text-sm text-red-500 mt-1">{errors.total_questions.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="passing_score">Passing Score (%)</Label>
                  <Input
                    id="passing_score"
                    type="number"
                    {...register('passing_score', { 
                      min: { value: 0, message: 'Score cannot be negative' },
                      max: { value: 100, message: 'Score cannot exceed 100%' }
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty_level">Difficulty Level</Label>
                  <Select onValueChange={(value) => setValue('difficulty_level', value as any)} defaultValue={watch('difficulty_level')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={{ zIndex: 10000 }}>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="is_active"
                    checked={watch('is_active')}
                    onCheckedChange={(checked) => setValue('is_active', !!checked)}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Assessed */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills Assessed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-3">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {watchedSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                {...register('instructions')}
                placeholder="Instructions for candidates taking this test..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Test Sections */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Test Sections</CardTitle>
              <Button type="button" onClick={addSection} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </CardHeader>
            <CardContent>
              {sectionFields.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No sections added yet</p>
              ) : (
                <div className="space-y-4">
                  {sectionFields.map((field, index) => (
                    <Card key={field.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Section {index + 1}</h4>
                          <Button
                            type="button"
                            onClick={() => removeSection(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Section Name</Label>
                            <Input
                              {...register(`sections.${index}.section_name`)}
                              placeholder="e.g., Logical Reasoning"
                            />
                          </div>
                          <div>
                            <Label>Section Type</Label>
                            <Select onValueChange={(value) => setValue(`sections.${index}.section_type`, value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent style={{ zIndex: 10000 }}>
                                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                                <SelectItem value="true_false">True/False</SelectItem>
                                <SelectItem value="essay">Essay</SelectItem>
                                <SelectItem value="coding">Coding</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Questions Count</Label>
                            <Input
                              type="number"
                              {...register(`sections.${index}.questions_count`)}
                            />
                          </div>
                          <div>
                            <Label>Time Limit (minutes)</Label>
                            <Input
                              type="number"
                              {...register(`sections.${index}.time_limit_minutes`)}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Description</Label>
                          <Textarea
                            {...register(`sections.${index}.description`)}
                            placeholder="Section description..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bottom CTA */}
          <div className="sticky bottom-0 bg-white border-t pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'Creating Test...' : 'Create Test'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
