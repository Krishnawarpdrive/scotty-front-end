
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ClientsPage from './ClientsPage';
import RolesLibraryPage from './RolesLibraryPage';
import RequirementsPage from './RequirementsPage';
import VendorManagementPage from './VendorManagementPage';
import SearchPage from './SearchPage';
import UserManagementPage from './admin/UserManagementPage';

const AMSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/roles" element={<RolesLibraryPage />} />
      <Route path="/requirements" element={<RequirementsPage />} />
      <Route path="/vendors" element={<VendorManagementPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/admin/users" element={<UserManagementPage />} />
    </Routes>
  );
};

export default AMSRoutes;
