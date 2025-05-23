
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, UserPlus, Calendar, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface PipelineDetailSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage: string | null;
  data: any;
}

export const PipelineDetailSidebar: React.FC<PipelineDetailSidebarProps> = ({
  open,
  onOpenChange,
  stage,
  data
}) => {
  if (!stage || !data) return null;

  const getBulkActions = () => {
    switch (stage) {
      case 'Screening':
        return [
          { label: 'Schedule Interviews', icon: Calendar, variant: 'default' as const },
          { label: 'Send Reminders', icon: MessageSquare, variant: 'outline' as const },
          { label: 'Reassign TA', icon: UserPlus, variant: 'outline' as const }
        ];
      case 'Interview':
        return [
          { label: 'Follow Up', icon: Phone, variant: 'default' as const },
          { label: 'Schedule Next Round', icon: Calendar, variant: 'outline' as const },
          { label: 'Request Feedback', icon: MessageSquare, variant: 'outline' as const }
        ];
      case 'Offer':
        return [
          { label: 'Send Reminders', icon: MessageSquare, variant: 'default' as const },
          { label: 'Prepare Alternatives', icon: UserPlus, variant: 'outline' as const }
        ];
      default:
        return [
          { label: 'Send Welcome Kit', icon: MessageSquare, variant: 'default' as const },
          { label: 'Schedule Onboarding', icon: Calendar, variant: 'outline' as const }
        ];
    }
  };

  const mockCandidates = [
    { name: 'John Doe', role: 'Software Engineer', ta: 'Sarah Johnson', client: 'Acme Corp', status: 'In Progress', daysInStage: 3 },
    { name: 'Jane Smith', role: 'UX Designer', ta: 'Mike Peterson', client: 'Tech Innovations', status: 'Pending', daysInStage: 7 },
    { name: 'Alice Brown', role: 'Product Manager', ta: 'Emma Wilson', client: 'Global Solutions', status: 'Scheduled', daysInStage: 2 },
    { name: 'Bob Chen', role: 'Data Scientist', ta: 'John Taylor', client: 'Future Systems', status: 'In Progress', daysInStage: 5 }
  ];

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`${stage} Stage Details`}
      subtitle={`${data.count} candidates in this stage`}
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Stage Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Stage Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Total Candidates:</span>
              <span className="font-medium ml-2">{data.count}</span>
            </div>
            <div>
              <span className="text-gray-500">Avg. Time in Stage:</span>
              <span className="font-medium ml-2">4.2 days</span>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div>
          <h3 className="font-semibold mb-3">Bulk Actions</h3>
          <div className="flex flex-wrap gap-2">
            {getBulkActions().map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant={action.variant}
                className="flex items-center gap-2"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Candidate List */}
        <div>
          <h3 className="font-semibold mb-3">Candidates ({mockCandidates.length})</h3>
          <div className="space-y-3">
            {mockCandidates.map((candidate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{candidate.name}</h4>
                      <p className="text-sm text-gray-500">{candidate.role}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={candidate.status === 'In Progress' ? 'default' : 'secondary'}
                  >
                    {candidate.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">TA:</span>
                    <span className="ml-1">{candidate.ta}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Client:</span>
                    <span className="ml-1">{candidate.client}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Days in stage:</span>
                    <span className={`ml-1 ${candidate.daysInStage > 5 ? 'text-amber-600 font-medium' : ''}`}>
                      {candidate.daysInStage}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Profile</Button>
                  <Button size="sm" variant="outline">Message TA</Button>
                  <Button size="sm" variant="outline">Take Action</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};
