
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PhoneScreeningHeader } from './sections/PhoneScreeningHeader';
import { AddressSection } from './sections/AddressSection';
import { SocialProfilesSection } from './sections/SocialProfilesSection';
import { RoleInformationSection } from './sections/RoleInformationSection';
import { ExperienceSkillSetSection } from './sections/ExperienceSkillSetSection';
import { EducationSkillSetSection } from './sections/EducationSkillSetSection';
import { RemarksSection } from './sections/RemarksSection';
import { PhoneScreeningFormActions } from './sections/PhoneScreeningFormActions';
import { Candidate } from '../../types/CandidateTypes';

interface EnhancedPhoneScreeningFormProps {
  candidate: Candidate;
}

export const EnhancedPhoneScreeningForm: React.FC<EnhancedPhoneScreeningFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    // Header data
    candidateName: candidate.name,
    phoneNumber: '+91 98765 43210',
    scheduledDate: '2024-01-15 10:00 AM',
    duration: '45 minutes',
    status: 'in-progress' as 'pending' | 'in-progress' | 'completed',

    // Address section
    currentAddress: '',
    city: '',
    state: '',
    country: 'IN',
    zipCode: '',
    preferredLocation: '',
    willingToRelocate: '',

    // Social profiles
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    twitterUrl: '',
    otherProfiles: '',

    // Role information
    appliedRole: candidate.role,
    currentRole: '',
    currentCompany: '',
    experienceYears: '',
    relevantExperience: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    availability: '',

    // Experience & skills
    technicalSkills: [] as string[],
    softSkills: [] as string[],
    certifications: [] as string[],
    keyProjects: '',
    achievements: '',
    toolsFrameworks: [] as string[],

    // Education
    highestEducation: '',
    university: '',
    graduationYear: '',
    specialization: '',
    additionalCourses: [] as string[],
    languages: [] as string[],
    hobbies: '',
    careerGoals: '',

    // Remarks
    overallNotes: '',
    strengths: '',
    concerns: '',
    recommendation: '',
    nextSteps: '',
    rating: ''
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving form data:', formData);
    setHasChanges(false);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log('Submitting assessment:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasChanges(false);
    }, 2000);
  };

  const handleGenerateReport = () => {
    console.log('Generating report for:', candidate.name);
  };

  return (
    <Box sx={{ 
      fontFamily: 'Rubik, sans-serif',
      minHeight: '100vh',
      bgcolor: '#fafbfc'
    }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
        <PhoneScreeningHeader
          candidateName={formData.candidateName}
          phoneNumber={formData.phoneNumber}
          scheduledDate={formData.scheduledDate}
          duration={formData.duration}
          status={formData.status}
        />

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
              willingToRelocate: formData.willingToRelocate
            }}
            onFieldChange={handleFieldChange}
          />

          <SocialProfilesSection
            formData={{
              linkedinUrl: formData.linkedinUrl,
              githubUrl: formData.githubUrl,
              portfolioUrl: formData.portfolioUrl,
              twitterUrl: formData.twitterUrl,
              otherProfiles: formData.otherProfiles
            }}
            onFieldChange={handleFieldChange}
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
            onFieldChange={handleFieldChange}
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
            onFieldChange={handleFieldChange}
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
            onFieldChange={handleFieldChange}
          />

          <RemarksSection
            formData={{
              overallNotes: formData.overallNotes,
              strengths: formData.strengths,
              concerns: formData.concerns,
              recommendation: formData.recommendation,
              nextSteps: formData.nextSteps,
              rating: formData.rating
            }}
            onFieldChange={handleFieldChange}
          />
        </Box>
      </Box>

      <PhoneScreeningFormActions
        onSave={handleSave}
        onSubmit={handleSubmit}
        onGenerateReport={handleGenerateReport}
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
      />
    </Box>
  );
};
