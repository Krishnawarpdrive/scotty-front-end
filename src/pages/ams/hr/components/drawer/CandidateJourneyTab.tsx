
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { ArrowRight, Settings } from 'lucide-react';
import { useCandidateJourney } from './hooks/useCandidateJourney';
import { usePipelineConfig } from './hooks/usePipelineConfig';
import ContentRepository from './components/ContentRepository';
import JourneyTimeline from './components/JourneyTimeline';
import { ContentItem } from './types/CandidateJourneyTypes';

interface CandidateJourneyTabProps {
  roleData: any;
}

const CandidateJourneyTab: React.FC<CandidateJourneyTabProps> = ({ roleData }) => {
  const { pipelineStages } = usePipelineConfig();
  const {
    contentRepository,
    journeyStages,
    loading,
    hasPipeline,
    addItemToStage,
    removeItemFromStage,
    toggleItemMandatory
  } = useCandidateJourney(roleData?.id, pipelineStages);

  const [draggedItem, setDraggedItem] = useState<ContentItem | null>(null);

  // Show "Create Pipeline First" if no pipeline exists
  if (!loading && !hasPipeline) {
    return (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 400, textAlign: 'center' }}>
          <CardContent sx={{ p: 4 }}>
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: '#262626',
                mb: 2,
              }}
            >
              Create Hiring Pipeline First
            </Typography>
            
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '13px',
                color: '#666',
                mb: 3,
                lineHeight: 1.5
              }}
            >
              Before configuring the candidate journey, you need to create and save a hiring pipeline for this role. The candidate journey will automatically sync with your pipeline stages.
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowRight className="w-4 h-4" />}
              sx={{
                backgroundColor: '#009933',
                color: 'white',
                fontFamily: 'Rubik, sans-serif',
                fontSize: '13px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#007a2b'
                }
              }}
              onClick={() => {
                // Switch to pipeline tab (this would be handled by parent component)
                console.log('Switch to Configure Hiring Pipeline tab');
              }}
            >
              Configure Pipeline
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '14px',
          color: '#666'
        }}>
          Loading candidate journey configuration...
        </Typography>
      </Box>
    );
  }

  // Handle item drag from repository
  const handleItemDrag = (item: ContentItem) => {
    setDraggedItem(item);
  };

  // Handle item drop to stage
  const handleItemDrop = async (stageId: string, contentItem: ContentItem) => {
    if (contentItem) {
      await addItemToStage(stageId, contentItem.id, false);
    }
    setDraggedItem(null);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            color: '#262626',
            mb: 1,
          }}
        >
          Configure Candidate Journey
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
            color: '#666'
          }}
        >
          Configure stage-wise candidate experiences with content, instructions, and interactive components.
        </Typography>
      </Box>

      {/* Two-Panel Layout */}
      <Box sx={{ flexGrow: 1, display: 'flex', gap: 3, overflow: 'hidden' }}>
        {/* Left Panel: Journey Timeline */}
        <Box sx={{ flex: '2', minWidth: 0 }}>
          <JourneyTimeline
            stages={journeyStages}
            contentRepository={contentRepository}
            onItemDrop={handleItemDrop}
            onItemRemove={removeItemFromStage}
            onToggleMandatory={toggleItemMandatory}
          />
        </Box>

        {/* Right Panel: Content Repository */}
        <Box sx={{ flex: '1', minWidth: 300, borderLeft: '1px solid #e5e7eb', pl: 3 }}>
          <ContentRepository
            contentItems={contentRepository}
            onItemDrag={handleItemDrag}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateJourneyTab;
