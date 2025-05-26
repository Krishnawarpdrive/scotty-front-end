
import React, { useState } from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  IconButton,
  Avatar,
  Chip,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Divider,
  TextareaAutosize,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { 
  Close as CloseIcon,
  LinkedIn as LinkedInIcon,
  Language as PortfolioIcon,
  ExpandMore as ExpandMoreIcon,
  PictureInPicture as PipIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { FileText } from 'lucide-react';

interface CandidateDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  candidateData: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const CandidateDetailDrawer: React.FC<CandidateDetailDrawerProps> = ({
  open,
  onClose,
  candidateData
}) => {
  const [activeRoleTab, setActiveRoleTab] = useState(0);
  const [notes, setNotes] = useState(candidateData?.notes || '');
  const [expandedLevels, setExpandedLevels] = useState<string[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  const handleRoleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveRoleTab(newValue);
  };

  const handleLevelToggle = (levelId: string) => {
    setExpandedLevels(prev => 
      prev.includes(levelId) 
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    );
  };

  const getLevelColor = (level: number) => {
    const colors = {
      1: '#4A90E2',
      2: '#4CAF50', 
      3: '#FFC107',
      4: '#9E9E9E',
      5: '#F44336'
    };
    return colors[level as keyof typeof colors] || '#9E9E9E';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Must hire': return '#4CAF50';
      case 'Hire': return '#4CAF50';
      case 'On Hold': return '#FFC107';
      case 'Not Hire': return '#F44336';
      case 'Not Showing': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  // Mock data - replace with actual candidate data
  const candidate = candidateData || {
    name: "Nithin Chandarika",
    avatar: "/placeholder.svg",
    type: "Fresher",
    linkedIn: "https://linkedin.com",
    lastOrg: "Lumicel Tech",
    relevantExp: "3 Y 10 M",
    workingExp: "7 Y 9 M",
    noticeTerms: "30 Days",
    activeOffers: "N/A",
    lastAction: "Last moved to Level 2 — Internal Interview",
    interviewingFor: [
      {
        id: 1,
        name: "Ui Ux Designer",
        experience: "5-8 Years",
        location: "Banglore",
        type: "Full time",
        status: "Applied",
        clientId: "CL-001"
      }
    ],
    notInterviewingFor: [
      {
        id: 2,
        name: "Product Designer", 
        experience: "5-8 Years",
        location: "Banglore",
        type: "Full time",
        status: "Applied"
      }
    ],
    education: [
      {
        degree: "B.E in Automobile",
        duration: "Apr 2013- Jun2017",
        percentage: "67%",
        marksheet: "Krishn__Marksheet.pdf"
      }
    ],
    experience: [
      {
        role: "UX Designer",
        duration: "Jun 2017 - Feb 2022",
        company: "Company Name",
        ctc: "9,00,000",
        documents: ["Krishn__Regination letter.pdf"]
      }
    ],
    skills: {
      primary: ["Figma", "Adobe XD", "Sketch", "Invision", "Axure"],
      soft: ["Framer", "Marvel", "Webflow", "Proto.io", "Balsamiq", "Canva", "Affinity Designer"]
    },
    interviewLevels: [
      {
        id: "level1",
        level: 1,
        status: "Must hire",
        interviewer: "Kaushik",
        timestamp: "5 Days ago",
        rating: 4,
        duration: "120 Mins Session",
        feedback: [
          "Handled scenario-based questions well, showing strong problem-solving and teamwork.",
          "Strong technical skills with Salesforce and Service Cloud setup.",
          "Good at solving production issues.",
          "Communicates clearly and understands Agile workflows.",
          "Needs more assessment on leadership and big-picture thinking."
        ],
        qa: [
          {
            question: "Can you walk us through your design process?",
            answer: "The candidate demonstrated a structured approach to design, covering research, ideation, prototyping, testing, and iteration. Their response showed a good understanding of user-centered design principles and an awareness of how to refine solutions based on feedback.",
            isHighlighted: true
          }
        ]
      },
      {
        id: "level2", 
        level: 2,
        status: "Hire",
        interviewer: "Kumar",
        timestamp: "3 Days ago", 
        rating: 4,
        duration: "120 Mins Session",
        feedback: [
          "Excellent technical knowledge and problem-solving skills.",
          "Great communication and team collaboration.",
          "Shows leadership potential."
        ],
        qa: [
          {
            question: "Which design tools do you prefer and why?",
            answer: "Candidate showed good knowledge of design tools and explained preferences based on project requirements.",
            isHighlighted: false
          }
        ]
      }
    ]
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', md: '60%' },
          maxWidth: '900px',
          height: '100vh',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            p: 3,
          }}
        >
          {/* Header Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
            
            {/* Picture-in-Picture Video */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                size="small"
                startIcon={<PipIcon />}
                onClick={() => setShowVideo(!showVideo)}
                sx={{ fontSize: '12px' }}
              >
                Interview Video
              </Button>
            </Box>
          </Box>

          {/* Candidate Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
            <Badge
              badgeContent={candidate.type}
              color="success"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  fontSize: '10px',
                  fontFamily: 'Rubik, sans-serif'
                }
              }}
            >
              <Avatar
                src={candidate.avatar}
                sx={{ width: 64, height: 64 }}
              >
                {candidate.name.charAt(0)}
              </Avatar>
            </Badge>

            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#262626',
                  }}
                >
                  {candidate.name}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton size="small" color="primary">
                    <LinkedInIcon sx={{ fontSize: '16px' }} />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <FileText size={16} />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <PortfolioIcon sx={{ fontSize: '16px' }} />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                <Box>
                  <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                    Last Org
                  </Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 500, fontFamily: 'Rubik, sans-serif' }}>
                    {candidate.lastOrg}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                    Relevant Exp
                  </Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 500, fontFamily: 'Rubik, sans-serif' }}>
                    {candidate.relevantExp}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                    Working Exp
                  </Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 500, fontFamily: 'Rubik, sans-serif' }}>
                    {candidate.workingExp}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={`Notice Terms: ${candidate.noticeTerms}`}
                  size="small"
                  sx={{ fontSize: '10px', height: '20px' }}
                />
                <Chip
                  label={`Active Offers: ${candidate.activeOffers}`}
                  size="small"
                  color="warning"
                  sx={{ fontSize: '10px', height: '20px' }}
                />
              </Box>
            </Box>
          </Box>

          {/* Last Action Banner */}
          <Box
            sx={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              p: 1.5,
              mb: 2
            }}
          >
            <Typography
              sx={{
                fontSize: '12px',
                color: '#495057',
                fontFamily: 'Rubik, sans-serif',
                fontStyle: 'italic'
              }}
            >
              {candidate.lastAction}
            </Typography>
          </Box>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
          {/* Role Tabs */}
          <Box sx={{ mb: 3 }}>
            <Tabs
              value={activeRoleTab}
              onChange={handleRoleTabChange}
              sx={{
                '& .MuiTab-root': {
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '12px',
                  textTransform: 'none',
                  minHeight: '36px',
                },
              }}
            >
              <Tab label={`Interviewing for (${candidate.interviewingFor.length})`} />
              <Tab label={`Not Interviewing for (${candidate.notInterviewingFor.length})`} />
            </Tabs>

            <TabPanel value={activeRoleTab} index={0}>
              <Box sx={{ mt: 2 }}>
                {candidate.interviewingFor.map((role: any) => (
                  <Card key={role.id} sx={{ mb: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '14px', fontFamily: 'Rubik, sans-serif' }}>
                            {role.name}
                          </Typography>
                          <Typography sx={{ fontSize: '12px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                            {role.experience} • {role.location} • {role.type}
                          </Typography>
                        </Box>
                        <Chip
                          label={role.status}
                          color="success"
                          size="small"
                          sx={{ fontSize: '10px' }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </TabPanel>

            <TabPanel value={activeRoleTab} index={1}>
              <Box sx={{ mt: 2 }}>
                {candidate.notInterviewingFor.map((role: any) => (
                  <Card key={role.id} sx={{ mb: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '14px', fontFamily: 'Rubik, sans-serif' }}>
                            {role.name}
                          </Typography>
                          <Typography sx={{ fontSize: '12px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                            {role.experience} • {role.location} • {role.type}
                          </Typography>
                        </Box>
                        <Chip
                          label={role.status}
                          color="error"
                          size="small"
                          sx={{ fontSize: '10px' }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </TabPanel>
          </Box>

          {/* Education & Experience */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                mb: 2,
                color: '#262626'
              }}
            >
              Education & Experience
            </Typography>

            {/* Education */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: 1, fontFamily: 'Rubik, sans-serif' }}>
                Education
              </Typography>
              {candidate.education.map((edu: any, index: number) => (
                <Card key={index} sx={{ mb: 1 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography sx={{ fontWeight: 500, fontSize: '13px', fontFamily: 'Rubik, sans-serif' }}>
                          {edu.degree}
                        </Typography>
                        <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                          {edu.duration} • {edu.percentage}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        startIcon={<DownloadIcon />}
                        sx={{ fontSize: '10px' }}
                      >
                        View
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Experience */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: 1, fontFamily: 'Rubik, sans-serif' }}>
                Experience
              </Typography>
              {candidate.experience.map((exp: any, index: number) => (
                <Card key={index} sx={{ mb: 1 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography sx={{ fontWeight: 500, fontSize: '13px', fontFamily: 'Rubik, sans-serif' }}>
                          {exp.role}
                        </Typography>
                        <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                          {exp.duration} • {exp.company}
                        </Typography>
                        <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                          CTC: {exp.ctc}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        startIcon={<DownloadIcon />}
                        sx={{ fontSize: '10px' }}
                      >
                        View
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Skills */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: 1, fontFamily: 'Rubik, sans-serif' }}>
                Skills
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: '11px', color: '#666', mb: 0.5, fontFamily: 'Rubik, sans-serif' }}>
                  Primary Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {candidate.skills.primary.map((skill: string, index: number) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ fontSize: '10px', height: '24px' }}
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '11px', color: '#666', mb: 0.5, fontFamily: 'Rubik, sans-serif' }}>
                  Soft Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {candidate.skills.soft.map((skill: string, index: number) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '10px', height: '24px' }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Interview Levels */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                mb: 2,
                color: '#262626'
              }}
            >
              Interview Levels
            </Typography>

            {candidate.interviewLevels.map((level: any) => (
              <Accordion
                key={level.id}
                expanded={expandedLevels.includes(level.id)}
                onChange={() => handleLevelToggle(level.id)}
                sx={{
                  mb: 2,
                  border: `2px solid ${getLevelColor(level.level)}`,
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: `${getLevelColor(level.level)}10`,
                    borderRadius: '8px',
                    minHeight: '64px',
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        minWidth: '60px'
                      }}
                    >
                      <StarIcon sx={{ color: '#FFC107', fontSize: '16px' }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '14px', fontFamily: 'Rubik, sans-serif' }}>
                        {level.rating}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        flexGrow: 1
                      }}
                    >
                      Level {level.level}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={level.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(level.status),
                          color: 'white',
                          fontSize: '10px',
                          fontWeight: 500
                        }}
                      />
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon sx={{ fontSize: '14px', color: '#666' }} />
                        <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                          {level.interviewer}
                        </Typography>
                      </Box>

                      <Typography sx={{ fontSize: '11px', color: '#666', fontFamily: 'Rubik, sans-serif' }}>
                        {level.timestamp}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ color: '#FFC107', fontSize: '14px' }} />
                          <Typography sx={{ fontSize: '11px', fontFamily: 'Rubik, sans-serif' }}>
                            {level.rating} CandExp
                          </Typography>
                        </Box>
                        
                        <Chip
                          label={level.duration}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '10px', height: '20px' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    {/* Feedback Section */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: 600,
                          mb: 2,
                          fontFamily: 'Rubik, sans-serif',
                          color: '#262626'
                        }}
                      >
                        Feedback
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        {level.feedback.map((item: string, index: number) => (
                          <Typography
                            key={index}
                            sx={{
                              fontSize: '12px',
                              mb: 1,
                              fontFamily: 'Rubik, sans-serif',
                              color: '#444',
                              '&:before': {
                                content: '"•"',
                                color: getLevelColor(level.level),
                                fontWeight: 'bold',
                                width: '1em',
                                marginLeft: '-1em',
                                marginRight: '0.5em'
                              },
                              marginLeft: '1em'
                            }}
                          >
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    </Box>

                    {/* Q&A Section */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: 600,
                          mb: 2,
                          fontFamily: 'Rubik, sans-serif',
                          color: '#262626'
                        }}
                      >
                        Q&A
                      </Typography>
                      <Box>
                        {level.qa.map((qa: any, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              mb: 2,
                              p: 1.5,
                              backgroundColor: qa.isHighlighted ? '#f8f9fa' : 'transparent',
                              borderRadius: '8px',
                              border: qa.isHighlighted ? '1px solid #e9ecef' : 'none'
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '11px',
                                fontWeight: 600,
                                mb: 1,
                                fontFamily: 'Rubik, sans-serif',
                                color: '#262626'
                              }}
                            >
                              {qa.question}
                            </Typography>
                            {qa.isHighlighted && (
                              <StarIcon sx={{ color: '#FFC107', fontSize: '14px', mb: 0.5 }} />
                            )}
                            <Typography
                              sx={{
                                fontSize: '11px',
                                fontFamily: 'Rubik, sans-serif',
                                color: '#666',
                                lineHeight: 1.4
                              }}
                            >
                              {qa.answer}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Notes Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                mb: 2,
                color: '#262626'
              }}
            >
              Notes
            </Typography>
            <TextareaAutosize
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this candidate..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '12px',
                fontFamily: 'Rubik, sans-serif',
                fontSize: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                resize: 'vertical'
              }}
            />
            <Typography
              sx={{
                fontSize: '10px',
                color: '#666',
                mt: 1,
                fontFamily: 'Rubik, sans-serif',
                fontStyle: 'italic'
              }}
            >
              Last updated: Today at 2:30 PM by HR Admin
            </Typography>
          </Box>
        </Box>

        {/* Picture-in-Picture Video Overlay */}
        {showVideo && (
          <Box
            sx={{
              position: 'fixed',
              top: '100px',
              right: '20px',
              width: '300px',
              height: '200px',
              backgroundColor: '#000',
              borderRadius: '8px',
              zIndex: 1001,
              border: '2px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'move'
            }}
          >
            <Typography sx={{ color: '#fff', fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}>
              Interview Video Player
            </Typography>
            <IconButton
              onClick={() => setShowVideo(false)}
              sx={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                color: '#fff',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
              size="small"
            >
              <CloseIcon sx={{ fontSize: '16px' }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CandidateDetailDrawer;
