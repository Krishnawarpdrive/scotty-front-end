import { useState } from 'react';
import {
  Home,
  Users,
  Settings,
  Calendar,
  FileText,
  TrendingUp,
  User,
  Building,
  Search,
  Bell,
  Archive,
  MessageSquare,
  Briefcase,
  Target,
  BarChart3,
  Clock,
  CheckSquare,
  UserCheck,
  AlertCircle,
  Zap,
  ShieldCheck,
  Database
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & React.RefAttributes<SVGSVGElement>>;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, active }) => {
  return (
    <li className="mb-1">
      <a
        href={href}
        className={`flex items-center p-2 text-base font-normal rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
          active
            ? 'text-green-500 hover:text-green-500'
            : 'text-gray-900 dark:text-white hover:text-green-500'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="ml-3">{label}</span>
      </a>
    </li>
  );
};

export const AppSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/dashboard"
            active={activeItem === 'dashboard'}
            onClick={() => handleItemClick('dashboard')}
          />
          <SidebarItem
            icon={Users}
            label="Clients"
            href="/ams/clients"
            active={activeItem === 'clients'}
            onClick={() => handleItemClick('clients')}
          />
          <SidebarItem
            icon={Briefcase}
            label="Requirements"
            href="/requirements"
            active={activeItem === 'requirements'}
            onClick={() => handleItemClick('requirements')}
          />
          <SidebarItem
            icon={FileText}
            label="Contracts"
            href="/contracts"
            active={activeItem === 'contracts'}
            onClick={() => handleItemClick('contracts')}
          />
          <SidebarItem
            icon={User}
            label="Candidates"
            href="/candidates"
            active={activeItem === 'candidates'}
            onClick={() => handleItemClick('candidates')}
          />
          <SidebarItem
            icon={Building}
            label="Vendors"
            href="/vendors"
            active={activeItem === 'vendors'}
            onClick={() => handleItemClick('vendors')}
          />
          <SidebarItem
            icon={Target}
            label="Interviews"
            href="/interviews"
            active={activeItem === 'interviews'}
            onClick={() => handleItemClick('interviews')}
          />
          <SidebarItem
            icon={Calendar}
            label="Calendar"
            href="/calendar"
            active={activeItem === 'calendar'}
            onClick={() => handleItemClick('calendar')}
          />
          <SidebarItem
            icon={BarChart3}
            label="Reports"
            href="/reports"
            active={activeItem === 'reports'}
            onClick={() => handleItemClick('reports')}
          />
          <SidebarItem
            icon={TrendingUp}
            label="Analytics"
            href="/analytics"
            active={activeItem === 'analytics'}
            onClick={() => handleItemClick('analytics')}
          />
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <SidebarItem
            icon={Bell}
            label="Notifications"
            href="/notifications"
            active={activeItem === 'notifications'}
            onClick={() => handleItemClick('notifications')}
          />
          <SidebarItem
            icon={MessageSquare}
            label="Messages"
            href="/messages"
            active={activeItem === 'messages'}
            onClick={() => handleItemClick('messages')}
          />
          <SidebarItem
            icon={Search}
            label="Search"
            href="/search"
            active={activeItem === 'search'}
            onClick={() => handleItemClick('search')}
          />
          <SidebarItem
            icon={Clock}
            label="History"
            href="/history"
            active={activeItem === 'history'}
            onClick={() => handleItemClick('history')}
          />
          <SidebarItem
            icon={Archive}
            label="Archive"
            href="/archive"
            active={activeItem === 'archive'}
            onClick={() => handleItemClick('archive')}
          />
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <SidebarItem
            icon={CheckSquare}
            label="Checklist"
            href="/checklist"
            active={activeItem === 'checklist'}
            onClick={() => handleItemClick('checklist')}
          />
          <SidebarItem
            icon={UserCheck}
            label="User Verification"
            href="/user-verification"
            active={activeItem === 'userVerification'}
            onClick={() => handleItemClick('userVerification')}
          />
           <SidebarItem
            icon={AlertCircle}
            label="Alerts"
            href="/alerts"
            active={activeItem === 'alerts'}
            onClick={() => handleItemClick('alerts')}
          />
           <SidebarItem
            icon={Zap}
            label="Automation"
            href="/automation"
            active={activeItem === 'automation'}
            onClick={() => handleItemClick('automation')}
          />
          <SidebarItem
            icon={ShieldCheck}
            label="Security"
            href="/security"
            active={activeItem === 'security'}
            onClick={() => handleItemClick('security')}
          />
          <SidebarItem
            icon={Database}
            label="Data Management"
            href="/data-management"
            active={activeItem === 'dataManagement'}
            onClick={() => handleItemClick('dataManagement')}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/settings"
            active={activeItem === 'settings'}
            onClick={() => handleItemClick('settings')}
          />
        </ul>
      </div>
    </aside>
  );
};
