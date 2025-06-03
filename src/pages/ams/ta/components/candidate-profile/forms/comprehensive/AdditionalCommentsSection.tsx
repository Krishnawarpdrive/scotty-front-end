
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare } from 'lucide-react';

interface AdditionalCommentsData {
  generalNotes: string;
  redFlags: string;
  specialConsiderations: string;
  followUpRequired: boolean;
  followUpNotes: string;
}

interface AdditionalCommentsSectionProps {
  data: AdditionalCommentsData;
  onChange: (data: AdditionalCommentsData) => void;
}

export const AdditionalCommentsSection: React.FC<AdditionalCommentsSectionProps> = ({
  data,
  onChange
}) => {
  const updateField = (field: keyof AdditionalCommentsData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Additional Comments & Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="generalNotes">General Notes</Label>
          <Textarea
            id="generalNotes"
            value={data.generalNotes}
            onChange={(e) => updateField('generalNotes', e.target.value)}
            placeholder="Any additional observations, insights, or general comments about the candidate..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="redFlags">Red Flags or Concerns</Label>
          <Textarea
            id="redFlags"
            value={data.redFlags}
            onChange={(e) => updateField('redFlags', e.target.value)}
            placeholder="Note any potential red flags, inconsistencies, or major concerns..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="specialConsiderations">Special Considerations</Label>
          <Textarea
            id="specialConsiderations"
            value={data.specialConsiderations}
            onChange={(e) => updateField('specialConsiderations', e.target.value)}
            placeholder="Any special circumstances, accommodations, or unique aspects to consider..."
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="followUpRequired"
              checked={data.followUpRequired}
              onCheckedChange={(checked) => updateField('followUpRequired', checked as boolean)}
            />
            <Label htmlFor="followUpRequired">
              Follow-up action required
            </Label>
          </div>

          {data.followUpRequired && (
            <div>
              <Label htmlFor="followUpNotes">Follow-up Notes</Label>
              <Textarea
                id="followUpNotes"
                value={data.followUpNotes}
                onChange={(e) => updateField('followUpNotes', e.target.value)}
                placeholder="Describe what follow-up actions are needed and by when..."
                rows={3}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
