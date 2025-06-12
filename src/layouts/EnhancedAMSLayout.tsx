import React from 'react';
import { Outlet } from 'react-router-dom';
import AMSSidebar from './AMSSidebar';
import { BreadcrumbNavigation } from "@/components/navigation/BreadcrumbNavigation";
import { useUI } from "@/store/hooks/useUI";
import { Button } from "@/components/ui/button";
import { Search, Bell, Settings, User } from "lucide-react";

const EnhancedAMSLayout: React.FC = () => {
  const { sidebar, toggleSidebar } = useUI();

  return (
    <div className="flex h-screen bg-gray-50">
      <AMSSidebar />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="lg:hidden"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
              
              <BreadcrumbNavigation />
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedAMSLayout;
