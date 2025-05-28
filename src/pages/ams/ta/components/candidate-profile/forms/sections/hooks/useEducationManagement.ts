
export const useEducationManagement = (
  formData: any,
  onFieldChange: (field: string, value: any) => void
) => {
  const addCourse = (course: string) => {
    const currentCourses = formData.additionalCourses || [];
    onFieldChange('additionalCourses', [...currentCourses, course]);
  };

  const removeCourse = (index: number) => {
    const currentCourses = formData.additionalCourses || [];
    const updatedCourses = currentCourses.filter((_, i) => i !== index);
    onFieldChange('additionalCourses', updatedCourses);
  };

  const addLanguage = (language: string) => {
    const currentLanguages = formData.languages || [];
    onFieldChange('languages', [...currentLanguages, language]);
  };

  const removeLanguage = (index: number) => {
    const currentLanguages = formData.languages || [];
    const updatedLanguages = currentLanguages.filter((_, i) => i !== index);
    onFieldChange('languages', updatedLanguages);
  };

  return {
    addCourse,
    removeCourse,
    addLanguage,
    removeLanguage
  };
};
