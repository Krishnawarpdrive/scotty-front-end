
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ReviewConfirmStepProps {
  formData: {
    interview_type: string;
    duration_minutes: number;
    scheduled_date: string;
    timezone: string;
    meeting_link: string;
    location: string;
  };
  loading: boolean;
  onBack: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
}

export const ReviewConfirmStep: React.FC<ReviewConfirmStepProps> = ({
  formData,
  loading,
  onBack,
  onCancel,
  onConfirm
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review & Confirm</h3>
      
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Interview Type:</span>
          <Badge>{formData.interview_type}</Badge>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Duration:</span>
          <span>{formData.duration_minutes} minutes</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date & Time:</span>
          <span>{new Date(formData.scheduled_date).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Timezone:</span>
          <span>{formData.timezone}</span>
        </div>
        {formData.meeting_link && (
          <div className="flex justify-between">
            <span className="font-medium">Meeting Link:</span>
            <span className="text-blue-600 break-all">{formData.meeting_link}</span>
          </div>
        )}
        {formData.location && (
          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{formData.location}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="space-x-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Scheduling...' : 'Schedule Interview'}
          </Button>
        </div>
      </div>
    </div>
  );
};
