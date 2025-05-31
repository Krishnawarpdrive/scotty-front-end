
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Input type="password" placeholder="Password" />
        </div>
        <Button className="w-full">Sign In</Button>
        <div className="text-center text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
