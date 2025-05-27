
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Trophy } from 'lucide-react';
import { InteractiveCardContainer } from '../../animations/InteractiveCardContainer';
import { TAProfile } from '../types/MissionTypes';

interface TAProfileHeaderProps {
  ta: TAProfile;
}

export const TAProfileHeader: React.FC<TAProfileHeaderProps> = ({ ta }) => {
  const levelProgress = (ta.xp / ta.xpToNext) * 100;

  return (
    <InteractiveCardContainer hoverEffect="glow">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {ta.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{ta.name}</h3>
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  Level {ta.level}
                </Badge>
                <Badge variant="outline" className="bg-orange-100 text-orange-800">
                  {ta.rank}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">XP Progress</span>
                  <span className="font-medium">{ta.xp} / {ta.xpToNext} XP</span>
                </div>
                <Progress value={levelProgress} className="h-2" />
              </div>
              
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{ta.streak}</span>
                  <span className="text-gray-600">day streak</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{ta.totalMissionsCompleted}</span>
                  <span className="text-gray-600">missions completed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </InteractiveCardContainer>
  );
};
