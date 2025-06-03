
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import type { LeaderboardEntry, InterviewPanelist } from '../../types/InterviewerTypes';

interface LeaderboardViewProps {
  leaderboard: LeaderboardEntry[];
  currentPanelist: InterviewPanelist | null;
}

const getRankIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-orange-600" />;
    default:
      return <span className="font-bold text-gray-600">#{position}</span>;
  }
};

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ 
  leaderboard, 
  currentPanelist 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const currentUserEntry = leaderboard.find(entry => 
    entry.panelist_id === currentPanelist?.id
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Current User Position */}
      {currentUserEntry && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-sm text-blue-800">Your Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {getRankIcon(currentUserEntry.rank_position)}
                <span className="font-semibold">Rank {currentUserEntry.rank_position}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>{currentUserEntry.total_points} points</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.slice(0, 10).map((entry, index) => (
              <div
                key={entry.id}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  entry.panelist_id === currentPanelist?.id 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(entry.rank_position)}
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.panelist?.avatar_url || ''} />
                  <AvatarFallback>
                    {entry.panelist?.name?.split(' ').map(n => n[0]).join('') || '??'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="font-medium">{entry.panelist?.name || 'Unknown'}</div>
                  <div className="text-sm text-gray-500">{entry.panelist?.title || ''}</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">{entry.total_points} pts</div>
                  <div className="text-sm text-gray-500">
                    {entry.panelist?.total_interviews || 0} interviews
                  </div>
                </div>

                {entry.rank_position <= 3 && (
                  <Badge variant="outline" className={
                    entry.rank_position === 1 ? 'bg-yellow-100 text-yellow-800' :
                    entry.rank_position === 2 ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }>
                    {entry.rank_position === 1 ? 'Gold' :
                     entry.rank_position === 2 ? 'Silver' : 'Bronze'}
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {leaderboard.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p>No leaderboard data available yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
