
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme/ThemeProvider";

// Layouts
import AMSLayout from "./layouts/AMSLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/ams/Dashboard";
import ClientsPage from "./pages/ams/ClientsPage";
import RolesLibraryPage from "./pages/ams/RolesLibraryPage";
import RequirementsPage from "./pages/ams/RequirementsPage";
import SkillsPage from "./pages/ams/SkillsPage";
import ChecklistsPage from "./pages/ams/ChecklistsPage";
import CertificationsPage from "./pages/ams/CertificationsPage";
import CommissionsPage from "./pages/ams/CommissionsPage";

// Client detail pages
import ClientDetailsPage from "./pages/ams/clients/ClientDetailsPage";
import ClientAccountCreationPage from "./pages/ams/clients/ClientAccountCreationPage";

// HR pages
import RoleManagementPage from "./pages/ams/hr/RoleManagementPage";
import HRDashboardPage from "./pages/ams/hr/HRDashboardPage";
import CandidatePoolPage from "./pages/ams/hr/CandidatePoolPage";

// TA pages
import TAMissionControlPage from "./pages/ams/ta/TAMissionControlPage";

// Create / Edit role page
import CreateRolePage from "./pages/ams/roles/CreateRolePage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/ams" replace />} />
          <Route path="/index" element={<Index />} />

          {/* AMS Routes with layout */}
          <Route path="/ams" element={<AMSLayout />}>
            <Route index element={<Navigate to="/ams/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* HR Section */}
            <Route path="hr/role-management" element={<RoleManagementPage />} />
            <Route path="hr/dashboard" element={<HRDashboardPage />} />
            <Route path="hr/candidate-pool" element={<CandidatePoolPage />} />

            {/* TA Section */}
            <Route path="ta/mission-control" element={<TAMissionControlPage />} />

            {/* Client Routes */}
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/:clientId" element={<ClientDetailsPage />} />
            <Route path="clients/create" element={<ClientAccountCreationPage />} />
            
            {/* Other Main Routes */}
            <Route path="roles" element={<RolesLibraryPage />} />
            <Route path="roles/create" element={<CreateRolePage />} />
            <Route path="requirements" element={<RequirementsPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="checklists" element={<ChecklistsPage />} />
            <Route path="certifications" element={<CertificationsPage />} />
            <Route path="commissions" element={<CommissionsPage />} />
          </Route>

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
