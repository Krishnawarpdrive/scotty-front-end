
import React, { useState } from "react";
import { SideDrawer } from "@/components/ui/side-drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Star,
  Clock,
  User,
  Download,
  MessageSquare,
  Video,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  PauseCircle,
  XCircle
} from "lucide-react";
import { CandidateStageData, UserRole } from './types/CandidateStageTypes';
import { getStageConfiguration, getStageActions, getStageTabs } from './config/StageConfigurations';
import { StageRenderer } from './components/StageRenderer';
import { StageActionButton } from './components/StageActionButton';
import { StageProgressIndicator } from './components/StageProgressIndicator';

interface EnhancedCandidateDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  candidateId: string | null;
  userRole?: UserRole;
}

export const EnhancedCandidateDetailDrawer: React.FC<EnhancedCandidateDetailDrawerProps> = ({
  open,
  onClose,
  candidateId,
  userRole = 'hr'
}) => {
  const [activeStage, setActiveStage] = useState("phone-screening");
  const [activeTab, setActiveTab] = useState("form");

  // Mock candidate data - replace with actual data fetching
  const candidateStageData: CandidateStageData = {
    candidateId: candidateId || '',
    currentStage: 'phone-screening',
    stages: [
      { ...getStageConfiguration('phone-screening')!, status: 'current', completedAt: undefined },
      { ...getStageConfiguration('technical-interview')!, status: 'pending' },
      { ...getStageConfiguration('client-interview')!, status: 'pending' },
      { ...getStageConfiguration('background-check')!, status: 'pending' },
      { ...getStageConfiguration('offer-joining')!, status: 'pending' }
    ],
    roleApplications: [
      {
        id: "role-1",
        name: "Senior Frontend Developer",
        client: "TechCorp Inc.",
        status: "Active",
        currentStage: "Phone Screening",
        appliedDate: "2024-01-15"
      }
    ],
    stageHistory: [],
    notes: [],
    documents: []
  };

  const candidate = {
    id: candidateId,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    currentPosition: "Senior Frontend Developer",
    currentEmployer: "TechCorp Inc.",
    experienceYears: 5,
    location: "San Francisco, CA",
    currentStage: "Phone Screening",
    source: "LinkedIn",
    status: "Active",
    appliedDate: "2024-01-15",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    resumeUrl: "#",
    notes: "Excellent technical skills, strong communication, looking for remote opportunities."
  };

  if (!candidate) return null;

  const currentStageConfig = getStageConfiguration(activeStage);
  const stageActions = getStageActions(activeStage, userRole);
  const stageTabs = getStageTabs(activeStage, userRole);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStageStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'on-hold': return <PauseCircle className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const calculateOverallProgress = () => {
    const completedStages = candidateStageData.stages.filter(s => s.status === 'completed').length;
    const currentStage = candidateStageData.stages.find(s => s.status === 'current') ? 0.5 : 0;
    return ((completedStages + currentStage) / candidateStageData.stages.length) * 100;
  };

  const handleStageAction = (actionId: string) => {
    console.log(`Executing action: ${actionId} for stage: ${activeStage}`);
    // Implement action handling logic here
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onClose}
      size="xl"
      title={`${candidate.name} - Stage Management`}
      description="Manage candidate progress through hiring stages"
    >
      <div className="p-6 space-y-6">
        {/* Candidate Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt={candidate.name} />
                <AvatarFallback className="text-lg">{getInitials(candidate.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{candidate.name}</h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Interview
                    </Button>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 mb-1">{candidate.currentPosition}</p>
                <p className="text-sm text-gray-500 mb-3">{candidate.currentEmployer}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{candidate.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{candidate.location}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </div>
            
            {/* Overall Progress */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{Math.round(calculateOverallProgress())}% Complete</span>
              </div>
              <Progress value={calculateOverallProgress()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Stage Progress Indicator */}
        <StageProgressIndicator 
          stages={candidateStageData.stages}
          currentStage={activeStage}
          onStageSelect={setActiveStage}
        />

        {/* Current Stage Details */}
        {currentStageConfig && (
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStageStatusIcon(currentStageConfig.status)}
                    <CardTitle className="text-lg">{currentStageConfig.name}</CardTitle>
                  </div>
                  <Badge className={getStageStatusColor(currentStageConfig.status)}>
                    {currentStageConfig.status.charAt(0).toUpperCase() + currentStageConfig.status.slice(1)}
                  </Badge>
                </div>
                
                {/* Stage Actions */}
                <div className="flex items-center space-x-2">
                  {stageActions.map((action) => (
                    <StageActionButton
                      key={action.id}
                      action={action}
                      onExecute={() => handleStageAction(action.id)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Required Actions */}
              {currentStageConfig.requiredActions.length > 0 && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Required Actions:</p>
                      <ul className="mt-1 text-sm text-amber-700 list-disc list-inside">
                        {currentStageConfig.requiredActions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              {/* Stage Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${stageTabs.length}, 1fr)` }}>
                  {stageTabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                      <span>{tab.name}</span>
                      {tab.badge && (
                        <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                          {tab.badge}
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {stageTabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-6">
                    <StageRenderer
                      stageId={activeStage}
                      tabId={tab.id}
                      component={tab.component}
                      candidate={candidate}
                      candidateStageData={candidateStageData}
                      userRole={userRole}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </SideDrawer>
  );
};
