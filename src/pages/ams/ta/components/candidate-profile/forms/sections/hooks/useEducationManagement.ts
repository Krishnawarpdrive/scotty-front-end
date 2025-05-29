
import { useCallback } from 'react';

interface EducationFormData {
  additionalCourses: string[];
  languages: string[];
}

export const useEducationManagement = (
  formData: EducationFormData,
  onFieldChange: (field: string, value: any) => void
) => {
  const addCourse = useCallback((course: string) => {
    const currentCourses = formData.additionalCourses || [];
    if (!currentCourses.includes(course)) {
      onFieldChange('additionalCourses', [...currentCourses, course]);
    }
  }, [formData.additionalCourses, onFieldChange]);

  const removeCourse = useCallback((index: number) => {
    const currentCourses = formData.additionalCourses || [];
    const updatedCourses = currentCourses.filter((_, i) => i !== index);
    onFieldChange('additionalCourses', updatedCourses);
  }, [formData.additionalCourses, onFieldChange]);

  const addLanguage = useCallback((language: string) => {
    const currentLanguages = formData.languages || [];
    if (!currentLanguages.includes(language)) {
      onFieldChange('languages', [...currentLanguages, language]);
    }
  }, [formData.languages, onFieldChange]);

  const removeLanguage = useCallback((index: number) => {
    const currentLanguages = formData.languages || [];
    const updatedLanguages = currentLanguages.filter((_, i) => i !== index);
    onFieldChange('languages', updatedLanguages);
  }, [formData.languages, onFieldChange]);

  return {
    addCourse,
    removeCourse,
    addLanguage,
    removeLanguage
  };
};
