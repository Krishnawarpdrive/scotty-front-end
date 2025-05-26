
import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Card, CardContent, Input, Chip, Button } from '@mui/material';
import { Search, Video, FileText, Link, HelpCircle, User, Plus, GripVertical } from 'lucide-react';
import { ContentItem, ContentRepositoryTab } from '../types/CandidateJourneyTypes';

interface ContentRepositoryProps {
  contentItems: ContentItem[];
  onItemDrag: (item: ContentItem) => void;
}

const ContentRepository: React.FC<ContentRepositoryProps> = ({ contentItems, onItemDrag }) => {
  const [activeTab, setActiveTab] = useState<ContentRepositoryTab>('documents');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragging, setIsDragging] = useState<string | null>(null);

  const getIconByType = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'link': return <Link className="w-4 h-4" />;
      case 'question': return <HelpCircle className="w-4 h-4" />;
      case 'profile': return <User className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getColorByType = (type: string) => {
    switch (type) {
      case 'video': return '#e74c3c';
      case 'document': return '#3498db';
      case 'link': return '#9b59b6';
      case 'question': return '#f39c12';
      case 'profile': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  const getTabInfo = (tab: ContentRepositoryTab) => {
    const typeMap = {
      'documents': 'document',
      'videos': 'video',
      'links': 'link',
      'questions': 'question',
      'profiles': 'profile'
    };
    
    const type = typeMap[tab];
    const count = contentItems.filter(item => item.type === type).length;
    const description = {
      'documents': 'PDFs, guides, and written materials',
      'videos': 'Training videos and presentations',
      'links': 'External resources and websites',
      'questions': 'Interview questions and assessments',
      'profiles': 'Role profiles and job descriptions'
    };

    return { count, description: description[tab] };
  };

  const filteredItems = contentItems.filter(item => {
    const matchesTab = activeTab === 'documents' ? item.type === 'document' :
                     activeTab === 'videos' ? item.type === 'video' :
                     activeTab === 'links' ? item.type === 'link' :
                     activeTab === 'questions' ? item.type === 'question' :
                     activeTab === 'profiles' ? item.type === 'profile' : true;
    
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: ContentRepositoryTab) => {
    setActiveTab(newValue);
    setSearchTerm(''); // Clear search when switching tabs
  };

  const handleDragStart = (item: ContentItem) => {
    setIsDragging(item.id);
    onItemDrag(item);
    console.log('Drag started for item:', item.title);
  };

  const handleDragEnd = () => {
    setIsDragging(null);
    console.log('Drag ended');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '13px',
          color: '#666'
        }}>
          Content Repository
        </Typography>
        
        <Button
          size="small"
          startIcon={<Plus className="w-4 h-4" />}
          sx={{
            fontSize: '12px',
            fontFamily: 'Rubik, sans-serif',
            textTransform: 'none',
            color: '#009933',
            '&:hover': {
              backgroundColor: '#f0fdf4'
            }
          }}
        >
          Add Content
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" style={{ position: 'absolute' }} />
        <Input
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            pl: 4,
            width: '100%',
            fontSize: '13px',
            fontFamily: 'Rubik, sans-serif',
            '& input': {
              pl: 4
            }
          }}
        />
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: '36px',
          mb: 2,
          '& .MuiTab-root': {
            fontFamily: 'Rubik, sans-serif',
            fontSize: '12px',
            textTransform: 'none',
            minHeight: '36px',
            color: '#666',
            py: 1,
            minWidth: 'auto'
          },
          '& .Mui-selected': {
            color: '#009933 !important',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#009933',
          },
        }}
      >
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FileText className="w-3 h-3" />
              Documents
              <Chip label={getTabInfo('documents').count} size="small" sx={{ height: '16px', fontSize: '10px' }} />
            </Box>
          } 
          value="documents" 
        />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Video className="w-3 h-3" />
              Videos
              <Chip label={getTabInfo('videos').count} size="small" sx={{ height: '16px', fontSize: '10px' }} />
            </Box>
          } 
          value="videos" 
        />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Link className="w-3 h-3" />
              Links
              <Chip label={getTabInfo('links').count} size="small" sx={{ height: '16px', fontSize: '10px' }} />
            </Box>
          } 
          value="links" 
        />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HelpCircle className="w-3 h-3" />
              Questions
              <Chip label={getTabInfo('questions').count} size="small" sx={{ height: '16px', fontSize: '10px' }} />
            </Box>
          } 
          value="questions" 
        />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <User className="w-3 h-3" />
              Profiles
              <Chip label={getTabInfo('profiles').count} size="small" sx={{ height: '16px', fontSize: '10px' }} />
            </Box>
          } 
          value="profiles" 
        />
      </Tabs>

      {/* Tab Description */}
      <Typography sx={{
        fontFamily: 'Rubik, sans-serif',
        fontSize: '12px',
        color: '#999',
        mb: 2,
        fontStyle: 'italic'
      }}>
        {getTabInfo(activeTab).description}
      </Typography>

      {/* Content Items */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
        {filteredItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ color: getColorByType(activeTab === 'documents' ? 'document' : activeTab === 'videos' ? 'video' : activeTab === 'links' ? 'link' : activeTab === 'questions' ? 'question' : 'profile'), mb: 2 }}>
              {getIconByType(activeTab === 'documents' ? 'document' : activeTab === 'videos' ? 'video' : activeTab === 'links' ? 'link' : activeTab === 'questions' ? 'question' : 'profile')}
            </Box>
            <Typography sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              color: '#999',
              mb: 2
            }}>
              No {activeTab} found
            </Typography>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Plus className="w-4 h-4" />}
              sx={{
                fontSize: '12px',
                fontFamily: 'Rubik, sans-serif',
                textTransform: 'none',
                borderColor: '#e5e7eb',
                color: '#666'
              }}
            >
              Add {activeTab.slice(0, -1)}
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                sx={{
                  cursor: 'grab',
                  transition: 'all 0.2s ease',
                  opacity: isDragging === item.id ? 0.5 : 1,
                  transform: isDragging === item.id ? 'rotate(5deg)' : 'none',
                  '&:hover': {
                    transform: isDragging === item.id ? 'rotate(5deg)' : 'translateY(-1px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  },
                  '&:active': {
                    cursor: 'grabbing'
                  }
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <GripVertical className="w-3 h-3 text-gray-400" />
                    <Box sx={{ color: getColorByType(item.type) }}>
                      {getIconByType(item.type)}
                    </Box>
                    <Typography sx={{
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#333',
                      flexGrow: 1
                    }}>
                      {item.title}
                    </Typography>
                  </Box>
                  
                  {item.stage_relevance.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, ml: 4 }}>
                      {item.stage_relevance.slice(0, 2).map((stage) => (
                        <Chip
                          key={stage}
                          label={stage.replace('_', ' ')}
                          size="small"
                          sx={{
                            height: '18px',
                            fontSize: '10px',
                            backgroundColor: '#f0fdf4',
                            color: '#166534',
                            border: '1px solid #bbf7d0'
                          }}
                        />
                      ))}
                      {item.stage_relevance.length > 2 && (
                        <Chip
                          label={`+${item.stage_relevance.length - 2}`}
                          size="small"
                          sx={{
                            height: '18px',
                            fontSize: '10px',
                            backgroundColor: '#f5f5f5',
                            color: '#666'
                          }}
                        />
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ContentRepository;
