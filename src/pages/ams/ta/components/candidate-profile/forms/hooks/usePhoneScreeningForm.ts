
import { useState } from 'react';
import { Candidate } from '../../types/CandidateTypes';

export interface PhoneScreeningFormData {
  // Header data
  candidateName: string;
  phoneNumber: string;
  scheduledDate: string;
  duration: string;
  status: 'pending' | 'in-progress' | 'completed';

  // Address section
  currentAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  preferredLocation: string;
  willingToRelocate: string;

  // Social profiles
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  twitterUrl: string;
  otherProfiles: string;

  // Role information
  appliedRole: string;
  currentRole: string;
  currentCompany: string;
  experienceYears: string;
  relevantExperience: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  availability: string;

  // Experience & skills
  technicalSkills: string[];
  softSkills: string[];
  certifications: string[];
  keyProjects: string;
  achievements: string;
  toolsFrameworks: string[];

  // Education
  highestEducation: string;
  university: string;
  graduationYear: string;
  specialization: string;
  additionalCourses: string[];
  languages: string[];
  hobbies: string;
  careerGoals: string;

  // Remarks
  overallNotes: string;
  strengths: string;
  concerns: string;
  recommendation: string;
  nextSteps: string;
  rating: string;
}

export const usePhoneScreeningForm = (candidate: Candidate) => {
  const [formData, setFormData] = useState<PhoneScreeningFormData>({
    // Header data
    candidateName: candidate.name,
    phoneNumber: '+91 98765 43210',
    scheduledDate: '2024-01-15 10:00 AM',
    duration: '45 minutes',
    status: 'in-progress',

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
    technicalSkills: [],
    softSkills: [],
    certifications: [],
    keyProjects: '',
    achievements: '',
    toolsFrameworks: [],

    // Education
    highestEducation: '',
    university: '',
    graduationYear: '',
    specialization: '',
    additionalCourses: [],
    languages: [],
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

  return {
    formData,
    hasChanges,
    isSubmitting,
    handleFieldChange,
    handleSave,
    handleSubmit,
    handleGenerateReport
  };
};
