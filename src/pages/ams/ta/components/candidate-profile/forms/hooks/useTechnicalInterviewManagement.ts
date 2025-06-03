
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface TechnicalInterviewData {
  id?: string;
  candidateId: string;
  status: 'not-scheduled' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduleDetails?: {
    interviewerId: string;
    interviewerName: string;
    scheduledDate: string;
    duration: number;
    meetingLink?: string;
    notes?: string;
    interviewType: 'technical' | 'coding' | 'system-design' | 'behavioral';
  };
  feedback?: {
    technicalSkills: Record<string, number>;
    overallRating: number;
    recommendation: 'proceed' | 'hold' | 'reject';
    strengths: string;
    weaknesses: string;
    detailedNotes: string;
    submittedAt: string;
    submittedBy: string;
  };
  analytics?: {
    timeToSchedule?: number;
    timeToComplete?: number;
    rescheduledCount?: number;
    feedbackQuality?: number;
  };
}

export const useTechnicalInterviewManagement = (candidateId: string) => {
  const [interviewData, setInterviewData] = useState<TechnicalInterviewData>({
    candidateId,
    status: 'not-scheduled'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const scheduleInterview = useCallback(async (scheduleDetails: TechnicalInterviewData['scheduleDetails']) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to schedule interview
      setInterviewData(prev => ({
        ...prev,
        status: 'scheduled',
        scheduleDetails,
        analytics: {
          ...prev.analytics,
          timeToSchedule: Date.now() - new Date(prev.candidateId).getTime()
        }
      }));

      toast({
        title: "Interview Scheduled",
        description: `Technical interview scheduled with ${scheduleDetails?.interviewerName}`,
      });
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast({
        title: "Error",
        description: "Failed to schedule interview. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [candidateId, toast]);

  const submitFeedback = useCallback(async (feedback: TechnicalInterviewData['feedback']) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to submit feedback
      setInterviewData(prev => ({
        ...prev,
        status: 'completed',
        feedback,
        analytics: {
          ...prev.analytics,
          timeToComplete: Date.now() - new Date(prev.scheduleDetails?.scheduledDate || '').getTime()
        }
      }));

      toast({
        title: "Feedback Submitted",
        description: "Interview feedback has been successfully submitted",
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const rescheduleInterview = useCallback(async (newScheduleDetails: TechnicalInterviewData['scheduleDetails']) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to reschedule
      setInterviewData(prev => ({
        ...prev,
        scheduleDetails: newScheduleDetails,
        analytics: {
          ...prev.analytics,
          rescheduledCount: (prev.analytics?.rescheduledCount || 0) + 1
        }
      }));

      toast({
        title: "Interview Rescheduled",
        description: "Interview has been successfully rescheduled",
      });
    } catch (error) {
      console.error('Error rescheduling interview:', error);
      toast({
        title: "Error",
        description: "Failed to reschedule interview. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const cancelInterview = useCallback(async (reason: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to cancel
      setInterviewData(prev => ({
        ...prev,
        status: 'cancelled'
      }));

      toast({
        title: "Interview Cancelled",
        description: `Interview cancelled: ${reason}`,
      });
    } catch (error) {
      console.error('Error cancelling interview:', error);
      toast({
        title: "Error",
        description: "Failed to cancel interview. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    interviewData,
    isLoading,
    scheduleInterview,
    submitFeedback,
    rescheduleInterview,
    cancelInterview,
    setInterviewData
  };
};
