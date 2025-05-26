
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Box, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { EnhancedStage } from '../types/StageTypes';
import { StageConfigUnion } from '../types/StageConfigTypes';
import PhoneScreeningForm from './stage-forms/PhoneScreeningForm';
import HygieneScreeningForm from './stage-forms/HygieneScreeningForm';
import BackgroundVerificationForm from './stage-forms/BackgroundVerificationForm';
import InterviewForm from './stage-forms/InterviewForm';
import ClientInterviewForm from './stage-forms/ClientInterviewForm';
import VendorPartnerInterviewForm from './stage-forms/VendorPartnerInterviewForm';
import AptitudeTestForm from './stage-forms/AptitudeTestForm';
import CustomStageForm from './stage-forms/CustomStageForm';

interface StageConfigModalProps {
  open: boolean;
  onClose: () => void;
  stage: EnhancedStage | null;
  onSave: (stageId: string, config: StageConfigUnion) => void;
}

const getStageType = (stageName: string): string => {
  const name = stageName.toLowerCase();
  if (name.includes('phone') || name.includes('screening')) return 'phone-screening';
  if (name.includes('hygiene')) return 'hygiene-screening';
  if (name.includes('background') || name.includes('verification')) return 'background-verification';
  if (name.includes('client')) return 'client-interview';
  if (name.includes('vendor') || name.includes('partner')) return 'vendor-partner-interview';
  if (name.includes('aptitude') || name.includes('test')) return 'aptitude-test';
  if (name.includes('interview')) return 'interview';
  return 'custom';
};

const StageConfigModal: React.FC<StageConfigModalProps> = ({
  open,
  onClose,
  stage,
  onSave,
}) => {
  const [config, setConfig] = useState<StageConfigUnion | null>(null);

  useEffect(() => {
    if (stage) {
      const stageType = getStageType(stage.name);
      const defaultConfig: any = {
        stageType,
        notes: '',
        isConfigured: false,
      };

      // Set stage-specific defaults
      switch (stageType) {
        case 'phone-screening':
          defaultConfig.callScheduled = false;
          defaultConfig.questionsToAsk = [];
          break;
        case 'hygiene-screening':
          defaultConfig.eligibilityChecklist = {
            idVerified: false,
            resumeReceived: false,
            contactConfirmed: false,
            availabilityChecked: false,
          };
          defaultConfig.customFields = [];
          break;
        case 'background-verification':
          defaultConfig.documentsUploaded = {
            resume: false,
            id: false,
            offerLetter: false,
          };
          defaultConfig.verificationStatus = 'pending';
          break;
        case 'interview':
          defaultConfig.interviewType = 'one-on-one';
          defaultConfig.mode = 'virtual';
          defaultConfig.interviewers = [];
          defaultConfig.questionsToAsk = [];
          break;
        case 'client-interview':
          defaultConfig.interviewType = 'one-on-one';
          defaultConfig.mode = 'virtual';
          defaultConfig.ndaSigned = false;
          break;
        case 'vendor-partner-interview':
          defaultConfig.type = 'vendor';
          defaultConfig.interviewType = 'one-on-one';
          defaultConfig.mode = 'virtual';
          break;
        case 'aptitude-test':
          defaultConfig.resultSource = 'auto';
          defaultConfig.status = 'pending';
          break;
        case 'custom':
          defaultConfig.stageName = stage.name;
          defaultConfig.dynamicFields = [];
          break;
      }

      setConfig({ ...defaultConfig, ...stage.config });
    }
  }, [stage]);

  const handleSave = () => {
    if (stage && config) {
      onSave(stage.id, config);
      onClose();
    }
  };

  const renderForm = () => {
    if (!config || !stage) return null;

    switch (config.stageType) {
      case 'phone-screening':
        return <PhoneScreeningForm config={config} onChange={setConfig} />;
      case 'hygiene-screening':
        return <HygieneScreeningForm config={config} onChange={setConfig} />;
      case 'background-verification':
        return <BackgroundVerificationForm config={config} onChange={setConfig} />;
      case 'interview':
        return <InterviewForm config={config} onChange={setConfig} />;
      case 'client-interview':
        return <ClientInterviewForm config={config} onChange={setConfig} />;
      case 'vendor-partner-interview':
        return <VendorPartnerInterviewForm config={config} onChange={setConfig} />;
      case 'aptitude-test':
        return <AptitudeTestForm config={config} onChange={setConfig} />;
      case 'custom':
        return <CustomStageForm config={config} onChange={setConfig} />;
      default:
        return <CustomStageForm config={config} onChange={setConfig} />;
    }
  };

  if (!stage) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          fontFamily: 'Rubik, sans-serif',
        }
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Configure {stage.name}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ minHeight: '400px' }}>
          {renderForm()}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            textTransform: 'none',
            bgcolor: '#009933',
            '&:hover': {
              bgcolor: '#007d2a',
            },
          }}
        >
          Save Configuration
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StageConfigModal;
