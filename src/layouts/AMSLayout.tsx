
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { AMSSidebar } from './AMSSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export const AMSLayout: React.FC = () => {
  const location = useLocation();
  
  // Generate breadcrumb items based on current path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLastItem = index === pathSegments.length - 1;
    
    // Format segment for display (capitalize first letter, replace hyphens with spaces)
    const formattedSegment = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      path,
      label: formattedSegment,
      isLastItem
    };
  });

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AMSSidebar />
        
        <div className="flex-1 overflow-auto">
          <div className="p-6 w-full">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/ams/dashboard">AMS</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                
                {breadcrumbItems.map((item, index) => (
                  item.isLastItem ? (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </React.Fragment>
                  )
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            
            {/* Main content area */}
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AMSLayout;
