
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, AlertTriangle } from 'lucide-react';
import { TAContribution } from './types';
import { StatusBadge } from './StatusBadge';
import { ActionButtons } from './ActionButtons';

interface TAAccordionViewProps {
  taContributions: TAContribution[];
}

export const TAAccordionView: React.FC<TAAccordionViewProps> = ({ taContributions }) => {
  return (
    <Accordion type="multiple" className="space-y-2">
      {taContributions.map((ta, index) => (
        <AccordionItem key={index} value={`ta-${index}`} className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center justify-between w-full mr-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {ta.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium">{ta.name}</p>
                  <p className="text-sm text-gray-500">{ta.contribution}/{ta.target} completed</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={ta.status} />
                <span className="text-sm font-medium">{ta.progress}%</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Insight:</strong>
                  <p className="text-gray-600">{ta.insight}</p>
                </div>
                <div>
                  <strong>Average Delay:</strong>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {ta.avgDelay}
                  </p>
                </div>
              </div>
              
              <div>
                <strong className="text-sm">Roles Involved:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ta.roles.map((role, roleIndex) => (
                    <Badge key={roleIndex} variant="outline" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              {ta.candidates.length > 0 && (
                <div>
                  <strong className="text-sm">Candidates:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ta.candidates.map((candidate, candidateIndex) => (
                      <Badge key={candidateIndex} variant="secondary" className="text-xs">
                        {candidate}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {ta.hasConflicts && (
                <div className="bg-red-50 border border-red-200 rounded p-2">
                  <p className="text-red-700 text-xs flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Time slot conflicts detected - requires attention
                  </p>
                </div>
              )}

              <div className="pt-2 border-t">
                <ActionButtons ta={ta} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
