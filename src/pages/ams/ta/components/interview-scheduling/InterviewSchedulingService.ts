
import { interviewScheduleService } from './services/InterviewScheduleService';
import { panelistAvailabilityService } from './services/PanelistAvailabilityService';
import { interviewTemplateService } from './services/InterviewTemplateService';
import { candidatePreferencesService } from './services/CandidatePreferencesService';
import { conflictDetectionService } from './services/ConflictDetectionService';

export type { InterviewSchedule, InterviewTemplate, CandidatePreferences, PanelistAvailability } from './types/InterviewTypes';

export const interviewSchedulingService = {
  // Interview Schedules
  ...interviewScheduleService,
  
  // Panelist Availability
  ...panelistAvailabilityService,
  
  // Interview Templates
  ...interviewTemplateService,
  
  // Candidate Preferences
  ...candidatePreferencesService,
  
  // Conflict Detection and Time Slot Suggestions
  ...conflictDetectionService
};
