
import { CandidateStage, UserRole } from '../types/CandidateStageTypes';

export const STAGE_CONFIGURATIONS: Record<string, CandidateStage> = {
  'phone-screening': {
    id: 'phone-screening',
    name: 'Phone Screening',
    status: 'current',
    order: 1,
    requiredActions: ['Complete screening form', 'Schedule next interview'],
    availableActions: [
      {
        id: 'complete-screening',
        label: 'Complete Screening',
        type: 'primary',
        icon: 'check',
        requiredRole: ['hr', 'ta']
      },
      {
        id: 'schedule-technical',
        label: 'Schedule Technical',
        type: 'secondary',
        icon: 'calendar',
        requiredRole: ['hr', 'ta']
      },
      {
        id: 'reject-candidate',
        label: 'Reject',
        type: 'danger',
        icon: 'x',
        requiresConfirmation: true,
        confirmationMessage: 'Are you sure you want to reject this candidate?',
        requiredRole: ['hr', 'hiring_manager']
      },
      {
        id: 'hold-application',
        label: 'Put on Hold',
        type: 'secondary',
        icon: 'pause',
        requiredRole: ['hr', 'ta']
      }
    ],
    tabs: [
      {
        id: 'form',
        name: 'Screening Form',
        icon: 'file-text',
        component: 'PhoneScreeningForm'
      },
      {
        id: 'notes',
        name: 'Notes',
        icon: 'edit',
        component: 'StageNotes'
      },
      {
        id: 'documents',
        name: 'Documents',
        icon: 'file',
        component: 'StageDocuments'
      }
    ],
    permissions: {
      canView: ['hr', 'ta', 'hiring_manager'],
      canEdit: ['hr', 'ta'],
      canAdvance: ['hr', 'hiring_manager'],
      canReject: ['hr', 'hiring_manager'],
      canHold: ['hr', 'ta']
    }
  },
  'technical-interview': {
    id: 'technical-interview',
    name: 'Technical Interview',
    status: 'pending',
    order: 2,
    requiredActions: ['Assign interviewer', 'Schedule interview', 'Complete assessment'],
    availableActions: [
      {
        id: 'assign-interviewer',
        label: 'Assign Interviewer',
        type: 'primary',
        icon: 'user',
        requiredRole: ['hr', 'ta']
      },
      {
        id: 'schedule-interview',
        label: 'Schedule Interview',
        type: 'primary',
        icon: 'calendar',
        requiredRole: ['hr', 'ta', 'interviewer']
      },
      {
        id: 'submit-feedback',
        label: 'Submit Feedback',
        type: 'primary',
        icon: 'star',
        requiredRole: ['interviewer']
      },
      {
        id: 'advance-to-client',
        label: 'Advance to Client',
        type: 'primary',
        icon: 'arrow-right',
        requiredRole: ['hr', 'hiring_manager']
      }
    ],
    tabs: [
      {
        id: 'interview-setup',
        name: 'Interview Setup',
        icon: 'settings',
        component: 'TechnicalInterviewSetup'
      },
      {
        id: 'assessment',
        name: 'Assessment',
        icon: 'file-text',
        component: 'TechnicalAssessment'
      },
      {
        id: 'feedback',
        name: 'Feedback',
        icon: 'star',
        component: 'InterviewFeedback',
        badge: '2'
      },
      {
        id: 'notes',
        name: 'Notes',
        icon: 'edit',
        component: 'StageNotes'
      }
    ],
    permissions: {
      canView: ['hr', 'ta', 'interviewer', 'hiring_manager'],
      canEdit: ['hr', 'ta', 'interviewer'],
      canAdvance: ['hr', 'hiring_manager'],
      canReject: ['hr', 'hiring_manager', 'interviewer'],
      canHold: ['hr', 'ta']
    }
  },
  'client-interview': {
    id: 'client-interview',
    name: 'Client Interview',
    status: 'pending',
    order: 3,
    requiredActions: ['Coordinate with client', 'Schedule interview', 'Collect feedback'],
    availableActions: [
      {
        id: 'coordinate-client',
        label: 'Coordinate with Client',
        type: 'primary',
        icon: 'phone',
        requiredRole: ['hr', 'ta']
      },
      {
        id: 'schedule-client-interview',
        label: 'Schedule Interview',
        type: 'primary',
        icon: 'calendar',
        requiredRole: ['hr', 'ta']
      },
      {
        id: 'collect-feedback',
        label: 'Collect Feedback',
        type: 'secondary',
        icon: 'message-square',
        requiredRole: ['hr', 'ta']
      },
      {
        id: 'advance-to-background',
        label: 'Advance to Background Check',
        type: 'primary',
        icon: 'arrow-right',
        requiredRole: ['hr', 'hiring_manager']
      }
    ],
    tabs: [
      {
        id: 'client-coordination',
        name: 'Client Coordination',
        icon: 'users',
        component: 'ClientCoordination'
      },
      {
        id: 'interview-details',
        name: 'Interview Details',
        icon: 'calendar',
        component: 'ClientInterviewDetails'
      },
      {
        id: 'client-feedback',
        name: 'Client Feedback',
        icon: 'star',
        component: 'ClientFeedback'
      },
      {
        id: 'notes',
        name: 'Notes',
        icon: 'edit',
        component: 'StageNotes'
      }
    ],
    permissions: {
      canView: ['hr', 'ta', 'hiring_manager', 'executive'],
      canEdit: ['hr', 'ta'],
      canAdvance: ['hr', 'hiring_manager'],
      canReject: ['hr', 'hiring_manager'],
      canHold: ['hr', 'ta']
    }
  },
  'background-check': {
    id: 'background-check',
    name: 'Background Check',
    status: 'pending',
    order: 4,
    requiredActions: ['Initiate background check', 'Review results', 'Verify documents'],
    availableActions: [
      {
        id: 'initiate-background',
        label: 'Initiate Check',
        type: 'primary',
        icon: 'search',
        requiredRole: ['hr']
      },
      {
        id: 'review-results',
        label: 'Review Results',
        type: 'primary',
        icon: 'eye',
        requiredRole: ['hr', 'hiring_manager']
      },
      {
        id: 'verify-documents',
        label: 'Verify Documents',
        type: 'secondary',
        icon: 'check-square',
        requiredRole: ['hr']
      },
      {
        id: 'advance-to-offer',
        label: 'Advance to Offer',
        type: 'primary',
        icon: 'arrow-right',
        requiredRole: ['hr', 'hiring_manager']
      }
    ],
    tabs: [
      {
        id: 'background-status',
        name: 'Check Status',
        icon: 'search',
        component: 'BackgroundCheckStatus'
      },
      {
        id: 'document-verification',
        name: 'Document Verification',
        icon: 'file-check',
        component: 'DocumentVerification'
      },
      {
        id: 'results',
        name: 'Results',
        icon: 'file-text',
        component: 'BackgroundResults'
      },
      {
        id: 'notes',
        name: 'Notes',
        icon: 'edit',
        component: 'StageNotes'
      }
    ],
    permissions: {
      canView: ['hr', 'hiring_manager', 'executive'],
      canEdit: ['hr'],
      canAdvance: ['hr', 'hiring_manager'],
      canReject: ['hr', 'hiring_manager'],
      canHold: ['hr']
    }
  },
  'offer-joining': {
    id: 'offer-joining',
    name: 'Offer & Joining',
    status: 'pending',
    order: 5,
    requiredActions: ['Generate offer', 'Send offer letter', 'Complete onboarding'],
    availableActions: [
      {
        id: 'generate-offer',
        label: 'Generate Offer',
        type: 'primary',
        icon: 'file-plus',
        requiredRole: ['hr', 'hiring_manager']
      },
      {
        id: 'send-offer',
        label: 'Send Offer Letter',
        type: 'primary',
        icon: 'mail',
        requiredRole: ['hr']
      },
      {
        id: 'negotiate-terms',
        label: 'Negotiate Terms',
        type: 'secondary',
        icon: 'message-square',
        requiredRole: ['hr', 'hiring_manager']
      },
      {
        id: 'complete-hiring',
        label: 'Complete Hiring',
        type: 'primary',
        icon: 'check',
        requiresConfirmation: true,
        confirmationMessage: 'This will mark the candidate as hired. Continue?',
        requiredRole: ['hr', 'hiring_manager']
      }
    ],
    tabs: [
      {
        id: 'offer-details',
        name: 'Offer Details',
        icon: 'file-text',
        component: 'OfferDetails'
      },
      {
        id: 'negotiation',
        name: 'Negotiation',
        icon: 'message-square',
        component: 'OfferNegotiation'
      },
      {
        id: 'onboarding',
        name: 'Onboarding',
        icon: 'user-plus',
        component: 'OnboardingPrep'
      },
      {
        id: 'documents',
        name: 'Documents',
        icon: 'file',
        component: 'StageDocuments'
      }
    ],
    permissions: {
      canView: ['hr', 'hiring_manager', 'executive'],
      canEdit: ['hr', 'hiring_manager'],
      canAdvance: ['hr', 'hiring_manager'],
      canReject: ['hr', 'hiring_manager'],
      canHold: ['hr']
    }
  }
};

export const getStageConfiguration = (stageId: string): CandidateStage | null => {
  return STAGE_CONFIGURATIONS[stageId] || null;
};

export const getAllStages = (): CandidateStage[] => {
  return Object.values(STAGE_CONFIGURATIONS).sort((a, b) => a.order - b.order);
};

export const getStageActions = (stageId: string, userRole: UserRole): any[] => {
  const stage = getStageConfiguration(stageId);
  if (!stage) return [];
  
  return stage.availableActions.filter(action => 
    !action.requiredRole || action.requiredRole.includes(userRole)
  );
};

export const getStageTabs = (stageId: string, userRole: UserRole): any[] => {
  const stage = getStageConfiguration(stageId);
  if (!stage) return [];
  
  return stage.tabs.filter(tab => 
    !tab.requiredRole || tab.requiredRole.includes(userRole)
  );
};
