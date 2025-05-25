
import React from 'react';
import { TextField } from '@mui/material';

interface StageConfigFieldsProps {
  isGroupDiscussion: boolean;
  maxCandidatesPerRound: number;
  notes: string;
  candidateInstructions: string;
  onMaxCandidatesChange: (value: number) => void;
  onNotesChange: (value: string) => void;
  onCandidateInstructionsChange: (value: string) => void;
}

const StageConfigFields: React.FC<StageConfigFieldsProps> = ({
  isGroupDiscussion,
  maxCandidatesPerRound,
  notes,
  candidateInstructions,
  onMaxCandidatesChange,
  onNotesChange,
  onCandidateInstructionsChange,
}) => {
  return (
    <>
      {/* Group Discussion Specific Fields */}
      {isGroupDiscussion && (
        <TextField
          label="Max Candidates per Round"
          type="number"
          value={maxCandidatesPerRound}
          onChange={(e) => onMaxCandidatesChange(parseInt(e.target.value) || 8)}
          size="small"
          inputProps={{ min: 1, max: 20 }}
          sx={{
            '& .MuiInputLabel-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '14px',
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
            },
          }}
        />
      )}

      {/* Notes */}
      <TextField
        label="Notes (Optional)"
        multiline
        rows={3}
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Add any specific interviewer instructions or reminders..."
        size="small"
        sx={{
          '& .MuiInputLabel-root': {
            fontFamily: 'Rubik, sans-serif',
            fontSize: '14px',
          },
          '& .MuiInputBase-input': {
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
          },
        }}
      />

      {/* Group Discussion Candidate Instructions */}
      {isGroupDiscussion && (
        <TextField
          label="Candidate Instructions (Optional)"
          multiline
          rows={3}
          value={candidateInstructions}
          onChange={(e) => onCandidateInstructionsChange(e.target.value)}
          placeholder="Instructions to be shared with candidates before the group discussion..."
          size="small"
          sx={{
            '& .MuiInputLabel-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '14px',
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
            },
          }}
        />
      )}
    </>
  );
};

export default StageConfigFields;
