
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface PhoneScreeningFormProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const PhoneScreeningForm: React.FC<PhoneScreeningFormProps> = ({
  candidate,
  candidateStageData,
  userRole
}) => {
  const [formData, setFormData] = useState({
    screeningDate: '',
    duration: '30',
    interviewer: '',
    candidateInterest: '',
    communicationSkills: '',
    technicalBackground: '',
    experienceRelevance: '',
    salaryExpectations: '',
    availabilityDate: '',
    noticePeriod: '',
    relocationWillingness: '',
    remoteWorkPreference: '',
    overallAssessment: '',
    recommendForNextRound: '',
    concerns: '',
    strengths: '',
    additionalNotes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting phone screening form:', formData);
    // Implement form submission logic
  };

  const canEdit = userRole === 'hr' || userRole === 'ta';

  return (
    <div className="space-y-6">
      {/* Screening Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Screening Session Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="screeningDate">Screening Date & Time</Label>
              <Input
                id="screeningDate"
                type="datetime-local"
                value={formData.screeningDate}
                onChange={(e) => handleInputChange('screeningDate', e.target.value)}
                disabled={!canEdit}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                disabled={!canEdit}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="interviewer">Interviewer</Label>
            <Input
              id="interviewer"
              value={formData.interviewer}
              onChange={(e) => handleInputChange('interviewer', e.target.value)}
              placeholder="Enter interviewer name"
              disabled={!canEdit}
            />
          </div>
        </CardContent>
      </Card>

      {/* Assessment Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assessment Areas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Candidate Interest */}
          <div>
            <Label className="text-base font-medium">Candidate Interest Level</Label>
            <RadioGroup
              value={formData.candidateInterest}
              onValueChange={(value) => handleInputChange('candidateInterest', value)}
              disabled={!canEdit}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="interest-high" />
                <Label htmlFor="interest-high">High - Very enthusiastic about the role</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="interest-medium" />
                <Label htmlFor="interest-medium">Medium - Interested but has some reservations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="interest-low" />
                <Label htmlFor="interest-low">Low - Lukewarm interest</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Communication Skills */}
          <div>
            <Label className="text-base font-medium">Communication Skills</Label>
            <RadioGroup
              value={formData.communicationSkills}
              onValueChange={(value) => handleInputChange('communicationSkills', value)}
              disabled={!canEdit}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="comm-excellent" />
                <Label htmlFor="comm-excellent">Excellent - Clear, articulate, professional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="comm-good" />
                <Label htmlFor="comm-good">Good - Generally clear with minor issues</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="average" id="comm-average" />
                <Label htmlFor="comm-average">Average - Adequate but room for improvement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="comm-poor" />
                <Label htmlFor="comm-poor">Poor - Difficulty communicating effectively</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Technical Background */}
          <div>
            <Label className="text-base font-medium">Technical Background Assessment</Label>
            <Textarea
              value={formData.technicalBackground}
              onChange={(e) => handleInputChange('technicalBackground', e.target.value)}
              placeholder="Summarize candidate's technical experience and skills mentioned..."
              className="mt-2"
              rows={3}
              disabled={!canEdit}
            />
          </div>

          {/* Experience Relevance */}
          <div>
            <Label className="text-base font-medium">Experience Relevance</Label>
            <RadioGroup
              value={formData.experienceRelevance}
              onValueChange={(value) => handleInputChange('experienceRelevance', value)}
              disabled={!canEdit}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="highly-relevant" id="exp-high" />
                <Label htmlFor="exp-high">Highly Relevant - Direct experience in similar roles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="somewhat-relevant" id="exp-some" />
                <Label htmlFor="exp-some">Somewhat Relevant - Transferable skills</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="limited-relevance" id="exp-limited" />
                <Label htmlFor="exp-limited">Limited Relevance - Significant skill gap</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Logistics & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Logistics & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salaryExpectations">Salary Expectations</Label>
              <Input
                id="salaryExpectations"
                value={formData.salaryExpectations}
                onChange={(e) => handleInputChange('salaryExpectations', e.target.value)}
                placeholder="e.g., $80,000 - $100,000"
                disabled={!canEdit}
              />
            </div>
            <div>
              <Label htmlFor="availabilityDate">Earliest Start Date</Label>
              <Input
                id="availabilityDate"
                type="date"
                value={formData.availabilityDate}
                onChange={(e) => handleInputChange('availabilityDate', e.target.value)}
                disabled={!canEdit}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="noticePeriod">Notice Period</Label>
              <Input
                id="noticePeriod"
                value={formData.noticePeriod}
                onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                placeholder="e.g., 2 weeks, 1 month"
                disabled={!canEdit}
              />
            </div>
            <div>
              <Label htmlFor="remoteWorkPreference">Remote Work Preference</Label>
              <RadioGroup
                value={formData.remoteWorkPreference}
                onValueChange={(value) => handleInputChange('remoteWorkPreference', value)}
                disabled={!canEdit}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fully-remote" id="remote-full" />
                  <Label htmlFor="remote-full">Fully Remote</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="remote-hybrid" />
                  <Label htmlFor="remote-hybrid">Hybrid</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onsite" id="remote-onsite" />
                  <Label htmlFor="remote-onsite">On-site</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="strengths">Key Strengths</Label>
            <Textarea
              id="strengths"
              value={formData.strengths}
              onChange={(e) => handleInputChange('strengths', e.target.value)}
              placeholder="List the candidate's key strengths observed during the screening..."
              rows={3}
              disabled={!canEdit}
            />
          </div>
          
          <div>
            <Label htmlFor="concerns">Concerns or Red Flags</Label>
            <Textarea
              id="concerns"
              value={formData.concerns}
              onChange={(e) => handleInputChange('concerns', e.target.value)}
              placeholder="Note any concerns or potential issues..."
              rows={3}
              disabled={!canEdit}
            />
          </div>
          
          <div>
            <Label className="text-base font-medium">Recommendation for Next Round</Label>
            <RadioGroup
              value={formData.recommendForNextRound}
              onValueChange={(value) => handleInputChange('recommendForNextRound', value)}
              disabled={!canEdit}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="strongly-recommend" id="rec-strong" />
                <Label htmlFor="rec-strong">
                  <span className="flex items-center">
                    Strongly Recommend
                    <Badge className="ml-2 bg-green-100 text-green-800">Proceed</Badge>
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recommend" id="rec-yes" />
                <Label htmlFor="rec-yes">
                  <span className="flex items-center">
                    Recommend
                    <Badge className="ml-2 bg-blue-100 text-blue-800">Proceed</Badge>
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conditional" id="rec-conditional" />
                <Label htmlFor="rec-conditional">
                  <span className="flex items-center">
                    Conditional - Requires discussion
                    <Badge className="ml-2 bg-yellow-100 text-yellow-800">Review</Badge>
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-recommend" id="rec-no" />
                <Label htmlFor="rec-no">
                  <span className="flex items-center">
                    Do Not Recommend
                    <Badge className="ml-2 bg-red-100 text-red-800">Reject</Badge>
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Any additional observations or notes..."
              rows={4}
              disabled={!canEdit}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {canEdit && (
        <div className="flex justify-end space-x-3">
          <Button variant="outline">
            Save Draft
          </Button>
          <Button onClick={handleSubmit}>
            Complete Screening
          </Button>
        </div>
      )}
    </div>
  );
};
