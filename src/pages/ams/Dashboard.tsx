import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Plus, Users, Briefcase, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { useDashboardShortcuts } from '@/hooks/useDashboardShortcuts';

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  time: string;
}

interface TaskItem {
  id: string;
  task: string;
  dueDate: string;
  priority: string;
  status: string;
}

const recentActivity: ActivityItem[] = [
  { id: '1', type: 'JD Submitted', description: 'Senior Developer role for Acme Inc', time: '2h ago' },
  { id: '2', type: 'Approval', description: 'Project Manager role approved', time: '5h ago' },
  { id: '3', type: 'Role Creation', description: 'UX Designer role created', time: '1d ago' },
  { id: '4', type: 'Client Added', description: 'XYZ Corporation onboarded', time: '2d ago' },
];

const upcomingTasks: TaskItem[] = [
  { id: '1', task: 'Review Developer JD', dueDate: 'Today', priority: 'High', status: 'Pending' },
  { id: '2', task: 'Approve PM skillset', dueDate: 'Tomorrow', priority: 'Medium', status: 'In Review' },
  { id: '3', task: 'Client meeting - Role review', dueDate: '2 days', priority: 'High', status: 'Scheduled' },
  { id: '4', task: 'Update certification requirements', dueDate: '3 days', priority: 'Low', status: 'Not Started' },
];

const AMSDashboard: React.FC = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  
  // Set the scope when component mounts
  useEffect(() => {
    setCurrentScope('dashboard');
    return () => setCurrentScope('global');
  }, [setCurrentScope]);

  // Register dashboard specific shortcuts
  useDashboardShortcuts();

  return (
    <div className="space-y-6">
      {/* Hero Widgets */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+4 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">5 high priority</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Client
        </Button>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Create Role
        </Button>
        <Button size="sm" variant="outline" className="gap-1">
          <ClipboardList className="h-4 w-4" /> View Approvals
        </Button>
        <Link to="/ams/hr/role-management">
          <Button size="sm" variant="outline" className="gap-1">
            <Briefcase className="h-4 w-4" /> Role Management
          </Button>
        </Link>
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.task}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          task.priority === 'High'
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AMSDashboard;
