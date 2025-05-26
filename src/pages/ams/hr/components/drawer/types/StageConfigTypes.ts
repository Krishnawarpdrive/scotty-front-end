
export interface BaseStageConfig {
  stageType: string;
  notes?: string;
  isConfigured: boolean;
}

export interface PhoneScreeningConfig extends BaseStageConfig {
  stageType: 'phone-screening';
  candidateName?: string;
  phoneNumber?: string;
  questionsToAsk?: string[];
  callScheduled: boolean;
  outcome?: 'pass' | 'fail' | 'pending';
  recordingUrl?: string;
}

export interface HygieneScreeningConfig extends BaseStageConfig {
  stageType: 'hygiene-screening';
  eligibilityChecklist: {
    idVerified: boolean;
    resumeReceived: boolean;
    contactConfirmed: boolean;
    availabilityChecked: boolean;
  };
  checklistUploadUrl?: string;
  remarks?: string;
  customFields?: { label: string; value: string; }[];
}

export interface BackgroundVerificationConfig extends BaseStageConfig {
  stageType: 'background-verification';
  panId?: string;
  idNumber?: string;
  documentsUploaded: {
    resume: boolean;
    id: boolean;
    offerLetter: boolean;
  };
  verificationPartner?: string;
  verificationStatus: 'pending' | 'in-progress' | 'completed' | 'failed';
  slaDate?: string;
}

export interface InterviewConfig extends BaseStageConfig {
  stageType: 'interview';
  interviewType: 'one-on-one' | 'panel' | 'group';
  mode: 'in-person' | 'virtual';
  interviewers: string[];
  dateTime?: string;
  meetingLink?: string;
  questionsToAsk?: string[];
  feedbackTemplate?: string;
  outcome?: 'pass' | 'fail' | 'pending';
}

export interface ClientInterviewConfig extends BaseStageConfig {
  stageType: 'client-interview';
  clientName?: string;
  interviewerName?: string;
  interviewerContact?: string;
  roundType?: string;
  taCoordinator?: string;
  ndaSigned: boolean;
  interviewType: 'one-on-one' | 'panel' | 'group';
  mode: 'in-person' | 'virtual';
  dateTime?: string;
  meetingLink?: string;
}

export interface VendorPartnerInterviewConfig extends BaseStageConfig {
  stageType: 'vendor-partner-interview';
  type: 'vendor' | 'partner';
  entityName?: string;
  feedbackFormUrl?: string;
  roleId?: string;
  interviewType: 'one-on-one' | 'panel' | 'group';
  mode: 'in-person' | 'virtual';
  dateTime?: string;
}

export interface AptitudeTestConfig extends BaseStageConfig {
  stageType: 'aptitude-test';
  testLink?: string;
  password?: string;
  duration?: number;
  resultSource: 'auto' | 'manual';
  status: 'scheduled' | 'completed' | 'failed' | 'pending';
  score?: number;
}

export interface CustomStageConfig extends BaseStageConfig {
  stageType: 'custom';
  stageName: string;
  type?: string;
  description?: string;
  dynamicFields: { label: string; value: string; type: 'text' | 'number' | 'date' | 'file'; }[];
  fileUploads?: string[];
}

export type StageConfigUnion = 
  | PhoneScreeningConfig 
  | HygieneScreeningConfig 
  | BackgroundVerificationConfig 
  | InterviewConfig 
  | ClientInterviewConfig 
  | VendorPartnerInterviewConfig 
  | AptitudeTestConfig 
  | CustomStageConfig;
