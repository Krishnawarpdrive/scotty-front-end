
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, IconButton, Switch, FormControlLabel } from '@mui/material';
import { Trash2, Video, FileText, Link, HelpCircle, User, Plus } from 'lucide-react';
import { JourneyStage, ContentItem } from '../types/CandidateJourneyTypes';

interface JourneyTimelineProps {
  stages: JourneyStage[];
  contentRepository: ContentItem[];
  onItemDrop: (stageId: string, contentItem: ContentItem) => void;
  onItemRemove: (stageId: string, itemId: string) => void;
  onToggleMandatory: (stageId: string, itemId: string) => void;
  draggedItem?: ContentItem | null;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  stages,
  contentRepository,
  onItemDrop,
  onItemRemove,
  onToggleMandatory,
  draggedItem
}) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const getIconByType = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-3 h-3" />;
      case 'document': return <FileText className="w-3 h-3" />;
      case 'link': return <Link className="w-3 h-3" />;
      case 'question': return <HelpCircle className="w-3 h-3" />;
      case 'profile': return <User className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'configured': return '#009933';
      case 'partially-configured': return '#f59e0b';
      case 'not-configured': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'configured': return 'Configured';
      case 'partially-configured': return 'Partial';
      case 'not-configured': return 'Not Set';
      default: return 'Unknown';
    }
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setHoveredStage(stageId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear hover if we're leaving the drop zone entirely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setHoveredStage(null);
    }
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    console.log('Drop event triggered for stage:', stageId);
    
    // Handle drops from content repository
    if (draggedItem) {
      console.log('Dropping item from repository:', draggedItem.title);
      onItemDrop(stageId, draggedItem);
    } else {
      // Handle native drag data (fallback)
      try {
        const itemData = e.dataTransfer.getData('application/json');
        if (itemData) {
          const contentItem = JSON.parse(itemData);
          console.log('Dropping item from native drag:', contentItem.title);
          onItemDrop(stageId, contentItem);
        }
      } catch (error) {
        console.warn('Could not parse drag data:', error);
      }
    }
    
    setHoveredStage(null);
  };

  const getContentItemById = (id: string) => {
    return contentRepository.find(item => item.id === id);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{
        fontFamily: 'Rubik, sans-serif',
        fontSize: '13px',
        color: '#666',
        mb: 2
      }}>
        Candidate Journey Timeline ({stages.length} stages)
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {stages.map((stage, index) => {
            const isHovered = hoveredStage === stage.id;
            const hasItems = stage.config?.items && stage.config.items.length > 0;
            
            return (
              <Card
                key={stage.id}
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage.id)}
                sx={{
                  border: isHovered ? '2px dashed #009933' : '2px dashed transparent',
                  backgroundColor: isHovered ? '#f0fdf4' : 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: isHovered ? '#009933' : '#e5e7eb'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Stage Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '12px',
                        color: '#666',
                        fontWeight: 'normal'
                      }}>
                        #{stage.order}
                      </Typography>
                      
                      <Typography sx={{
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#333'
                      }}>
                        {stage.name}
                      </Typography>
                    </Box>

                    <Chip
                      label={getStatusText(stage.status)}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(stage.status),
                        color: 'white',
                        fontSize: '11px',
                        fontFamily: 'Rubik, sans-serif'
                      }}
                    />
                  </Box>

                  {/* Drop Zone */}
                  {!hasItems && (
                    <Box sx={{
                      border: '2px dashed #e5e7eb',
                      borderRadius: '8px',
                      p: 3,
                      textAlign: 'center',
                      backgroundColor: isHovered ? 'rgba(0, 153, 51, 0.05)' : '#f9fafb',
                      borderColor: isHovered ? '#009933' : '#e5e7eb',
                      mb: 2,
                      transition: 'all 0.2s ease'
                    }}>
                      <Plus className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                      <Typography sx={{
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '13px',
                        color: isHovered ? '#009933' : '#9ca3af',
                        fontWeight: isHovered ? 500 : 400
                      }}>
                        {isHovered ? 'Drop content here' : 'Drag content items here'}
                      </Typography>
                    </Box>
                  )}

                  {/* Stage Items */}
                  {hasItems && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                      {stage.config.items.map((item) => {
                        const contentItem = getContentItemById(item.content_item_id);
                        if (!contentItem) return null;

                        return (
                          <Box
                            key={item.id}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              p: 2,
                              backgroundColor: '#f8f9fa',
                              borderRadius: '8px',
                              border: '1px solid #e9ecef'
                            }}
                          >
                            <Box sx={{ color: '#666' }}>
                              {getIconByType(contentItem.type)}
                            </Box>
                            
                            <Typography sx={{
                              fontFamily: 'Rubik, sans-serif',
                              fontSize: '13px',
                              color: '#333',
                              flexGrow: 1
                            }}>
                              {contentItem.title}
                            </Typography>

                            <FormControlLabel
                              control={
                                <Switch
                                  checked={item.mandatory}
                                  onChange={() => onToggleMandatory(stage.id, item.id)}
                                  size="small"
                                />
                              }
                              label="Required"
                              sx={{
                                ml: 1,
                                '& .MuiFormControlLabel-label': {
                                  fontSize: '11px',
                                  fontFamily: 'Rubik, sans-serif'
                                }
                              }}
                            />

                            <IconButton
                              size="small"
                              onClick={() => onItemRemove(stage.id, item.id)}
                              sx={{ ml: 1 }}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </IconButton>
                          </Box>
                        );
                      })}
                    </Box>
                  )}

                  {/* Additional Drop Zone for stages with items */}
                  {hasItems && (
                    <Box 
                      sx={{
                        border: '1px dashed #e5e7eb',
                        borderRadius: '6px',
                        p: 2,
                        textAlign: 'center',
                        backgroundColor: isHovered ? 'rgba(0, 153, 51, 0.05)' : 'transparent',
                        borderColor: isHovered ? '#009933' : '#e5e7eb',
                        opacity: isHovered ? 1 : 0.6,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Typography sx={{
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '12px',
                        color: isHovered ? '#009933' : '#9ca3af'
                      }}>
                        {isHovered ? 'Drop to add more content' : 'Drop zone'}
                      </Typography>
                    </Box>
                  )}

                  {/* Connector */}
                  {index < stages.length - 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Box sx={{
                        width: '2px',
                        height: '20px',
                        backgroundColor: '#e5e7eb'
                      }} />
                    </Box>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default JourneyTimeline;
