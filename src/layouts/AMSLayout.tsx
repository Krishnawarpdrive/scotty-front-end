
import React from "react";
import { Outlet } from "react-router-dom";
import AMSSidebar from "./AMSSidebar";

const AMSLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AMSSidebar />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AMSLayout;
