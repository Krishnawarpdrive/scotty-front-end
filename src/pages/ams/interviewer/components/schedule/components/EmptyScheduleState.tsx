
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const EmptyScheduleState: React.FC = () => {
  return (
    <Card>
      <CardContent className="py-8 text-center">
        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Upcoming Interviews</h3>
        <p className="text-gray-500">Your interview schedule is clear.</p>
      </CardContent>
    </Card>
  );
};
