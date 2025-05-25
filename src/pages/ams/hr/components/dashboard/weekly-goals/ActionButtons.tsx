
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageSquare, Clock, AlertTriangle, Eye, UserPlus } from 'lucide-react';
import { TAContribution } from './types';

interface ActionButtonsProps {
  ta: TAContribution;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ ta }) => {
  if (ta.status === 'done') {
    return <span className="text-gray-400 text-sm">—</span>;
  }

  const actions = [];
  
  if (ta.status === 'behind' || ta.status === 'at-risk') {
    actions.push(
      <Tooltip key="reassign">
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <UserPlus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reassign</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  
  actions.push(
    <Tooltip key="message">
      <TooltipTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Message</p>
      </TooltipContent>
    </Tooltip>
  );

  if (ta.status === 'feedback-pending') {
    actions.push(
      <Tooltip key="follow-up">
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Clock className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Follow Up</p>
        </TooltipContent>
      </Tooltip>
    );
  } else if (ta.status === 'on-track') {
    actions.push(
      <Tooltip key="nudge">
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <AlertTriangle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Nudge</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  actions.push(
    <Tooltip key="view">
      <TooltipTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>View</p>
      </TooltipContent>
    </Tooltip>
  );

  return <div className="flex gap-1">{actions}</div>;
};
