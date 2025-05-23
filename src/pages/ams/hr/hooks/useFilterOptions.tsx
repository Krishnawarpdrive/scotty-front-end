
import { useState, useEffect } from 'react';

export interface FilterOption {
  value: string;
  label: string;
  data?: any;
}

export const useFilterOptions = () => {
  const [dateRangeOptions] = useState<FilterOption[]>([
    { value: 'today', label: 'Today' },
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom Range' }
  ]);
  
  const [taOptions, setTaOptions] = useState<FilterOption[]>([
    { value: 'all', label: 'All TAs' },
    { value: 'ta1', label: 'Sarah Johnson' },
    { value: 'ta2', label: 'Mike Peterson' },
    { value: 'ta3', label: 'Emma Wilson' },
    { value: 'ta4', label: 'John Taylor' },
    { value: 'ta5', label: 'Rachel Garcia' }
  ]);
  
  const [roleOptions, setRoleOptions] = useState<FilterOption[]>([
    { value: 'all', label: 'All Roles' },
    { value: 'engineer', label: 'Software Engineer' },
    { value: 'designer', label: 'UX Designer' },
    { value: 'manager', label: 'Product Manager' },
    { value: 'data', label: 'Data Scientist' },
    { value: 'devops', label: 'DevOps Engineer' }
  ]);
  
  const [clientOptions, setClientOptions] = useState<FilterOption[]>([
    { value: 'all', label: 'All Clients' },
    { value: 'client1', label: 'Acme Corp' },
    { value: 'client2', label: 'Tech Innovations' },
    { value: 'client3', label: 'Global Solutions' },
    { value: 'client4', label: 'Future Systems' },
    { value: 'client5', label: 'Quantum Labs' }
  ]);
  
  // In a real application, we would fetch these options from an API
  
  return {
    dateRangeOptions,
    taOptions,
    roleOptions,
    clientOptions
  };
};
