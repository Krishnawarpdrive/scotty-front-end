
import { mockSkills, skillCategories } from '../data/mockData';

// Get available options for column filters
export const getColumnFilterOptions = (column: string, searchTerm: string) => {
  switch (column) {
    case 'name':
      return mockSkills.map(skill => skill.name)
        .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
    case 'category':
      return skillCategories
        .filter(category => category.toLowerCase().includes(searchTerm.toLowerCase()));
    case 'usageCount':
      return [...new Set(mockSkills.map(skill => String(skill.usageCount)))]
        .filter(count => count.includes(searchTerm));
    case 'dateAdded':
      return [...new Set(mockSkills.map(skill => skill.dateAdded))]
        .filter(date => date.includes(searchTerm));
    default:
      return [];
  }
};
