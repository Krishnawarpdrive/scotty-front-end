
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Video, MapPin, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { InterviewSchedule, interviewSchedulingService } from '../interview-scheduling/InterviewSchedulingService';
import { InterviewSchedulingDrawer } from '../interview-scheduling/InterviewSchedulingDrawer';

export const InterviewDashboard: React.FC = () => {
  const [interviews, setInterviews] = useState<InterviewSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [schedulingDrawerOpen, setSchedulingDrawerOpen] = useState(false);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      setLoading(true);
      const data = await interviewSchedulingService.getInterviewSchedules({
        status: 'scheduled'
      });
      setInterviews(data);
    } catch (error) {
      console.error('Error loading interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleScheduleComplete = (schedule: InterviewSchedule) => {
    setInterviews(prev => [schedule, ...prev]);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Interview Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(null).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Interview Management
          </CardTitle>
          <Button onClick={() => setSchedulingDrawerOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Schedule Interview
          </Button>
        </CardHeader>
        <CardContent>
          {interviews.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Scheduled Interviews</h3>
              <p className="text-gray-600 mb-4">Schedule your first interview to get started.</p>
              <Button onClick={() => setSchedulingDrawerOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Schedule Interview
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {interviews.map((interview) => {
                const dateTime = formatDateTime(interview.scheduled_date);
                return (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900">
                            {interview.interview_type} Interview
                          </h4>
                          <Badge className={getStatusColor(interview.status)}>
                            {interview.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{dateTime.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{dateTime.time} ({interview.duration_minutes}m)</span>
                          </div>
                          {interview.meeting_link && (
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4" />
                              <a 
                                href={interview.meeting_link} 
                                className="text-blue-600 hover:underline truncate"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Join Meeting
                              </a>
                            </div>
                          )}
                          {interview.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span className="truncate">{interview.location}</span>
                            </div>
                          )}
                        </div>
                        
                        {interview.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">
                            {interview.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="ml-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <InterviewSchedulingDrawer
        open={schedulingDrawerOpen}
        onClose={() => setSchedulingDrawerOpen(false)}
        candidateId=""
        onScheduleComplete={handleScheduleComplete}
      />
    </>
  );
};
