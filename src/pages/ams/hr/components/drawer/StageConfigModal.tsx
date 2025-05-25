
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Box } from '@mui/material';
import StageConfigModalHeader from './components/StageConfigModalHeader';
import InterviewFormatSection from './components/InterviewFormatSection';
import InterviewersSection from './components/InterviewersSection';
import StageConfigFields from './components/StageConfigFields';
import StageConfigModalActions from './components/StageConfigModalActions';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

interface StageConfigModalProps {
  open: boolean;
  onClose: () => void;
  stage: Stage | null;
  onSave: (stageId: string, config: any) => void;
}

// Mock data for interviewers
const mockInterviewers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
  { id: '2', name: 'Mike Chen', email: 'mike.chen@company.com' },
  { id: '3', name: 'Emily Davis', email: 'emily.davis@company.com' },
  { id: '4', name: 'Alex Kumar', email: 'alex.kumar@company.com' },
  { id: '5', name: 'Lisa Wilson', email: 'lisa.wilson@company.com' },
];

const StageConfigModal: React.FC<StageConfigModalProps> = ({
  open,
  onClose,
  stage,
  onSave,
}) => {
  const [config, setConfig] = useState<any>({
    interviewFormat: 'one-to-one',
    interviewers: [],
    notes: '',
    maxCandidatesPerRound: 8,
    candidateInstructions: '',
  });

  useEffect(() => {
    if (stage) {
      setConfig({
        interviewFormat: stage.config?.interviewFormat || 'one-to-one',
        interviewers: stage.config?.interviewers || [],
        notes: stage.config?.notes || '',
        maxCandidatesPerRound: stage.config?.maxCandidatesPerRound || 8,
        candidateInstructions: stage.config?.candidateInstructions || '',
      });
    }
  }, [stage]);

  if (!stage) return null;

  const isGroupDiscussion = stage.name.toLowerCase().includes('group');

  const handleSave = () => {
    onSave(stage.id, config);
  };

  const updateConfig = (field: string, value: any) => {
    setConfig((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          fontFamily: 'Rubik, sans-serif',
          borderRadius: '16px',
        }
      }}
    >
      <StageConfigModalHeader stageName={stage.name} />
      
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <InterviewFormatSection
            interviewFormat={config.interviewFormat}
            isGroupDiscussion={isGroupDiscussion}
            onChange={(format) => updateConfig('interviewFormat', format)}
          />

          <InterviewersSection
            interviewers={config.interviewers}
            availableInterviewers={mockInterviewers}
            onChange={(interviewers) => updateConfig('interviewers', interviewers)}
          />

          <StageConfigFields
            isGroupDiscussion={isGroupDiscussion}
            maxCandidatesPerRound={config.maxCandidatesPerRound}
            notes={config.notes}
            candidateInstructions={config.candidateInstructions}
            onMaxCandidatesChange={(value) => updateConfig('maxCandidatesPerRound', value)}
            onNotesChange={(value) => updateConfig('notes', value)}
            onCandidateInstructionsChange={(value) => updateConfig('candidateInstructions', value)}
          />
        </Box>
      </DialogContent>

      <StageConfigModalActions
        onCancel={onClose}
        onSave={handleSave}
      />
    </Dialog>
  );
};

export default StageConfigModal;
