
import React, { useState } from 'react';
import { InterviewSchedulingDrawer } from '../../interview-scheduling/InterviewSchedulingDrawer';
import { TechnicalInterviewHeader } from './components/TechnicalInterviewHeader';
import { TechnicalAssessmentAreas } from './components/TechnicalAssessmentAreas';
import { InterviewQuestionsSection } from './components/InterviewQuestionsSection';
import { OverallAssessmentSection } from './components/OverallAssessmentSection';
import { SkillsAssessmentSection } from './components/SkillsAssessmentSection';
import type { Candidate } from '../../types/CandidateTypes';
import type { InterviewSchedule } from '../../interview-scheduling/InterviewSchedulingService';

interface EnhancedTechnicalInterviewFormProps {
  candidate: Candidate;
  onSave?: (formData: any) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export const EnhancedTechnicalInterviewForm: React.FC<EnhancedTechnicalInterviewFormProps> = ({
  candidate,
  onSave,
  onNext,
  onBack
}) => {
  const [schedulingDrawerOpen, setSchedulingDrawerOpen] = useState(false);
  const [interviewScheduled, setInterviewScheduled] = useState(false);
  const [formData, setFormData] = useState({
    skillsAssessment: {} as Record<string, string>
  });

  const handleScheduleComplete = (schedule: InterviewSchedule) => {
    setInterviewScheduled(true);
    console.log('Interview scheduled:', schedule);
  };

  const handleSkillsAssessmentChange = (skill: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      skillsAssessment: {
        ...prev.skillsAssessment,
        [skill]: value
      }
    }));
  };

  const technicalAreas = [
    { name: 'Problem Solving', weight: 30, score: "0" },
    { name: 'Code Quality', weight: 25, score: "0" },
    { name: 'System Design', weight: 20, score: "0" },
    { name: 'Technical Communication', weight: 15, score: "0" },
    { name: 'Best Practices', weight: 10, score: "0" }
  ];

  return (
    <div className="space-y-6">
      <TechnicalInterviewHeader
        candidate={candidate}
        interviewScheduled={interviewScheduled}
        onScheduleInterview={() => setSchedulingDrawerOpen(true)}
      />

      <TechnicalAssessmentAreas technicalAreas={technicalAreas} />

      <InterviewQuestionsSection />

      <OverallAssessmentSection />

      <SkillsAssessmentSection
        skillsAssessment={formData.skillsAssessment}
        onSkillsAssessmentChange={handleSkillsAssessmentChange}
      />

      <InterviewSchedulingDrawer
        open={schedulingDrawerOpen}
        onClose={() => setSchedulingDrawerOpen(false)}
        candidateId={candidate.id}
        candidateName={candidate.name}
        onScheduleComplete={handleScheduleComplete}
      />
    </div>
  );
};

export default EnhancedTechnicalInterviewForm;
