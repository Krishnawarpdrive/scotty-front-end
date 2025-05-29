
import { useState, useCallback } from 'react';
import { Candidate } from '../../../types/CandidateTypes';

export interface PhoneScreeningFormData {
  // Basic Information
  candidateName: string;
  phoneNumber: string;
  callScheduled: boolean;
  experienceYears: string;
  currentLocation: string;
  currentRole: string;
  currentCompany: string;
  availabilityWeeks: string;
  
  // Contact Details
  alternativeEmail: string;
  alternativePhone: string;
  
  // Address Information
  currentAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  preferredLocation: string;
  willingToRelocate: boolean;
  
  // Social Profiles
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  twitterUrl: string;
  otherProfiles: string;
  
  // Role Information
  appliedRole: string;
  relevantExperience: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  availability: string;
  
  // Skills & Experience
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
  rating: number;
  overallRating: number;
  finalDecision: string;
  
  // Phone Screening Specific
  scheduledDate: string;
  duration: string;
  status: string;
}

interface UsePhoneScreeningFormReturn {
  formData: PhoneScreeningFormData;
  hasChanges: boolean;
  isSubmitting: boolean;
  handleFieldChange: (field: string, value: any) => void;
  handleSave: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  handleGenerateReport: () => Promise<void>;
}

export const usePhoneScreeningForm = (candidate: Candidate): UsePhoneScreeningFormReturn => {
  const [formData, setFormData] = useState<PhoneScreeningFormData>({
    candidateName: candidate.name || '',
    phoneNumber: candidate.phone || '',
    callScheduled: false,
    experienceYears: candidate.experience || '',
    currentLocation: candidate.location || '',
    currentRole: candidate.currentRole || '',
    currentCompany: candidate.currentCompany || '',
    availabilityWeeks: '',
    
    alternativeEmail: '',
    alternativePhone: '',
    
    currentAddress: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    preferredLocation: '',
    willingToRelocate: false,
    
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    twitterUrl: '',
    otherProfiles: '',
    
    appliedRole: candidate.appliedRole || '',
    relevantExperience: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    availability: '',
    
    technicalSkills: candidate.skills || [],
    softSkills: [],
    certifications: [],
    keyProjects: '',
    achievements: '',
    toolsFrameworks: [],
    
    highestEducation: '',
    university: '',
    graduationYear: '',
    specialization: '',
    additionalCourses: [],
    languages: [],
    hobbies: '',
    careerGoals: '',
    
    overallNotes: '',
    strengths: '',
    concerns: '',
    recommendation: '',
    nextSteps: '',
    rating: 0,
    overallRating: 0,
    finalDecision: '',
    
    scheduledDate: new Date().toISOString().split('T')[0],
    duration: '30 minutes',
    status: 'Scheduled'
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
    setIsSubmitting(true);
    try {
      // TODO: Implement save logic
      console.log('Saving phone screening form:', formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement submit logic
      console.log('Submitting phone screening form:', formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleGenerateReport = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement report generation
      console.log('Generating report for:', formData);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsSubmitting(false);
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
