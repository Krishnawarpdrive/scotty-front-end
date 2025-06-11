
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Briefcase,
  Calendar,
  FileText,
  FolderOpen,
  Home,
  MessageSquare,
  PieChart,
  Users,
  UserCheck,
  Building2,
  CheckSquare,
  Award,
  Handshake,
  BarChart3,
  UserCog,
  GraduationCap,
} from 'lucide-react';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/ams/dashboard',
    icon: Home,
    section: 'main'
  },
  {
    title: 'Clients',
    href: '/ams/clients',
    icon: Building2,
    section: 'main'
  },
  {
    title: 'Requirements',
    href: '/ams/requirements',
    icon: FileText,
    section: 'main'
  },
  {
    title: 'Roles Library',
    href: '/ams/roles',
    icon: FolderOpen,
    section: 'library'
  },
  {
    title: 'Skills Library',
    href: '/ams/skills/library',
    icon: GraduationCap,
    section: 'library'
  },
  {
    title: 'Vendors',
    href: '/ams/vendors',
    icon: Handshake,
    section: 'management'
  },
  {
    title: 'Analytics',
    href: '/ams/analytics',
    icon: BarChart3,
    section: 'insights'
  }
];

export default function AMSSidebar() {
  const location = useLocation();

  return (
    <div className="bg-card border-r border-border w-64 min-h-screen p-4">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            AMS Portal
          </h2>
        </div>
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isCurrentPath = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isCurrentPath && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
