
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Clock, Users, Award, Calendar, TrendingUp,
  User, CheckCircle, Network, Star, AlertCircle,
  Filter, ChevronDown, ChevronRight, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SideDrawer } from '@/components/ui/side-drawer';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

import { mockActivityData, mockTimeToHireData, mockTAProgressData, 
  mockRoleSuccessData, mockInterviewerLoadData, mockRoleEfficiencyData,
  mockCandidatePipelineData, mockInterviewOfferData, mockPartnerEffectivenessData,
  mockNewHireData, mockStuckCandidatesData
} from './mock-dashboard-data';

const HRDashboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [taFilter, setTaFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [currentMetric, setCurrentMetric] = useState<{title: string, data: any}>({ title: '', data: [] });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const STATUS_COLORS = {
    good: '#10b981', // Green
    warning: '#f59e0b', // Yellow/Amber
    critical: '#ef4444' // Red
  };

  const handleShowDetails = (title: string, data: any) => {
    setCurrentMetric({ title, data });
    setDetailsDrawerOpen(true);
  };

  // Filter handling functions
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // In a real app, this would trigger data fetching/filtering
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-semibold">HR Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button size="sm">Export</Button>
        </div>
      </div>
      
      {/* Filter Bar */}
      <div className="bg-white border-b px-6 py-2 flex flex-wrap gap-2 items-center">
        <div className="flex items-center mr-4">
          <span className="text-sm font-medium mr-2">Date Range:</span>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center mr-4">
          <span className="text-sm font-medium mr-2">TA:</span>
          <Select value={taFilter} onValueChange={setTaFilter}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="All TAs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All TAs</SelectItem>
              <SelectItem value="ta1">Sarah Johnson</SelectItem>
              <SelectItem value="ta2">Mike Peterson</SelectItem>
              <SelectItem value="ta3">Emma Wilson</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center mr-4">
          <span className="text-sm font-medium mr-2">Role:</span>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[160px] h-8">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="engineer">Software Engineer</SelectItem>
              <SelectItem value="designer">UX Designer</SelectItem>
              <SelectItem value="manager">Product Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Client:</span>
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-[160px] h-8">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="client1">Acme Corp</SelectItem>
              <SelectItem value="client2">Tech Innovations</SelectItem>
              <SelectItem value="client3">Global Solutions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Metrics Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Time to Hire */}
            <Card className="p-5 flex flex-col h-[280px]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="font-semibold">Time to Hire</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShowDetails('Time to Hire', mockTimeToHireData)}
                >
                  Details
                </Button>
              </div>
              <div className="text-3xl font-bold mb-2">28.3 <span className="text-sm font-normal text-gray-500">days</span></div>
              <div className="text-sm text-gray-500 mb-4">Average across all roles</div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTimeToHireData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 10}} />
                    <YAxis tick={{fontSize: 10}} />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="value" stroke="#0088FE" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                <span className="mr-3">8% better than last month</span>
              </div>
            </Card>

            {/* TA Specialist Work Progress */}
            <Card className="p-5 flex flex-col h-[280px]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-500" />
                  <h3 className="font-semibold">TA Work Progress</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShowDetails('TA Work Progress', mockTAProgressData)}
                >
                  Details
                </Button>
              </div>
              <div className="text-3xl font-bold mb-2">76.2% <span className="text-sm font-normal text-gray-500">completed</span></div>
              <div className="text-sm text-gray-500 mb-4">Average completion rate</div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockTAProgressData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 10}} />
                    <YAxis tick={{fontSize: 10}} />
                    <RechartsTooltip />
                    <Bar dataKey="completed" stackId="a" fill="#00C49F" />
                    <Bar dataKey="pending" stackId="a" fill="#EEEEEE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                <span className="mr-3">4 TAs above 80% completion</span>
              </div>
            </Card>

            {/* TA Specialist Role Success Rate */}
            <Card className="p-5 flex flex-col h-[280px]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-amber-500" />
                  <h3 className="font-semibold">TA Success Rate</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShowDetails('TA Success Rate', mockRoleSuccessData)}
                >
                  Details
                </Button>
              </div>
              <div className="text-3xl font-bold mb-2">68.5% <span className="text-sm font-normal text-gray-500">roles filled</span></div>
              <div className="text-sm text-gray-500 mb-4">Across all TAs</div>
              <div className="flex-1 min-h-0 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={mockRoleSuccessData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockRoleSuccessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                <span className="mr-3">3% below target (72%)</span>
              </div>
            </Card>

            {/* Interviewer Load & Availability */}
            <Card className="p-5 flex flex-col h-[280px]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                  <h3 className="font-semibold">Interviewer Load</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShowDetails('Interviewer Load', mockInterviewerLoadData)}
                >
                  Details
                </Button>
              </div>
              <div className="text-3xl font-bold mb-2">62% <span className="text-sm font-normal text-gray-500">utilization</span></div>
              <div className="text-sm text-gray-500 mb-4">Of available slots</div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockInterviewerLoadData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 10}} />
                    <YAxis tick={{fontSize: 10}} />
                    <RechartsTooltip />
                    <Bar dataKey="assigned" fill="#8884d8" />
                    <Bar dataKey="available" fill="#EEEEEE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                <span className="mr-3">28 open slots this week</span>
              </div>
            </Card>

            {/* Role Assignment Efficiency */}
            <Card className="p-5 flex flex-col h-[280px]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-indigo-500" />
                  <h3 className="font-semibold">Role Assignment Efficiency</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShowDetails('Role Assignment Efficiency', mockRoleEfficiencyData)}
                >
                  Details
                </Button>
              </div>
              <div className="text-3xl font-bold mb-2">83.5% <span className="text-sm font-normal text-gray-500">optimized</span></div>
              <div className="text-sm text-gray-500 mb-4">Based on TA performance match</div>
              <div className="flex-1 min-h-0 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={mockRoleEfficiencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockRoleEfficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                <span className="mr-3">7% above target (78%)</span>
              </div>
            </Card>

            {/* Secondary metrics could continue in a similar pattern */}
            <Card className="p-5 flex flex-col h-[280px]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="font-semibold">Candidate Pipeline by TA</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShowDetails('Candidate Pipeline', mockCandidatePipelineData)}
                >
                  Details
                </Button>
              </div>
              <div className="text-3xl font-bold mb-2">147 <span className="text-sm font-normal text-gray-500">candidates</span></div>
              <div className="text-sm text-gray-500 mb-4">In active pipelines</div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={mockCandidatePipelineData} 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{fontSize: 10}} />
                    <YAxis type="category" dataKey="name" tick={{fontSize: 10}} width={80} />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Interview-to-Offer Ratio */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <h4 className="text-sm font-medium">Interview-to-Offer Ratio</h4>
                </div>
                <span className="text-sm">42.3%</span>
              </div>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockInterviewOfferData}>
                    <Line type="monotone" dataKey="value" stroke="#00C49F" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-gray-500 mt-2">8% higher than last month</div>
            </Card>
            
            {/* Partner Collaboration Effectiveness */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Network className="h-4 w-4 mr-2 text-blue-500" />
                  <h4 className="text-sm font-medium">Partner Collaboration</h4>
                </div>
                <span className="text-sm">36.5%</span>
              </div>
              <div className="h-24 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockPartnerEffectivenessData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockPartnerEffectivenessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-gray-500 mt-2">2 partners above 40% fill rate</div>
            </Card>
            
            {/* New Hire Performance */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  <h4 className="text-sm font-medium">New Hire Performance</h4>
                </div>
                <span className="text-sm">4.2/5</span>
              </div>
              <div className="flex justify-center py-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-6 w-6 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">Based on 34 recent hires</div>
            </Card>
            
            {/* Stuck Candidates */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  <h4 className="text-sm font-medium">Stuck Candidates</h4>
                </div>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">
                  12
                </span>
              </div>
              <ul className="space-y-2 mt-2 overflow-y-auto h-24">
                {mockStuckCandidatesData.slice(0, 3).map((item, i) => (
                  <li key={i} className="text-xs flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                    <span className="text-gray-700 font-medium truncate">{item.name}</span>
                    <span className="text-gray-500 ml-1 truncate">- {item.stage}</span>
                  </li>
                ))}
              </ul>
              <Button variant="link" size="sm" className="text-xs h-auto p-0 mt-2">
                View all stuck candidates
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Card>
          </div>
        </div>
        
        {/* Activity Feed Sidebar */}
        <div className="hidden lg:block w-80 border-l bg-gray-50 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-white">
            <h3 className="font-medium">Recent Activity</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-4">
              {mockActivityData.map((item, i) => (
                <li key={i} className="pb-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={item.avatarUrl} />
                      <AvatarFallback>
                        {item.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{item.user}</span>
                        {' '}
                        <span>{item.action}</span>
                        {' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {item.target}
                        </span>
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-gray-500">{item.time}</span>
                        {item.alert && (
                          <span 
                            className={`text-xs px-1.5 py-0.5 rounded-full ${
                              item.alertLevel === 'critical' ? 'bg-red-100 text-red-800' :
                              item.alertLevel === 'warning' ? 'bg-amber-100 text-amber-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {item.alert}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Metric Details Drawer */}
      <SideDrawer
        open={detailsDrawerOpen}
        onOpenChange={setDetailsDrawerOpen}
        title={currentMetric.title}
        subtitle="Detailed analytics view"
        size="lg"
      >
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{currentMetric.title}</h3>
            <p className="text-gray-600">
              {currentMetric.title === 'Time to Hire' && 'Average days from candidate pipeline entry to offer acceptance.'}
              {currentMetric.title === 'TA Work Progress' && 'Percentage completion of assigned pipeline stages by each TA.'}
              {currentMetric.title === 'TA Success Rate' && 'Percentage of roles filled by TA versus roles assigned.'}
              {currentMetric.title === 'Interviewer Load' && 'Number of interviews assigned vs available slots.'}
              {currentMetric.title === 'Role Assignment Efficiency' && 'Percentage of roles assigned to best-performing TAs (>70% success).'}
            </p>
          </div>
          
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {currentMetric.title === 'Time to Hire' || currentMetric.title === 'TA Work Progress' ? (
                  <BarChart data={currentMetric.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#0088FE" />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={currentMetric.data}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {currentMetric.data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="table">
              <div className="border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentMetric.data.map((item: any, i: number) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Key Insight</h4>
                  <p className="text-sm text-gray-600">
                    {currentMetric.title === 'Time to Hire' && 'The average time to hire has decreased by 8% compared to the previous period. Software Engineering roles have the longest time to hire at 32 days.'}
                    {currentMetric.title === 'TA Work Progress' && 'John has the highest completion rate at 92%, while Sarah is behind schedule at 61%. The team average is 76.2%.'}
                    {currentMetric.title === 'TA Success Rate' && '3 TAs are performing above the target success rate of 72%. The team average is 68.5%.'}
                    {currentMetric.title === 'Interviewer Load' && 'There are 28 open interview slots available this week. The utilization rate is 62%.'}
                    {currentMetric.title === 'Role Assignment Efficiency' && 'Role-to-TA matching has improved by 7% since implementing the new assignment algorithm.'}
                  </p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Recommended Action</h4>
                  <p className="text-sm text-gray-600">
                    {currentMetric.title === 'Time to Hire' && 'Focus on optimizing the technical interview phase, which is the longest stage at an average of 7.3 days.'}
                    {currentMetric.title === 'TA Work Progress' && 'Schedule a check-in with Sarah to understand her blockers and provide additional support.'}
                    {currentMetric.title === 'TA Success Rate' && 'Arrange peer learning sessions between top and underperforming TAs to share best practices.'}
                    {currentMetric.title === 'Interviewer Load' && 'Request additional interview slots from the Engineering team to improve pipeline flow.'}
                    {currentMetric.title === 'Role Assignment Efficiency' && 'Continue monitoring the new algorithm performance and adjust parameters if needed.'}
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SideDrawer>
    </div>
  );
};

export default HRDashboardPage;
