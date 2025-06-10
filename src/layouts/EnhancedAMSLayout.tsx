
import { Outlet } from 'react-router-dom';
import { AMSSidebar } from './AMSSidebar';
import { KeyboardHintsOverlay } from '@/components/ui/keyboard-hints-overlay';
import { SmartActionCenter } from '@/components/smart-action-center/SmartActionCenter';

export const EnhancedAMSLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <AMSSidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Global Components */}
      <KeyboardHintsOverlay />
      <SmartActionCenter />
    </div>
  );
};
