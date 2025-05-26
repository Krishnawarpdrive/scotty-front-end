
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, IconButton, Switch, FormControlLabel } from '@mui/material';
import { Trash2, Video, FileText, Link, HelpCircle, User } from 'lucide-react';
import { JourneyStage, ContentItem } from '../types/CandidateJourneyTypes';

interface JourneyTimelineProps {
  stages: JourneyStage[];
  contentRepository: ContentItem[];
  onItemDrop: (stageId: string, contentItem: ContentItem) => void;
  onItemRemove: (stageId: string, itemId: string) => void;
  onToggleMandatory: (stageId: string, itemId: string) => void;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  stages,
  contentRepository,
  onItemDrop,
  onItemRemove,
  onToggleMandatory
}) => {
  const [draggedItem, setDraggedItem] = useState<ContentItem | null>(null);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (draggedItem) {
      onItemDrop(stageId, draggedItem);
      setDraggedItem(null);
    }
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
          {stages.map((stage, index) => (
            <Card
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
              sx={{
                border: '2px dashed transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#e5e7eb'
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
                {(!stage.config?.items || stage.config.items.length === 0) && (
                  <Box sx={{
                    border: '2px dashed #e5e7eb',
                    borderRadius: '8px',
                    p: 3,
                    textAlign: 'center',
                    backgroundColor: '#f9fafb',
                    mb: 2
                  }}>
                    <Typography sx={{
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '13px',
                      color: '#9ca3af'
                    }}>
                      Drag & drop content items here
                    </Typography>
                  </Box>
                )}

                {/* Stage Items */}
                {stage.config?.items && stage.config.items.length > 0 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default JourneyTimeline;
