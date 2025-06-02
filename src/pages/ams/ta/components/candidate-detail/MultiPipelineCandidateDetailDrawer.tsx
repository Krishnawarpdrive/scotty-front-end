
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useMultiPipelineData } from './hooks/useMultiPipelineData';
import { PipelineTabsContainer } from './components/PipelineTabsContainer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  MessageSquare,
  Video,
  Star,
  Calendar
} from 'lucide-react';

interface MultiPipelineCandidateDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  candidateId: string | null;
}

export const MultiPipelineCandidateDetailDrawer: React.FC<MultiPipelineCandidateDetailDrawerProps> = ({
  open,
  onClose,
  candidateId
}) => {
  const { candidate, loading, error } = useMultiPipelineData(candidateId);

  const handleStageAction = (applicationId: string, stageId: string, actionId: string) => {
    console.log('Stage action:', { applicationId, stageId, actionId });
    // Implement stage action logic
  };

  const handleAddStage = (applicationId: string, afterStageId?: string) => {
    console.log('Add stage:', { applicationId, afterStageId });
    // Implement add stage logic
  };

  const handleReorderStages = (applicationId: string, stageIds: string[]) => {
    console.log('Reorder stages:', { applicationId, stageIds });
    // Implement reorder stages logic
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <SideDrawer
        open={open}
        onOpenChange={onClose}
        size="xl"
        title="Loading..."
        description="Fetching candidate details"
      >
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </SideDrawer>
    );
  }

  if (error || !candidate) {
    return (
      <SideDrawer
        open={open}
        onOpenChange={onClose}
        size="xl"
        title="Error"
        description="Failed to load candidate details"
      >
        <div className="p-6">
          <p className="text-red-600">{error || 'Candidate not found'}</p>
        </div>
      </SideDrawer>
    );
  }

  return (
    <SideDrawer
      open={open}
      onOpenChange={onClose}
      size="xl"
      title={`${candidate.name} - Multi-Pipeline View`}
      description="Manage candidate across multiple role applications"
    >
      <div className="p-6 space-y-6">
        {/* Candidate Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatar_url || ''} alt={candidate.name} />
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
                
                <p className="text-lg text-gray-600 mb-1">{candidate.current_position}</p>
                <p className="text-sm text-gray-500 mb-3">{candidate.current_employer}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{candidate.email}</span>
                  </div>
                  {candidate.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{candidate.phone}</span>
                    </div>
                  )}
                  {candidate.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{candidate.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Experience:</span>
                    <Badge variant="secondary">{candidate.experience_years} years</Badge>
                  </div>
                  {candidate.overall_score && (
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{candidate.overall_score}/100</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Active Applications:</span>
                    <Badge variant="default">{candidate.role_applications.length}</Badge>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{candidate.skills.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Multi-Pipeline Tabs */}
        <PipelineTabsContainer
          roleApplications={candidate.role_applications}
          onStageAction={handleStageAction}
          onAddStage={handleAddStage}
          onReorderStages={handleReorderStages}
        />
      </div>
    </SideDrawer>
  );
};
