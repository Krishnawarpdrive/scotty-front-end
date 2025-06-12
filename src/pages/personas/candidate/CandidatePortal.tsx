
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, CheckCircle, Clock } from 'lucide-react';
import { PersonaRoute } from '@/components/auth/PersonaRoute';

const CandidatePortal: React.FC = () => {
  const applicationStats = [
    {
      title: 'Applications',
      value: '5',
      change: '+1',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Interviews',
      value: '2',
      change: '+1',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Completed',
      value: '1',
      change: '0',
      icon: CheckCircle,
      color: 'text-purple-600'
    },
    {
      title: 'Pending',
      value: '2',
      change: '-1',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  return (
    <PersonaRoute allowedPersonas={['candidate']}>
      <motion.div 
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Applications</h1>
            <p className="text-gray-600 mt-1">Track your job applications and interview progress</p>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800">
            Candidate
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {applicationStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.change} this week
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Frontend Developer</p>
                    <p className="text-sm text-gray-500">TechCorp Inc.</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">In Review</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">React Developer</p>
                    <p className="text-sm text-gray-500">StartupXYZ</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Interview Scheduled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Full Stack Developer</p>
                    <p className="text-sm text-gray-500">CloudTech Ltd.</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Applied</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Technical Interview</p>
                    <p className="text-sm text-gray-500">React Developer at StartupXYZ</p>
                    <p className="text-xs text-gray-400">Tomorrow at 2:00 PM</p>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">HR Round</p>
                    <p className="text-sm text-gray-500">Frontend Developer at TechCorp</p>
                    <p className="text-xs text-gray-400">Friday at 10:00 AM</p>
                  </div>
                  <Badge variant="outline">Confirmed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </PersonaRoute>
  );
};

export default CandidatePortal;
