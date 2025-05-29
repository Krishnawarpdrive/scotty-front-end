
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Settings, User, LogOut, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KeyboardIcon } from '@/components/ui/keyboard-icon';
import { useGlobalShortcuts } from '@/hooks/useGlobalShortcuts';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName = 'John Doe' }) => {
  const navigate = useNavigate();
  
  // Register global shortcuts
  useGlobalShortcuts();

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-50 w-full">
      <div className="font-semibold text-lg">
        AMS
      </div>
      
      <div className="flex items-center gap-3">
        <KeyboardIcon />
        <span className="text-sm hidden md:block">{userName}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <span className="text-xs font-medium">
                  {userName?.split(' ').map(name => name[0]).join('')}
                </span>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/ams/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/ams/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/ams/support')}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
