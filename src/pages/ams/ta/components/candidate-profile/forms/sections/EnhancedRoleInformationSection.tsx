
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { FormSection, FormGrid, FormInput, FormSelect } from '../shared/FormComponents';
import { AIInsightsPanel } from '../../ai/components/AIInsightsPanel';
import { SkillGapAnalysis } from '../../ai/components/SkillGapAnalysis';
import { useAIAssistant } from '../../ai/hooks/useAIAssistant';
import { Candidate } from '../../../types/CandidateTypes';

interface EnhancedRoleInformationSectionProps {
  candidate: Candidate;
  formData: {
    appliedRole: string;
    currentRole: string;
    currentCompany: string;
    experienceYears: string;
    relevantExperience: string;
    currentSalary: string;
    expectedSalary: string;
    noticePeriod: string;
    availability: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

export const EnhancedRoleInformationSection: React.FC<EnhancedRoleInformationSectionProps> = ({
  candidate,
  formData,
  onFieldChange
}) => {
  const {
    skillGapAnalysis,
    aiInsights,
    isAnalyzingSkills,
    isGeneratingInsights,
    analyzeSkillGap,
    generateInsights
  } = useAIAssistant(candidate);

  // Mock role requirements - in real app, this would come from the role/requirement data
  const roleRequirements = [
    'JavaScript', 'React', 'Node.js', 'TypeScript', 'SQL', 'Git', 'Agile'
  ];

  useEffect(() => {
    // Generate AI insights when form data changes
    if (formData.experienceYears || formData.currentRole) {
      generateInsights(formData, roleRequirements);
    }
  }, [formData.experienceYears, formData.currentRole, generateInsights]);

  useEffect(() => {
    // Analyze skill gap when we have role requirements
    if (candidate.skills && candidate.skills.length > 0) {
      analyzeSkillGap(roleRequirements);
    }
  }, [candidate.skills, analyzeSkillGap]);

  return (
    <Box>
      {/* Role Information */}
      <FormSection title="Role Information" defaultExpanded>
        <FormGrid columns={2} gap={3}>
          <FormInput
            label="Applied Role"
            value={formData.appliedRole || ''}
            onChange={(value) => onFieldChange('appliedRole', value)}
            placeholder="Role they applied for"
            disabled
          />

          <FormInput
            label="Current Role"
            value={formData.currentRole || ''}
            onChange={(value) => onFieldChange('currentRole', value)}
            placeholder="Current job title"
          />

          <FormInput
            label="Current Company"
            value={formData.currentCompany || ''}
            onChange={(value) => onFieldChange('currentCompany', value)}
            placeholder="Current employer"
          />

          <FormInput
            label="Total Experience"
            value={formData.experienceYears || ''}
            onChange={(value) => onFieldChange('experienceYears', value)}
            placeholder="e.g., 5 years"
          />

          <FormInput
            label="Relevant Experience"
            value={formData.relevantExperience || ''}
            onChange={(value) => onFieldChange('relevantExperience', value)}
            placeholder="Experience relevant to this role"
            multiline
            rows={3}
            gridColumn="span 2"
          />
        </FormGrid>
      </FormSection>

      {/* AI Skill Gap Analysis */}
      <FormSection title="AI Skill Gap Analysis" defaultExpanded>
        <SkillGapAnalysis 
          analysis={skillGapAnalysis}
          isLoading={isAnalyzingSkills}
        />
      </FormSection>

      {/* Compensation & Availability */}
      <FormSection title="Compensation & Availability" defaultExpanded>
        <FormGrid columns={2} gap={3}>
          <FormInput
            label="Current Salary"
            value={formData.currentSalary || ''}
            onChange={(value) => onFieldChange('currentSalary', value)}
            placeholder="Current CTC"
          />

          <FormInput
            label="Expected Salary"
            value={formData.expectedSalary || ''}
            onChange={(value) => onFieldChange('expectedSalary', value)}
            placeholder="Expected CTC"
          />

          <FormSelect
            label="Notice Period"
            value={formData.noticePeriod || ''}
            onChange={(value) => onFieldChange('noticePeriod', value)}
            options={[
              { value: 'immediate', label: 'Immediate' },
              { value: '15days', label: '15 Days' },
              { value: '1month', label: '1 Month' },
              { value: '2months', label: '2 Months' },
              { value: '3months', label: '3 Months' },
              { value: 'negotiable', label: 'Negotiable' }
            ]}
            placeholder="Select notice period"
          />

          <FormSelect
            label="Availability"
            value={formData.availability || ''}
            onChange={(value) => onFieldChange('availability', value)}
            options={[
              { value: 'immediate', label: 'Immediate' },
              { value: 'within_week', label: 'Within a Week' },
              { value: 'within_month', label: 'Within a Month' },
              { value: 'after_notice', label: 'After Notice Period' },
              { value: 'to_discuss', label: 'To Discuss' }
            ]}
            placeholder="Select availability"
          />
        </FormGrid>
      </FormSection>

      {/* AI Insights Panel */}
      {(aiInsights.length > 0 || isGeneratingInsights) && (
        <FormSection title="AI Insights & Recommendations" defaultExpanded>
          <AIInsightsPanel 
            insights={aiInsights}
            isLoading={isGeneratingInsights}
          />
        </FormSection>
      )}
    </Box>
  );
};
