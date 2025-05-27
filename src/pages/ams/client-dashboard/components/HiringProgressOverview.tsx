
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, TrendingUp } from 'lucide-react';

interface RoleProgress {
  roleId: string;
  roleName: string;
  progress: number;
  stage: string;
  candidatesCount: number;
  urgency: 'high' | 'medium' | 'low';
}

interface CandidateFunnel {
  stage: string;
  count: number;
  conversionRate: number;
  color: string;
}

interface HiringProgressOverviewProps {
  data: {
    roleProgress: RoleProgress[];
    candidateFunnel: CandidateFunnel[];
    teamActivity: {
      calls: number;
      interviews: number;
      emails: number;
    };
  };
  onRoleSelect: (roleId: string) => void;
}

export const HiringProgressOverview: React.FC<HiringProgressOverviewProps> = ({
  data,
  onRoleSelect
}) => {
  const [activeView, setActiveView] = useState<'roles' | 'funnel' | 'activity'>('roles');

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Hiring Progress Overview
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={activeView === 'roles' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('roles')}
            >
              Role Progress
            </Button>
            <Button
              variant={activeView === 'funnel' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('funnel')}
            >
              Candidate Funnel
            </Button>
            <Button
              variant={activeView === 'activity' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('activity')}
            >
              Team Activity
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {activeView === 'roles' && (
          <div className="space-y-4">
            {data.roleProgress.map((role) => (
              <div key={role.roleId} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{role.roleName}</h4>
                    <Badge className={getUrgencyColor(role.urgency)}>
                      {role.urgency} priority
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRoleSelect(role.roleId)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current stage: {role.stage}</span>
                    <span>{role.candidatesCount} candidates</span>
                  </div>
                  <Progress value={role.progress} className="h-2" />
                  <div className="text-right text-sm text-gray-600">
                    {role.progress}% complete
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'funnel' && (
          <div className="space-y-4">
            <div className="relative">
              {data.candidateFunnel.map((stage, index) => (
                <div key={stage.stage} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{stage.stage}</span>
                    <div className="text-sm text-gray-600">
                      {stage.count} candidates • {stage.conversionRate}% conversion
                    </div>
                  </div>
                  <div
                    className="h-12 rounded flex items-center justify-center text-white font-medium"
                    style={{ 
                      backgroundColor: stage.color,
                      width: `${Math.max(20, (stage.count / data.candidateFunnel[0].count) * 100)}%`
                    }}
                  >
                    {stage.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'activity' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {data.teamActivity.calls}
              </div>
              <div className="text-sm text-gray-600">Calls Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {data.teamActivity.interviews}
              </div>
              <div className="text-sm text-gray-600">Interviews Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {data.teamActivity.emails}
              </div>
              <div className="text-sm text-gray-600">Emails Sent</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
