
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  User, 
  Video, 
  Phone,
  MapPin,
  FileText
} from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  role: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Offer {
  id: string;
  candidateName: string;
  role: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  amount: string;
  date: string;
  expiryDate: string;
}

interface InterviewsOffersSidebarProps {
  interviews: Interview[];
  offers: Offer[];
}

export const InterviewsOffersSidebar: React.FC<InterviewsOffersSidebarProps> = ({
  interviews,
  offers
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getInterviewIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4 text-blue-500" />;
      case 'phone': return <Phone className="h-4 w-4 text-green-500" />;
      case 'in-person': return <MapPin className="h-4 w-4 text-purple-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const getOfferStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInterviewStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'} bg-white border-l`}>
      {/* Collapse Toggle */}
      <div className="p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-center h-8"
        >
          {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto h-full">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming Interviews
                <Badge variant="outline" className="ml-auto">
                  {interviews.filter(i => i.status === 'scheduled').length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {interviews.filter(i => i.status === 'scheduled').slice(0, 5).map((interview) => (
                <div key={interview.id} className="border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[13px] font-medium">{interview.candidateName}</h4>
                      <p className="text-[11px] text-gray-600">{interview.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getInterviewIcon(interview.type)}
                      <Badge className={getInterviewStatusColor(interview.status)}>
                        {interview.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {interview.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {interview.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {interview.interviewer}
                    </div>
                  </div>
                </div>
              ))}
              
              {interviews.filter(i => i.status === 'scheduled').length === 0 && (
                <p className="text-[11px] text-gray-500 text-center py-4">
                  No upcoming interviews
                </p>
              )}
            </CardContent>
          </Card>

          {/* Pending Offers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Pending Offers
                <Badge variant="outline" className="ml-auto">
                  {offers.filter(o => o.status === 'pending').length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {offers.filter(o => o.status === 'pending').slice(0, 5).map((offer) => (
                <div key={offer.id} className="border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[13px] font-medium">{offer.candidateName}</h4>
                      <p className="text-[11px] text-gray-600">{offer.role}</p>
                    </div>
                    <Badge className={getOfferStatusColor(offer.status)}>
                      {offer.status}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-gray-600 space-y-1">
                    <div>Amount: <span className="font-medium">{offer.amount}</span></div>
                    <div>Sent: {offer.date}</div>
                    <div>Expires: <span className="text-red-600">{offer.expiryDate}</span></div>
                  </div>
                </div>
              ))}
              
              {offers.filter(o => o.status === 'pending').length === 0 && (
                <p className="text-[11px] text-gray-500 text-center py-4">
                  No pending offers
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-[11px] text-gray-600 space-y-2">
                <div className="border-l-2 border-green-500 pl-2">
                  <p>Sarah Johnson accepted offer for Senior Developer</p>
                  <span className="text-gray-500">2 hours ago</span>
                </div>
                <div className="border-l-2 border-blue-500 pl-2">
                  <p>Interview scheduled with Mike Chen</p>
                  <span className="text-gray-500">4 hours ago</span>
                </div>
                <div className="border-l-2 border-yellow-500 pl-2">
                  <p>Offer extended to Lisa Rodriguez</p>
                  <span className="text-gray-500">6 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
