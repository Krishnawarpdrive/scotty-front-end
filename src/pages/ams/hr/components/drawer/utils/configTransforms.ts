
import { StageConfigUnion } from '../types/StageConfigTypes';
import { StageConfig, Interviewer } from '../types/StageTypes';

export const transformConfigToStageConfig = (config: StageConfigUnion): StageConfig => {
  const baseConfig: StageConfig = {
    interviewFormat: 'one-to-one',
    interviewMode: 'virtual',
    interviewers: [],
    notes: config.notes || '',
    maxCandidatesPerRound: 1,
    candidateInstructions: '',
  };

  // Handle different stage types
  switch (config.stageType) {
    case 'interview':
    case 'client-interview':
    case 'vendor-partner-interview':
      return {
        ...baseConfig,
        interviewFormat: config.interviewType === 'one-on-one' ? 'one-to-one' : 
                        config.interviewType === 'panel' ? 'panel' : 'group',
        interviewMode: config.mode,
        interviewers: Array.isArray((config as any).interviewers) ? 
          (config as any).interviewers.map((interviewer: any): Interviewer => 
            typeof interviewer === 'string' ? {
              id: `interviewer-${Date.now()}-${Math.random()}`,
              name: interviewer,
              email: `${interviewer.toLowerCase().replace(' ', '.')}@company.com`,
            } : interviewer
          ) : [],
        notes: config.notes || '',
      };

    case 'phone-screening':
      return {
        ...baseConfig,
        notes: config.notes || '',
        interviewers: [],
      };

    case 'hygiene-screening':
      return {
        ...baseConfig,
        notes: config.notes || '',
        interviewers: [],
      };

    case 'background-verification':
      return {
        ...baseConfig,
        notes: config.notes || '',
        interviewers: [],
      };

    case 'aptitude-test':
      return {
        ...baseConfig,
        notes: config.notes || '',
        interviewers: [],
      };

    case 'custom':
      return {
        ...baseConfig,
        notes: config.notes || '',
        interviewers: [],
      };

    default:
      return baseConfig;
  }
};
