
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { ArrowRight, Settings, RefreshCw } from 'lucide-react';
import { useCandidateJourney } from './hooks/useCandidateJourney';
import { usePipelineConfig } from './hooks/usePipelineConfig';
import ContentRepository from './components/ContentRepository';
import JourneyTimeline from './components/JourneyTimeline';
import { ContentItem } from './types/CandidateJourneyTypes';
import { EnhancedStage } from './types/StageTypes';

interface CandidateJourneyTabProps {
  roleData: any;
  onSwitchToPipeline?: () => void;
}

const CandidateJourneyTab: React.FC<CandidateJourneyTabProps> = ({ 
  roleData, 
  onSwitchToPipeline 
}) => {
  const { pipelineStages, loading: pipelineLoading, refreshPipeline } = usePipelineConfig(roleData?.id);
  
  // Convert pipelineStages to EnhancedStage[] for the journey hook
  const enhancedPipelineStages: EnhancedStage[] = pipelineStages.map(stage => ({
    ...stage,
    status: 'not-configured' as const,
    interviewers: [],
    scheduling: { isScheduled: false },
  }));

  const {
    contentRepository,
    journeyStages,
    loading: journeyLoading,
    hasPipeline,
    addItemToStage,
    removeItemFromStage,
    toggleItemMandatory,
    refreshData
  } = useCandidateJourney(roleData?.id, enhancedPipelineStages);

  const [draggedItem, setDraggedItem] = useState<ContentItem | null>(null);

  // Refresh data when pipeline stages change
  useEffect(() => {
    if (pipelineStages.length > 0) {
      console.log('Pipeline stages updated, refreshing journey data');
      refreshData();
    }
  }, [pipelineStages, refreshData]);

  // Handle refresh button click
  const handleRefresh = async () => {
    console.log('Manual refresh triggered');
    await refreshPipeline();
    setTimeout(() => refreshData(), 100); // Small delay to ensure pipeline is updated first
  };

  const loading = pipelineLoading || journeyLoading;

  // Show "Create Pipeline First" if no pipeline exists
  if (!loading && (!hasPipeline || pipelineStages.length === 0)) {
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
              onClick={onSwitchToPipeline}
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
    console.log('Item dragged:', item.title);
  };

  // Handle item drop to stage
  const handleItemDrop = async (stageId: string, contentItem: ContentItem) => {
    console.log('Item dropped:', contentItem.title, 'to stage:', stageId);
    if (contentItem) {
      await addItemToStage(stageId, contentItem.id, false);
    }
    setDraggedItem(null);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
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
        
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshCw className="w-4 h-4" />}
          onClick={handleRefresh}
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '12px',
            textTransform: 'none',
            borderColor: '#e5e7eb',
            color: '#666',
            '&:hover': {
              borderColor: '#d1d5db',
              backgroundColor: '#f9fafb',
            },
          }}
        >
          Sync with Pipeline
        </Button>
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
            draggedItem={draggedItem}
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
