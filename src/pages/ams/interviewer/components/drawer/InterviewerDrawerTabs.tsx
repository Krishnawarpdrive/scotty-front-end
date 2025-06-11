
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  FileText, 
  MessageSquare, 
  History,
  CheckSquare,
  Clock
} from 'lucide-react';
import { InterviewerCandidateDetails } from './tabs/InterviewerCandidateDetails';
import { InterviewerFeedbackForm } from './tabs/InterviewerFeedbackForm';
import { InterviewerNotes } from './tabs/InterviewerNotes';
import { InterviewerHistory } from './tabs/InterviewerHistory';
import { Interview } from '../../MyInterviewsPage';

interface InterviewerDrawerTabsProps {
  interview: Interview;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const InterviewerDrawerTabs: React.FC<InterviewerDrawerTabsProps> = ({
  interview,
  activeTab,
  onTabChange
}) => {
  const tabs = [
    {
      id: 'details',
      label: 'Details',
      icon: User,
      component: InterviewerCandidateDetails,
      badge: null
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: CheckSquare,
      component: InterviewerFeedbackForm,
      badge: interview.status === 'completed' ? null : '!'
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: MessageSquare,
      component: InterviewerNotes,
      badge: null
    },
    {
      id: 'history',
      label: 'History',
      icon: History,
      component: InterviewerHistory,
      badge: '3'
    }
  ];

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <TabsList className="w-full grid grid-cols-4 h-12 bg-transparent p-0 rounded-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="relative flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-none"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge && (
                  <Badge 
                    variant={tab.badge === '!' ? 'destructive' : 'secondary'} 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {tab.badge}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {tabs.map((tab) => {
          const Component = tab.component;
          return (
            <TabsContent key={tab.id} value={tab.id} className="m-0 h-full">
              <div className="p-6">
                <Component interview={interview} />
              </div>
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};
