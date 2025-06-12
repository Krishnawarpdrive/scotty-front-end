
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ClientsPage from './ClientsPage';
import RolesLibraryPage from './RolesLibraryPage';
import VendorManagementPage from './VendorManagementPage';
import RequirementsPage from './RequirementsPage';
import CandidateDashboardPage from './candidate/CandidateDashboardPage';
import UserManagementPage from './admin/UserManagementPage';

const AMSRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/roles-library" element={<RolesLibraryPage />} />
      <Route path="/vendors" element={<VendorManagementPage />} />
      <Route path="/requirements" element={<RequirementsPage />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboardPage />} />
      <Route path="/admin/users" element={<UserManagementPage />} />
      <Route index element={<Dashboard />} />
    </Routes>
  );
};

export default AMSRoutes;
