
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Chip, Avatar, IconButton, Checkbox, Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, Download as DownloadIcon, Archive as ArchiveIcon } from '@mui/icons-material';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import CandidateDetailDrawer from './drawer/CandidateDetailDrawer';

interface Candidate {
  id: string;
  name: string;
  candidateId: string;
  avatar?: string;
  type: 'Fresher' | 'Experienced';
  source: string;
  appliedRoles: string[];
  currentStage: string;
  score: number;
  status: 'Active' | 'On Hold' | 'Rejected' | 'Hired';
  assignedTA: {
    name: string;
    avatar?: string;
  };
  lastUpdated: string;
  email?: string;
  phone?: string;
}

const CandidatePoolPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);

  // Mock data
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Nithin Chandarika',
      candidateId: 'CID-NC001',
      type: 'Fresher',
      source: 'LinkedIn',
      appliedRoles: ['UI/UX Designer', 'Product Designer'],
      currentStage: 'Internal Interview',
      score: 4.2,
      status: 'Active',
      assignedTA: {
        name: 'Sarah Johnson',
        avatar: '/placeholder.svg'
      },
      lastUpdated: '2 hours ago',
      email: 'nithin@example.com',
      phone: '+91 9876543210'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      candidateId: 'CID-PS002',
      type: 'Experienced',
      source: 'Referral',
      appliedRoles: ['Senior Developer'],
      currentStage: 'Client Interview',
      score: 4.5,
      status: 'Active',
      assignedTA: {
        name: 'Mike Chen',
        avatar: '/placeholder.svg'
      },
      lastUpdated: '1 day ago',
      email: 'priya@example.com',
      phone: '+91 9876543211'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Hold': return 'warning';
      case 'Rejected': return 'error';
      case 'Hired': return 'info';
      default: return 'default';
    }
  };

  const columns: DataTableColumn<Candidate>[] = [
    {
      id: 'select',
      header: '',
      cell: (candidate) => (
        <Checkbox
          checked={selectedCandidates.includes(candidate.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedCandidates([...selectedCandidates, candidate.id]);
            } else {
              setSelectedCandidates(selectedCandidates.filter(id => id !== candidate.id));
            }
          }}
          size="small"
        />
      ),
      width: '40px'
    },
    {
      id: 'candidate',
      header: 'Candidate',
      cell: (candidate) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={candidate.avatar} sx={{ width: 32, height: 32 }}>
            {candidate.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Rubik, sans-serif' }}>
              {candidate.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                {candidate.candidateId}
              </Typography>
              <Chip
                label={candidate.type}
                size="small"
                color={candidate.type === 'Fresher' ? 'primary' : 'secondary'}
                sx={{ fontSize: '9px', height: '16px' }}
              />
            </Box>
          </Box>
        </Box>
      ),
      sortable: true,
      filterable: true
    },
    {
      id: 'source',
      header: 'Source',
      cell: (candidate) => (
        <Typography sx={{ fontSize: '12px', fontFamily: 'Rubik, sans-serif' }}>
          {candidate.source}
        </Typography>
      ),
      sortable: true,
      filterable: true
    },
    {
      id: 'appliedRoles',
      header: 'Applied Roles',
      cell: (candidate) => (
        <Box sx={{ maxWidth: '150px' }}>
          {candidate.appliedRoles.slice(0, 2).map((role, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: '11px',
                fontFamily: 'Rubik, sans-serif',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {role}
            </Typography>
          ))}
          {candidate.appliedRoles.length > 2 && (
            <Typography sx={{ fontSize: '10px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
              +{candidate.appliedRoles.length - 2} more
            </Typography>
          )}
        </Box>
      ),
      filterable: true
    },
    {
      id: 'currentStage',
      header: 'Current Stage',
      cell: (candidate) => (
        <Chip
          label={candidate.currentStage}
          size="small"
          variant="outlined"
          sx={{ fontSize: '10px' }}
        />
      ),
      sortable: true,
      filterable: true
    },
    {
      id: 'score',
      header: 'Score',
      cell: (candidate) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '12px', fontFamily: 'Rubik, sans-serif' }}>
            {candidate.score}
          </Typography>
          <Typography sx={{ fontSize: '10px', color: '#FFC107' }}>★</Typography>
        </Box>
      ),
      sortable: true
    },
    {
      id: 'status',
      header: 'Status',
      cell: (candidate) => (
        <Chip
          label={candidate.status}
          size="small"
          color={getStatusColor(candidate.status) as any}
          sx={{ fontSize: '10px' }}
        />
      ),
      sortable: true,
      filterable: true
    },
    {
      id: 'assignedTA',
      header: 'Assigned TA',
      cell: (candidate) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={candidate.assignedTA.avatar} sx={{ width: 24, height: 24 }}>
            {candidate.assignedTA.name.charAt(0)}
          </Avatar>
          <Typography sx={{ fontSize: '11px', fontFamily: 'Rubik, sans-serif' }}>
            {candidate.assignedTA.name}
          </Typography>
        </Box>
      ),
      filterable: true
    },
    {
      id: 'lastUpdated',
      header: 'Last Updated',
      cell: (candidate) => (
        <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
          {candidate.lastUpdated}
        </Typography>
      ),
      sortable: true
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (candidate) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => handleViewCandidate(candidate)}
            sx={{ fontSize: '12px' }}
          >
            👁️
          </IconButton>
          <IconButton size="small" sx={{ fontSize: '12px' }}>
            ✏️
          </IconButton>
          <IconButton size="small" sx={{ fontSize: '12px' }}>
            📧
          </IconButton>
        </Box>
      )
    }
  ];

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for candidates:`, selectedCandidates);
    // Implement bulk actions
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 600,
            color: '#262626',
            mb: 1
          }}
        >
          Candidate Pool
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#666',
            fontFamily: 'Rubik, sans-serif'
          }}
        >
          Manage and track candidates across all roles and requirements
        </Typography>
      </Box>

      {/* Daily Metrics Summary */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Box sx={{ backgroundColor: '#f8f9fa', borderRadius: '8px', p: 2, minWidth: '120px' }}>
          <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
            Today's Calls
          </Typography>
          <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#262626', fontFamily: 'Rubik, sans-serif' }}>
            12
          </Typography>
        </Box>
        <Box sx={{ backgroundColor: '#f8f9fa', borderRadius: '8px', p: 2, minWidth: '120px' }}>
          <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
            Interviews
          </Typography>
          <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#262626', fontFamily: 'Rubik, sans-serif' }}>
            8
          </Typography>
        </Box>
        <Box sx={{ backgroundColor: '#f8f9fa', borderRadius: '8px', p: 2, minWidth: '120px' }}>
          <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
            New Candidates
          </Typography>
          <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#262626', fontFamily: 'Rubik, sans-serif' }}>
            5
          </Typography>
        </Box>
      </Box>

      {/* Search and Filter Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          placeholder="Search candidates by name, email, phone, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, maxWidth: '400px' }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: '#666', mr: 1 }} />
          }}
        />

        <Button
          startIcon={<FilterIcon />}
          onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
          variant="outlined"
          size="small"
          sx={{ fontSize: '12px' }}
        >
          Filters
        </Button>

        {selectedCandidates.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ fontSize: '12px', color: '#666', alignSelf: 'center', fontFamily: 'Rubik, sans-serif' }}>
              {selectedCandidates.length} selected
            </Typography>
            <Button
              size="small"
              startIcon={<ArchiveIcon />}
              onClick={() => handleBulkAction('archive')}
              sx={{ fontSize: '11px' }}
            >
              Archive
            </Button>
            <Button
              size="small"
              startIcon={<DownloadIcon />}
              onClick={() => handleBulkAction('export')}
              sx={{ fontSize: '11px' }}
            >
              Export
            </Button>
          </Box>
        )}
      </Box>

      {/* Candidate Table */}
      <DataTable
        data={candidates}
        columns={columns}
        onRowClick={handleViewCandidate}
      />

      {/* Filter Menu */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => setFilterMenuAnchor(null)}
      >
        <MenuItem onClick={() => setFilterMenuAnchor(null)}>Role Filter</MenuItem>
        <MenuItem onClick={() => setFilterMenuAnchor(null)}>Stage Filter</MenuItem>
        <MenuItem onClick={() => setFilterMenuAnchor(null)}>TA Filter</MenuItem>
        <MenuItem onClick={() => setFilterMenuAnchor(null)}>Date Filter</MenuItem>
      </Menu>

      {/* Candidate Detail Drawer */}
      <CandidateDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        candidateData={selectedCandidate}
      />
    </Box>
  );
};

export default CandidatePoolPage;
