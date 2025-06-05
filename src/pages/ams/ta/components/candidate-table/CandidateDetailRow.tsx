
import React, { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui-mui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Clock, 
  Star,
  MessageSquare,
  Download,
  Eye,
  Plus,
  ArrowRight
} from 'lucide-react';
import { TACandidate } from '../../types/CandidateTypes';

interface CandidateDetailRowProps {
  candidate: TACandidate;
  colSpan: number;
  onScheduleInterview: (candidateId: string, roleId: string) => void;
  onRequestFeedback: (candidateId: string) => void;
  onMoveToNextStage: (candidateId: string, roleId: string) => void;
  onAddNote: (candidateId: string, note: string) => void;
}

export const CandidateDetailRow: React.FC<CandidateDetailRowProps> = ({
  candidate,
  colSpan,
  onScheduleInterview,
  onRequestFeedback,
  onMoveToNextStage,
  onAddNote
}) => {
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(candidate.id, newNote);
      setNewNote('');
    }
  };

  const getDocumentIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  return (
    <TableRow className="bg-gray-50 border-t-0">
      <TableCell colSpan={colSpan} className="p-0">
        <div className="px-6 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Contact Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{candidate.email}</span>
                    </div>
                    {candidate.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{candidate.phone}</span>
                      </div>
                    )}
                    {candidate.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{candidate.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {candidate.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getDocumentIcon(doc.type)}
                          <span className="text-sm truncate">{doc.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Badge 
                            variant={doc.status === 'Verified' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {doc.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Notes Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {candidate.notes.map((note) => (
                      <div key={note.id} className="p-3 bg-white rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-600">{note.author}</span>
                          <span className="text-xs text-gray-400">{note.date}</span>
                        </div>
                        <p className="text-sm text-gray-800">{note.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Add a note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 min-h-[60px]"
                    />
                    <Button onClick={handleAddNote} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4 mt-4">
              {candidate.appliedRoles.map((role) => (
                <Card key={role.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{role.roleName}</h4>
                        <p className="text-sm text-gray-600">{role.clientName}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">Applied: {role.applicationDate}</span>
                          <span className="text-xs text-gray-500">Stage: {role.currentStage}</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-blue-500 rounded-full transition-all"
                                style={{ width: `${role.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{role.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onScheduleInterview(candidate.id, role.id)}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => onMoveToNextStage(candidate.id, role.id)}
                        >
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Next Stage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="interviews" className="space-y-4 mt-4">
              {candidate.interviewHistory.length > 0 ? (
                candidate.interviewHistory.map((interview) => (
                  <Card key={interview.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{interview.interviewType}</h4>
                          <p className="text-sm text-gray-600">{interview.roleName}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">Date: {interview.date}</span>
                            <span className="text-xs text-gray-500">Interviewer: {interview.interviewer}</span>
                            {interview.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500">{interview.rating}/5</span>
                              </div>
                            )}
                          </div>
                          {interview.feedback && (
                            <p className="text-sm text-gray-700 mt-2">{interview.feedback}</p>
                          )}
                        </div>
                        <Badge 
                          variant={interview.status === 'Completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {interview.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No interviews scheduled yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4 mt-4">
              <div className="space-y-4">
                {candidate.timeline.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <span className="text-xs text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </TableCell>
    </TableRow>
  );
};
