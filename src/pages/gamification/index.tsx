
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GamificationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gamification</h1>
      <Card>
        <CardHeader>
          <CardTitle>Achievement System</CardTitle>
          <CardDescription>Track your progress and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Gamification features coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
};

export { GamificationPage };
