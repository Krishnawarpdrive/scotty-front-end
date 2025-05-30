
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  Users,
  ExternalLink,
  CheckCircle,
  User,
  Building
} from 'lucide-react';
import { PanelistSelectionStep } from '../../../interview-scheduling/components/PanelistSelectionStep';
import { TimeSlotPicker } from '../../../interview-scheduling/TimeSlotPicker';
import { CalendarIntegration } from './CalendarIntegration';
import type { Candidate } from '../../../types/CandidateTypes';

interface InterviewSchedulingTabProps {
  candidate: Candidate;
  onSchedulingComplete: (scheduleData: any) => void;
}

export const InterviewSchedulingTab: React.FC<InterviewSchedulingTabProps> = ({
  candidate,
  onSchedulingComplete
}) => {
  const [currentStep, setCurrentStep] = useState<'panelist' | 'scheduling' | 'confirmation'>('panelist');
  const [selectedPanelist, setSelectedPanelist] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [panelistType, setPanelistType] = useState<'internal' | 'external'>('internal');
  const [scheduleData, setScheduleData] = useState<any>(null);

  const handlePanelistSelect = (panelistId: string) => {
    // Mock panelist data - in real app, fetch from API
    const mockPanelist = {
      id: panelistId,
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      type: panelistType,
      avatar: null,
      expertise: ['React', 'Node.js', 'System Design'],
      experience: '8 years',
      rating: 4.8
    };
    
    setSelectedPanelist(mockPanelist);
    setCurrentStep('scheduling');
  };

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
  };

  const handleConfirmSchedule = () => {
    const finalScheduleData = {
      panelist: selectedPanelist,
      timeSlot: selectedSlot,
      type: panelistType,
      scheduledAt: new Date().toISOString(),
      status: 'scheduled'
    };
    
    setScheduleData(finalScheduleData);
    setCurrentStep('confirmation');
    onSchedulingComplete(finalScheduleData);
  };

  const isExternalPanelist = panelistType === 'external';

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {['panelist', 'scheduling', 'confirmation'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep === step || (index === 0 && selectedPanelist) || (index === 1 && selectedSlot) || (index === 2 && scheduleData)
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {index + 1}
              </div>
              {index < 2 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  (index === 0 && selectedPanelist) || (index === 1 && selectedSlot)
                    ? 'bg-blue-600' 
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <Badge variant="outline" className="text-xs">
          Step {currentStep === 'panelist' ? 1 : currentStep === 'scheduling' ? 2 : 3} of 3
        </Badge>
      </div>

      {/* Panelist Type Selection */}
      {currentStep === 'panelist' && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Select Interviewer Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={panelistType} onValueChange={(value) => setPanelistType(value as 'internal' | 'external')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="internal" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Internal Panelist
                </TabsTrigger>
                <TabsTrigger value="external" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  External Panelist
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="internal" className="mt-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Internal Panelist</h4>
                  <p className="text-sm text-blue-700">
                    Select from your organization's certified interview panelists. 
                    These are employees trained in your interview process.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="external" className="mt-4">
                <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                  <h4 className="font-medium text-yellow-900 mb-2">External Panelist</h4>
                  <p className="text-sm text-yellow-700">
                    Select from pre-approved external experts. These panelists provide 
                    specialized expertise and unbiased evaluation.
                  </p>
                  <Badge variant="outline" className="mt-2 border-yellow-500 text-yellow-700">
                    Premium Feature
                  </Badge>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Step Content */}
      <div className={`${isExternalPanelist ? 'border-2 border-yellow-300 rounded-lg p-1' : ''}`}>
        <Card className={`${isExternalPanelist ? 'border-yellow-200' : ''}`}>
          <CardContent className="p-6">
            {currentStep === 'panelist' && (
              <PanelistSelectionStep
                interviewType="technical"
                onPanelistSelect={handlePanelistSelect}
              />
            )}

            {currentStep === 'scheduling' && selectedPanelist && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Schedule Interview</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep('panelist')}
                  >
                    Change Panelist
                  </Button>
                </div>

                {/* Selected Panelist Summary */}
                <Card className={`p-4 ${isExternalPanelist ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      isExternalPanelist ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}>
                      {selectedPanelist.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{selectedPanelist.name}</h4>
                      <p className="text-sm text-gray-600">{selectedPanelist.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {isExternalPanelist && (
                          <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-700">
                            External
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">{selectedPanelist.experience} experience</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <TimeSlotPicker
                  panelistId={selectedPanelist.id}
                  duration={60}
                  timezone="UTC"
                  onSelect={handleSlotSelect}
                />

                {selectedSlot && (
                  <div className="flex justify-end">
                    <Button onClick={handleConfirmSchedule}>
                      Confirm Schedule
                    </Button>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'confirmation' && scheduleData && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Interview Scheduled Successfully!
                  </h3>
                  <p className="text-gray-600">
                    The technical interview has been scheduled for {candidate.name}
                  </p>
                </div>

                <Card className="p-4 bg-gray-50">
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Interviewer:</strong> {scheduleData.panelist.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Date:</strong> {new Date(scheduleData.timeSlot?.start || new Date()).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Time:</strong> {new Date(scheduleData.timeSlot?.start || new Date()).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </Card>

                <CalendarIntegration scheduleData={scheduleData} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
