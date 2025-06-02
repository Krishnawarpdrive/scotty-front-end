
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Onboarding: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome to AMS</CardTitle>
          <CardDescription>Let's get you set up</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Welcome to the Applicant Management System. Let's get started with your onboarding.</p>
          <Button>Continue Setup</Button>
        </CardContent>
      </Card>
    </div>
  );
};
