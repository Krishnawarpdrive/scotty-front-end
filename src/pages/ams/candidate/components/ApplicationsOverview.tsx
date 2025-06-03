
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
  Button
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { supabase } from '@/integrations/supabase/client';

interface Application {
  id: string;
  role_name: string;
  client_name: string;
  status: string;
  application_date: string;
  source_type: string;
}

interface ApplicationsOverviewProps {
  candidateId: string;
}

export const ApplicationsOverview: React.FC<ApplicationsOverviewProps> = ({ candidateId }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

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
          source_type: app.source_type
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied': return 'primary';
      case 'screening': return 'warning';
      case 'interview': return 'info';
      case 'offer': return 'success';
      case 'hired': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Applications
          </Typography>
          <Button size="small" variant="outlined">
            View All
          </Button>
        </Box>

        {loading ? (
          <Typography>Loading applications...</Typography>
        ) : applications.length === 0 ? (
          <Typography color="text.secondary">No applications found.</Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
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
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(app.application_date).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button size="small" startIcon={<Visibility />}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};
