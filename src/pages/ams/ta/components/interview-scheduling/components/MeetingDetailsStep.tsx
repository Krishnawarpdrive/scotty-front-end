
import React from 'react';
import { Button } from '@/components/ui/button';
import { Video, MapPin } from 'lucide-react';

interface MeetingDetailsStepProps {
  formData: {
    meeting_link: string;
    location: string;
    notes: string;
  };
  onFormDataChange: (updates: Partial<typeof formData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const MeetingDetailsStep: React.FC<MeetingDetailsStepProps> = ({
  formData,
  onFormDataChange,
  onBack,
  onContinue
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Meeting Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            <Video className="inline h-4 w-4 mr-1" />
            Meeting Link (Optional)
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="https://zoom.us/j/..."
            value={formData.meeting_link}
            onChange={(e) => onFormDataChange({ meeting_link: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Location (Optional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Conference Room A or Online"
            value={formData.location}
            onChange={(e) => onFormDataChange({ location: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
        <textarea
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
          placeholder="Any special instructions or notes..."
          value={formData.notes}
          onChange={(e) => onFormDataChange({ notes: e.target.value })}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onContinue}>
          Continue to Review
        </Button>
      </div>
    </div>
  );
};
