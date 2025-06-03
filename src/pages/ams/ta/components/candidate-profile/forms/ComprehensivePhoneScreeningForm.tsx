
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, Send, FileText, Phone } from 'lucide-react';
import { CandidateInfoSection } from './comprehensive/CandidateInfoSection';
import { SkillsAssessmentSection } from './comprehensive/SkillsAssessmentSection';
import { CertificationsSection } from './comprehensive/CertificationsSection';
import { ChecklistComplianceSection } from './comprehensive/ChecklistComplianceSection';
import { SalaryAvailabilitySection } from './comprehensive/SalaryAvailabilitySection';
import { ScreeningOutcomeSection } from './comprehensive/ScreeningOutcomeSection';
import { AdditionalCommentsSection } from './comprehensive/AdditionalCommentsSection';
import { useComprehensivePhoneScreening } from './hooks/useComprehensivePhoneScreening';
import { Candidate } from '../../types/CandidateTypes';

interface ComprehensivePhoneScreeningFormProps {
  candidate: Candidate;
}

export const ComprehensivePhoneScreeningForm: React.FC<ComprehensivePhoneScreeningFormProps> = ({
  candidate
}) => {
  const {
    formData,
    isLoading,
    hasChanges,
    updateField,
    saveDraft,
    submitForm,
    generateReport
  } = useComprehensivePhoneScreening(candidate);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Phone Screening Assessment
                </CardTitle>
                <p className="text-gray-600 mt-1">
                  Comprehensive evaluation for {candidate.name}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={formData.status === 'completed' ? 'default' : 'secondary'}>
                  {formData.status}
                </Badge>
                {hasChanges && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Unsaved Changes
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Form Sections */}
        <div className="space-y-6">
          <CandidateInfoSection 
            data={formData.candidateInfo}
            onChange={(data) => updateField('candidateInfo', data)}
          />

          <SkillsAssessmentSection 
            data={formData.skillsAssessment}
            onChange={(data) => updateField('skillsAssessment', data)}
          />

          <CertificationsSection 
            data={formData.certifications}
            onChange={(data) => updateField('certifications', data)}
          />

          <ChecklistComplianceSection 
            data={formData.checklistCompliance}
            onChange={(data) => updateField('checklistCompliance', data)}
          />

          <SalaryAvailabilitySection 
            data={formData.salaryAvailability}
            onChange={(data) => updateField('salaryAvailability', data)}
          />

          <ScreeningOutcomeSection 
            data={formData.screeningOutcome}
            onChange={(data) => updateField('screeningOutcome', data)}
          />

          <AdditionalCommentsSection 
            data={formData.additionalComments}
            onChange={(data) => updateField('additionalComments', data)}
          />
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={saveDraft}
                  disabled={isLoading || !hasChanges}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>
                
                <Button
                  variant="outline"
                  onClick={generateReport}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Generate Report
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Schedule Follow-up
                </Button>
                
                <Button
                  onClick={submitForm}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4" />
                  Complete Assessment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
