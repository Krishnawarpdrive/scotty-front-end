
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RegistrationFormData } from '@/types/RegistrationTypes';
import { useToast } from '@/hooks/use-toast';

const initialFormData: RegistrationFormData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'individual'
  },
  experienceSource: 'manual',
  workExperience: [],
  skills: [],
  certifications: [],
  education: [],
  rolePreferences: {
    interestedInSourcing: false,
    interestedInInterviewing: false,
    hasScreeningExperience: false,
    roleSuggestions: [],
    answers: {}
  }
};

export const useRegistrationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { toast } = useToast();

  // Load saved progress on component mount
  useEffect(() => {
    loadSavedProgress();
  }, []);

  const loadSavedProgress = async () => {
    try {
      const savedData = localStorage.getItem('registration_progress');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData || initialFormData);
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  };

  const saveProgress = async () => {
    try {
      const progressData = {
        currentStep,
        formData,
        completedSteps,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('registration_progress', JSON.stringify(progressData));
      
      // Also save to database if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('user_registration_progress')
          .upsert({
            user_id: user.id,
            current_step: currentStep,
            completed_steps: completedSteps,
            form_data: formData,
            updated_at: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const updateFormData = (updates: Partial<RegistrationFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const nextStep = () => {
    const newCompletedSteps = [...completedSteps];
    if (!newCompletedSteps.includes(currentStep)) {
      newCompletedSteps.push(currentStep);
    }
    setCompletedSteps(newCompletedSteps);
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: // Personal Info
        return !!(
          formData.personalInfo.firstName &&
          formData.personalInfo.lastName &&
          formData.personalInfo.email &&
          formData.personalInfo.password &&
          formData.personalInfo.confirmPassword &&
          formData.personalInfo.password === formData.personalInfo.confirmPassword
        );
      
      case 2: // Experience Source
        return !!formData.experienceSource;
      
      case 3: // LinkedIn Integration
        return formData.experienceSource !== 'linkedin' || !!formData.linkedinProfile;
      
      case 4: // Manual Experience
        return formData.experienceSource === 'linkedin' || formData.workExperience.length > 0;
      
      case 5: // Role Questions
        return Object.keys(formData.rolePreferences.answers).length > 0;
      
      case 6: // Profile Summary
        return true; // Always valid as it's a review step
      
      case 7: // Completion
        return true;
      
      default:
        return false;
    }
  };

  const completeRegistration = async () => {
    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.personalInfo.email,
        password: formData.personalInfo.password,
        options: {
          data: {
            first_name: formData.personalInfo.firstName,
            last_name: formData.personalInfo.lastName,
            phone: formData.personalInfo.phone
          }
        }
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error('User ID not found');

      // Save work experience
      if (formData.workExperience.length > 0) {
        const workExperienceData = formData.workExperience.map(exp => ({
          user_id: userId,
          job_title: exp.jobTitle,
          company: exp.company,
          start_date: exp.startDate,
          end_date: exp.endDate,
          is_current: exp.isCurrent,
          responsibilities: exp.responsibilities,
          skills_gained: exp.skillsGained,
          source: exp.source
        }));

        await supabase.from('user_work_experience').insert(workExperienceData);
      }

      // Save skills
      if (formData.skills.length > 0) {
        const skillsData = formData.skills.map(skill => ({
          user_id: userId,
          skill_name: skill.name,
          proficiency_level: skill.proficiencyLevel,
          years_experience: skill.yearsExperience,
          source: skill.source
        }));

        await supabase.from('user_skills').insert(skillsData);
      }

      // Save role preferences
      await supabase.from('user_role_preferences').insert({
        user_id: userId,
        interested_in_sourcing: formData.rolePreferences.interestedInSourcing,
        interested_in_interviewing: formData.rolePreferences.interestedInInterviewing,
        has_screening_experience: formData.rolePreferences.hasScreeningExperience,
        preferred_role: formData.rolePreferences.preferredRole,
        role_suggestions: formData.rolePreferences.roleSuggestions,
        answers: formData.rolePreferences.answers
      });

      // Mark registration as completed
      await supabase
        .from('user_registration_progress')
        .upsert({
          user_id: userId,
          current_step: 7,
          completed_steps: [1, 2, 3, 4, 5, 6, 7],
          form_data: formData,
          is_completed: true
        });

      // Clear saved progress
      localStorage.removeItem('registration_progress');

      toast({
        title: "Registration Complete!",
        description: "Welcome to the platform. Your account has been created successfully."
      });

    } catch (error) {
      console.error('Error completing registration:', error);
      toast({
        title: "Registration Error",
        description: "There was an error completing your registration. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const progress = (currentStep / 7) * 100;

  return {
    currentStep,
    formData,
    progress,
    steps: completedSteps,
    nextStep,
    previousStep,
    updateFormData,
    saveProgress,
    isStepValid,
    completeRegistration
  };
};
