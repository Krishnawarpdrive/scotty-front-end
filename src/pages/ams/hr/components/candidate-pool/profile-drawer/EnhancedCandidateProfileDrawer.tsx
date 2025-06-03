
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, User, Briefcase } from 'lucide-react';
import { Candidate } from '../CandidateTable';
import { OverviewTab } from './OverviewTab';
import { HiringPipelineTab } from './HiringPipelineTab';

interface EnhancedCandidateProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

export const EnhancedCandidateProfileDrawer: React.FC<EnhancedCandidateProfileDrawerProps> = ({
  open,
  onClose,
  candidate
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{candidate.name}</h1>
              <p className="text-blue-100 mb-2">{candidate.email}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {candidate.skills?.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/20 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {candidate.skills && candidate.skills.length > 4 && (
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
                    +{candidate.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold">{candidate.score}</div>
              <div className="text-blue-100 text-sm">Overall Score</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2 px-6 py-3 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
            >
              <User className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="pipeline"
              className="flex items-center space-x-2 px-6 py-3 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
            >
              <Briefcase className="h-4 w-4" />
              <span>Hiring Pipeline</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="m-0">
              <OverviewTab candidate={candidate} />
            </TabsContent>
            
            <TabsContent value="pipeline" className="m-0">
              <HiringPipelineTab candidate={candidate} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
