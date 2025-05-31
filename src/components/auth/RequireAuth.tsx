
import React from 'react';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  // For now, just render children - authentication logic can be added later
  return <>{children}</>;
};
