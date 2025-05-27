
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AMSSidebar } from './AMSSidebar';
import { AIAssistant } from '@/components/ai/AIAssistant';

const AMSLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
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
  );
};

export default AMSLayout;
