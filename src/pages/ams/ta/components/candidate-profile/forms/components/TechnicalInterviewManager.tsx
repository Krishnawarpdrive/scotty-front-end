
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedTechnicalInterviewTabs } from './EnhancedTechnicalInterviewTabs';
import { AptitudeTestTab } from '../../aptitude-tests/AptitudeTestTab';
import { Calendar, MessageSquare, BookOpen } from 'lucide-react';
import type { Candidate } from '../../../types/CandidateTypes';

interface TechnicalInterviewManagerProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const TechnicalInterviewManager: React.FC<TechnicalInterviewManagerProps> = ({
  candidate,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('interview');

  return (
    <div className="w-full h-full">
      <Card className="border-0 shadow-sm h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Technical Assessment Management
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage technical interviews and aptitude tests for {candidate.name}
          </p>
        </CardHeader>
        <CardContent className="h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="interview" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Technical Interview
              </TabsTrigger>
              <TabsTrigger value="aptitude" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Aptitude Tests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="interview" className="mt-0 h-full">
              <EnhancedTechnicalInterviewTabs
                candidate={candidate}
                onSave={onSave}
              />
            </TabsContent>

            <TabsContent value="aptitude" className="mt-0 h-full">
              <div className="h-full overflow-auto">
                <AptitudeTestTab />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
