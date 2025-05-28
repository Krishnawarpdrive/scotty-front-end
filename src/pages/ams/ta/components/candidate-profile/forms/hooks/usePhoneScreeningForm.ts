import { useState, useCallback } from 'react';
import { Candidate } from '../../../types/CandidateTypes';

export interface PhoneScreeningFormData {
  // Basic Info
  candidateName: string;
  phoneNumber: string;
  alternativePhone: string;
  scheduledDate: string;
  duration: string;
  status: 'pending' | 'in-progress' | 'completed';

  // Contact & Location
  currentAddress: string;
  currentLocation: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  preferredLocation: string;
  willingToRelocate: string;

  // Social Profiles
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  twitterUrl: string;
  otherProfiles: string;

  // Role Information
  appliedRole: string;
  currentRole: string;
  currentCompany: string;
  experienceYears: string;
  relevantExperience: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  availability: string;

  // Skills
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

  // Assessment
  overallNotes: string;
  strengths: string;
  concerns: string;
  recommendation: string;
  nextSteps: string;
  rating: string;
}

export const usePhoneScreeningForm = (candidate: Candidate) => {
  const [formData, setFormData] = useState<PhoneScreeningFormData>({
    // Basic Info
    candidateName: candidate.name,
    phoneNumber: candidate.phone || '+91 98765 43210',
    alternativePhone: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    duration: '30 minutes',
    status: 'pending',

    // Contact & Location
    currentAddress: '',
    currentLocation: candidate.location || '',
    city: '',
    state: '',
    country: 'IN',
    zipCode: '',
    preferredLocation: '',
    willingToRelocate: '',

    // Social Profiles
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    twitterUrl: '',
    otherProfiles: '',

    // Role Information
    appliedRole: candidate.role,
    currentRole: '',
    currentCompany: '',
    experienceYears: candidate.experience,
    relevantExperience: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    availability: '',

    // Skills
    technicalSkills: candidate.skills || [],
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

    // Assessment
    overallNotes: '',
    strengths: '',
    concerns: '',
    recommendation: '',
    nextSteps: '',
    rating: ''
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form saved:', formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleGenerateReport = useCallback(async () => {
    try {
      console.log('Generating report for:', formData);
      // This would typically generate a PDF or summary report
    } catch (error) {
      console.error('Error generating report:', error);
    }
  }, [formData]);

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
