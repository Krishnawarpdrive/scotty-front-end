import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  MessageSquare,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Download,
  Upload,
  Eye
} from 'lucide-react';

// Types
interface CandidateApplication {
  id: string;
  role: string;
  company: string;
  status: string;
  appliedDate: string;
  lastUpdate: string;
  stage: string;
  progress: number;
  nextAction?: string;
  priority: 'high' | 'medium' | 'low';
}

interface JourneyContent {
  id: string;
  type: 'video' | 'document' | 'form' | 'assessment';
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  dueDate?: string;
  url?: string;
  instructions?: string;
}

interface CandidateJourney {
  id: string;
  name: string;
  description: string;
  status: 'current' | 'completed' | 'upcoming';
  progress: number;
  content: JourneyContent[];
  nextSteps: string[];
  supportContact: string;
}

const CandidateDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State with proper typing
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplication | null>(null);
  const [currentJourney, setCurrentJourney] = useState<CandidateJourney | null>(null);
  const [quickActions, setQuickActions] = useState<any[]>([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState<any[]>([]);

  const { data, loading, refetch } = useCandidateDashboardData();

  useEffect(() => {
    // Fetch candidate applications
    const fetchApplications = async () => {
      // This would be an API call in a real app
      const mockApplications: CandidateApplication[] = [
        {
          id: 'app-1',
          role: 'Software Engineer',
          company: 'TechCorp Inc',
          status: 'Active',
          appliedDate: '2023-12-15',
          lastUpdate: '2024-01-05',
          stage: 'Technical Interview',
          progress: 65,
          nextAction: 'Complete coding challenge',
          priority: 'high'
        },
        {
          id: 'app-2',
          role: 'Product Manager',
          company: 'InnovateDB',
          status: 'Under Review',
          appliedDate: '2023-12-20',
          lastUpdate: '2024-01-02',
          stage: 'Initial Screening',
          progress: 25,
          priority: 'medium'
        },
        {
          id: 'app-3',
          role: 'UX Designer',
          company: 'Creative Solutions',
          status: 'On Hold',
          appliedDate: '2023-11-30',
          lastUpdate: '2023-12-28',
          stage: 'Portfolio Review',
          progress: 40,
          nextAction: 'Submit additional portfolio samples',
          priority: 'low'
        }
      ];
      
      setApplications(mockApplications);
      
      // Mock quick actions
      setQuickActions([
        { id: 'qa-1', title: 'Complete profile', description: 'Add missing skills and certifications', icon: 'User' },
        { id: 'qa-2', title: 'Upload resume', description: 'Update your resume with recent experience', icon: 'FileText' },
        { id: 'qa-3', title: 'Verify email', description: 'Confirm your email address', icon: 'Mail' }
      ]);
      
      // Mock upcoming interviews
      setUpcomingInterviews([
        { 
          id: 'int-1', 
          role: 'Software Engineer', 
          company: 'TechCorp Inc', 
          date: '2024-01-15T14:00:00', 
          type: 'Technical Interview',
          interviewers: ['John Doe', 'Jane Smith'],
          location: 'Virtual (Zoom)'
        }
      ]);
    };
    
    fetchApplications();
  }, []);

  const handleViewApplication = (application: CandidateApplication) => {
    setSelectedApplication(application);
    
    // Mock journey data - this would come from API
    const mockJourney: CandidateJourney = {
      id: 'journey-1',
      name: 'Software Engineer Application Journey',
      description: 'Complete your application process for the Software Engineer position',
      status: 'current',
      progress: 65,
      content: [
        {
          id: 'content-1',
          type: 'video',
          title: 'Company Overview Video',
          description: 'Learn about our company culture and values',
          isRequired: true,
          isCompleted: true,
          url: '/videos/company-overview'
        },
        {
          id: 'content-2',
          type: 'document',
          title: 'Role Requirements Document',
          description: 'Detailed job description and requirements',
          isRequired: true,
          isCompleted: true,
          url: '/documents/role-requirements.pdf'
        },
        {
          id: 'content-3',
          type: 'form',
          title: 'Technical Skills Assessment',
          description: 'Complete the technical evaluation form',
          isRequired: true,
          isCompleted: false,
          dueDate: '2024-01-20',
          instructions: 'This assessment will take approximately 45 minutes to complete.'
        },
        {
          id: 'content-4',
          type: 'assessment',
          title: 'Coding Challenge',
          description: 'Complete the coding challenge',
          isRequired: true,
          isCompleted: false,
          dueDate: '2024-01-25'
        }
      ],
      nextSteps: [
        'Complete Technical Skills Assessment',
        'Schedule technical interview',
        'Submit portfolio examples'
      ],
      supportContact: 'hr@techcorp.com'
    };

    setCurrentJourney(mockJourney);

    const mockProgress: CandidateJourney = {
      id: 'progress-1',
      name: 'Application Progress',
      description: 'Track your progress through the hiring process',
      status: 'current',
      progress: 40,
      content: [],
      nextSteps: ['Complete background check', 'Final interview'],
      supportContact: 'hr@company.com'
    };

    setCurrentJourney(mockProgress);
  };

  const handleCompleteJourneyItem = (applicationId: string) => {
    console.log('Completing journey item for application:', applicationId);
    // Implementation would go here
  };

  const useCandidateDashboardData = () => {
    const [data, setData] = useState({
      applications: [],
      notifications: [],
      messages: []
    });
    const [loading, setLoading] = useState(true);
    const [applicationLoading, setApplicationLoading] = useState(false);

    const refetch = () => {
      // Implementation would go here
      console.log('Refetching data...');
    };

    useEffect(() => {
      // Simulate API call
      setTimeout(() => {
        setData({
          applications: [],
          notifications: [],
          messages: []
        });
        setLoading(false);
      }, 1000);
    }, []);

    return { data, loading, refetch };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter(a => a.status === 'Active').length}</div>
            <p className="text-xs text-gray-500 mt-1">
              {applications.length} total applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingInterviews.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Next: {upcomingInterviews[0]?.date ? new Date(upcomingInterviews[0].date).toLocaleDateString() : 'None scheduled'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="journey">Application Journey</TabsTrigger>
          <TabsTrigger value="interviews">Upcoming Interviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications" className="space-y-4">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                <p className="text-gray-500 text-center max-w-md mb-4">
                  You haven't applied to any positions yet. Start exploring available roles and submit your first application.
                </p>
                <Button onClick={() => navigate('/jobs')}>
                  Explore Open Positions
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id} className="cursor-pointer hover:border-blue-300 transition-colors">
                  <CardContent className="p-4" onClick={() => handleViewApplication(application)}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{application.role}</h3>
                        <p className="text-sm text-gray-500">{application.company}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant={application.status === 'Active' ? 'default' : 'secondary'}>
                            {application.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Applied: {new Date(application.appliedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{application.stage}</div>
                        <div className="flex items-center mt-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${application.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{application.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {application.nextAction && (
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          Next Action: {application.nextAction}
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="journey">
          {currentJourney ? (
            <Card>
              <CardHeader>
                <CardTitle>{currentJourney.name}</CardTitle>
                <p className="text-sm text-gray-500">{currentJourney.description}</p>
                <div className="mt-2">
                  <Progress value={currentJourney.progress} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Application Started</span>
                    <span>{currentJourney.progress}% Complete</span>
                    <span>Offer</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-medium">Journey Steps</h3>
                <div className="space-y-3">
                  {currentJourney.content.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-3 border rounded-lg ${
                        item.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <Badge variant={item.isRequired ? 'default' : 'secondary'} className="mr-2">
                              {item.type}
                            </Badge>
                            <h4 className="font-medium">{item.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          {item.instructions && (
                            <p className="text-xs text-gray-500 mt-1">{item.instructions}</p>
                          )}
                          {item.dueDate && (
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due by: {new Date(item.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <div>
                          {item.isCompleted ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Completed
                            </Badge>
                          ) : (
                            <Button size="sm" variant={item.type === 'assessment' ? 'default' : 'outline'}>
                              {item.type === 'video' && <Eye className="h-3 w-3 mr-1" />}
                              {item.type === 'document' && <Download className="h-3 w-3 mr-1" />}
                              {item.type === 'form' && <FileText className="h-3 w-3 mr-1" />}
                              {item.type === 'assessment' && <ExternalLink className="h-3 w-3 mr-1" />}
                              {item.type === 'video' && 'Watch'}
                              {item.type === 'document' && 'Download'}
                              {item.type === 'form' && 'Complete'}
                              {item.type === 'assessment' && 'Start'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Next Steps</h3>
                  <ul className="space-y-1">
                    {currentJourney.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    If you have any questions about your application journey, please contact:
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`mailto:${currentJourney.supportContact}`} className="text-blue-600 hover:underline">
                      {currentJourney.supportContact}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Active Journey</h3>
                <p className="text-gray-500 text-center max-w-md mb-4">
                  Select an application to view its journey details and track your progress.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="interviews">
          {upcomingInterviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Upcoming Interviews</h3>
                <p className="text-gray-500 text-center max-w-md">
                  You don't have any interviews scheduled at the moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{interview.role}</h3>
                        <p className="text-sm text-gray-500">{interview.company}</p>
                        <div className="flex items-center mt-2">
                          <Badge>{interview.type}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {interview.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        Join 10 minutes early
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button size="sm">
                        Join Interview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    {action.icon === 'User' && <Eye className="h-4 w-4" />}
                    {action.icon === 'FileText' && <FileText className="h-4 w-4" />}
                    {action.icon === 'Mail' && <Mail className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{action.title}</h4>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
            
            <Button variant="ghost" className="w-full mt-2 text-blue-600">
              View All Actions
            </Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Document Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Resume</h4>
                    <p className="text-xs text-gray-500">Last updated: 2 weeks ago</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Cover Letter</h4>
                    <p className="text-xs text-gray-500">Last updated: 1 month ago</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateDashboardPage;
