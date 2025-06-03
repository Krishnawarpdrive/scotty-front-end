
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';

interface SalaryAvailabilityData {
  currentSalary: string;
  expectedSalary: string;
  negotiable: boolean;
  noticePeriod: string;
  preferredStartDate: string;
  willingToRelocate: boolean;
  remoteWorkPreference: 'fully-remote' | 'hybrid' | 'onsite' | 'flexible';
}

interface SalaryAvailabilitySectionProps {
  data: SalaryAvailabilityData;
  onChange: (data: SalaryAvailabilityData) => void;
}

export const SalaryAvailabilitySection: React.FC<SalaryAvailabilitySectionProps> = ({
  data,
  onChange
}) => {
  const updateField = (field: keyof SalaryAvailabilityData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Salary & Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currentSalary">Current Salary</Label>
            <Input
              id="currentSalary"
              value={data.currentSalary}
              onChange={(e) => updateField('currentSalary', e.target.value)}
              placeholder="e.g., $75,000 or €65,000"
            />
          </div>
          
          <div>
            <Label htmlFor="expectedSalary">Expected Salary</Label>
            <Input
              id="expectedSalary"
              value={data.expectedSalary}
              onChange={(e) => updateField('expectedSalary', e.target.value)}
              placeholder="e.g., $85,000 or €75,000"
            />
          </div>

          <div className="flex items-center space-x-2 md:col-span-2">
            <Checkbox
              id="negotiable"
              checked={data.negotiable}
              onCheckedChange={(checked) => updateField('negotiable', checked as boolean)}
            />
            <Label htmlFor="negotiable">
              Salary is negotiable
            </Label>
          </div>

          <div>
            <Label htmlFor="noticePeriod">Notice Period</Label>
            <Input
              id="noticePeriod"
              value={data.noticePeriod}
              onChange={(e) => updateField('noticePeriod', e.target.value)}
              placeholder="e.g., 2 weeks, 1 month, 3 months"
            />
          </div>

          <div>
            <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
            <Input
              id="preferredStartDate"
              type="date"
              value={data.preferredStartDate}
              onChange={(e) => updateField('preferredStartDate', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="remoteWorkPreference">Remote Work Preference</Label>
            <Select
              value={data.remoteWorkPreference}
              onValueChange={(value) => updateField('remoteWorkPreference', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fully-remote">Fully Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid (Mix of remote/office)</SelectItem>
                <SelectItem value="onsite">On-site Only</SelectItem>
                <SelectItem value="flexible">Flexible/Open to Discussion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="willingToRelocate"
              checked={data.willingToRelocate}
              onCheckedChange={(checked) => updateField('willingToRelocate', checked as boolean)}
            />
            <Label htmlFor="willingToRelocate">
              Willing to relocate if required
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
