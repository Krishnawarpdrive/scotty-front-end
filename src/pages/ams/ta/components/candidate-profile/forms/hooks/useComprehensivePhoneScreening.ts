import { useState, useCallback } from 'react';
import { Candidate } from '../../../types/CandidateTypes';

export interface ComprehensiveFormData {
  candidateInfo: {
    name: string;
    email: string;
    phone: string;
    currentRole: string;
    currentCompany: string;
    totalExperience: string;
    relevantExperience: string;
    location: string;
    source: string;
  };
  skillsAssessment: {
    technicalSkills: Array<{
      skill: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      yearsExperience: string;
      notes: string;
    }>;
    softSkills: Array<{
      skill: string;
      rating: number;
      notes: string;
    }>;
    overallTechnicalRating: number;
    overallSoftSkillsRating: number;
  };
  certifications: {
    hasCertifications: boolean;
    certificationsList: Array<{
      name: string;
      issuer: string;
      validUntil: string;
      verified: boolean;
    }>;
    relevanceToRole: string;
  };
  checklistCompliance: {
    items: Array<{
      item: string;
      status: 'compliant' | 'non-compliant' | 'partially-compliant' | 'not-applicable';
      notes: string;
    }>;
    overallCompliance: number;
  };
  salaryAvailability: {
    currentSalary: string;
    expectedSalary: string;
    negotiable: boolean;
    noticePeriod: string;
    preferredStartDate: string;
    willingToRelocate: boolean;
    remoteWorkPreference: 'fully-remote' | 'hybrid' | 'onsite' | 'flexible';
  };
  screeningOutcome: {
    overallRating: number;
    recommendation: 'strongly-recommend' | 'recommend' | 'conditional' | 'not-recommend';
    strengths: string;
    concerns: string;
    nextSteps: string;
    interviewReadiness: boolean;
  };
  additionalComments: {
    generalNotes: string;
    redFlags: string;
    specialConsiderations: string;
    followUpRequired: boolean;
    followUpNotes: string;
  };
  status: 'draft' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export const useComprehensivePhoneScreening = (candidate: Candidate) => {
  const [formData, setFormData] = useState<ComprehensiveFormData>(() => ({
    candidateInfo: {
      name: candidate.name || '',
      email: candidate.email || '',
      phone: candidate.phone || '',
      currentRole: candidate.currentRole || '',
      currentCompany: candidate.currentCompany || '',
      totalExperience: candidate.experience || '',
      relevantExperience: '',
      location: candidate.location || '',
      source: 'Direct', // Default value since source doesn't exist on Candidate type
    },
    skillsAssessment: {
      technicalSkills: [],
      softSkills: [],
      overallTechnicalRating: 0,
      overallSoftSkillsRating: 0,
    },
    certifications: {
      hasCertifications: false,
      certificationsList: [],
      relevanceToRole: '',
    },
    checklistCompliance: {
      items: [],
      overallCompliance: 0,
    },
    salaryAvailability: {
      currentSalary: '',
      expectedSalary: '',
      negotiable: false,
      noticePeriod: '',
      preferredStartDate: '',
      willingToRelocate: false,
      remoteWorkPreference: 'flexible',
    },
    screeningOutcome: {
      overallRating: 0,
      recommendation: 'conditional',
      strengths: '',
      concerns: '',
      nextSteps: '',
      interviewReadiness: false,
    },
    additionalComments: {
      generalNotes: '',
      redFlags: '',
      specialConsiderations: '',
      followUpRequired: false,
      followUpNotes: '',
    },
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = useCallback((section: keyof ComprehensiveFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data,
      updatedAt: new Date().toISOString(),
    }));
    setHasChanges(true);
  }, []);

  const saveDraft = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement save to database
      console.log('Saving draft:', formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const submitForm = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement form submission
      const completedData = {
        ...formData,
        status: 'completed' as const,
        updatedAt: new Date().toISOString(),
      };
      console.log('Submitting form:', completedData);
      setFormData(completedData);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const generateReport = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement report generation
      console.log('Generating report for:', formData);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return {
    formData,
    isLoading,
    hasChanges,
    updateField,
    saveDraft,
    submitForm,
    generateReport,
  };
};
