
import React from 'react';
import { Box } from '@mui/material';
import { EnhancedCandidateHeader } from './shared/EnhancedCandidateHeader';
import { FormSection, FormGrid, FormInput, FormSelect } from './shared/FormComponents';
import { SkillsBasedChecklist } from './shared/SkillsBasedChecklist';
import { EnhancedEducationSkillSetSection } from './sections/EnhancedEducationSkillSetSection';
import { EnhancedExperienceSkillSetSection } from './sections/EnhancedExperienceSkillSetSection';
import { AddressSection } from './sections/AddressSection';
import { SocialProfilesSection } from './sections/SocialProfilesSection';
import { RoleInformationSection } from './sections/RoleInformationSection';
import { RemarksSection } from './sections/RemarksSection';
import { PhoneScreeningFormData } from './hooks/usePhoneScreeningForm';
import { Candidate } from '../../types/CandidateTypes';

interface EnhancedPhoneScreeningFormContentProps {
  candidate: Candidate;
  formData: PhoneScreeningFormData;
  onFieldChange: (field: string, value: any) => void;
}

const relocationOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'maybe', label: 'Maybe - depends on role' }
];

const availabilityOptions = [
  { value: 'immediate', label: 'Immediate' },
  { value: '2-weeks', label: '2 Weeks' },
  { value: '1-month', label: '1 Month' },
  { value: '2-months', label: '2 Months' },
  { value: '3-months', label: '3+ Months' }
];

export const EnhancedPhoneScreeningFormContent: React.FC<EnhancedPhoneScreeningFormContentProps> = ({
  candidate,
  formData,
  onFieldChange
}) => {
  const [headerCollapsed, setHeaderCollapsed] = React.useState(false);

  const handleSkillAssessment = (skillId: string, checked: boolean, proficiency?: string) => {
    console.log('Skill assessment:', { skillId, checked, proficiency });
    // This would typically update the candidate's skill assessment data
  };

  return (
    <Box sx={{ fontFamily: 'Rubik, sans-serif' }}>
      {/* Enhanced Candidate Header */}
      <EnhancedCandidateHeader
        candidate={candidate}
        currentStage="Phone Screening"
        progress={25}
        collapsed={headerCollapsed}
        onToggleCollapse={() => setHeaderCollapsed(!headerCollapsed)}
      />

      {/* Contact & Basic Information */}
      <FormSection title="Contact & Basic Information">
        <FormGrid columns={2} gap={2}>
          <FormInput
            label="Phone Number"
            value={formData.phoneNumber || candidate.phone || ''}
            onChange={(value) => onFieldChange('phoneNumber', value)}
            placeholder="+1 (555) 123-4567"
          />
          
          <FormInput
            label="Alternative Phone"
            value={formData.alternativePhone || ''}
            onChange={(value) => onFieldChange('alternativePhone', value)}
            placeholder="Alternative contact number"
          />
          
          <FormInput
            label="Years of Experience"
            value={formData.experienceYears || candidate.experience || ''}
            onChange={(value) => onFieldChange('experienceYears', value)}
            placeholder="e.g., 5 years"
          />
          
          <FormInput
            label="Current Location"
            value={formData.currentLocation || candidate.location || ''}
            onChange={(value) => onFieldChange('currentLocation', value)}
            placeholder="City, State/Country"
          />
          
          <FormSelect
            label="Willing to Relocate"
            value={formData.willingToRelocate || ''}
            onChange={(value) => onFieldChange('willingToRelocate', value)}
            options={relocationOptions}
          />
          
          <FormSelect
            label="Availability to Start"
            value={formData.availability || ''}
            onChange={(value) => onFieldChange('availability', value)}
            options={availabilityOptions}
          />
        </FormGrid>
      </FormSection>

      {/* Skills Assessment Checklist */}
      <FormSection title="Skills Assessment" defaultExpanded>
        <SkillsBasedChecklist
          title="Role-Specific Skills Evaluation"
          roleSkills={[
            'JavaScript', 'React', 'Node.js', 'TypeScript', 
            'Database Design', 'API Development', 'Testing',
            'Version Control (Git)', 'Agile Methodologies'
          ]}
          candidateSkills={candidate.skills || []}
          onSkillAssessment={handleSkillAssessment}
        />
      </FormSection>

      {/* Address & Location Information */}
      <AddressSection
        formData={{
          currentAddress: formData.currentAddress || '',
          city: formData.city || '',
          state: formData.state || '',
          country: formData.country || '',
          zipCode: formData.zipCode || '',
          preferredLocation: formData.preferredLocation || '',
          willingToRelocate: formData.willingToRelocate || ''
        }}
        onFieldChange={onFieldChange}
      />

      {/* Social Profiles & Portfolio */}
      <SocialProfilesSection
        formData={{
          linkedinUrl: formData.linkedinUrl || '',
          githubUrl: formData.githubUrl || '',
          portfolioUrl: formData.portfolioUrl || '',
          twitterUrl: formData.twitterUrl || '',
          otherProfiles: formData.otherProfiles || ''
        }}
        onFieldChange={onFieldChange}
      />

      {/* Role Information */}
      <RoleInformationSection
        formData={{
          appliedRole: formData.appliedRole || candidate.role || '',
          currentRole: formData.currentRole || '',
          currentCompany: formData.currentCompany || '',
          experienceYears: formData.experienceYears || '',
          relevantExperience: formData.relevantExperience || '',
          currentSalary: formData.currentSalary || '',
          expectedSalary: formData.expectedSalary || '',
          noticePeriod: formData.noticePeriod || '',
          availability: formData.availability || ''
        }}
        onFieldChange={onFieldChange}
      />

      {/* Enhanced Experience & Skills */}
      <EnhancedExperienceSkillSetSection
        formData={{
          technicalSkills: formData.technicalSkills || [],
          softSkills: formData.softSkills || [],
          certifications: formData.certifications || [],
          keyProjects: formData.keyProjects || '',
          achievements: formData.achievements || '',
          toolsFrameworks: formData.toolsFrameworks || []
        }}
        onFieldChange={onFieldChange}
      />

      {/* Enhanced Education & Additional Skills */}
      <EnhancedEducationSkillSetSection
        formData={{
          highestEducation: formData.highestEducation || '',
          university: formData.university || '',
          graduationYear: formData.graduationYear || '',
          specialization: formData.specialization || '',
          additionalCourses: formData.additionalCourses || [],
          languages: formData.languages || [],
          hobbies: formData.hobbies || '',
          careerGoals: formData.careerGoals || ''
        }}
        onFieldChange={onFieldChange}
      />

      {/* Assessment & Remarks */}
      <RemarksSection
        formData={{
          overallNotes: formData.overallNotes || '',
          strengths: formData.strengths || '',
          concerns: formData.concerns || '',
          recommendation: formData.recommendation || '',
          nextSteps: formData.nextSteps || '',
          rating: formData.rating || ''
        }}
        onFieldChange={onFieldChange}
      />
    </Box>
  );
};
