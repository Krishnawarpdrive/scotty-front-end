
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, TrendingUp } from 'lucide-react';
import type { InterviewPanelist } from '../types/InterviewerTypes';

interface DashboardHeaderProps {
  interviewer: InterviewPanelist | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ interviewer }) => {
  if (!interviewer) return null;

  const levelProgress = ((interviewer.total_points || 0) % 1000) / 10; // Progress within current level

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={interviewer.avatar_url || ''} />
            <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {interviewer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{interviewer.name}</h1>
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                Level {interviewer.current_level || 1}
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {interviewer.title}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Experience Points</span>
                <span className="font-medium">{interviewer.total_points || 0} XP</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
              <div className="text-xs text-gray-500">
                {interviewer.xp_to_next_level || 0} XP to next level
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center text-yellow-500">
                <Trophy className="h-5 w-5 mr-1" />
                <span className="font-bold text-lg">{interviewer.rating || 0}</span>
              </div>
              <p className="text-xs text-gray-600">Rating</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center text-green-500">
                <Target className="h-5 w-5 mr-1" />
                <span className="font-bold text-lg">{interviewer.total_interviews || 0}</span>
              </div>
              <p className="text-xs text-gray-600">Interviews</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
