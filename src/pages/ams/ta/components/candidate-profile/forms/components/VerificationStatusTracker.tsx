
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  CheckCircle, 
  Schedule, 
  Error, 
  PlayArrow, 
  Pause,
  Refresh
} from '@mui/icons-material';
import { supabase } from '@/integrations/supabase/client';
import { Candidate } from '../../../types/CandidateTypes';

interface VerificationStatusTrackerProps {
  candidate: Candidate;
}

const VERIFICATION_STEPS = [
  { id: 'document_collection', label: 'Document Collection', description: 'Collect all required documents' },
  { id: 'identity_verification', label: 'Identity Verification', description: 'Verify identity documents' },
  { id: 'employment_verification', label: 'Employment Verification', description: 'Verify employment history' },
  { id: 'education_verification', label: 'Education Verification', description: 'Verify education credentials' },
  { id: 'reference_check', label: 'Reference Check', description: 'Contact provided references' },
  { id: 'criminal_background', label: 'Criminal Background Check', description: 'Conduct background screening' },
  { id: 'final_review', label: 'Final Review', description: 'Review all verification results' }
];

export const VerificationStatusTracker: React.FC<VerificationStatusTrackerProps> = ({
  candidate
}) => {
  const [verificationSession, setVerificationSession] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [verificationResults, setVerificationResults] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [sessionDialog, setSessionDialog] = useState(false);
  const [sessionData, setSessionData] = useState({
    verification_partner: '',
    sla_date: '',
    notes: ''
  });

  useEffect(() => {
    fetchVerificationData();
  }, [candidate.id]);

  const fetchVerificationData = async () => {
    try {
      // Fetch verification session
      const { data: sessionData, error: sessionError } = await supabase
        .from('background_verification_sessions')
        .select('*')
        .eq('candidate_id', candidate.id.toString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (sessionError && sessionError.code !== 'PGRST116') throw sessionError;
      setVerificationSession(sessionData);

      // Fetch documents
      const { data: docsData, error: docsError } = await supabase
        .from('candidate_documents')
        .select('*')
        .eq('candidate_id', candidate.id.toString());

      if (docsError) throw docsError;
      setDocuments(docsData || []);

      // Fetch verification results
      const { data: resultsData, error: resultsError } = await supabase
        .from('document_verification_results')
        .select('*, candidate_documents(*)')
        .in('document_id', (docsData || []).map(d => d.id));

      if (resultsError) throw resultsError;
      setVerificationResults(resultsData || []);

      // Calculate active step based on session status
      if (sessionData) {
        const stepMap: { [key: string]: number } = {
          'not_started': 0,
          'in_progress': Math.floor(VERIFICATION_STEPS.length / 2),
          'completed': VERIFICATION_STEPS.length - 1,
          'failed': VERIFICATION_STEPS.length - 1
        };
        setActiveStep(stepMap[sessionData.session_status] || 0);
      }
    } catch (error) {
      console.error('Error fetching verification data:', error);
    }
  };

  const createVerificationSession = async () => {
    try {
      const { data, error } = await supabase
        .from('background_verification_sessions')
        .insert({
          candidate_id: candidate.id.toString(),
          session_status: 'not_started',
          verification_partner: sessionData.verification_partner,
          sla_date: sessionData.sla_date || null,
          notes: sessionData.notes,
          created_by: 'current_user' // Replace with actual user
        })
        .select()
        .single();

      if (error) throw error;

      setVerificationSession(data);
      setSessionDialog(false);
      setSessionData({ verification_partner: '', sla_date: '', notes: '' });
    } catch (error) {
      console.error('Error creating verification session:', error);
    }
  };

  const updateSessionStatus = async (newStatus: string) => {
    if (!verificationSession) return;

    try {
      const updateData: any = {
        session_status: newStatus,
        updated_at: new Date().toISOString()
      };

      if (newStatus === 'in_progress' && !verificationSession.started_at) {
        updateData.started_at = new Date().toISOString();
      }

      if (newStatus === 'completed' && !verificationSession.completed_at) {
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('background_verification_sessions')
        .update(updateData)
        .eq('id', verificationSession.id)
        .select()
        .single();

      if (error) throw error;
      setVerificationSession(data);
    } catch (error) {
      console.error('Error updating session status:', error);
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < activeStep) return 'completed';
    if (stepIndex === activeStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'active': return <Schedule color="primary" />;
      default: return <Schedule color="disabled" />;
    }
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'failed': return 'error';
      case 'on_hold': return 'info';
      default: return 'default';
    }
  };

  const getCompletionPercentage = () => {
    if (!verificationSession) return 0;
    return Math.round((activeStep / (VERIFICATION_STEPS.length - 1)) * 100);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Background Verification Status
      </Typography>

      {/* Session Overview */}
      {verificationSession ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: 1, minWidth: 300 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Session Status</Typography>
                <Chip
                  label={verificationSession.session_status}
                  color={getSessionStatusColor(verificationSession.session_status)}
                  sx={{ mb: 2 }}
                />
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Verification Partner:</strong> {verificationSession.verification_partner || 'Not assigned'}
                </Typography>
                
                {verificationSession.sla_date && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>SLA Date:</strong> {new Date(verificationSession.sla_date).toLocaleDateString()}
                  </Typography>
                )}
                
                <Typography variant="body2">
                  <strong>Progress:</strong> {getCompletionPercentage()}% complete
                </Typography>
              </Box>
              
              <Box sx={{ flex: 1, minWidth: 300 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {verificationSession.session_status === 'not_started' && (
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      onClick={() => updateSessionStatus('in_progress')}
                      size="small"
                    >
                      Start Verification
                    </Button>
                  )}
                  
                  {verificationSession.session_status === 'in_progress' && (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<Pause />}
                        onClick={() => updateSessionStatus('on_hold')}
                        size="small"
                      >
                        Put on Hold
                      </Button>
                      
                      <Button
                        variant="contained"
                        startIcon={<CheckCircle />}
                        onClick={() => updateSessionStatus('completed')}
                        size="small"
                        color="success"
                      >
                        Mark Complete
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={fetchVerificationData}
                    size="small"
                  >
                    Refresh
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Alert 
          severity="info" 
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={() => setSessionDialog(true)}
            >
              Start Verification
            </Button>
          }
          sx={{ mb: 3 }}
        >
          No verification session found. Start a new background verification process.
        </Alert>
      )}

      {/* Verification Steps */}
      <Card>
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 3 }}>
            Verification Progress
          </Typography>
          
          <Stepper activeStep={activeStep} orientation="vertical">
            {VERIFICATION_STEPS.map((step, index) => (
              <Step key={step.id}>
                <StepLabel icon={getStepIcon(index)}>
                  <Typography variant="subtitle2">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                  
                  {getStepStatus(index) === 'active' && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setActiveStep(index + 1)}
                      >
                        Mark Complete
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setActiveStep(index - 1)}
                        disabled={index === 0}
                      >
                        Previous
                      </Button>
                    </Box>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Create Session Dialog */}
      <Dialog open={sessionDialog} onClose={() => setSessionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Start Background Verification</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Verification Partner"
              value={sessionData.verification_partner}
              onChange={(e) => setSessionData(prev => ({ ...prev, verification_partner: e.target.value }))}
              fullWidth
              required
            />
            
            <TextField
              label="SLA Date"
              type="date"
              value={sessionData.sla_date}
              onChange={(e) => setSessionData(prev => ({ ...prev, sla_date: e.target.value }))}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              label="Initial Notes"
              value={sessionData.notes}
              onChange={(e) => setSessionData(prev => ({ ...prev, notes: e.target.value }))}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSessionDialog(false)}>Cancel</Button>
          <Button 
            onClick={createVerificationSession}
            variant="contained"
            disabled={!sessionData.verification_partner}
          >
            Start Verification
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
