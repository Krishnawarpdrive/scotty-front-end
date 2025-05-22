
import React, { createContext, useContext, useState } from 'react';
import { FormValues, CustomField } from '../roleFormSchema';

interface RoleFormContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formProgress: number;
  setFormProgress: React.Dispatch<React.SetStateAction<number>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  customFields: CustomField[];
  setCustomFields: React.Dispatch<React.SetStateAction<CustomField[]>>;
  clientId?: string;
  clientName?: string;
}

const RoleFormContext = createContext<RoleFormContextType | undefined>(undefined);

interface RoleFormProviderProps {
  children: React.ReactNode;
  clientId?: string;
  clientName?: string;
}

export const RoleFormProvider: React.FC<RoleFormProviderProps> = ({
  children,
  clientId,
  clientName
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  return (
    <RoleFormContext.Provider value={{
      currentStep,
      setCurrentStep,
      formProgress,
      setFormProgress,
      skills,
      setSkills,
      selectedSkills,
      setSelectedSkills,
      tags,
      setTags,
      customFields,
      setCustomFields,
      clientId,
      clientName
    }}>
      {children}
    </RoleFormContext.Provider>
  );
};

export const useRoleForm = () => {
  const context = useContext(RoleFormContext);
  if (context === undefined) {
    throw new Error('useRoleForm must be used within a RoleFormProvider');
  }
  return context;
};
