
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { AMSSidebar } from './AMSSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/common/Header';

export const AMSLayout: React.FC = () => {
  const location = useLocation();

  // Generate breadcrumb items based on current path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLastItem = index === pathSegments.length - 1;

    // Format segment for display (capitalize first letter, replace hyphens with spaces)
    const formattedSegment = segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
      path,
      label: formattedSegment,
      isLastItem
    };
  });

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col h-screen w-full">
        <Header userName="Admin User" />
        
        <div className="flex flex-1 overflow-hidden">
          <AMSSidebar />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sticky Breadcrumb */}
            <div className="sticky top-0 z-10 bg-background border-b px-6 py-3 shadow-sm">
              <Breadcrumb>
                <BreadcrumbList>
                  {pathSegments[0] === "ams" && pathSegments[1] === "hr" ? (
                    <React.Fragment>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/ams/hr">HR</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Role Management</BreadcrumbPage>
                      </BreadcrumbItem>
                    </React.Fragment>
                  ) : (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/ams/dashboard">AMS</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      
                      {breadcrumbItems.map((item, index) => item.isLastItem ? (
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
                      ))}
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            {/* Main content area */}
            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AMSLayout;
