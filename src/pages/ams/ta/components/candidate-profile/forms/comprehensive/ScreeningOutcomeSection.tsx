
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

interface ScreeningOutcomeData {
  overallRating: number;
  recommendation: 'strongly-recommend' | 'recommend' | 'conditional' | 'not-recommend';
  strengths: string;
  concerns: string;
  nextSteps: string;
  interviewReadiness: boolean;
}

interface ScreeningOutcomeSectionProps {
  data: ScreeningOutcomeData;
  onChange: (data: ScreeningOutcomeData) => void;
}

export const ScreeningOutcomeSection: React.FC<ScreeningOutcomeSectionProps> = ({
  data,
  onChange
}) => {
  const updateField = (field: keyof ScreeningOutcomeData, value: string | number | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const renderStarRating = (rating: number, onChange: (rating: number) => void) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`w-6 h-6 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400 transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );

  const getRecommendationBadge = (recommendation: ScreeningOutcomeData['recommendation']) => {
    const variants = {
      'strongly-recommend': 'default',
      'recommend': 'secondary',
      'conditional': 'outline',
      'not-recommend': 'destructive'
    } as const;

    const labels = {
      'strongly-recommend': 'Strongly Recommend',
      'recommend': 'Recommend',
      'conditional': 'Conditional',
      'not-recommend': 'Not Recommend'
    };

    return (
      <Badge variant={variants[recommendation]} className="ml-2">
        {labels[recommendation]}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Screening Outcome
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Overall Rating</Label>
            <div className="flex items-center space-x-3 mt-2">
              {renderStarRating(data.overallRating, (rating) => updateField('overallRating', rating))}
              <span className="text-sm text-gray-600">
                {data.overallRating}/5
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="recommendation">Recommendation</Label>
            <div className="flex items-center mt-2">
              <Select
                value={data.recommendation}
                onValueChange={(value) => updateField('recommendation', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strongly-recommend">Strongly Recommend</SelectItem>
                  <SelectItem value="recommend">Recommend</SelectItem>
                  <SelectItem value="conditional">Conditional</SelectItem>
                  <SelectItem value="not-recommend">Not Recommend</SelectItem>
                </SelectContent>
              </Select>
              {getRecommendationBadge(data.recommendation)}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="strengths">Key Strengths</Label>
          <Textarea
            id="strengths"
            value={data.strengths}
            onChange={(e) => updateField('strengths', e.target.value)}
            placeholder="Highlight the candidate's key strengths observed during the screening..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="concerns">Areas of Concern</Label>
          <Textarea
            id="concerns"
            value={data.concerns}
            onChange={(e) => updateField('concerns', e.target.value)}
            placeholder="Note any concerns, skill gaps, or potential red flags..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="nextSteps">Recommended Next Steps</Label>
          <Textarea
            id="nextSteps"
            value={data.nextSteps}
            onChange={(e) => updateField('nextSteps', e.target.value)}
            placeholder="Outline the recommended next steps in the hiring process..."
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="interviewReadiness"
            checked={data.interviewReadiness}
            onCheckedChange={(checked) => updateField('interviewReadiness', checked as boolean)}
          />
          <Label htmlFor="interviewReadiness">
            Candidate is ready for technical interview
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};
