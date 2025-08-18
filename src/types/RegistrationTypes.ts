
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  profilePicture?: File;
  accountType: 'individual' | 'organization';
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  responsibilities?: string;
  skillsGained: string[];
  source: 'manual' | 'linkedin';
}

export interface Skill {
  name: string;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsExperience: number;
  source: 'manual' | 'linkedin';
}

export interface Certification {
  name: string;
  issuingOrganization: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  source: 'manual' | 'linkedin';
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  description?: string;
  source: 'manual' | 'linkedin';
}

export interface RolePreferences {
  interestedInSourcing: boolean;
  interestedInInterviewing: boolean;
  hasScreeningExperience: boolean;
  preferredRole?: string;
  roleSuggestions: string[];
  answers: Record<string, any>;
}

export interface LinkedInProfile {
  linkedinId: string;
  profileUrl?: string;
  profileData: any;
  syncStatus: 'pending' | 'synced' | 'failed';
}

export interface RegistrationFormData {
  personalInfo: PersonalInfo;
  experienceSource: 'linkedin' | 'manual' | 'skip';
  workExperience: WorkExperience[];
  skills: Skill[];
  certifications: Certification[];
  education: Education[];
  rolePreferences: RolePreferences;
  linkedinProfile?: LinkedInProfile;
  officialEmail?: string;
}

export interface RegistrationStep {
  id: number;
  name: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  isCompleted: boolean;
  isOptional?: boolean;
}
