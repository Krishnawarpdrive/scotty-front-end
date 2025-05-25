import React, { useState } from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Users } from 'lucide-react';
import { WeeklyGoalsDetailDrawerProps } from './weekly-goals/types';
import { getGoalData } from './weekly-goals/goalDataUtils';
import { TATableView } from './weekly-goals/TATableView';
import { TAAccordionView } from './weekly-goals/TAAccordionView';
import { OtherGoalSections } from './weekly-goals/OtherGoalSections';

export const WeeklyGoalsDetailDrawer: React.FC<WeeklyGoalsDetailDrawerProps> = ({
  open,
  onOpenChange,
  goalType
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'accordion'>('table');

  if (!goalType) return null;

  const goalData = getGoalData(goalType);
  if (!goalData) return null;

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={goalData.title}
      subtitle={`${goalData.achieved}/${goalData.target} completed (${Math.round((goalData.achieved / goalData.target) * 100)}%)`}
      size="xl"
    >
      <TooltipProvider>
        <div className="p-6 space-y-4">
          {/* Overall Progress */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-lg font-bold">
                {goalData.achieved}/{goalData.target}
              </span>
            </div>
            <Progress value={(goalData.achieved / goalData.target) * 100} className="mb-2" />
            <p className="text-sm text-gray-500">
              {Math.round((goalData.achieved / goalData.target) * 100)}% completed • {goalData.target - goalData.achieved} remaining
            </p>
          </Card>

          {/* TA Contributions Section */}
          {goalType === 'interviews' && goalData.taContributions && (
            <>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  TA Contributions
                </h4>
                <div className="flex gap-1">
                  <Button 
                    variant={viewMode === 'table' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </Button>
                  <Button 
                    variant={viewMode === 'accordion' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('accordion')}
                  >
                    Details
                  </Button>
                </div>
              </div>

              {viewMode === 'table' ? (
                <TATableView taContributions={goalData.taContributions} />
              ) : (
                <TAAccordionView taContributions={goalData.taContributions} />
              )}
            </>
          )}

          {/* Other Goal Sections */}
          <OtherGoalSections goalType={goalType} goalData={goalData} />
        </div>
      </TooltipProvider>
    </SideDrawer>
  );
};
