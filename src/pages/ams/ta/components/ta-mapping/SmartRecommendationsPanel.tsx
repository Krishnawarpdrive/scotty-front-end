
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, CheckCircle, Star } from 'lucide-react';
import { TAProfile, ClientRole } from './TAMappingInterface';

interface Recommendation {
  id: string;
  ta_id: string;
  client_role_id: string;
  confidence_score: number;
  reasoning: string;
  assignment_type: 'primary' | 'secondary' | 'backup';
}

interface SmartRecommendationsPanelProps {
  recommendations: Recommendation[];
  taProfiles: TAProfile[];
  clientRoles: ClientRole[];
  onApplyRecommendation: (taId: string, clientRoleId: string, assignmentType: 'primary' | 'secondary' | 'backup') => void;
}

export const SmartRecommendationsPanel: React.FC<SmartRecommendationsPanelProps> = ({
  recommendations,
  taProfiles,
  clientRoles,
  onApplyRecommendation
}) => {
  const getTAName = (taId: string) => {
    const ta = taProfiles.find(t => t.id === taId);
    return ta ? ta.name : 'Unknown TA';
  };

  const getRoleInfo = (roleId: string) => {
    const role = clientRoles.find(r => r.id === roleId);
    return role ? `${role.client_name} - ${role.role_name}` : 'Unknown Role';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {getTAName(rec.ta_id)} → {getRoleInfo(rec.client_role_id)}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {rec.reasoning}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800" variant="secondary">
                        {rec.assignment_type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">Confidence:</span>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round(rec.confidence_score * 100)}%
                      </span>
                    </div>
                    
                    <Progress value={rec.confidence_score * 100} className="h-2 mb-3" />

                    <Button
                      size="sm"
                      onClick={() => onApplyRecommendation(rec.ta_id, rec.client_role_id, rec.assignment_type)}
                      className="w-full"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Apply Recommendation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recommendations available at the moment</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
