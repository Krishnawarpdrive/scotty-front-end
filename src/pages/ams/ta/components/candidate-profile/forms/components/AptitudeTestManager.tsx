
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid2 as Grid,
  Chip,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { 
  PlayArrow, 
  Assessment, 
  Timer, 
  Check, 
  Error,
  Visibility,
  Download,
  Schedule
} from '@mui/icons-material';
import { supabase } from '@/integrations/supabase/client';
import { Candidate } from '../../../types/CandidateTypes';

interface AptitudeTestManagerProps {
  candidate: Candidate;
}

export const AptitudeTestManager: React.FC<AptitudeTestManagerProps> = ({
  candidate
}) => {
  const [tests, setTests] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [assignDialog, setAssignDialog] = useState(false);
  const [resultDialog, setResultDialog] = useState<{ open: boolean; result: any }>({
    open: false,
    result: null
  });
  const [assignmentData, setAssignmentData] = useState({
    test_id: '',
    administered_by: '',
    notes: ''
  });

  useEffect(() => {
    fetchAptitudeTests();
    fetchTestResults();
  }, [candidate.id]);

  const fetchAptitudeTests = async () => {
    try {
      const { data, error } = await supabase
        .from('aptitude_tests')
        .select('*')
        .eq('is_active', true)
        .order('test_name');

      if (error) throw error;
      setTests(data || []);
    } catch (error) {
      console.error('Error fetching aptitude tests:', error);
    }
  };

  const fetchTestResults = async () => {
    try {
      const { data, error } = await supabase
        .from('candidate_aptitude_results')
        .select('*, aptitude_tests(*)')
        .eq('candidate_id', candidate.id.toString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Error fetching test results:', error);
    }
  };

  const assignTest = async () => {
    try {
      const { data, error } = await supabase
        .from('candidate_aptitude_results')
        .insert({
          candidate_id: candidate.id.toString(),
          aptitude_test_id: assignmentData.test_id,
          score: 0,
          status: 'scheduled',
          administered_by: assignmentData.administered_by,
          notes: assignmentData.notes
        })
        .select('*, aptitude_tests(*)')
        .single();

      if (error) throw error;

      setResults(prev => [data, ...prev]);
      setAssignDialog(false);
      setAssignmentData({ test_id: '', administered_by: '', notes: '' });
    } catch (error) {
      console.error('Error assigning test:', error);
    }
  };

  const updateTestStatus = async (resultId: string, status: string, score?: number) => {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (status === 'in_progress' && !results.find(r => r.id === resultId)?.test_started_at) {
        updateData.test_started_at = new Date().toISOString();
      }

      if (status === 'completed') {
        updateData.test_completed_at = new Date().toISOString();
        if (score !== undefined) {
          updateData.score = score;
        }
      }

      const { data, error } = await supabase
        .from('candidate_aptitude_results')
        .update(updateData)
        .eq('id', resultId)
        .select('*, aptitude_tests(*)')
        .single();

      if (error) throw error;

      setResults(prev => prev.map(r => r.id === resultId ? data : r));
    } catch (error) {
      console.error('Error updating test status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'failed': return 'error';
      case 'scheduled': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check />;
      case 'in_progress': return <Timer />;
      case 'failed': return <Error />;
      case 'scheduled': return <Schedule />;
      default: return <Assessment />;
    }
  };

  const getScoreColor = (score: number, passingScore: number) => {
    if (score >= passingScore) return 'success';
    if (score >= passingScore * 0.8) return 'warning';
    return 'error';
  };

  const calculateAverageScore = () => {
    const completedTests = results.filter(r => r.status === 'completed' && r.score > 0);
    if (completedTests.length === 0) return 0;
    return Math.round(completedTests.reduce((sum, test) => sum + test.score, 0) / completedTests.length);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Aptitude Test Management
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">
                {results.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Tests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main">
                {results.filter(r => r.status === 'completed').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main">
                {results.filter(r => r.status === 'in_progress').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="text.primary">
                {calculateAverageScore()}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Actions */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={() => setAssignDialog(true)}
          sx={{ bgcolor: '#009933', '&:hover': { bgcolor: '#00a341' } }}
        >
          Assign Test
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Assessment />}
          onClick={fetchTestResults}
        >
          Refresh Results
        </Button>
      </Box>

      {/* Test Results */}
      {results.length === 0 ? (
        <Alert severity="info">
          No aptitude tests assigned yet. Click "Assign Test" to get started.
        </Alert>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif' }}>
              Test Results
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Test Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {result.aptitude_tests?.test_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {result.aptitude_tests?.description}
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Chip 
                          label={result.aptitude_tests?.category} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(result.status)}
                          label={result.status}
                          color={getStatusColor(result.status)}
                          size="small"
                        />
                      </TableCell>
                      
                      <TableCell>
                        {result.status === 'completed' && result.score > 0 ? (
                          <Box>
                            <Typography 
                              variant="subtitle2"
                              color={getScoreColor(result.score, result.aptitude_tests?.passing_score || 70)}
                            >
                              {result.score}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Pass: {result.aptitude_tests?.passing_score}%
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            {result.status === 'in_progress' ? 'In progress...' : 'Not started'}
                          </Typography>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        {result.time_taken_minutes ? (
                          `${result.time_taken_minutes} min`
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            Target: {result.aptitude_tests?.duration_minutes} min
                          </Typography>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(result.created_at).toLocaleDateString()}
                        </Typography>
                        {result.test_completed_at && (
                          <Typography variant="caption" color="text.secondary">
                            Completed: {new Date(result.test_completed_at).toLocaleDateString()}
                          </Typography>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {result.status === 'scheduled' && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => updateTestStatus(result.id, 'in_progress')}
                            >
                              Start
                            </Button>
                          )}
                          
                          {result.status === 'in_progress' && (
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => updateTestStatus(result.id, 'completed', 85)}
                            >
                              Complete
                            </Button>
                          )}
                          
                          {result.status === 'completed' && (
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Visibility />}
                              onClick={() => setResultDialog({ open: true, result })}
                            >
                              View
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Assign Test Dialog */}
      <Dialog open={assignDialog} onClose={() => setAssignDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Aptitude Test</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Select Test</InputLabel>
              <Select
                value={assignmentData.test_id}
                onChange={(e) => setAssignmentData(prev => ({ ...prev, test_id: e.target.value }))}
                label="Select Test"
              >
                {tests.map((test) => (
                  <MenuItem key={test.id} value={test.id}>
                    <Box>
                      <Typography variant="subtitle2">{test.test_name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {test.category} • {test.duration_minutes} min • {test.total_questions} questions
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="Administered By"
              value={assignmentData.administered_by}
              onChange={(e) => setAssignmentData(prev => ({ ...prev, administered_by: e.target.value }))}
              fullWidth
              required
            />
            
            <TextField
              label="Notes"
              value={assignmentData.notes}
              onChange={(e) => setAssignmentData(prev => ({ ...prev, notes: e.target.value }))}
              fullWidth
              multiline
              rows={3}
              placeholder="Any special instructions or notes..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialog(false)}>Cancel</Button>
          <Button 
            onClick={assignTest}
            variant="contained"
            disabled={!assignmentData.test_id || !assignmentData.administered_by}
          >
            Assign Test
          </Button>
        </DialogActions>
      </Dialog>

      {/* Result Details Dialog */}
      <Dialog 
        open={resultDialog.open} 
        onClose={() => setResultDialog({ open: false, result: null })} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Test Result Details - {resultDialog.result?.aptitude_tests?.test_name}
        </DialogTitle>
        <DialogContent>
          {resultDialog.result && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Test Information</Typography>
                  <Typography variant="body2">
                    <strong>Category:</strong> {resultDialog.result.aptitude_tests?.category}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Difficulty:</strong> {resultDialog.result.aptitude_tests?.difficulty_level}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total Questions:</strong> {resultDialog.result.aptitude_tests?.total_questions}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Passing Score:</strong> {resultDialog.result.aptitude_tests?.passing_score}%
                  </Typography>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Performance</Typography>
                  <Typography variant="body2">
                    <strong>Final Score:</strong> {resultDialog.result.score}%
                  </Typography>
                  <Typography variant="body2">
                    <strong>Questions Attempted:</strong> {resultDialog.result.total_questions_attempted}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Correct Answers:</strong> {resultDialog.result.correct_answers}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Time Taken:</strong> {resultDialog.result.time_taken_minutes} minutes
                  </Typography>
                </Grid>
              </Grid>
              
              {resultDialog.result.notes && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Notes</Typography>
                  <Typography variant="body2">{resultDialog.result.notes}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResultDialog({ open: false, result: null })}>
            Close
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            Export Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
