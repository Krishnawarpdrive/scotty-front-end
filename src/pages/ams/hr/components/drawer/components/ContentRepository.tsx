
import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Card, CardContent, Input, Chip } from '@mui/material';
import { Search, Video, FileText, Link, HelpCircle, User } from 'lucide-react';
import { ContentItem, ContentRepositoryTab } from '../types/CandidateJourneyTypes';

interface ContentRepositoryProps {
  contentItems: ContentItem[];
  onItemDrag: (item: ContentItem) => void;
}

const ContentRepository: React.FC<ContentRepositoryProps> = ({ contentItems, onItemDrag }) => {
  const [activeTab, setActiveTab] = useState<ContentRepositoryTab>('documents');
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{
        fontFamily: 'Rubik, sans-serif',
        fontSize: '13px',
        color: '#666',
        mb: 2
      }}>
        Content Repository
      </Typography>

      {/* Search */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            pl: 8,
            width: '100%',
            fontSize: '13px',
            fontFamily: 'Rubik, sans-serif'
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
            py: 1
          },
          '& .Mui-selected': {
            color: '#009933 !important',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#009933',
          },
        }}
      >
        <Tab label="Documents" value="documents" />
        <Tab label="Videos" value="videos" />
        <Tab label="Links" value="links" />
        <Tab label="Questions" value="questions" />
        <Tab label="Profiles" value="profiles" />
      </Tabs>

      {/* Content Items */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
        {filteredItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              color: '#999'
            }}>
              No {activeTab} found
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                draggable
                onDragStart={() => onItemDrag(item)}
                sx={{
                  cursor: 'grab',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  },
                  '&:active': {
                    cursor: 'grabbing'
                  }
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {item.stage_relevance.slice(0, 2).map((stage) => (
                        <Chip
                          key={stage}
                          label={stage.replace('_', ' ')}
                          size="small"
                          sx={{
                            height: '20px',
                            fontSize: '10px',
                            backgroundColor: '#f5f5f5',
                            color: '#666'
                          }}
                        />
                      ))}
                      {item.stage_relevance.length > 2 && (
                        <Chip
                          label={`+${item.stage_relevance.length - 2}`}
                          size="small"
                          sx={{
                            height: '20px',
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
