
import React from 'react';
import { Box } from '@mui/material';
import { AddressSection } from '../sections/AddressSection';
import { SocialProfilesSection } from '../sections/SocialProfilesSection';
import { RoleInformationSection } from '../sections/RoleInformationSection';
import { ExperienceSkillSetSection } from '../sections/ExperienceSkillSetSection';
import { EducationSkillSetSection } from '../sections/EducationSkillSetSection';
import { RemarksSection } from '../sections/RemarksSection';
import { PhoneScreeningFormData } from '../hooks/usePhoneScreeningForm';

interface PhoneScreeningFormContentProps {
  formData: PhoneScreeningFormData;
  onFieldChange: (field: string, value: any) => void;
}

export const PhoneScreeningFormContent: React.FC<PhoneScreeningFormContentProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ 
      bgcolor: 'white', 
      borderRadius: '8px', 
      border: '1px solid #e2e8f0',
      p: 4,
      mb: 3
    }}>
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

      <RoleInformationSection
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

      <ExperienceSkillSetSection
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

      <EducationSkillSetSection
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

      <RemarksSection
        formData={{
          overallNotes: formData.overallNotes,
          strengths: formData.strengths,
          concerns: formData.concerns,
          recommendation: formData.recommendation,
          nextSteps: formData.nextSteps,
          rating: formData.rating.toString()
        }}
        onFieldChange={onFieldChange}
      />
    </Box>
  );
};
