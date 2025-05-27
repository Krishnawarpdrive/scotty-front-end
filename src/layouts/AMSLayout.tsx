
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AMSSidebar } from './AMSSidebar';
import { AIAssistant } from '@/components/ai/AIAssistant';

const AMSLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AMSSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
        
        {/* Global AI Assistant */}
        <AIAssistant 
          context="general"
          placeholder="How can I help you today?"
        />
      </div>
    </SidebarProvider>
  );
};

export default AMSLayout;
