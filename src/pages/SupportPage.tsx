
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getPersonaFromPath, personaConfigs } from '@/utils/persona';
import { 
  HelpCircle, 
  MessageCircle, 
  BookOpen, 
  Video, 
  Users, 
  MessageSquare, 
  Activity,
  Search,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SupportPage: React.FC = () => {
  const location = useLocation();
  const persona = getPersonaFromPath(location.pathname) || 'ams';
  const personaConfig = personaConfigs[persona];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  // Mock data for help articles and tickets
  const helpArticles = [
    {
      id: '1',
      title: 'Getting Started with Candidate Management',
      category: 'Getting Started',
      persona: ['ta', 'hr'],
      views: 1250,
      helpful: 95
    },
    {
      id: '2',
      title: 'Setting Up Interview Workflows',
      category: 'Workflows',
      persona: ['hr', 'interviewer'],
      views: 890,
      helpful: 87
    },
    {
      id: '3',
      title: 'Vendor Partnership Management',
      category: 'Partnerships',
      persona: ['ams', 'vendor'],
      views: 456,
      helpful: 92
    },
    {
      id: '4',
      title: 'Understanding Analytics Dashboard',
      category: 'Analytics',
      persona: ['bo', 'ams', 'hr'],
      views: 678,
      helpful: 88
    }
  ].filter(article => article.persona.includes(persona));

  const recentTickets = [
    {
      id: 'TK-001',
      title: 'Cannot upload candidate resume',
      status: 'resolved',
      priority: 'high',
      created: '2024-01-15',
      updated: '2024-01-16'
    },
    {
      id: 'TK-002',
      title: 'Dashboard loading slowly',
      status: 'in_progress',
      priority: 'medium',
      created: '2024-01-14',
      updated: '2024-01-15'
    },
    {
      id: 'TK-003',
      title: 'Feature request: Bulk candidate import',
      status: 'open',
      priority: 'low',
      created: '2024-01-13',
      updated: '2024-01-13'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting ticket:', ticketForm);
    // Handle ticket submission
    setTicketForm({ title: '', category: '', priority: 'medium', description: '' });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-gray-600 mt-1">
            Get help with {personaConfig.name} features and workflows
          </p>
        </div>
        <Badge variant="outline" className="capitalize">
          {personaConfig.name}
        </Badge>
      </div>

      <Tabs defaultValue="help-center" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="help-center" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Help Center
          </TabsTrigger>
          <TabsTrigger value="getting-started" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact Support
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community
          </TabsTrigger>
          <TabsTrigger value="system-status" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            System Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="help-center" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Help Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Articles for {personaConfig.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {helpArticles.map((article) => (
                  <div key={article.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-2">{article.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <Badge variant="outline">{article.category}</Badge>
                      <div className="flex items-center gap-3">
                        <span>{article.views} views</span>
                        <span>{article.helpful}% helpful</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Schedule Screen Share
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started as {personaConfig.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="font-medium mb-2">Setup Your Profile</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete your profile and configure settings</p>
                  <Button size="sm" variant="outline">Start Setup</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-medium mb-2">Explore Dashboard</h4>
                  <p className="text-sm text-gray-600 mb-3">Learn about key metrics and features</p>
                  <Button size="sm" variant="outline">Take Tour</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-medium mb-2">Set Goals</h4>
                  <p className="text-sm text-gray-600 mb-3">Define your objectives and KPIs</p>
                  <Button size="sm" variant="outline">Set Goals</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Platform Overview</h4>
                    <p className="text-sm text-gray-600 mb-2">Get familiar with the main interface</p>
                    <Badge variant="outline">10 min</Badge>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Managing Candidates</h4>
                    <p className="text-sm text-gray-600 mb-2">Learn candidate lifecycle management</p>
                    <Badge variant="outline">15 min</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={ticketForm.title}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={ticketForm.category}
                        onValueChange={(value) => setTicketForm(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="feature_request">Feature Request</SelectItem>
                          <SelectItem value="bug_report">Bug Report</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <Select
                        value={ticketForm.priority}
                        onValueChange={(value) => setTicketForm(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide detailed information about your issue"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Submit Ticket</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Recent Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{ticket.title}</h4>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(ticket.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-mono">{ticket.id}</span>
                      <Badge variant="outline" className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Created: {ticket.created} • Updated: {ticket.updated}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Forums</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">General Discussion</h4>
                  <p className="text-sm text-gray-600 mb-3">General platform discussions</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>245 topics</span>
                    <span>1.2k posts</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Feature Requests</h4>
                  <p className="text-sm text-gray-600 mb-3">Suggest new features</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>89 topics</span>
                    <span>456 posts</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <p className="text-sm text-gray-600 mb-3">Share tips and workflows</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>156 topics</span>
                    <span>892 posts</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Troubleshooting</h4>
                  <p className="text-sm text-gray-600 mb-3">Get help from community</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>178 topics</span>
                    <span>634 posts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-800">All Systems Operational</h4>
                  <p className="text-sm text-green-700">All services are running normally</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">API Services</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Database</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">File Storage</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Email Notifications</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportPage;
