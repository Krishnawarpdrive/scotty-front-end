
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  LinearProgress
} from '@mui/material';
import { 
  Visibility, 
  MoreVert, 
  Schedule,
  Work,
  TrendingUp
} from '@mui/icons-material';
import { supabase } from '@/integrations/supabase/client';

interface Application {
  id: string;
  role_name: string;
  client_name: string;
  status: string;
  application_date: string;
  source_type: string;
  progress?: number;
}

interface CandidateApplicationsTableProps {
  candidateId: string;
}

export const CandidateApplicationsTable: React.FC<CandidateApplicationsTableProps> = ({ candidateId }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data, error } = await supabase
          .from('candidate_applications')
          .select(`
            id,
            status,
            application_date,
            source_type,
            requirement_id,
            requirements!inner(
              name,
              client_id,
              clients!inner(name)
            )
          `)
          .eq('candidate_id', candidateId)
          .order('application_date', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching applications:', error);
          return;
        }

        const formattedApplications = (data || []).map((app: any) => ({
          id: app.id,
          role_name: app.requirements?.name || 'Unknown Role',
          client_name: app.requirements?.clients?.name || 'Unknown Client',
          status: app.status,
          application_date: app.application_date,
          source_type: app.source_type,
          progress: getProgressByStatus(app.status)
        }));

        setApplications(formattedApplications);
      } catch (error) {
        console.error('Error in fetchApplications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [candidateId]);

  const getProgressByStatus = (status: string): number => {
    switch (status.toLowerCase()) {
      case 'applied': return 20;
      case 'screening': return 40;
      case 'interview': return 60;
      case 'offer': return 80;
      case 'hired': return 100;
      case 'rejected': return 0;
      default: return 10;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied': return 'primary';
      case 'screening': return 'info';
      case 'interview': return 'warning';
      case 'offer': return 'success';
      case 'hired': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, appId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedApp(appId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApp(null);
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            My Applications
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Box key={item} sx={{ backgroundColor: '#f1f5f9', height: 48, borderRadius: 1 }} />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              My Applications
            </Typography>
            <Chip 
              label={`${applications.length} total`} 
              size="small" 
              variant="outlined"
            />
          </Box>
          <Button size="small" variant="outlined" startIcon={<Work />}>
            Browse Jobs
          </Button>
        </Box>

        {applications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              No applications found
            </Typography>
            <Button variant="contained" startIcon={<Work />}>
              Start Applying
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Progress</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Applied Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {app.role_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {app.client_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={app.status} 
                        color={getStatusColor(app.status)}
                        size="small"
                        sx={{ minWidth: 80 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={app.progress || 0}
                          sx={{ 
                            flexGrow: 1, 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: '#f1f5f9'
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {app.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(app.application_date).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={app.source_type} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={(e) => handleMenuClick(e, app.id)}
                        >
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Visibility sx={{ mr: 1 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Schedule sx={{ mr: 1 }} />
            Schedule Interview
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <TrendingUp sx={{ mr: 1 }} />
            Track Progress
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};
