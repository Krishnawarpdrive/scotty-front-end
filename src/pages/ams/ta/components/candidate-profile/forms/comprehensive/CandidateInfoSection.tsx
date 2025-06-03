
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface CandidateInfoData {
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  currentCompany: string;
  totalExperience: string;
  relevantExperience: string;
  location: string;
  source: string;
}

interface CandidateInfoSectionProps {
  data: CandidateInfoData;
  onChange: (data: CandidateInfoData) => void;
}

export const CandidateInfoSection: React.FC<CandidateInfoSectionProps> = ({
  data,
  onChange
}) => {
  const updateField = (field: keyof CandidateInfoData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Candidate Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Enter candidate's full name"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="candidate@email.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={data.source}
              onChange={(e) => updateField('source', e.target.value)}
              placeholder="e.g., LinkedIn, Referral, Direct"
            />
          </div>

          <div>
            <Label htmlFor="currentRole">Current Role</Label>
            <Input
              id="currentRole"
              value={data.currentRole}
              onChange={(e) => updateField('currentRole', e.target.value)}
              placeholder="Current job title"
            />
          </div>

          <div>
            <Label htmlFor="currentCompany">Current Company</Label>
            <Input
              id="currentCompany"
              value={data.currentCompany}
              onChange={(e) => updateField('currentCompany', e.target.value)}
              placeholder="Current employer"
            />
          </div>

          <div>
            <Label htmlFor="totalExperience">Total Experience</Label>
            <Input
              id="totalExperience"
              value={data.totalExperience}
              onChange={(e) => updateField('totalExperience', e.target.value)}
              placeholder="e.g., 5 years"
            />
          </div>

          <div>
            <Label htmlFor="relevantExperience">Relevant Experience</Label>
            <Input
              id="relevantExperience"
              value={data.relevantExperience}
              onChange={(e) => updateField('relevantExperience', e.target.value)}
              placeholder="e.g., 3 years in similar role"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="City, State/Country"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
