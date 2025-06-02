
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const Register: React.FC = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input type="text" placeholder="Full Name" />
        </div>
        <div className="space-y-2">
          <Input type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Input type="password" placeholder="Password" />
        </div>
        <div className="space-y-2">
          <Input type="password" placeholder="Confirm Password" />
        </div>
        <Button className="w-full">Create Account</Button>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
