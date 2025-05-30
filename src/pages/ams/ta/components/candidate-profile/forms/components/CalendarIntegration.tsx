
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  ExternalLink,
  Download,
  Mail,
  Clock,
  MapPin,
  Video
} from 'lucide-react';

interface CalendarIntegrationProps {
  scheduleData: any;
}

export const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({
  scheduleData
}) => {
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const generateGoogleCalendarLink = () => {
    const event = {
      title: `Technical Interview - ${scheduleData.panelist.name}`,
      startDate: scheduleData.timeSlot?.start || new Date().toISOString(),
      endDate: scheduleData.timeSlot?.end || new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      description: `Technical interview scheduled with ${scheduleData.panelist.name} (${scheduleData.panelist.title})`,
      location: 'Video Call'
    };

    const startDate = new Date(event.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(event.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    return googleUrl;
  };

  const generateOutlookLink = () => {
    const event = {
      title: `Technical Interview - ${scheduleData.panelist.name}`,
      startDate: scheduleData.timeSlot?.start || new Date().toISOString(),
      endDate: scheduleData.timeSlot?.end || new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      description: `Technical interview scheduled with ${scheduleData.panelist.name} (${scheduleData.panelist.title})`,
      location: 'Video Call'
    };

    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${event.startDate}&enddt=${event.endDate}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    return outlookUrl;
  };

  const generateICSFile = () => {
    const event = {
      title: `Technical Interview - ${scheduleData.panelist.name}`,
      startDate: scheduleData.timeSlot?.start || new Date().toISOString(),
      endDate: scheduleData.timeSlot?.end || new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      description: `Technical interview scheduled with ${scheduleData.panelist.name} (${scheduleData.panelist.title})`,
      location: 'Video Call'
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Scotty ATS//Interview Scheduler//EN
BEGIN:VEVENT
UID:${Date.now()}@scottyats.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${new Date(event.startDate).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(event.endDate).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'interview.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  const sendEmailInvite = () => {
    const subject = `Technical Interview Scheduled - ${scheduleData.panelist.name}`;
    const body = `Hi,\n\nA technical interview has been scheduled with the following details:\n\nInterviewer: ${scheduleData.panelist.name}\nDate: ${new Date(scheduleData.timeSlot?.start || new Date()).toLocaleDateString()}\nTime: ${new Date(scheduleData.timeSlot?.start || new Date()).toLocaleTimeString()}\nDuration: 60 minutes\n\nBest regards,\nScotty ATS`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5" />
          Calendar Integration
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add this interview to your calendar or share with stakeholders
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Quick Add to Calendar</h4>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(generateGoogleCalendarLink(), '_blank')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add to Google Calendar
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(generateOutlookLink(), '_blank')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add to Outlook
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={generateICSFile}
            >
              <Download className="h-4 w-4 mr-2" />
              Download .ics File
            </Button>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Share Interview Details</h4>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={sendEmailInvite}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email Invite
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>

            <div className="p-3 bg-gray-50 rounded-lg">
              <h5 className="text-xs font-medium text-gray-700 mb-2">Meeting Details</h5>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {new Date(scheduleData.timeSlot?.start || new Date()).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-3 w-3" />
                  Video Call (Link will be sent separately)
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  Duration: 60 minutes
                </div>
              </div>
            </div>
          </div>
        </div>

        {scheduleData.type === 'external' && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                External Panelist
              </Badge>
            </div>
            <p className="text-xs text-yellow-700">
              This interview is with an external panelist. Please ensure all calendar invites 
              include the appropriate external attendee permissions and meeting access details.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
