
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { EnhancedCandidateHeader } from './shared/EnhancedCandidateHeader';
import { ResumeUploadPanel } from '../ai/components/ResumeUploadPanel';
import { FormSuggestionsPanel } from '../ai/components/FormSuggestionsPanel';
import { PhoneScreeningBasicInfo } from './sections/PhoneScreeningBasicInfo';
import { AddressSection } from './sections/AddressSection';
import { SocialProfilesSection } from './sections/SocialProfilesSection';
import { EnhancedRoleInformationSection } from './sections/EnhancedRoleInformationSection';
import { EnhancedExperienceSkillSetSection } from './sections/EnhancedExperienceSkillSetSection';
import { EnhancedEducationSkillSetSection } from './sections/EnhancedEducationSkillSetSection';
import { OverallAssessmentSection } from './sections/OverallAssessmentSection';
import { useAIAssistant } from '../ai/hooks/useAIAssistant';
import { Candidate } from '../../types/CandidateTypes';
import { PhoneScreeningFormData } from './hooks/usePhoneScreeningForm';

interface EnhancedPhoneScreeningFormContentProps {
  candidate: Candidate;
  formData: PhoneScreeningFormData;
  onFieldChange: (field: string, value: any) => void;
}

export const EnhancedPhoneScreeningFormContent: React.FC<EnhancedPhoneScreeningFormContentProps> = ({
  candidate,
  formData,
  onFieldChange
}) => {
  const {
    formSuggestions,
    isGeneratingSuggestions,
    generateSuggestions,
    dismissSuggestion,
    resumeData
  } = useAIAssistant(candidate);

  // Generate form suggestions when form data changes or resume is parsed
  useEffect(() => {
    generateSuggestions(formData);
  }, [formData.candidateName, formData.currentRole, formData.experienceYears, resumeData, generateSuggestions]);

  const handleApplySuggestion = (suggestion: any) => {
    onFieldChange(suggestion.field, suggestion.suggestedValue);
  };

  const handleResumeDataExtracted = (data: any) => {
    console.log('Resume data extracted:', data);
    // Auto-fill form fields from resume data
    if (data.personalInfo.email) {
      onFieldChange('alternativeEmail', data.personalInfo.email);
    }
    if (data.personalInfo.phone) {
      onFieldChange('alternativePhone', data.personalInfo.phone);
    }
    if (data.experience.currentRole) {
      onFieldChange('currentRole', data.experience.currentRole);
    }
    if (data.experience.currentCompany) {
      onFieldChange('currentCompany', data.experience.currentCompany);
    }
    if (data.experience.totalYears) {
      onFieldChange('experienceYears', data.experience.totalYears);
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      fontFamily: 'Rubik, sans-serif'
    }}>
      {/* Enhanced Candidate Header */}
      <EnhancedCandidateHeader 
        candidate={candidate}
      />

      {/* Main Form Content */}
      <Box sx={{ p: 3, pt: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* AI Resume Upload Panel */}
        <ResumeUploadPanel
          candidate={candidate}
          onResumeDataExtracted={handleResumeDataExtracted}
        />

        {/* AI Form Suggestions Panel */}
        <FormSuggestionsPanel
          suggestions={formSuggestions}
          onApplySuggestion={handleApplySuggestion}
          onDismissSuggestion={dismissSuggestion}
          isLoading={isGeneratingSuggestions}
        />

        {/* Basic Information */}
        <PhoneScreeningBasicInfo 
          formData={formData}
          onFieldChange={onFieldChange}
        />

        {/* Address Information */}
        <AddressSection 
          formData={{
            currentAddress: formData.currentAddress,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            zipCode: formData.zipCode,
            preferredLocation: formData.preferredLocation,
            willingToRelocate: formData.willingToRelocate ? 'true' : 'false'
          }}
          onFieldChange={onFieldChange}
        />

        {/* Social Profiles */}
        <SocialProfilesSection 
          formData={{
            linkedinUrl: formData.linkedinUrl,
            githubUrl: formData.githubUrl,
            portfolioUrl: formData.portfolioUrl,
            twitterUrl: formData.twitterUrl,
            otherProfiles: formData.otherProfiles
          }}
          onFieldChange={onFieldChange}
        />

        {/* Role Information with AI Integration */}
        <EnhancedRoleInformationSection 
          candidate={candidate}
          formData={{
            appliedRole: formData.appliedRole,
            currentRole: formData.currentRole,
            currentCompany: formData.currentCompany,
            experienceYears: formData.experienceYears,
            relevantExperience: formData.relevantExperience,
            currentSalary: formData.currentSalary,
            expectedSalary: formData.expectedSalary,
            noticePeriod: formData.noticePeriod,
            availability: formData.availability
          }}
          onFieldChange={onFieldChange}
        />

        {/* Experience & Skills */}
        <EnhancedExperienceSkillSetSection 
          formData={{
            technicalSkills: formData.technicalSkills,
            softSkills: formData.softSkills,
            certifications: formData.certifications,
            keyProjects: formData.keyProjects,
            achievements: formData.achievements,
            toolsFrameworks: formData.toolsFrameworks
          }}
          onFieldChange={onFieldChange}
        />

        {/* Education & Additional Skills */}
        <EnhancedEducationSkillSetSection 
          formData={{
            highestEducation: formData.highestEducation,
            university: formData.university,
            graduationYear: formData.graduationYear,
            specialization: formData.specialization,
            additionalCourses: formData.additionalCourses,
            languages: formData.languages,
            hobbies: formData.hobbies,
            careerGoals: formData.careerGoals
          }}
          onFieldChange={onFieldChange}
        />

        {/* Overall Assessment */}
        <OverallAssessmentSection 
          formData={{
            overallNotes: formData.overallNotes,
            strengths: formData.strengths,
            concerns: formData.concerns,
            recommendation: formData.recommendation,
            nextSteps: formData.nextSteps,
            rating: formData.rating,
            overallRating: formData.overallRating,
            finalDecision: formData.finalDecision
          }}
          onFieldChange={onFieldChange}
        />
      </Box>
    </Box>
  );
};
